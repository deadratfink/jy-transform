import path from 'path';
import isStream from 'is-stream';
import {
  EXT_TO_TYPE_MAP,
  DEFAULT_ORIGIN,
  DEFAULT_TARGET,
} from '../constants';

/**
 * @module jy-transform:validation:options-schema-helper
 * @description Provides some helper functions used in {@link module:validation:options-schema} to resolve default
 * values for origin and target depending on the `options.src` or `options.dest` value.
 * @type {Object}
 * @see {@link module:validation:options-schema}
 * @private
 */


/**
 * Checks if passed `object` is a file stream instance.
 *
 * @param {*} object - The object to check.
 * @returns {boolean} A `true` if passed `object` is a file stream instance, else `false`.
 * @private
 */
const isFileStream = (object) => {
  return isStream(object) && object.path;
};

/**
 * Returns the passes `dest` value or an adapted destination path (the latter if `target` is defined an differs from
 * destinations path extension).
 *
 * @param {string} dest     - The destination path.
 * @param {string} [target] - The target file type of destination.
 * @returns {string} The `dest` value or an adapted destination path.
 * @private
 */
const adaptTargetPathType = (dest, target) => {
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
};

/**
 * This function is used to infer a _default_ value in case `options.dest` is not defined.
 * Checks if `context.src` is either a string or a file stream where can get the file path from.
 * If this detection process cannot be fulfilled (i.e. we cannot infer from options.src `Object`
 * type or a `Readable` type which is not a _file_ stream) then the function returns `undefined`.
 *
 * @param {Object} context - The validation context.
 * @returns {string|undefined} The adapted `dest` path if possible, or `undefined`.
 */
export const inferDestDefaultFromSrc = (context) => {
  if (typeof context.src === 'string' || isFileStream(context.src)) {
    return adaptTargetPathType((context.src.path || context.src), context.target);
  }
  return undefined;
};

/**
 * Infer from path extension to a type using default value as fallback.
 *
 * @param {string} pathStr      - The file path with or without extension.
 * @param {string} defaultValue - The default value to use if type cannot be inferred from path.
 * @returns {string} A type value.
 * @private
 */
const getTypeFromFilePath = (pathStr, defaultValue) => {
  let type;
  if (typeof pathStr === 'string') { // this is needed since node.js versions < v6 do not support throwing a TypeError!
    let ext = path.extname(pathStr);
    if (ext.charAt(0) === '.') {
      ext = ext.substr(1);
    }
    type = EXT_TO_TYPE_MAP[ext];
  }
  if (!type) {
    type = defaultValue;
  }
  return type;
};

/**
 * Infers the _origin_ type value from current validation context.
 *
 * @param {Object} context - The validation context.
 * @returns {string} The target type.
 * @protected
 */
export const inferOriginDefault = (context) => {
  let type;
  if (isStream.readable(context.src)) {
    type = getTypeFromFilePath(context.src.path, DEFAULT_ORIGIN);
  } else if (typeof context.src === 'string') {
    type = getTypeFromFilePath(context.src, DEFAULT_ORIGIN);
  } else {
    type = DEFAULT_ORIGIN;
  }
  return type;
};

/**
 * Infers the _target_ type value from current validation context.
 *
 * @param {Object} context - The validation context.
 * @returns {string} The target type.
 * @protected
 */
export const inferTargetDefault = (context) => {
  let type;
  if (isStream.writable(context.dest)) {
    type = getTypeFromFilePath(context.dest.path, DEFAULT_TARGET);
  } else if (typeof context.dest === 'string') {
    type = getTypeFromFilePath(context.dest, DEFAULT_TARGET);
  } else {
    type = DEFAULT_TARGET;
  }
  return type;
};

export default {
  inferOriginDefault,
  inferTargetDefault,
  inferDestDefaultFromSrc,
};
