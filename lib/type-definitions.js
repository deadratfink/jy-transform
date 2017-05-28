/**
 * @module type-definitions
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
 * Hapi.js Joi schema.
 * @typedef Schema
 * @memberof external:joi
 * @see {@link https://github.com/hapijs/joi#usage Hapi Joi schema}
 */

// /////////////////////////////////////////////////////////////////////////////
// INTERNAL DEFINITIONS
// /////////////////////////////////////////////////////////////////////////////

/**
 * The configuration properties provided to the framework functions.
 * @typedef {object} Options
 * @property {string} [origin=yaml]            - The origin type.
 * @property {string} [target=js]              - The target type.
 * @property {(string|Readable|object)} src    - The source (`string` type is treated as a file path).
 * @property {(string|Writable|object)} [dest] - The destination (`string` type is treated as a file path).
 * @property {number} [indent=4]               - The indention in files.
 * @property {string} [imports=undefined]      - The exports name for reading from JS source file or objects only.
 * @property {string} [exports=undefined]      - The exports name for usage in JS destination files only.
 * @public
 */
