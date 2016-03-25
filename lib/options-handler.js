'use strict';

var Constants = require('./constants.js');
var LogWrapper = require('./log-wrapper.js');
var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var isStream = require('is-stream');

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the `OptionsHandler` with an (optional) logger.
 *
 * @param {(logger|cli|console)} [logger=console] - Logger object.
 * @returns {OptionsHandler} The instance.
 * @constructor
 * @class Class which defines some useful methods to initialize and prepare the
 *        transformation options used in this module.
 *        <p>
 *        **NOTE:** This class is not to be intended to be called from
 *        outside this module!
 * @example
 * var OptionsHandler = require('./options-handler.js');
 * var logger = ...;
 *
 * var optionsHandler = new OptionsHandler(logger);
 */
function OptionsHandler(logger) {
    /**
     * The logger instance.
     *
     * @member {(logger|cli|console)}
     * @private
     */
    this.logInstance = new LogWrapper(logger);

    var self = this;

    /**
     * Gets a file extension for a given output target.
     *
     * @param {Options} options - The configuration for a transformation.
     * @returns {Promise} - A Promise containing a proper file extension (including '.', e.g. _'.yaml'_).
     * @private
     */
    function getDestFileExt(options) {
        return new Promise(function (resolve, reject) {
            var dot = '.';
            switch (options.target) {
                case Constants.YAML:
                    return resolve(dot + Constants.YAML);
                case Constants.JS:
                    return resolve(dot + Constants.JS);
                case Constants.JSON:
                    return resolve(dot + Constants.JSON);
                default:
                    return reject(new Error('Invalid target option found while creating destination file extension: ' + options.target));
            }
        });
    }

    /**
     * Checks if the given type is a valid one.
     *
     * @param {string} type - One of `[ 'yaml' | 'json' | 'js']`.
     * @returns {boolean}   - `true` if is valid type, else `false`.
     * @see {@link Constants#TYPES}
     * @private
     */
    function isValidType(type) {
        return (Constants.TYPES.indexOf(type) >= 0);
    }

    /**
     * Ensure that an origin or target is correct.
     *
     * @param {Options} options - The configuration for a transformation.
     * @param type - The origin or target value.
     * @param typeName - The type name.
     * @returns {Promise} - A Promise containing the passed `options` object.
     * @private
     */
    function ensureType(options, type, typeName) {
        return new Promise(function (resolve, reject) {
            if (isValidType(type)) {
                resolve(options);
            } else {
                reject(new Error('Invalid ' + typeName + ' \'' + type + '\' found, must be one of ' + JSON.stringify(Constants.TYPES)));
            }
        });
    }

    /**
     * A simple map for extensions to type.
     *
     * @type {{yml: string, yaml: string, js: string, json: string}}
     * @private
     */
    var typeMap = {
        yml: Constants.YAML,
        yaml: Constants.YAML,
        js: Constants.JS,
        json: Constants.JSON
    };

    /**
     * Infer from path extension to a type using default value as fallback.
     *
     * @param {string} pathStr      - The file path with or without extension.
     * @param {boolean} origin      - If the type is origin (true) or target (false)
     * @param {string} defaultValue - The default value to use if it cannot inferred from path.
     * @returns {string}            - A type value.
     * @private
     */
    function getTypeFromFilePath(pathStr, origin, defaultValue) {
        var ext = path.extname(pathStr);
        self.logInstance.debug('extension: ' + ext);
        if (ext.charAt(0) === '.') {
            ext = ext.substr(1);
        }

        var type = typeMap[ext];
        if (!type) {
            self.logInstance.info('cannot resolve ' + (origin ? 'origin' : 'target') + ' type from file ' + pathStr + ', using default: ' + defaultValue);
            type = defaultValue;
        }
        return type;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // OPTIONS INIT & VALIDATION METHODS
    ///////////////////////////////////////////////////////////////////////////////


    /**
     * Completes the given `options` object by enriching from default values or using
     * type inference if something required is "missing" (a missing `options.src` cannot
     * be completed becaue this is mandatory).
     *
     * @param {Options} options - The configuration for a transformation.
     * @returns {Promise} - A Promise containing the passed `options` object.
     * @throws {Error}    - If options are not passed.
     * @example
     * var OptionsHandler = require('./options-handler.js');
     * var logger = ...;
     * var options = {...};
     * var optionsHandler = new OptionsHandler(logger);
     *
     * optionsHandler.completeOptions(options)
     *     .then(function (copiedOptions) {
     *         ...
     *     });
     * @private
     */
    this.completeOptions = function (options) {
        return new Promise(function (resolve, reject) {
            if (options) {
                var srcType;
                var destType;
                if (options.src && (typeof options.src === 'string')) {
                    srcType = getTypeFromFilePath(options.src, true, Constants.YAML);
                }
                self.logInstance.debug('srcType: ' + srcType);
                if (options.dest && (typeof options.dest === 'string')) {
                    self.logInstance.debug('options.dest: ' + options.dest);
                    destType = getTypeFromFilePath(options.dest, false, Constants.JS);
                }
                self.logInstance.debug('destType: ' + destType);

                options.origin = (options.origin && (options.origin !== Constants.ORIGIN_DEFAULT)) ? options.origin : (srcType || Constants.YAML);
                options.target = (options.target && (options.target !== Constants.TARGET_DEFAULT)) ? options.target : (destType || Constants.JS);
                options.dest = options.dest || Constants.DEFAULT_OPTIONS.dest;
                options.indent = options.indent || Constants.DEFAULT_OPTIONS.indent;
                resolve(options);
            } else {
                reject(new Error('Missing options object.'));
            }
        });
    };

    /**
     * Ensures that the given input source is valid.
     *
     * @param {Options} options - The configuration for a transformation.
     * @returns {Promise} - A Promise containing the passed `options` object.
     * @throws {Error}    - If the `options.src` is not defined or the file represented by `options.src` does not exist.
     * @example
     * var OptionsHandler = require('./options-handler.js');
     * var logger = ...;
     * var options = {...};
     * var optionsHandler = new OptionsHandler(logger);
     *
     * optionsHandler.ensureSrc(options)
     *     .then(function (ensuredOptions) {
     *         ...
     *     });
     * @private
     */
    this.ensureSrc = function (options) {
        return new Promise(function (resolve, reject) {

            // complain about missing source file
            if (!options.src) {
                return reject(new Error('missing options.src: pls specify existing input source!'));
            }

            if (typeof options.src === 'string') {
                self.logInstance.debug('options.src is File path: ' + options.src);
                // check for existing source file
                try {
                    fs.lstatSync(options.src); // TODO could we check this in Async mode?
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        err.message = 'The input file \'' + options.src + '\' does not exists or is not accessible, pls specify correct input file path, cause: ' + err.message;
                    } else {
                        err.message = 'Some error occurred while accessing input file \'' + options.src + '\': ' + err.code + ', ' + err.message;
                    }
                    return reject(err);
                }
            } else if (isStream.readable(options.src)) {
                self.logInstance.debug('options.src is Readable stream');
                if (!options.origin) {
                    reject(new Error('When options.src is a Readable stream then setting options.origin is mandatory!'));
                }
            } else {
                self.logInstance.debug('options.src is JSON Object');
            }

            resolve(options);
        });
    };

    /**
     * This method ensures that destination file path is created if not set in
     * options. If not, then it creates the path relative to the source file using
     * its name and appending a proper extension depending on the `json`
     * property of `options` (if `true` then '.js', else '.json').
     *
     * @param {Options} options - The configuration for a transformation.
     * @returns {Promise}                           - A Promise containing the passed `options` object.
     * @example
     * var OptionsHandler = require('./options-handler.js');
     * var logger = ...;
     * var options = {...};
     * var optionsHandler = new OptionsHandler(logger);
     *
     * optionsHandler.ensureDest(options)
     *     .then(function (ensuredOptions) {
     *         ...
     *     });
     * @private
     */
    this.ensureDest = function (options) {
        if (options.dest === Constants.DEFAULT_OPTIONS.dest) {
            return getDestFileExt(options)
                .then(function (destExt) {
                    var destDirName = path.dirname(options.src);
                    var srcExt = path.extname(options.src);
                    var destName = path.basename(options.src, srcExt);
                    options.dest = path.join(destDirName, destName + destExt);
                    self.logInstance.debug('Destination file: ' + options.dest);
                    return options;//Promise.resolve(options);
                });
        } else if (isStream.writable(options.dest)) {
            self.logInstance.debug('options.dest is Writable stream');
            if (!options.target) {
                return Promise.reject(new Error('When options.dest is a Writable stream then setting options.target is mandatory!'));
            }
        } else {
            self.logInstance.debug('Destination file: ' + options.dest);
        }
        return Promise.resolve(options);
    };

    /**
     * Checks if the given origin is valid.
     *
     * @param {Options} options - The configuration for a transformation.
     * @returns {Promise} - A Promise containing the passed `options` object.
     * @example
     * var OptionsHandler = require('./options-handler.js');
     * var logger = ...;
     * var options = {...};
     * var optionsHandler = new OptionsHandler(logger);
     *
     * optionsHandler.ensureOrigin(options)
     *     .then(function (ensuredOptions) {
     *         ...
     *     });
     * @private
     */
    this.ensureOrigin = function (options) {
        return ensureType(options, options.origin, 'origin');
    };

    /**
     * Checks if the given target is valid.
     *
     * @param {Options} options - The configuration for a transformation.
     * @returns {Promise} - A Promise containing the passed `options` object.
     * @example
     * var OptionsHandler = require('./options-handler.js');
     * var logger = ...;
     * var options = {...};
     * var optionsHandler = new OptionsHandler(logger);
     *
     * optionsHandler.ensureTarget(options)
     *     .then(function (ensuredOptions) {
     *         ...
     *     });
     * @private
     */
    this.ensureTarget = function (options) {
        return ensureType(options, options.target, 'target');
    };

    /**
     * Checks if a valid indention value is given and corrects values if invalid (with default value: 4 SPACEs).
     * @param {Options} options - The configuration for a transformation.
     * @returns {Promise} - A Promise containing the passed `options` object.
     * @example
     * var OptionsHandler = require('./options-handler.js');
     * var logger = ...;
     * var options = {...};
     * var optionsHandler = new OptionsHandler(logger);
     *
     * optionsHandler.ensureIndent(options)
     *     .then(function (ensuredOptions) {
     *         ...
     *     });
     * @private
     */
    this.ensureIndent = function (options) {
        if (!options.indent) {
            options.indent = Constants.DEFAULT_INDENT;
        } else if ((options.indent < Constants.MIN_YAML_INDENT) && (options.target === Constants.YAML)) {
            self.logInstance.info('Invalid indent \'' + options.indent + '\' found for YAML, reset to default: ' + Constants.DEFAULT_INDENT);
            options.indent = Constants.DEFAULT_INDENT;
        } else if (options.indent < Constants.MIN_JSON_JS_INDENT) {
            self.logInstance.info('Invalid indent \'' + options.indent + '\' found, reset to default: ' + Constants.DEFAULT_INDENT);
            options.indent = Constants.DEFAULT_INDENT;
        } else if (options.indent > Constants.MAX_INDENT) {
            self.logInstance.info('Invalid indent \'' + options.indent + '\' found, reset to default: ' + Constants.DEFAULT_INDENT);
            options.indent = Constants.DEFAULT_INDENT;
        }
        self.logInstance.debug('options:: ' + JSON.stringify(options, null, 4));
        return Promise.resolve(options);
    };

    /**
     * Log the options with INFO level.
     *
     * @param {Options} options - The configuration for a transformation. The properties to log with INFO.
     * @returns {Promise} - A Promise containing the passed `options` object.
     * @example
     * var OptionsHandler = require('./options-handler.js');
     * var logger = ...;
     * var options = {...};
     * var optionsHandler = new OptionsHandler(logger);
     *
     * optionsHandler.verboseOptions(options)
     *     .then(function (loggedOptions) {
     *         ...
     *     });
     * @private
     */
    this.verboseOptions = function (options) {
        return self.logInstance.verboseOptions(options);
    };
}

OptionsHandler.prototype = {};
OptionsHandler.prototype.constructor = OptionsHandler;
module.exports = OptionsHandler;

/**
 * This method ensures that the options object is set with all necessary and
 * correct values. The method does not alter the given object, but creates
 * and fills a new instance from the given values and/or default ones.
 *
 * @param {Options} options - The configuration for a transformation.
 * @returns {Promise} - A Promise containing a new and complete `options` object.
 * @example
 * var OptionsHandler = require('./options-handler.js');
 * var logger = ...;
 * var options = {...};
 * var optionsHandler = new OptionsHandler(logger);
 *
 * optionsHandler.ensureOptions(options)
 *     .then(function (ensuredOptions) {
 *         ...
 *     });
 * @public
 */
OptionsHandler.prototype.ensureOptions = function (options) {
    return this.completeOptions(options)
        .then(this.ensureSrc)
        .then(this.ensureDest)
        .then(this.ensureOrigin)
        .then(this.ensureTarget)
        .then(this.ensureIndent)
        .then(this.verboseOptions);
};

/**
 * This method validates the transformation process described by the given
 * options and provides the validate and enriched options and according name
 * to resolve a proper function.
 *
 * @param {Options} options - The configuration for a transformation.
 * @returns {Promise} - A Promise containing the passed `options` object and a 'transformation' string in an array.
 * @example
 * var OptionsHandler = require('./options-handler.js');
 * var logger = ...;
 * var optionsHandler = new OptionsHandler(logger);
 *
 * optionsHandler.validateTransformation(options)
 *     .spread(function (validatedOptions, transformation) {
 *         ...
 *     )):
 * @see {@link transformations}
 * @public
 */
OptionsHandler.prototype.validateTransformation = function (options) {
    return new Promise(function (resolve, reject) {
        var transformation = options.origin + '2' + options.target;
        if (Constants.TRANSFORMATIONS.indexOf(transformation) < 0) {
            reject(new Error('Unsupported target type transformation \'' + options.origin + ' -> ' + options.target + '\' configured in options.'));
        } else {
            resolve([options, transformation]);
        }
    });
};
