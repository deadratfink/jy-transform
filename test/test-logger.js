'use strict';

var assert = require('assert');
var winston = require('winston');
var fs = require('fs-extra');
var INDENT = '        ';
var TEST_TMP_DIR = './test/tmp';

var formatter = function(options) {
    // Return string will be passed to logger.
    return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
        (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
};

var winstonFileOptions = {
    filename: TEST_TMP_DIR + '/test.log',
    timestamp: function() {
        return INDENT + new Date().toISOString();
    },
    formatter: formatter,
    level: 'debug'
};

fs.ensureDirSync(TEST_TMP_DIR);
fs.emptyDirSync(TEST_TMP_DIR);

var winstonConsoleOptions = {
    timestamp: function() {
        return INDENT;
    },
    formatter: formatter,
    level: 'info'
};

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)(winstonFileOptions),
        new (winston.transports.Console)(winstonConsoleOptions)
    ]
});

logger.info('Test-logger initialized, writing to ', winstonFileOptions.filename);

module.exports = logger;
