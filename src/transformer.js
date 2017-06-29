import logger from 'cli';
import { read } from './reader';
import { write } from './writer';

/**
 * @module jy-transform:transformer
 * @description This module provides the _transform_ functionality for YAML, JS or JSON source to destination mapping.
 * @public
 */

const callMiddlewareIfExists = async (object, middleware) => {
  if (middleware !== undefined && typeof middleware !== 'function') {
    throw new TypeError('The provided middleware is not a Function type');
  }
  if (!middleware) {
    return object;
  }
  return middleware(object);
};

// ////////////////////////////////////////////////////////////////////////////
// PUBLIC API
// ////////////////////////////////////////////////////////////////////////////

/**
 * The entry method for all transformation accepting a configuration object and
 * an (optional) middleware function. It executes the transformation logic:
 * 1. Input (read)
 * 2. Transform [ + Middleware]
 * 3. Output (write).
 *
 * @param {module:type-definitions~TransformerOptions} options - The configuration for a transformation.
 * @param {Function} [middleware]                              - This middleware Promise can be used to intercept
 *        the JSON object for altering the passed JSON, the function signature is:
 *        ```
 *        function(object)
 *        ```
 *        <p>
 *        **NOTE:** the Promise has to return the processed JSON.
 * @returns {Promise.<String>} Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} Will throw this error when the passed `middleware` is not type of `Function`.
 * @throws {Error} Will throw plain error when writing to _destination object_ failed due to any reason.
 * @public
 * @example
 * import { transform } from 'jy-transform';
 * const options = {...};
 * const middleware = async (object) {
 *   object.myproperty = 'new value';
 *   return object;
 * };
 *
 * // ---- Promise style:
 *
 * transform(options, middleware)
 *   .then(console.log)
 *   .catch(console.error);
 *
 * // ---- async/await style:
 * try {
 *   const msg = await transform(options, middleware);
 *   console.log(msg);
 * } catch (err) {
 *   console.error(err.stack);
 * };
 */
export async function transform(options, middleware) {
  logger.debug('transform');
  let object = await read(options);
  object = await callMiddlewareIfExists(object, middleware);
  return await write(object, options);
}

export default {
  transform,
};
