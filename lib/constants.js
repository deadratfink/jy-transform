'use strict';

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the constants.
 *
 * @returns {Constants} The instance.
 * @constructor
 * @class Class which defines all used constants.
 */
var Constants = function () {
    return this;
};

Constants.prototype.constructor = Constants;
var constants = new Constants();
module.exports = constants;

///////////////////////////////////////////////////////////////////////////////
// CONSTANTS
///////////////////////////////////////////////////////////////////////////////

/**
 * The 'yaml' type constant.
 * @type {string}
 */
Constants.prototype.YAML = 'yaml';

/**
 * The 'json' type constant.
 *
 * @type {string}
 */
Constants.prototype.JSON = 'json';

/**
 * The 'js' type constant.
 *
 * @type {string}
 */
Constants.prototype.JS = 'js';

/**
 * The type constants assembled in an array: <tt>[ 'yaml', 'json', 'js' ]</tt>
 * @type {string[]}
 */
Constants.prototype.TYPES = [ constants.YAML, constants.JSON, constants.JS ];

/**
 * The default options.
 *
 * @property {string}  origin - The default origin type: 'yaml'.
 * @property {string}  target - The default target type: 'js'.
 * @property {string}  dest   - The default dest description: 'relative to input file.'.
 * @property {number}  indent - The default indention for files: 4.
 */
Constants.prototype.DEFAULT_OPTIONS = {
    origin: constants.YAML,
    target: constants.JS,
    dest: 'relative to input file.',
    indent:  4
};
