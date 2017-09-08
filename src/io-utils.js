import mkdirp from 'mkdirp-then';
import path from 'path';
import fs from 'fs';
import { Buffer } from 'buffer';
import jsYaml from 'js-yaml';
import promisify from 'promisify-es6';
import {
  UTF8,
  TYPE_JS,
  TYPE_JSON,
} from './constants';

/**
 * Promisified `fs` module.
 * @private
 */
const fsPromisified = promisify(fs);

/**
 * @module jy-transform:io-utils
 * @description This module provides an I/O interface for files, streams or `Object`.
 * @private
 */

/**
 * Reads JS or JSON from file.
 *
 * @param {string} file      - The file path.
 * @param {string} [imports] - An object which is exported in the file.
 * @returns {Object} The read object.
 * @throws {Error} When an `imports` is given but the declared object key is not exported by the file.
 * @private
 */
export function readJsOrJsonFromFile(file, imports) {
  const resolvedPath = path.resolve('', file);
  if (imports) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const object = require(resolvedPath)[imports];
    if (!object) {
      throw new Error('an identifier string \'' + imports + '\' was specified for JS object ' +
        'but could not find this object, pls ensure that file ' + file + ' exports it.');
    }
    return object;
  }
  // eslint-disable-next-line import/no-dynamic-require, global-require
  return require(resolvedPath); // reads both: JS and JSON!
}

/**
 * Reads JS from JS object.
 *
 * @param {string} object    - The JS object source.
 * @param {string} [imports] - An object which is is a sub-object in `object`.
 * @returns {Object} The given `object` object or any sub-object specified by `imports`.
 * @throws {Error} When an `imports` is given but the declared object key is not contained in the source object.
 * @private
 */
export function readJsFromObject(object, imports) {
  if (imports) {
    const subObject = object[imports];
    if (!subObject) {
      throw new Error('an identifier string \'' + imports + '\' was specified for JS sub-object ' +
        'but could not find this sub-object, pls ensure that object source contains it.');
    }
    return Object.assign({}, subObject); // clone, do not alter original object!
  }
  return Object.assign({}, object); // clone, do not alter original object!
}

/**
 * Reads YAML from file.
 *
 * @param {string} file    - The YAML file source.
 * @returns {Object} The read JS object from YAML file.
 * @throws {Error} When any I/O error occurs while the source file.
 * @private
 */
export async function readYamlFromfile(file) {
  // load source from YAML file
  const yaml = await fsPromisified.readFile(file, UTF8);
  try {
    return jsYaml.safeLoad(yaml);
  } catch (err) { // probably a YAMLException
    throw err;
  }
}

/**
 * Reads from a passed stream and resolves by callback.
 *
 * @param {Stream.Readable} readable - The source to read from.
 * @param {string} origin            - Origin type, must be 'yaml' or 'json'/'js'.
 * @returns {Promise.<Object>} The read content as JS object representation.
 * @see {@link TYPE_YAML}
 * @see {@link TYPE_JSON}
 * @see {@link TYPE_JS}
 * @private
 */
export function readFromStream(readable, origin) {
  return new Promise((resolve, reject) => {
    const buffers = [];
    readable
      .on('data', data => buffers.push(data))
      .on('error', reject)
      .on('end', () => {
        const buffer = Buffer.concat(buffers);
        try {
          if (origin === TYPE_JS || origin === TYPE_JSON) {
            resolve(JSON.parse(buffer.toString(UTF8)));
          } else { // Validation allows only YAML here!
            resolve(jsYaml.safeLoad(buffer.toString(UTF8)));
          }
        } catch (err) { // probably a SyntaxError for JSON or a YAMLException
          readable.emit('error', err); // send to .on('error',...
        }
      });
  });
}

/**
 * Turns the destination file name into a name containing a consecutive
 * number if it exists. It iterates over the files until it finds a file
 * name which does not exist.
 *
 * @param {string} dest - The destination file.
 * @returns {string} A consecutive file name or the original one if `dest` file does not exist.
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
 * @param {string} object                  - The object to write into file.
 * @param {string} dest                    - The file destination path.
 * @param {string} target                  - The target type, one of [ 'yaml' | 'json' | 'js' ].
 * @param {boolean} [forceOverwrite=false] - Forces overwriting the destination file if `true`.
 * @see {@link TYPE_YAML}
 * @see {@link TYPE_JSON}
 * @see {@link TYPE_JS}
 * @private
 */
async function mkdirAndWrite(object, dest, target, forceOverwrite = false) {
  const destDir = path.dirname(dest);
  await mkdirp(destDir);
  let finalDestination = dest;
  if (!forceOverwrite) {
    finalDestination = getConsecutiveDestName(dest);
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
export function writeToFile(object, dest, target, forceOverwrite) {
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
export function writeToStream(object, dest, target) {
  return new Promise((resolve, reject) => {
    dest
      .on('error', reject)
      .on('finish', () => resolve('Writing ' + target + ' to stream successful.'));

    // write stringified data
    dest.write(object);
    dest.end();
  });
}
