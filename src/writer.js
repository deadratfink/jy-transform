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
import { TYPE_JS, TYPE_JSON, TYPE_YAML, UTF8 } from './constants';
import Joi from './validation/joi-extensions';
import { transformerOptionsSchema } from './validation/options-schema';

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
 * @see {@link Constants#TYPE_YAML}
 * @see {@link Constants#TYPE_JSON}
 * @see {@link Constants#TYPE_JS}
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
 * @see {@link Constants#TYPE_YAML}
 * @see {@link Constants#TYPE_JSON}
 * @see {@link Constants#TYPE_JS}
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
 * @class This class provides utility methods usable to write JS objects
 *        from memory to a JSON/JS/YAML destination
 *        (file, object or {@link stream.Readable}).
 * @example
 * const { Writer } from 'jy-transform');
 * const logger = ...;
 * const writer = new Writer(logger);
 */
// export class Writer {
//   /**
//    * Constructs the `Writer` with an (optional) logger.
//    *
//    * @param {(logger|cli|console)} [logger=console] - Logger instance.
//    * @public
//    */
//   constructor(logger) {
//     this.logger = new LogWrapper(logger);
//   }

/**
 * Writes a JS object to a YAML destination.
 *
 * @param {Object} object   - The JS object to write into YAML destination.
 * @param {Options} options - The write destination and indention.
 * @see {@link Constants#MIN_INDENT}
 * @see {@link Constants#DEFAULT_INDENT}
 * @see {@link Constants#MAX_INDENT}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @throws {Error} If YAML destination could not be written due to any reason.
 * @public
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
export async function writeYaml(object, options) {
  const assertedOptions = await Joi.validate(options, transformerOptionsSchema);
  return new Promise((resolve, reject) => {
    let yaml;
    try {
      yaml = jsYaml.safeDump(object, { indent: assertedOptions.indent, noRefs: true });
    } catch (err) {
      err.message = 'Could not write YAML file \'' + assertedOptions.dest + '\', cause: ' + err.message;
      reject(err);
      return;
    }

    if (typeof assertedOptions.dest === 'string') { // file
      writeToFile(yaml, assertedOptions.dest, TYPE_YAML, resolve, reject, assertedOptions.force);
    } else if (isStream.writable(assertedOptions.dest)) { // stream
      writeToStream(yaml, assertedOptions.dest, TYPE_YAML, resolve, reject);
    } else { // object
      options.dest = yaml;
      resolve('Writing YAML to options.dest successful.');
    }
  });
}

/**
 * Writes a JS object to a JSON destination.
 *
 * @param {Object} object   - The JS object to write into JSON destination.
 * @param {Options} options - The write destination and indention.
 * @see {@link Constants#MIN_INDENT}
 * @see {@link Constants#DEFAULT_INDENT}
 * @see {@link Constants#MAX_INDENT}
 * @returns {Promise.<string>} Containing the write success message to handle by caller (e.g. for logging).
 * @public
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
export async function writeJson(object, options) {
  const assertedOptions = await Joi.validate(options, transformerOptionsSchema);
  return new Promise((resolve, reject) => {
    if (typeof assertedOptions.dest === 'string') { // file
      writeToFile(serializeJsToJsonString(object, assertedOptions.indent), assertedOptions.dest, TYPE_JSON,
        resolve, reject, assertedOptions.force);
    } else if (isStream.writable(assertedOptions.dest)) { // stream
      writeToStream(serializeJsToJsonString(object, assertedOptions.indent), assertedOptions.dest,
        TYPE_JSON, resolve, reject);
    } else { // object
      options.dest = serializeJsToJsonString(object, assertedOptions.indent);
      resolve('Writing JSON to options.dest successful.');
    }
  });
}

/**
 * Writes a JS object to a JS destination. The object is prefixed by `module.exports[.${options.exports}] = `.
 *
 * @param {Object} object - The JSON to write into JS destination.
 * @param {Options} options - The write destination and indention.
 * @see {@link Constants#MIN_INDENT}
 * @see {@link Constants#DEFAULT_INDENT}
 * @see {@link Constants#MAX_INDENT}
 * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
 * @public
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
export async function writeJs(object, options) {
  //logger.debug('OPTIONS BEFORE ASSERTING IN writeJs:::' + JSON.stringify(options));
  const assertedOptions = await Joi.validate(options, transformerOptionsSchema);
  return new Promise((resolve, reject) => {
    if (typeof assertedOptions.dest === 'string') { // file
      serializeJsToString(object, assertedOptions.indent, assertedOptions.exports)
        .then((data) => {
          writeToFile(data, assertedOptions.dest, TYPE_JS, resolve, reject, assertedOptions.force);
        })
        .catch(reject);
    } else if (isStream.writable(assertedOptions.dest)) { // stream
      serializeJsToString(object, assertedOptions.indent, assertedOptions.exports)
        .then((data) => {
          writeToStream(data, assertedOptions.dest, TYPE_JS, resolve, reject);
        })
        .catch(reject);
    } else { // object
      let msg;
      if (assertedOptions.exports) {
        assertedOptions.dest[assertedOptions.exports] = object;
        msg = 'Writing JS to options.dest.' + assertedOptions.exports + ' successful.';
      } else {
        Object.assign(assertedOptions.dest, object);
        msg = 'Writing JS to options.dest successful.';
      }
      resolve(msg);
    }
  });
}

export default {
  writeJs,
  writeJson,
  writeYaml,
};
