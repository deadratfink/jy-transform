import stream from 'stream';
import fs from 'fs';
import {
  inferOriginDefault,
  inferTargetDefault,
} from '../../../src/validation/options-schema-helper';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../../helper-constants';
import {
  TYPE_YAML,
  TYPE_JS,
  DEFAULT_ORIGIN,
  DEFAULT_TARGET,
} from '../../../src/constants';

/**
 * @module jy-transform:unit-test:test-options-schema-helper
 * @description This unit test suite checks the validity and correctness of options schema helper methods.
 * @private
 */

// TODO write all tests
describe(TEST_SUITE_DESCRIPTION_UNIT + ' - options-schema-helper - ', () => {
  describe('Function inferOriginDefault', () => {
    it('should infer the correct origin from relative path string with existing file having a known file type', () =>
      expect(inferOriginDefault({
        src: 'test/unit/validation/test-joi-extensions-file-helper.js'
      })).toBe(TYPE_JS)
    );

    it('should infer the default origin from relative path string with existing file having an unknown file type', () =>
      expect(inferOriginDefault({
        src: 'test/data/readable-test-dummy.txt'
      })).toBe(DEFAULT_ORIGIN)
    );

    it('should infer the correct origin from read stream of existing file having a known file ending', () =>
      expect(inferOriginDefault({
        src: fs.createReadStream('test/unit/validation/test-joi-extensions-file-helper.js'),
      })).toBe(TYPE_JS)
    );

    it('should infer the correct origin from read stream of existing file having an unknown file ending', () =>
      expect(inferOriginDefault({
        src: fs.createReadStream('test/data/readable-test-dummy.txt'),
      })).toBe(DEFAULT_ORIGIN)
    );

    it('should infer the correct origin from plain read stream', () =>
      expect(inferOriginDefault({
        src: new stream.Readable(),
      })).toBe(DEFAULT_ORIGIN)
    );

    it('should infer the default origin from unsupported origin.src', () =>
      expect(inferOriginDefault({
        src: {},
      })).toBe(DEFAULT_ORIGIN)
    );
  });

  describe('Function inferTargetDefault', () => {
    it('should infer the correct target from relative path string with existing file having a known file ending', () =>
      expect(inferTargetDefault({
        dest: 'test/unit/validation/test-joi-extensions-file-helper.yaml'
      })).toBe(TYPE_YAML)
    );

    it('should infer the default target from relative path string with existing file having an unknown file type', () =>
      expect(inferTargetDefault({
        dest: 'test/data/readable-test-dummy.txt'
      })).toBe(DEFAULT_TARGET)
    );

    it('should infer the correct target from relative path string with existing file having a known file type', () =>
      expect(inferTargetDefault({
        dest: fs.createWriteStream('test/data/writable-test-dummy.yaml'),
      })).toBe(TYPE_YAML)
    );

    it('should infer the default target from relative path string with existing file having an unknown file type', () =>
      expect(inferTargetDefault({
        dest: fs.createWriteStream('test/data/writable-test-dummy.txt'),
      })).toBe(DEFAULT_TARGET)
    );

    it('should infer the correct origin from plain write stream', () =>
      expect(inferTargetDefault({
        dest: new stream.Writable(),
      })).toBe(DEFAULT_TARGET)
    );

    it('should infer the default target from unsupported origin.dest', () =>
      expect(inferTargetDefault({
        dest: {},
      })).toBe(DEFAULT_TARGET)
    );
  });
});
