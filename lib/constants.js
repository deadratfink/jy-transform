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
 * The minimum file indention (0 SPACE).
 *
 * @type {number}
 * @constant
 * @public
 */
Constants.prototype.MIN_INDENT = 0;

/**
 * The maximum file indention (8 SPACEs).
 *
 * @type {number}
 * @constant
 * @public
 */
Constants.prototype.MAX_INDENT = 8;

/**
 * The default `origin` value: 'yaml'.
 *
 * @type {string}
 * @public
 */
Constants.prototype.DEFAULT_ORIGIN = constants.YAML;

/**
 * The default `origin` value: 'js'.
 *
 * @type {string}
 * @public
 */
Constants.prototype.DEFAULT_TARGET = constants.JS;

/**
 * Whether to overwrite existing file or object on output.
 *
 * @type {boolean}
 * @public
 */
Constants.prototype.DEFAULT_FORCE_FILE_OVERWRITE = false;

/**
 * The `origin` description value.
 *
 * @type {string}
 * @public
 */
Constants.prototype.ORIGIN_DESCRIPTION = ': if not given, the type is tried to be inferred from the extension of source path, else it is \'' + constants.DEFAULT_ORIGIN + '\'';

/**
 * The `target` description value.
 *
 * @type {string}
 * @public
 */
Constants.prototype.TARGET_DESCRIPTION = ': if not given, the type is tried to be inferred from the extension of destination path, else it is \'' + constants.DEFAULT_TARGET + '\'';

/**
 * The `dest` description value.
 *
 * @type {string}
 * @public
 */
Constants.prototype.DEST_DESCRIPTION = 'storing relative to input file';

/**
 * The `src` exports identifier value to read.
 *
 * @type {string}
 * @public
 * @example
 * module.exports.foo = {...}; // here 'foo' is the identifier for an object to read from the source!
 */
Constants.prototype.DEFAULT_JS_IMPORTS_IDENTIFIER = undefined;

/**
 * The `dest` exports identifier value to write.
 *
 * @type {string}
 * @public
 */
Constants.prototype.DEFAULT_JS_EXPORTS_IDENTIFIER = undefined;

/**
 * The default options.
 *
 * @constant
 * @namespace
 * @property {string} origin=yaml                   - The default origin type.
 * @property {string} target=js                     - The default target type.
 * @property {string} dest=relative_to_input_file   - The default dest description.
 * @property {number} indent=4                      - The default indention for files.
 * @property {boolean} force=false                  - Whether to overwrite existing file on output.
 * @property {string} imports=undefined             - The exports name for reading from JS source file or objects only.
 * @property {string} exports=undefined             - The exports name for usage in JS file or object only.
 * @see {@link Constants#ORIGIN_DESCRIPTION}
 * @see {@link Constants#TARGET_DESCRIPTION}
 * @see {@link Constants#DEST_DESCRIPTION}
 */
Constants.prototype.DEFAULT_OPTIONS = {
    origin:  constants.ORIGIN_DESCRIPTION,
    target:  constants.TARGET_DESCRIPTION,
    dest:    constants.DEST_DESCRIPTION,
    indent:  constants.DEFAULT_INDENT,
    force:   constants.DEFAULT_FORCE_FILE_OVERWRITE,
    imports: constants.DEFAULT_JS_IMPORTS_IDENTIFIER,
    exports: constants.DEFAULT_JS_EXPORTS_IDENTIFIER
};

/**
 * The transformation direction YAML => JS.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.YAML_TO_JS = 'yaml2js';

/**
 * The transformation direction YAML => JSON.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.YAML_TO_JSON = 'yaml2json';

/**
 * The transformation direction JS => YAML.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JS_TO_YAML = 'js2yaml';

/**
 * The transformation direction JSON => YAML.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JSON_TO_YAML = 'json2yaml';

/**
 * The transformation direction JSON => JS.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JSON_TO_JS = 'json2js';

/**
 * The transformation direction JS => JSON.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JS_TO_JSON = 'js2json';

/**
 * The transformation direction YAML => YAML.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.YAML_TO_YAML = 'yaml2yaml';

/**
 * The transformation direction JSON => JSON.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JSON_TO_JSON = 'json2json';

/**
 * The transformation direction JS => JS.
 *
 * @type {string}
 * @constant
 * @public
 */
Constants.prototype.JS_TO_JS = 'js2js';

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
