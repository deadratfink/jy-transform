# Contributing

Pull requests and stars are always welcome. Anybody is invited to take part 
into this project. For bugs and feature requests, please create an 
[issue](https://github.com/deadratfink/jy-transform/issues).
When contributing as coder, please take care of the following conventions:

- Enter yourself in the `constributors` section of _package.json_.
- We strictly follow [Semantic Versioning 2](http://semver.org) rules.
- The `development` branch is the leading branch and is protected. Create bugfix and feature 
  branches (or fork into you own namespace) and create pull 
  requests to `development` when finished. Any of these should be prefixed with 
  `bugfix/#...` or `feature/#...` (followed by issue number and a short, "underscored" 
  proper meaning), e.g. 
  - `bugfix/#8_fix_js_reading_with_require`
  - `feature/#14_multidocument_support`
- Remember that name could need to be enclosed in quotes, e.g. 
  ```$ git checkout -b 'feature/#19_...'```
  when using git shell command.
- The `master` branch is protected and is the stable branch after a release. 
  It will never be pushed directly (only on release build).
- Indention for any file is 4 SPACEs.
- Keep code coverage high (> 95%).
- Doc everything with [JSDocs](http://usejsdoc.org/) and document concepts in 
  [README.md](https://github.com/deadratfink/jy-transform/blob/development/README.md)
  or [Wiki](https://github.com/deadratfink/jy-transform/wiki).
- Use single parenthesis (`'...'`) in _*.js_ files instead of double parenthesis (`"..."`).
- Avoid the of use parenthesis for keys in JSON objects.
- Use the strict mode (`'use strict';`) in _*.js_ files.
- File names should be lower-case with hyphens as divider, e.g. _options-handler.js_.
- Markdown documentation files should be upper-case with _.md_ as extension, placed 
  in _./docs_, e.g. _USAGE.md_. The _README.md_ is build up by these files concatenated 
  by `npm run docs` command. Any new files have to be added to `scripts.docs` section of 
  _package.json_. Don't forget to regenerate _README.md_ before committing.

