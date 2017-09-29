import stringify from 'json-stringify-safe';
import Stream from 'stream';
import fs from 'fs';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../../helper-constants';
import {
  TYPE_YAML,
  TYPE_JS,
  TYPE_JSON,
  DEFAULT_FORCE_FILE_OVERWRITE,
  DEFAULT_JS_IMPORTS_IDENTIFIER,
  DEFAULT_JS_EXPORTS_IDENTIFIER,
  DEFAULT_ORIGIN,
  DEFAULT_TARGET,
  DEFAULT_INDENT,
  MIN_INDENT,
  MAX_INDENT,
  DEFAULT_STRICT,
  DEFAULT_NO_ES6,
  DEFAULT_NO_SINGLE_QUOTES,
} from '../../../src/constants';
import {
  readOptionsSchema,
  writeOptionsSchema,
} from '../../../src/validation/options-schema';
import Joi from '../../../src/validation/joi-extensions';

/**
 * @module jy-transform:unit-test:test-options-schema
 * @description This unit test suite checks the validity and correctness of options schema.
 * @private
 */

/**
 * Expect a `ValidationError` for a given options function.
 *
 * @param {ReadOptions|WriteOptions} invalidOptions - The options which potentially produce the error.
 * @param {Schema} schema                           - The validation schema.
 * @private
 */
async function expectOptionsValidationError(invalidOptions, schema) {
  expect.assertions(1);
  try {
    await Joi.validate(invalidOptions, schema);
  } catch (err) {
    expect(err.name).toMatch('ValidationError');
  }
}

/**
 * Expect a validation success for a given options.
 *
 * @param {ReadOptions|WriteOptions} validOptions - The options which should be correct.
 * @param {Schema} schema                         - The validation schema.
 * @private
 */
function expectOptionsValidationSuccess(validOptions, schema) {
  expect.assertions(1);
  return expect(Joi.validate(validOptions, schema)).resolves.toMatchObject(validOptions);
}

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - options-schema - ', () => {
  describe('Testing readOptionsSchema validation', () => {
    it('should reject when options is missing (null)', () =>
      expectOptionsValidationError(null, readOptionsSchema));

    it('should reject when options is missing (undefined)', () =>
      expectOptionsValidationError(undefined, readOptionsSchema));

    it('should set all defaults', async () => {
      expect.assertions(2);
      const options = {
        src: './test/data/test-data.yaml',
        dest: './test/tmp/test-data.js',
      };
      const validatedOptions = await Joi.validate(options, readOptionsSchema);
      expect(validatedOptions.origin).toBe(DEFAULT_ORIGIN);
      expect(validatedOptions.imports).toBe(DEFAULT_JS_IMPORTS_IDENTIFIER);
    });

    it('should infer options.origin from file type', async () => {
      expect.assertions(1);
      const options = {
        src: './test/data/test-data.js', // non default type
      };
      const validatedOptions = await Joi.validate(options, readOptionsSchema);
      expect(validatedOptions.origin).toBe(TYPE_JS);
    });

    it('should infer options.origin from set origin', async () => {
      expect.assertions(1);
      const options = {
        origin: TYPE_JS,
        src: new Stream.Readable(), // no inference possible
      };
      const validatedOptions = await Joi.validate(options, readOptionsSchema);
      expect(validatedOptions.origin).toBe(TYPE_JS);
    });

    it('should infer options.origin to JS from object type', async () => {
      expect.assertions(1);
      const options = {
        src: {},
        dest: 'some-file',
      };
      const validatedOptions = await Joi.validate(options, readOptionsSchema);
      expect(validatedOptions.origin).toBe(TYPE_JS);
    });

    describe('Testing options.src schema validation', () => {
      it('should reject when options.src is an existing directory path string', () =>
        expectOptionsValidationError({
          src: './test',
          dest: 'some-file',
        }, readOptionsSchema)
      );

      it('should reject when options.src is undefined', () =>
        expectOptionsValidationError({ dest: 'some-file' }, readOptionsSchema)
      );

      it('should reject when options.src is null', () =>
        expectOptionsValidationError({
          src: null,
          dest: 'some-file',
        }, readOptionsSchema)
      );

      it('should resolve to default origin ' + DEFAULT_ORIGIN + ' when options.src is Stream.Readable and ' +
        'options.origin is not set', async () => {
        expect.assertions(2);
        const options = {
          src: new Stream.Readable(),
          dest: new Stream.Writable(),
          target: TYPE_YAML,
        };
        const validatedOptions = await Joi.validate(options, readOptionsSchema);
        expect(validatedOptions.origin).toBe(DEFAULT_ORIGIN);
        expect(validatedOptions.target).toBe(TYPE_YAML);
      });
    });

    describe('Testing options.origin schema validation', () => {
      it('should resolve with default ' + DEFAULT_ORIGIN + ' when options.origin is undefined and options.src does ' +
        'not allow to infer the type', async () => {
        const options = {
          src: './test/data/test-data',
          dest: 'some-file'
        };
        const validatedOptions = await Joi.validate(options, readOptionsSchema);
        expect(validatedOptions.origin).toBe(DEFAULT_ORIGIN);
      });

      it('should resolve when options.origin has valid target ' + TYPE_JS, () => {
        expectOptionsValidationSuccess({
          src: './test/data/test-data',
          dest: 'some-file',
          origin: TYPE_JS,
        }, readOptionsSchema);
      });

      it('should resolve when options.origin has valid target ' + TYPE_JSON, () => {
        expectOptionsValidationSuccess({
          src: './test/data/test-data-json',
          dest: 'some-file',
          origin: TYPE_JSON,
        }, readOptionsSchema);
      });

      it('should resolve when options.origin has valid target ' + TYPE_YAML, () => {
        expectOptionsValidationSuccess({
          src: './test/data/test-data-yaml',
          dest: 'some-file',
          origin: TYPE_YAML,
        }, readOptionsSchema);
      });

      it('should reject when options.origin is null', () =>
        expectOptionsValidationError({
          src: './test/data/test-data-yaml',
          dest: 'some-file',
          origin: null,
        }, readOptionsSchema)
      );

      it('should reject when options.origin is not allowed value', () =>
        expectOptionsValidationError({
          src: './test/data/test-data-yaml',
          dest: 'some-file',
          origin: 'not-allowed',
        }, readOptionsSchema)
      );
    });

    describe('Testing options.imports schema validation', () => {
      const nonStringIdentifier = {};
      it('should reject non-string identifier \'' + stringify(nonStringIdentifier) + '\'', () =>
        expectOptionsValidationError({
          src: './test/data/test-data.js',
          dest: 'some-file',
          imports: nonStringIdentifier,
        }, readOptionsSchema)
      );

      const invalidIdentifier = '#3/-';
      it('should reject invalid identifier \'' + invalidIdentifier + '\'', () =>
        expectOptionsValidationError({
          src: './test/data/test-data.js',
          dest: 'some-file',
          imports: invalidIdentifier,
        }, readOptionsSchema)
      );

      const validIdentifier = 'bar';
      it('should accept valid \'' + validIdentifier + '\' identifier', () =>
        expectOptionsValidationSuccess({
          src: './test/data/test-data.js',
          dest: 'some-file',
          imports: validIdentifier,
        }, readOptionsSchema)
      );
    });
  });

  describe('Testing writeOptionsSchema validation', () => {
    it('should reject when options is missing (null)', () =>
      expectOptionsValidationError(null, writeOptionsSchema)
    );

    it('should reject when options is missing (undefined)', () =>
      expectOptionsValidationError(undefined, writeOptionsSchema)
    );

    it('should set all defaults', async () => {
      expect.assertions(7);
      const options = {
        dest: './test/tmp/test-data.js',
      };
      const validatedOptions = await Joi.validate(options, writeOptionsSchema);
      expect(validatedOptions.target).toBe(DEFAULT_TARGET);
      expect(validatedOptions.indent).toBe(DEFAULT_INDENT);
      expect(validatedOptions.exports).toBe(DEFAULT_JS_EXPORTS_IDENTIFIER);
      expect(validatedOptions.force).toBe(DEFAULT_FORCE_FILE_OVERWRITE);
      expect(validatedOptions.strict).toBe(DEFAULT_STRICT);
      expect(validatedOptions['no-es6']).toBe(DEFAULT_NO_ES6);
      expect(validatedOptions['no-single']).toBe(DEFAULT_NO_SINGLE_QUOTES);
    });

    it('should infer options.target from file type', async () => {
      expect.assertions(1);
      const options = {
        dest: 'some-file.yml', // non default type
      };
      const validatedOptions = await Joi.validate(options, writeOptionsSchema);
      expect(validatedOptions.target).toBe(TYPE_YAML);
    });

    it('should infer options.target from set target', async () => {
      expect.assertions(1);
      const options = {
        target: TYPE_YAML,
        dest: new Stream.Writable(), // no inference possible
      };
      const validatedOptions = await Joi.validate(options, writeOptionsSchema);
      expect(validatedOptions.target).toBe(TYPE_YAML);
    });

    it('should infer options.target to JS from object type', async () => {
      expect.assertions(1);
      const options = {
        dest: {},
      };
      const validatedOptions = await Joi.validate(options, writeOptionsSchema);
      expect(validatedOptions.target).toBe(TYPE_JS);
    });

    describe('Testing options.dest schema validation', () => {
      it('should reject when options.dest is undefined', () =>
        expectOptionsValidationError({ src: './test/data/test-data.js' }, writeOptionsSchema)
      );

      it('should reject when options.dest is null', () =>
        expectOptionsValidationError({
          src: './test/data/test-data.js',
          dest: null,
        }, writeOptionsSchema)
      );

      it('should resolve output when options.dest is Stream.Writable and options.target is set', async () => {
        expect.assertions(1);
        const options = {
          dest: new Stream.Writable(),
          target: TYPE_YAML,
        };
        const validatedOptions = await Joi.validate(options, writeOptionsSchema);
        expect(validatedOptions.target).toBe(TYPE_YAML);
      });

      it('should resolve output when options.dest is Stream.Writable (to YAML file) and options.target is not set',
        async () => {
          expect.assertions(1);
          const options = {
            dest: fs.createWriteStream('./test/tmp/test-data.yaml'),
          };
          const validatedOptions = await Joi.validate(options, writeOptionsSchema);
          expect(validatedOptions.target).toBe(TYPE_YAML);
        });

      it('should resolve default ' + DEFAULT_TARGET + ' output when options.dest is Stream.Writable (without path) ' +
        'and options.target is not set)', async () => {
        expect.assertions(1);
        const options = {
          dest: new Stream.Writable(),
        };
        const validatedOptions = await Joi.validate(options, writeOptionsSchema);
        expect(validatedOptions.target).toBe(DEFAULT_TARGET);
      });
    });

    describe('Testing options.target schema validation', () => {
      it('should resolve with default ' + DEFAULT_TARGET + ' when options.target is undefined', async () => {
        const options = {
          dest: 'some-file'
        };
        const validatedOptions = await Joi.validate(options, writeOptionsSchema);
        expect(validatedOptions.target).toBe(DEFAULT_TARGET);
      });

      it('should resolve when options.target has valid target ' + TYPE_JS, () => {
        expectOptionsValidationSuccess({
          src: './test/data/test-data.js',
          dest: 'some-file',
          target: TYPE_JS,
        }, writeOptionsSchema);
      });

      it('should resolve when options.target has valid target ' + TYPE_JSON, () => {
        expectOptionsValidationSuccess({
          src: './test/data/test-data.json',
          dest: 'some-file',
          target: TYPE_JS,
        }, writeOptionsSchema);
      });

      it('should resolve when options.target has valid target ' + TYPE_YAML, () => {
        expectOptionsValidationSuccess({
          src: './test/data/test-data.yaml',
          dest: 'some-file',
          target: TYPE_YAML,
        }, writeOptionsSchema);
      });

      it('should reject when options.target is null', () =>
        expectOptionsValidationError({
          src: './test/data/test-data.js',
          dest: 'some-file',
          target: null,
        }, writeOptionsSchema)
      );

      it('should reject when options.target is not allowed value', () =>
        expectOptionsValidationError({
          src: './test/data/test-data.js',
          dest: 'some-file',
          target: 'not-allowed',
        }, writeOptionsSchema)
      );
    });

    describe('Testing options.exports schema validation', () => {
      const nonStringIdentifier = {};
      it('should reject non-string identifier \'' + stringify(nonStringIdentifier) + '\'', () =>
        expectOptionsValidationError({
          src: './test/data/test-data.js',
          dest: 'some-file',
          exports: nonStringIdentifier,
        }, writeOptionsSchema)
      );

      const invalidIdentifier = '#3/-';
      it('should reject invalid identifier \'' + invalidIdentifier + '\'', () =>
        expectOptionsValidationError({
          src: './test/data/test-data.js',
          dest: 'some-file',
          exports: invalidIdentifier,
        }, writeOptionsSchema)
      );

      const validIdentifier = 'bar';
      it('should accept valid \'' + validIdentifier + '\' identifier', () =>
        expectOptionsValidationSuccess({
          src: './test/data/test-data.js',
          dest: 'some-file',
          exports: validIdentifier,
        }, writeOptionsSchema)
      );
    });

    describe('Testing options.force schema validation', () => {
      const notBoolean = {};
      it('should reject non-boolean value \'' + stringify(notBoolean) + '\'', () =>
        expectOptionsValidationError({
          src: './test/data/test-data.js',
          dest: 'some-file',
          force: notBoolean,
        }, writeOptionsSchema)
      );

      it('should accept valid value \'false\'', () =>
        expectOptionsValidationSuccess({
          src: './test/data/test-data.js',
          dest: 'some-file',
          force: false,
        }, writeOptionsSchema)
      );

      it('should accept valid value \'true\'', () =>
        expectOptionsValidationSuccess({
          src: './test/data/test-data.js',
          dest: 'some-file',
          force: true,
        }, writeOptionsSchema)
      );
    });

    describe('Testing options.indent schema validation', () => {
      const notInteger = 0.5;
      it('should reject non-integer value \'' + stringify(notInteger) + '\'', () =>
        expectOptionsValidationError({
          src: './test/data/test-data.js',
          dest: 'some-file',
          indent: notInteger,
        }, writeOptionsSchema)
      );

      it('should accept valid \'' + MIN_INDENT + '\'', () =>
        expectOptionsValidationSuccess({
          src: './test/data/test-data.js',
          dest: 'some-file',
          indent: MIN_INDENT,
        }, writeOptionsSchema)
      );

      it('should accept valid \'' + MAX_INDENT + '\'', () =>
        expectOptionsValidationSuccess({
          src: './test/data/test-data.js',
          dest: 'some-file',
          indent: MAX_INDENT,
        }, writeOptionsSchema)
      );

      it('should reject < \'' + MIN_INDENT + '\'', () =>
        expectOptionsValidationError({
          src: './test/data/test-data.js',
          dest: 'some-file',
          indent: MIN_INDENT - 1,
        }, writeOptionsSchema)
      );

      it('should reject > \'' + MAX_INDENT + '\'', () =>
        expectOptionsValidationError({
          src: './test/data/test-data.js',
          dest: 'some-file',
          indent: MAX_INDENT + 1,
        }, writeOptionsSchema)
      );
    });
  });
});
