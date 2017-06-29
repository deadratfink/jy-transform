## Changelog

#### v3.0.0

- **CLI & API Changes (Backwards Incompatible!):**
  - Removed support for Node.js < v4.0
  - Default `options.indent` is 2 (instead of 4) now which seems to be more common in the JS/Node.js community
  
- **API Changes Only (Backwards Incompatible!):**
  - The exported constants `YAML`, `JS` and `JSON` (usable for `options.origin/target`) are renamed respectively to `TYPE_YAML`, `TYPE_JS` and `TYPE_JSON`
  - Eased interface:
    - Prototype approach removed from `Transformer`, `Reader` and `Writer`, turning it to internal modules with exports of _named_ functions to provide a simplified interface
      - The formerly exported `Reader.readJs(...)/readYaml(...)` functions are not public anymore and replaced by a general `read(options)` function
      - The formerly exported `Writer.writeJs(...)/writeJson(...)/writeYaml(...)` functions are not public anymore and replaced by a general `write(object, options)` function
    - The formerly exported `middleware` is not publicly available anymore    
    - Reduced and named export of constants: `TYPE_YAML`, `TYPE_JS` and `TYPE_JSON` only
  - The `options.imports/exports` are not allowed to be empty strings anymore (semantically senseless, just leave it out)
  - The configuration property `options.dest` is required for `Transformer` and `Writer` when using the API
  - Removal of `LogWrapper` (no more logger injection possible/needed)
  
- Internal Changes & Improvements:
  - Documentation restructured
  - Removal of _development_ branch
  - Usage of [babel](https://babeljs.io/) and therefore most modern language features
  - Code base could be shrinked and readabilty was improved
  - Usage of _native promises_ instead of [bluebird](http://bluebirdjs.com/docs/getting-started.html)
  - Tests re-written in [Jest](https://facebook.github.io/jest) (could get rid  of [assert](https://github.com/defunctzombie/commonjs-assert),
    [mocha](https://mochajs.org/) and [istanbul](https://github.com/gotwarlost/istanbul))
  - Add travis build for Node.js v8.x
  - Remove travis build for Node.js < v4.x
  - Removal of `OptionsHandler` and `Validator` (replaced the validation by using [joi](https://github.com/hapijs/joi/tree/v10.5.0) now)

#### v2.0.1

- [[#39](https://github.com/deadratfink/jy-transform/issues/39)] Maintenance release
 - Update dependencies to latest
 - Add travis build for Node.js v7.x and v6.x
 - Docs improved/corrected
 - Add target pretest in `scripts` section to `rm` _./test/tmp_ folder

#### v2.0.0

- [[#33](https://github.com/deadratfink/jy-transform/issues/33)] Enhance `LogWrapper` with `TRACE` level (API)
- [[#32](https://github.com/deadratfink/jy-transform/issues/32)] Introduce input and output on CLI as ARGS instead of OPTIONS (non-backwards compatible change for CLI usage, _no_ impact on API level!)
 - e.g. on CLI type in `$ jyt.js foo.js bar.yaml` instead of `$ jyt.js -s foo.js -d bar.yaml`
- [[#31](https://github.com/deadratfink/jy-transform/issues/31)] Bugfix: given `Object` source results in 'yaml' for origin (API)
- [Cleanup] Update dependencies

#### v1.0.2

- [[#30](https://github.com/deadratfink/jy-transform/issues/30)] Fix README and externalize API reference to wiki
- [[#29](https://github.com/deadratfink/jy-transform/issues/29)] Fix Promise warning on write process

#### v1.0.1

Initial public release. This covers the basic implementation and tests. The following features and fixes and part of this release:

- [[#27](https://github.com/deadratfink/jy-transform/issues/27)] Export variable for JS input
- [[#22](https://github.com/deadratfink/jy-transform/issues/22)] Integrate Coveralls
- [[#21](https://github.com/deadratfink/jy-transform/issues/21)] Check and fix CodeClimate issues
- [[#20](https://github.com/deadratfink/jy-transform/issues/20)] Cleanup test dir
- [[#19](https://github.com/deadratfink/jy-transform/issues/19)] File overwrite switch (`-f`, `-force`)
- [[#18](https://github.com/deadratfink/jy-transform/issues/18)] Read and Write from other sources than file path
- [[#16](https://github.com/deadratfink/jy-transform/issues/16)] ERROR: Error: Invalid target option found while creating destination file extension
- [[#15](https://github.com/deadratfink/jy-transform/issues/15)] Measure test code coverage and add a badge
- [[#12](https://github.com/deadratfink/jy-transform/issues/12)] Create middleware collection file to use by clients and internally
- [[#11](https://github.com/deadratfink/jy-transform/issues/11)] Check all Promises for optimization possibilities
- [[#10](https://github.com/deadratfink/jy-transform/issues/10)] Integrate project with Travis
- [[#9](https://github.com/deadratfink/jy-transform/issues/9)] Resolve origin and target from file extension whenever possible
- [[#8](https://github.com/deadratfink/jy-transform/issues/8)] Enable JS reading with `require(...)`
- [[#7](https://github.com/deadratfink/jy-transform/issues/7)] YAML indent is not set to `Constants.MIN_YAML_INDENT` when indent is set to 0
- [[#6](https://github.com/deadratfink/jy-transform/issues/6)] Finish full JSDoc for all methods
- [[#5](https://github.com/deadratfink/jy-transform/issues/5)] Write unit tests
- [[#4](https://github.com/deadratfink/jy-transform/issues/4)] Export variable for JS output
- [[#3](https://github.com/deadratfink/jy-transform/issues/3)] Promise array as middleware solved with `Promise.all([...])`
