# Contributing

When contributing as coder, please take care of the following conventions:

- Enter yourself in the `contributors` section of _package.json_.
- Strictly follow [Semantic Versioning 2](http://semver.org) rules.
- The `master` branch is the leading branch, is protected and is the stable branch after a release. 
  Create `bugfix`, `feature` and `refactor`
  branches (or fork into you own namespace) and create pull 
  requests to `master` when finished. Any of these should be prefixed with 
  `bugfix/#...`, `feature/#...` or `refactor/#...` (followed by issue number and a short, "underscored" 
  proper meaning), e.g. 
  - `bugfix/#8_fix_js_reading_with_require`
  - `feature/#14_multidocument_support`
- Remember that name could need to be enclosed in quotes, e.g. 
  ```$ git checkout -b 'feature/#19_...'```
  when using git shell command.
- Keep code coverage high (> 95%).
- Doc everything with [JSDoc](http://usejsdoc.org/) and document concepts in 
  [README.md](https://github.com/deadratfink/jy-transform/blob/development/README.md)
  or [Wiki](https://github.com/deadratfink/jy-transform/wiki).
- Coding style is defined by _.eslintrc.js_.
- File names should be lower-case with hyphens as divider, e.g. _options-handler.js_.
- Markdown documentation files should be upper-case with _.md_ as extension, placed 
  in _./docs_, e.g. _USAGE.md_. The _README.md_ is build up by these files concatenated 
  by `npm run docs` command. Any new files have to be added to `scripts.docs` section of 
  _package.json_. Don't forget to regenerate _README.md_ (`$ npm run docs`) and wiki 
  (`$ npm run wiki`) before committing.

