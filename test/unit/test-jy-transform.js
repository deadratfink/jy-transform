import { transform, read, write, TYPE_YAML, TYPE_JS, TYPE_JSON } from '../../src/jy-transform';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';

/**
 * @module jy-transform:test-unit:jy-transform
 * @description This unit test module tests the correct exporting from _./src/jy-transform.js_.
 * @private
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - jy-transform - ', () => {
  describe('Exports Check Unit Tests', () => {
    describe('Exported transform', () =>
      it('should be an existing function', () => {
        expect.assertions(2);
        expect(transform).toBeDefined();
        expect(transform).toBeInstanceOf(Function);
      })
    );

    describe('Exported read', () =>
      it('should be an existing function', () => {
        expect.assertions(2);
        expect(read).toBeDefined();
        expect(read).toBeInstanceOf(Function);
      })
    );

    describe('Exported write', () =>
      it('should be an existing function', () => {
        expect.assertions(2);
        expect(write).toBeDefined();
        expect(write).toBeInstanceOf(Function);
      })
    );

    describe('Exported constants', () =>
      it('should be existing string values', () => {
        expect.assertions(6);
        expect(TYPE_YAML).toBeDefined();
        expect(TYPE_YAML).toBe('yaml');
        expect(TYPE_JS).toBeDefined();
        expect(TYPE_JS).toBe('js');
        expect(TYPE_JSON).toBeDefined();
        expect(TYPE_JSON).toBe('json');
      })
    );
  });
});
