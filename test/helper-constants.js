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


export default {
  TEST_SUITE_DESCRIPTION_UNIT,
  TEST_SUITE_DESCRIPTION_FUNCTIONAL,
};
