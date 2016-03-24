'use strict';

var assert = require('assert');
var YAMLException = require('js-yaml/lib/js-yaml/exception.js');
var fs = require('fs');
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

        it('should write JS to JS object', function (done) {

            var options = {
                dest: {}
            };

            writer.writeJs(json, options)
                .then(function (msg) {
                    assert.notEqual(msg, null, 'msg should not be null, was: ' + msg);
                    assert.notEqual(options.dest, null, 'options.dest should not be null, was: ' + JSON.stringify(options.dest));
                    assert.notEqual(options.dest.hasOwnProperty('test'), null, 'options.dest should not have \'test\' property, was: ' + JSON.stringify(options.dest));
                    assert.equal(options.dest.test, 'value');
                    done();
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

        //it('should read corrupted JSON from file path and fail by TypeError', function (done) {
        //    reader.readJs('./test/data/test-data-corrupted.json')
        //        .then(function (json) {
        //            done(new Error('SyntaxError expected'));
        //        })
        //        .catch(function (err) {
        //            logger.info('EXPECTED ERROR: ' + err.stack);
        //            assert.notEqual(err, null, 'err should not be null');
        //            assert(err instanceof SyntaxError, 'expected Error message should equal SyntaxError, was: ' + (typeof err));
        //            done();
        //        });
        //});
        //
        //it('should read invalid JSON from file path and fail by SyntaxError', function (done) {
        //    reader.readJs('./test/data/test-data-wrong-syntax.json')
        //        .then(function (json) {
        //            done(new Error('SyntaxError expected'));
        //        })
        //        .catch(function (err) {
        //            logger.info('EXPECTED ERROR: ' + err);
        //            assert.notEqual(err, null, 'err should not be null');
        //            assert(err instanceof SyntaxError, 'expected Error message should equal SyntaxError, was: ' + (typeof err));
        //            done();
        //        });
        //});
        //
        //it('should read corrupted JSON from stream and fail by TypeError', function (done) {
        //    var readStream = fs.createReadStream('./test/data/test-data-corrupted.json');
        //    reader.readJs(readStream)
        //        .then(function (json) {
        //            done(new Error('SyntaxError expected'));
        //        })
        //        .catch(function (err) {
        //            logger.info('EXPECTED ERROR: ' + err.stack);
        //            assert.notEqual(err, null, 'err should not be null');
        //            assert(err instanceof SyntaxError, 'expected Error message should equal SyntaxError, was: ' + (typeof err));
        //            done();
        //        });
        //});
        //
        //it('should read invalid JSON from stream and fail by SyntaxError', function (done) {
        //    var readStream = fs.createReadStream('./test/data/test-data-wrong-syntax.json');
        //    reader.readJs(readStream)
        //        .then(function (json) {
        //            done(new Error('SyntaxError expected'));
        //        })
        //        .catch(function (err) {
        //            logger.info('EXPECTED ERROR: ' + err);
        //            assert.notEqual(err, null, 'err should not be null');
        //            assert(err instanceof SyntaxError, 'expected Error message should equal SyntaxError, was: ' + (typeof err));
        //            done();
        //        });
        //});

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

        //it('should read JSON from stream', function (done) {
        //    var readStream = fs.createReadStream('./test/data/test-data.json');
        //    reader.readJs(readStream)
        //        .then(function (json) {
        //            assert.notEqual(json, null);
        //            assert.equal(json.myproperty, 'old value');
        //            done();
        //        })
        //        .catch(function (err) {
        //            logger.error(err.stack);
        //            done(err);
        //        });
        //});

    });


    //var writeStream = fs.createWriteStream('myOutput.txt');

});
