import { Stream } from 'stream';
import Joi from './joi-extensions';
import {
  inferOriginDefaultFromStreamReadableFilePath,
  inferTargetDefaultFromStreamWritableFilePath,
  inferOriginDefaultFromFilePath,
  inferTargetDefaultFromFilePath,
} from './options-schema-helper';
import {
  TYPE_YAML,
  TYPE_JS,
  TYPE_JSON,
  DEFAULT_FORCE_FILE_OVERWRITE,
  DEFAULT_INDENT,
  MIN_INDENT,
  MAX_INDENT,
} from '../constants';

/**
 * @module validation:options-schema
 * @description The module options schema used in {@link module:options-validator}.
 * @type {Object}
 * @protected
 * @see {@link module:options-validator}
 */

// /////////////////////////////////////////////////////////////////////////////
// SCHEMAS
// /////////////////////////////////////////////////////////////////////////////

/**
 * The prepared {@link external:joi.JoiSchema} for validating the {@link Reader} options.
 * @type {JoiSchema}
 * @constant
 * @private
 */
export const readerOptionsSchema = Joi.object().keys({
  src: Joi
    .alternatives().try(
      Joi.string()
        .min(1)
        .existingFile(),
      Joi.object().type(Stream.Readable),
      Joi.object().type(Object),
    )
    .required()
    .description('The input source (if string type it is treated as a file path).'),
  origin: Joi
    .when('src', {
      is: Joi.object().type(Stream.Readable),
      then: Joi
        .string()
        .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
        .default(inferOriginDefaultFromStreamReadableFilePath,
          'tried origin default inferred from src type if not set (Stream.Readable)'),
      otherwise: Joi
        .when('src', {
          is: Joi.string(),
          then: Joi
            .string()
            .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
            .default(inferOriginDefaultFromFilePath, 'tried origin default inferred from src type if not set (String)'),
          otherwise: Joi // else could only be JS Object
            .string()
            .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
            .default(TYPE_JS)
        }),
    })
    .description('The origin type of input.'),
  imports: Joi
    .string()
    .validEs6Identifier()
    .description('The name of property to import while reading a JS input source.'),
}).unknown()
  .required();

/**
 * The prepared {@link external:joi.JoiSchema} for validating the {@link Writer} options.
 * @type {JoiSchema}
 * @constant
 * @private
 */
export const writerOptionsSchema = Joi.object().keys({
  dest: Joi
    .alternatives().try(
      Joi.string() // TODO must be existing file (relative or not? -> check)
        .min(1),
      Joi.object().type(Stream.Writable),
      Joi.object().type(Object),
    )
    .required()
    .description('The output destination (if string type it is treated as a file path).'),
  target: Joi
    .when('dest', {
      is: Joi.object().type(Stream.Writable),
      then: Joi
        .string()
        .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
        .default(inferTargetDefaultFromStreamWritableFilePath,
          'tried target default inferred from dest type if not set (Stream.Writable)'),
      otherwise: Joi
        .when('dest', {
          is: Joi.string(),
          then: Joi
            .string()
            .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
            .default(inferTargetDefaultFromFilePath, 'tried target default inferred from dest type if not set (String)'),
          otherwise: Joi // check
            .string()
            .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
            .default(TYPE_JS),
        }),
    })
    .description('The target type of output.'),
  exports: Joi
    .string()
    .validEs6Identifier()
    .description('The name of property to export while writing a JS object to a JS output destination.'),
  indent: Joi
    .number()
    .integer()
    .min(MIN_INDENT)
    .max(MAX_INDENT)
    .default(DEFAULT_INDENT)
    .description('The indention for pretty-print.'),
  force: Joi
    .boolean()
    .default(DEFAULT_FORCE_FILE_OVERWRITE)
    .description('Force overwriting of existing output files on write phase.'),
}).unknown()
  .required();

/**
 * The prepared {@link external:joi.JoiSchema} for validating the {@link Transformer} options.
 * @type {JoiSchema}
 * @constant
 * @private
 */
export const transformerOptionsSchema = readerOptionsSchema.concat(writerOptionsSchema).required();

export default {
  readerOptionsSchema,
  writerOptionsSchema,
  transformerOptionsSchema,
};
