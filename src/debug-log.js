/* eslint-disable no-console */

/**
 * @module jy-transform:debug-log
 * @description The debug logger. Can be enabled via environment variables (set to `true`):
 * - `JYT_DEBUG`: (only DEBUG logging via `console.log`)
 * - `JYT_DEBUG`: (only ERROR logging via `console.error`)
 * @public
 */

/**
 * DEBUG function.
 * @protected
 */
export const debug = process.env.JYT_DEBUG === 'true' ?
  console.log.bind(null, '[DEBUG][jyt.js]:') :
  (() => null);

export const error = process.env.JYT_ERROR === 'true' ?
  console.error.bind(null, '[ERROR][jyt.js]:') :
  (() => null);

/* eslint-enable no-console */
