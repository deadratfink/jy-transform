'use strict';

/**
 * Constructs the constants.
 *
 * @returns {Constants} the instance
 * @constructor
 */
var Constants = function () {
    return this;
};
Constants.prototype.constructor = Constants;

/**
 * The 'yaml' type constant.
 * @type {string}
 */
Constants.prototype.YAML = 'yaml';

/**
 * The 'json' type constant.
 * @type {string}
 */
Constants.prototype.JSON = 'json';

/**
 * The 'js' type constant.
 * @type {string}
 */
Constants.prototype.JS = 'js';

/**
 * The type constants.
 * @type {string[]}
 */
Constants.prototype.TYPES = [ this.YAML, this.JSON, this.JS ];

/**
 * The default options.
 *
 * @type {{target: string, src: null, dest: string, indent: number}}
 */
Constants.prototype.DEFAULT_OPTIONS = {
    target: this.JS,
    src: null,
    dest: 'relative to input file.',
    indent:  4
};

module.exports = new Constants();
