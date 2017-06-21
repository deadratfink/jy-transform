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
 * @public
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
function createExportsString(exportsTo) {
  return new Promise((resolve) => {
    let exports = 'module.exports';
    if (exportsTo) {
      exports += '.' + exportsTo + ' = ';
    } else {
      exports += ' = ';
    }
    resolve(exports);
  });
}

/**
 * Serialize a JS object to string.
 *
 * @param {Object} object      - The JS Object to serialize.
 * @param {number} indent      - The indention.
 * @param {string} [exportsTo] - Name for export (*IMPORTANT:* must be a valid ES6 identifier).
 * @returns {Promise}          - Promise resolve with the serialized JS object.
 * @private
 * @todo [[#35](https://github.com/deadratfink/jy-transform/issues/35)] Add `'use strict';` in JS output file (->
 *   `'\'use strict\';' + os.EOL + os.EOL + ...`)?
 */
function serializeJsToString(object, indent, exportsTo) {
  return createExportsString(exportsTo)
    .then(exportsStr => exportsStr + serializeJs.serialize(object, { indent }) + ';' + os.EOL);
}

/**
 * Serialize a JS object to JSON string.
 *
 * @param {Object} object - Object to serialize.
 * @param {number} indent - Indention.
 * @returns {string}  The serialized JSON.
 * @private
 */
function serializeJsToJsonString(object, indent) {
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
 * Writes a serialized object to file.
 *
 * @param {string} object            - The object to write into file.
 * @param {string} dest              - The file destination path.
 * @param {string} target            - The target type, one of [ 'yaml' | 'json' | 'js' ].
 * @param {Function} resolve         - The Promise `resolve` callback.
 * @param {Function} reject          - The Promise `reject` callback.
 * @param {boolean} [forceOverwrite] - Forces overwriting the destination file if `true`.
 * @see {@link TYPE_YAML}
 * @see {@link TYPE_JSON}
 * @see {@link TYPE_JS}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @throws {Error} If serialized JSON file could not be written due to any reason.
 * @private
 */
function writeToFile(object, dest, target, resolve, reject, forceOverwrite) {
  /**
   * Ensures that all dirs exists for `dest` and writes the file.
   *
   * @private
   */
  function mkdirAndWrite() {
    const destDir = path.dirname(dest);
    logger.debug('Destination dir: ' + destDir);
    mkdirp(destDir)
      .then(() => {
        logger.debug('Destination dir ' + destDir + ' successfully written');
        if (forceOverwrite === undefined || forceOverwrite === false) { // TODO shorten
          dest = getConsecutiveDestName(dest);
          logger.debug('Setting was: do not overwrite, using destination ' + dest + '.');
        }
        return fsPromisified.writeFile(dest, object, UTF8);
      })
      .then(() => resolve('Writing \'' + target + '\' file \'' + dest + '\' successful.'))
      .catch((err) => {
        err.message = 'Could not write \'' + target + '\' file \'' + dest + '\', cause: ' + err.message;
        reject(err);
      });
  }

  return fsPromisified.stat(dest)
    .then((stats) => {
      if (stats.isDirectory()) { // TODO remove when checked by Schema? Hmm, it could not exist at this point of time...!
        reject(new Error('Destination file is a directory, pls specify a valid file resource!'));
      } else {
        // file exists
        mkdirAndWrite();
      }
    })
    .catch((err) => {
      // ignore error (because file could possibly not exist at this point of time)
      mkdirAndWrite();
    });
}

/**
 * Writes a string serialized data object to a stream.
 *
 * @param {string} object    - The data to write into stream.
 * @param {string} dest      - The stream destination.
 * @param {string} target    - The target type, one of [ 'yaml' | 'json' | 'js' ].
 * @param {Function} resolve - The Promise `resolve` callback.
 * @param {Function} reject  - The Promise `reject` callback.
 * @see {@link TYPE_YAML}
 * @see {@link TYPE_JSON}
 * @see {@link TYPE_JS}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @throws {Error} If serialized JS object could not be written due to any reason.
 * @private
 */
function writeToStream(object, dest, target, resolve, reject) {
  dest
    .on('error', reject)
    .on('finish', () => resolve('Writing ' + target + ' to stream successful.'));

  // write stringified data
  dest.write(object);
  dest.end();
}

/**
 * Writes a JS object to a YAML destination.
 *
 * @param {Object} object   - The JS object to write into YAML destination.
 * @param {Options} options - The write destination and indention.
 * @see {@link MIN_INDENT}
 * @see {@link DEFAULT_INDENT}
 * @see {@link MAX_INDENT}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @throws {Error} If YAML destination could not be written due to any reason.
 * @private
 * @example
 * var Writer = require('jy-transform').Writer;
 * var logger = ...;
 * var writer = new Writer(logger);
 *
 * // ---- write obj to file
 *
 * var obj = {...},
 * var options = {
 *   dest: 'result.yml',
 *   indent: 2
 * }
 *
 * writer.writeYaml(obj, options)
 *     .then(function (msg){
 *         logger.info(msg);
 *     })
 *     .catch(function (err) {
 *         logger.error(err.stack);
 *     });
 *
 *
 * // ---- write obj to Writable
 *
 * options = {
 *   dest: fs.createWriteStream('result.yml'),
 *   indent: 4
 * }
 *
 * writer.writeYaml(obj, options)
 *   .then(function (msg){
 *     logger.info(msg);
 *   })
 *   .catch(function (err) {
 *     logger.error(err.stack);
 *   });
 */
async function writeYaml(object, options) {
  return new Promise((resolve, reject) => {
    let yaml;
    try {
      yaml = jsYaml.safeDump(object, { indent: options.indent, noRefs: true });
    } catch (err) {
      err.message = 'Could not write YAML to \'' + options.dest + '\', cause: ' + err.message;
      reject(err);
      return;
    }

    if (typeof options.dest === 'string') { // file
      writeToFile(yaml, options.dest, TYPE_YAML, resolve, reject, options.force);
    } else if (isStream.writable(options.dest)) { // stream
      writeToStream(yaml, options.dest, TYPE_YAML, resolve, reject);
    } else { // object
      console.log('YAAAMLLLLLL: ' + yaml)
      console.log('options.dest1: ' + JSON.stringify(options.dest))
      options.dest = yaml;
      //options.dest.text = yaml;
      resolve('Writing YAML to options.dest successful.');
    }
  });
}

/**
 * Writes a JS object to a JSON destination.
 *
 * @param {Object} object   - The JS object to write into JSON destination.
 * @param {Options} options - The write destination and indention.
 * @see {@link MIN_INDENT}
 * @see {@link DEFAULT_INDENT}
 * @see {@link MAX_INDENT}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @private
 * @example
 * var Writer = require('jy-transform').Writer;
 * var logger = ...;
 * var writer = new Writer(logger);
 *
 * // ---- write obj to file
 *
 * var obj = {...};
 * var options = {
   *     dest: 'result.json',
   *     indent: 2
   * }
 *
 * writer.writeJson(obj, options)
 *     .then(function (msg){
   *         logger.info(msg);
   *     })
 *     .catch(function (err) {
   *         logger.error(err.stack);
   *     });
 *
 *
 * // ---- write obj to Writable
 *
 * options = {
   *     dest: fs.createWriteStream('result.json'),
   *     indent: 4
   * }
 *
 * writer.writeJson(obj, options)
 *     .then(function (msg){
   *         logger.info(msg);
   *     })
 *     .catch(function (err) {
   *         logger.error(err.stack);
   *     });
 *
 * // ---- write obj to object
 *
 * options = {
   *     dest: {},
   *     indent: 4
   * }
 *
 * writer.writeJson(obj, options)
 *     .then(function (msg){
   *         logger.info(msg);
   *     })
 *     .catch(function (err) {
   *         logger.error(err.stack);
   *     });
 */
async function writeJson(object, options) {
  return new Promise((resolve, reject) => {
    if (typeof options.dest === 'string') { // file
      writeToFile(serializeJsToJsonString(object, options.indent), options.dest, TYPE_JSON,
        resolve, reject, options.force);
    } else if (isStream.writable(options.dest)) { // stream
      writeToStream(serializeJsToJsonString(object, options.indent), options.dest,
        TYPE_JSON, resolve, reject);
    } else { // object
      options.dest = serializeJsToJsonString(object, options.indent);
      resolve('Writing JSON to options.dest successful.');
    }
  });
}

/**
 * Writes a JS object to a JS destination. The object is prefixed by `module.exports[.${options.exports}] = `.
 *
 * @param {Object} object - The JSON to write into JS destination.
 * @param {Options} options - The write destination and indention.
 * @see {@link MIN_INDENT}
 * @see {@link DEFAULT_INDENT}
 * @see {@link MAX_INDENT}
 * @returns {Promise.<string>} - Containing the write success message to handle by caller (e.g. for logging).
 * @private
 * @example
 * var Writer = require('jy-transform').Writer;
 * var logger = ...;
 * var writer = new Writer(logger);
 *
 * // ---- write obj to file
 *
 * var obj = {...};
 * var options = {
   *     dest: 'result.js',
   *     indent: 2
   * }
 *
 * writer.writeJs(obj, options)
 *     .then(function (msg){
   *         logger.info(msg);
   *     })
 *     .catch(function (err) {
   *         logger.error(err.stack);
   *     });
 *
 *
 * // ---- write obj to Writable
 *
 * options = {
   *     dest: fs.createWriteStream('result.json'),
   *     indent: 4
   * }
 *
 * writer.writeJs(obj, options)
 *     .then(function (msg){
   *         logger.info(msg);
   *     })
 *     .catch(function (err) {
   *         logger.error(err.stack);
   *     });
 *
 *
 * // ---- write obj to object
 *
 * options = {
   *     dest: {},
   *     indent: 2
   * }
 *
 * writer.writeJs(obj, options)
 *     .then(function (msg){
   *         logger.info(msg);
   *     })
 *     .catch(function (err) {
   *         logger.error(err.stack);
   *     });
 */
async function writeJs(object, options) {
  //logger.debug('OPTIONS BEFORE ASSERTING IN writeJs:::' + JSON.stringify(options));
  return new Promise((resolve, reject) => {
    if (typeof options.dest === 'string') { // file
      serializeJsToString(object, options.indent, options.exports)
        .then((data) => {
          writeToFile(data, options.dest, TYPE_JS, resolve, reject, options.force);
        })
        .catch(reject);
    } else if (isStream.writable(options.dest)) { // stream
      serializeJsToString(object, options.indent, options.exports)
        .then((data) => {
          writeToStream(data, options.dest, TYPE_JS, resolve, reject);
        })
        .catch(reject);
    } else { // object
      let msg;
      if (options.exports) {
        options.dest[options.exports] = object;
        msg = 'Writing JS to options.dest.' + options.exports + ' successful.';
      } else {
        Object.assign(options.dest, object);
        msg = 'Writing JS to options.dest successful.';
      }
      resolve(msg);
    }
  });
}

/**
 * TODO: doc me.
 *
 * @param {Object} options  - The source object to write.
 * @param {Options} options - The write options.
 * @returns {Promise.<string>} Resolves with write success message.
 * @public
 */
export async function write(object, options) {
  const assertedOptions = await Joi.validate(options, writerOptionsSchema);
  console.log('options after validation 1: ' + JSON.stringify(options))
  // HINT: we have to use the original options object because the caller must not loose the reference to options.dest,
  // so we copy everything here except the assertedOptions.dest (joi does not return the original reference)!
  Object.assign(options, { target: assertedOptions.target }, { exports: assertedOptions.exports },
    { indent: assertedOptions.indent }, { force: assertedOptions.force });
  console.log('options after validation 2: ' + JSON.stringify(options))
  assertedOptions.dest = options.dest;
  switch (assertedOptions.target) {
    case TYPE_JS:
      return await writeJs(object, options);
    case TYPE_JSON:
      return await writeJson(object, options);
    case TYPE_YAML:
      return await writeYaml(object, options);
    default: // TODO better handling
      throw new Error('should not happen!');
  }
}

export default {
  write,
};
