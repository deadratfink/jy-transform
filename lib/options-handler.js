'use strict';

var Constants = require('./constants.js');
var LogWrapper = require('./log-wrapper.js');
var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');

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
     * @param {{origin: string, target: string, src: string, dest: string, indent: number}} options -
     *        The minimum configuration for a transformation.
     * @returns A Promise containing a proper file extension (including '.', e.g. _'.yaml'_).
     * @private
     */
    var getDestFileExt = function (options) {
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
    };

    /**
     * Checks if the given type is a valid one.
     *
     * @param {string} type - One of `[ 'yaml' | 'json' | 'js']`.
     * @returns {boolean} `true` if is valid type, else `false`.
     * @see {@link Constants#TYPES}
     * @private
     */
    var isValidType = function (type) {
        return (Constants.TYPES.indexOf(type) >= 0);
    };

    /**
     * Ensure that an origin or target is correct.
     *
     * @param {{origin: string, target: string}} options - Contains the values.
     * @param type - The origin or target value.
     * @param typeName - The type name.
     * @returns {Promise}
     * @private
     */
    var ensureType = function (options, type, typeName) {
        return new Promise(function (resolve, reject) {
            if (isValidType(type)) {
                resolve(options);
            } else {
                reject(new Error('Invalid ' + typeName + ' \'' + type + '\' found, must be one of ' + JSON.stringify(Constants.TYPES)));
            }
        });
    };

    ///////////////////////////////////////////////////////////////////////////////
    // OPTIONS INIT & VALIDATION METHODS
    ///////////////////////////////////////////////////////////////////////////////


    /**
     * Copies the given `options` object and enriches with default values if
     * something required is "missing".
     *
     * @param options  - The object to copy.
     * @returns {Promise} A Promise containing the passed `options` object.
     * @throws {Error} - If options are not passed.
     * @private
     */
    this.copyOptions = function (options) {
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
    };

    /**
     * Ensures that the given input source is valid.
     *
     * @param {{origin: string, target: string, src: string, dest: string, indent: number}} options -
     *        The minimum configuration for a transformation.
     * @returns {Promise} A Promise containing the passed `options` object.
     * @throws {Error} - If the `options.src` is not defined or the file represented by `options.src` does not exist.
     * @private
     */
    this.ensureSrc = function (options) {
        return new Promise(function (resolve, reject) {

            // complain about missing source file
            if (!options.src) {
                reject(new Error('Pls specify existing input file!'));
            }

            // check for existing source file
            try {
                fs.lstatSync(options.src); // TODO could we check this in Async mode?
            } catch (err) {
                if (err.code === 'ENOENT') {
                    err.message = 'The input file \'' + options.src + '\' does not exists or is not accessible, pls specify correct input file path, cause: ' + err.message;
                } else {
                    err.message = 'Some error occurred while accessing input file \'' + options.src + '\': ' + err.code + ', ' + err.message;
                }
                reject(err);
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
     * @param {{src: string, dest: string}} options - The required options.
     * @returns {Promise} A Promise containing the passed `options` object.
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
                    return Promise.resolve(options);
                });
        } else {
            self.logInstance.debug('Destination file: ' + options.dest);
            return Promise.resolve(options);
        }
    };

    /**
     * Checks if the given origin is valid.
     *
     * @param {{origin: string, target: string, src: string, dest: string, indent: number}} options -
     *        The minimum configuration for a transformation.
     * @returns A Promise containing the passed `options` object.
     * @private
     */
    this.ensureOrigin = function (options) {
        return ensureType(options, options.origin, 'origin');
    };

    /**
     * Checks if the given target is valid.
     *
     * @param {{origin: string, target: string, src: string, dest: string, indent: number}} options -
     *        The minimum configuration for a transformation.
     * @returns {Promise} A Promise containing the passed `options` object.
     * @private
     */
    this.ensureTarget = function (options) {
        return ensureType(options, options.target, 'target');
    };

    /**
     * Checks of an indention value is correct and corrects incorrect one.
     * @param {{origin: string, target: string, src: string, dest: string, indent: number}} options -
     *        The minimum configuration for a transformation.
     * @returns {Promise} A Promise containing the passed `options` object.
     * @private
     */
    this.ensureIndent = function (options) {
        if (options.indent < (Constants.MIN_YAML_INDENT && options.target === Constants.YAML)) { // TODO seems to be buggy!
            self.logInstance.info('Invalid indent \'' + options.indent + '\' found for YAML, reset to minumum: ' + Constants.MIN_YAML_INDENT);
            options.indent = Constants.MIN_YAML_INDENT;
        } else if (options.indent < 0) {
            self.logInstance.info('Invalid indent \'' + options.indent + '\' found, reset to minumum: ' + Constants.MIN_JSON_JS_INDENT);
            options.indent = Constants.MIN_JSON_JS_INDENT;
        } else if (options.indent > Constants.MAX_INDENT) {
            self.logInstance.info('Invalid indent \'' + options.indent + '\' found, reset to maximum: ' + Constants.MAX_INDENT);
            options.indent = Constants.MAX_INDENT;
        }
        self.logInstance.debug('OPTIONS:: ' + JSON.stringify(options, null, 4));
        return Promise.resolve(options);
    };

    /**
     * Log the options with INFO level.
     *
     * @param {{origin: string, target: string, src: string, dest: string, indent: number}} options - The properties to log with INFO.
     * @returns {Promise} A Promise containing the passed `options` object.
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
 * @param {{origin: string, target: string, src: string, dest: string, indent: number}} options -
 *        The minimum configuration for a transformation.
 * @returns A Promise containing a new and complete `options` object.
 * @public
 */
OptionsHandler.prototype.ensureOptions = function (options) {
    return this.copyOptions(options)
        .then(this.ensureSrc)
        .then(this.ensureDest)
        .then(this.ensureOrigin)
        .then(this.ensureTarget)
        .then(this.ensureIndent)
        .then(this.verboseOptions);
};

/**
 * This method validates the transformation process described by the given
 * options and provides the according name to resolve a proper function.
 *
 * @param {{origin: string, target: string, src: string, dest: string, indent: number}} options -
 *        The minimum configuration for a transformation.
 * @returns A Promise containing the passed `options` object and a 'transformation' string.
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
