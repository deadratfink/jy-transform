import index from '../../index';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';

/**
 * @module jy-transform:test-unit:index
 * @description This unit test module tests the correct exporting from _./index.js_.
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - index - ', () => {
  describe('Exports Check Unit Tests', () => {
    describe('Exports', () =>
      it('should be an existing Object', () => {
        expect.assertions(3);
        expect(index).toBeDefined();
        expect(index).toBeInstanceOf(Object);
        expect(Object.keys(index)).toHaveLength(4);
      })
    );

    describe('Exported Transformer', () =>
      it('should be an existing Transformer object', () => {
        expect.assertions(5);
        expect(index.Transformer).toBeDefined();
        expect(index.Transformer).toBeInstanceOf(Object);
        expect(Object.keys(index.Transformer)).toHaveLength(1);
        const { transform } = index.Transformer;
        expect(transform).toBeDefined();
        expect(transform).toBeInstanceOf(Function);
      })
    );

    describe('Exported Reader', () =>
      it('should be an existing Reader object', () => {
        expect.assertions(7);
        expect(index.Reader).toBeDefined();
        expect(index.Reader).toBeInstanceOf(Object);
        expect(Object.keys(index.Reader)).toHaveLength(2);
        const { readJs, readYaml } = index.Reader;
        expect(readJs).toBeDefined();
        expect(readJs).toBeInstanceOf(Function);
        expect(readYaml).toBeDefined();
        expect(readYaml).toBeInstanceOf(Function);
      })
    );

    describe('Exported Writer', () =>
      it('should be an existing Writer object', () => {
        expect.assertions(9);
        expect(index.Writer).toBeDefined();
        expect(index.Writer).toBeInstanceOf(Object);
        expect(Object.keys(index.Writer)).toHaveLength(3);
        const { writeJs, writeJson, writeYaml } = index.Writer;
        expect(writeJs).toBeDefined();
        expect(writeJs).toBeInstanceOf(Function);
        expect(writeJson).toBeDefined();
        expect(writeJson).toBeInstanceOf(Function);
        expect(writeYaml).toBeDefined();
        expect(writeYaml).toBeInstanceOf(Function);
      })
    );

    describe('Exported Constants', () =>
      it('should be an existing Constants instance', () => {
        expect.assertions(4);
        expect(index.Constants).toBeDefined();
        expect(typeof index.Constants === 'object').toBeTruthy();
        const { DEFAULT_FORCE_FILE_OVERWRITE } = index.Constants;
        expect(DEFAULT_FORCE_FILE_OVERWRITE).toBeDefined();
        expect(DEFAULT_FORCE_FILE_OVERWRITE).toBeFalsy();
        // TODO
        // {DEFAULT_FORCE_FILE_OVERWRITE: false, DEFAULT_INDENT: 2, DEFAULT_JS_EXPORTS_IDENTIFIER: undefined, DEFAULT_JS_IMPORTS_IDENTIFIER: undefined, DEFAULT_OPTIONS: {dest: storing relative to input file, exports: undefined, force: false, imports: undefined, indent: 2, origin: if not given, the type is tried to be inferred from the extension of source path, else it is 'yaml', target: if not given, the type is tried to be inferred from the extension of destination path, else it is 'js'}, DEFAULT_ORIGIN: yaml, DEFAULT_TARGET: js, DEST_DESCRIPTION: storing relative to input file, JS: js, JSON: json, JSON_TO_JS: json2js, JSON_TO_JSON: json2json, JSON_TO_YAML: json2yaml, JS_TO_JS: js2js, JS_TO_JSON: js2json, JS_TO_YAML: js2yaml, MAX_INDENT: 8, MIN_INDENT: 0, ORIGIN_DESCRIPTION: if not given, the type is tried to be inferred from the extension of source path, else it is 'yaml', TARGET_DESCRIPTION: if not given, the type is tried to be inferred from the extension of destination path, else it is 'js', TRANSFORMATIONS: [yaml2js, yaml2json, js2yaml, json2yaml, json2js, js2json, yaml2yaml, json2json, js2js], TYPES: [yaml, json, js], UTF8: utf8, YAML: yaml, YAML_TO_JS: yaml2js, YAML_TO_JSON: yaml2json, YAML_TO_YAML: yaml2yaml}

      })
    );
  });
});
