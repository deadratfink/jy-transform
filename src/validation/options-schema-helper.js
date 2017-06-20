import path from 'path';
import logger from 'cli';
import isStream from 'is-stream';
import {
  TYPE_MAP,
  DEFAULT_ORIGIN,
  DEFAULT_TARGET,
} from '../constants';

/**
 * @module jy-transform:validation:options-schema-helper
 * @description Provides some helper functions used in {@link module:validation:options-schema} to resolve default
 * values for origin and target depending on the `options.src` or `options.dest` value.
 * @type {Object}
 * @protected
 * @see {@link module:validation:options-schema}
 */

/**
 * Infer from path extension to a type using default value as fallback.
 *
 * @param {string} pathStr      - The file path with or without extension.
 * @param {boolean} origin      - If the type is origin (true) or target (false).
 * @param {string} defaultValue - The default value to use if type cannot be inferred from path.
 * @returns {string} A type value.
 * @private
 */
const getTypeFromFilePath = (pathStr, origin, defaultValue) => {
  let type;
  try {
    let ext = path.extname(pathStr);
    if (ext.charAt(0) === '.') {
      ext = ext.substr(1);
    }
    type = TYPE_MAP[ext];
    if (!type) {
      type = defaultValue;
    }
  } catch (err) {
    logger.error(err.stack);
    type = defaultValue;
  }
  return type;
};

/**
 * TODO describe me.
 *
 * @param {Object} context - TODO describe me.
 * @returns {string} The origin type.
 * @protected
 */
export const inferOriginDefaultFromStreamReadableFilePath = (context) => {
  let type;
  if (isStream.readable(context.dest)) {
    type = getTypeFromFilePath(context.src.path, true, DEFAULT_ORIGIN);
  } else {
    type = DEFAULT_ORIGIN;
  }
  return type;
};

/**
 * TODO describe me.
 *
 * @param {Object} context - TODO describe me.
 * @returns {string} The origin type.
 * @protected
 */
export const inferOriginDefaultFromFilePath = (context) => {
  return getTypeFromFilePath(context.src, true, DEFAULT_ORIGIN);
};

/**
 * TODO describe me.
 *
 * @param {Object} context - TODO describe me.
 * @returns {string} The target type.
 * @protected
 */
export const inferTargetDefaultFromStreamWritableFilePath = (context) => {
  let type;
  if (isStream.writable(context.dest)) {
    type = getTypeFromFilePath(context.dest.path, false, DEFAULT_TARGET);
  } else {
    type = DEFAULT_TARGET;
  }
  return type;
};

/**
 * TODO describe me.
 *
 * @param {Object} context - TODO describe me.
 * @returns {string} The target type.
 * @protected
 */
export const inferTargetDefaultFromFilePath = (context) => {
  let destType;
  if (typeof context.dest === 'string') {
    destType = getTypeFromFilePath(context.dest, false, DEFAULT_TARGET);
  } else {
    destType = DEFAULT_TARGET;
  }
  return destType;
};

export default {
  inferOriginDefaultFromStreamReadableFilePath,
  inferTargetDefaultFromStreamWritableFilePath,
  inferOriginDefaultFromFilePath,
  inferTargetDefaultFromFilePath,
};
