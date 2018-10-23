import os from 'os';
import jsonStringifySafe from 'json-stringify-safe';
import serializeJs from 'serialize-js';

/**
 * @module jy-transform:serialize-utils
 * @description This module provides an interface for serializing JS either to string or the JSON format.
 * @private
 */

/**
 * Creates a potential named `'module.exports[.exportsTo]'` string.
 *
 * @param {boolean} es5        - Whether to use ECMAScript5 export syntax.
 * @param {string} [exportsTo] - The export name.
 * @returns {Promise.<string>} Resolves with the exports string.
 * @private
 */
export async function createExportString(es5, exportsTo) {
  let exports = es5 ? 'module.exports' : 'export';
  if (exportsTo) {
    exports += es5 ? '.' + exportsTo + ' = ' : ` const ${exportsTo} = `;
  } else {
    exports += es5 ? ' = ' : ' default ';
  }
  return exports;
}

/**
 * Serialize a JS object to string.
 *
 * @param {Object} object        - The JS Object to serialize.
 * @param {WriteOptions} options - The write options.
 * @returns {Promise.<string>} - Promise resolve with the serialized JS content.
 * @private
 */
export async function serializeJsToString(object, options) {
  let useStrict = '';
  if (options.strict) {
    const quote = options.double ? '"' : '\'';
    useStrict = `${quote}use strict;${quote}${os.EOL}${os.EOL}`;
  }
  const exportsStr = await createExportString(options.es5, options.exports);
  return `${useStrict}${exportsStr}${serializeJs.serialize(object, {
    indent: options.indent,
    forceSingleQuotes: !options.double,
  })};${os.EOL}`;
}

/**
 * Serialize a JS object to JSON string.
 *
 * @param {Object} object - The object to serialize.
 * @param {number} indent - The code indention.
 * @returns {string} The serialized JSON.
 * @private
 */
export async function serializeJsToJsonString(object, indent) {
  return jsonStringifySafe(object, null, indent) + os.EOL;
}

