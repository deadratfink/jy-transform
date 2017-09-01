import YAMLException from 'js-yaml/lib/js-yaml/exception';
import fs from 'fs';
import { read } from '../../src/reader';
import { TEST_SUITE_DESCRIPTION_FUNCTIONAL } from '../helper-constants';
import {
  TYPE_JS,
  TYPE_YAML,
  TYPE_JSON,
} from '../../src/constants';

/**
 * @module jy-transform:unit-test:test-reader
 * @description This unit test suite checks the validity and correctness of the Reader module.
 * @private
 */

describe(TEST_SUITE_DESCRIPTION_FUNCTIONAL + ' - reader - ', () => {
  /**
   * Assert a `Error` properties for a given reader function.
   *
   * @param {Object} options                - The options which potentially produce the error.
   * @param {Object} [match={name:'Error'}] - The propertie(s) error should contain.
   * @private
   */
  const expectReaderError = (options, match = { name: 'Error' }) => {
    expect.assertions(1);
    return expect(read(options)).rejects.toMatchObject(match);
  };

  /**
   * Assert an `Error` for a given reader function.
   *
   * @param {Object} options       - The options which potentially produce the error.
   * @param {Error} [match=Error'] - The error type to match.
   * @private
   */
  const expectReaderErrorByType = (options, match = Error) => {
    expect.assertions(1);
    return expect(read(options)).rejects.toBeInstanceOf(match);
  };

  /**
   * Assert a successful reading of input.
   *
   * @param {Object} options      - The options.
   * @param {string} key          - The function to call for assertion.
   * @param {*} expectedValue     - The expected value for `key`.
   * @private
   */
  const expectReaderSuccess = async (options, key, expectedValue) => {
    expect.assertions(2);
    const json = await read(options);
    expect(json).toBeDefined();
    expect(json[key]).toBe(expectedValue);
  };

  describe('The reading from JS', () => {
    const exports = 'fooBar';
    const exportsNotExists = 'notFooBar';
    const invalidIdentifier = '#3/-';

    it('should reject with options.imports == \'\'', () => {
      const options = {
        src: './test/data/test-data.js',
        imports: '',
      };
      return expectReaderError(options, { name: 'ValidationError', isJoi: true });
    });

    it('should read JS successfully', () =>
      expectReaderSuccess({ src: { myproperty: 'value' } }, 'myproperty', 'value')
    );

    it('should read JS from file successfully', () =>
      expectReaderSuccess({ src: './test/data/test-data.js' }, 'myproperty', 'old value')
    );

    it('should read JS from JS object successfully and both object references are different', async () => {
      expect.assertions(3);
      const options = {
        src: {},
      };
      const object = await read(options);
      expect(object).toBeDefined();
      expect(object).toMatchObject({});
      expect(object === options.src).toBe(false);
    });

    it('should read JS from file with options.imports == \'' + exports + '\' successfully', async () => {
      expect.assertions(5);
      const options = {
        src: './test/data/test-imports.js',
        imports: exports,
      };
      const json = await read(options);
      expect(json).toBeDefined();
      expect(Object.prototype.hasOwnProperty.call(json, exports)).toBeFalsy();
      expect(Object.prototype.hasOwnProperty.call(json, 'bar')).toBeFalsy();
      expect(Object.prototype.hasOwnProperty.call(json, 'foo')).toBeTruthy();
      expect(json.foo).toBe('bar');
    });

    it('should read JS from file with options.imports == \'' + exports
      + '\' and given origin for unsupported file extension successfully', async () => {
      expect.assertions(5);
      const options = {
        src: './test/data/test-imports.txt',
        imports: exports,
        origin: TYPE_JS,
      };
      const json = await read(options);
      expect(json).toBeDefined();
      expect(Object.prototype.hasOwnProperty.call(json, exports)).toBeFalsy();
      expect(Object.prototype.hasOwnProperty.call(json, 'bar')).toBeFalsy();
      expect(Object.prototype.hasOwnProperty.call(json, 'foo')).toBeTruthy();
      expect(json.foo).toBe('bar');
    });

    it('should reject reading JS from file with Error on invalid identifier for options.imports: '
      + invalidIdentifier, () => {
      const options = {
        src: './test/data/test-imports.js',
        imports: invalidIdentifier,
      };
      return expectReaderError(options, { name: 'ValidationError', isJoi: true });
    });

    it('should reject reading JS from file with Error on non-existent identifier for options.imports: '
      + exportsNotExists, () => {
      const options = {
        src: './test/data/test-imports.js',
        imports: exportsNotExists,
      };
      return expectReaderErrorByType(options, Error);
    });

    it('should read JSON from file successfully', () =>
      expectReaderSuccess({ src: './test/data/test-data.json' }, 'myproperty', 'old value')
    );

    it('should read JS from object successfully', async () => {
      const options = {
        src: {
          foo: 'bar',
        },
      };
      await expectReaderSuccess(options, 'foo', 'bar');
    });

    it('should read JS from Object with options.imports == \'' + exports + '\' successfully', async () => {
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
      const json = await read(options);
      expect(json).toBeDefined();
      expect(Object.prototype.hasOwnProperty.call(json, exports)).toBeFalsy();
      expect(Object.prototype.hasOwnProperty.call(json, 'bar')).toBeTruthy();
      expect(Object.prototype.hasOwnProperty.call(json, 'foo')).toBeTruthy();
      expect(json.bar).toBe('foo');
      expect(json.foo).toBe('bar');
    });

    it('should reject reading JS from Object with Error on invalid identifier for options.imports: '
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
      return expectReaderError(options, { name: 'ValidationError', isJoi: true });
    });

    it('should reject reading JS (deeply) from file with Error on non-existent identifier for options.imports: '
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
      return expectReaderErrorByType(options, Error);
    });

    it('should read JSON from stream successfully', () =>
      expectReaderSuccess({
        origin: TYPE_JSON,
        src: fs.createReadStream('./test/data/test-data.json')
      }, 'myproperty', 'old value')
    );

    it('should read corrupted JSON from file path and fail by SyntaxError', () =>
      expectReaderErrorByType({
        origin: TYPE_JSON,
        src: './test/data/test-data-corrupted.json'
      }, SyntaxError)
    );

    it('should read invalid JSON from file path and fail by SyntaxError', () =>
      expectReaderErrorByType({
        origin: TYPE_JSON,
        src: './test/data/test-data-wrong-syntax.json'
      }, SyntaxError)
    );

    it('should read corrupted JSON from stream and fail by SyntaxError', () =>
      expectReaderErrorByType({
        origin: TYPE_JSON,
        src: fs.createReadStream('./test/data/test-data-corrupted.json'),
      }, SyntaxError)
    );

    it('should read invalid JSON from stream and fail by SyntaxError', () =>
      expectReaderErrorByType({
        origin: TYPE_JSON,
        src: fs.createReadStream('./test/data/test-data-wrong-syntax.json')
      }, SyntaxError)
    );

    it('should fail JS(ON) read by missing options', () =>
      expectReaderError(null, { name: 'ValidationError', isJoi: true })
    );

    it('should fail JS(ON) read by missing options.src', () =>
      expectReaderError({}, { name: 'ValidationError', isJoi: true })
    );
  });

  describe('Testing reading from YAML', () => {
    it('should read YAML from file successfully', () =>
      expectReaderSuccess({ src: './test/data/test-data.yaml' }, 'myproperty', 'old value')
    );

    it('should read JS from object successfully', () => // TODO
      expectReaderSuccess({ src: { test: 'value' } }, 'test', 'value')
    );

    it('should read YAML from stream successfully', () =>
      expectReaderSuccess({
        origin: TYPE_YAML,
        src: fs.createReadStream('./test/data/test-data.yaml'),
      }, 'myproperty', 'old value')
    );

    it('should read invalid YAML from file path and fail by YAMLException', () =>
      expectReaderErrorByType({ src: './test/data/test-data-wrong-syntax.yaml' }, YAMLException)
    );

    it('should read invalid YAML from stream and fail by YAMLException', () =>
      expectReaderErrorByType({
        origin: TYPE_YAML,
        src: fs.createReadStream('./test/data/test-data-wrong-syntax.yaml'),
      }, YAMLException)
    );

    it('should fail reading YAML by providing empty JS object as options.src', () =>
      expectReaderError({ src: {}, origin: TYPE_YAML }, { name: 'ValidationError', isJoi: true })
    );

    it('should fail YAML reading by missing input options', () =>
      expectReaderError(null, { name: 'ValidationError', isJoi: true })
    );

    it('should fail reading YAML by missing options.src', () =>
      expectReaderError({}, { name: 'ValidationError', isJoi: true })
    );

    it('should fail reading YAML from configured directory source', () =>
      expectReaderError({ src: './test/data' }, { name: 'ValidationError', isJoi: true })
    );

    it('should fail reading YAML from non-existing file', () =>
      expectReaderError({ src: './test/data/non-existing.yml' }, {
        name: 'ValidationError',
        isJoi: true
      })
    );
  });
});
