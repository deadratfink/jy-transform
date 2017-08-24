import { Stream } from 'stream';
import Joi from './joi-extensions';
import {
  inferDestDefaultFromSrc,
  inferOriginDefault,
  inferTargetDefault,
} from './options-schema-utils';
import {
  TYPE_YAML,
  TYPE_JS,
  TYPE_JSON,
  DEFAULT_FORCE_FILE_OVERWRITE,
  DEFAULT_INDENT,
  MIN_INDENT,
  MIN_YAML_INDENT,
  MAX_INDENT,
  DEFAULT_STRICT,
  DEFAULT_NO_ES6,
  DEFAULT_NO_SINGLE_QUOTES,
} from '../constants';

/**
 * @module jy-transform:validation:options-schema
 * @description The module options schema used in {@link module:options-validator}.
 * @type {Object}
 * @see {@link module:options-validator}
 * @private
 */

/**
 * The `force` option schema.
 * @type {external:joi.Schema}
 * @private
 */
const forceSchema = Joi
  .boolean()
  .default(DEFAULT_FORCE_FILE_OVERWRITE)
  .description('Force overwriting of existing output files on write phase.');

/**
 * The `force` option schema.
 * @type {external:joi.Schema}
 * @private
 */
const strictSchema = Joi
  .boolean()
  .default(DEFAULT_STRICT)
  .description('Whether to write a "use strict;" in JS type output.');

/**
 * The `no-es6` option schema.
 * @type {external:joi.Schema}
 * @private
 */
const noES6Schema = Joi
  .boolean()
  .default(DEFAULT_NO_ES6)
  .description('Whether not to use ECMAScript6 syntax for JS type output like "module.exports" instead of ' +
    '"export default", applicable only for JS output.');

/**
 * The `no-single` option schema.
 * @type {external:joi.Schema}
 * @private
 */
const noSingleSchema = Joi
  .boolean()
  .default(DEFAULT_NO_SINGLE_QUOTES)
  .description('Whether not to use single-quotes style for values in JS type output (i.e. double-quotes).');

/**
 * The `indent` option schema.
 * @type {external:joi.Schema}
 * @private
 */
const indentSchema = Joi.when('target', {
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
}).description('The indention value for pretty-print of output.');

/**
 * The `exports` option schema.
 * @type {external:joi.Schema}
 * @private
 */
const exportsSchema = Joi
  .string()
  .validEs6Identifier()
  .description('The name of property to export while writing a JS object to a JS output destination.');

/**
 * The `target` option schema.
 * @type {external:joi.Schema}
 * @private
 */
const targetSchema = Joi.when('dest', {
  is: Joi.object().type(Stream.Writable),
  then: Joi
    .string()
    .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
    .default(inferTargetDefault, 'try target default resolution from dest type if not set (Stream.Writable)'),
  otherwise: Joi
    .when('dest', {
      is: Joi.string(),
      then: Joi
        .string()
        .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
        .default(inferTargetDefault, 'try target resolution from dest type if latter not set (String)'),
      otherwise: Joi // check
        .string()
        .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
        .default(TYPE_JS),
    }),
}).description('The target type of output.');

/**
 * The prepared {@link external:joi.Schema} for validating the {@link ReadOptions}.
 * @type {external:joi.Schema}
 * @constant
 * @private
 */
export const readOptionsSchema = Joi.object().keys({
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
        .default(inferOriginDefault, 'try origin resolution from src type if not set (Stream.Readable)'),
      otherwise: Joi
        .when('src', {
          is: Joi.string(),
          then: Joi
            .string()
            .valid(TYPE_YAML, TYPE_JSON, TYPE_JS)
            .default(inferOriginDefault, 'try origin resolution from src type if latter not set (String)'),
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
}).default()
  .required()
  .unknown();

/**
 * The prepared {@link external:joi.Schema} for validating the {@link WriteOptions}.
 * @type {external:joi.Schema}
 * @constant
 * @private
 */
export const writeOptionsSchema = Joi.object().keys({
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
  target: targetSchema,
  exports: exportsSchema,
  indent: indentSchema,
  force: forceSchema,
  strict: strictSchema,
  'no-es6': noES6Schema,
  'no-single': noSingleSchema,
}).default()
  .required()
  .unknown();

/**
 * The prepared {@link external:joi.Schema} for validating the {@link TransformOptions}.
 * @type {external:joi.Schema}
 * @constant
 * @private
 */
export const transformOptionsSchema = readOptionsSchema.concat(Joi.object().keys({
  transform: Joi
    .func()
    .arity(1)
    .default(object => object)
    .description('The transformation function to alter a read object.'),
  dest: Joi
    .alternatives().try(
      Joi.string()
        .min(1)
        .label('dest - OUTPUT-FILE'),
      Joi.object().type(Stream.Writable),
      Joi.object().type(Object),
    )
    .default(inferDestDefaultFromSrc, 'try dest resolution from src if not set')
    .description('The output destination (if string type is treated as a file path).'),
  target: targetSchema,
  exports: exportsSchema,
  indent: indentSchema,
  force: forceSchema,
  strict: strictSchema,
  'no-es6': noES6Schema,
  'no-single': noSingleSchema,
}).default()
  .required()
);

export default {
  readOptionsSchema,
  writeOptionsSchema,
  transformOptionsSchema,
};
