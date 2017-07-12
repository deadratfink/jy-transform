import Joi from './validation/joi-extensions';
import { read } from './reader';
import { write } from './writer';
import { transformOptionsSchema } from './validation/options-schema';

/**
 * @module jy-transform:transformer
 * @description This module provides the _transform_ functionality for YAML, JS or JSON source to destination mapping.
 * @private
 */

/**
 * The entry method for all transformations accepting a configuration object and
 * an (optional) middleware function. It executes the transformation logic.
 *
 * 1. Input (read)
 * 2. Transform [ + Middleware]
 * 3. Output (write).
 *
 * @param {TransformOptions} options - The configuration for a transformation.
 * @returns {Promise} The transformation result.
 * @resolve {string} With the transformation result as message (e.g. to be logged by caller).
 * @reject {TypeError} Will throw this error when the passed `middleware` is not type of `Function`.
 * @reject {ValidationError} If any `options` validation occurs.
 * @reject {Error} Will throw any error if read, transform or write operation failed due to any reason.
 * @public
 * @example
 * import { transform } from 'jy-transform';
 * const options = {
 *   src: 'foo/bar.yaml',            // From YAML file...
 *   transform: async (object) => {  // ...with exchanging value...
 *     object.foo = 'new value';
 *     return object;
 *   },
 *   target: 'foo/bar.json',         // ...to a new JSON file.
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
export async function transform(options) {
  const validatedOptions = await Joi.validate(options, transformOptionsSchema);
  let object = await read(validatedOptions);
  object = await validatedOptions.transform(object);

  if (options.dest) {
    validatedOptions.dest = options.dest; // Do not loose ref to original object!
  }
  return write(object, validatedOptions);
}

export default {
  transform,
};
