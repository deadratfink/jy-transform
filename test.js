const path = require('path');


// import { Writer } from './src/writer';
// import { Reader } from './src/reader';
//
// (async () => {
//   try {
//     const writer = new Writer();
//     const file = './test-data-by-js-to-file.json';
//     console.log('test');
//     const msg = await writer.writeJson({ test: 'test' }, { dest: file });
//     console.log(msg);
//   } catch (err) {
//     console.error(err);
//   }
// })();
//
// (async () => {
//   try {
//     const reader = new Reader();
//     console.log('test2');
//     const msg = await reader.readJs({
//       origin: 'json',
//       src: './test/data/test-data-corrupted.json'
//     });
//     console.log(msg);
//   } catch (err) {
//     console.error(JSON.stringify(err.message, null, 4));
//   }
// })();

console.log(path.resolve('test/data/test-data.js'));
console.log(path.resolve('/test/data/test-data.js'));
console.log(path.resolve('./test/data/test-data.js'));
console.log(path.resolve('/Users/jens.krefeldt/Development/finanzcheck/jy-transform/test/data/test-data.js'));
