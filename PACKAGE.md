# jy-transform 

This project aims to read, write and transform YAML, JS or JSON objects into each other using CLI or API, while the source and destination resources can be files on CLI and additionally, objects or streams on API level.

## Installation

```sh
npm install jy-transform --global
```


## Tests

```sh
npm install
npm test
```

## Dependencies

- [babel-runtime](): babel selfContained runtime
- [cli](https://github.com/node-js-libs/cli): A tool for rapidly building command line apps
- [is-stream](): Check if something is a Node.js stream
- [joi](): Object schema validation
- [js-yaml](): YAML 1.2 parser and serializer
- [json-stringify-safe](https://github.com/isaacs/json-stringify-safe): Like JSON.stringify, but doesn&#39;t blow up on circular refs.
- [mkdirp-then](): mkdirp as promised
- [promisify-es6](https://github.com/manuel-di-iorio/promisify-es6): Promisify callback-style functions to ES6 promises
- [serialize-js](https://github.com/RReverser/serialize-js): User-readable object serialization for JavaScript.

## Dev Dependencies

- [babel-cli](): Babel command line.
- [babel-eslint](https://github.com/babel/babel-eslint): Custom parser for ESLint
- [babel-plugin-transform-flow-strip-types](): Strip flow type annotations from your output code.
- [babel-plugin-transform-runtime](): Externalise references to helpers and builtins, automatically polyfilling your code without polluting globals
- [babel-preset-env](): A Babel preset for each environment.
- [bithound](https://github.com/bithound/cli.bithound.io): Commands for interacting with bitHound: https://bithound.io
- [chalk](): Terminal string styling done right
- [codacy-coverage](https://github.com/codacy/node-codacy-coverage): Code Coverage reporter for Codacy.com
- [codeclimate-test-reporter](https://github.com/codeclimate/javascript-test-reporter): Code Climate test reporter client for javascript projects
- [codecov](https://github.com/codecov/codecov-node): Uploading report to Codecov: https://codecov.io
- [coveralls](https://github.com/nickmerwin/node-coveralls): takes json-cov output into stdin and POSTs to coveralls.io
- [cwd](): Easily get the CWD (current working directory) of a project based on package.json, optionally starting from a given path. (node.js/javascript util)
- [doctoc](https://github.com/thlorenz/doctoc): Generates TOC for markdown files of local git repo.
- [eslint](): An AST-based pattern checker for JavaScript.
- [eslint-config-airbnb-base](https://github.com/airbnb/javascript): Airbnb&#39;s base JS ESLint config, following our styleguide
- [eslint-plugin-filenames](https://github.com/selaux/eslint-plugin-filenames): Eslint rule for consistent filenames.
- [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import): Import with sanity.
- [eslint-plugin-jest](): Eslint rules for Jest
- [eslint-plugin-jest-async](https://github.com/deadratfink/jy-transform.git): ESLint plugin to detect improper Jest test assertions for asynchronous (Promise-based) actions
- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc): JSDoc linting rules for ESLint.
- [eslint-plugin-json](https://github.com/azeemba/eslint-plugin-json): Lint JSON files
- [fs-extra](https://github.com/jprichardson/node-fs-extra): fs-extra contains methods that aren&#39;t included in the vanilla Node.js fs package. Such as mkdir -p, cp -r, and rm -rf.
- [inchjs](https://github.com/rrrene/inchjs): JS Wrapper for Inch for JavaScript
- [jest](https://github.com/facebook/jest): Delightful JavaScript Testing.
- [jsdoc-babel](https://github.com/ctumolosus/jsdoc-babel): A JSDoc plugin that transforms ES6 source files with Babel before they are processsed.
- [jsdoc-parse](): Transforms jsdoc data into something more suitable for use as template input
- [jsdoc-to-markdown](): Generates markdown API documentation from jsdoc annotated source code
- [nsp](https://github.com/nodesecurity/nsp): The Node Security (nodesecurity.io) command line interface
- [package-json-to-readme](): Generate a README.md from package.json contents
- [winston](https://github.com/winstonjs/winston): A multi-transport async logging library for Node.js


## License

MIT