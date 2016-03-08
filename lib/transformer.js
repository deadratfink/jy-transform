'use strict';

var Constants = require('./constants.js');
var Writer = require('./writer.js');
var Reader = require('./reader.js');
var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');


///////////////////////////////////////////////////////////////////////////////
// VARIABLES
///////////////////////////////////////////////////////////////////////////////

/**
 * The internal `Writer` instance.
 *
 * @type {Writer}
 * @private
 */
var writer;

/**
 * The internal `Reader` instance.
 *
 * @type {Reader}
 * @private
 */
var reader;

/**
 * Internal `this` reference.
 *
 * @type {Transformer}
 * @private
 */
var self;

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the `Transformer` with options and an (optional) logger.
 *
 * @param logger {logger|cli|console} (optional) Logger, default is `console`.
 * @returns {Transformer} The instance.
 * @constructor
 * @class This class provides all methods usable to handle YAML, JSON and JS and
 *        their transformations.
 * @example
 * var logger = ...;
 * var Transformer = require('jy-transform');
 * var transformer = new Transformer(logger);
 */
var Transformer = function (logger) {

    /**
     * The logger instance.
     *
     * @member {logger|cli|console}
     */
    this.logger = logger || console;

    writer = new Writer(this.logger);
    reader = new Reader(this.logger);
    self = this;

    return this;
};

Transformer.prototype.constructor = Transformer;

///////////////////////////////////////////////////////////////////////////////
// LOGGER METHODS (PRIVATE)
///////////////////////////////////////////////////////////////////////////////

/**
 * Info logging.
 *
 * @param msg {string} The message to log.
 * @private
 */
function info(msg) {
    self.logger.info(msg);
}

/**
 * Debug logging.
 *
 * @param msg {string} The message to log.
 * @private
 */
function debug(msg) {
    if (self.logger.debug && typeof self.logger.debug === 'function') {
        self.logger.debug(msg);
    } else {
        info(msg);
    }
}

/**
 * Error logging.
 *
 * @param msg {string} The message to log.
 * @private
 */
function error(msg) {
    self.logger.error(msg);
}

/**
 * Log the options with INFO level.
 *
 * @param {{origin: string, target: string, src: string, dest: string, indent: number}} options
 * @returns A Promise containing the passed `options` object.
 * @private
 */
function verboseOptions(options) {
    // verbose info
    info('origin: ' + options.origin);
    info('target: ' + options.target);
    info('src:    ' + options.src);
    info('dest:   ' + options.dest);
    info('indent: ' + options.indent);
    return Promise.resolve(options);
}

///////////////////////////////////////////////////////////////////////////////
// INIT & VALIDATION METHODS (PRIVATE)
///////////////////////////////////////////////////////////////////////////////

/**
 * Ensure that the given middleware Promise is a function if set.
 * If not set a new 'dummy' Promise is returned which simply passes
 * a JSON object.
 *
 * @param middleware {Function} This middleware Promise can be used to intercept
 *        the JSON object for altering he passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        The Promise has to return the processed JSON!
 * @returns {Promise} the given Promise or a new 'dummy' Promise.
 * @throws {TypeError} Will throw this error when the passed `middleware`
 *         is not type of `Function`.
 * @private
 */
function ensureMiddleware(middleware) {
    if (middleware && typeof middleware !== 'function') {
        return Promise.reject(new TypeError('The provided middleware is not a Function type'));
    }
    if (!middleware) {
        // create a dummy
        middleware = function (json) {
            return Promise.resolve(json);
        };
    }
    return middleware;
}


/**
 * //TODO
 * @param options //TODO
 * @returns A Promise containing the passed `options` pbject and a 'transformation' string.
 * @private
 */
function validateTransformation(options) {
    return new Promise(function (resolve, reject) {
        var transformation = options.origin + '2' + options.target;
        if (Constants.TRANSFORMATIONS.indexOf(transformation) < 0) {
            reject(new Error('Unsupported target type transformation \'' + options.origin + ' -> ' + options.target + '\' configured in options.'));
        } else {
            resolve([options, transformation]);
        }
    });
}

/**
 * Copies the given `options` object and enriches with default values if
 * something required is "missing".
 *
 * @param options to copy
 * @returns A Promise containing the passed `options` object.
 * @private
 */
function copyOptions(options) {
    return new Promise(function (resolve, reject) {
        if (options) {
            resolve({
                origin: options.origin || Constants.DEFAULT_OPTIONS.target,
                target: options.target || Constants.DEFAULT_OPTIONS.origin,
                src: options.src,
                dest: options.dest || Constants.DEFAULT_OPTIONS.dest,
                indent: options.indent || Constants.DEFAULT_OPTIONS.indent
            });
        } else {
            reject(new Error('Missing options object.'));
        }
    });
}

/**
 * //TODO
 * @param options //TODO
 * @returns A Promise containing the passed `options` object.
 * @private
 */
function ensureSrc(options) {
    return new Promise(function (resolve, reject) {

        // complain about missing source file
        if (!options.src) {
            reject(new Error('Pls specify existing input YAML file!'));
        }

        // check for existing source file
        try {
            fs.lstatSync(options.src); // TODO could we check this in Async mode?
        } catch (err) {
            if (err.code === 'ENOENT') {
                err.message = 'The input file \'' + options.src + '\' does not exists or is not accessible, pls specify correct input file path, cause: ' + err.message;
            } else {
                err.message = 'Some error occurred while accessing input file \'' + options.src + '\': ' +  err.code + ', ' + err.message;
            }
            reject(err);
        }

        resolve(options);
    });
}

/**
 * // TODO
 * @param options //TODO
 * @returns A Promise containing a proper file extension (including '.', e.g. _'.yaml'_).
 * @private
 */
function getDestFileExt(options) {
    return new Promise(function (resolve, reject) {
        var destExt = '.';
        switch (options.target) {
            case Constants.YAML:
                return resolve(destExt + Constants.YAML);
            case Constants.JS:
                return resolve(destExt + Constants.JS);
            case Constants.JSON:
                return resolve(destExt + Constants.JSON);
            default:
                reject(new Error('Invalid target option found while creating destination file extension: ' + options.target));
        }
    });
}

/**
 * This method ensures that destination file path is created if not set in
 * options. If not, then it creates the path relative to the source file using
 * its name and appending a proper extension depending on the `json`
 * property of `options` (if `true` then '.js', else '.json').
 *
 * @param options {{src: string, dest: string}} The required options.
 * @return {string} The destination file path.
 * @private
 */
function ensureDest(options) {
    if (options.dest === Constants.DEFAULT_OPTIONS.dest) {
        return getDestFileExt(options)
            .then(function (destExt) {
                var destDirName = path.dirname(options.src);
                var srcExt = path.extname(options.src);
                var destName = path.basename(options.src, srcExt);
                options.dest = path.join(destDirName, destName + destExt);
                debug('Destination file: ' + options.dest);
                return Promise.resolve(options);
            });
    } else {
        debug('Destination file: ' + options.dest);
        return Promise.resolve(options);
    }
}

/**
 * Checks if the given type is a valid one.
 *
 * @param {string} type, one of [ 'yaml' | 'json' | 'js']
 * @returns {boolean} `true` if is valid type, else `false`.
 * @see {@link Constants#TYPES}
 * @private
 */
function isValidType(type) {
    return (Constants.TYPES.indexOf(type) >= 0);
}

/**
 * //TODO
 * @param options //TODO
 * @returns A Promise containing the passed `options` object.
 * @private
 */
function ensureOrigin(options) {
    return new Promise(function (resolve, reject) {
        if (isValidType(options.origin)) {
            resolve(options);
        } else {
            reject(new Error('Invalid origin \'' + options.origin + '\' found, must be one of ' + JSON.stringify(Constants.TYPES)));
        }
    });
}

/**
 * //TODO
 * @param options //TODO
 * @returns A Promise containing the passed `options` object.
 * @private
 */
function ensureTarget(options) {
    return new Promise(function (resolve, reject) {
        if (isValidType(options.target)) {
            resolve(options);
        } else {
            reject(new Error('Invalid target \'' + options.target + '\' found, must be one of ' + JSON.stringify(Constants.TYPES)));
        }
    });
}

/**
 * //TODO
 * @param options
 * @returns A Promise containing the passed `options` object.
 * @private
 */
function ensureIndent(options) {
    if (options.indent < (Constants.MIN_YAML_INDENT && options.target === Constants.YAML)) { // TODO seems to be buggy!
        info('Invalid indent \'' + options.indent + '\' found for YAML, reset to minumum: ' + Constants.MIN_YAML_INDENT);
        options.indent = Constants.MIN_YAML_INDENT;
    } else if (options.indent < 0) {
        info('Invalid indent \'' + options.indent + '\' found, reset to minumum: ' + Constants.MIN_JSON_JS_INDENT);
        options.indent = Constants.MIN_JSON_JS_INDENT;
    } else if (options.indent > Constants.MAX_INDENT) {
        info('Invalid indent \'' + options.indent + '\' found, reset to maximum: ' + Constants.MAX_INDENT);
        options.indent = Constants.MAX_INDENT;
    }
    return Promise.resolve(options);
}

/**
 * This method ensures that the options object is set with all necessary and
 * correct values. The method does not alter the given object, but creates
 * and fills a new instance from the given values and/or default ones.
 *
 * @param {{origin: string, target: string, src: string, dest: string, indent: number}} options The minimum configuration for a transformation.
 * @returns A Promise containing a new and complete `options` object.
 * @private
 */
function ensureOptions(options) {
    return copyOptions(options)
        .then(ensureSrc)
        .then(ensureDest)
        .then(ensureOrigin)
        .then(ensureTarget)
        .then(ensureIndent)
        .then(verboseOptions);
}

///////////////////////////////////////////////////////////////////////////////
// TRANSFORMATION METHODS (PRIVATE)
///////////////////////////////////////////////////////////////////////////////

/**
 * Convert YAML to JSON/JS file.
 *
 * @param options TODO
 * @param middleware {Function} This middleware Promise can be used to intercept
 *        the JSON object for altering he passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        The Promise has to return the processed JSON!
 * @returns {Promise} Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} Will throw this error when the passed `middleware`
 *         is not type of `Function`.
 * @throws {Error} Will throw plain error when writing to JSON/JS file failed due to any reason.
 * @private
 */
function yamlToJs(options, middleware) {
    var write = (options.target === Constants.JSON) ? writer.writeJson : writer.writeJs;
    // load source from YAML file
    return reader.readYaml(options.src)
        .then(ensureMiddleware(middleware))
        .then(function (json) {
            return write(json, options.dest, options.indent);
        });
}

/**
 * Convert JSON/JS to YAML file.
 *
 * @param options TODO
 * @param middleware {Function} This middleware Promise can be used to intercept
 *        the JSON object for altering the passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        The Promise has to return the processed JSON object!
 * @returns {Promise} Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} Will throw this error when the passed `middleware`
 *         is not type of `Function`.
 * @throws {Error} Will throw plain error when writing to YAML file failed due to any reason.
 * @private
 */
function jsToYaml(options, middleware) {
    return reader.readJs(options.src)
        .then(ensureMiddleware(middleware))
        .then(function (json) {
            return writer.writeYaml(json, options.dest, options.indent);
        });
}

/**
 * Convert JSON to JS file.
 *
 * @param options //TODO
 * @param middleware {Function} This middleware Promise can be used to intercept
 *        the JSON object for altering the passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        The Promise has to return the processed JSON object!
 * @private
 */
function jsonToJs(options, middleware) {
    return reader.readJs(options.src)
        .then(ensureMiddleware(middleware))
        .then(function (json) {
            return writer.writeJs(json, options.dest, options.indent);
        });
}

/**
 * Convert JS to JSON file.
 *
 * @param options // TODO
 * @param {Function} middleware This middleware Promise can be used to intercept
 *        the JSON object for altering the passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        The Promise has to return the processed JSON object!
 * @private
 */
function jsToJson(options, middleware) {
    return reader.readJs(options.src)
        .then(ensureMiddleware(middleware))
        .then(function (json) {
            return writer.writeJson(json, options.dest, options.indent);
        });
}

/**
 * Convert YAML to YAML file.
 *
 * @param options// TODO
 * @param {Function} middleware This middleware Promise can be used to intercept
 *        the JSON object for altering the passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        The Promise has to return the processed JSON object!
 * @private
 */
function yamlToYaml(options, middleware) {
    return reader.readYaml(options.src)
        .then(ensureMiddleware(middleware))
        .then(function (json) {
            return writer.writeYaml(json, options.dest, options.indent);
        });
}

/**
 * Convert JSON to JSON file.
 *
 * @param options // TODO
 * @param {Function} middleware This middleware Promise can be used to intercept
 *        the JSON object for altering the passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        The Promise has to return the processed JSON object!
 * @private
 */
function jsonToJson(options, middleware) {
    return reader.readJs(options.src)
        .then(ensureMiddleware(middleware))
        .then(function (json) {
            return writer.writeJson(json, options.dest, options.indent);
        });
}

/**
 * Convert JS to JS file.
 *
 * @param options // TODO
 * @param {Function} middleware This middleware Promise can be used to intercept
 *        the JSON object for altering the passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        The Promise has to return the processed JSON object!
 * @private
 */
function jsToJs(options, middleware) {
    return reader.readJs(options.src)
        .then(ensureMiddleware(middleware))
        .then(function (json) {
            return writer.writeJs(json, options.dest, options.indent);
        });
}

/**
 * A transformation name to internal function mapping.
 *
 * @type {{yaml2js: yamlToJs, yaml2json: yamlToJs, js2yaml: jsToYaml, json2yaml: jsToYaml, json2js: jsonToJs, js2json: jsToJson, yaml2yaml: yamlToYaml, json2json: jsonToJson, js2js: jsToJs}}
 * @private
 */
var transformations = {
    yaml2js: yamlToJs,
    yaml2json: yamlToJs,
    js2yaml: jsToYaml,
    json2yaml: jsToYaml,
    json2js: jsonToJs,
    js2json: jsToJson,
    yaml2yaml: yamlToYaml,
    json2json: jsonToJson,
    js2js: jsToJs
};

///////////////////////////////////////////////////////////////////////////////
// API METHOD (PUBLIC)
///////////////////////////////////////////////////////////////////////////////

/**
 * The entry method for all transformation accepting a configuration object and
 * an (optional) middleware function.
 *
 * @param options {{origin: string, target: string, src: string, dest: string, indent: number}}
 *        The transformation options.
 * @param middleware {Function} This middleware Promise can be used to intercept
 *        the JSON object for altering the passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        The Promise has to return the processed JSON!
 * @returns {Promise} Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} Will throw this error when the passed `middleware`
 *         is not type of `Function`.
 * @throws {Error} Will throw plain error when writing to file failed due to any reason.
 * @public
 * @example
 * var Transformer = require('jy-transform');
 * var transformer = new Transformer(logger);
 * var Promise = require('bluebird');
 * var logger = ...;
 * var options = {...};
 * var middleware = function (json) {
 *     json.myproperty = 'new value';
 *     return Promise.resolve(json);
 * };
 *
 * transformer.transform(options, middleware)
 *     .then(function (msg){
 *         logger.info(msg);
 *     })
 *     .catch(function (err) {
 *         logger.error(err.stack);
 *     });
 */
Transformer.prototype.transform = function (options, middleware) {
    return ensureOptions(options)
        .then(validateTransformation)
        .spread(function (copiedOptions, transformation) {
            debug('Calling transformation: ' + transformation);
            return transformations[transformation](copiedOptions, middleware);
        });
};

module.exports = Transformer;
