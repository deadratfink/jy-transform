import LogWrapper from '../../lib/log-wrapper';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';

/**
 * @classdesc This unit test suite checks the validity and correctness of {@link LogWrapper} class.
 */

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - log-wrapper - ', () => {
  /**
   * `INFO` message buffer.
   * @private
   */
  let infoMsg;

  /**
   * `DEBUG` message buffer.
   * @private
   */
  let debugMsg;

  /**
   * `TRACE` message buffer.
   * @private
   */
  let traceMsg;

  /**
   * `ERROR` message buffer.
   * @private
   */
  let errorMsg;

  /**
   * The log wrapper testee.
   * @private
   */
  let logWrapper;

  /**
   * `INFO` message constant.
   * @constant
   * @private
   */
  const INFO = 'INFO';

  /**
   * `DEBUG` message constant.
   * @constant
   * @private
   */
  const DEBUG = 'DEBUG';

  /**
   * `TRACE` message constant.
   * @constant
   * @private
   */
  const TRACE = 'TRACE';

  /**
   * `ERROR` message constant.
   * @constant
   * @private
   */
  const ERROR = 'ERROR';

  /**
   * A verbose result buffer.
   * @type {Array}
   * @private
   */
  const verboseResultArray = [];

  /**
   * A mock logger writing to message buffers.
   *
   * @type {{info: ((p1:*)=>*), debug: ((p1:*)=>*), trace: ((p1:*)=>*), error: ((p1:*)=>*)}}
   * @private
   */
  const mockLogger = {
    info: msg => (infoMsg = msg),
    debug: msg => (debugMsg = msg),
    trace: msg => (traceMsg = msg),
    error: msg => (errorMsg = msg)
  };

  /**
   * A mock logger without `debug` function writing to message buffers.
   *
   * @type {{info: ((p1:*)=>*), trace: ((p1:*)=>*), error: ((p1:*)=>*)}}
   * @private
   */
  const mockLoggerWithoutDebugFunction = {
    info: msg => (infoMsg = msg),
    trace: msg => (traceMsg = msg),
    error: msg => (errorMsg = msg),
  };

  /**
   * A mock logger without `trace` function writing to message buffers.
   *
   * @type {{info: ((p1:*)=>*), debug: ((p1:*)=>*), error: ((p1:*)=>*)}}
   * @private
   */
  const mockLoggerWithoutTraceFunction = {
    info: msg => (infoMsg = msg),
    debug: msg => (debugMsg = msg),
    error: msg => (errorMsg = msg),
  };

  /**
   * A mock logger function writing to verbose result array.
   * @type {{info: ((p1?:*)=>Number)}}
   * @private
   */
  const mockLoggerWithVerboseFunction = {
    info: msg => verboseResultArray.push(msg)
  };

  describe('Testing LogWrapper with mockLogger', () => {
    /**
     * Resets the log wrapper with mock logger and all message buffers with `undefined`.
     */
    beforeEach(() => {
      infoMsg = undefined;
      debugMsg = undefined;
      traceMsg = undefined;
      errorMsg = undefined;
      logWrapper = new LogWrapper(mockLogger);
    });

    let expected = INFO;
    it('should log with ' + expected, () => {
      logWrapper.info(expected);
      expect(infoMsg).toBe(expected);
    });

    expected = DEBUG;
    it('should log with ' + expected, () => {
      logWrapper.debug(expected);
      expect(debugMsg).toBe(expected);
    });

    expected = TRACE;
    it('should log with ' + expected, () => {
      logWrapper.trace(expected);
      expect(traceMsg).toBe(expected);
    });

    expected = ERROR;
    it('should log with ' + expected, () => {
      logWrapper.error(expected);
      expect(errorMsg).toBe(expected);
    });

    const verboseExpected = {
      origin: 'origin',
      target: 'target',
      src: 'src',
      dest: 'dest',
      indent: 'indent'
    };

    it('should log options', async () => {
      logWrapper = new LogWrapper(mockLoggerWithVerboseFunction);
      const options = await logWrapper.verboseOptions(verboseExpected);
      expect(options).toBe(verboseExpected);
      expect(verboseResultArray.indexOf('origin: ' + verboseExpected.origin)).toBeGreaterThan(-1);
      expect(verboseResultArray.indexOf('target: ' + verboseExpected.target)).toBeGreaterThan(-1);
      expect(verboseResultArray.indexOf('src:    ' + verboseExpected.src)).toBeGreaterThan(-1);
      expect(verboseResultArray.indexOf('dest:   ' + verboseExpected.dest)).toBeGreaterThan(-1);
      expect(verboseResultArray.indexOf('indent: ' + verboseExpected.indent)).toBeGreaterThan(-1);
    });
  });

  describe('Testing LogWrapper with mockLoggerWithoutDebugFunction', () => {
    /**
     * Resets the mock logger message targets.
     */
    beforeEach(() => {
      infoMsg = undefined;
      debugMsg = undefined;
      traceMsg = undefined;
      errorMsg = undefined;
      logWrapper = new LogWrapper(mockLoggerWithoutDebugFunction);
    });

    let expected = INFO;
    it('should log with ' + expected, () => {
      logWrapper.info(expected);
      expect(infoMsg).toBe(expected);
    });

    expected = DEBUG;
    it('should log with ' + expected, () => {
      logWrapper.debug(expected);
      expect(infoMsg).toBe(expected);
    });

    expected = ERROR;
    it('should log with ' + expected, () => {
      logWrapper.error(expected);
      expect(errorMsg).toBe(expected);
    });
  });

  describe('Testing LogWrapper with mockLoggerWithoutTraceFunction', () => {
    /**
     * Resets the mock logger message targets.
     */
    beforeEach(() => {
      infoMsg = undefined;
      debugMsg = undefined;
      errorMsg = undefined;
      logWrapper = new LogWrapper(mockLoggerWithoutTraceFunction);
    });

    let expected = INFO;
    it('should log with ' + expected, () => {
      logWrapper.info(expected);
      expect(infoMsg).toBe(expected);
    });

    expected = TRACE;
    it('should log with ' + expected, () => {
      logWrapper.trace(expected);
      expect(debugMsg).toBe(expected);
    });

    expected = ERROR;
    it('should log with ' + expected, () => {
      logWrapper.error(expected);
      expect(errorMsg).toBe(expected);
    });
  });
});
