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
 * @param {boolean} es6        - Whether to use ECMAScript6 export syntax.
 * @param {string} [exportsTo] - The export name.
 * @returns {Promise.<string>} Resolves with the exports string.
 * @private
 */
export async function createExportString(es6, exportsTo) {
  let exports = es6 ? 'export' : 'module.exports';
  if (exportsTo) {
    exports += es6 ? ` const ${exportsTo} = ` : '.' + exportsTo + ' = ';
  } else {
    exports += es6 ? ' default ' : ' = ';
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
    const quote = options['no-single'] ? '"' : '\'';
    useStrict = `${quote}use strict;${quote}${os.EOL}${os.EOL}`;
  }
  const exportsStr = await createExportString(!options['no-es6'], options.exports);
  return `${useStrict}${exportsStr}${serializeJs.serialize(object, {
    indent: options.indent,
    forceSingleQuotes: !options['no-single'],
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

