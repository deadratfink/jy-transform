'use strict';

var assert = require('assert');
var YAMLException = require('js-yaml/lib/js-yaml/exception');
var fs = require('fs');
var Reader = require('../index').Reader;
var Constants = require('../index').constants;
var logger;
var reader;

/**
 * @classdesc This unit test suite checks the validity and correctness of {@link Reader} class.
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

        var exports = 'fooBar';
        var exportsNotExists = 'notFooBar';
        var invalidIdentifier = '#3/-';

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

        it('should read JS from file with options.imports == \'\'', function (done) {

            var options = {
                src: './test/data/test-data.js',
                imports: ''
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


        it('should read JS from file with options.imports == \'' + exports + '\'', function (done) {

            var options = {
                src: './test/data/test-imports.js',
                imports: exports
            };

            reader.readJs(options)
                .then(function (json) {
                    assert.notEqual(json, null, 'json should not be null, was: ' + JSON.stringify(json));
                    assert(!json.hasOwnProperty(exports), 'json should not have \'' + exports + '\' property, was: ' + JSON.stringify(json));
                    assert(!json.hasOwnProperty('bar'), 'json should not have \'bar\' property, was: ' + JSON.stringify(json[exports]));
                    assert(json.hasOwnProperty('foo'), 'json should have \'foo\' property, was: ' + JSON.stringify(json[exports]));
                    assert.equal(json.foo, 'bar');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should read JS from file with options.imports == \'' + exports + '\' and given origin for unsupported file extension', function (done) {

            var options = {
                src: './test/data/test-imports.txt',
                imports: exports,
                origin: Constants.JS
            };

            reader.readJs(options)
                .then(function (json) {
                    assert.notEqual(json, null, 'json should not be null, was: ' + JSON.stringify(json));
                    assert(!json.hasOwnProperty(exports), 'json should not have \'' + exports + '\' property, was: ' + JSON.stringify(json));
                    assert(!json.hasOwnProperty('bar'), 'json should not have \'bar\' property, was: ' + JSON.stringify(json[exports]));
                    assert(json.hasOwnProperty('foo'), 'json should have \'foo\' property, was: ' + JSON.stringify(json[exports]));
                    assert.equal(json.foo, 'bar');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should reject read JS from file with Error on invalid identifier for options.imports: ' + invalidIdentifier, function (done) {

            var options = {
                src: './test/data/test-imports.js',
                imports: invalidIdentifier
            };

            reader.readJs(options)
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

        it('should reject read JS from file with Error on non-existent identifier for options.imports: ' + exportsNotExists, function (done) {

            var options = {
                src: './test/data/test-imports.js',
                imports: exportsNotExists
            };

            reader.readJs(options)
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

        it('should read JS from object with options.imports == \'\'', function (done) {

            var options = {
                src: {
                    foo: 'bar'
                },
                imports: ''
            };

            reader.readJs(options)
                .then(function (json) {
                    assert.notEqual(json, null);
                    assert.equal(json.foo, 'bar');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should read JS from object with options.imports == \'' + exports + '\'', function (done) {

            var options = {
                src: {
                    fooBar: {
                        bar: 'foo',
                        foo: 'bar'
                    }
                },
                imports: exports
            };

            reader.readJs(options)
                .then(function (json) {
                    assert.notEqual(json, null, 'json should not be null, was: ' + JSON.stringify(json));
                    assert(!json.hasOwnProperty(exports), 'json should not have \'' + exports + '\' property, was: ' + JSON.stringify(json));
                    assert(json.hasOwnProperty('bar'), 'json should have \'bar\' property, was: ' + JSON.stringify(json[exports]));
                    assert(json.hasOwnProperty('foo'), 'json should have \'foo\' property, was: ' + JSON.stringify(json[exports]));
                    assert.equal(json.bar, 'foo');
                    assert.equal(json.foo, 'bar');
                    done();
                })
                .catch(function (err) {
                    logger.error(err.stack);
                    done(err);
                });
        });

        it('should reject read JS from object with Error on invalid identifier for options.imports: ' + invalidIdentifier, function (done) {

            var options = {
                src: {
                    fooBar: {
                        bar: 'foo',
                        foo: 'bar'
                    }
                },
                imports: invalidIdentifier
            };

            reader.readJs(options)
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

        it('should reject read JS from file with Error on non-existent identifier for options.imports: ' + exportsNotExists, function (done) {

            var options = {
                src: {
                    fooBar: {
                        bar: 'foo',
                        foo: 'bar'
                    }
                },
                imports: exportsNotExists
            };

            reader.readJs(options)
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
