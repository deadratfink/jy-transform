import YAMLException from 'js-yaml/lib/js-yaml/exception';
import fs from 'fs';
import { readJs, readYaml } from '../../src/reader';
import { logger } from '../logger';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';
import {
  TYPE_JS,
  TYPE_YAML,
  TYPE_JSON,
} from '../../src/constants';

/**
 * @module jy-transform:unit-test:test-reader
 * @description This unit test suite checks the validity and correctness of {@link Reader} class.
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - reader - ', () => {
  /**
   * Assert a `Error` properties for a given reader function.
   *
   * @param {Object} options                - The options which potentially produce the error.
   * @param {Function} readerFunc           - The function to call for assertion.
   * @param {Object} [match={name:'Error'}] - The propertie(s) error should contain.
   * @private
   */
  const expectReaderError = (options, readerFunc, match = { name: 'Error' }) => {
    expect.assertions(1);
    return expect(readerFunc(options)).rejects.toMatchObject(match);
  };

  /**
   * Assert an `Error` for a given reader function.
   *
   * @param {Object} options       - The options which potentially produce the error.
   * @param {Function} readerFunc  - The function to call for assertion.
   * @param {Error} [match=Error'] - The error type to match.
   * @private
   */
  const expectReaderErrorByType = (options, readerFunc, match = Error) => {
    expect.assertions(1);
    return expect(readerFunc(options)).rejects.toBeInstanceOf(match);
  };

  /**
   * Assert a successful reading of input.
   *
   * @param {Object} options      - The options.
   * @param {Function} readerFunc - The function to call for assertion.
   * @param {string} key          - The function to call for assertion.
   * @param {*} expectedValue     - The expected value for `key`.
   * @private
   */
  const expectReaderSuccess = async (options, readerFunc, key, expectedValue) => {
    expect.assertions(2);
    const json = await readerFunc(options);
    expect(json).toBeDefined();
    expect(json[key]).toBe(expectedValue);
  };

  describe('Testing Reader.readJs(...)', () => {
    const exports = 'fooBar';
    const exportsNotExists = 'notFooBar';
    const invalidIdentifier = '#3/-';

    it('should reject on reading JS with options.imports == \'\'', () => {
      const options = {
        src: './test/data/test-data.js',
        imports: '',
      };
      return expectReaderError(options, readJs, { name: 'ValidationError', isJoi: true });
    });

    it('should read JS from file', async () =>
      await expectReaderSuccess({ src: './test/data/test-data.js' }, readJs, 'myproperty', 'old value')
    );

    it('should read JS from file with options.imports == \'' + exports + '\'', async () => {
      expect.assertions(5);
      const options = {
        src: './test/data/test-imports.js',
        imports: exports,
      };
      const json = await readJs(options);
      expect(json).toBeDefined();
      expect(Object.prototype.hasOwnProperty.call(json, exports)).toBeFalsy();
      expect(Object.prototype.hasOwnProperty.call(json, 'bar')).toBeFalsy();
      expect(Object.prototype.hasOwnProperty.call(json, 'foo')).toBeTruthy();
      expect(json.foo).toBe('bar');
    });

    it('should read JS from file with options.imports == \'' + exports
      + '\' and given origin for unsupported file extension', async () => {
      expect.assertions(5);
      const options = {
        src: './test/data/test-imports.txt',
        imports: exports,
        origin: TYPE_JS,
      };
      const json = await readJs(options);
      expect(json).toBeDefined();
      expect(Object.prototype.hasOwnProperty.call(json, exports)).toBeFalsy();
      expect(Object.prototype.hasOwnProperty.call(json, 'bar')).toBeFalsy();
      expect(Object.prototype.hasOwnProperty.call(json, 'foo')).toBeTruthy();
      expect(json.foo).toBe('bar');
    });

    it('should reject read JS from file with Error on invalid identifier for options.imports: '
      + invalidIdentifier, () => {
      const options = {
        src: './test/data/test-imports.js',
        imports: invalidIdentifier,
      };
      return expectReaderError(options, readJs, { name: 'ValidationError', isJoi: true });
    });

    it('should reject read JS from file with Error on non-existent identifier for options.imports: '
      + exportsNotExists, () => {
      const options = {
        src: './test/data/test-imports.js',
        imports: exportsNotExists,
      };
      return expectReaderErrorByType(options, readJs, Error);
    });

    it('should read JSON from file', async () =>
      await expectReaderSuccess({ src: './test/data/test-data.json' }, readJs, 'myproperty', 'old value')
    );

    it('should read JS from object', async () => {
      const options = {
        src: {
          foo: 'bar',
        },
      };
      await expectReaderSuccess(options, readJs, 'foo', 'bar');
    });

    it('should read JS from Object with options.imports == \'' + exports + '\'', async () => {
      expect.assertions(6);
      const options = {
        src: {
          fooBar: {
            bar: 'foo',
            foo: 'bar',
          },
        },
        imports: exports,
      };
      const json = await readJs(options);
      expect(json).toBeDefined();
      expect(Object.prototype.hasOwnProperty.call(json, exports)).toBeFalsy();
      expect(Object.prototype.hasOwnProperty.call(json, 'bar')).toBeTruthy();
      expect(Object.prototype.hasOwnProperty.call(json, 'foo')).toBeTruthy();
      expect(json.bar).toBe('foo');
      expect(json.foo).toBe('bar');
    });

    it('should reject read JS from Object with Error on invalid identifier for options.imports: '
      + invalidIdentifier, () => {
      const options = {
        src: {
          fooBar: {
            bar: 'foo',
            foo: 'bar',
          },
        },
        imports: invalidIdentifier,
      };
      return expectReaderError(options, readJs, { name: 'ValidationError', isJoi: true });
    });

    it('should reject read (deep) JS from file with Error on non-existent identifier for options.imports: '
      + exportsNotExists, () => {
      const options = {
        src: {
          fooBar: {
            bar: 'foo',
            foo: 'bar',
          },
        },
        imports: exportsNotExists,
      };
      return expectReaderErrorByType(options, readJs, Error);
    });

    it('should read JSON from stream', async () =>
      await expectReaderSuccess({
        origin: TYPE_JSON,
        src: fs.createReadStream('./test/data/test-data.json')
      }, readJs, 'myproperty', 'old value')
    );

    it('should read corrupted JSON from file path and fail by SyntaxError', () => {
      return expectReaderErrorByType({
        origin: TYPE_JSON,
        src: './test/data/test-data-corrupted.json'
      }, readJs, SyntaxError);
    });

    it('should read invalid JSON from file path and fail by SyntaxError', () => {
      return expectReaderErrorByType({
        origin: TYPE_JSON,
        src: './test/data/test-data-wrong-syntax.json'
      }, readJs, SyntaxError);
    });

    it('should read corrupted JSON from stream and fail by SyntaxError', () => {
      const options = {
        origin: TYPE_JSON,
        src: fs.createReadStream('./test/data/test-data-corrupted.json'),
      };
      return expectReaderErrorByType(options, readJs, SyntaxError);
    });

    it('should read invalid JSON from stream and fail by SyntaxError', () => {
      return expectReaderErrorByType({
        origin: TYPE_JSON,
        src: fs.createReadStream('./test/data/test-data-wrong-syntax.json')
      }, readJs, SyntaxError);
    });

    it('should fail JS(ON) read by missing options', () => {
      return expectReaderError(null, readJs, { name: 'ValidationError', isJoi: true });
    });

    it('should fail JS(ON) read by missing options.src', () => {
      return expectReaderError({}, readJs, { name: 'ValidationError', isJoi: true });
    });
  });

  describe('Testing Reader.readYaml(...)', () => {
    it('should read YAML from file', async () =>
      await expectReaderSuccess({ src: './test/data/test-data.yaml' }, readYaml, 'myproperty', 'old value')
    );

    it('should read JS from object', async () =>
      await expectReaderSuccess({ src: { test: 'value' } }, readYaml, 'test', 'value')
    );

    it('should read YAML from stream', async () =>
      await expectReaderSuccess({
        origin: TYPE_YAML,
        src: fs.createReadStream('./test/data/test-data.yaml'),
      }, readYaml, 'myproperty', 'old value')
    );

    it('should read invalid YAML from file path and fail by YAMLException', () => {
      return expectReaderErrorByType({ src: './test/data/test-data-wrong-syntax.yaml' }, readYaml,
        YAMLException);
    });

    it('should read invalid YAML from stream and fail by YAMLException', () => {
      return expectReaderErrorByType({
        origin: TYPE_YAML,
        src: fs.createReadStream('./test/data/test-data-wrong-syntax.yaml'),
      }, readYaml, YAMLException);
    });

    it('should fail YAML read by missing input options', () => {
      return expectReaderError(null, readYaml, { name: 'ValidationError', isJoi: true });
    });

    it('should fail YAML read by missing options.src', () => {
      return expectReaderError({}, readYaml, { name: 'ValidationError', isJoi: true });
    });
  });
});
