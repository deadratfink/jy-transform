import isStream from 'is-stream';
import { readOptionsSchema } from './validation/options-schema';
import Joi from './validation/joi-extensions';
import {
  readJsFromObject,
  readJsOrJsonFromFile,
  readYamlFromfile,
  readFromStream,
} from './io-utils';
import {
  TYPE_YAML,
  TYPE_JS,
  TYPE_JSON,
} from './constants';

/**
 * @module jy-transform:reader
 * @description This module provides the _public_ interface for the _read_ functionality of YAML, JS or JSON sources
 * (file, `Object` or {@link stream.Readable}).
 * @private
 */

/**
 * Reads the data from a given JS or JSON source.
 *
 * @param {ReadOptions} options - Contains the JS/JSON source reference to read from.
 * @returns {Promise.<Object>} Contains the read JS object.
 * @private
 */
async function readJsOrJson(options) {
  if (typeof options.src === 'string') { // path to JSON or JS file
    return readJsOrJsonFromFile(options.src, options.imports);
  } else if (isStream.readable(options.src)) {
    return readFromStream(options.src, TYPE_JSON); // reads both: JS or JSON!
  }
  // options.src is JS object here!
  return readJsFromObject(options.src, options.imports);
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
    return readYamlFromfile(options.src);
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
      return readJsOrJson(validatedOptions);
    default:
      return readYaml(validatedOptions);
  }
}

export default {
  read,
};
