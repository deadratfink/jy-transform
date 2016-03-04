'use strict';

var Constants = require('./constants.js');
var Promise = require('bluebird');
var serializeJs = require('serialize-js');
var jsYaml = require('js-yaml');
var mkdirp = require('mkdirp-then');
var path = require('path');
var fs = Promise.promisifyAll(require('fs'));
var os = require('os');


///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

var self;

/**
 * Constructs the transformer with options and an (optional) logger.
 *
 * @param options {{target: string, src: string, dest: string, indent: number}}
 *        the transformation options
 * @param logger {logger|cli|console} (optional) logger, default is <tt>console</tt>
 * @returns {Transformer} the instance
 * @constructor
 */
var Transformer = function (options, logger) {
    this.logger = logger || console;
    self = this;

    /**
     * Info logging.
     *
     * @param msg {string} the message to print on CLI
     * @private
     */
    var info = function (msg) {
        self.logger.info(msg);
    };

    /**
     * Debug logging (for CLI: enabled by <tt>--debug</tt> option).
     *
     * @param msg {string} the message to print
     * @private
     */
    this.debug = function (msg) {
        if (this.logger.debug && typeof this.logger.debug === 'function') {
            this.logger.debug(msg);
        } else {
            info(msg);
        }
    };

    /**
     * Fatal CLI printing.
     *
     * @param msg {string} the message to print
     * @private
     */
    var fatal = function (msg) {
        self.logger.error('////////////////////////////////////////////////////////////////////////////////');
        self.logger.error(msg);
        self.logger.error('////////////////////////////////////////////////////////////////////////////////');
        if (typeof self.logger.getUsage === 'function') {
            self.logger.getUsage(1);
        }
        if (typeof self.logger.fatal === 'function') {
            self.logger.fatal('Process exit');
        }
    };

    // complain about missing source file
    if (!options.src) {
        fatal('Pls specify existing input YAML file!');
    }

    // check for existing source file
    try {
        fs.lstatSync(options.src);
    } catch (err) {
        if (err.code == 'ENOENT') {
            fatal('The input file \'' + options.src + '\' does not exists or is not accessible, pls specify correct input file path, cause: ' + err.stack);
        } else {
            fatal('Some error occurred while accessing input file \'' + options.src + '\': ' +  err.code + ', ' + err.stack);
        }
    }

    this.options = {};
    this.options.src = options.src;
    this.options.dest = options.dest || Constants.DEFAULT_OPTIONS.dest;

    /**
     *
     * @returns {string}
     * @private
     */
    function getDestFileExtension() {
        var destExt = '.';
        if (options.target === Constants.YAML) {
            destExt = destExt + Constants.YAML;
        } else {
            destExt = destExt + (options.target === Constants.JS
                        ? Constants.JS
                        : Constants.JSON
                );
        }
        return destExt;
    }

    /**
     * This method ensures that destination file path is created if not set in
     * options. If not then it creates the path relative to the source file using
     * its name and appending a proper extension depending on the <tt>json</tt>
     * property of <tt>options</tt> (if true then '.js', else '.json').
     *
     * @private
     */
    var ensureDest = function () {
        if (self.options.dest === Constants.DEFAULT_OPTIONS.dest) {
            var destExt = getDestFileExtension();
            var destDirName = path.dirname(self.options.src);
            var srcExt = path.extname(self.options.src);
            var destName = path.basename(self.options.src, srcExt);
            self.options.dest = path.join(destDirName, destName + destExt);
        }
    };

    // ensure a destination
    ensureDest();
    this.debug('Destination file: ' + this.options.dest);
    this.debug('invalidTarget: ' + (Constants.TYPES.indexOf(options.target) < 0));

    var invalidTarget = function () {
        return (Constants.TYPES.indexOf(options.target) < 0);
    };

    if (invalidTarget === true) {
        fatal('Invalid target \'' + options.target + '\' found, must be one of ' + JSON.stringify(Constants.TYPES));
    }

    this.options.target = options.target || Constants.DEFAULT_OPTIONS.target;

    this.options.indent = options.indent || Constants.DEFAULT_OPTIONS.indent;
    if (this.options.indent && (this.options.indent < 0)) {
        this.options.indent = this.options.target === YAML ? 1 : 0;
        info('Invalid indent \'' + options.indent + '\' found, reset to \'' + this.options.indent + '\'');
    } else if (this.options.indent && this.options.indent > 8) {
        this.options.indent = 8;
        info('Invalid indent \'' + options.indent + '\' found, reset to \'' + this.options.indent + '\'');
    }

    // verbose info
    info('target: ' + this.options.target);
    info('src:    ' + this.options.src);
    info('dest:   ' + this.options.dest);
    info('indent: ' + this.options.indent);

    return this;
};

Transformer.prototype.constructor = Transformer;

///////////////////////////////////////////////////////////////////////////////
// METHODS (PRIVATE)
///////////////////////////////////////////////////////////////////////////////

/**
 * Writes a JSON object to a *.json file.
 *
 * @param json {object} the JSON to write into *.json file
 * @public
 */
Transformer.prototype.writeJson = function (json) {
    var serializedJson = JSON.stringify(json, null, this.options.indent) + os.EOL;
    return this.write(serializedJson);
};

/**
 * Writes a JSON object to a *.js file.
 *
 * @param json {object} the JSON to write into *.js file
 * @public
 */
Transformer.prototype.writeJs = function (json) {
    var serializedJson = 'module.exports = ' + serializeJs.serialize(json, {indent: self.options.indent}) + ';' + os.EOL;
    return this.write(serializedJson);
};

/**
 * Writes a serialized JSON object to file.
 *
 * @param serializedJson {string} the JSON string to write into file
 * @public
 */
Transformer.prototype.write = function (serializedJson) {
    var destDir = path.dirname(this.options.dest);
    this.debug('Destination dir: ' + destDir);
    return mkdirp(destDir)
        .then(function() {
            self.debug('Destination dir ' + destDir + ' successfully written');
            return fs.writeFileAsync(self.options.dest, serializedJson, 'utf8');
        })
        .catch(function(err) {
            throw err;
        });
};

Transformer.prototype.readJson = function () {
    //return fs.readFileAsync(self.options.src);
    //if (self.options.target === constants.JSON) {
    //    return fs.readFileAsync(self.options.src, 'utf8')
    //        .then(function (json) {
    //            console.log('JSON: ' + json)
    //            return Promise.resolve(JSON.parse(json));
    //        });
    //} else {
        return Promise.resolve(require(self.options.src));
    //}
};

/**
 * Ensure that the given middleware Promise is a function if set.
 * If not set a new 'dummy' Promise is returned which simply passes
 * a JSON object.
 *
 * @param middleware {undefined|Promise}
 * @returns {Promise} the given Promise or a new 'dummy' Promise
 * @private
 */
function ensureMiddleware(middleware) {
    if (middleware && typeof middleware !== 'function') {
        throw new Error('The provided middleware is not a Function type');
    } else if (!middleware) {
        // create a dummy
        middleware = function (json) {
            return Promise.resolve(json);
        }
    }
    return middleware;
}

///////////////////////////////////////////////////////////////////////////////
// API METHODS (PUBLIC)
///////////////////////////////////////////////////////////////////////////////

/**
 * Convert YAML file to JSON/JS file.
 *
 * @public
 */
Transformer.prototype.yamlToJs = function (middleware) {

    // load source from YAML file
    return fs.readFileAsync(this.options.src, 'utf8')
        .then(function(yaml) {
            self.debug('YAML loaded from ' + self.options.src);
            return Promise.resolve().then(function () {
                return jsYaml.safeLoad(yaml);
            });
        })
        .then(ensureMiddleware(middleware))
        .then(function (json) {
            // write JSON or JS
            self.debug('JSON loaded: ' + json);
            if (self.options.target === Constants.JSON) {
                return self.writeJson(json)
                    .then(function () {
                        return Promise.resolve('Writing JSON file \'' + self.options.dest + '\' successful.');
                    })
                    .catch(function (err) {
                        err.message = 'Could not write JSON file \'' + self.options.dest + '\', cause: ' + err.message;
                        throw err;
                    });
            } else {
                return self.writeJs(json)
                    .then(function () {
                        return Promise.resolve('Writing JS file \'' + self.options.dest + '\' successful.');
                    })
                    .catch(function (err) {
                        err.message = 'Could not write JS file \'' + self.options.dest + '\', cause: ' + err.message;
                        throw err;
                    });
            }
        });
};

/**
 * Convert JSON/JS file to YAML file.
 *
 * @param middleware {Function} this middleware Promise can be used to intercept
 *        the JSON object and inject transformations, the function signature is:
 *        <p>
 *        <tt>function(json)</tt>
 *        </p>
 *        The Promise has to return the processed JSON!
 * @public
 */
Transformer.prototype.jsToYaml = function (middleware) {

    // we can read JS as well as pure JSON with require
    return this.readJson()
        //.then(ensureMiddleware(middleware))
        .then(function(json) {
            self.debug('JSON loaded from ' + self.options.dest);
            return Promise.resolve(jsYaml.safeDump(json, {indent: self.options.indent, noRefs: true}));
        })
        .then(function (yaml) {
            return fs.writeFileAsync(self.options.dest, yaml);
        })
        .then(function () {
            return Promise.resolve('WritingYAML file \'' + self.options.dest + '\' successful.');
        })
        .catch(function (err) {
            err.message = 'Could not write YAML file \'' + self.options.dest + '\', cause: ' + err.message;
            throw err;
        });

};

module.exports = Transformer;
