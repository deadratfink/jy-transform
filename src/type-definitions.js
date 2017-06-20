/**
 * @module jy-transform:type-definitions
 * @description The type definitions for this module.
 */

// /////////////////////////////////////////////////////////////////////////////
// EXTERNAL DEFINITIONS
// /////////////////////////////////////////////////////////////////////////////

/**
 * Hapi.js Joi.
 * @external joi
 * @see {@link https://github.com/hapijs/joi Hapi Joi}
 */

/**
 * Joi validation error.
 * @typedef ValidationError
 * @memberof external:joi
 * @see {@link hhttps://github.com/hapijs/joi/blob/v10.2.0/API.md#errors Joi errors}
 */

/**
 * The validation schema. Can be a {@link external:joi} type object or a plain object
 * where every key is assigned a {@link external:joi} type object.
 * @typedef Schema
 * @memberof external:joi
 * @see {@link https://github.com/hapijs/joi/blob/v10.2.2/API.md#joi Joi API}
 */

/**
 * Hapi.js Joi schema extension.
 * @typedef Extension
 * @memberof external:joi
 * @see {@link https://github.com/hapijs/joi/blob/v10.2.2/API.md#extendextension Hapi Joi Extension}
 */

/**
 * Joi `validate` method.
 * @callback validate
 * @memberof external:joi
 * @see {@link https://github.com/hapijs/joi/blob/master/API.md#validatevalue-schema-options-callback Joi.validate}
 */

// /////////////////////////////////////////////////////////////////////////////
// INTERNAL DEFINITIONS
// /////////////////////////////////////////////////////////////////////////////

/**
 * The configuration properties provided to the framework functions.
 * @typedef {object} Options
 * @property {string} [origin=yaml]                   - The origin type.
 * @property {string} [target=js]                     - The target type.
 * @property {(string|Stream.Readable|object)} src    - The source (if `string` type is treated as a file path).
 * @property {(string|Stream.Writable|object)} [dest] - The destination (if `string` type is treated as a file path).
 * @property {number} [indent=2]                      - The indention in files.
 * @property {string} [imports=undefined]             - The exports name for reading from JS source files
 *                                                      or objects only.
 * @property {string} [exports=undefined]             - The exports name for usage in JS destination files only.
 * @property {string} [force=false]                   - Force overwriting of existing output files on write phase.
 * @public
 */
