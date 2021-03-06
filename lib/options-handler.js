'use strict';

var Constants = require('./constants');
var LogWrapper = require('./log-wrapper');
var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var isStream = require('is-stream');

/**
 * @typedef {object} Options
 * @property {string} [origin=yaml]                   - The origin type.
 * @property {string} [target=js]                     - The target type.
 * @property {(string|Readable|object)} src           - The source (`string` type is treated as a file path).
 * @property {(string|Writable|object)} [dest]        - The destination (`string` type is treated as a file path).
 * @property {number} [indent=4]                      - The indention in files.
 * @property {string} [imports=undefined]             - The exports name for reading from JS source file or objects only.
 * @property {string} [exports=undefined]             - The exports name for usage in JS destination files only.
 */

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the `OptionsHandler` with an (optional) logger.
 *
 * @param {(logger|cli|console)} [logger=console] - Logger instance.
 * @returns {OptionsHandler} The instance.
 * @constructor
 * @class Class which defines some useful methods to initialize and prepare the
 *        transformation options used in this module.
 *        <p>
 *        **NOTE:** This class is not to be intended to be called from
 *        outside this module!
 * @example
 * var OptionsHandler = require('./options-handler');
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
     * Get a file extension for a given output target.
     *
     * @param {Options} options - The configuration for a transformation.
     * @returns {Promise}       - A Promise containing a proper file extension (including '.', e.g. _'.yaml'_).
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
                    reject(new Error('Invalid target option found while creating destination file extension: ' + options.target));
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
     * Promise which asserts that an origin or target is correct. If correct it
     * resolved the passed `options` object, else if rejects with a `Error`.
     *
     * @param {Options} options - The configuration for a transformation.
     * @param {string} typeName - The type name.
     * @returns {Promise}       - A Promise containing the passed `options` object.
     * @private
     */
    function assertType(options, typeName) {
        return assertOptions(options, [typeName])
            .then(function (assertedOptions) {
                if (isValidType(assertedOptions[typeName])) {
                    return assertedOptions;
                } else {
                    return Promise.reject(new Error('Invalid ' + typeName + ' \'' + assertedOptions[typeName] + '\' found, must be one of ' + JSON.stringify(Constants.TYPES)));
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
     * @param {string} defaultValue - The default value to use if type cannot be inferred from path.
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
            self.logInstance.debug('cannot resolve ' + (origin ? 'origin' : 'target') + ' type from file ' + pathStr + ', using default: ' + defaultValue);
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
     * @returns {Promise}       - A Promise containing the passed `options` object.
     * @throws {Error}          - If `options` or `options.src` not passed.
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
     * @public
     */
    this.completeOptions = function (options) {
        return assertOptions(options, ['src'])
            .then(function (assertedOptions) {
                var srcType;
                var destType;
                if (assertedOptions.src) {
                    if (typeof assertedOptions.src === 'string') {
                        srcType = getTypeFromFilePath(assertedOptions.src, true, Constants.YAML);
                    } else if (typeof assertedOptions.src === 'object') {
                        srcType = Constants.JS;
                    } // TODO: what about stream?
                }
                self.logInstance.debug('srcType: ' + srcType);
                if (assertedOptions.dest && (typeof assertedOptions.dest === 'string')) {
                    self.logInstance.debug('options.dest: ' + assertedOptions.dest);
                    destType = getTypeFromFilePath(assertedOptions.dest, false, Constants.JS); // TODO: what about stream?
                }
                self.logInstance.debug('destType: ' + destType);

                assertedOptions.origin = (assertedOptions.origin && (assertedOptions.origin !== Constants.ORIGIN_DESCRIPTION)) ? assertedOptions.origin : (srcType || Constants.DEFAULT_ORIGIN);
                assertedOptions.target = (assertedOptions.target && (assertedOptions.target !== Constants.TARGET_DESCRIPTION)) ? assertedOptions.target : (destType || Constants.DEFAULT_TARGET);
                assertedOptions.dest = assertedOptions.dest || Constants.DEFAULT_OPTIONS.dest;
                assertedOptions.indent = assertedOptions.indent || Constants.DEFAULT_OPTIONS.indent;
                assertedOptions.force = assertedOptions.force || Constants.DEFAULT_OPTIONS.force;
                assertedOptions.imports = assertedOptions.imports || Constants.DEFAULT_OPTIONS.imports;
                assertedOptions.exports = assertedOptions.exports || Constants.DEFAULT_OPTIONS.exports;
                return assertedOptions;
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
     * @public
     */
    this.ensureSrc = function (options) {
        //return assertOptions(options, ['src'])
        //    .then(function (assertedOptions) {
        //        if (typeof assertedOptions.src === 'string') {
        //            self.logInstance.debug('options.src is to be verfied as File path: ' + assertedOptions.src);
        //            // check for existing source file
        //            try {
        //                var stats = fs.statSync(assertedOptions.src);
        //                if (stats.isDirectory()) {
        //                    return Promise.reject(new Error('Source file (options.src) is a directory, pls specify a valid file resource!'));
        //                }
        //            } catch (err) {
        //                err.message = 'Error occurred while checking input file \'' + assertedOptions.src + '\' which should be existing and accessible, code: ' + err.code + ', cause: ' + err.message;
        //                return Promise.reject(err);
        //            }
        //        } else if (isStream.readable(assertedOptions.src)) {
        //            self.logInstance.debug('options.src is Readable stream');
        //            if (!options.origin) {
        //                return Promise.reject(new Error('When options.src is a Readable stream then setting options.origin is mandatory!'));
        //            }
        //        } else {
        //            self.logInstance.debug('options.src is JSON Object');
        //        }
        //        return assertedOptions;
        //});

        return assertOptions(options, ['src'])
            .then(function (options) {
                return assertFileSrc(options);
            })
            .spread(function (checked, options) {
                if (!checked) {
                    return assertStreamSrc(options);
                }
                return [checked, options];
            })
            .spread(function (checked, options) {
                if (!checked) {
                    self.logInstance.debug('options.src is JSON Object');
                }
                return Promise.resolve(options);
            })
            .catch(function (err) {
                self.logInstance.error('options.src is unknown or invalid object: ' + options.src);
                return Promise.reject(err);
            });
    };

    function assertFileSrc(options) {
        return new Promise(function (resolve, reject) {
            if (typeof options.src === 'string') {
                self.logInstance.debug('options.src is to be verified as File path: ' + options.src);
                // check for existing source file
                try {
                    var stats = fs.statSync(options.src);
                    if (stats.isDirectory()) {
                        return reject(new Error('Source file (options.src) is a directory, pls specify a valid file resource!'));
                    }
                    return resolve([true, options]);
                } catch (err) {
                    err.message = 'Error occurred while checking input file \'' + options.src + '\' which should be existing and accessible, code: ' + err.code + ', cause: ' + err.message;
                    return reject(err);
                }
            } else {
                return resolve([false, options]);
            }
        });
    }

    function assertStreamSrc(options) {
        return new Promise(function (resolve, reject) {
            if (isStream.readable(options.src)) {
                self.logInstance.debug('options.src is Readable stream');
                if (!options.origin) {
                    return reject(new Error('when options.src is a Readable stream, then setting options.origin is mandatory!'));
                }
                return resolve([true, options]);
            } else {
                return resolve([false, options]);
            }
        });
    }

    /**
     * This method ensures that destination file path is created if not set in
     * options. If not, then it creates the path relative to the source file using
     * its name and appending a proper extension depending on the `json`
     * property of `options` (if `true` then '.js', else '.json').
     *
     * @param {Options} options - The configuration for a transformation.
     * @returns {Promise}       - A Promise containing the passed `options` object.
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
     * @public
     */
    this.ensureDest = function (options) {
        return assertOptions(options)
            .then(function (assertedOptions) {
                if (assertedOptions.dest === Constants.DEFAULT_OPTIONS.dest) {
                    return getDestFileExt(assertedOptions)
                        .then(function (destExt) {
                            var destDirName = path.dirname(assertedOptions.src);
                            var srcExt = path.extname(assertedOptions.src);
                            var destName = path.basename(assertedOptions.src, srcExt);
                            assertedOptions.dest = path.join(destDirName, destName + destExt);
                            self.logInstance.debug('Destination file: ' + assertedOptions.dest);
                            return assertedOptions;
                        });
                } else if (isStream.writable(assertedOptions.dest)) {
                    self.logInstance.debug('options.dest is Writable stream');
                    if (!assertedOptions.target) {
                        return Promise.reject(new Error('When options.dest is a Writable stream then setting options.target is mandatory!'));
                    }
                } else {
                    self.logInstance.debug('Destination file: ' + assertedOptions.dest);
                }
                return assertedOptions;
            });
    };

    /**
     * Checks if the given origin is valid.
     *
     * @param {Options} options - The configuration for a transformation.
     * @returns {Promise}       - A Promise containing the passed `options` object.
     * @example
     * var OptionsHandler = require('./options-handler.js');
     * var logger = ...;
     * var options = {...};
     * var optionsHandler = new OptionsHandler(logger);
     *
     * optionsHandler.assertOrigin(options)
     *     .then(function (ensuredOptions) {
     *         ...
     *     });
     * @public
     */
    this.assertOrigin = function (options) {
        return assertType(options, 'origin');
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
     * optionsHandler.assertTarget(options)
     *     .then(function (ensuredOptions) {
     *         ...
     *     });
     * @public
     */
    this.assertTarget = function (options) {
        return assertType(options, 'target');
    };

    /**
     * Checks if a valid indention value is given and corrects values if invalid (with default value: 4 SPACEs).
     * @param {Options} options - The configuration for a transformation.
     * @returns {Promise} - A Promise containing the passed `options` object.
     * @see {@link Constants#MIN_INDENT}
     * @see {@link Constants#DEFAULT_INDENT}
     * @see {@link Constants#MAX_INDENT}
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
     * @public
     */
    this.ensureIndent = function (options) {
        return assertOptions(options)
            .then(function (assertedOptions) {
                self.logInstance.trace('options before ensureIndent():: ' + JSON.stringify(assertedOptions, null, 4));
                if (assertedOptions.indent === undefined) {
                    self.logInstance.info('Missing indention, reset to default: ' + Constants.DEFAULT_INDENT);
                    assertedOptions.indent = Constants.DEFAULT_INDENT;
                } else if (assertedOptions.indent < Constants.MIN_INDENT) {
                    self.logInstance.info('Indention \'' + assertedOptions.indent + '\' is too narrow, reset to default: ' + Constants.DEFAULT_INDENT);
                    assertedOptions.indent = Constants.DEFAULT_INDENT;
                } else if (assertedOptions.indent > Constants.MAX_INDENT) {
                    self.logInstance.info('Indention \'' + assertedOptions.indent + '\' is too wide, reset to default: ' + Constants.DEFAULT_INDENT);
                    assertedOptions.indent = Constants.DEFAULT_INDENT;
                }
                self.logInstance.trace('options after ensureIndent():: ' + JSON.stringify(assertedOptions, null, 4));
                return assertedOptions;
            });
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
        return assertOptions(options)
            .then(function (assertedOptions) {
                return self.logInstance.verboseOptions(assertedOptions);
            });
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
        .then(this.assertOrigin)
        .then(this.assertTarget)
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
    return assertOptions(options, ['origin', 'target'])
        .then(function (assertedOptions) {
            return new Promise(function (resolve, reject) {
                var transformation = assertedOptions.origin + '2' + assertedOptions.target;
                if (Constants.TRANSFORMATIONS.indexOf(transformation) < 0) {
                    reject(new Error('Unsupported target type transformation \'' + assertedOptions.origin + ' -> ' + assertedOptions.target + '\' configured in options.'));
                } else {
                    resolve([assertedOptions, transformation]);
                }
            });
    });
};

/**
 * Asserts that the given `options` and (optionally) the given properties are
 * inside the options. If not, the Promise rejects with proper error message.
 *
 * @param {object} options        - The objects which should be set.
 * @param {string[]} [properties] - Properties which should exist in `options`.
 * @returns {Promise}             - Promise which contains the `options` as result.
 * @example
 * var options = {...};
 *
 * assertOptions(options, ['src', 'origin'])
 *     .then(function (assertedOptions) {
     *         ...
     *     });
 * @public
 */
OptionsHandler.prototype.assertOptions = assertOptions;

/**
 * Asserts that the given `options` and (optionally) the given properties are
 * inside the options. If not, the Promise rejects with proper error message.
 *
 * @param {object} options        - The objects which should be set.
 * @param {string[]} [properties] - Properties which should exist in `options`.
 * @returns {Promise}             - Promise which contains the `options` as result.
 * @example
 * var options = {...};
 *
 * assertOptions(options, ['src', 'origin'])
 *     .then(function (assertedOptions) {
     *         ...
     *     });
 * @private
 */
function assertOptions(options, properties) {
    return new Promise(function (resolve, reject) {
        if (!options) {
            return reject(new Error('missing options object!'));
        }
        if (properties && properties.length > 0) {
            var missing = [];
            properties.forEach(function (p) {
                if (!options[p]) {
                    missing.push('options.' + p);
                }
            });
            if (missing.length > 0) {
                return reject(new Error('missing options property(s): ' + JSON.stringify(missing) + '!'));
            }
        }
        resolve(options);
    });
}
