/**
 * @module jy-transform:constants
 * @description Useful constants used for the module and its usage.
 * @private
 */

/**
 * The 'utf8' constant.
 *
 * @type {string}
 * @constant
 * @private
 */
export const UTF8 = 'utf8';

/**
 * The 'yaml' type constant.
 *
 * @type {string}
 * @constant
 * @public
 */
export const TYPE_YAML = 'yaml';

/**
 * The 'json' type constant.
 * @type {string}
 * @constant
 * @public
 */
export const TYPE_JSON = 'json';

/**
 * The 'js' type constant.
 * @type {string}
 * @constant
 * @public
 */
export const TYPE_JS = 'js';

/**
 * A map for extensions to type.
 *
 * @type {{yml: string, yaml: string, js: string, json: string}}
 * @private
 */
export const TYPE_MAP = {
  yml: TYPE_YAML,
  yaml: TYPE_YAML,
  js: TYPE_JS,
  json: TYPE_JSON
};

/**
 * The default file indention (4 SPACEs).
 * @type {number}
 * @constant
 * @private
 */
export const DEFAULT_INDENT = 2;

/**
 * The minimum file indention (0 SPACE).
 * @type {number}
 * @constant
 * @private
 */
export const MIN_INDENT = 0;

/**
 * The maximum file indention (8 SPACEs).
 * @type {number}
 * @constant
 * @private
 */
export const MAX_INDENT = 8;

/**
 * The default `origin` value: 'yaml'.
 * @type {string}
 * @constant
 * @private
 */
export const DEFAULT_ORIGIN = TYPE_YAML;

/**
 * The default `origin` value: 'js'.
 * @type {string}
 * @constant
 * @private
 */
export const DEFAULT_TARGET = TYPE_JS;

/**
 * Whether to overwrite existing file or object on output.
 * @type {boolean}
 * @constant
 * @private
 */
export const DEFAULT_FORCE_FILE_OVERWRITE = false;

/**
 * The `origin` description value.
 * @type {string}
 * @constant
 * @private
 */
export const ORIGIN_DESCRIPTION = 'if not given, the type is tried to be inferred from the extension of source path, ' +
  'else it is \'' + DEFAULT_ORIGIN + '\'';

/**
 * The `target` description value.
 * @type {string}
 * @constant
 * @private
 */
export const TARGET_DESCRIPTION = 'if not given, the type is tried to be inferred from the extension of destination' +
  ' path, else it is \'' + DEFAULT_TARGET + '\'';

/**
 * The `dest` description value.
 * @type {string}
 * @constant
 * @private
 */
export const DEST_DESCRIPTION = 'storing relative to input file';

/**
 * The `src` exports identifier value to read.
 * @type {string}
 * @private
 * @constant
 * @example
 * module.exports.foo = {...}; // here 'foo' is the identifier for an object to read from the source!
 */
export const DEFAULT_JS_IMPORTS_IDENTIFIER = undefined;

/**
 * The `dest` exports identifier value to write.
 * @type {string}
 * @private
 * @constant
 */
export const DEFAULT_JS_EXPORTS_IDENTIFIER = undefined;

/**
 * The default options.
 * @constant
 * @namespace
 * @property {string} origin=yaml                   - The default origin type.
 * @property {string} target=js                     - The default target type.
 * @property {string} dest=relative_to_input_file   - The default dest description.
 * @property {number} indent=4                      - The default indention for files.
 * @property {boolean} force=false                  - Whether to overwrite existing file on output.
 * @property {string} imports=undefined             - The exports name for reading from JS source file or objects only.
 * @property {string} exports=undefined             - The exports name for usage in JS file or object only.
 * @see {@link ORIGIN_DESCRIPTION}
 * @see {@link TARGET_DESCRIPTION}
 * @see {@link DEST_DESCRIPTION}
 * @private
 */
export const DEFAULT_OPTIONS = {
  origin: ORIGIN_DESCRIPTION,
  target: TARGET_DESCRIPTION,
  dest: DEST_DESCRIPTION,
  indent: DEFAULT_INDENT,
  force: DEFAULT_FORCE_FILE_OVERWRITE,
  imports: DEFAULT_JS_IMPORTS_IDENTIFIER,
  exports: DEFAULT_JS_EXPORTS_IDENTIFIER,
};
