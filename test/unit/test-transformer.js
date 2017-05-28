import jsYaml from 'js-yaml';
import promisify from 'promisify-es6';
import fsExtra from 'fs-extra';
import fs from 'fs';
import path from 'path';
import { logger } from '../logger';
import { Transformer, Constants } from '../../index';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';

const fsPromised = promisify(fs);

/**
 * @classdesc This unit test suite checks the correct transformation behaviour of {@link Transformer} class.
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - transformer - ', () => {
  const TEST_DATA_DIR = './test/data';
  const SRC_YAML = TEST_DATA_DIR + '/test-file.yaml';
  const EXPECTED_VALUE = 'bar';

  /**
   * Temporary base dir for writer test output.
   * @type {string}
   * @constant
   * @private
   */
  const TRANSFORMER_TEST_BASE_DIR = './test/tmp/transformer';

  /**
   * The testee.
   * @type {Transformer}
   */
  let transformer;

  beforeAll(() => {
    fsExtra.ensureDirSync(TRANSFORMER_TEST_BASE_DIR);
    fsExtra.emptyDirSync(TRANSFORMER_TEST_BASE_DIR);
    transformer = new Transformer(logger);
  });

  /**
   * Prepare test data.
   */
  beforeEach(() => {
    try {
      fsExtra.copySync(SRC_YAML, TRANSFORMER_TEST_BASE_DIR + '/test-data.yaml');
      logger.info('copied ' + SRC_YAML + ' to ' + TRANSFORMER_TEST_BASE_DIR);
    } catch (err) {
      logger.error('could not copy ' + SRC_YAML + ' to ' + TRANSFORMER_TEST_BASE_DIR + err.stack);
      throw err;
    }
  });

  /**
   * Transformation middleware changing value for `foo` property.
   *
   * @param {Object} json - To transform.
   */
  const middlewareFunc = (json) => {
    json.foo = EXPECTED_VALUE;
    return Promise.resolve(json);
  };

  /**
   * Helper method which asserts the successful transformation.
   *
   * @param {Object} options      - The transformation options.
   * @param {Function} middleware - The transformation middleware.
   */
  function assertTransformSuccess(options, middleware) {
    return transformer.transform(options, middleware)
      .then((msg) => {
        logger.info(msg);
        const stats = fsExtra.statSync(options.dest);
        expect(stats.isFile()).toBeTruthy();
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const json = require(path.resolve(options.dest));
        expect(json.foo).toBe(EXPECTED_VALUE);
      });
  }

  /**
   * Helper method which asserts the successful transformation.
   *
   * @param {Object} options      - The transformation options.
   * @param {Function} middleware - The transformation middleware.
   * @param {Function} done       - Test finished callback.
   */
  function assertYamlTransformSuccess(options, middleware, done) {
    return transformer.transform(options, middleware)
      .then((msg) => {
        logger.info(msg);
        const stats = fsExtra.statSync(options.dest);
        expect(stats.isFile()).toBeTruthy();
        return fsExtra.readFileAsync(options.dest, Constants.UTF8)
          .then((yaml) => {
            try {
              const json = jsYaml.safeLoad(yaml);
              expect(json.foo).toBe(EXPECTED_VALUE);
              return done();
            } catch (err) { // probably a YAMLException
              logger.error(err.stack);
              return done(err);
            }
          });
      })
      .catch((err) => {
        logger.error(err.stack);
        done(err);
      });
  }

  describe('Testing Transformer transforming from YAML to JS to relative path', () => {
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data.js';

    it('should store ' + DEST + ' file relative to ' + TRANSFORMER_TEST_BASE_DIR + '/test-data.yaml', async () => {
      expect.assertions(2);
      const msg = await transformer.transform({ src: path.resolve(TRANSFORMER_TEST_BASE_DIR + '/test-data.yaml') },
        middlewareFunc);
      logger.info(msg);
      const stats = fsExtra.statSync(DEST);
      expect(stats.isFile()).toBeTruthy();
      // eslint-disable-next-line import/no-unresolved, global-require, import/no-dynamic-require
      const json = require('../tmp/transformer/test-data.js');
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
        dest: path.resolve(DEST),
      };
      await assertTransformSuccess(options, middlewareFunc);
    });
  });

  describe('Testing Transformer transforming from YAML to JSON', () => {
    const SRC = './test/data/test-file.yaml';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-yaml-json.json';

    it('should store ' + SRC + ' file to ' + DEST, async () => {
      expect.assertions(2);
      const options = {
        src: path.resolve(SRC),
        dest: path.resolve(DEST),
      };
      await assertTransformSuccess(options, middlewareFunc);
    });
  });

  describe('Testing Transformer transforming from JSON to JS', () => {
    const SRC = './test/data/test-file.json';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-json-js.js';

    it('should store ' + SRC + ' file to ' + DEST, async () => {
      expect.assertions(2);
      const options = {
        src: path.resolve(SRC),
        dest: path.resolve(DEST),
      };
      await assertTransformSuccess(options, middlewareFunc);
    });
  });

  describe('Testing Transformer transforming from JS to JSON', () => {
    const SRC = './test/data/test-file.js';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-js-json.json';

    it('should store ' + SRC + ' file to ' + DEST, async () => {
      expect.assertions(2);
      const options = {
        src: path.resolve(SRC),
        dest: path.resolve(DEST),
      };
      await assertTransformSuccess(options, middlewareFunc);
    });
  });

  describe('Testing Transformer transforming from JS to YAML', () => {
    expect.assertions(2);
    const SRC = './test/data/test-file.js';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-js-yaml.yaml';

    it('should store ' + SRC + ' file to ' + DEST, (done) => {
      expect.assertions(2);
      const options = {
        src: path.resolve(SRC),
        dest: path.resolve(DEST),
      };

      transformer.transform(options, middlewareFunc)
        .then((msg) => {
          logger.info(msg);
          const stats = fsExtra.statSync(options.dest);
          expect(stats.isFile()).toBeTruthy();

          fsPromised.readFile(options.dest, Constants.UTF8)
            .then((yaml) => {
              logger.debug('YAML loaded from file ' + options.dest);
              try {
                const resultJson = jsYaml.safeLoad(yaml);
                expect(resultJson.foo).toBe(EXPECTED_VALUE);
                done();
              } catch (err) { // probably a YAMLException
                logger.error('Unexpected error: ' + err.stack);
                done(err);
              }
            });
        })
        .catch((err) => {
          logger.error(err.stack);
          done(err);
        });
    });
  });

  describe('Testing Transformer transforming from YAML to YAML', () => {
    const SRC = './test/data/test-file.yaml';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-yaml-yaml.yaml';

    it('should store ' + SRC + ' file to ' + DEST, (done) => {
      expect.assertions(2);
      const options = {
        src: path.resolve(SRC),
        dest: path.resolve(DEST),
      };

      transformer.transform(options, middlewareFunc)
        .then((msg) => {
          logger.info(msg);
          const stats = fsExtra.statSync(options.dest);
          expect(stats.isFile()).toBeTruthy();

          fsPromised.readFile(options.dest, Constants.UTF8)
            .then((yaml) => {
              logger.debug('YAML loaded from file ' + options.dest);
              try {
                const resultJson = jsYaml.safeLoad(yaml);
                expect(resultJson.foo).toBe(EXPECTED_VALUE);
                done();
              } catch (err) { // probably a YAMLException
                logger.error('Unexpected error: ' + err.stack);
                done(err);
              }
            });
        })
        .catch((err) => {
          logger.error(err.stack);
          done(err);
        });
    });
  });

  describe('Testing Transformer transforming from JSON to JSON', () => {
    const SRC = './test/data/test-file.json';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-json-json.json';

    it('should store ' + SRC + ' file to ' + DEST, async () => {
      expect.assertions(2);
      const options = {
        src: path.resolve(SRC),
        dest: path.resolve(DEST),
      };
      await assertTransformSuccess(options, middlewareFunc);
    });
  });

  describe('Testing Transformer transforming from JSON to YAML', () => {
    const SRC = './test/data/test-file.json';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-json-yaml.yaml';

    it('should store ' + SRC + ' file to ' + DEST, (done) => {
      expect.assertions(2);
      const options = {
        src: path.resolve(SRC),
        dest: path.resolve(DEST),
      };
      assertYamlTransformSuccess(options, middlewareFunc, done);
    });
  });

  describe('Testing Transformer transforming from JS to JS', () => {
    const SRC = './test/data/test-file.js';
    const DEST = TRANSFORMER_TEST_BASE_DIR + '/test-data-transform-js-js.js';

    it('should store ' + SRC + ' file to ' + DEST, async () => {
      expect.assertions(2);
      const options = {
        src: path.resolve(SRC),
        dest: path.resolve(DEST),
      };
      await assertTransformSuccess(options, middlewareFunc);
    });
  });
});
