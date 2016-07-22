'use strict';

var Transformer = require('../index');
var transformer;
var Constants = require('../lib/constants');
var logger;
var jsYaml = require('js-yaml');
var assert = require('assert');
var Promise = require('bluebird');
var fs = require('fs-extra');
var fsPromised = Promise.promisifyAll(require('fs'));
var path = require('path');

/**
 * @classdesc This unit test suite checks the correct trnasfomration behaviour of {@link Transformer} class.
 */
describe('Executing \'jy-transform\' project\'s Transformer test suite.', function () {

    var TEST_TMP_DIR = './test/tmp';
    var TEST_DATA_DIR = './test/data';
    var SRC = TEST_DATA_DIR + '/test-file.yaml';
    var EXPECTED_VALUE = 5000.00;

    /**
     * Init the test logger.
     */
    before(function () {
        logger = require('./logger.js');
        transformer = new Transformer(logger);
    });

    /**
     * Prepare test data.
     */
    before(function () {
        try {
            fs.copySync(SRC, './test/tmp/test-data.yaml');
            logger.info('copied ' + SRC + ' to ' + TEST_TMP_DIR);
        } catch (err) {
            logger.error('could not copy ' + SRC + ' to ' + TEST_TMP_DIR + err.stack);
            throw err;
        }
    });

    /**
     * Transformation middleware changing value for `total` property.
     *
     * @param {object} json - To transform.
     */
    function middleware(json) {
        json.total = EXPECTED_VALUE;
        return Promise.resolve(json);
    }

    /**
     * Helper method which asserts the successful transformation.
     *
     * @param {object} options      - The transformation options.
     * @param {function} middleware - The transformation middleware.
     * @param {function} done       - Test finished callback;
     */
    function assertTransformSuccess(options, middleware, done) {
        return transformer.transform(options, middleware)
            .then(function (msg){
                logger.info(msg);
                var stats = fs.statSync(options.dest);
                assert(stats.isFile());
                var json = require(path.resolve(options.dest));
                assert.equal(json.total, EXPECTED_VALUE, 'property \'total\' should have new value \'' + EXPECTED_VALUE +'\'.');
                done();
            })
            .catch(function (err) {
                logger.error(err.stack);
                done(err);
            });
    }

    /**
     * Helper method which asserts the successful transformation.
     *
     * @param {object} options      - The transformation options.
     * @param {function} middleware - The transformation middleware.
     * @param {function} done       - Test finished callback;
     */
    function assertYamlTransformSuccess(options, middleware, done) {
        return transformer.transform(options, middleware)
            .then(function (msg){
                logger.info(msg);
                var stats = fs.statSync(options.dest);
                assert(stats.isFile());
                return fs.readFileAsync(options.dest, Constants.UTF8)
                    .then(function (yaml) {
                        try {
                            var json = jsYaml.safeLoad(yaml);
                            assert.equal(json.total, EXPECTED_VALUE, 'property \'total\' should have new value \'' + EXPECTED_VALUE +'\'.');
                            done();
                        } catch (err) { // probably a YAMLException
                            logger.error(err.stack);
                            return done(err);
                        }
                    });
            })
            .catch(function (err) {
                logger.error(err.stack);
                done(err);
            });
    }


    describe('Testing Transformer transforming from YAML to JS to relative path', function () {

        var DEST = TEST_TMP_DIR + '/test-data.js';

        it('should store ' + DEST + ' file relative to ./test/tmp/test-data.yaml', function (done) {

            var options = {
                src: path.resolve('./test/tmp/test-data.yaml')
            };

            return transformer.transform(options, middleware)
                .then(function (msg){
                    logger.info(msg);
                    var stats = fs.statSync(DEST);
                    assert(stats.isFile());
                    var json = require('./tmp/test-data.js');
                    assert.equal(json.total, EXPECTED_VALUE, 'property \'total\' should have new value \'' + EXPECTED_VALUE +'\'.');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });

        });
    });

    describe('Testing Transformer transforming from YAML to JS', function () {

        var SRC  = './test/data/test-file.yaml';
        var DEST = TEST_TMP_DIR + '/test-data-transform-yaml-js.js';

        it('should store ' + SRC + ' file to ' + DEST, function (done) {

            var options = {
                src: path.resolve(SRC),
                dest: path.resolve(DEST)
            };

            assertTransformSuccess(options, middleware, done);

        });
    });

    describe('Testing Transformer transforming from YAML to JSON', function () {

        var SRC  = './test/data/test-file.yaml';
        var DEST = TEST_TMP_DIR + '/test-data-transform-yaml-json.json';

        it('should store ' + SRC + ' file to ' + DEST, function (done) {

            var options = {
                src: path.resolve(SRC),
                dest: path.resolve(DEST)
            };

            assertTransformSuccess(options, middleware, done);

        });
    });

    describe('Testing Transformer transforming from JSON to JS', function () {

        var SRC  = './test/data/test-file.json';
        var DEST = TEST_TMP_DIR + '/test-data-transform-json-js.js';

        it('should store ' + SRC + ' file to ' + DEST, function (done) {

            var options = {
                src: path.resolve(SRC),
                dest: path.resolve(DEST)
            };

            assertTransformSuccess(options, middleware, done);

        });
    });

    describe('Testing Transformer transforming from JS to JSON', function () {

        var SRC  = './test/data/test-file.js';
        var DEST = TEST_TMP_DIR + '/test-data-transform-js-json.json';

        it('should store ' + SRC + ' file to ' + DEST, function (done) {

            var options = {
                src: path.resolve(SRC),
                dest: path.resolve(DEST)
            };

            assertTransformSuccess(options, middleware, done);

        });
    });

    describe('Testing Transformer transforming from JS to YAML', function () {

        var SRC  = './test/data/test-file.js';
        var DEST = TEST_TMP_DIR + '/test-data-transform-js-yaml.yaml';

        it('should store ' + SRC + ' file to ' + DEST, function (done) {

            var options = {
                src: path.resolve(SRC),
                dest: path.resolve(DEST)
            };

            return transformer.transform(options, middleware)
                .then(function (msg){
                    logger.info(msg);
                    var stats = fs.statSync(options.dest);
                    assert(stats.isFile());

                    return fsPromised.readFileAsync(options.dest, Constants.UTF8)
                        .then(function (yaml) {
                            logger.debug('YAML loaded from file ' + options.dest);
                            try {
                                var resultJson = jsYaml.safeLoad(yaml);
                                assert.equal(resultJson.total, EXPECTED_VALUE, 'property \'total\' should have new value \'' + EXPECTED_VALUE +'\'.');
                                done();
                            } catch (err) { // probably a YAMLException
                                logger.error('Unexpected error: ' + err.stack);
                                return done(err);
                            }
                        });
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });
    });

    describe('Testing Transformer transforming from YAML to YAML', function () {

        var SRC  = './test/data/test-file.yaml';
        var DEST = TEST_TMP_DIR + '/test-data-transform-yaml-yaml.yaml';

        it('should store ' + SRC + ' file to ' + DEST, function (done) {

            var options = {
                src: path.resolve(SRC),
                dest: path.resolve(DEST)
            };

            return transformer.transform(options, middleware)
                .then(function (msg){
                    logger.info(msg);
                    var stats = fs.statSync(options.dest);
                    assert(stats.isFile());

                    return fsPromised.readFileAsync(options.dest, Constants.UTF8)
                        .then(function (yaml) {
                            logger.debug('YAML loaded from file ' + options.dest);
                            try {
                                var resultJson = jsYaml.safeLoad(yaml);
                                assert.equal(resultJson.total, EXPECTED_VALUE, 'property \'total\' should have new value \'' + EXPECTED_VALUE +'\'.');
                                done();
                            } catch (err) { // probably a YAMLException
                                logger.error('Unexpected error: ' + err.stack);
                                return done(err);
                            }
                        });
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });
    });

    describe('Testing Transformer transforming from JSON to JSON', function () {

        var SRC  = './test/data/test-file.json';
        var DEST = TEST_TMP_DIR + '/test-data-transform-json-json.json';

        it('should store ' + SRC + ' file to ' + DEST, function (done) {

            var options = {
                src: path.resolve(SRC),
                dest: path.resolve(DEST)
            };

            assertTransformSuccess(options, middleware, done);

        });
    });

    describe('Testing Transformer transforming from JSON to YAML', function () {

        var SRC  = './test/data/test-file.json';
        var DEST = TEST_TMP_DIR + '/test-data-transform-json-yaml.yaml';

        it('should store ' + SRC + ' file to ' + DEST, function (done) {

            var options = {
                src: path.resolve(SRC),
                dest: path.resolve(DEST)
            };

            assertYamlTransformSuccess(options, middleware, done);

        });
    });

    describe('Testing Transformer transforming from JS to JS', function () {

        var SRC  = './test/data/test-file.js';
        var DEST = TEST_TMP_DIR + '/test-data-transform-js-js.js';

        it('should store ' + SRC + ' file to ' + DEST, function (done) {

            var options = {
                src: path.resolve(SRC),
                dest: path.resolve(DEST)
            };

            assertTransformSuccess(options, middleware, done);

        });
    });

});
