import logger from 'cli';
import path from 'path';
import fs from 'fs';
import isStream from 'is-stream';
import { read } from './reader';
import { write } from './writer';
import { EXT_TO_TYPE_MAP } from './constants';

/**
 * @module jy-transform:transformer
 * @description This module provides the _transform_ functionality for YAML, JS or JSON source to destination mapping.
 * @private
 */

/**
 * Applies the `middleware` function to `object` if is passed.
 *
 * @param {Object} object         - The object to alter by passed `middleware` function.
 * @param {Function} [middleware] - The function to alter `object`.
 * @returns {Object} The passed `object` which could be altered by optional `middleware` function.
 * @private
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

/**
 * Turns the destination file name into a name containing a consecutive
 * number if it exists. It iterates over the files until it finds a file
 * name which does not exist.
 *
 * @param {string} dest - The destination file.
 * @returns {string}    - A consecutive file name or the original one if
 *                        `dest` file does not exist.
 * @private
 */
function getConsecutiveDestName(dest) {
  let tmpDest = dest;
  let i = 0;
  const destDirName = path.dirname(tmpDest);
  const ext = path.extname(tmpDest);
  const basename = path.basename(tmpDest, ext);
  while (fs.existsSync(tmpDest)) {
    tmpDest = path.join(destDirName, basename + '(' + (i += 1) + ')' + ext);
  }
  return tmpDest;
}

/**
 * Checks if passed `object` is a file stream instance.
 *
 * @param {*} object - The object to check.
 * @returns {boolean} A `true` if passed `object` is a file stream instance, else `false`.
 * @private
 */
function isFileStream(object) {
  return isStream(object) && object.path;
}

/**
 * Returns the passes `dest` value or an adapted destination path (the latter if `target` is defined an differs from
 * destinations path extension).
 *
 * @param {string} dest     - The destination path.
 * @param {string} [target] - The target file type of destination.
 * @returns {string} The `dest` value or an adapted destination path.
 * @private
 */
function adaptTargetPathType(dest, target) {
  if (target) {
    const tmpDest = dest;
    const destDirName = path.dirname(tmpDest);
    const ext = path.extname(tmpDest);
    const basename = path.basename(tmpDest, ext);
    let destType = ext;
    if (ext.charAt(0) === '.') {
      destType = ext.substr(1);
    }
    if (EXT_TO_TYPE_MAP[destType] !== target) {
      destType = target;
    }
    return path.join(destDirName, basename + '.' + destType);
  }
  return dest;
}

// ////////////////////////////////////////////////////////////////////////////
// PUBLIC API
// ////////////////////////////////////////////////////////////////////////////

/**
 * The entry method for all transformation accepting a configuration object and
 * an (optional) middleware function. It executes the transformation logic.
 *
 * 1. Input (read)
 * 2. Transform [ + Middleware]
 * 3. Output (write).
 *
 * @param {TransformerOptions} options - The configuration for a transformation.
 * @param {Function} [middleware]      - This middleware Promise can be used to
 *        intercept the JSON object for altering the passed JSON, the function signature is:
 *        ```
 *        async function(object)
 *        ```
 *        <p>
 *        **NOTE:** the Promise has to return the processed JS object.
 * @returns {Promise} The result.
 * @resolve {string} With the transformation result as message (e.g. to be logged by caller).
 * @reject {TypeError} Will throw this error when the passed `middleware` is not type of `Function`.
 * @reject {ValidationError} If any `options` validation occurs.
 * @reject {Error} Will throw any error if read, transform or write operation failed due to any reason.
 * @public
 * @example
 * import { transform } from 'jy-transform';
 * const options = {...};
 *
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
 *
 * // ---- async/await style:
 *
 * try {
 *   const msg = await transform(options, middleware);
 *   console.log(msg);
 * } catch (err) {
 *   console.error(err.stack);
 * };
 */
export async function transform(options, middleware) {
  // logger.debug('transform'); TODO remove
  let object = await read(options);
  object = await callMiddlewareIfExists(object, middleware);

  // Here we have to check the options.dest, if not set we allow to use the source (string as
  // file path or File Writable with path) to be used as destination (and even allow to overwrite)!
  if (!options.dest && (typeof options.src === 'string' || isFileStream(options.src))) {
    if (options.force) {
      // Overwrite the source if target is set and does not differ!
      options.dest = adaptTargetPathType((options.src.path || options.src), options.target);
    } else {
      options.dest = getConsecutiveDestName(adaptTargetPathType((options.src.path || options.src), options.target));
    }
  }

  return write(object, options);
}

export default {
  transform,
};
