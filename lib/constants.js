'use strict';

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the constants.
 *
 * @returns {Constants} - The instance.
 * @constructor
 * @class Class which defines all constants usable in or with this module.
 */
function Constants() {
    return this;
}

Constants.prototype = {};
Constants.prototype.constructor = Constants;
var constants = new Constants();
module.exports = constants;

///////////////////////////////////////////////////////////////////////////////
// CONSTANTS
///////////////////////////////////////////////////////////////////////////////

/**
 * The 'utf8' constant.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.UTF8 = 'utf8';

/**
 * The 'yaml' type constant.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.YAML = 'yaml';

/**
 * The 'json' type constant.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JSON = 'json';

/**
 * The 'js' type constant.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JS = 'js';

/**
 * The type constants assembled in an array: `[ 'yaml', 'json', 'js' ]`.
 *
 * @type {string[]}
 * @constant
 * @public
 */
Constants.prototype.TYPES = [ constants.YAML, constants.JSON, constants.JS ];

/**
 * The default file indention (4 SPACEs).
 *
 * @type {number}
 * @constant
 * @public
 */
Constants.prototype.DEFAULT_INDENT = 4;

/**
 * The minimum JSON/JS file indention (0 SPACE).
 *
 * @type {number}
 * @constant
 * @public
 */
Constants.prototype.MIN_JSON_JS_INDENT = 0;

/**
 * The minimum YAML file indention (1 SPACE).
 *
 * @type {number}
 * @constant
 * @public
 */
Constants.prototype.MIN_YAML_INDENT = 1;

/**
 * The maximum file indention (8 SPACEs).
 *
 * @type {number}
 * @constant
 * @public
 */
Constants.prototype.MAX_INDENT = 8;

Constants.prototype.ORIGIN_DEFAULT = ': if not given, the type is tried to be inferred from the extension of input path, else it is ' + constants.YAML;

Constants.prototype.TARGET_DEFAULT = ': if not given, the type is tried to be inferred from the extension of output path, else it is ' + constants.JS;

/**
 * The default options.
 *
 * @constant
 * @namespace
 * @property {string} origin - The default origin type: 'yaml'.
 * @property {string} target - The default target type: 'js'.
 * @property {string} dest   - The default dest description: 'relative to input file'.
 * @property {number} indent - The default indention for files: 4.
 */
Constants.prototype.DEFAULT_OPTIONS = {
    origin: constants.ORIGIN_DEFAULT,
    target: constants.TARGET_DEFAULT,
    dest: 'relative to input file',
    indent:  constants.DEFAULT_INDENT
};

/**
 * The transformation direction YAML -> JS.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.YAML_TO_JS = "yaml2js";

/**
 * The transformation direction YAML -> JSON.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.YAML_TO_JSON = "yaml2json";

/**
 * The transformation direction JS -> YAML.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JS_TO_YAML = "js2yaml";

/**
 * The transformation direction JSON -> YAML.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JSON_TO_YAML = "json2yaml";

/**
 * The transformation direction JSON -> JS.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JSON_TO_JS = "json2js";

/**
 * The transformation direction JS -> JSON.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JS_TO_JSON = "js2json";

/**
 * The transformation direction YAML -> YAML.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.YAML_TO_YAML = "yaml2yaml";

/**
 * The transformation direction JSON -> JSON.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JSON_TO_JSON = "json2json";

/**
 * The transformation direction JS -> JS.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JS_TO_JS = "js2js";

/**
 * The transformation directions.
 *
 * @type {string[]}
 * @constant
 * @public
 */
Constants.prototype.TRANSFORMATIONS = [
    constants.YAML_TO_JS,
    constants.YAML_TO_JSON,
    constants.JS_TO_YAML,
    constants.JSON_TO_YAML,
    constants.JSON_TO_JS,
    constants.JS_TO_JSON,
    constants.YAML_TO_YAML,
    constants.JSON_TO_JSON,
    constants.JS_TO_JS
];
