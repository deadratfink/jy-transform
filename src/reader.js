import jsYaml from 'js-yaml';
import promisify from 'promisify-es6';
import { Buffer } from 'buffer';
import path from 'path';
import fs from 'fs';
import isStream from 'is-stream';
import stringify from 'json-stringify-safe';
import logger from 'cli';
import { readerOptionsSchema } from './validation/options-schema';
import Joi from './validation/joi-extensions';
import {
  UTF8,
  TYPE_YAML,
  TYPE_JS,
  TYPE_JSON,
} from './constants';

/**
 * @module jy-transform:reader
 * @description This module provides the _read_ functionality for YAML, JS or JSON sources.
 * @public
 */

/**
 * Promisified `fs` module.
 * @private
 */
const fsPromisified = promisify(fs);

/**
 * Reads from a passed stream and resolves by callback.
 *
 * @param {Stream.Readable} readable - The source to read from.
 * @param {string} origin            - Origin type, must be 'yaml' or 'json'/'js'.
 * @returns {Promise.<Object>} The read content as JS object representation.
 * @private
 */
function readFromStream(readable, origin) {
  return new Promise((resolve, reject) => {
    const buffers = [];
    readable
      .on('data', data => buffers.push(data))
      .on('error', reject)
      .on('end', () => {
        const buffer = Buffer.concat(buffers);
        try {
          logger.debug(origin + ' reading from Readable');
          if (origin === TYPE_JSON || origin === TYPE_JS) {
            resolve(JSON.parse(buffer.toString(UTF8)));
          } else { // HINT: commented (see below): if (origin === YAML) {
            resolve(jsYaml.safeLoad(buffer.toString(UTF8)));
          }
        } catch (err) { // probably a SyntaxError for JSON or a YAMLException
          logger.error('Unexpected error: ' + err.stack);
          readable.emit('error', err); // send to .on('error',...
        }
      });
  });
}

/**
 * Reads the data from a given JS or JSON source.
 *
 * @param {module:jy-transform:type-definitions~ReaderOptions} options - Contains the JS/JSON source reference
 *                                                                       to read from.
 * @returns {Promise.<Object>} Contains the read JS object.
 * @private
 */
async function readJs(options) {
  if (typeof options.src === 'string') { // path to JSON or JS file
    try {
      const resolvedPath = path.resolve('', options.src);
      if (options.imports) {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const object = require(resolvedPath)[options.imports];
        logger.debug('LOADED JSON object (' + options.imports + '):: ' + stringify(object, null, 4));
        if (!object) {
          throw new Error('an identifier string \'' + options.imports + '\' was specified for JS object' +
            ' but could not find this object, pls ensure that file ' + options.src + ' contains it.');
        } else {
          return object;
        }
      } else {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        return require(resolvedPath); // reads both: JS and JSON!
      }
    } catch (err) { // probably a SyntaxError
      logger.error('Unexpected error: ' + err.stack);
      throw err;
    }
  } else if (isStream.readable(options.src)) {
    return await readFromStream(options.src, TYPE_JSON); // reads both: JS or JSON!
  } else if (options.imports) { // options.src is JS object here!
    const subObject = options.src[options.imports];
    logger.debug('LOADED JSON object (' + options.imports + '):: ' + stringify(subObject, null, 4));
    if (!subObject) {
      throw new Error('an identifier string \'' + options.imports + '\' was specified for JS object ' +
        'but could not find this object, pls ensure that object source contains it.');
    } else {
      return Object.assign({}, subObject); // clone, do not alter original object!
    }
  } else { // // options.src is JS object here!
    return Object.assign({}, options.src);  // clone, do not alter original object!
  }
}

/**
 * Loads a single YAML source containing document and returns a JS object.
 * *NOTE:* this function does not understand multi-document sources, it throws
 * exception on those.
 *
 * @param {module:jy-transform:type-definitions~ReaderOptions} options - Contains the YAML source reference
 *                                                                       to read from.
 * @returns {Promise.<Object>} Contains the read JS object.
 * @private
 */
async function readYaml(options) {
  if (typeof options.src === 'string') {
    // load source from YAML file
    const yaml = await fsPromisified.readFile(options.src, UTF8);
    logger.debug('YAML loaded from file ' + options.src);
    try {
      return jsYaml.safeLoad(yaml);
    } catch (err) { // probably a YAMLException
      logger.error('Unexpected error: ' + err.stack);
      throw err;
    }
  }
  // as validation has passed already, this can only be stream here
  return await readFromStream(options.src, TYPE_YAML);
}

// /**
// * Parses string as single YAML source containing multiple YAML document and turns a JS objects array.
// *
// * NOTE: This function does not understand multi-document sources, it throws exception on those.
// *
// * @param src {string} The YAML source to read.
// * @returns {Promise} Containing an array holding the multiple JSON objects.
// * @public
// */
// Reader.prototype.readYamls = function (src) {
//    // load source from YAML source
//    return fsPromisified.readFile(src, 'utf8')
//        .then(function(yaml) {
//            logger.debug('YAML documents loaded from ' + src); // TOD: can this be shortened? -> return
// Promise.resolve(jsYaml.safeLoadAll(yaml)); return Promise.resolve().then(function () { var jsDocs = []; return
// jsYaml.safeLoadAll(yaml, function (doc) { // TOD this will not work in Promise environment!!!
// self.logger.trace(doc); jsDocs.push(doc); }); }); }); }; }

/**
 * Reads a particular content type from a source provided in the passed `options`.
 *
 * @param {module:jy-transform:type-definitions~ReaderOptions} options - The read options.
 * @returns {Promise.<string>} Resolves with JS object result.
 * @public
 * @example
 * import { read } from 'jy-transform';
 *
 *
 * // --- from file path
 *
 * options = {
 *   src: 'foo.yml'
 * };
 *
 * read(options)
 *   .then(obj => console.log(JSON.stringify(obj)))
 *   .catch(console.error);
 *
 *
 * // --- from Readable
 *
 * options = {
 *   src: fs.createReadStream('foo.yml')
 * };
 *
 * read(options)
 *   .then(obj => console.log(JSON.stringify(obj)))
 *   .catch(console.error);
 */
export async function read(options) {
  const assertedOptions = await Joi.validate(options, readerOptionsSchema);
  switch (assertedOptions.origin) {
    case TYPE_JS:
    case TYPE_JSON:
      return await readJs(assertedOptions);
    default:
      return await readYaml(assertedOptions);
  }
}

export default {
  read,
};
