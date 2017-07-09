import { Stream } from 'stream';
import Joi from './joi-extensions';
import {
  inferOriginDefault,
  inferTargetDefault,
} from './options-schema-helper';
import {
  TYPE_YAML,
  TYPE_JS,
  TYPE_JSON,
  DEFAULT_FORCE_FILE_OVERWRITE,
  DEFAULT_INDENT,
  MIN_INDENT,
  MIN_YAML_INDENT,
  MAX_INDENT,
} from '../constants';

/**
 * @module jy-transform:validation:options-schema
 * @description The module options schema used in {@link module:options-validator}.
 * @type {Object}
 * @see {@link module:options-validator}
 * @private
 */

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
        .label('src - INPUT-FILE')
        .existingFile(),
      Joi.object().type(Stream.Readable),
      Joi.object().type(Object),
    )
    .required()
    .description('The input source (if string type is treated as a file path).'),
  origin: Joi
    .when('src', {
      is: Joi.object().type(Stream.Readable),
      then: Joi
        .string()
        .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
        .default(inferOriginDefault,
          'tried origin default inferred from src type if not set (Stream.Readable)'),
      otherwise: Joi
        .when('src', {
          is: Joi.string(),
          then: Joi
            .string()
            .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
            .default(inferOriginDefault, 'origin resolving from src type if latter not set (String)'),
          otherwise: Joi // else could only be JS Object
            .string()
            .valid(TYPE_JS)
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
      Joi.string()
        .min(1)
        .label('dest - OUTPUT-FILE'),
      Joi.object().type(Stream.Writable),
      Joi.object().type(Object),
    )
    .required()
    .description('The output destination (if string type is treated as a file path).'),
  target: Joi
    .when('dest', {
      is: Joi.object().type(Stream.Writable),
      then: Joi
        .string()
        .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
        .default(inferTargetDefault,
          'tried target default inferred from dest type if not set (Stream.Writable)'),
      otherwise: Joi
        .when('dest', {
          is: Joi.string(),
          then: Joi
            .string()
            .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
            .default(inferTargetDefault, 'try target resolving from dest type if latter not set (String)'),
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
    .when('target', {
      is: TYPE_YAML,
      then: Joi
        .number()
        .integer()
        .min(MIN_YAML_INDENT) // Must be 2 for YAML type!
        .max(MAX_INDENT)
        .default(DEFAULT_INDENT),
      otherwise: Joi
        .number()
        .integer()
        .min(MIN_INDENT)
        .max(MAX_INDENT)
        .default(DEFAULT_INDENT),
    })
    .description('The indention value for pretty-print of output.'),
  force: Joi
    .boolean()
    .default(DEFAULT_FORCE_FILE_OVERWRITE)
    .description('Force overwriting of existing output files on write phase.'),
}).unknown()
  .required();

export default {
  readerOptionsSchema,
  writerOptionsSchema,
};
