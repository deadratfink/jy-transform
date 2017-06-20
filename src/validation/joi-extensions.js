import JoiBase from 'joi';
import promisify from 'promisify-es6';
import { isExistingFile } from './joi-extensions-file-helper';
import { isValidEs6Identifier } from './joi-extensions-identifier-helper';

/**
 * @module jy-transform:validation:joi-extension
 * @description The module exporting the {@link external:joi.Extension}s for option validations.
 * @see {@link https://github.com/hapijs/joi/blob/v10.2.2/API.md#extendextension Joi.extend(extension) method}.
 * @public
 */

/**
 * The common {@link external:joi.Schema} validation extensions:
 * - `existingFile` - needs to be an absolute or relative path to an existing file.
 * - `validEs6Identifier` - needs to be a valid ECMAScript 6 identifier.
 * @type {external:joi.Extension}
 * @private
 */
export const EXTENSIONS = {
  base: JoiBase.string(),
  name: 'string',
  language: {
    existingFile: 'needs to be an absolute or relative path to an existing file (given file path: {{v}})',
    validEs6Identifier: 'needs to be a valid ECMAScript 6 identifier (given identifier: {{v}})'
  },
  rules: [
    {
      name: 'existingFile',
      validate(params, value, state, options) {
        if (isExistingFile(value)) {
          return value; // Everything is OK
        }
        // Generate an error, state and options need to be passed
        return this.createError('string.existingFile', { v: value }, state, options);
      }
    },
    {
      name: 'validEs6Identifier',
      validate(params, value, state, options) {
        if (isValidEs6Identifier(value)) {
          return value; // Everything is OK
        }
        // Generate an error, state and options need to be passed
        return this.createError('string.validEs6Identifier', { v: value }, state, options);
      }
    }
  ]
};

const JoiExtended = JoiBase.extend(EXTENSIONS);
JoiExtended.validate = promisify(JoiExtended.validate);

export default JoiExtended;
