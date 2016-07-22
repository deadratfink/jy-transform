'use strict';

var assert = require('assert');
var Promise = require('bluebird');
var fs = require('fs');
var os = require('os');
var stringify = require('json-stringify-safe');
var stream = require('stream');
var Validator = require('../lib/validator');
var logger;
var validator;

/**
 * @classdesc This unit test suite checks validity and correctness.
 */
describe('Executing \'jy-transform\' project Writer test suite.', function () {

    /**
     * Init the test logger and Writer.
     */
    before(function () {
        logger = require('./logger.js');
        validator = new Validator(logger);
    });

    var nonStringIdentifier = {};
    it('should validate non-string identifier to false', function (done) {
        assert.equal(validator.validateIdentifier(nonStringIdentifier), false, 'validator should validate non-string identifier \'' + stringify(nonStringIdentifier) + '\' to false');
        done();
    });

    var invalidIdentifier = '#3/-';
    it('should validate invalid identifier \'' + invalidIdentifier + '\' to false', function (done) {
        assert.equal(validator.validateIdentifier(invalidIdentifier), false, 'validator should validate \'' + invalidIdentifier + '\' identifier to false');
        done();
    });

    var validIdentifier = 'bar';
    it('should validate \'' + validIdentifier + '\' identifier to true', function (done) {
        assert.equal(validator.validateIdentifier(validIdentifier), true, 'validator should validate \'' + validIdentifier + '\' identifier to true');
        done();
    });

});
