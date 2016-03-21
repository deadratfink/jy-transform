'use strict';

var Transformer = require('../index.js');
var Constants = require('../lib/constants.js');
var logger;
var assert = require('assert');
var fs = require('fs-extra');
var Promise = require('bluebird');
var path = require('path');

describe('Executing \'jy-transform\' project test suite.', function () {

    var TEST_TMP_DIR = './test/tmp';
    var TEST_DATA_DIR = './test/data';
    var SRC = TEST_DATA_DIR + '/test-data.yaml';

    /**
     * Init the test logger.
     */
    before(function () {
        logger = require('./logger.js');
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

    //it ('should include all test files', function (done) {
    //
    //    require('./test-logger.js');
    //    require('./test-logger.js');
    //
    //    done();
    //});




    describe('Testing Transformer transforming from YAML to JS', function () {

        var DEST = TEST_TMP_DIR + '/test-data.js';
        var EXPECTED_VALUE = 'old value';

        it('should store ' + DEST + ' file relative to ./test/tmp/test-data.yaml', function (done) {

            logger.info('SDASFASDASDFASD: ' + path.resolve('./test/tmp/test-data.yaml'));
            var options = {
                src: path.resolve('./test/tmp/test-data.yaml')
            };

            var transformer = new Transformer(logger);

            return transformer.transform(options)
                .then(function (msg){
                    logger.info(msg);
                    var stats = fs.statSync(DEST);
                    assert(stats.isFile());
                    var json = require('./tmp/test-data.js');
                    assert.equal(json.myproperty, EXPECTED_VALUE, 'property myproperty should have new value \'' + EXPECTED_VALUE +'\'.');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });

        });
    });


    describe('Testing Transformer transforming from YAML to JSON', function () {

        //it('should alter property using middleware', function (done) {
        //
        //    var DEST = TEST_TMP_DIR + '/test-data.json';
        //
        //    var options = {
        //        src: TEST_DATA_DIR + '/test-data.yaml',
        //        //dest: DEST,
        //        origin: Constants.YAML,
        //        target: Constants.JSON
        //    };
        //
        //});

        it('should alter property using middleware', function (done) {

            var EXPECTED_NEW_VALUE = 'new value';
            var middleware = function (json) {
                json.myproperty = EXPECTED_NEW_VALUE;
                return Promise.resolve(json);
            };

            var DEST = TEST_TMP_DIR + '/test-data-changed.json';

            var options = {
                src: TEST_DATA_DIR + '/test-data.yaml',
                dest: DEST,
                origin: Constants.YAML,
                target: Constants.JSON
            };

            var transformer = new Transformer(logger);

            return transformer.transform(options, middleware)
                .then(function (msg){
                    logger.info(msg);
                    var stats = fs.statSync(DEST);
                    assert(stats.isFile());
                    var json = JSON.parse(fs.readFileSync(DEST));
                    assert.equal(json.myproperty, EXPECTED_NEW_VALUE, 'Altered JSON property should have new value \'' + EXPECTED_NEW_VALUE +'\'.');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });
    });
});
