import { exec, execFile, spawn } from 'child_process';

import jsYaml from 'js-yaml';
import promisify from 'promisify-es6';
import fsExtra from 'fs-extra';
import fs from 'fs';
import cwd from 'cwd';
import path from 'path';
import { logger } from '../logger';

import { UTF8 } from '../../src/constants';
import { TEST_SUITE_DESCRIPTION_UNIT } from '../helper-constants';


const fsPromised = promisify(fs);
const execPromised = promisify(exec);

/**
 * @module jy-transform:unit-test:test-cli
 * @description This unit test suite checks the correct transformation behaviour of the CLI interface.
 * @private
 */

const execJyt = async (args) => {
  try {
    console.log('CWD: ' + cwd());
    const command = './jyt ' + args.join(' ');
    console.log('executing command: ' + command);
    const result = await execPromised(command, { cwd: cwd(), encoding: 'utf8' });
    console.log(`stdout: ${JSON.stringify(result, null, 4)}`);
    console.log(`stdout: ${result.stdout}`);
    console.log(`stderr: ${result.stderr}`);
    return result;
  } catch (err) {
    console.log(`stdout: ${err.stdout}`);
    console.log(`stderr: ${err.stderr}`);
    console.log(`exit code: ${err.code}`);
    throw err;
  }

  // const childProcess = exec('babel-node', args, { cwd: cwd(), encoding: 'utf8' }, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  //   console.log(`stderr: ${stderr}`);
  // });
  // console.log('childProcess.pid = ' + childProcess.pid);
  //
  // if (command.error !== null) {
  //   console.log('exec error: ', command.error);
  // }
  // command.stdout.pipe(process.stdout);
  // return callback(command.output.toString());
};

// function execJyt(args, callback) {
//   var command = spawn(cmd, args);
//   command
//     .on('error', function( err ){ throw err })
//   var result = '';
//   command.stdout.on('data', function(data) {
//     result += data.toString();
//   });
//   //command.stderr.on('data', function(data) {
//     //result += data.toString();
//   //});
//   command.on('close', function(code) {
//     return callback(result);
//   });
//
//   if (command.error !== null) {
//     console.log('exec error: ' + JSON.stringify(command.error, null, 4));
//   }
// }

// run("ls", undefined, function(result) { console.log(result) });

// run("babel-node ./jyt", ['./inch.json', '-t yaml'], function(result) { console.log(result) });

//exec('./jyt inch.json inch.yml -i 1')

const CLI_OPTIONS_LONGTO_SHORT_MAP = {
  origin: '-o',
  target: '-t',
  indent: '-i',
  force: '-f ',
  imports: '-m ',
  exports: '-x '
};

function optionsToArgs(options) {
  const args = [];
  args.push(options.src);
  if (options.dest) {
    args.push(options.dest)
  }
  if (options.origin) {
    args.push(options.origin)
  }
}

/**
 * Helper method which asserts the successful transformation.
 *
 * @param {Object} options      - The transformation options.
 */
function assertTransformSuccess(options) {
  return transform(options)
    .then((msg) => {
      logger.debug(msg);
      const stats = fsExtra.statSync(options.dest);
      expect(stats.isFile()).toBeTruthy();
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const json = require(path.resolve(options.dest));
      expect(json.foo).toBe(EXPECTED_VALUE);
    });
}

describe(TEST_SUITE_DESCRIPTION_UNIT + ' - transformer - ', () => {
  const TEST_DATA_DIR = './test/data';
  const SRC_YAML = TEST_DATA_DIR + '/test-file.yaml';
  const EXPECTED_VALUE = 'bar';

  /**
   * Temporary base dir for writer test output.
   * @type {string}
   * @constant
   * @private
   */
  const CLI_TEST_BASE_DIR = './test/tmp/cli';

  beforeAll(() => {
    fsExtra.ensureDirSync(CLI_TEST_BASE_DIR);
    fsExtra.emptyDirSync(CLI_TEST_BASE_DIR);
  });

  it('cli', async () => {
    await execJyt(['./inch.json', CLI_TEST_BASE_DIR + '/inch.yaml', '-i 2', '-t yaml']);

  });
});
