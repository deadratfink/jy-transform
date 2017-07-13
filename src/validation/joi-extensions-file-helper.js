import fs from 'fs';
import path from 'path';

/**
 * @module jy-transform:validation:joi-extensions-file-helper
 * @description An (extended) Joi validation schema helper functions for the module options on FS validation.
 * @private
 */

/**
 * Checks if given `pathStr` is an existing file after resolving `pathStr` relative to CWD.
 *
 * @param {string} pathStr - The string to check for being a file.
 * @returns {boolean} Value `true` if it is a file and exists, else `false`.
 * @protected
 */
export function isExistingFile(pathStr) {
  const filePath = path.resolve(pathStr);
  try {
    const stats = fs.statSync(filePath);
    return stats.isFile();
  } catch (err) {
    return false;
  }
}