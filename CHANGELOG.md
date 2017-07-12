# Changelog

## v3.0.0

### Note
This release has undergone a huge refactoring which includes some new features, cleanups in many places
including a new public interface, bugfixes and many internal improvements. Of course, this resulted in some 
APIs and CLI backwards compatibilities (these are marked in the descriptions below). So, please read the following
changelog entries carefully and see also the following documents for more information about how to use the 
new interface:
- [README.md](https://github.com/deadratfink/jy-transform/blob/master/README.md)
- [API-PUBLIC.md](https://github.com/deadratfink/jy-transform/blob/master/API-PUBLIC.md)

### New Features:
- [[#59](https://github.com/deadratfink/jy-transform/issues/59)] Support single-quotes options for JS output.
  - **CLI & API Backwards Incompatible Change!**
  - This is the default now.
- [[#55](https://github.com/deadratfink/jy-transform/issues/55)] The `read` process returns a clone of the
  `options.src` when it is a JS object (so the origin would never be changed).
- The `options.transform` function (formerly aka _middleware_ function) must not need to be a Promise anymore, but it is still recommended.

###  Bugfixes:
- [[#57](https://github.com/deadratfink/jy-transform/issues/57)] The minimum indent for YAML target types is
  validated for 2 now and throws a `ValidationError` if < 2 (for others 0 is still valid).
- [[#56](https://github.com/deadratfink/jy-transform/issues/56)] If _destination_ is not given on transformation
  process but the _target_ is, then the destination's file extension 
  is adapted to the proper type, e.g. `$ ./jyt inch.json -t yaml` results in a file _inch.yaml_ (formerly:
  _inch.json_ with YAML content or respectively _inch(1).json_ with YAML, the latter if `options.force` was `true`).
  
### Public Interface Changes & Improvements:
- [[#61](https://github.com/deadratfink/jy-transform/issues/61)] Invalid indention setting should raise an error:
  - **CLI & API Backwards Incompatible Change!**
  - An invalid indention setting (i.e. `indent` < 0  or `indent` > 8) raises a `ValidationError` now instead
    of using default.
- [[#60](https://github.com/deadratfink/jy-transform/issues/60)] Default `[write.]options.indent` is 2 (instead of 4):
  - **CLI & API Backwards Incompatible Change!**
  - This seems to be more common in the JS/Node.js community.
- [[#57](https://github.com/deadratfink/jy-transform/issues/57)] Provide a simplified interface:
  - **API Backwards Incompatible Changes!**
  - The exported constants `YAML`, `JS` and `JSON` (usable for `options.origin/target`) are renamed respectively
    to `TYPE_YAML`, `TYPE_JS` and `TYPE_JSON`.
  - Prototype approach removed from `Transformer`, `Reader` and `Writer`, turning it to internal modules which 
    exports _named_ functions instead:
    - The formerly exported `Reader.readJs(...)/readYaml(...)` functions are not public anymore and replaced
      by a general `read(options)` function.
    - The formerly exported `Writer.writeJs(...)/writeJson(...)/writeYaml(...)` functions are not public
      anymore and replaced by a general `write(object, options)` function.
    - The formerly exported `Transformer.transform(options, middleware)` functions
      does not take the `middleware` parameter anymore (it is added to options: `options.transform`).
  - The formerly exported `middleware` (identity function) is not publicly available anymore.
  - Reduced and named export of constants: `TYPE_YAML`, `TYPE_JS` and `TYPE_JSON` only.
  - Removal of `LogWrapper` (no more logger injection possible).
  - The `options.imports/exports` are not allowed to be empty strings anymore (semantically senseless, just leave it out).
  - Of course, the configuration property `options.dest` is required for _write_ process when using the API (but not from _transformer_
    if it can be inferred from `options.src` but which is true for string or file stream sources only).
    
### Internal Changes & Improvements:
- [[#54](https://github.com/deadratfink/jy-transform/issues/54)] General dependency check and update:
  - Latest versions.
  - Usage of _native_ Promises instead of [bluebird](http://bluebirdjs.com/docs/getting-started.html).
  - Test dependencies reduced.
- [[#53](https://github.com/deadratfink/jy-transform/issues/53)] Update supported node versions:
  - **CLI & API Backwards Incompatible Change!**
  - Add travis build for Node.js v8.x.
  - Remove travis build for Node.js < v5.x.  
- [[#52](https://github.com/deadratfink/jy-transform/issues/52)] Leverage modern ES6 features:
  - Integrated by [babel](https://babeljs.io/).
  - Update of dependencies and amount reduced.
  - Code base could be shrinked and readabilty was improved.
- [[#51](https://github.com/deadratfink/jy-transform/issues/51)] Removal of _development_ branch.
- [[#50](https://github.com/deadratfink/jy-transform/issues/50)] Update/upgrade ESLint
- [[#49](https://github.com/deadratfink/jy-transform/issues/49)] Tests re-written in
  [Jest](https://facebook.github.io/jest), could get rid of "complex" test setup
  ([assert](https://github.com/defunctzombie/commonjs-assert), [mocha](https://mochajs.org/) and
  [istanbul](https://github.com/gotwarlost/istanbul)).
- [[#48](https://github.com/deadratfink/jy-transform/issues/48)] Using [Joi](https://github.com/hapijs/joi)
  for consistent options validation: 
  - Removal of `OptionsHandler` and `Validator`
- [[#47](https://github.com/deadratfink/jy-transform/issues/47)] Integration of
  [bithound.io](https://www.bithound.io/github/deadratfink/jy-transform)
- [[#46](https://github.com/deadratfink/jy-transform/issues/46)] Use Make as an abstraction to npm scripts
- [[#45](https://github.com/deadratfink/jy-transform/issues/45)] [Node Security Plattform] integrated.
- [[#43](https://github.com/deadratfink/jy-transform/issues/43)] Documentation restructured.


### v2.0.1

- [[#39](https://github.com/deadratfink/jy-transform/issues/39)] Maintenance release.
 - Update dependencies to latest.
 - Add travis build for Node.js v7.x and v6.x.
 - Docs improved/corrected.
 - Add target pretest in `scripts` section to `rm` _./test/tmp_ folder.

### v2.0.0

- [[#33](https://github.com/deadratfink/jy-transform/issues/33)] Enhance `LogWrapper` with `TRACE` level (API).
- [[#32](https://github.com/deadratfink/jy-transform/issues/32)] Introduce input and output on CLI as
  ARGS instead of OPTIONS
  (non-backwards compatible change for CLI usage, _no_ impact on API level!), e.g. on CLI type in
  `$ jyt.js foo.js bar.yaml` instead of `$ jyt.js -s foo.js -d bar.yaml`.
- [[#31](https://github.com/deadratfink/jy-transform/issues/31)] Bugfix: given `Object` source results in
  'yaml' for origin (API).
- [Cleanup] Update dependencies.

### v1.0.2

- [[#30](https://github.com/deadratfink/jy-transform/issues/30)] Fix README and externalize API reference to wiki.
- [[#29](https://github.com/deadratfink/jy-transform/issues/29)] Fix Promise warning on write process.

### v1.0.1

Initial public release. This covers the basic implementation and tests. The following features and fixes and
part of this release:
- [[#27](https://github.com/deadratfink/jy-transform/issues/27)] Export variable for JS input.
- [[#22](https://github.com/deadratfink/jy-transform/issues/22)] Integrate Coveralls.
- [[#21](https://github.com/deadratfink/jy-transform/issues/21)] Check and fix CodeClimate issues.
- [[#20](https://github.com/deadratfink/jy-transform/issues/20)] Cleanup test dir.
- [[#19](https://github.com/deadratfink/jy-transform/issues/19)] File overwrite switch (`-f`, `-force`).
- [[#18](https://github.com/deadratfink/jy-transform/issues/18)] Read and Write from other sources than file path.
- [[#16](https://github.com/deadratfink/jy-transform/issues/16)] ERROR: Error: Invalid target option found while
  creating destination file extension.
- [[#15](https://github.com/deadratfink/jy-transform/issues/15)] Measure test code coverage and add a badge.
- [[#12](https://github.com/deadratfink/jy-transform/issues/12)] Create middleware collection file to use by
  clients and internally.
- [[#11](https://github.com/deadratfink/jy-transform/issues/11)] Check all Promises for optimization possibilities.
- [[#10](https://github.com/deadratfink/jy-transform/issues/10)] Integrate project with Travis.
- [[#9](https://github.com/deadratfink/jy-transform/issues/9)] Resolve origin and target from file extension
  whenever possible.
- [[#8](https://github.com/deadratfink/jy-transform/issues/8)] Enable JS reading with `require(...)`.
- [[#7](https://github.com/deadratfink/jy-transform/issues/7)] YAML indent is not set to `Constants.MIN_YAML_INDENT`
  when indent is set to 0.
- [[#6](https://github.com/deadratfink/jy-transform/issues/6)] Finish full JSDoc for all methods.
- [[#5](https://github.com/deadratfink/jy-transform/issues/5)] Write unit tests.
- [[#4](https://github.com/deadratfink/jy-transform/issues/4)] Export variable for JS output.
- [[#3](https://github.com/deadratfink/jy-transform/issues/3)] Promise array as middleware solved with `Promise.all([...])`.
