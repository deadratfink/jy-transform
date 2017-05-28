import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import stream from 'stream';
import OptionsHandler from '../../lib/options-handler';
import { logger } from '../logger';
import Constants from '../../lib/constants';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';

/**
 * @classdesc This unit test suite checks the validity and correctness of {@link OptionsHandler} class.
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - options-handler - ', () => {
  /**
   * Temporary base dir for writer test output.
   * @type {string}
   * @constant
   * @private
   */
  const OPTIONSHANDLER_TEST_BASE_DIR = './test/tmp/options-handler';

  /**
   * The testee.
   * @type {OptionsHandler}
   * @private
   */
  let optionsHandler;

  /**
   * Init the test logger and Writer.
   */
  beforeAll(() => {
    fsExtra.ensureDirSync(OPTIONSHANDLER_TEST_BASE_DIR);
    fsExtra.emptyDirSync(OPTIONSHANDLER_TEST_BASE_DIR);
    optionsHandler = new OptionsHandler(logger);
  });

  /**
   * Assert an `Error` for a given options function.
   *
   * @param {Object} options - The options which potentially produce the error.
   * @param {Function} optionsFunc - The function to call for assertion.
   * @param {Error} [errorType=Error] - The error type to expect.
   * @private
   */
  function expectOptionsError(options, optionsFunc, errorType = Error) {
    expect.assertions(1);
    return expect(optionsFunc(options)).rejects.toBeInstanceOf(errorType);
  }

  describe('Testing OptionsHandler.validateTransformation(...)', () => {
    it('should reject when options is missing', async () =>
      await expectOptionsError(null, optionsHandler.validateTransformation)
    );

    it('should reject when options.origin is missing', async () =>
      await expectOptionsError({ target: Constants.YAML }, optionsHandler.validateTransformation)
    );

    it('should reject when options.target is missing', async () =>
      await expectOptionsError(null, optionsHandler.validateTransformation)
    );

    it('should resolve transformation correctly from valid origin and target', async () => {
      const options = {
        origin: Constants.YAML,
        target: Constants.JS,
      };
      const results = await optionsHandler.validateTransformation(options);
      expect(results).toHaveLength(2);
      expect(results[0]).toBe(options);
      expect(results[1]).toBe(Constants.YAML + '2' + Constants.JS);
    });

    it('should reject with Error due to invalid target', async () => {
      const invalidOptions = {
        origin: Constants.YAML,
        target: 'INVALID_TARGET',
      };
      await expectOptionsError(invalidOptions, optionsHandler.validateTransformation);
    });
  });

  describe('Testing OptionsHandler.completeOptions(...)', () => {
    it('should reject when options is missing', async () =>
      await expectOptionsError(null, optionsHandler.completeOptions)
    );

    it('should resolve options.src/origin and options.dest/target with default values (' + Constants.DEFAULT_ORIGIN
      + '/' + Constants.DEFAULT_TARGET + ')', async () => {
      const PATH_WITH_INVALID_EXT = 'PATH_WITH_INVALID.EXT';
      const options = {
        src: PATH_WITH_INVALID_EXT,
        dest: PATH_WITH_INVALID_EXT,
      };
      const resultOptions = await optionsHandler.completeOptions(options);
      expect(resultOptions.origin).toBe(Constants.DEFAULT_ORIGIN);
      expect(resultOptions.target).toBe(Constants.DEFAULT_TARGET);
      expect(resultOptions.dest).toBe(PATH_WITH_INVALID_EXT);
      expect(resultOptions.indent).toBe(Constants.DEFAULT_INDENT);
      expect(resultOptions.force).toBe(Constants.DEFAULT_FORCE_FILE_OVERWRITE);
    });

    it('should resolve options.force should result to ' + !Constants.DEFAULT_FORCE_FILE_OVERWRITE, async () => {
      const PATH_WITH_INVALID_EXT = 'PATH_WITH_INVALID.EXT';
      const force = !Constants.DEFAULT_FORCE_FILE_OVERWRITE;
      const options = {
        src: PATH_WITH_INVALID_EXT,
        dest: PATH_WITH_INVALID_EXT,
        force,
      };
      const resultOptions = await optionsHandler.completeOptions(options);
      expect(resultOptions.origin).toBe(Constants.DEFAULT_ORIGIN);
      expect(resultOptions.target).toBe(Constants.DEFAULT_TARGET);
      expect(resultOptions.dest).toBe(PATH_WITH_INVALID_EXT);
      expect(resultOptions.indent).toBe(Constants.DEFAULT_INDENT);
      expect(resultOptions.force).toBe(force);
    });
  });

  describe('Testing OptionsHandler.ensureIndent(...)', () => {
    it('should reject when options is missing', async () =>
      await expectOptionsError(null, optionsHandler.ensureIndent)
    );

    it('should set default indent if indent is missing', async () => {
      const resultOptions = await optionsHandler.ensureIndent({});
      expect(resultOptions.indent).toBeDefined();
      expect(resultOptions.indent).toBe(Constants.DEFAULT_INDENT);
    });

    it('should set default indent if indent < minimum indent', async () => {
      const options = {
        indent: (Constants.MIN_INDENT - 1),
        target: Constants.YAML,
      };
      const resultOptions = await optionsHandler.ensureIndent(options);
      expect(resultOptions.target).toBe(Constants.YAML);
      expect(resultOptions.indent).toBeDefined();
      expect(resultOptions.indent).toBe(Constants.DEFAULT_INDENT);
    });

    it('should set default indent if indent <  JS/JSON minimum indent', async () => {
      const resultOptions = await optionsHandler.ensureIndent({ indent: Constants.MIN_INDENT - 1 });
      expect(resultOptions.indent).toBeDefined();
      expect(resultOptions.indent).toBe(Constants.DEFAULT_INDENT);
    });

    it('should set default indent if indent > than maximum indent', async () => {
      const resultOptions = await optionsHandler.ensureIndent({ indent: Constants.MAX_INDENT + 1 });
      expect(resultOptions.indent).toBeDefined();
      expect(resultOptions.indent).toBe(Constants.DEFAULT_INDENT);
    });
  });

  describe('Testing OptionsHandler.assertOrigin(...)', () => {
    it('should reject when options is missing', async () =>
      await expectOptionsError(null, optionsHandler.assertOrigin)
    );

    it('should resolve options.origin for valid type YAML', async () => {
      const options = { origin: Constants.YAML };
      const resultOptions = await optionsHandler.assertOrigin(options);
      expect(resultOptions.origin).toBeDefined();
      expect(resultOptions.origin).toBe(Constants.YAML, 'result origin should have type ' + Constants.YAML);
    });

    it('should resolve options.origin for valid type JS', async () => {
      const resultOptions = await optionsHandler.assertOrigin({ origin: Constants.JS });
      expect(resultOptions.origin).toBeDefined();
      expect(resultOptions.origin).toBe(Constants.JS);
    });

    it('should resolve options.origin for valid type JSON', async () => {
      const resultOptions = await optionsHandler.assertOrigin({ origin: Constants.JSON });
      expect(resultOptions.origin).toBeDefined();
      expect(resultOptions.origin).toBe(Constants.JSON);
    });

    it('should reject when options.origin is invalid type', async () =>
      await expectOptionsError({ origin: 'INVALID_TYPE' }, optionsHandler.assertOrigin)
    );
  });

  describe('Testing OptionsHandler.assertTarget(...)', () => {
    it('should reject when options is missing', async () =>
      await expectOptionsError(null, optionsHandler.assertTarget)
    );

    it('should resolve options.target for valid type YAML', async () => {
      const resultOptions = await optionsHandler.assertTarget({ target: Constants.YAML });
      expect(resultOptions.target).toBeDefined();
      expect(resultOptions.target).toBe(Constants.YAML);
    });

    it('should resolve options.target for valid type JS', async () => {
      const resultOptions = await optionsHandler.assertTarget({ target: Constants.JS });
      expect(resultOptions.target).toBeDefined();
      expect(resultOptions.target).toBe(Constants.JS);
    });

    it('should resolve options.target for valid type JSON', async () => {
      const resultOptions = await optionsHandler.assertTarget({ target: Constants.JSON });
      expect(resultOptions.target).toBeDefined();
      expect(resultOptions.target).toBe(Constants.JSON);
    });

    it('should reject when options.target is invalid type', async () =>
      await expectOptionsError({ origin: 'INVALID_TYPE' }, optionsHandler.assertTarget)
    );
  });

  describe('Testing OptionsHandler.ensureDest(...)', () => {
    it('should reject when options is missing', async () =>
      await expectOptionsError(null, optionsHandler.ensureDest)
    );

    it('should reject when options.src is stream but options.target is missing', async () =>
      await expectOptionsError({ dest: new stream.Writable() }, optionsHandler.ensureDest)
    );

    it('should resolve options.dest with value \'' + Constants.DEFAULT_OPTIONS.dest + '\' to relative file path to '
      + Constants.YAML + ' file', async () => {
      const fileBaseName = 'test';
      const options = {
        src: fileBaseName + '.' + Constants.JS,
        dest: Constants.DEFAULT_OPTIONS.dest,
        target: Constants.YAML
      };
      const resultOptions = await optionsHandler.ensureDest(options);
      expect(resultOptions.dest).toBeDefined();
      expect(resultOptions.dest).toBe(fileBaseName + '.' + Constants.YAML);
    });

    it('should resolve options.dest with value \'' + Constants.DEFAULT_OPTIONS.dest + '\' to relative file path to '
      + Constants.JS + ' file', async () => {
      const fileBaseName = 'test';
      const options = {
        src: fileBaseName + '.' + Constants.YAML,
        dest: Constants.DEFAULT_OPTIONS.dest,
        target: Constants.JS
      };
      const resultOptions = await optionsHandler.ensureDest(options);
      expect(resultOptions.dest).toBeDefined();
      expect(resultOptions.dest).toBe(fileBaseName + '.' + Constants.JS);
    });

    it('should resolve options.dest with value \'' + Constants.DEFAULT_OPTIONS.dest + '\' to relative file path to '
      + Constants.JSON + ' file', async () => {
      const fileBaseName = 'test';
      const options = {
        src: fileBaseName + '.' + Constants.YAML,
        dest: Constants.DEFAULT_OPTIONS.dest,
        target: Constants.JSON
      };
      const resultOptions = await optionsHandler.ensureDest(options);
      expect(resultOptions.dest).toBeDefined();
      expect(resultOptions.dest).toBe(fileBaseName + '.' + Constants.JSON);
    });

    it('should reject options.dest when invalid target type is provided', async () => {
      const options = {
        src: 'test.' + Constants.YAML,
        dest: Constants.DEFAULT_OPTIONS.dest,
        target: 'INVALID_TARGET'
      };
      await expectOptionsError(options, optionsHandler.ensureDest);
    });

    it('should reject when Writable is given but not target', async () =>
      await expectOptionsError({ dest: fs.createWriteStream(OPTIONSHANDLER_TEST_BASE_DIR + '/myOutput.txt') },
        optionsHandler.ensureDest)
    );

    it('should resolve original options.dest', async () => {
      const destObj = {};
      const resultOptions = await optionsHandler.ensureDest({ dest: destObj });
      expect(resultOptions.dest).toBeDefined();
      expect(resultOptions.dest).toBe(destObj);
    });

    it('should resolve with undefined for options.dest', async () => {
      const resultOptions = await optionsHandler.ensureDest({});
      expect(resultOptions.dest).toBeUndefined();
    });
  });

  describe('Testing OptionsHandler.ensureSrc(...)', () => {
    it('should reject when options is missing', async () =>
      await expectOptionsError(null, optionsHandler.ensureSrc, TypeError) // TODO check if this really TypeError!?!
    );

    it('should reject when options.src is not given', async () =>
      await expectOptionsError({}, optionsHandler.ensureSrc)
    );

    it('should resolve original options.src', async () => {
      const existingFile = path.resolve('./test/data/test-file.yaml');
      const resultOptions = await optionsHandler.ensureSrc({ src: existingFile });
      expect(resultOptions.src).toBeDefined();
      expect(resultOptions.src).toBe(existingFile);
    });

    it('should reject when options.src has value of not existing file', async () =>
      // HINT: this gives no Error type but plain object:
      // {"errno":-2,"code":"ENOENT","syscall":"stat","path":"NON_EXISTING_FILE"}
      await expectOptionsError({ src: 'NON_EXISTING_FILE' }, optionsHandler.ensureSrc)
    );

    it('should reject when options.src is a directory', async () =>
      await expectOptionsError({ src: './test/data' }, optionsHandler.ensureSrc)
    );

    it('should reject when Readable is given but not origin', async () =>
      await expectOptionsError({ src: fs.createReadStream('./test/data/readable-test-dummy.txt') },
        optionsHandler.ensureSrc)
    );

    it('should resolve original options.src Readable', async () => {
      const readable = fs.createReadStream('./test/data/readable-test-dummy.txt');
      const options = {
        src: readable,
        origin: Constants.JSON
      };
      const resultOptions = await optionsHandler.ensureSrc(options);
      expect(resultOptions.src).toBeDefined();
      expect(resultOptions.src).toBe(readable);
    });

    it('should resolve original options.src object', async () => {
      const srcObj = {};
      const resultOptions = await optionsHandler.ensureSrc({ src: srcObj });
      expect(resultOptions.src).toBeDefined();
      expect(resultOptions.src).toBe(srcObj);
    });
  });
});
