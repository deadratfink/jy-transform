#!/usr/bin/env node
'use strict';

var constants = require('./lib/constants.js');
var Transformer = require('./lib/transformer.js');
var cli = require('cli');

///////////////////////////////////////////////////////////////////////////////
// PRIVATE
///////////////////////////////////////////////////////////////////////////////

/**
 * Fatal CLI printing.
 *
 * @param msg {string} The message to print.
 * @private
 */
function fatal(msg) {
    cli.error('////////////////////////////////////////////////////////////////////////////////');
    cli.error(msg);
    cli.error('////////////////////////////////////////////////////////////////////////////////');
    cli.getUsage(1);
    cli.fatal('Process exit 1');
}

///////////////////////////////////////////////////////////////////////////////
// CLI
///////////////////////////////////////////////////////////////////////////////

cli.setUsage('jyt [OPTIONS]');
cli.setApp('./package.json');
cli.enable('version', 'status', 'timeout');
cli.parse({
    origin: ['o', 'The conversion origin: [ ' + constants.JS + ' | ' + constants.JSON + ' | ' + constants.YAML + ' ]', 'string', constants.DEFAULT_OPTIONS.origin ],
    target: ['t', 'The conversion target: [ ' + constants.JS + ' | ' + constants.JSON + ' | ' + constants.YAML + ' ]', 'string', constants.DEFAULT_OPTIONS.target ],
    src:    ['s', 'The absolute/relative input file path', 'path'],
    dest:   ['d', 'The absolute/relative output file path', 'path', constants.DEFAULT_OPTIONS.dest],
    indent: ['i', 'The indention for pretty-print: 0 - 8', 'int', constants.DEFAULT_OPTIONS.indent],
    //prefix: ['p', 'Whether the JS should get a \'module.exports = \' prefix', 'boolean']
});
cli.main(function(args, options) {
    var transformer = new Transformer(options, cli);

    if (options.target === constants.YAML) {
        return transformer.jsToYaml()
            .then(function (msg){
                cli.info(msg);
            })
            .catch(function (err) {
                fatal(err.stack);
            });
    } else {
        return transformer.yamlToJs()
            .then(function (msg){
                cli.info(msg);
            })
            .catch(function (err) {
                fatal(err.stack);
            });
    }
});
