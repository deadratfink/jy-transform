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
};
