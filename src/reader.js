import jsYaml from 'js-yaml';
import promisify from 'promisify-es6';
import { Buffer } from 'buffer';
import path from 'path';
import fs from 'fs';
import isStream from 'is-stream';
import { readOptionsSchema } from './validation/options-schema';
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
 * @private
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
          // logger.debug(origin + ' reading from Readable'); TODO remove
          if (origin === TYPE_JSON || origin === TYPE_JS) {
            resolve(JSON.parse(buffer.toString(UTF8)));
          } else { // HINT: commented (see below): if (origin === YAML) {
            resolve(jsYaml.safeLoad(buffer.toString(UTF8)));
          }
        } catch (err) { // probably a SyntaxError for JSON or a YAMLException
          // logger.error('Unexpected error: ' + err.stack); TODO remove
          readable.emit('error', err); // send to .on('error',...
        }
      });
  });
}

/**
 * Reads the data from a given JS or JSON source.
 *
 * @param {ReadOptions} options - Contains the JS/JSON source reference to read from.
 * @returns {Promise.<Object>} Contains the read JS object.
 * @private
 */
async function readJs(options) {
  if (typeof options.src === 'string') { // path to JSON or JS file
    const resolvedPath = path.resolve('', options.src);
    if (options.imports) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const object = require(resolvedPath)[options.imports];
      if (!object) { // TODO check this as part of config validation?
        throw new Error('an identifier string \'' + options.imports + '\' was specified for JS object ' +
          'but could not find this object, pls ensure that file ' + options.src + ' contains it.');
      } else {
        return object;
      }
    } else {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      return require(resolvedPath); // reads both: JS and JSON!
    }
  } else if (isStream.readable(options.src)) {
    return readFromStream(options.src, TYPE_JSON); // reads both: JS or JSON!
  } else if (options.imports) { // options.src is JS object here!
    const subObject = options.src[options.imports];
    // logger.debug('LOADED JSON object (' + options.imports + '):: ' + stringify(subObject, null, 4)); TODO remove
    if (!subObject) {
      throw new Error('an identifier string \'' + options.imports + '\' was specified for JS object ' +
        'but could not find this object, pls ensure that object source contains it.');
    } else {
      return Object.assign({}, subObject); // clone, do not alter original object!
    }
  } else { // options.src is JS object here!
    return Object.assign({}, options.src); // clone, do not alter original object!
  }
}

/**
 * Loads a single YAML source containing document and returns a JS object.
 * *NOTE:* this function does not understand multi-document sources, it throws
 * exception on those.
 *
 * @param {ReadOptions} options - Contains the YAML source reference to read from.
 * @returns {Promise.<Object>} Contains the read JS object.
 * @private
 */
async function readYaml(options) {
  if (typeof options.src === 'string') {
    // load source from YAML file
    const yaml = await fsPromisified.readFile(options.src, UTF8);
    // logger.debug('YAML loaded from file ' + options.src); TODO remove
    try {
      return jsYaml.safeLoad(yaml);
    } catch (err) { // probably a YAMLException
      // logger.error('Unexpected error: ' + err.stack); TODO remove
      throw err;
    }
  }
  // as validation has passed already, this can only be stream here
  return readFromStream(options.src, TYPE_YAML);
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
 * @param {ReadOptions} options - The read options.
 * @returns {Promise} The result.
 * @resolve {string} Resolves with JS object result.
 * @reject {ValidationError} If any `options` validation occurs.
 * @reject {Error} If any write error occurs.
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
  const validatedOptions = await Joi.validate(options, readOptionsSchema);
  switch (validatedOptions.origin) {
    case TYPE_JS:
    case TYPE_JSON:
      return readJs(validatedOptions);
    default:
      return readYaml(validatedOptions);
  }
}

export default {
  read,
};
