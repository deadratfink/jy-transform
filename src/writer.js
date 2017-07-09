import logger from 'cli';
import fs from 'fs';
import isStream from 'is-stream';
import jsYaml from 'js-yaml';
import jsonStringifySafe from 'json-stringify-safe';
import mkdirp from 'mkdirp-then';
import os from 'os';
import path from 'path';
import promisify from 'promisify-es6';
import serializeJs from 'serialize-js';
import {
  TYPE_JS,
  TYPE_JSON,
  TYPE_YAML,
  UTF8
} from './constants';
import Joi from './validation/joi-extensions';
import { writerOptionsSchema } from './validation/options-schema';

/**
 * @module jy-transform:writer
 * @description This module provides the _write_ functionality to write JS objects from memory to a JSON/JS/YAML
 * destination (file, object or {@link stream.Readable}).
 * @private
 */

/**
 * Promisified `fs` module.
 * @private
 */
const fsPromisified = promisify(fs);

// ////////////////////////////////////////////////////////////////////////////
// METHODS (PRIVATE)
// ////////////////////////////////////////////////////////////////////////////

/**
 * Creates a potential named `'module.exports[.exportsTo]'` string.
 *
 * @param {string} [exportsTo] - The export name.
 * @returns {Promise.<string>} Resolves with the exports string.
 * @private
 */
async function createExportsString(exportsTo) {
  let exports = 'module.exports';
  if (exportsTo) {
    exports += '.' + exportsTo + ' = ';
  } else {
    exports += ' = ';
  }
  return exports;
}

/**
 * Serialize a JS object to string.
 *
 * @param {Object} object      - The JS Object to serialize.
 * @param {number} indent      - The indention.
 * @param {string} [exportsTo] - Name for export (*IMPORTANT:* must be a valid ES6 identifier).
 * @returns {Promise.<string>} - Promise resolve with the serialized JS content.
 * @private
 * @todo [[#35](https://github.com/deadratfink/jy-transform/issues/35)] Add `'use strict';` in JS output file (->
 *   `'\'use strict\';' + os.EOL + os.EOL + ...`)?
 */
async function serializeJsToString(object, indent, exportsTo) {
  const exportsStr = await createExportsString(exportsTo);
  return exportsStr + serializeJs.serialize(object, { indent }) + ';' + os.EOL;
}

/**
 * Serialize a JS object to JSON string.
 *
 * @param {Object} object - The object to serialize.
 * @param {number} indent - The code indention.
 * @returns {string} The serialized JSON.
 * @private
 */
async function serializeJsToJsonString(object, indent) {
  return jsonStringifySafe(object, null, indent) + os.EOL;
}

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
 * Ensures that all dirs exists for file type `dest` and writes the JS object to file.
 *
 * @param {string} object            - The object to write into file.
 * @param {string} dest              - The file destination path.
 * @param {string} target            - The target type, one of [ 'yaml' | 'json' | 'js' ].
 * @param {boolean} [forceOverwrite] - Forces overwriting the destination file if `true`.
 * @private
 */
async function mkdirAndWrite(object, dest, target, forceOverwrite) {
  const destDir = path.dirname(dest);
  // logger.debug('Destination dir: ' + destDir); TODO remove
  await mkdirp(destDir);
  // logger.debug('Destination dir ' + destDir + ' successfully written'); TODO remove
  let finalDestination = dest;
  if (forceOverwrite === undefined || forceOverwrite === false) {
    finalDestination = getConsecutiveDestName(dest);
    // logger.debug('Setting was: do not overwrite, using destination ' + finalDestination + '.'); TODO remove
  }
  await fsPromisified.writeFile(finalDestination, object, UTF8);
  return 'Writing \'' + target + '\' file \'' + finalDestination + '\' successful.';
}

/**
 * Writes a serialized object to file.
 *
 * @param {string} object            - The object to write into file.
 * @param {string} dest              - The file destination path.
 * @param {string} target            - The target type, one of [ 'yaml' | 'json' | 'js' ].
 * @param {boolean} [forceOverwrite] - Forces overwriting the destination file if `true`.
 * @see {@link TYPE_YAML}
 * @see {@link TYPE_JSON}
 * @see {@link TYPE_JS}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @throws {Error} If serialized JSON file could not be written due to any reason.
 * @private
 */
function writeToFile(object, dest, target, forceOverwrite) {
  return new Promise((resolve, reject) => {
    fsPromisified.stat(dest)
      .then((stats) => {
        if (stats.isDirectory()) {
          reject(new Error('Destination file is a directory, pls specify a valid file resource!'));
          return;
        }
        // file exists
        resolve(mkdirAndWrite(object, dest, target, forceOverwrite));
      })
      .catch(() => {
        // ignore error (because file could possibly not exist at this point of time)
        resolve(mkdirAndWrite(object, dest, target, forceOverwrite));
      });
  });
}

/**
 * Writes a string serialized data object to a stream.
 *
 * @param {string} object - The data to write into stream.
 * @param {string} dest   - The stream destination.
 * @param {string} target - The target type, one of [ 'yaml' | 'json' | 'js' ].
 * @see {@link TYPE_YAML}
 * @see {@link TYPE_JSON}
 * @see {@link TYPE_JS}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @throws {Error} If serialized JS object could not be written due to any reason.
 * @private
 */
function writeToStream(object, dest, target) {
  return new Promise((resolve, reject) => {
    dest
      .on('error', reject)
      .on('finish', () => resolve('Writing ' + target + ' to stream successful.'));

    // write stringified data
    dest.write(object);
    dest.end();
  });
}

/**
 * Writes a JS object to a YAML destination.
 *
 * @param {Object} object         - The JS object to write into YAML destination.
 * @param {WriterOptions} options - The write destination and indention.
 * @see {@link MIN_INDENT}
 * @see {@link DEFAULT_INDENT}
 * @see {@link MAX_INDENT}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @throws {Error} If YAML destination could not be written due to any reason.
 * @private
 */
async function writeYaml(object, options) {
  let yaml;
  try {
    yaml = jsYaml.safeDump(object, { indent: options.indent, noRefs: true });
  } catch (err) {
    err.message = 'Could not write YAML to \'' + options.dest + '\', cause: ' + err.message;
    throw err;
  }

  if (typeof options.dest === 'string') { // file
    return writeToFile(yaml, options.dest, TYPE_YAML, options.force);
  } else if (isStream.writable(options.dest)) { // stream
    return writeToStream(yaml, options.dest, TYPE_YAML);
  }
  // object
  options.dest = yaml;
  return 'Writing serialized YAML to options.dest successful.';
}

/**
 * Writes a JS object to a JSON destination.
 *
 * @param {Object} object         - The JS object to write into JSON destination.
 * @param {WriterOptions} options - The write destination and indention.
 * @see {@link MIN_INDENT}
 * @see {@link DEFAULT_INDENT}
 * @see {@link MAX_INDENT}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @private
 */
async function writeJson(object, options) {
  const jsonString = await serializeJsToJsonString(object, options.indent);
  if (typeof options.dest === 'string') { // file
    return writeToFile(jsonString, options.dest, TYPE_JSON, options.force);
  } else if (isStream.writable(options.dest)) { // stream
    return writeToStream(jsonString, options.dest, TYPE_JSON);
  }
  // object
  options.dest = jsonString;
  return 'Writing JSON to options.dest successful.';
}

/**
 * Writes a JS object to a JS destination. The object is prefixed by `module.exports[.${options.exports}] = `.
 *
 * @param {Object} object         - The JSON to write into JS destination.
 * @param {WriterOptions} options - The write destination and indention.
 * @see {@link MIN_INDENT}
 * @see {@link DEFAULT_INDENT}
 * @see {@link MAX_INDENT}
 * @returns {Promise.<string>} - Containing the write success message to handle by caller (e.g. for logging).
 * @private
 */
async function writeJs(object, options) {
  const data = await serializeJsToString(object, options.indent, options.exports);
  if (typeof options.dest === 'string') { // file
    return writeToFile(data, options.dest, TYPE_JS, options.force);
  } else if (isStream.writable(options.dest)) { // stream
    return writeToStream(data, options.dest, TYPE_JS);
  }
  // object
  let msg;
  if (options.exports) {
    options.dest[options.exports] = object;
    msg = 'Writing JS to options.dest.' + options.exports + ' successful.';
  } else {
    Object.assign(options.dest, object);
    msg = 'Writing JS to options.dest successful.';
  }
  return msg;
}

/**
 * Writes the passe JS object to a particular destination described by the passed `options`.
 *
 * @param {Object} object         - The JS source object to write.
 * @param {WriterOptions} options - The write options.
 * @returns {Promise} The result.
 * @resolve {string} With the write success message.
 * @reject {Error} If any write error occurs.
 * @reject {ValidationError} If any `options` validation occurs.
 * @public
 * @example
 * import { write } from 'jy-transform';
 *
 *
 * // ---- write obj to file ---
 *
 * const obj = {...};
 * const options = {
 *   dest: 'result.js',
 *   indent: 4
 * }
 *
 * write(obj, options)
 *   .then(console.log)
 *   .catch(console.error);
 *
 *
 * // ---- write obj to Writable ---
 *
 * options = {
 *   dest: fs.createWriteStream('result.json'),
 *   indent: 4
 * }
 *
 * write(obj, options)
 *   .then(console.log)
 *   .catch(console.error);
 *
 *
 * // ---- write obj to object ---
 *
 * options = {
 *   dest: {},
 *   indent: 4
 * }
 *
 * write(obj, options)
 *   .then(console.log)
 *   .catch(console.error);
 */
export async function write(object, options) {
  console.log('OPTIONS ON WRITE ===> ' + JSON.stringify(options, null, 4))
  const validatedOptions = await Joi.validate(options, writerOptionsSchema);

  // HINT: we have to use the original options object because the caller must not loose the reference to options.dest,
  // so we copy everything here except the assertedOptions.dest (joi does not return the original reference)!
  Object.assign(options, { target: validatedOptions.target }, { exports: validatedOptions.exports },
    { indent: validatedOptions.indent }, { force: validatedOptions.force });
  validatedOptions.dest = options.dest;
  switch (validatedOptions.target) {
    case TYPE_JSON:
      return writeJson(object, options);
    case TYPE_YAML:
      return writeYaml(object, options);
    default:
      return writeJs(object, options);
  }
}

export default {
  write,
};
