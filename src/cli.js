import path from 'path';
import cli from 'cli';
import Package from '../package.json';
import {
  DEFAULT_INDENT,
  DEFAULT_FORCE_FILE_OVERWRITE,
  DEFAULT_JS_IMPORTS_IDENTIFIER,
  DEFAULT_JS_EXPORTS_IDENTIFIER,
  ORIGIN_DESCRIPTION,
  TARGET_DESCRIPTION,
  TYPE_JS,
  TYPE_JSON,
  TYPE_YAML,
  DEFAULT_STRICT,
  DEFAULT_NO_ES6,
  DEFAULT_NO_SINGLE_QUOTES,
} from './constants';
import { transform } from './transformer';

/**
 * @module jy-transform:jyt
 * @description The command line interface.
 * @private
 */

// ////////////////////////////////////////////////////////////////////////////
// CLI INIT
// ////////////////////////////////////////////////////////////////////////////

/**
 * How to use the CLI.
 *
 * @type {string}
 * @private
 */
const usage = Object.keys(Package.bin)[0] + ' INPUT-FILE [OUTPUT-FILE] [OPTIONS]';

/**
 * The path to package.json.
 *
 * @type {string}
 * @private
 */
const packagePath = path.join(__dirname, '../package.json');

/**
 * The options description for parsing the command line input, must be an object with opts defined like:
 * ```
 * long_tag: [short_tag, description, value_type, default_value];
 * ```
 * @type {{origin: Array, target: Array, src: Array, dest: Array, indent: Array, force: Array, imports: Array, exports:
 *   Array}}
 * @private
 */
const cliOptionsSchema = {
  origin: ['o', 'The origin type of INPUT-FILE: [ ' + TYPE_JS + ' | ' + TYPE_JSON + ' | ' + TYPE_YAML + ' ]',
    'string', ORIGIN_DESCRIPTION],
  target: ['t', 'The target type of OUTPUT-FILE: [ ' + TYPE_JS + ' | ' + TYPE_JSON + ' | ' + TYPE_YAML + ' ]',
    'string', TARGET_DESCRIPTION],
  indent: ['i', 'The indention for pretty-print: 1 - 8', 'int', DEFAULT_INDENT],
  force: ['f', 'Force overwriting of existing output files on write phase: when files are not overwritten (which' +
    ' is default), then the next transformation with same output file name gets a consecutive number on the base' +
    ' file name, e.g. in case of foo.yaml it would be foo(1).yaml', 'boolean', DEFAULT_FORCE_FILE_OVERWRITE],
  imports: ['m', 'Define an identifier for object (to read as "export const identifier / module.exports[.identifier]"' +
  ' from JS source file only, must be a valid JS identifier!)', 'string', DEFAULT_JS_IMPORTS_IDENTIFIER],
  exports: ['x', 'Define an identifier for object (write to "export const identifier / module.exports[.identifier]"' +
  ' in JS destination file only, must be a valid JS identifier!)', 'string', DEFAULT_JS_EXPORTS_IDENTIFIER],
  strict: ['s', 'Whether to write a "use strict;" in JS type output',
    'boolean', DEFAULT_STRICT],
  'no-es6': [false, 'Whether not to use ECMAScript6 syntax for JS type output like "module.exports" instead of ' +
    '"export default", applicable only for JS output', 'boolean', DEFAULT_NO_ES6],
  'no-single': [false, 'Whether not to use single-quotes style for values in JS type output (i.e. double-quotes)',
    'boolean', DEFAULT_NO_SINGLE_QUOTES],
};

/**
 * Prints the error to console and exits process with 1.
 *
 * @param {string|Error} err - The error to print.
 * @private
 */
function error(err) {
  cli.error('////////////////////////////////////////////////////////////////////////////////');
  cli.error(err);
  if (err.stack) {
    cli.debug(err.stack);
  }
  cli.error('////////////////////////////////////////////////////////////////////////////////\n');
  cli.getUsage(1);
}

/**
 * The main entry callback. When calling `cli.main()` this receives the `options`
 * given on CLI, then does the transformation with these options and finally, it
 * prints the result to the CLI.
 *
 * @param {Array} args     - The first mandatory argument is the input file (`args[0]`), the second (optional)
 *                           argument is the output file (`args[1]`).
 * @param {module:jy-transform:type-definitions~TransformOptions} cliOptions - The options provided via CLI.
 * @private
 */
function main(args, cliOptions) {
  // read file args and set to options

  if (args.length > 0) {
    cli.debug('input file: ' + args[0]);
    cliOptions.src = args[0];
  } else {
    error('please specify an input file as first argument!');
  }
  if (args.length > 1) {
    cli.debug('output file: ' + args[1]);
    cliOptions.dest = args[1];
  } else {
    cli.debug('output file not specified, using default');
  }

  // We have to set to undefined if the values are not given on CLI or else Joi will fail
  // because it will receive the description created in options object above!
  if (cliOptions.origin === ORIGIN_DESCRIPTION) {
    cliOptions.origin = undefined;
  }
  if (cliOptions.target === TARGET_DESCRIPTION) {
    cliOptions.target = undefined;
  }

  cli.debug('Passed options:\n' + JSON.stringify(cliOptions, null, 4));

  transform(cliOptions)
    .then(cli.info)
    .catch(error);
}

/*
 * Init the CLI instance.
 */
cli.width = 120;
cli.setUsage(usage);
cli.setApp(packagePath);
cli.enable('version', 'status', 'timeout');
cli.parse(cliOptionsSchema);
cli.main(main);
