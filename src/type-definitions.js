/**
 * @module jy-transform:type-definitions
 * @description The type definitions for this module.
 * @public
 */

// /////////////////////////////////////////////////////////////////////////////
// EXTERNAL DEFINITIONS
// /////////////////////////////////////////////////////////////////////////////

/**
 * Hapi.js Joi.
 * @external joi
 * @see {@link https://github.com/hapijs/joi Hapi Joi}
 * @private
 */

/**
 * Joi validation error.
 * @typedef ValidationError
 * @memberof external:joi
 * @see {@link hhttps://github.com/hapijs/joi/blob/v10.2.0/API.md#errors Joi errors}
 * @private
 */

/**
 * The validation schema. Can be a {@link external:joi} type object or a plain object
 * where every key is assigned a {@link external:joi} type object.
 * @typedef Schema
 * @memberof external:joi
 * @see {@link https://github.com/hapijs/joi/blob/v10.2.2/API.md#joi Joi API}
 * @private
 */

/**
 * Hapi.js Joi schema extension.
 * @typedef Extension
 * @memberof external:joi
 * @see {@link https://github.com/hapijs/joi/blob/v10.2.2/API.md#extendextension Hapi Joi Extension}
 * @private
 */

/**
 * Joi `validate` method.
 * @callback validate
 * @memberof external:joi
 * @see {@link https://github.com/hapijs/joi/blob/master/API.md#validatevalue-schema-options-callback Joi.validate}
 * @private
 */

// /////////////////////////////////////////////////////////////////////////////
// INTERNAL DEFINITIONS
// /////////////////////////////////////////////////////////////////////////////

/**
 * The configuration properties provided to the reader function.
 * @typedef {object} ReaderOptions
 * @property {(string|Stream.Readable|object)} src  - The source (if `string` type is treated as a file path).
 * @property {string} [origin=yaml]                 - The origin type.
 * @property {string} [imports=undefined]           - The exports name for reading from JS source files or objects only.
 * @public
 */

/**
 * The writer configuration properties provided to the writer function.
 * @typedef {object} WriterOptions
 * @property {(string|Stream.Writable|object)} [dest] - The destination (if `string` type is treated as a file path).
 * @property {string} [target=js]                     - The target type.
 * @property {number} [indent=2]                      - The indention in files.
 * @property {string} [exports=undefined]             - The exports name for usage in JS destination files only.
 * @property {string} [force=false]                   - Force overwriting of existing output files on write phase.
 * @public
 */

/**
 * The configuration properties provided to the transformer function.
 * @typedef {object} TransformerOptions
 * @property {(string|Stream.Readable|object)} src    - The source (if `string` type is treated as a file path).
 * @property {string} [origin=yaml]                   - The origin type.
 * @property {string} [imports=undefined]             - The exports name for reading from JS source files
 *                                                      or objects only.
 * @property {(string|Stream.Writable|object)} [dest] - The destination (if `string` type is treated as a file path).
 * @property {string} [target=js]                     - The target type.
 * @property {string} [exports=undefined]             - The exports name for usage in JS destination files only.
 * @property {number} [indent=2]                      - The indention in files.
 * @property {string} [force=false]                   - Force overwriting of existing output files on write phase.
 * @public
 */
