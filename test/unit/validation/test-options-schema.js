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
} from '../../../src/constants';
import { transformerOptionsSchema } from '../../../src/validation/options-schema';
import Joi from '../../../src/validation/joi-extensions';

/**
 * @module jy-transform:unit-test:test-options-schema
 * @description This unit test suite checks the validity and correctness of options schema.
 * @private
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - options-schema - ', () => {
  /**
   * Expect a `ValidationError` for a given options function.
   *
   * @param {Options} options - The options which potentially produce the error.
   * @private
   */
  function expectOptionsValidationError(options) {
    expect.assertions(1);
    return expect(Joi.validate(options, transformerOptionsSchema)).rejects.toMatchObject({
      name: 'ValidationError',
      isJoi: true,
    });
  }

  /**
   * Expect a validation success for a given options.
   *
   * @param {Options} options - The options which should be correct.
   * @private
   */
  function expectOptionsValidationSuccess(options) {
    expect.assertions(1);
    return expect(Joi.validate(options, transformerOptionsSchema)).resolves.toMatchObject(options);
  }

  describe('Testing options schema validation', () => {
    it('should reject when options is missing (null)', async () =>
      await expectOptionsValidationError(null)
    );

    it('should reject when options is missing (undefined)', async () =>
      await expectOptionsValidationError(undefined)
    );

    it('should set all defaults', async () => {
      expect.assertions(6);
      const options = {
        src: './test/data/test-data.yaml',
        dest: './test/tmp/test-data.js',
      };
      const validatedOptions = await Joi.validate(options, transformerOptionsSchema);
      expect(validatedOptions.origin).toBe(DEFAULT_ORIGIN);
      expect(validatedOptions.target).toBe(DEFAULT_TARGET);
      expect(validatedOptions.indent).toBe(DEFAULT_INDENT);
      expect(validatedOptions.imports).toBe(DEFAULT_JS_IMPORTS_IDENTIFIER);
      expect(validatedOptions.exports).toBe(DEFAULT_JS_EXPORTS_IDENTIFIER);
      expect(validatedOptions.force).toBe(DEFAULT_FORCE_FILE_OVERWRITE);
    });

    it('should infer options.origin and options.target from file type', async () => {
      expect.assertions(2);
      const options = {
        src: './test/data/test-data.js',    // non default type
        dest: 'some-file.yml',  // non default type
      };
      const validatedOptions = await Joi.validate(options, transformerOptionsSchema);
      expect(validatedOptions.origin).toBe(TYPE_JS);
      expect(validatedOptions.target).toBe(TYPE_YAML);
    });

    it('should infer options.origin and options.target from set origin and target', async () => {
      expect.assertions(2);
      const options = {
        origin: TYPE_JS,
        target: TYPE_YAML,
        src: new Stream.Readable(),   // no inference possible
        dest: new Stream.Writable(),  // no inference possible
      };
      const validatedOptions = await Joi.validate(options, transformerOptionsSchema);
      expect(validatedOptions.origin).toBe(TYPE_JS);
      expect(validatedOptions.target).toBe(TYPE_YAML);
    });

    it('should infer options.origin to JS from object type', async () => {
      expect.assertions(1);
      const options = {
        src: {},
        dest: 'some-file',
      };
      const validatedOptions = await Joi.validate(options, transformerOptionsSchema);
      expect(validatedOptions.origin).toBe(TYPE_JS);
    });
  });

  describe('Testing options.src schema validation', () => {
    it('should reject when options.src is an existing directory path string', async () =>
      await expectOptionsValidationError({
        src: './test',
        dest: 'some-file',
      })
    );

    it('should reject when options.src is undefined', async () =>
      await expectOptionsValidationError({ dest: 'some-file' })
    );

    it('should reject when options.src is null', async () =>
      await expectOptionsValidationError({
        src: null,
        dest: 'some-file',
      })
    );

    it('should resolve to default origin ' + DEFAULT_ORIGIN + ' when options.src is Stream.Readable and ' +
      'options.origin is not set', async () => {
      expect.assertions(2);
      const options = {
        src: new Stream.Readable(),
        dest: new Stream.Writable(),
        target: TYPE_YAML,
      };
      const validatedOptions = await Joi.validate(options, transformerOptionsSchema);
      expect(validatedOptions.origin).toBe(DEFAULT_ORIGIN);
      expect(validatedOptions.target).toBe(TYPE_YAML);
    });
  });

  describe('Testing options.dest schema validation', () => {
    it('should reject when options.dest is undefined', async () =>
      await expectOptionsValidationError({ src: './test/data/test-data.js' })
    );

    it('should reject when options.dest is null', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data.js',
        dest: null,
      })
    );

    it('should resolve output when options.dest is Stream.Writable and options.target is set', async () => {
      expect.assertions(2);
      const options = {
        src: './test/data/test-data.js',
        dest: new Stream.Writable(),
        target: TYPE_YAML,
      };
      const validatedOptions = await Joi.validate(options, transformerOptionsSchema);
      expect(validatedOptions.origin).toBe(TYPE_JS);
      expect(validatedOptions.target).toBe(TYPE_YAML);
    });

    it('should resolve output when options.dest is Stream.Writable (to YAML file) and options.target is not set',
      async () => {
        expect.assertions(2);
        const options = {
          src: './test/data/test-data.js',
          dest: fs.createWriteStream('./test/tmp/test-data.yaml'),
        };
        const validatedOptions = await Joi.validate(options, transformerOptionsSchema);
        expect(validatedOptions.origin).toBe(TYPE_JS);
        expect(validatedOptions.target).toBe(TYPE_YAML);
      });

    it('should resolve default ' + DEFAULT_TARGET + ' output when options.dest is Stream.Writable (without path) ' +
      'and options.target is not set)', async () => {
      expect.assertions(2);
      const options = {
        src: './test/data/test-data.js',
        dest: new Stream.Writable(),
      };
      const validatedOptions = await Joi.validate(options, transformerOptionsSchema);
      expect(validatedOptions.origin).toBe(TYPE_JS);
      expect(validatedOptions.target).toBe(DEFAULT_TARGET);
    });
  });

  describe('Testing options.origin schema validation', () => {
    it('should resolve with default ' + DEFAULT_ORIGIN + ' when options.origin is undefined and options.src does ' +
      'not allow to infer the type', async () => {
      const options = {
        src: './test/data/test-data',
        dest: 'some-file'
      };
      const validatedOptions = await Joi.validate(options, transformerOptionsSchema);
      expect(validatedOptions.origin).toBe(DEFAULT_ORIGIN);
    });

    it('should resolve when options.origin has valid target ' + TYPE_JS, async () => {
      await expectOptionsValidationSuccess({
        src: './test/data/test-data',
        dest: 'some-file',
        origin: TYPE_JS,
      });
    });

    it('should resolve when options.origin has valid target ' + TYPE_JSON, async () => {
      await expectOptionsValidationSuccess({
        src: './test/data/test-data-json',
        dest: 'some-file',
        origin: TYPE_JSON,
      });
    });

    it('should resolve when options.origin has valid target ' + TYPE_YAML, async () => {
      await expectOptionsValidationSuccess({
        src: './test/data/test-data-yaml',
        dest: 'some-file',
        origin: TYPE_YAML,
      });
    });

    it('should reject when options.origin is null', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data-yaml',
        dest: 'some-file',
        origin: null,
      })
    );

    it('should reject when options.origin is not allowed value', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data-yaml',
        dest: 'some-file',
        origin: 'not-allowed',
      })
    );
  });

  describe('Testing options.target schema validation', () => {
    it('should resolve with default ' + DEFAULT_TARGET + ' when options.target is undefined', async () => {
      const options = {
        src: './test/data/test-data.js',
        dest: 'some-file'
      };
      const validatedOptions = await Joi.validate(options, transformerOptionsSchema);
      expect(validatedOptions.target).toBe(DEFAULT_TARGET);
    });

    it('should resolve when options.target has valid target ' + TYPE_JS, async () => {
      await expectOptionsValidationSuccess({
        src: './test/data/test-data.js',
        dest: 'some-file',
        target: TYPE_JS,
      });
    });

    it('should resolve when options.target has valid target ' + TYPE_JSON, async () => {
      await expectOptionsValidationSuccess({
        src: './test/data/test-data.json',
        dest: 'some-file',
        target: TYPE_JS,
      });
    });

    it('should resolve when options.target has valid target ' + TYPE_YAML, async () => {
      await expectOptionsValidationSuccess({
        src: './test/data/test-data.yaml',
        dest: 'some-file',
        target: TYPE_YAML,
      });
    });

    it('should reject when options.target is null', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data.js',
        dest: 'some-file',
        target: null,
      })
    );

    it('should reject when options.target is not allowed value', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data.js',
        dest: 'some-file',
        target: 'not-allowed',
      })
    );
  });

  describe('Testing options.imports schema validation', () => {
    const nonStringIdentifier = {};
    it('should reject non-string identifier \'' + stringify(nonStringIdentifier) + '\'', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data.js',
        dest: 'some-file',
        imports: nonStringIdentifier,
      })
    );

    const invalidIdentifier = '#3/-';
    it('should reject invalid identifier \'' + invalidIdentifier + '\'', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data.js',
        dest: 'some-file',
        imports: invalidIdentifier,
      })
    );

    const validIdentifier = 'bar';
    it('should accept valid \'' + validIdentifier + '\' identifier', async () =>
      await expectOptionsValidationSuccess({
        src: './test/data/test-data.js',
        dest: 'some-file',
        imports: validIdentifier,
      })
    );
  });

  describe('Testing options.exports schema validation', () => {
    const nonStringIdentifier = {};
    it('should reject non-string identifier \'' + stringify(nonStringIdentifier) + '\'', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data.js',
        dest: 'some-file',
        exports: nonStringIdentifier,
      })
    );

    const invalidIdentifier = '#3/-';
    it('should reject invalid identifier \'' + invalidIdentifier + '\'', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data.js',
        dest: 'some-file',
        exports: invalidIdentifier,
      })
    );

    const validIdentifier = 'bar';
    it('should accept valid \'' + validIdentifier + '\' identifier', async () =>
      await expectOptionsValidationSuccess({
        src: './test/data/test-data.js',
        dest: 'some-file',
        exports: validIdentifier,
      })
    );
  });

  describe('Testing options.force schema validation', () => {
    const notBoolean = {};
    it('should reject non-boolean value \'' + stringify(notBoolean) + '\'', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data.js',
        dest: 'some-file',
        force: notBoolean,
      })
    );

    it('should accept valid value \'false\'', async () =>
      await expectOptionsValidationSuccess({
        src: './test/data/test-data.js',
        dest: 'some-file',
        force: false,
      })
    );

    it('should accept valid value \'true\'', async () =>
      await expectOptionsValidationSuccess({
        src: './test/data/test-data.js',
        dest: 'some-file',
        force: true,
      })
    );
  });

  describe('Testing options.indent schema validation', () => {
    const notInteger = 0.5;
    it('should reject non-integer value \'' + stringify(notInteger) + '\'', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data.js',
        dest: 'some-file',
        indent: notInteger,
      })
    );

    it('should accept valid \'' + MIN_INDENT + '\'', async () =>
      await expectOptionsValidationSuccess({
        src: './test/data/test-data.js',
        dest: 'some-file',
        indent: MIN_INDENT,
      })
    );

    it('should accept valid \'' + MAX_INDENT + '\'', async () =>
      await expectOptionsValidationSuccess({
        src: './test/data/test-data.js',
        dest: 'some-file',
        indent: MAX_INDENT,
      })
    );

    it('should reject < \'' + MIN_INDENT + '\'', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data.js',
        dest: 'some-file',
        indent: MIN_INDENT - 1,
      })
    );

    it('should reject > \'' + MAX_INDENT + '\'', async () =>
      await expectOptionsValidationError({
        src: './test/data/test-data.js',
        dest: 'some-file',
        indent: MAX_INDENT + 1,
      })
    );
  });
});
