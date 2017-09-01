import { TEST_SUITE_DESCRIPTION_UNIT } from '../../helper-constants';
import { isExistingFile } from '../../../src/validation/joi-extensions-file-utils';

/**
 * @module jy-transform:test-unit:test-joi-extension-file-utils
 * @description This unit test module tests validation FS helper method.
 * @private
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - joi-extensions-file-utils - ', () => {
  describe('Method isExistingFile(pathStr) ', () => {
    it('should return true on relative path string with existing file', () =>
      expect(isExistingFile('test/unit/validation/test-joi-extensions-file-utils.js')).toBe(true)
    );

    it('should return true on relative path string with existing file starting with \'./\'', () =>
      expect(isExistingFile('./test/unit/validation/test-joi-extensions-file-utils.js')).toBe(true)
    );

    it('should return false on incorrect path string with non-existing file', () =>
      expect(isExistingFile('/foo/bar/non-exist.html')).toBe(false)
    );

    it('should return false on existing directory path string', () =>
      expect(isExistingFile('./test')).toBe(false)
    );
  });
});
