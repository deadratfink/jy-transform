import YAMLException from 'js-yaml/lib/js-yaml/exception';
import fs from 'fs';
import { Reader, Constants } from '../../index';
import { logger } from '../logger';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';

/**
 * @classdesc This unit test suite checks the validity and correctness of {@link Reader} class.
 */
describe(TEST_SUITE_DESCRIPTION_UNIT + ' - reader - ', () => {
  /**
   * The testee.
   * @type {Reader}
   */
  let reader;

  /**
   * Assert an `Error` for a given reader function.
   *
   * @param {Object} options - The options which potentially produce the error.
   * @param {Function} readerFunc - The function to call for assertion.
   * @param {Error} [expectedErrorType=Error] - The error type to expect.
   * @private
   */
  const expectReaderError = (options, readerFunc, expectedErrorType = Error) => {
    expect.assertions(1);
    return expect(readerFunc(options)).rejects.toBeInstanceOf(expectedErrorType);
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

  beforeAll(() => {
    reader = new Reader(logger);
  });

  describe('Testing Reader.readJs(...)', () => {
    const exports = 'fooBar';
    const exportsNotExists = 'notFooBar';
    const invalidIdentifier = '#3/-';

    it('should read JS from file', async () =>
      await expectReaderSuccess({ src: './test/data/test-data.js' }, reader.readJs, 'myproperty', 'old value')
    );

    it('should read JS from file with options.imports == \'\'', async () => {
      const options = {
        src: './test/data/test-data.js',
        imports: '',
      };
      await expectReaderSuccess(options, reader.readJs, 'myproperty', 'old value');
    });


    it('should read JS from file with options.imports == \'' + exports + '\'', async () => {
      expect.assertions(5);
      const options = {
        src: './test/data/test-imports.js',
        imports: exports,
      };
      const json = await reader.readJs(options);
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
        origin: Constants.JS,
      };
      const json = await reader.readJs(options);
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
      return expectReaderError(options, reader.readJs);
    });

    it('should reject read JS from file with Error on non-existent identifier for options.imports: '
      + exportsNotExists, () => {
      const options = {
        src: './test/data/test-imports.js',
        imports: exportsNotExists,
      };
      return expectReaderError(options, reader.readJs);
    });

    it('should read JSON from file', async () =>
      await expectReaderSuccess({ src: './test/data/test-data.json' }, reader.readJs, 'myproperty', 'old value')
    );

    it('should read JS from object', async () => {
      const options = {
        src: {
          test: 'value',
        },
      };
      await expectReaderSuccess(options, reader.readJs, 'test', 'value');
    });

    it('should read JS from object with options.imports == \'\'', async () => {
      const options = {
        src: {
          foo: 'bar',
        },
        imports: '',
      };
      await expectReaderSuccess(options, reader.readJs, 'foo', 'bar');
    });

    it('should read JS from object with options.imports == \'' + exports + '\'', async () => {
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
      const json = await reader.readJs(options);
      expect(json).toBeDefined();
      expect(Object.prototype.hasOwnProperty.call(json, exports)).toBeFalsy();
      expect(Object.prototype.hasOwnProperty.call(json, 'bar')).toBeTruthy();
      expect(Object.prototype.hasOwnProperty.call(json, 'foo')).toBeTruthy();
      expect(json.bar).toBe('foo');
      expect(json.foo).toBe('bar');
    });

    it('should reject read JS from object with Error on invalid identifier for options.imports: '
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
      return expectReaderError(options, reader.readJs);
    });

    it('should reject read JS from file with Error on non-existent identifier for options.imports: '
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
      return expectReaderError(options, reader.readJs);
    });

    it('should read JSON from stream', async () =>
      await expectReaderSuccess({ src: fs.createReadStream('./test/data/test-data.json') },
        reader.readJs, 'myproperty', 'old value')
    );

    it('should read corrupted JSON from file path and fail by SyntaxError', () => {
      return expectReaderError({ src: './test/data/test-data-corrupted.json' }, reader.readJs, SyntaxError);
    });

    it('should read invalid JSON from file path and fail by SyntaxError', () => {
      const options = { src: './test/data/test-data-wrong-syntax.json' };
      return expectReaderError(options, reader.readJs, SyntaxError);
    });

    it('should read corrupted JSON from stream and fail by SyntaxError', () => {
      const options = { src: fs.createReadStream('./test/data/test-data-corrupted.json') };
      return expectReaderError(options, reader.readJs, SyntaxError);
    });

    it('should read invalid JSON from stream and fail by SyntaxError', () => {
      return expectReaderError({ src: fs.createReadStream('./test/data/test-data-wrong-syntax.json') },
        reader.readJs, SyntaxError);
    });

    it('should fail JS(ON) read by missing options', () => {
      return expectReaderError(null, reader.readJs);
    });

    it('should fail JS(ON) read by missing options.src', () => {
      return expectReaderError({}, reader.readJs);
    });
  });

  describe('Testing Reader.readYaml(...)', () => {
    it('should read YAML from file', async () =>
      await expectReaderSuccess({ src: './test/data/test-data.yaml' }, reader.readYaml, 'myproperty', 'old value')
    );

    it('should read JS from object', async () =>
      await expectReaderSuccess({ src: { test: 'value' } }, reader.readYaml, 'test', 'value')
    );

    it('should read YAML from stream', async () =>
      await expectReaderSuccess({ src: fs.createReadStream('./test/data/test-data.yaml') },
        reader.readYaml, 'myproperty', 'old value')
    );

    it('should read invalid YAML from file path and fail by YAMLException', () => {
      return expectReaderError({ src: './test/data/test-data-wrong-syntax.yaml' }, reader.readYaml, YAMLException);
    });

    it('should read invalid YAML from stream and fail by YAMLException', () => {
      return expectReaderError({ src: fs.createReadStream('./test/data/test-data-wrong-syntax.yaml') },
        reader.readYaml);
    });

    it('should fail YAML read by missing input options', () => {
      return expectReaderError(null, reader.readYaml);
    });

    it('should fail YAML read by missing options.src', () => {
      return expectReaderError({}, reader.readYaml);
    });
  });
});
