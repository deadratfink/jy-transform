// eslint-disable-next-line
import chalk from 'chalk';
import Package from '../package.json';

/**
 * @module jy-transform:unit:helper-constants
 * @description The test suite constants definitions.
 * @type {Object}
 * @private
 */

/**
 * The unit test suite description for the plugin.
 * @type {string}
 * @constant
 * @public
 */
export const TEST_SUITE_DESCRIPTION_UNIT = chalk.inverse(
  'The ' + chalk.bold(Package.name) + chalk.blue(' UNIT ') + 'Test Suite'
);

/**
 * The unit test suite description for the plugin.
 * @type {string}
 * @constant
 * @public
 */
export const TEST_SUITE_DESCRIPTION_FUNCTIONAL = chalk.inverse(
  'The ' + chalk.bold(Package.name) + chalk.blue(' FUNCTIONAL ') + 'Test Suite'
);

/**
 * The basic test data directory path.
 * @type {string}
 * @private
 */
export const TEST_DATA_DIR = './test/data';

/**
 * An expected value from source files.
 * @type {string}
 * @constant
 * @private
 */
export const EXPECTED_VALUE = 'bar';

export default {
  TEST_SUITE_DESCRIPTION_UNIT,
  TEST_SUITE_DESCRIPTION_FUNCTIONAL,
  TEST_DATA_DIR,
  EXPECTED_VALUE,
};
