import logger from 'cli';
import { ensureMiddleware } from './middleware';
import { read } from './reader';
import { write } from './writer';

/**
 * @module jy-transform:transformer
 * @description This module provides the _transform_ functionality for YAML, JS or JSON source to destination mapping.
 * @public
 */

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
 * @param {Options} options - The configuration for a transformation.
 * @param {Function} [middleware] - This middleware Promise can be used to intercept
 *        the JSON object for altering the passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        <p>
 *        **NOTE:** the Promise has to return the processed JSON.
 * @returns {Promise.<String>} Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} Will throw this error when the passed `middleware` is not type of `Function`.
 * @throws {Error} Will throw plain error when writing to file failed due to any reason.
 * @public
 * @example
 * import { transform } from 'jy-transform';
 * const options = {...};
 * const middleware = async (json) {
 *   json.myproperty = 'new value';
 *   return json;
 * };
 *
 * // ---- Promise style:
 *
 * transform(options, middleware)
 *   .then(function (msg){
 *     console.log(msg);
 *   })
 *   .catch(function (err) {
 *     console.error(err.stack);
 *   });
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
  const ensuredMiddleware = ensureMiddleware(middleware);
  object = await ensuredMiddleware(object);
  return await write(object, options);
}

export default {
  transform,
};
