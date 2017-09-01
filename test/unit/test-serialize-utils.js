import os from 'os';
import {
  createExportString,
  serializeJsToString,
  serializeJsToJsonString,
} from '../../src/serialize-utils';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';

/**
 * @module jy-transform:test-unit:serialize-utils
 * @description This unit test suite checks the validity and correctness of JS serialization utility methods.
 * @private
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - serialize-utils - ', () => {
  const namedExport = 'foo';
  const indent = '    ';
  const nl = os.EOL;
  const toSerializeToJs = {
    foo: 'bar',
    bar: {
      bar: 'bar'
    },
  };

  describe('Function createExportString', () => {
    it('should create ES6 default export', async () => {
      expect.assertions(1);
      const result = await createExportString(true);
      expect(result).toBe('export default ');
    });

    it('should create "module.exports"', async () => {
      expect.assertions(1);
      const result = await createExportString(false);
      expect(result).toBe('module.exports = ');
    });

    it('should create ES6 default export with named export', async () => {
      expect.assertions(1);
      const result = await createExportString(true, 'foo');
      expect(result).toBe(`export const ${namedExport} = `);
    });

    it('should create "module.exports" with named export', async () => {
      expect.assertions(1);
      const result = await createExportString(false, 'foo');
      expect(result).toBe(`module.exports.${namedExport} = `);
    });
  });

  describe('Function serializeJsToString', () => {
    it('should create "use strict;" if configured', async () => {
      expect.assertions(1);
      const result = await serializeJsToString(toSerializeToJs, {
        strict: true,
        indent: indent.length,
        'no-es6': false,
      });
      expect(result).toBe(
        `'use strict;'${nl}${nl}export default {${nl}${indent}foo: 'bar',${nl}${indent}bar: {bar: 'bar'}${nl}};${nl}`
      );
    });

    it('should not create "use strict;" if not configured', async () => {
      expect.assertions(1);
      const result = await serializeJsToString(toSerializeToJs, {
        strict: false,
        indent: indent.length,
        'no-es6': false,
      });
      expect(result).toBe(`export default {${nl}${indent}foo: 'bar',${nl}${indent}bar: {bar: 'bar'}${nl}};${nl}`);
    });

    it('should serialize all with double quotes if configured', async () => {
      expect.assertions(1);
      const result = await serializeJsToString(toSerializeToJs, {
        strict: true,
        indent: indent.length,
        'no-es6': false,
        'no-single': true,
      });
      expect(result).toBe(
        `"use strict;"${nl}${nl}export default {${nl}${indent}foo: "bar",${nl}${indent}bar: {bar: "bar"}${nl}};${nl}`
      );
    });
  });

  describe('Function serializeJsToJsonString', () => {
    it('should serialize correctly', async () => {
      expect.assertions(1);
      const toSerializeToJson = {
        foo: {
          bar: 'bar'
        },
      };
      const result = await serializeJsToJsonString(toSerializeToJson, indent.length);
      expect(result).toBe(`{${nl}${indent}"foo": {${nl}${indent}${indent}"bar": "bar"${nl}${indent}}${nl}}${nl}`);
    });
  });
});
