'use strict';

var assert = require('assert');
var YAMLException = require('js-yaml/lib/js-yaml/exception.js');
var fs = require('fs');
var Writer = require('../index.js').Writer;
var logger;
var writer;

describe('Executing \'jy-transform\' project Writer test suite.', function () {

    /**
     * Init the test logger and Writer.
     */
    before(function () {
        logger = require('./logger.js');
        writer = new Writer(logger);
    });

    describe('Testing Writer.writeJs(...)', function () {

        it('should write JS to file', function (done) {
            // TODO
            done();
        });
    });

    //var writeStream = fs.createWriteStream('myOutput.txt');

});
