import jsYaml from 'js-yaml';
import promisify from 'promisify-es6';
import fsExtra from 'fs-extra';
import fs from 'fs';
import path from 'path';
import { logger } from '../logger';
import { transform } from '../../src/transformer';
import {
  UTF8,
  TYPE_JS,
} from '../../src/constants';
import {
  TEST_SUITE_DESCRIPTION_UNIT,
  TEST_DATA_DIR,
  EXPECTED_VALUE,
} from '../helper-constants';

/**
 * Promisified `fs` module.
 * @private
 */
const fsPromisified = promisify(fs);

/**
 * @module jy-transform:unit-test:test-transformer
 * @description This unit test suite checks the correct transformation behaviour of the Transformer module.
 * @private
 */

/**
 * A YAML source file path.
 * @type {string}
 * @constant
 * @private
 */
const SRC_YAML = TEST_DATA_DIR + '/test-file.yaml';

/**
 * A JSON source file path.
 * @type {string}
 * @constant
 * @private
 */
const SRC_JSON = TEST_DATA_DIR + '/test-file.json';

/**
 * A JS source file path.
 * @type {string}
 * @constant
 * @private
 */
const SRC_JS = TEST_DATA_DIR + '/test-file.js';

/**
 * Temporary base dir for writer test output.
 * @type {string}
 * @constant
 * @private
 */
const TRANSFORMER_TEST_BASE_DIR = './test/functional/tmp/transformer';

/**
 * Transformation middleware changing value for `foo` property.
 *
 * @param {Object} object - To transform.
 */
async function transformFunc(object) {
  object.foo = EXPECTED_VALUE;
  return object;
}

/**
 * Helper method which asserts the successful transformation.
 *
 * @param {Object} options - The transformation options.
 */
async function assertTransformSuccess(options, es6 = true) {
  expect.assertions(2);
  const msg = await transform(options);
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
  const msg = await transform(options);
  logger.debug(msg);
  expect(msg).toEqual(expect.any(String));
  const stats = fsExtra.statSync(options.dest);
  expect(stats.isFile()).toBeTruthy();
  const yaml = await fsPromisified.readFile(options.dest, UTF8);
  const object = jsYaml.safeLoad(yaml);
  expect(object.foo).toBe(EXPECTED_VALUE);
}

/**
 * Creates the options from the given transform function, source and destination path parameters.
 *
 * @param {string} src             - The source path.
 * @param {string} dest            - The destination path.
 * @param {*} [func=transformFunc] - The transform function.
 * @returns {{src: string, transform: *, dest: string}} The options object.
 * @private
 */
function createOptions(src, dest, func = transformFunc) {
  return {
    src,
    transform: func,
    dest,
  };
}

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - transformer - ', () => {
  beforeAll(() => {
    fsExtra.ensureDirSync(TRANSFORMER_TEST_BASE_DIR);
    fsExtra.emptyDirSync(TRANSFORMER_TEST_BASE_DIR);
  });

  describe('Testing transform with middleware', () => {
    it('should throw ValidationError if middleware passed is not a function type', async () => {
      expect.assertions(1);
      await expect(transform(createOptions({}, {}, 'not a function')))
        .rejects.toMatchObject({ name: 'ValidationError', isJoi: true });
    });

    it('should throw ValidationError if options.dest is not set and cannot be resolved from options.src type',
      async () => {
        expect.assertions(1);
        await expect(transform(createOptions({} /* We cannot infer destination from this src type! */)))
          .rejects.toMatchObject({ name: 'ValidationError', isJoi: true });
      });

    it('should not fail if middleware passed is returning a Promise', () => {
      expect.assertions(1);
      const returningPromise = async object => object;
      return expect(transform(createOptions({}, {}, returningPromise)))
        .resolves.toBe('Writing JS to options.dest successful.');
    });

    it('should not fail if middleware passed is not returning a Promise', () => {
      expect.assertions(1);
      const notReturningPromise = object => object;
      return expect(transform(createOptions({}, {}, notReturningPromise)))
        .resolves.toBe('Writing JS to options.dest successful.');
    });
  });

  describe('Testing transform without middleware', () => {
    it('should not fail', () => {
      expect.assertions(1);
      return expect(transform({ src: {}, dest: {} })).resolves.toBe('Writing JS to options.dest successful.');
    });
  });

  describe('Testing Transformer transforming from YAML to JS to relative path', () => {
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data.js';
    const DEST_NO_ES6 = TRANSFORMER_TEST_BASE_DIR + '/test-data-no-es6.js';
    const DEST_DQ_AND_STRICT = TRANSFORMER_TEST_BASE_DIR + '/test-data-double-quotes-and-strict.js';

    beforeAll(async () => {
      // Prepare test data.
      try {
        fsExtra.copySync(SRC_YAML, TRANSFORMER_TEST_BASE_DIR + '/test-data.yaml');
        logger.debug('copied ' + SRC_YAML + ' to ' + TRANSFORMER_TEST_BASE_DIR + '/test-data.yaml');
      } catch (err) {
        logger.error('could not copy ' + SRC_YAML + ' to ' + TRANSFORMER_TEST_BASE_DIR + '/test-data.yaml: ' +
          err.stack);
        throw err;
      }
    });

    it('should store ' + DEST + ' file relative to ' + TRANSFORMER_TEST_BASE_DIR + '/test-data.yaml', async () => {
      expect.assertions(2);
      const msg = await transform({
        src: path.resolve(TRANSFORMER_TEST_BASE_DIR + '/test-data.yaml'),
        transform: transformFunc,
        target: TYPE_JS,
      });
      logger.debug(msg);
      const stats = fs.statSync(DEST);
      expect(stats.isFile()).toBe(true);
      // eslint-disable-next-line import/no-unresolved, global-require, import/no-dynamic-require
      const json = require('./tmp/transformer/test-data.js').default;
      expect(json.foo).toBe(EXPECTED_VALUE);
    });

    it('should store ' + DEST + ' file with double-quotes and strict', async () => {
      expect.assertions(2);
      const msg = await transform({
        src: path.resolve(TRANSFORMER_TEST_BASE_DIR + '/test-data.yaml'),
        dest: path.resolve(DEST_DQ_AND_STRICT),
        transform: transformFunc,
        target: TYPE_JS,
        strict: true,
        'no-single': true,
      });
      logger.debug(msg);
      const stats = fs.statSync(DEST_DQ_AND_STRICT);
      expect(stats.isFile()).toBe(true);
      // eslint-disable-next-line import/no-unresolved, global-require, import/no-dynamic-require
      const jsContentString = await fsPromisified.readFile(DEST_DQ_AND_STRICT, UTF8);
      expect(jsContentString.startsWith('"use strict;"')).toBe(true);
    });

    it('should store ' + TRANSFORMER_TEST_BASE_DIR + '/test-data-no-es6.js file relative to ' +
      TRANSFORMER_TEST_BASE_DIR + '/test-data.yaml (non-ES6 syntax)', async () => {
      expect.assertions(2);
      const msg = await transform({
        src: path.resolve(TRANSFORMER_TEST_BASE_DIR + '/test-data.yaml'),
        dest: path.resolve(DEST_NO_ES6),
        transform: transformFunc,
        target: TYPE_JS,
        'no-es6': true,
      });
      logger.debug(msg);
      const stats = fs.statSync(DEST_NO_ES6);
      expect(stats.isFile()).toBe(true);
      // eslint-disable-next-line import/no-unresolved, global-require, import/no-dynamic-require
      const json = require('./tmp/transformer/test-data-no-es6.js');
      expect(json.foo).toBe(EXPECTED_VALUE);
    });
  });

  describe('Testing Transformer transforming from YAML to JS', () => {
    const SRC = './test/data/test-file.yaml';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-yaml-js.js';

    it('should store ' + SRC + ' file to ' + DEST, async () => {
      expect.assertions(2);
      const options = {
        src: path.resolve(SRC),
        transform: transformFunc,
        dest: path.resolve(DEST),
      };
      await assertTransformSuccess(options);
    });
  });

  describe('Testing Transformer transforming from YAML to JSON', () => {
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-yaml-json.json';

    it('should store ' + SRC_YAML + ' file to ' + DEST, async () => {
      const options = {
        src: path.resolve(SRC_YAML),
        transform: transformFunc,
        dest: path.resolve(DEST),
      };
      await assertTransformSuccess(options, false);
    });
  });

  describe('Testing Transformer transforming from JSON to JS', () => {
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-json-js.js';

    it('should store ' + SRC_JSON + ' file to ' + DEST, async () => {
      const options = { // TODO function for options
        src: path.resolve(SRC_JSON),
        transform: transformFunc,
        dest: path.resolve(DEST),
      };
      await assertTransformSuccess(options);
    });
  });

  describe('Testing Transformer transforming from JS to JSON', () => {
    const SRC = './test/data/test-file.js';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-js-json.json';

    it('should store ' + SRC + ' file to ' + DEST, async () => {
      expect.assertions(2);
      const options = {
        src: path.resolve(SRC),
        transform: transformFunc,
        dest: path.resolve(DEST),
      };
      await assertTransformSuccess(options, false);
    });
  });

  describe('Testing Transformer transforming from JS to YAML', () => {
    expect.assertions(2);
    const SRC = './test/data/test-file.js';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-js-yaml.yaml';

    it('should store ' + SRC + ' file to ' + DEST, async () => {
      const options = {
        src: path.resolve(SRC),
        transform: transformFunc,
        dest: path.resolve(DEST),
      };
      await assertYamlTransformSuccess(options);
    });
  });

  describe('Testing Transformer transforming from YAML to YAML', () => {
    const SRC = './test/data/test-file.yaml';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-yaml-yaml.yaml';

    it('should store ' + SRC + ' file to ' + DEST, async () => {
      const options = {
        src: path.resolve(SRC),
        transform: transformFunc,
        dest: path.resolve(DEST),
      };
      await assertYamlTransformSuccess(options);
    });
  });

  describe('Testing Transformer transforming from JSON to JSON', () => {
    const SRC = './test/data/test-file.json';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-json-json.json';

    it('should store ' + SRC + ' file to ' + DEST, async () => {
      const options = {
        src: path.resolve(SRC),
        transform: transformFunc,
        dest: path.resolve(DEST),
      };
      await assertTransformSuccess(options, false);
    });
  });

  describe('Testing Transformer transforming from JSON to YAML', () => {
    const SRC = './test/data/test-file.json';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-json-yaml.yaml';

    it('should store ' + SRC + ' file to ' + DEST, async () => {
      const options = {
        src: path.resolve(SRC),
        transform: transformFunc,
        dest: path.resolve(DEST),
      };
      await assertYamlTransformSuccess(options);
    });
  });

  describe('Testing Transformer transforming from JS to JS', () => {
    const SRC = './test/data/test-file.js';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-js-js.js';

    it('should store ' + SRC + ' file to ' + DEST, async () => {
      expect.assertions(2);
      const options = {
        src: path.resolve(SRC),
        transform: transformFunc,
        dest: path.resolve(DEST),
      };
      await assertTransformSuccess(options);
    });
  });
});
