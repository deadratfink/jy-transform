import isStream from 'is-stream';
import jsYaml from 'js-yaml';
import {
  TYPE_JS,
  TYPE_JSON,
  TYPE_YAML,
} from './constants';
import Joi from './validation/joi-extensions';
import { writeOptionsSchema } from './validation/options-schema';
import {
  serializeJsToJsonString,
  serializeJsToString
} from './serialize-utils';
import {
  writeToFile,
  writeToStream,
} from './io-utils';

/**
 * @module jy-transform:writer
 * @description This module provides the _public_ interface for the _write_ functionality to write JS objects from
 * memory to a JSON/JS/YAML destination (file, `Object` or {@link stream.Writable}).
 * @private
 */

// ////////////////////////////////////////////////////////////////////////////
// METHODS (PRIVATE)
// ////////////////////////////////////////////////////////////////////////////

/**
 * Writes a JS object to a YAML destination.
 *
 * @param {Object} object        - The JS object to write into YAML destination.
 * @param {WriteOptions} options - The write destination and indention.
 * @see {@link MIN_INDENT}
 * @see {@link DEFAULT_INDENT}
 * @see {@link MAX_INDENT}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @throws {Error} If YAML destination could not be written due to any reason.
 * @private
 */
async function writeYaml(object, options) {
  let yaml;
  try {
    yaml = jsYaml.safeDump(object, { indent: options.indent, noRefs: true });
  } catch (err) {
    err.message = 'Could not write YAML to \'' + options.dest + '\', cause: ' + err.message;
    throw err;
  }

  if (typeof options.dest === 'string') { // file
    return writeToFile(yaml, options.dest, TYPE_YAML, options.force);
  } else if (isStream.writable(options.dest)) { // stream
    return writeToStream(yaml, options.dest, TYPE_YAML);
  }
  // object
  options.dest = yaml;
  return 'Writing serialized YAML to options.dest successful.';
}

/**
 * Writes a JS object to a JSON destination.
 *
 * @param {Object} object        - The JS object to write into JSON destination.
 * @param {WriteOptions} options - The write destination and indention.
 * @see {@link MIN_INDENT}
 * @see {@link DEFAULT_INDENT}
 * @see {@link MAX_INDENT}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @private
 */
async function writeJson(object, options) {
  const jsonString = await serializeJsToJsonString(object, options.indent);
  if (typeof options.dest === 'string') { // file
    return writeToFile(jsonString, options.dest, TYPE_JSON, options.force);
  } else if (isStream.writable(options.dest)) { // stream
    return writeToStream(jsonString, options.dest, TYPE_JSON);
  }
  // object
  options.dest = jsonString;
  return 'Writing JSON to options.dest successful.';
}

/**
 * Writes a JS object to a JS destination.
 *
 * @param {Object} object        - The JSON to write into JS destination.
 * @param {WriteOptions} options - The write options.
 * @see {@link MIN_INDENT}
 * @see {@link DEFAULT_INDENT}
 * @see {@link MAX_INDENT}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @private
 */
async function writeJs(object, options) {
  const data = await serializeJsToString(object, options);
  if (typeof options.dest === 'string') { // file
    return writeToFile(data, options.dest, TYPE_JS, options.force);
  } else if (isStream.writable(options.dest)) { // stream
    return writeToStream(data, options.dest, TYPE_JS);
  }
  // object
  let msg;
  if (options.exports) {
    options.dest[options.exports] = object;
    msg = 'Writing JS to options.dest.' + options.exports + ' successful.';
  } else {
    Object.assign(options.dest, object);
    msg = 'Writing JS to options.dest successful.';
  }
  return msg;
}

/**
 * Writes the passed JS object to a particular destination described by the passed `options`.
 *
 * @param {Object} object        - The JS source object to write.
 * @param {WriteOptions} options - The write options.
 * @returns {Promise} The result.
 * @resolve {string} With the write success message.
 * @reject {Error} If any write error occurs.
 * @reject {ValidationError} If any `options` validation occurs.
 * @public
 * @example
 * import { write } from 'jy-transform';
 *
 *
 * // ---- write obj to file ---
 *
 * const obj = {...};
 * const options = {
 *   dest: 'result.js',
 *   indent: 4
 * }
 *
 * write(obj, options)
 *   .then(console.log)
 *   .catch(console.error);
 *
 *
 * // ---- write obj to Writable ---
 *
 * options = {
 *   dest: fs.createWriteStream('result.json'),
 *   indent: 4
 * }
 *
 * write(obj, options)
 *   .then(console.log)
 *   .catch(console.error);
 *
 *
 * // ---- write obj to object ---
 *
 * options = {
 *   dest: {},
 *   indent: 4
 * }
 *
 * write(obj, options)
 *   .then(console.log)
 *   .catch(console.error);
 */
export async function write(object, options) {
  const validatedOptions = await Joi.validate(options, writeOptionsSchema);
  // HINT: we have to use the original options object because the caller must not loose the reference to options.dest!
  validatedOptions.dest = options.dest;
  switch (validatedOptions.target) {
    case TYPE_JSON:
      return writeJson(object, options);
    case TYPE_YAML:
      return writeYaml(object, options);
    default:
      return writeJs(object, options);
  }
}

export default {
  write,
};
