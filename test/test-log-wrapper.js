'use strict';

var LogWrapper = require('../lib/log-wrapper.js');
var assert = require('assert');

/**
 * @classdesc This unit test suite checks the validity and correctness of {@link LogWrapper} class.
 */
describe('Executing \'jy-transform\' project log wrapper test suite.', function () {

    var infoMsg;
    var debugMsg;
    var errorMsg;
    var verboseResultArray = [];
    var logWrapper;

    var INFO = 'INFO';
    var DEBUG = 'DEBUG';
    var ERROR = 'ERROR';

    /**
     * A mock logger.
     *
     * @type {{info: mockLogger.info, debug: mockLogger.debug, error: mockLogger.error}}
     * @private
     */
    var mockLogger = {
        info: function (msg) {
            infoMsg = msg;
        },
        debug: function (msg) {
            debugMsg = msg;
        },
        error: function (msg) {
            errorMsg = msg;
        }
    };

    var mockLoggerWithoutDebugFunction = {
        info: function (msg) {
            infoMsg = msg;
        },
        error: function (msg) {
            errorMsg = msg;
        }
    };

    var mockLoggerWithVerboseFunction = {

        info: function (msg) {
            verboseResultArray.push(msg);
        }
    };



    describe('Testing LogWrapper with mockLogger', function () {

        /**
         * Resets the mock logger message targets.
         */
        beforeEach(function () {
            infoMsg = undefined;
            debugMsg = undefined;
            errorMsg = undefined;
            logWrapper = new LogWrapper(mockLogger);
        });

        var expected = INFO;
        it('should log with ' + expected, function (done) {
            logWrapper.info(expected);
            assert.equal(infoMsg, expected, 'logger message should contain value ' + expected);
            done();
        });

        expected = DEBUG;
        it('should log with ' + expected, function (done) {
            logWrapper.debug(expected);
            assert.equal(debugMsg, expected, 'logger message should contain value ' + expected);
            done();
        });

        expected = ERROR;
        it('should log with ' + expected, function (done) {
            logWrapper.error(expected);
            assert.equal(errorMsg, expected, 'logger message should contain value ' + expected);
            done();
        });

        var verboseExpected = {
            origin: 'origin',
            target: 'target',
            src: 'src',
            dest: 'dest',
            indent: 'indent'
        };

        it('should log options', function (done) {
            logWrapper = new LogWrapper(mockLoggerWithVerboseFunction);
            logWrapper.verboseOptions(verboseExpected)
                .then(function (options) {
                    assert.equal(options, verboseExpected, 'passed options: ' + JSON.stringify(options, null, 4) + ' should equal logged options: ' + JSON.stringify(verboseExpected, null, 4));
                    assert(verboseResultArray.indexOf('origin: ' + verboseExpected.origin) > -1, 'logger verboseResultArray should contain value ' + 'origin: ' + verboseExpected.origin);
                    assert(verboseResultArray.indexOf('target: ' + verboseExpected.target) > -1, 'logger verboseResultArray should contain value ' + 'target: ' + verboseExpected.target);
                    assert(verboseResultArray.indexOf('src:    ' + verboseExpected.src)    > -1, 'logger verboseResultArray should contain value ' + 'src:    ' + verboseExpected.src);
                    assert(verboseResultArray.indexOf('dest:   ' + verboseExpected.dest)   > -1, 'logger verboseResultArray should contain value ' + 'dest:   ' + verboseExpected.dest);
                    assert(verboseResultArray.indexOf('indent: ' + verboseExpected.indent) > -1, 'logger verboseResultArray should contain value ' + 'indent: ' + verboseExpected.indent);
                    done();
                })
                .catch(function (err) {
                    done(err);
                });
        });

    });

    describe('Testing LogWrapper with mockLoggerWithoutDebugFunction', function () {

        /**
         * Resets the mock logger message targets.
         */
        beforeEach(function () {
            infoMsg = undefined;
            debugMsg = undefined;
            errorMsg = undefined;
            logWrapper = new LogWrapper(mockLoggerWithoutDebugFunction);
        });

        var expected = INFO;
        it('should log with ' + expected, function (done) {
            logWrapper.info(expected);
            assert.equal(infoMsg, expected, 'logger message should contain value ' + expected);
            done();
        });

        expected = DEBUG;
        it('should log with ' + expected, function (done) {
            logWrapper.debug(expected);
            assert.equal(infoMsg, expected, 'logger message should contain value ' + expected);
            done();
        });

        expected = ERROR;
        it('should log with ' + expected, function (done) {
            logWrapper.error(expected);
            assert.equal(errorMsg, expected, 'logger message should contain value ' + expected);
            done();
        });

    });

});
