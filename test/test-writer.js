'use strict';

var assert = require('assert');
var YAMLException = require('js-yaml/lib/js-yaml/exception.js');
var fs = require('fs');
var os = require('os');
var Writer = require('../index.js').Writer;
var logger;
var writer;

/**
 * @classdescription This unit test suite checks the validity and correctness of {@link Writer} class.
 */
describe('Executing \'jy-transform\' project Writer test suite.', function () {

    /**
     * Init the test logger and Writer.
     */
    before(function () {
        logger = require('./logger.js');
        writer = new Writer(logger);
    });

    /**
     * Asserts that the given `dest` is a file.
     *
     * @param {string} dest - File destination to assert.
     * @param {function} done - Test's `done()` callback.
     * @returns {*}
     * @private
     */
    function assertDestFile(dest, done) {
        // check for existing source file
        try {
            var stats = fs.lstatSync(dest); // TODO could we check this in Async mode?
            assert(stats.isFile(), 'write destination ' + dest + ' should be file');
            done();
        } catch (err) {
            if (err.code === 'ENOENT') {
                err.message = 'The input file \'' + dest + '\' does not exists or is not accessible, cause: ' + err.message;
            } else {
                err.message = 'Some error occurred while accessing input file \'' + dest + '\': ' + err.code + ', ' + err.message;
            }
            return done(err);
        }
    }

    var json = {
        test: 'value'
    };

    describe('Testing Writer.writeJs(...)', function () {

        it('should write JS to file', function (done) {

            var options = {
                dest: './test/tmp/test-data-by-js-to-file.js'
            };

            writer.writeJs(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null);
                    assertDestFile(options.dest, done);
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should write JS to stream', function (done) {

            var file = './test/tmp/test-data-by-js-stream.js';
            var dest = fs.createWriteStream(file);

            var options = {
                dest: dest
            };

            writer.writeJs(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                    assertDestFile(file, done);
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should write JS to JS object', function (done) {

            var options = {
                dest: {}
            };

            writer.writeJs(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                    assert.notEqual(options.dest, null, 'options.dest should not be null, was: ' + JSON.stringify(options.dest));
                    assert.notEqual(options.dest.hasOwnProperty('test'), null, 'options.dest should have \'test\' property, was: ' + JSON.stringify(options.dest));
                    assert.equal(options.dest.test, 'value');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should reject write JS with Error on missing destination', function (done) {

            var options = {
            };

            writer.writeJs(json, options)
                .then(function (msg) {
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err.stack);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error, 'expected Error should equal Error, was: ' + (typeof err));
                    done();
                });
        });

        it('should reject write JS to file by invalid file path', function (done) {

            var options = {
                dest: './test/tmp/<>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/test-data-by-js-to-file.js'
            };

            writer.writeJs(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null);
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err.stack);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error, 'expected Error should equal Error, was: ' + (typeof err));
                    done();
                });
        });

    });

    describe('Testing Writer.writeJson(...)', function () {

        it('should write JSON to file', function (done) {

            var options = {
                src: json,
                dest: './test/data/tmp/test-data-by-json-to-file.json'
            };

            writer.writeJson(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null);
                    assertDestFile(options.dest, done);
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should write JSON to stream', function (done) {

            var file = './test/tmp/test-data-by-json-stream.json';
            var dest = fs.createWriteStream(file);

            var options = {
                dest: dest
            };

            writer.writeJson(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                    assertDestFile(file, done);
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should write JS to JS object', function (done) {

            var options = {
                dest: {}
            };

            writer.writeJson(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                    assert.notEqual(options.dest, null, 'options.dest should not be null, was: ' + JSON.stringify(options.dest));
                    var result = JSON.parse(options.dest);
                    assert.notEqual(result.hasOwnProperty('test'), null, 'options.dest should have \'test\' property, was: ' + JSON.stringify(options.dest));
                    assert.equal(result.test, 'value');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should reject with Error on missing destination', function (done) {

            var options = {
            };

            writer.writeJson(json, options)
                .then(function (msg) {
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err.stack);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error, 'expected Error should equal Error, was: ' + (typeof err));
                    done();
                });
        });

    });


    describe('Testing Writer.writeYaml(...)', function () {

        it('should write YAML to file', function (done) {

            var options = {
                dest: './test/tmp/test-data-by-js-to-file.yaml'
            };

            writer.writeYaml(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null);
                    assertDestFile(options.dest, done);
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should write YAML to stream', function (done) {

            var file = './test/tmp/test-data-by-js-stream.yaml';
            var dest = fs.createWriteStream(file);

            var options = {
                dest: dest
            };

            writer.writeYaml(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                    assertDestFile(file, done);
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should write stringified YAML to JS object', function (done) {

            var options = {
                dest: {}
            };

            writer.writeYaml(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                    assert.notEqual(options.dest, null, 'options.dest should not be null, was: ' + JSON.stringify(options.dest));
                    assert(typeof options.dest === 'string');
                    var key = Object.keys(json)[0];
                    assert.equal(options.dest, key + ': ' + json[key] + os.EOL, 'options.dest should contain YAML string, was: ' + JSON.stringify(options.dest));
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });



        it('should reject with Error on missing destination', function (done) {

            var options = {
            };

            writer.writeYaml(json, options)
                .then(function (msg) {
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err.stack);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error, 'expected Error should equal Error, was: ' + (typeof err));
                    done();
                });
        });

    });

});
