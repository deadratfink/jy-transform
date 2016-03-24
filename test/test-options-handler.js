'use strict';

var Constants = require('../index.js').constants;
var assert = require('assert');
var YAMLException = require('js-yaml/lib/js-yaml/exception.js');
var fs = require('fs');
var OptionsHandler = require('../lib/options-handler.js');
var logger;
var optionsHandler;

/**
 * @classdescription This unit test suite checks the validity and correctness of {@link OptionsHandler} class.
 */
describe('Executing \'jy-transform\' project OptionsHandler test suite.', function () {

    /**
     * Init the test logger and Writer.
     */
    before(function () {
        logger = require('./logger.js');
        optionsHandler = new OptionsHandler(logger);
    });

    //describe('Testing OptionsHandler.writeJs(...)', function () {
    //
    //    it('should write JS to file', function (done) {
    //
    //    });
    //});

    //var writeStream = fs.createWriteStream('myOutput.txt');



    describe('Testing OptionsHandler.validateTransformation(...)', function () {

        var options = {
            origin: Constants.YAML,
            target: Constants.JS
        };

        it('should resolve transformation correctly from valid origin and target', function (done) {
            optionsHandler.validateTransformation(options)
                .then(function (results) {
                    assert.equal(results.length, 2, 'result should have length 2');
                    assert(results[0] === options);
                    assert(results[1] === (Constants.YAML + '2' + Constants.JS));
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        var invalidOptions = {
            origin: Constants.YAML,
            target: 'INVALID_TARGET'
        };

        it('should reject with Error due to invalid target', function (done) {
            optionsHandler.validateTransformation(invalidOptions)
                .then(function (results) {
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.error('EXPECTED ERROR: ' + err.stack);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error);
                    done();
                });
        });

    });
});
