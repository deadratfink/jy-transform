'use strict';

var Constants = require('../lib/constants.js');
var assert = require('assert');
var YAMLException = require('js-yaml/lib/js-yaml/exception.js');
var fs = require('fs');
var path = require('path');
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

    /**
     * Assert an `Error` for a given options function.
     *
     * @param {object} options - The options which potentially produce the error.
     * @param {function} optionsFunc - The function to call for assertion.
     * @param {function} done  - Test finish callback.
     * @param {Error} [errorType=Error] - The error type to assert.
     */
    function assertOptionsError(options, optionsFunc, done, errorType) {
        optionsFunc(options)
            .then(function (resultOptions) {
                done(new Error('Error expected when calling options = ' + JSON.stringify(options, null, 4)));
            })
            .catch(function (err) {
                logger.error('is EXPECTED: ' + err.stack);
                assert.notEqual(err, null, 'err should not be null');
                var type = errorType;
                if (!type) {
                    type = Error;
                }
                logger.debug('ERROR type = ' + (typeof err));
                assert(err instanceof Error);
                assert.equal(err.name, type.name, err.name + ' should equal ' + type.name);
                done();
            });
    }

    //function getFunctionName(func) {
    //    var funcStr = func.toString();
    //    logger.info('FUNCTION:: ' + funcStr);
    //
    //    funcStr =funcStr.substr(0, funcStr.indexOf('('));
    //    logger.info('FUNCTION:: ' + funcStr);
    //    funcStr =funcStr.replace('function ', '');
    //    logger.info('FUNCTION:: ' + funcStr);
    //    funcStr =funcStr.trim();
    //    logger.info('FUNCTION f:: ' + funcStr);
    //
    //    return funcStr;
    //
    //    //return funcStr
    //    //    .substr(0, funcStr.indexOf('('))
    //    //    .replace('function ', '')
    //    //    .trim();
    //}

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
            assertOptionsError(invalidOptions, optionsHandler.validateTransformation, done);
        });

    });

    describe('Testing OptionsHandler.completeOptions(...)', function () {

        it('should reject when options is missing', function (done) {
            assertOptionsError(null, optionsHandler.completeOptions, done);
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

        it('should set default indent if indent is missing', function (done) {
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

        it('should set default indent if indent < minimum YAML indent', function (done) {
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

        it('should set default indent if indent <  JS/JSON minimum indent', function (done) {
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

        it('should set default indent if indent > than maximum indent', function (done) {
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
            assertOptionsError(options, optionsHandler.ensureOrigin, done);
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
            assertOptionsError(options, optionsHandler.ensureTarget, done);
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
            assertOptionsError(options, optionsHandler.ensureDest, done);
        });

        it('should reject when Writable is given but not target', function (done) {
            var options = {
                dest: fs.createWriteStream('myOutput.txt')
            };
            assertOptionsError(options, optionsHandler.ensureDest, done);
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

    describe('Testing OptionsHandler.ensureSrc(...)', function () {

        it('should reject when options.src is not given', function (done) {
            var options = {};
            assertOptionsError(options, optionsHandler.ensureSrc, done);
        });

        it('should resolve original options.src', function (done) {
            var existingFile = path.resolve('./test/data/test-file.yaml');
            var options = {
                src: existingFile
            };

            optionsHandler.ensureSrc(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.src, null, 'options should contain src but is missing');
                    assert.equal(resultOptions.src, existingFile, 'result options.src should have file ' + existingFile);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

        it('should reject when options.src has value of not existing file', function (done) {
            var notExistingFile = 'NON_EXISTING_FILE';
            var options = {
                src: notExistingFile
            };
            assertOptionsError(options, optionsHandler.ensureSrc, done);
        });

        it('should reject when Readable is given but not origin', function (done) {
            var options = {
                src: fs.createReadStream('./test/data/readable-test-dummy.txt')
            };
            assertOptionsError(options, optionsHandler.ensureSrc, done);
        });

        it('should resolve original options.src object', function (done) {
            var srcObj = {};
            var options = {
                src: srcObj
            };
            optionsHandler.ensureSrc(options)
                .then(function (resultOptions) {
                    assert.notEqual(resultOptions.src, null, 'options should contain src but is missing');
                    assert.equal(resultOptions.src, srcObj, 'result options.src should have type ' + srcObj);
                    done();
                })
                .catch(function (err) {
                    logger.error('UNEXPECTED ERROR: ' + err.stack);
                    done(err);
                });
        });

    });
});
