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
            var options = {
                src: './test/data/test-data.js'
            };
            reader.readJs(options)
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
            var options = {
                src: './test/data/test-data.json'
            };
            reader.readJs(options)
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
            var options = {
                src: {
                    test: 'value'
                }
            };
            reader.readJs(options)
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
            var options = {
                src: fs.createReadStream('./test/data/test-data.json')
            };
            reader.readJs(options)
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

        it('should read corrupted JSON from file path and fail by SyntaxError', function (done) {
            var options = {
                src: './test/data/test-data-corrupted.json'
            };
            reader.readJs(options)
                .then(function (json) {
                    assert.equal(json, null, 'json should be null due to expected exception, was: ' + JSON.stringify(json));
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
            var options = {
                src: './test/data/test-data-wrong-syntax.json'
            };
            reader.readJs(options)
                .then(function (json) {
                    assert.equal(json, null, 'json should be null due to expected exception, was: ' + JSON.stringify(json));
                    done(new Error('SyntaxError expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof SyntaxError, 'expected Error should equal SyntaxError, was: ' + (typeof err));
                    done();
                });
        });

        it('should read corrupted JSON from stream and fail by SyntaxError', function (done) {
            var options = {
                src: fs.createReadStream('./test/data/test-data-corrupted.json')
            };
            reader.readJs(options)
                .then(function (json) {
                    assert.equal(json, null, 'json should be null due to expected exception, was: ' + JSON.stringify(json));
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
            var options = {
                src: fs.createReadStream('./test/data/test-data-wrong-syntax.json')
            };
            reader.readJs(options)
                .then(function (json) {
                    assert.equal(json, null, 'json should be null due to expected exception, was: ' + JSON.stringify(json));
                    done(new Error('SyntaxError expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof SyntaxError, 'expected Error should equal SyntaxError, was: ' + (typeof err));
                    done();
                });
        });

        it('should fail JS(ON) read by missing options', function (done) {
            reader.readJs()
                .then(function (json) {
                    assert.equal(json, null, 'json should be null due to expected exception, was: ' + JSON.stringify(json));
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error, 'expected Error should equal Error, was: ' + (typeof err));
                    done();
                });
        });

        it('should fail JS(ON) read by missing options.src', function (done) {
            reader.readJs({})
                .then(function (json) {
                    assert.equal(json, null, 'json should be null due to expected exception, was: ' + JSON.stringify(json));
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
            var options = {
                src: './test/data/test-data.yaml'
            };
            reader.readYaml(options)
                .then(function (json) {
                    assert.notEqual(json, null, 'resulting json should not be null');
                    assert.equal(json.myproperty, 'old value');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should read JS from object', function (done) {
            var options = {
                src: {
                    test: 'value'
                }
            };
            reader.readYaml(options)
                .then(function (json) {
                    assert.notEqual(json, null, 'resulting json should not be null');
                    assert.equal(json.test, 'value');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should read YAML from stream', function (done) {
            var options = {
                src: fs.createReadStream('./test/data/test-data.yaml')
            };
            reader.readYaml(options)
                .then(function (json) {
                    assert.notEqual(json, null, 'resulting json should not be null');
                    assert.equal(json.myproperty, 'old value');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should read invalid YAML from file path and fail by YAMLException', function (done) {
            var options = {
                src: './test/data/test-data-wrong-syntax.yaml'
            };
            reader.readYaml(options)
                .then(function (json) {
                    assert.equal(json, null, 'json should be null due to expected exception, was: ' + JSON.stringify(json));
                    done(new Error('YAMLException expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof YAMLException, 'expected Error should equal YAMLException, was: ' + (typeof err));
                    done();
                });
        });

        it('should read invalid YAML from stream and fail by YAMLException', function (done) {
            var options = {
                src: fs.createReadStream('./test/data/test-data-wrong-syntax.yaml')
            };
            reader.readYaml(options)
                .then(function (json) {
                    assert.equal(json, null, 'json should be null due to expected exception, was: ' + JSON.stringify(json));
                    done(new Error('YAMLException expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof YAMLException, 'expected Error message should equal YAMLException, was: ' + (typeof err));
                    done();
                });
        });

        it('should fail YAML read by missing input options', function (done) {
            reader.readYaml()
                .then(function (json) {
                    assert.equal(json, null, 'json should be null due to expected exception, was: ' + JSON.stringify(json));
                    done(new Error('Error expected'));
                })
                .catch(function (err) {
                    logger.info('EXPECTED ERROR: ' + err);
                    assert.notEqual(err, null, 'err should not be null');
                    assert(err instanceof Error, 'expected Error should equal Error, was: ' + (typeof err));
                    done();
                });
        });

        it('should fail YAML read by missing options.src', function (done) {
            reader.readYaml({})
                .then(function (json) {
                    assert.equal(json, null, 'json should be null due to expected exception, was: ' + JSON.stringify(json));
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
