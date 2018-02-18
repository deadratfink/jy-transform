import { transform as _transform } from './transformer';
import { read as _read } from './reader';
import { write as _write } from './writer';
import {
  TYPE_YAML as _TYPE_YAML,
  TYPE_JS as _TYPE_JS,
  TYPE_JSON as _TYPE_JSON,
} from './constants';

/**
 * @module jy-transform
 * @description This module provides the _public_ interface for the _read_, _write_ and _transform_ functionality.
 * @public
 * @author Jens Krefeldt <j.krefeldt@gmail.com>
 */

/**
 * The entry method for all transformations accepting a configuration object and
 * an (optional) callback function. It executes the transformation logic.
 *
 * 1. Input (read)
 * 2. Transform [ + callback]
 * 3. Output (write).
 *
 * @param {TransformOptions} options - The configuration for a transformation.
 * @returns {Promise} The transformation result.
 * @resolve {string} With the transformation result as message (e.g. to be logged by caller).
 * @reject {ValidationError} If any `options` validation occurs.
 * @reject {Error} Will throw any error if read, transform or write operation failed due to any reason.
 * @public
 * @example
 * import { transform } from 'jy-transform';
 * const options = {
 *   src: 'foo/bar.yaml',                 // From YAML file...
 *   transform: async (object) => {       // ...callback with exchanging value...
 *     object.foo = 'new value';
 *     return object;
 *   },
 *   target: 'foo/bar-transformed.json',  // ...to a new JSON file.
 *   indent: 4,
 * };
 *
 * // ---- Promise style:
 *
 * transform(options)
 *   .then(console.log)
 *   .catch(console.error);
 *
 *
 * // ---- async/await style:
 *
 * try {
 *   const msg = await transform(options);
 *   console.log(msg);
 * } catch (err) {
 *   console.error(err.stack);
 * };
 */
export const transform = _transform;
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
export const read = _read;

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
export const write = _write;

/**
 * The `'yaml'` type constant.
 * @type {string}
 * @constant
 * @public
 */
export const TYPE_YAML = _TYPE_YAML;

/**
 * The `'js'` type constant.
 * @type {string}
 * @constant
 * @public
 */
export const TYPE_JS = _TYPE_JS;

/**
 * The `'json'` type constant.
 * @type {string}
 * @constant
 * @public
 */
export const TYPE_JSON = _TYPE_JSON;
