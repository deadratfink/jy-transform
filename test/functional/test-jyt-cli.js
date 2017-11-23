import jsYaml from 'js-yaml';
import promisify from 'promisify-es6';
import { exec } from 'child_process';
import fsExtra from 'fs-extra';
import fs from 'fs';
import cwd from 'cwd';
import path from 'path';
import { logger } from '../logger';
import {
  UTF8,
  TYPE_JS,
} from '../../src/constants';
import {
  TEST_SUITE_DESCRIPTION_FUNCTIONAL,
  TEST_DATA_DIR,
  EXPECTED_VALUE,
} from '../helper-constants';

const fsPromised = promisify(fs);

/**
 * @module jy-transform:unit-test:test-cli
 * @description This unit test suite checks the correct transformation behaviour of the CLI interface.
 * @private
 */

/**
 * Temporary base dir for transformer test output.
 * @type {string}
 * @constant
 * @private
 */
const CLI_TEST_BASE_DIR = './test/functional/tmp/cli';

/**
 * A YAML source file path.
 * @type {string}
 * @constant
 * @private
 */
const SRC_YAML = TEST_DATA_DIR + '/test-data-cli.yaml';

/**
 * A JSON source file path.
 * @type {string}
 * @constant
 * @private
 */
const SRC_JSON = TEST_DATA_DIR + '/test-data-cli.json';

/**
 * A JS source file path.
 * @type {string}
 * @constant
 * @private
 */
const SRC_JS = TEST_DATA_DIR + '/test-data-cli.js';

/**
 * Object mapping from JS option to to short CLI option.
 * @type {{src: string, dest: string, origin: string, target: string, indent: string, force: string, imports: string,
 * exports: string}}
 * @private
 */
const CLI_OPTIONS_LONG_TO_SHORT_MAP = {
  src: '',
  dest: '',
  origin: '-o',
  target: '-t',
  indent: '-i',
  force: '-f',
  imports: '-m',
  exports: '-x',
  strict: '-s',
  es5: '--es5', // no short available
  double: '--double', // no short available
};

/**
 * Creates the options from the given source and destination path parameters.
 *
 * @param {string} src  - The source path.
 * @param {string} dest - The destination path.
 * @returns {{src: string, dest: string}}  The options object.
 * @private
 */
function createOptions(src, dest) {
  return {
    src,
    dest,
  };
}

/**
 * Executes `./jyt` script with given args (which includes source, destination and all options).
 *
 * @param {string[]} args - The source, destination CLI arguments and all CLI options.
 * @returns {Promise} A result, see details.
 * @resolve {string} The transformation success message.
 * @reject {Error} Any error occurred.
 * @private
 */
function execJyt(args) {
  return new Promise((resolve, reject) => {
    const command = './jyt ' + args.join(' ');
    logger.info('executing command: ' + command);
    const childProcess = exec(command, { cwd: cwd() /* , encoding: 'utf8' */ }, (err, stdout, stderr) => {
      if (err) {
        logger.error(`err: ${err}`);
        reject(err);
        return;
      }
      logger.debug(`stdout: ${stdout}`);
      logger.debug(`stderr: ${stderr}`);
      resolve(stdout || stderr);
    });
    childProcess.on('error', logger.error);
    childProcess.on('exit', (code, signal) =>
      logger.debug(`child process exited with code ${code} and signal ${signal}`));
  });
}

/**
 * Creates the CLI args/options from given `options` object.
 *
 * @param {TransformOptions} options - The transformation options.
 * @returns {string[]} The CLI args and options.
 * @private
 */
function optionsToArgs(options) {
  const keys = Object.keys(options);
  return keys.map(key => `${CLI_OPTIONS_LONG_TO_SHORT_MAP[key]} ${options[key]}`);
}

/**
 * Helper method which asserts the successful transformation.
 *
 * @param {TransformOptions} options - The transformation options.
 * @param {boolean} [es6=true]       - Whether to use ES6 syntax.
 * @private
 */
async function assertTransformSuccess(options, es6 = true) {
  expect.assertions(2);
  const msg = await execJyt(optionsToArgs(options));
  logger.debug(msg);
  const stats = fsExtra.statSync(options.dest);
  expect(stats.isFile()).toBeTruthy();
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const json = es6 ? require(path.resolve(options.dest)).default : require(path.resolve(options.dest));
  expect(json.foo).toBe(EXPECTED_VALUE);
}

/**
 * Helper method which asserts the successful transformation.
 *
 * @param {Object} options - The transformation options.
 */
async function assertYamlTransformSuccess(options) {
  expect.assertions(3);
  const msg = await execJyt(optionsToArgs(options));
  logger.debug(msg);
  expect(msg).toEqual(expect.any(String));
  const stats = fsExtra.statSync(options.dest);
  expect(stats.isFile()).toBeTruthy();
  const yaml = await fsPromised.readFile(options.dest, UTF8);
  const object = jsYaml.safeLoad(yaml);
  expect(object.foo).toBe(EXPECTED_VALUE);
}

describe(TEST_SUITE_DESCRIPTION_FUNCTIONAL + ' - ./jyt -> ./src/cli.js - ', () => {
  beforeAll(() => {
    fsExtra.ensureDirSync(CLI_TEST_BASE_DIR);
    fsExtra.emptyDirSync(CLI_TEST_BASE_DIR);
  });

  describe('Testing CLI transforming from YAML to JS to relative path', () => {
    const DEST = CLI_TEST_BASE_DIR + '/test-data.js';
    const DEST_NO_ES6 = CLI_TEST_BASE_DIR + '/test-data-no-es6.js';

    beforeAll(async () => {
      // Prepare test data.
      try {
        fsExtra.copySync(SRC_YAML, CLI_TEST_BASE_DIR + '/test-data.yaml');
        logger.debug('copied ' + SRC_YAML + ' to ' + CLI_TEST_BASE_DIR + '/test-data.yaml');
      } catch (err) {
        logger.error('could not copy ' + SRC_YAML + ' to ' + CLI_TEST_BASE_DIR + '/test-data.yaml: ' +
          err.stack);
        throw err;
      }
    });

    it('should store ' + DEST + ' file relative to ' + CLI_TEST_BASE_DIR + '/test-data.yaml', async () => {
      expect.assertions(2);
      const msg = await execJyt(optionsToArgs({
        src: path.resolve(CLI_TEST_BASE_DIR + '/test-data.yaml'),
        target: TYPE_JS,
      }));
      logger.debug(msg);
      const stats = fs.statSync(DEST);
      logger.debug('STATS: ' + JSON.stringify(stats, null, 4));
      expect(stats.isFile()).toBe(true);
      // eslint-disable-next-line import/no-unresolved, global-require, import/no-dynamic-require
      const result = require('./tmp/cli/test-data.js').default;
      expect(result.foo).toBe(EXPECTED_VALUE);
    });

    it('should store ' + CLI_TEST_BASE_DIR + '/test-data-no-es6.js file relative to ' +
      CLI_TEST_BASE_DIR + '/test-data.yaml (non-ES6 syntax)', async () => {
      expect.assertions(2);
      const msg = await execJyt(optionsToArgs({
        src: path.resolve(CLI_TEST_BASE_DIR + '/test-data.yaml'),
        dest: path.resolve(DEST_NO_ES6),
        target: TYPE_JS,
        es5: true,
      }));
      logger.debug(msg);
      const stats = fs.statSync(DEST_NO_ES6);
      expect(stats.isFile()).toBe(true);
      // eslint-disable-next-line import/no-unresolved, global-require, import/no-dynamic-require
      const result = require('./tmp/cli/test-data-no-es6.js');
      expect(result.foo).toBe(EXPECTED_VALUE);
    });
  });

  describe('Testing CLI transforming from YAML to JS', () => {
    const DEST = CLI_TEST_BASE_DIR + '/test-data-transform-yaml-js.js';

    it('should store ' + SRC_YAML + ' file to ' + DEST, () =>
      assertTransformSuccess(createOptions(SRC_YAML, DEST))
    );
  });

  describe('Testing CLI transforming from YAML to JSON', () => {
    const DEST = CLI_TEST_BASE_DIR + '/test-data-transform-yaml-json.json';

    it('should store ' + SRC_YAML + ' file to ' + DEST, () =>
      assertTransformSuccess(createOptions(SRC_YAML, DEST), false)
    );
  });

  describe('Testing CLI transforming from JSON to JS', () => {
    const DEST = CLI_TEST_BASE_DIR + '/test-data-transform-json-js.js';

    it('should store ' + SRC_JSON + ' file to ' + DEST, () =>
      assertTransformSuccess(createOptions(SRC_JSON, DEST))
    );
  });

  describe('Testing CLI transforming from JS to JSON', () => {
    const DEST = CLI_TEST_BASE_DIR + '/test-data-transform-js-json.json';

    it('should store ' + SRC_JS + ' file to ' + DEST, () =>
      assertTransformSuccess(createOptions(SRC_JS, DEST), false)
    );
  });

  describe('Testing CLI transforming from JS to YAML', () => {
    const DEST = CLI_TEST_BASE_DIR + '/test-data-transform-js-yaml.yaml';

    it('should store ' + SRC_JS + ' file to ' + DEST, () =>
      assertYamlTransformSuccess(createOptions(SRC_JS, DEST))
    );
  });

  describe('Testing CLI transforming from YAML to YAML', () => {
    const DEST = CLI_TEST_BASE_DIR + '/test-data-transform-yaml-yaml.yaml';

    it('should store ' + SRC_YAML + ' file to ' + DEST, () =>
      assertYamlTransformSuccess(createOptions(SRC_YAML, DEST))
    );
  });

  describe('Testing CLI transforming from JSON to JSON', () => {
    const DEST = CLI_TEST_BASE_DIR + '/test-data-transform-json-json.json';

    it('should store ' + SRC_JS + ' file to ' + DEST, () =>
      assertTransformSuccess(createOptions(SRC_JS, DEST), false)
    );
  });

  describe('Testing CLI transforming from JSON to YAML', () => {
    const DEST = CLI_TEST_BASE_DIR + '/test-data-transform-json-yaml.yaml';

    it('should store ' + SRC_JSON + ' file to ' + DEST, () =>
      assertYamlTransformSuccess(createOptions(SRC_JSON, DEST))
    );
  });

  describe('Testing CLI transforming from JS to JS', () => {
    const DEST = CLI_TEST_BASE_DIR + '/test-data-transform-js-js.js';

    it('should store ' + SRC_JS + ' file to ' + DEST, () =>
      assertTransformSuccess(createOptions(SRC_JS, DEST))
    );
  });
});
