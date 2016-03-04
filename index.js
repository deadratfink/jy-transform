#!/usr/bin/env node
'use strict';

var constants = require('./lib/constants.js');
var Transformer = require('./lib/transformer.js');
var cli = require('cli');

cli.setUsage('jyt [OPTIONS]');
cli.setApp('./package.json');
cli.enable('version', 'status', 'timeout');
cli.parse({
    target: ['t', 'The conversion target: [ ' + constants.JS + ' | ' + constants.JSON + ' | ' + constants.YAML + ' ]', 'string', constants.DEFAULT_OPTIONS.target ],
    src:    ['s', 'The absolute/relative input file path', 'path'],
    dest:   ['d', 'The absolute/relative output file path', 'path', constants.DEFAULT_OPTIONS.dest],
    indent: ['i', 'The indention for pretty print (0 - 8)', 'int', constants.DEFAULT_OPTIONS.indent]
});

/**
 * Fatal CLI printing.
 *
 * @param msg {string} the message to print
 * @private
 */
function fatal(msg) {
    cli.error('////////////////////////////////////////////////////////////////////////////////');
    cli.error(msg);
    cli.error('////////////////////////////////////////////////////////////////////////////////');
    cli.getUsage(1);
    cli.fatal('Process exit 1');
}

cli.main(function(args, options) {
    var converter = new Transformer(options, cli);

    if (options.target === constants.YAML) {
        return converter.jsToYaml()
            .then(function (msg){
                cli.info(msg);
            })
            .catch(function (err) {
                fatal(err.stack);
            });
    } else {
        return converter.yamlToJs()
            .then(function (msg){
                cli.info(msg);
            })
            .catch(function (err) {
                fatal(err.stack);
            });
    }
});

module.exports = Transformer;
