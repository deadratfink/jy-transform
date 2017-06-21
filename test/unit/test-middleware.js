import objectPath from 'object-path';
import { ensureMiddleware, identityMiddleware } from '../../src/middleware';
import { transform } from '../../src/transformer';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';
import { logger } from '../logger';

/**
 * @module jy-transform:unit-test:test-middleware
 * @description This unit test suite checks the validity and correctness of {@link middleware} module.
 * @private
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - middleware - ', () => {
  /**
   * Middleware function for altering JSON.
   *
   * @param {Object} json - The JSON object to alter.
   * @private
   */
  const middleware = (json) => {
    const key1 = async (jsonToAlter) => {
      objectPath.set(jsonToAlter, 'key1', 'value1');
      logger.info('key1 json: ' + JSON.stringify(jsonToAlter));
      return jsonToAlter;
    };

    const key2 = async (jsonToAlter) => {
      objectPath.set(jsonToAlter, 'key2', 'value2');
      logger.info('key2 json: ' + JSON.stringify(jsonToAlter));
      return jsonToAlter;
    };

    const key3 = async (jsonToAlter) => {
      objectPath.set(jsonToAlter, 'key3', 'value3');
      logger.info('key3 json: ' + JSON.stringify(jsonToAlter));
      return jsonToAlter;
    };

    return Promise.all([key1(json), key2(json), key3(json)])
      .then((result) => {
        expect(result).toHaveLength(3);
        logger.info('all the elements were created');
        logger.info('result: ' + JSON.stringify(result[result.length - 1]));
        return result[result.length - 1];
      });
  };

  /**
   * Helper function to assert the identity Promise.
   *
   * @param {Function} func - The identity Promise function.
   * @returns {Promise} A promise.
   * @private
   */
  const assertIdentityPromise = (func) => {
    const json = { test: 'identity' };
    return func(json).then(jsonResult => expect(jsonResult).toBe(json));
  };

  describe('Testing Transformer middleware', () => {
    it('should alter json', () => {
      expect.assertions(4);
      const options = {
        src: {},
        dest: {}
      };
      return transform(options, middleware)
        .then((msg) => {
          logger.info(msg);
          logger.info('options.dest: ' + JSON.stringify(options.dest, null, 4));
          expect(options.dest.key1).toBe('value1');
          expect(options.dest.key2).toBe('value2');
          expect(options.dest.key3).toBe('value3');
        });
    });
  });

  describe('Testing middleware.identityMiddleware()', () => {
    it('should provide passed function', async () => {
      const func = identityMiddleware;
      expect(func).toBeInstanceOf(Function);
      expect(func).toBe(identityMiddleware);

      const json = {};
      const jsonIdentity = await identityMiddleware(json);
      expect(jsonIdentity).toBe(json);
    });
  });

  describe('Testing middleware.ensureMiddleware()', () => {
    it('should provide passed function', () => {
      expect.assertions(2);
      const func = ensureMiddleware(identityMiddleware);
      expect(func).toBeInstanceOf(Function);
      expect(func).toBe(identityMiddleware);
    });

    it('should throw TypeError if middleware passed is not a function type', () => {
      expect.assertions(1);
      expect(() => ensureMiddleware('not a function')).toThrow(TypeError);
    });

    it('should provide identity Promise if middleware passed is null', async () => {
      expect.assertions(2);
      const func = ensureMiddleware();
      expect(func).toBeInstanceOf(Function);
      await assertIdentityPromise(func);
    });

    it('should provide identity Promise if middleware passed is undefined', async () => {
      expect.assertions(2);
      const func = ensureMiddleware(undefined);
      expect(func).toBeInstanceOf(Function);
      await assertIdentityPromise(func);
    });
  });
});
