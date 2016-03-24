'use strict';

var assert = require('assert');
var YAMLException = require('js-yaml/lib/js-yaml/exception.js');
var fs = require('fs');
var Reader = require('../index.js').Reader;
var logger;
var reader;

/**
 * @classdescription This unit test suite checks the validity and correctness of {@link Reader} class.
 */
describe('Executing \'jy-transform\' project Reader test suite.', function () {

    /**
     * Init the test logger and Reader.
     */
    before(function () {
        logger = require('./logger.js');
        reader = new Reader(logger);
    });

    describe('Testing Reader.readJs(...)', function () {

        it('should read JS from file', function (done) {
            reader.readJs('./test/data/test-data.js')
                .then(function (json) {
                    assert.notEqual(json, null);
                    assert.equal(json.myproperty, 'old value');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should read JSON from file', function (done) {
            reader.readJs('./test/data/test-data.json')
                .then(function (json) {
                    assert.notEqual(json, null);
                    assert.equal(json.myproperty, 'old value');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should read JS from object', function (done) {
            reader.readJs({
                    test: 'value'
                })
                .then(function (json) {
                    assert.notEqual(json, null);
                    assert.equal(json.test, 'value');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should read JSON from stream', function (done) {
            var readStream = fs.createReadStream('./test/data/test-data.json');
            reader.readJs(readStream)
                .then(function (json) {
                    assert.notEqual(json, null);
                    assert.equal(json.myproperty, 'old value');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should read corrupted JSON from file path and fail by TypeError', function (done) {
            reader.readJs('./test/data/test-data-corrupted.json')
                .then(function (json) {
                    done(new Error('SyntaxError expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err.stack);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof SyntaxError, 'expected Error should equal SyntaxError, was: ' + (typeof err));
                    done();
                });
        });

        it('should read invalid JSON from file path and fail by SyntaxError', function (done) {
            reader.readJs('./test/data/test-data-wrong-syntax.json')
                .then(function (json) {
                    done(new Error('SyntaxError expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof SyntaxError, 'expected Error should equal SyntaxError, was: ' + (typeof err));
                    done();
                });
        });

        it('should read corrupted JSON from stream and fail by TypeError', function (done) {
            var readStream = fs.createReadStream('./test/data/test-data-corrupted.json');
            reader.readJs(readStream)
                .then(function (json) {
                    done(new Error('SyntaxError expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err.stack);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof SyntaxError, 'expected Error message should equal SyntaxError, was: ' + (typeof err));
                    done();
                });
        });

        it('should read invalid JSON from stream and fail by SyntaxError', function (done) {
            var readStream = fs.createReadStream('./test/data/test-data-wrong-syntax.json');
            reader.readJs(readStream)
                .then(function (json) {
                    done(new Error('SyntaxError expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof SyntaxError, 'expected Error should equal SyntaxError, was: ' + (typeof err));
                    done();
                });
        });


        it('should fail JS(ON) read by missing input src', function (done) {
            reader.readJs()
                .then(function (json) {
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error, 'expected Error should equal Error, was: ' + (typeof err));
                    done();
                });
        });

    });

    describe('Testing Reader.readYaml(...)', function () {

        it('should read YAML from file', function (done) {
            reader.readYaml('./test/data/test-data.yaml')
                .then(function (json) {
                    assert.notEqual(json, null);
                    assert.equal(json.myproperty, 'old value');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should read JS from object', function (done) {
            reader.readYaml({
                    test: 'value'
                })
                .then(function (json) {
                    assert.notEqual(json, null);
                    assert.equal(json.test, 'value');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should read JSON from stream', function (done) {
            var readStream = fs.createReadStream('./test/data/test-data.yaml');
            reader.readYaml(readStream)
                .then(function (json) {
                    assert.notEqual(json, null);
                    assert.equal(json.myproperty, 'old value');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should read invalid YAML from file path and fail by SyntaxError', function (done) {
            reader.readYaml('./test/data/test-data-wrong-syntax.yaml')
                .then(function (json) {
                    done(new Error('YAMLException expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof YAMLException, 'expected Error should equal YAMLException, was: ' + (typeof err));
                    done();
                });
        });

        it('should read invalid YAML from stream and fail by SyntaxError', function (done) {
            var readStream = fs.createReadStream('./test/data/test-data-wrong-syntax.yaml');
            reader.readYaml(readStream)
                .then(function (json) {
                    done(new Error('YAMLException expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof YAMLException, 'expected Error message should equal YAMLException, was: ' + (typeof err));
                    done();
                });
        });

        it('should fail YAML read by missing input src', function (done) {
            reader.readYaml()
                .then(function (json) {
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error, 'expected Error should equal Error, was: ' + (typeof err));
                    done();
                });
        });

    });
});
