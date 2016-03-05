'use strict';

var Transformer = require('../index.js');
var Constants = require('../lib/constants.js');
var assert = require('assert');
var fs = require('fs');
var Promise = require('bluebird');

describe('Testing Transformer transforming from JS to JSON', function () {

    it('should alter property', function (done) {

        var EXPECTED_NEW_VALUE = 'new value';
        var middleware = function (json) {
            json.myproperty = EXPECTED_NEW_VALUE;
            return Promise.resolve(json);
        };

        var DEST = './test/tmp/test.json';

        var options = {
            src: './test/data/test.yaml',
            dest: DEST,
            target: Constants.JSON
        };

        var transformer = new Transformer(options);

        return transformer.yamlToJs(middleware)
            .then(function (msg){
                console.log(msg);
                var stats = fs.statSync(DEST);
                assert(stats.isFile());
                var json = JSON.parse(fs.readFileSync(DEST));
                assert.equal(json.myproperty, EXPECTED_NEW_VALUE, 'Altered JSON property should have new value \'' + EXPECTED_NEW_VALUE +'\'.');
                done();
            })
            .catch(function (err) {
                console.error(err.stack);
                //assert.fail(err);
                done(err)
            });
    });
});
