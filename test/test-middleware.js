'use strict';

var Transformer = require('../index');
var Middleware = require('../index').middleware;
var identityMiddleware = Middleware.identityMiddleware;
var transformer;
var Promise = require('bluebird');
var logger;
var assert = require('assert');
var objectPath = require('object-path');

/**
 * @classdesc This unit test suite checks the validity and correctness of {@link Middleware} class.
 */
describe('Executing \'jy-transform\' project Middleware test suite.', function () {

    /**
     * Middleware function for altering JSON.
     *
     * @param {object} json - The JSON object o alter.
     * @private
     */
    function middleware(json) {

        function key1(json) {
            objectPath.set(json, 'key1', 'value1');
            logger.info('key1 json: ' + JSON.stringify(json));
            return Promise.resolve(json);
        }

        function key2(json) {
            objectPath.set(json, 'key2', 'value2');
            logger.info('key2 json: ' + JSON.stringify(json));
            return Promise.resolve(json);
        }

        function key3(json) {
            objectPath.set(json, 'key3', 'value3');
            logger.info('key3 json: ' + JSON.stringify(json));
            return Promise.resolve(json);
        }

        return Promise.all([key1(json), key2(json), key3(json)])
            .then(function(result) {
                assert.equal(result.length, 3);
                logger.info('all the elements were created');
                logger.info('result: ' + JSON.stringify(result[result.length - 1]));
                return Promise.resolve(result[result.length - 1]);
            });
    }


    /**
     * Helper function to assert the identity Promise.
     *
     * @param {function} func - The identity Promise function.
     * @param {function} done - Test finish callback.
     * @private
     */
    function assertIdentityPromise(func, done) {
        var json = {test: 'value'};
        func(json)
            .then(function (jsonResult) {
                assert.deepEqual(jsonResult, json, 'JSON passed in should equals JSON put put out from identity Promise');
                done();
            })
            .catch(function(err) {
                done(err);
            });
    }

    /**
     * Init the test logger.
     */
    before(function () {
        logger = require('./logger.js');
        transformer = new Transformer(logger);
    });

    describe('Testing Transformer middleware', function () {

        it('should alter json', function (done) {
            var options = {
                src: {},
                dest: {}
            };
            transformer.transform(options, middleware)
                .then(function (msg){
                    logger.info(msg);
                    logger.info('options.dest: ' + JSON.stringify(options.dest, null, 4));
                    assert.equal(options.dest.key1, 'value1', 'options.dest.key1 should have value: value1, but was ' + options.dest.key1);
                    assert.equal(options.dest.key2, 'value2', 'options.dest.key1 should have value: value2, but was ' + options.dest.key2);
                    assert.equal(options.dest.key3, 'value3', 'options.dest.key1 should have value: value3, but was ' + options.dest.key3);
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

    });

    describe('Testing middleware.identityMiddleware()', function () {

        it('should provide passed function', function (done) {
            var func = identityMiddleware;
            assert(typeof func === 'function');
            assert(func === identityMiddleware, 'func should be same function identityMiddleware');

            var json = {};
            identityMiddleware(json)
                .then(function (jsonIdentity) {
                    assert(jsonIdentity === json, 'should return same json');
                    done();
                });
        });

    });

    describe('Testing middleware.ensureMiddleware()', function () {

        it('should provide passed function', function (done) {
            var func = Middleware.ensureMiddleware(identityMiddleware);
            assert(typeof func === 'function');
            assert(func === identityMiddleware, 'should return passed function (identityMiddleware)');
            done();
        });

        it('should reject Promise if middleware passed is not a function type', function (done) {
            Middleware.ensureMiddleware({})
                .catch(function (err) {
                    assert.notEqual(err, null, 'Promise rejection err should not be null');
                    assert(err instanceof TypeError);
                    done();
                });
        });

        it('should provide identity Promise if middleware passed is null', function (done) {
            var func = Middleware.ensureMiddleware();
            assert(typeof func === 'function');
            var json = {test: 'value'};
            assertIdentityPromise(func, done);
        });

        it('should provide identity Promise if middleware passed is undefined', function (done) {
            var func = Middleware.ensureMiddleware(undefined);
            assert(typeof func === 'function');
            assertIdentityPromise(func, done);
        });

    });
});
