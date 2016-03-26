'use strict';

var Constants = require('../lib/constants.js');
var assert = require('assert');
var YAMLException = require('js-yaml/lib/js-yaml/exception.js');
var fs = require('fs');
var OptionsHandler = require('../lib/options-handler.js');
var optionsHandler;
var logger;

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

        it('should resolve transformation correctly from valid origin and target', function (done) {
            var options = {
                origin: Constants.YAML,
                target: Constants.JS
            };
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

        it('should reject with Error due to invalid target', function (done) {
            var invalidOptions = {
                origin: Constants.YAML,
                target: 'INVALID_TARGET'
            };
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

    describe('Testing OptionsHandler.completeOptions(...)', function () {

        it('should reject when options is missing', function (done) {
            return optionsHandler.completeOptions()
                .then(function (resultOptions) {
                    return done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.error('EXPECTED ERROR: ' + err.stack);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error);
                    return done();
                });
        });

    });

    describe('Testing OptionsHandler.ensureIndent(...)', function () {

        it('should set default indent when indent is missing', function (done) {
            var options = {};
            optionsHandler.ensureIndent(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.indent, null, 'options should contain indent but is missing');
                    assert.equal(resultOptions.indent, Constants.DEFAULT_INDENT, 'result indent should have length ' + Constants.DEFAULT_INDENT);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should set default indent when indent below minimum YAML indent', function (done) {
            var options = {
                indent: (Constants.MIN_YAML_INDENT - 1),
                target: Constants.YAML
            };
            return optionsHandler.ensureIndent(options)
                .then(function (resultOptions) {
                    assert.equal(resultOptions.target, Constants.YAML, 'result target should have length ' + Constants.YAML);
                    assert.notEqual(resultOptions.indent, null, 'options should contain indent but is missing');
                    assert.equal(resultOptions.indent, Constants.DEFAULT_INDENT, 'result indent should have length ' + Constants.DEFAULT_INDENT);
                    return done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    return done(err);
                });
        });

        it('should set default indent when indent below  JS/JSON minimum indent', function (done) {
            var options = {
                indent: Constants.MIN_JSON_JS_INDENT - 1
            };
            optionsHandler.ensureIndent(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.indent, null, 'options should contain indent but is missing');
                    assert.equal(resultOptions.indent, Constants.DEFAULT_INDENT, 'result indent should have length ' + Constants.DEFAULT_INDENT);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should set default indent when indent higher than maximum indent', function (done) {
            var options = {
                indent: Constants.MAX_INDENT + 1
            };
            optionsHandler.ensureIndent(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.indent, null, 'options should contain indent but is missing');
                    assert.equal(resultOptions.indent, Constants.DEFAULT_INDENT, 'result indent should have length ' + Constants.DEFAULT_INDENT);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

    });
});
