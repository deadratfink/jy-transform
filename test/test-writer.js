'use strict';

var assert = require('assert');
var Promise = require('bluebird');
var YAMLException = require('js-yaml/lib/js-yaml/exception.js');
var fs = require('fs');
var os = require('os');
var stream = require('stream');
var Writer = require('../index.js').Writer;
var logger;
var writer;

/**
 * @classdesc This unit test suite checks the validity and correctness of {@link Writer} class.
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
     * @param {string} dest     - File destination to assert.
     * @param {function} [done] - Test's `done` callback.
     * @returns {Error}         - If dest not exists and `done` is not passed.
     * @private
     */
    function assertDestFile(dest, done) {
        // check for existing source file
        try {
            var stats = fs.statSync(dest); // TODO could we check this in Async mode?
            assert(stats.isFile(), 'write destination ' + dest + ' should be file');
            if (done) {
                return done();
            }
        } catch (err) {
            if (err.code === 'ENOENT') {
                err.message = 'The input file \'' + dest + '\' does not exists or is not accessible, cause: ' + err.message;
            } else {
                err.message = 'Some error occurred while accessing input file \'' + dest + '\': ' + err.code + ', ' + err.message;
            }
            if (done) {
                return done(err);
            }
            return err;
        }
    }

    /**
     * Asserts that the given `dest` does not exist.
     *
     * @param {string} dest     - File destination to assert.
     * @param {function} [done] - Test's `done` callback.
     * @returns {Error}         - If dest not exists and `done` is not passed.
     * @private
     */
    function assertNotDestFile(dest, done) {
        // check for existing source file
        try {
            fs.statSync(dest); // TODO could we check this in Async mode?
            if (done) {
                return done(new Error('Error expected when checking file = ' + dest));
            }
        } catch (err) {
            logger.info('Error is EXPECTED: ' + err.stack);
            assert.notEqual(err, null, 'err should not be null');
            assert.equal(err.code, 'ENOENT', 'err.code should equal \'ENOENT\'');
            if (done) {
                return done();
            }
        }
    }

    var json = {
        test: 'value'
    };


    var errorThrowingStream = new stream.Writable();
    errorThrowingStream._write = function (chunk, encoding, done) {
        logger.info('stream emitting Error now');
        this.emit('error', new Error('Dummy Error'));
        done();
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

        it('should write JS to stream with exports identifier', function (done) {

            var file = './test/tmp/test-data-by-js-stream-with-exports-identifier.js';
            var dest = fs.createWriteStream(file);

            var options = {
                dest: dest,
                exports: 'test'
            };

            writer.writeJs(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                    assertDestFile(file, done);
                    var json = require('./tmp/test-data-by-js-stream-with-exports-identifier.js').test;
                    assert.notEqual(json, null, 'json from test identifier should not be null');
                    assert.equal(json.test, 'value', 'json from test identifier should have a \'test\' property with value \'value\'');
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should write JS to file and fail by invalid exports identifier (\'#3/-\')', function (done) {
            var dest = './test/tmp/test-data-by-js-stream-with-invalid-exports-identifier.js';

            var options = {
                dest: dest,
                exports: '#3/-'
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

        it('should write JS to stream and fail by invalid exports identifier (\'#3/-\')', function (done) {
            var file = './test/tmp/test-data-by-js-stream-with-invalid-exports-identifier.js';
            var dest = fs.createWriteStream(file);

            var options = {
                dest: dest,
                exports: '#3/-'
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

        it('should write JS to stream and fail by invalid exports identifier (\'if\')', function (done) {
            var file = './test/tmp/test-data-by-js-stream-with-invalid-exports-identifier.js';
            var dest = fs.createWriteStream(file);

            var options = {
                dest: dest,
                exports: 'if'
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


        it('should write JS to stream and fail by provoked error', function (done) {

            var options = {
                dest: errorThrowingStream
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

        it('should write JS to JS object with options.exports == \'\'', function (done) {

            var options = {
                dest: {},
                exports: ''
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

        var exports = 'foo';
        it('should write JS to JS object with options.exports == \'exports\'', function (done) {

            var options = {
                dest: {},
                exports: exports
            };

            writer.writeJs(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                    assert.notEqual(options.dest, null, 'options.dest should not be null, was: ' + JSON.stringify(options.dest));
                    assert.notEqual(options.dest.hasOwnProperty(exports), null, 'options.dest should have \'' + exports + '\' property, was: ' + JSON.stringify(options.dest));
                    assert.notEqual(options.dest[exports].hasOwnProperty('test'), null, 'options.dest should have \'test\' property, was: ' + JSON.stringify(options.dest[exports]));
                    assert.equal(options.dest[exports].test, 'value');
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
                dest: './test/tmp/test-data-by-json-to-file.json'
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

        it('should reject with Error by invalid src object', function (done) {

            var options = {
                dest: './test/tmp/test-data-by-js-to-file-invalid.yaml'
            };

            var invalidYamlJson = function() {};

            writer.writeYaml(invalidYamlJson, options)
                .then(function (msg) {
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err.stack);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof YAMLException, 'expected Error should equal YAMLException, was: ' + (typeof err));
                    done();
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

    describe('Testing force overwrite file', function () {

        it('should reject when options.dest is a directory', function (done) {
            var dir = './test/data';
            var options = {
                dest: dir
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

        it('should write YAML to stream, overwrite on 2nd write, don\'t overwrite on 3rd write and overwrite on 4th write', function (done) {

            // we have to set higher timeout here because some travis jobs failed due to 2 sec timeout
            this.timeout(10000);

            var dest = './test/tmp/test-data-file-overwriting.yaml';

            var options = {
                indent: 4,
                dest:  dest
            };
            Promise.each([
                function () {
                    return writer.writeYaml(json, options)
                        .then(function (msg) {
                            assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                            assertDestFile(dest);
                            return Promise.resolve('overwrite test #1 should initially write YAML to file \'' + dest + '\'');
                        });
                },
                function () {
                    options = {
                        indent: 4,
                        dest:  dest,
                        force: true
                    };
                    return writer.writeYaml(json, options)
                        .then(function (msg) {
                            assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                            assertDestFile(dest);
                            assertNotDestFile('./test/tmp/test-data-file-overwriting(1).yaml');
                            return Promise.resolve('overwrite test #2 should overwrite existing YAML file \'' + dest + '\'');
                        });
                },
                function () {
                    return writer.writeYaml(json, options)
                        .then(function (msg) {
                            assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                            assertDestFile('./test/tmp/test-data-file-overwriting(1).yaml');
                            return Promise.resolve('overwrite test #3 shouldn\'t overwrite existing YAML file \'' + dest + '\', but write new file \'./test/tmp/test-data-file-overwriting(1).yaml\'');
                        });
                },
                function () {
                    options = {
                        indent: 4,
                        dest:  dest,
                        force: false
                    };
                    return writer.writeYaml(json, options)
                        .then(function (msg) {
                            assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                            assertNotDestFile('./test/tmp/test-data-file-overwriting(2).yaml');
                            return Promise.resolve('overwrite test #4 should overwrite existing YAML file \'' + dest + '\'');
                        });
                },
                function () {
                    options = {
                        indent: 4,
                        dest:  dest
                    };
                    return writer.writeYaml(json, options)
                        .then(function (msg) {
                            assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                            assertDestFile('./test/tmp/test-data-file-overwriting(1).yaml');
                            return Promise.resolve('overwrite test #5 shouldn\'t overwrite existing YAML file \'' + dest + '\' and \'./test/tmp/test-data-file-overwriting(1).yaml\', but write new file \'./test/tmp/test-data-file-overwriting(2).yaml\'');
                        });
                }
            ], function(value, index, length) {
                return value().then(function (msg) {
                    logger.info('testing overwrite #' + (index + 1) + '/' + length + ': ' + msg);
                });
            }).then(function () {
                done();
            }).catch(function (err) {
                done(err);
            });
        });

    });

});
