import Validator from '../../lib/validator';
import { logger } from '../logger';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';

/**
 * @classdesc This unit test suite checks validity and correctness.
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - validator - ', () => {
  /**
   * The testee.
   * @type {Validator}
   */
  let validator;

  beforeAll(() => {
    validator = new Validator(logger);
  });

  const nonStringIdentifier = {};
  it('should validate non-string identifier \'' + JSON.toString(nonStringIdentifier) + '\' to false', () =>
    expect(validator.validateIdentifier(nonStringIdentifier)).toBeFalsy()
  );

  const invalidIdentifier = '#3/-';
  it('should validate invalid identifier \'' + invalidIdentifier + '\' to false', () =>
      expect(validator.validateIdentifier(invalidIdentifier)).toBeFalsy()
  );

  const validIdentifier = 'bar';
  it('should validate \'' + validIdentifier + '\' identifier to true', () =>
    expect(validator.validateIdentifier(validIdentifier)).toBeTruthy()
  );
});
