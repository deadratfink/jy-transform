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
            optionsHandler.completeOptions()
                .then(function (resultOptions) {
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.error('EXPECTED ERROR: ' + err.stack);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error);
                    done();
                });
        });

        it('should resolve options.src/orign and origin.dest/target with default values (' + Constants.DEFAULT_ORIGIN + '/' + Constants.DEFAULT_TARGET + ')', function (done) {
            var PATH_WITH_INVALID_EXT = 'PATH_WITH_INVALID.EXT';
            var options = {
                src: PATH_WITH_INVALID_EXT,
                dest: PATH_WITH_INVALID_EXT
            };
            optionsHandler.completeOptions(options)
                .then(function (resultOptions) {
                    assert.equal(resultOptions.origin, Constants.DEFAULT_ORIGIN, 'options.origin should have value ' + Constants.DEFAULT_ORIGIN);
                    assert.equal(resultOptions.target, Constants.DEFAULT_TARGET, 'options.target should have value ' + Constants.DEFAULT_TARGET);
                    assert.equal(resultOptions.dest, PATH_WITH_INVALID_EXT, 'options.dest should have value ' + PATH_WITH_INVALID_EXT);
                    assert.equal(resultOptions.indent, Constants.DEFAULT_INDENT, 'options.indent should have value ' + Constants.DEFAULT_INDENT);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
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
            optionsHandler.ensureIndent(options)
                .then(function (resultOptions) {
                    assert.equal(resultOptions.target, Constants.YAML, 'result target should have length ' + Constants.YAML);
                    assert.notEqual(resultOptions.indent, null, 'options should contain indent but is missing');
                    assert.equal(resultOptions.indent, Constants.DEFAULT_INDENT, 'result indent should have length ' + Constants.DEFAULT_INDENT);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
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

    describe('Testing OptionsHandler.ensureOrigin(...)', function () {

        it('should resolve options.origin for valid type YAML', function (done) {
            var options = {
                origin: Constants.YAML
            };
            optionsHandler.ensureOrigin(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.origin, null, 'options should contain origin but is missing');
                    assert.equal(resultOptions.origin, Constants.YAML, 'result origin should have type ' + Constants.YAML);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should resolve options.origin for valid type JS', function (done) {
            var options = {
                origin: Constants.JS
            };
            optionsHandler.ensureOrigin(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.origin, null, 'options should contain origin but is missing');
                    assert.equal(resultOptions.origin, Constants.JS, 'result origin should have type ' + Constants.JS);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should resolve options.origin for valid type JSON', function (done) {
            var options = {
                origin: Constants.JSON
            };
            optionsHandler.ensureOrigin(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.origin, null, 'options should contain origin but is missing');
                    assert.equal(resultOptions.origin, Constants.JSON, 'result origin should have type ' + Constants.JSON);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should reject when options.origin is invalid type', function (done) {
            var options = {
                origin: 'INVALID_TYPE'
            };
            optionsHandler.ensureOrigin(options)
                .then(function (resultOptions) {
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

    describe('Testing OptionsHandler.ensureTarget(...)', function () {

        it('should resolve options.target for valid type YAML', function (done) {
            var options = {
                target: Constants.YAML
            };
            optionsHandler.ensureTarget(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.target, null, 'options should contain target but is missing');
                    assert.equal(resultOptions.target, Constants.YAML, 'result target should have type ' + Constants.YAML);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should resolve options.target for valid type JS', function (done) {
            var options = {
                target: Constants.JS
            };
            optionsHandler.ensureTarget(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.target, null, 'options should contain target but is missing');
                    assert.equal(resultOptions.target, Constants.JS, 'result target should have type ' + Constants.JS);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should resolve options.target for valid type JSON', function (done) {
            var options = {
                target: Constants.JSON
            };
            optionsHandler.ensureTarget(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.target, null, 'options should contain target but is missing');
                    assert.equal(resultOptions.target, Constants.JSON, 'result target should have type ' + Constants.JSON);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should reject when options.target is invalid type', function (done) {
            var options = {
                origin: 'INVALID_TYPE'
            };
            optionsHandler.ensureTarget(options)
                .then(function (resultOptions) {
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

    describe('Testing OptionsHandler.ensureDest(...)', function () {

        it('should resolve options.dest with value \'' + Constants.DEFAULT_OPTIONS.dest + '\' to relative file path to ' + Constants.YAML + ' file', function (done) {
            var fileBaseName = 'test';
            var options = {
                src: fileBaseName + '.' + Constants.JS,
                dest: Constants.DEFAULT_OPTIONS.dest,
                target: Constants.YAML
            };
            optionsHandler.ensureDest(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.dest, null, 'options should contain dest but is missing');
                    assert.equal(resultOptions.dest, fileBaseName + '.' + Constants.YAML, 'result options.dest should have type ' + fileBaseName + '.' + Constants.YAML);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should resolve options.dest with value \'' + Constants.DEFAULT_OPTIONS.dest + '\' to relative file path to ' + Constants.JS + ' file', function (done) {
            var fileBaseName = 'test';
            var options = {
                src: fileBaseName + '.' + Constants.YAML,
                dest: Constants.DEFAULT_OPTIONS.dest,
                target: Constants.JS
            };
            optionsHandler.ensureDest(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.dest, null, 'options should contain dest but is missing');
                    assert.equal(resultOptions.dest, fileBaseName + '.' + Constants.JS, 'result options.dest should have type ' + fileBaseName + '.' + Constants.JS);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should resolve options.dest with value \'' + Constants.DEFAULT_OPTIONS.dest + '\' to relative file path to ' + Constants.JSON + ' file', function (done) {
            var fileBaseName = 'test';
            var options = {
                src: fileBaseName + '.' + Constants.YAML,
                dest: Constants.DEFAULT_OPTIONS.dest,
                target: Constants.JSON
            };
            optionsHandler.ensureDest(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.dest, null, 'options should contain dest but is missing');
                    assert.equal(resultOptions.dest, fileBaseName + '.' + Constants.JSON, 'result options.dest should have type ' + fileBaseName + '.' + Constants.JSON);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should reject options.dest when invalid target type is provided', function (done) {
            var fileBaseName = 'test';
            var options = {
                src: fileBaseName + '.' + Constants.YAML,
                dest: Constants.DEFAULT_OPTIONS.dest,
                target: 'INVALID_TARGET'
            };
            optionsHandler.ensureDest(options)
                .then(function (resultOptions) {
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.error('EXPECTED ERROR: ' + err.stack);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error);
                    done();
                });
        });

        it('should reject when Writable is given but nor target', function (done) {
            var options = {
                dest: fs.createWriteStream('myOutput.txt')
            };
            optionsHandler.ensureDest(options)
                .then(function (resultOptions) {
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.error('EXPECTED ERROR: ' + err.stack);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error);
                    done();
                });
        });

        it('should resolve original options.dest', function (done) {
            var destObj = {};
            var options = {
                dest: destObj
            };
            optionsHandler.ensureDest(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.dest, null, 'options should contain dest but is missing');
                    assert.equal(resultOptions.dest, destObj, 'result options.dest should have type ' + destObj);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should resolve with null value for options.dest', function (done) {
            var destObj = {};
            var options = {
            };
            optionsHandler.ensureDest(options)
                .then(function (resultOptions) {
                    assert.equal(resultOptions.dest, null, 'options.dest should be null');
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

    });
});
