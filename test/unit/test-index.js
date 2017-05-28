import index from '../../index';
import Transformer from '../../lib/transformer';
import Reader from '../../lib/reader';
import Writer from '../../lib/writer';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';

/**
 * @module test-unit:index
 * @description This unit test module tests the correct exporting from _./index.js_.
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - index - ', () => {
  describe('Exports Check Unit Tests', () => {
    describe('Exports', () =>
      it('should be an existing Object', () => {
        expect(index).toBeDefined();
        expect(index).toBeInstanceOf(Object);
        expect(Object.keys(index)).toHaveLength(5);
      })
    );

    describe('Exported Transformer', () =>
      it('should be an existing Transformer class', () => {
        expect(index.Transformer).toBeDefined();
        expect(index.Transformer).toBeInstanceOf(Function);
        expect(new index.Transformer()).toBeInstanceOf(Transformer);
      })
    );

    describe('Exported Reader', () =>
      it('should be an existing Reader class', () => {
        expect(index.Reader).toBeDefined();
        expect(index.Reader).toBeInstanceOf(Function);
        expect(new index.Reader()).toBeInstanceOf(Reader);
      })
    );

    describe('Exported Writer', () =>
      it('should be an existing Writer class', () => {
        expect(index.Writer).toBeDefined();
        expect(index.Writer).toBeInstanceOf(Function);
        expect(new index.Writer()).toBeInstanceOf(Writer);
      })
    );

    describe('Exported Constants', () =>
      it('should be an existing Constants instance', () => {
        expect(index.Constants).toBeDefined();
        expect(index.Constants).toBeInstanceOf(Object);
      })
    );

    describe('Exported Middleware', () =>
      it('should be an existing Middleware instance', () => {
        expect(index.Middleware).toBeDefined();
        expect(index.Middleware).toBeInstanceOf(Object);
      })
    );
  });
});
