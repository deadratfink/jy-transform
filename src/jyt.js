import path from 'path';
import cli from 'cli';
import { DEFAULT_INDENT, DEFAULT_OPTIONS, TYPE_JS, TYPE_JSON, TYPE_YAML } from './constants';
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
const usage = path.basename(__filename) + ' INPUT-FILE [OUTPUT-FILE] [OPTIONS]';

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
const options = {
  origin: [
    'o', 'The origin type of INPUT-FILE: [ ' + TYPE_JS + ' | ' + TYPE_JSON + ' | ' + TYPE_YAML
    + ' ]', 'string', DEFAULT_OPTIONS.origin],
  target: [
    't', 'The target type of OUTPUT-FILE: [ ' + TYPE_JS + ' | ' + TYPE_JSON + ' | ' + TYPE_YAML
    + ' ]', 'string', DEFAULT_OPTIONS.target],
  indent: ['i', 'The indention for pretty-print: 1 - 8', 'int', DEFAULT_INDENT],
  force: [
    'f', 'Force overwriting of existing output files on write phase: when files are not overwritten (which' +
    ' is default), then the next transformation with same output file name gets a consecutive number on the base' +
    ' file name, e.g. in case of foo.yaml it would be foo(1).yaml'],
  imports: [
    'm', 'Define a \'module.exports[.identifier] = \' identifier (to read from JS _source_ file only, must' +
    ' be a valid JS identifier!)', 'string', DEFAULT_OPTIONS.imports],
  exports: [
    'x', 'Define a \'module.exports[.identifier] = \' identifier (for usage in JS destination file only,' +
    ' must be a valid JS identifier!)', 'string', DEFAULT_OPTIONS.exports]
};

/**
 * Prints the error to console and exit with 1.
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
 * @param {module:type-definitions~Options} cliOptions - The options provided via CLI.
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

  // transform with options

  return transform(cliOptions)
    .then(msg => cli.info(msg))
    .catch(err => error(err));
}

/*
 * Init the CLI instance.
 */
cli.width = 120;
cli.setUsage(usage);
cli.setApp(packagePath);
cli.enable('version', 'status', 'timeout');
cli.parse(options);
cli.main(main);
