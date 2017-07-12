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
 * @public
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
 * The configuration properties provided to the `read` function.
 * @typedef {object} ReadOptions
 * @property {(string|Stream.Readable|object)} src  - The source (if `string` type it is treated as a file path).
 * @property {string} [origin=yaml]                 - The source origin type.
 * @property {string} [imports=undefined]           - The exports name for reading from JS source files or objects only.
 * @public
 */

/**
 * The configuration properties provided to the `write` function.
 * @typedef {object} WriteOptions
 * @property {(string|Stream.Writable|object)} dest - The destination (if `string` type it is treated as a file path).
 * @property {string} [target=js]                   - The destination target type.
 * @property {number} [indent=2]                    - The indentation value for pretty-print of output.
 * @property {string} [exports=undefined]           - The exports name for usage in JS destination files only.
 * @property {string} [force=false]                 - Force overwriting of existing output files on write phase.
 * @public
 */

/**
 * The configuration properties provided to the `transform` function.
 * @typedef {object} TransformOptions
 * @property {(string|Stream.Readable|object)} src    - The _read_ source (if `string` type it is treated as a file
 *                                                      path).
 * @property {string} [origin=yaml]                   - The _read_ source origin type.
 * @property {string} [imports=undefined]             - The _read_ exports name for reading from JS source files or
 *                                                      objects only.
 * @property {Function} [transform]                   - The option is a _transformation_ function with the following
 *                                                      signature:
 *                                                      <p><p>
 *                                                      ```
 *                                                      [async|Promise] function(object)
 *                                                      ```
 * @property {(string|Stream.Writable|object)} [dest] - The _write_ destination (if `string` type it is treated as a
 *                                                      file path). This property could be optional in case we infer a
 *                                                      value from `src` which is then either a string or a file stream
 *                                                      where can get the file path from. If this detection process
 *                                                      cannot be fulfilled then the property is `undefined` and the
 *                                                      transform process will fail with a `ValidationError` on write
 *                                                      phase.
 * @property {string} [target=js]                     - The _write_ target type.
 * @property {number} [indent=2]                      - The _write_ indentation value for pretty-print of output.
 * @property {string} [exports=undefined]             - The _write_ exports name for usage in JS destination files only.
 * @property {string} [force=false]                   - Force overwriting of existing output files on write phase.
 * @public
 */
