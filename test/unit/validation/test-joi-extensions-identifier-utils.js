import { isValidEs6Identifier } from '../../../src/validation/joi-extensions-identifier-utils';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../../helper-constants';

/**
 * @module jy-transform:unit-test:test-joi-extensions-identifier-utils
 * @description This unit test suite checks validity and correctness of ES6 identifiers.
 * @private
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - joi-extensions-identifier-helper - ', () => {
  const nonStringIdentifier = {};
  it('should validate non-string identifier \'' + JSON.toString(nonStringIdentifier) + '\' to false', () =>
    expect(isValidEs6Identifier(nonStringIdentifier)).toBe(false)
  );

  const invalidIdentifier = '#3/-';
  it('should validate invalid identifier \'' + invalidIdentifier + '\' to false', () =>
    expect(isValidEs6Identifier(invalidIdentifier)).toBe(false)
  );

  const validIdentifier = 'bar';
  it('should validate \'' + validIdentifier + '\' identifier to true', () =>
    expect(isValidEs6Identifier(validIdentifier)).toBe(true)
  );
});
