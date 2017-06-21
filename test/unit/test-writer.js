import promisify from 'promisify-es6';
import fsExtra from 'fs-extra';
import YAMLException from 'js-yaml/lib/js-yaml/exception';
import fs from 'fs';
import os from 'os';
import stream from 'stream';
import { write } from '../../src/writer';
import { logger } from '../logger';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';
import {
  TYPE_YAML,
  TYPE_JS,
  TYPE_JSON,
} from '../../src/constants';

const fsPromised = promisify(fs);

/**
 * @module jy-transform:unit-test:test-writer
 * @description This unit test suite checks the validity and correctness of _./src/js_ module.
 * @private
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - writer - ', () => {
  /**
   * Sample JSON content used in tests.
   *
   * @type {{test: string}}
   * @constant
   * @private
   */
  const JSON_CONTENT = { test: 'value' };

  /**
   * Temporary base dir for writer test output.
   * @type {string}
   * @constant
   * @private
   */
  const WRITER_TEST_BASE_DIR = './test/tmp/writer';

  beforeAll(() => {
    fsExtra.ensureDirSync(WRITER_TEST_BASE_DIR);
    fsExtra.emptyDirSync(WRITER_TEST_BASE_DIR);
  });

  /**
   * Asserts that the given `dest` is an existing file.
   *
   * @param {string} dest - File destination to assert.
   * @returns {Error} If `dest` does not exist and `done` is not passed.
   * @private
   */
  const expectDestFileExists = async (dest) => {
    try {
      const stats = await fsPromised.stat(dest);
      expect(stats.isFile()).toBeTruthy();
    } catch (err) {
      if (err.code === 'ENOENT') {
        err.message = 'The input file \'' + dest + '\' does not exists or is not accessible, cause: ' + err.message;
      } else {
        err.message = 'Some error occurred while accessing input file \'' + dest + '\': '
          + err.code + ', ' + err.message;
      }
      throw err;
    }
  };

  /**
   * Asserts that the given file `dest` does not exist.
   *
   * @param {string} dest     - File destination to assert.
   * @returns {Error} If `dest` does not exist and `done` is not passed.
   * @private
   */
  const expectDestFileDoesNotExist = async (dest) => {
    // check for existing source file
    let statErr;
    try {
      await fsPromised.stat(dest);
      statErr = new Error('Error expected when checking file = ' + dest);
    } catch (err) {
      logger.info('Error is EXPECTED: ' + err.stack);
      expect(err).toBeDefined();
      expect(err.code).toBe('ENOENT');
    }
    if (statErr) {
      throw statErr;
    }
  };

  /**
   * Assert an `Error` for a given writer function.
   *
   * @param {Object} options                - The options which potentially produce the error.
   * @param {Object} [match={name:'Error'}] - The propertie(s) error should contain.
   * @private
   */
  const expectWriteError = (options, match = { name: 'Error' }) => {
    expect.assertions(1);
    return expect(write(options)).rejects.toMatchObject(match);
  };

  /**
   * Assert an `Error` for a given writer function.
   *
   * @param {Object} options       - The options which potentially produce the error.
   * @param {Error} [match=Error'] - The error type to match.
   * @private
   */
  const expectWriteErrorByType = (options, match = Error) => {
    expect.assertions(1);
    return expect(write(options)).rejects.toBeInstanceOf(match);
  };

  describe('Testing writeJs(...)', () => {
    it('should write JS to file', async () => {
      expect.assertions(2);
      const file = WRITER_TEST_BASE_DIR + '/test-data-by-js-to-file.js';
      const msg = await write({ src: JSON_CONTENT, dest: file });
      expect(msg).toBeDefined();
      await expectDestFileExists(file);
    });

    it('should write JS to stream', async () => {
      expect.assertions(2);
      const file = WRITER_TEST_BASE_DIR + '/test-data-by-js-stream.js';
      const msg = write({ src: JSON_CONTENT, dest: fs.createWriteStream(file) });
      expect(msg).toBeDefined();
      await expectDestFileExists(file);
    });

    it('should write JS to stream with exports identifier', async () => {
      expect.assertions(4);
      const file = WRITER_TEST_BASE_DIR + '/test-data-by-js-stream-with-exports-identifier.js';
      const options = {
        src: JSON_CONTENT,
        target: TYPE_JS,
        dest: fs.createWriteStream(file),
        exports: 'test',
      };
      const msg = write(options);
      expect(msg).toBeDefined();
      await expectDestFileExists(file);
      // eslint-disable-next-line import/no-unresolved, global-require
      const json = require('../tmp/writer/test-data-by-js-stream-with-exports-identifier.js').test;
      expect(json.test).toBeDefined();
      expect(json.test).toBe('value');
    });

    it('should write JS to file and fail by invalid exports identifier (\'#3/-\')', () => {
      const options = {
        src: JSON_CONTENT,
        dest: WRITER_TEST_BASE_DIR + '/test-data-by-js-stream-with-invalid-exports-identifier.js',
        exports: '#3/-',
      };
      return expectWriteError(options, { name: 'ValidationError', isJoi: true });
    });

    it('should write JS to stream and fail by invalid exports identifier (\'#3/-\')', () => {
      const file = WRITER_TEST_BASE_DIR + '/test-data-by-js-stream-with-invalid-exports-identifier.js';
      const options = {
        src: JSON_CONTENT,
        dest: fs.createWriteStream(file),
        exports: '#3/-',
      };
      return expectWriteError(options, { name: 'ValidationError', isJoi: true });
    });

    it('should write JS to stream and fail by invalid exports identifier (\'if\')', () => {
      const file = WRITER_TEST_BASE_DIR + '/test-data-by-js-stream-with-invalid-exports-identifier.js';
      const options = {
        src: JSON_CONTENT,
        dest: fs.createWriteStream(file),
        exports: 'if',
      };
      return expectWriteError(options, { name: 'ValidationError', isJoi: true });
    });

    it('should write JS to stream and fail by provoked error', () => {
      const errorThrowingStream = new stream.Writable();
      // eslint-disable-next-line no-underscore-dangle, func-names
      errorThrowingStream._write = function (chunk, encoding, done) {
        logger.info('stream emitting Error now');
        this.emit('error', new Error('Dummy Error'));
        done();
      };
      return expectWriteErrorByType(JSON_CONTENT, {
        src: JSON_CONTENT,
        target: TYPE_JS,
        dest: errorThrowingStream,
      }, Error);
    });

    it('should write JS to JS object', async () => {
      expect.assertions(4);
      const options = { src: JSON_CONTENT, dest: {} };
      const msg = await write(options);
      expect(msg).toBeDefined();
      expect(options.dest).toBeDefined();
      expect(Object.prototype.hasOwnProperty.call(options.dest, 'test')).toBeTruthy();
      expect(options.dest.test).toBe('value');
    });

    it('should reject to write JS to JS object with options.exports == \'\'', async () => {
      const options = {
        src: JSON_CONTENT,
        dest: {},
        exports: '',
      };
      return expectWriteError(options, { name: 'ValidationError', isJoi: true });
    });

    const exports = 'foo';
    it('should write JS to JS object with options.exports == \'' + exports + '\'', async () => {
      expect.assertions(5);
      const options = {
        src: JSON_CONTENT,
        dest: {},
        exports,
      };
      const msg = await write(options);
      expect(msg).toBeDefined();
      expect(options.dest).toBeDefined();
      expect(Object.prototype.hasOwnProperty.call(options.dest, exports)).toBeTruthy();
      expect(Object.prototype.hasOwnProperty.call(options.dest[exports], 'test')).toBeTruthy();
      expect(options.dest[exports].test).toBe('value');
    });

    const invalidIdentifier = '#3/-';
    it('should reject write JS with Error on invalid identifier for options.exports: ' + invalidIdentifier, () => {
      const options = {
        src: JSON_CONTENT,
        dest: {},
        exports: invalidIdentifier,
      };
      return expectWriteError(options, { name: 'ValidationError', isJoi: true });
    });

    it('should reject write JS with Error on missing destination', () => {
      return expectWriteError({ src: JSON_CONTENT }, { name: 'ValidationError', isJoi: true });
    });

    it('should reject write JS to file by invalid file path', (done) => {
      const options = {
        src: JSON_CONTENT,
        dest: WRITER_TEST_BASE_DIR +
        '/<>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_' +
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_' +
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_' +
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/test-data-by-js-to-file.js'
      };
      write(JSON_CONTENT, options)
        .then((msg) => {
          done(new Error('Error expected, but got success message: ' + msg));
        })
        .catch((err) => {
          logger.info('EXPECTED ERROR: ' + (err.stack ? err.stack : err));
          expect(err).toBeDefined();
          // NOTE: here wo do not get an Error type but simply an Object:
          // {
          //   "errno": -63,
          //   "code": "ENAMETOOLONG",
          //   "syscall": "mkdir",
          //   "path": "..."
          // }
          expect(err).not.toBeInstanceOf(Error);
          expect(typeof err === 'object').toBeTruthy();
          expect(err.code).toBe('ENAMETOOLONG');
          done();
        });
    }, 10000); // TODO timeout needed?
  });

  describe('Testing writeJson(...)', () => {
    it('should write JSON to file', async () => {
      expect.assertions(2);
      const options = {
        src: JSON_CONTENT,
        dest: WRITER_TEST_BASE_DIR + '/test-data-by-json-to-file.json'
      };
      const msg = await write(options);
      expect(msg).toBeDefined();
      await expectDestFileExists(options.dest);
    });

    it('should write JSON to stream', async () => {
      expect.assertions(2);
      const file = WRITER_TEST_BASE_DIR + '/test-data-by-json-stream.json';
      const msg = await write({
        src: JSON_CONTENT,
        target: TYPE_JSON,
        dest: fs.createWriteStream(file),
      });
      expect(msg).toBeDefined();
      await expectDestFileExists(file);
    });

    it('should write JS to JS object', async () => {
      expect.assertions(4);
      const options = {
        src: JSON_CONTENT,
        dest: {},
      };
      const msg = await write(options);
      expect(msg).toBeDefined();
      expect(options.dest).toBeDefined();
      const result = JSON.parse(options.dest);
      expect(Object.prototype.hasOwnProperty.call(result, 'test')).toBeDefined();
      expect(result.test).toBe('value');
    });

    it('should reject with Error on missing destination', () => {
      return expectWriteError({ src: JSON_CONTENT }, { name: 'ValidationError', isJoi: true });
    });
  });

  describe('Testing writeYaml(...)', () => {
    it('should write YAML to file', async () => {
      expect.assertions(2);
      const file = WRITER_TEST_BASE_DIR + '/test-data-by-js-to-file.yaml';
      const msg = await write({
        src: JSON_CONTENT,
        dest: file
      });
      expect(msg).toBeDefined();
      await expectDestFileExists(file);
    });

    it('should write YAML to stream', async () => {
      expect.assertions(2);
      const file = WRITER_TEST_BASE_DIR + '/test-data-by-js-stream.yaml';
      const msg = await write({
        src: JSON_CONTENT,
        target: TYPE_YAML,
        dest: fs.createWriteStream(file),
      });
      expect(msg).toBeDefined();
      await expectDestFileExists(file);
    });

    it('should write stringified YAML to JS object', async () => {
      expect.assertions(3);
      const options = {
        src: JSON_CONTENT,
        target: TYPE_YAML,
        dest: {}
      };
      const msg = await write(options);
      expect(msg).toBeDefined();
      expect(options.dest).toBeDefined();
      const key = Object.keys(JSON_CONTENT)[0];
      expect(options.dest).toBe(key + ': ' + JSON_CONTENT[key] + os.EOL);
    });

    it('should reject with Error by invalid src object', () => {
      const invalidYamlJson = () => {
      };
      return expectWriteError(invalidYamlJson, {
        src: invalidYamlJson,
        dest: WRITER_TEST_BASE_DIR + '/test-data-by-js-to-file-invalid.yaml'
      }, { name: 'YAMLException' });
    });

    it('should reject with Error on missing destination', () => {
      return expectWriteError({ src: JSON_CONTENT }, { name: 'ValidationError', isJoi: true });
    });
  });

  describe('Testing force overwrite file', () => {
    it('should reject when options.dest is a directory', () => {
      return expectWriteErrorByType({
        src: JSON_CONTENT,
        dest: './test/data',
        target: TYPE_YAML
      }, Error);
    });

    it('should write YAML to stream, overwrite on 2nd write, ' +
      'don\'t overwrite on 3rd write and overwrite on 4th write', async () => {
      expect.assertions(13);
      const dest = WRITER_TEST_BASE_DIR + '/test-data-file-overwriting.yaml';
      let options = {
        src: JSON_CONTENT,
        indent: 4,
        dest,
      };

      const asyncFunctions = [
        async () => {
          const msg = await write(options);
          expect(msg).toBeDefined();
          await expectDestFileExists(dest);
          return 'overwrite test #1 should initially write YAML to file \'' + dest + '\'';
        },
        async () => {
          options = {
            src: JSON_CONTENT,
            indent: 4,
            dest,
            force: true
          };
          const msg = await write(options);
          expect(msg).toBeDefined();
          await expectDestFileExists(dest);
          await expectDestFileDoesNotExist(WRITER_TEST_BASE_DIR + '/test-data-file-overwriting(1).yaml');
          return 'overwrite test #2 should overwrite existing YAML file \'' + dest + '\'';
        },
        async () => {
          options = {
            src: JSON_CONTENT,
            indent: 4,
            dest,
            force: false,
          };
          const msg = await write(options);
          expect(msg).toBeDefined();
          await expectDestFileExists(WRITER_TEST_BASE_DIR + '/test-data-file-overwriting(1).yaml');
          return 'overwrite test #3 shouldn\'t overwrite existing YAML file \'' + dest +
            '\', but write new file \'' + WRITER_TEST_BASE_DIR + '/test-data-file-overwriting(1).yaml\'';
        },
        async () => {
          options = {
            src: JSON_CONTENT,
            indent: 4,
            dest,
            force: true
          };
          const msg = await write(options);
          expect(msg).toBeDefined();
          await expectDestFileDoesNotExist(WRITER_TEST_BASE_DIR + '/test-data-file-overwriting(2).yaml');
          //logger.info('testing overwrite #' + (index++) + '/' + asyncFunctions.length + ': ' + msg);
          return 'overwrite test #4 should overwrite existing YAML file \'' + dest + '\'';
        },
        async () => {
          options = {
            src: JSON_CONTENT,
            indent: 4,
            dest,
          };
          const msg = await write(options);
          expect(msg).toBeDefined();
          await expectDestFileExists(WRITER_TEST_BASE_DIR + '/test-data-file-overwriting(2).yaml');
          //logger.info('testing overwrite #' + (index++) + '/' + asyncFunctions.length + ': ' + msg);
          return 'overwrite test #5 shouldn\'t overwrite existing YAML file \'' + dest +
            '\' and \'' + WRITER_TEST_BASE_DIR + '/test-data-file-overwriting(1).yaml\', but write ' +
            'new file \'' + WRITER_TEST_BASE_DIR + '/test-data-file-overwriting(2).yaml\'';
        }
      ];

      await asyncFunctions.reduce((p, fn, idx) => {
        return p.then((msg) => {
          if (msg) {
            logger.info('testing overwrite #' + (idx + 1) + '/' + asyncFunctions.length + ': ' + msg);
          } else {
            logger.info('testing overwrite #' + (idx) + '/' + asyncFunctions.length + ': started!');
          }
          return fn().then(result => result).catch(err => err.message);
        });
      }, Promise.resolve());

      //   .reduce((p, fn) => {
      //   return p.then(async (msg) => {
      //     if (msg) {
      //       logger.info('testing overwrite #' + (index + 1) + '/' + asyncFunctions.length + ': ' + msg);
      //     }
      //     return await fn();
      //   });
      // }, Promise.resolve());

      // await Promise.all(, (value, index, length) => {
      //   return value().then(msg => logger.info('testing overwrite #' + (index + 1) + '/' + asyncFunctions.length +
      // ': ' + msg)); }).then();
    }, 5000); // we have to set higher timeout here because some travis jobs failed due to 2 sec timeout!
  });
});
