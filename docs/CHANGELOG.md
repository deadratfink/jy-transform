# Changelog

### v2.0.0

- [[#32](https://github.com/deadratfink/jy-transform/issues/32)] Introduce input and output on CLI as ARGS instead of OPTIONS (non-backwards compatible change for CLI usage!)
 - E.g. type `$ jyt foo.js bar.yaml` instead of `$ jyt -s foo.js -d bar.yaml`
- [[#31](https://github.com/deadratfink/jy-transform/issues/31)] Fix: given `Object` source results in 'yaml' for origin (API)
- [[#26](https://github.com/deadratfink/jy-transform/issues/26)] API level `dest`: support for writing serialized JSON and YAML to _single_ (i.e. non-streamed) `Buffer` 
 - Requires `options.target` property set
 - Writes UTF-8 to Buffer
- [[#25](https://github.com/deadratfink/jy-transform/issues/25)] API level `src`: support for reading serialized JSON and YAML from _single_ (i.e. non-streamed) `Buffer`
 - Requires `options.origin` property set
 - Expects UTF-8 data in Buffer

### v1.0.2

- [[#30](https://github.com/deadratfink/jy-transform/issues/30)] Fix README and externalize API reference to wiki
- [[#29](https://github.com/deadratfink/jy-transform/issues/29)] Fix Promise warning on write process

### v1.0.1

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