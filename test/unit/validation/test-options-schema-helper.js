import stringify from 'json-stringify-safe';
import stream from 'stream';
import {
  inferOriginDefaultFromFilePath,
  inferTargetDefaultFromFilePath,
} from '../../../src/validation/options-schema-helper';
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
 * @module jy-transform:unit-test:test-options-schema-helper
 * @description This unit test suite checks the validity and correctness of options schema helper methods.
 * @private
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - options-schema-helper - ', () => {
  describe('Method isExistingFile(pathStr) ', () => {
    it('should return true on relative path string with existing file', () =>
      expect(inferOriginDefaultFromFilePath('test/unit/validation/test-joi-extensions-file-helper.js')).toBeTruthy()
    );
  });
});
