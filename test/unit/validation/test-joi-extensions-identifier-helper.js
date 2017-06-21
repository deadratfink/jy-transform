import { isValidEs6Identifier } from '../../../src/validation/joi-extensions-identifier-helper';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../../helper-constants';

/**
 * @module jy-transform:unit-test:test-joi-extensions-identifier-helper
 * @description This unit test suite checks validity and correctness of ES6 identifiers.
 * @private
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - joi-extensions-identifier-helper - ', () => {
  const nonStringIdentifier = {};
  it('should validate non-string identifier \'' + JSON.toString(nonStringIdentifier) + '\' to false', () =>
    expect(isValidEs6Identifier(nonStringIdentifier)).toBeFalsy()
  );

  const invalidIdentifier = '#3/-';
  it('should validate invalid identifier \'' + invalidIdentifier + '\' to false', () =>
    expect(isValidEs6Identifier(invalidIdentifier)).toBeFalsy()
  );

  const validIdentifier = 'bar';
  it('should validate \'' + validIdentifier + '\' identifier to true', () =>
    expect(isValidEs6Identifier(validIdentifier)).toBeTruthy()
  );
});
