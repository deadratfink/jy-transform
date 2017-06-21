# jy-transform 

This project aims to read, write and transform YAML, JS or JSON objects into each other using CLI or API, while the source and destination resources can be files on CLI and additionally, objects or streams on API level.

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install jy-transform --global
```



# Stats

## General

| [License](https://github.com/deadratfink/jy-transform/blob/master/LICENSE.md) | [Issues](https://github.com/deadratfink/jy-transform/issues) | [Releases](https://github.com/deadratfink/jy-transform/releases) | [Tags](https://github.com/deadratfink/jy-transform/tags) | [Travis CI](https://travis-ci.org) | [Waffle](https://waffle.io/deadratfink/jy-transform) | [Code Climate](https://codeclimate.com/github/deadratfink/jy-transform) |
| --- | --- | --- | --- | --- | --- | --- |
| [![License][gh-license-image]][gh-license-url] | [![Issue Stats][gh-issues-image]][gh-issues-url] | [![Releases][gh-releases-image]][gh-releases-url] | [![Tags][gh-tags-image]][gh-tags-url] | [![Build Status][ci-image]][ci-url] | [![Waffle][waffle-image]][waffle-url] | [![Code Climate][cocl-image]][cocl-url] |

## Branches

| Branch | [Codecov](https://codecov.io) | [Coveralls](https://coveralls.io) | [Inch CI](http://inch-ci.org) | [David](https://david-dm.org) DM | [David](https://david-dm.org) DM (dev) |
| --- | --- | --- | --- | --- | --- |
| master | [![codecov.io][cc-image-master]][cc-url-master]           | [![coveralls.io][ca-image-master]][ca-url-master]           | [![inch-ci.org][inch-image-master]][inch-url-master]           | [![Dependency Status][dep-image-master]][dep-url-master]           | [![devDependency Status][devdep-image-master]][devdep-url-master] |
| development | [![codecov.io][cc-image-development]][cc-url-development] | [![coveralls.io][ca-image-development]][ca-url-development] | [![inch-ci.org][inch-image-development]][inch-url-development] | [![Dependency Status][dep-image-development]][dep-url-development] | [![devDependency Status][devdep-image-development]][devdep-url-development] |

### Coverage

| master | development |
| --- | --- |
| ![codecov.io](https://codecov.io/gh/deadratfink/jy-transform/branch/master/graphs/tree.svg) | ![codecov.io](https://codecov.io/gh/deadratfink/jy-transform/branch/development/graphs/tree.svg) |

<!--| Branch | Graph | -->
<!--| --- | --- | -->
<!--| master | ![codecov.io](https://codecov.io/github/deadratfink/jy-transform/branch.svg?branch=master&vg=true) | -->
<!--| development| ![codecov.io](https://codecov.io/github/deadratfink/jy-transform/branch.svg?branch=development&vg=true) | -->

## NPM

[![NPM](https://nodei.co/npm/jy-transform.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/jy-transform/)
[![NPM](https://nodei.co/npm-dl/jy-transform.png?height=3&months=9)](https://nodei.co/npm-dl/jy-transform/)

[gh-license-image]: https://img.shields.io/github/license/deadratfink/jy-transform.svg?style=flat-square
[gh-license-url]: https://github.com/deadratfink/jy-transform/blob/master/LICENSE.md

[gh-issues-image]: https://img.shields.io/github/issues/deadratfink/jy-transform.svg?style=flat-square
[gh-issues-url]: https://github.com/deadratfink/jy-transform/issues

[gh-releases-image]: https://img.shields.io/github/release/deadratfink/jy-transform.svg?style=flat-square
[gh-releases-url]: https://github.com/deadratfink/jy-transform/releases

[gh-tags-image]: https://img.shields.io/github/tag/deadratfink/jy-transform.svg?style=flat-square
[gh-tags-url]: https://github.com/deadratfink/jy-transform/tags


[ci-image]: https://img.shields.io/travis/deadratfink/jy-transform.svg?style=flat-square
[ci-url]: https://travis-ci.org/deadratfink/jy-transform/branches

[is-pull-image]: http://issuestats.com/github/deadratfink/jy-transform/badge/pr?style=flat-square
[is-issue-image]: http://issuestats.com/github/deadratfink/jy-transform/badge/issue?style=flat-square
[is-url]: http://issuestats.com/github/deadratfink/jy-transform

[waffle-image]: https://badge.waffle.io/deadratfink/jy-transform.png?label=ready&title=Ready&style=flat-square
[waffle-url]: https://waffle.io/deadratfink/jy-transform

[cocl-image]: https://img.shields.io/codeclimate/github/deadratfink/jy-transform.svg?style=flat-square
[cocl-url]: https://codeclimate.com/github/deadratfink/jy-transform


[cc-image-master]: https://img.shields.io/codecov/c/github/deadratfink/jy-transform/master.svg?style=flat-square
[cc-url-master]: https://codecov.io/github/deadratfink/jy-transform?branch=master
[cc-image-development]: https://img.shields.io/codecov/c/github/deadratfink/jy-transform/development.svg?style=flat-square
[cc-url-development]: https://codecov.io/github/deadratfink/jy-transform?branch=development

[ca-image-master]: https://img.shields.io/coveralls/deadratfink/jy-transform/master.svg?style=flat-square
[ca-url-master]: https://coveralls.io/github/deadratfink/jy-transform?branch=master
[ca-image-development]: https://img.shields.io/coveralls/deadratfink/jy-transform/development.svg?style=flat-square
[ca-url-development]: https://coveralls.io/github/deadratfink/jy-transform?branch=development


[inch-image-master]: https://inch-ci.org/github/deadratfink/jy-transform.svg?branch=master&style=flat-square
[inch-url-master]: https://inch-ci.org/github/deadratfink/jy-transform?branch=master
[inch-image-development]: https://inch-ci.org/github/deadratfink/jy-transform.svg?branch=development&style=flat-square
[inch-url-development]: https://inch-ci.org/github/deadratfink/jy-transform?branch=development

[dep-image-master]: https://img.shields.io/david/deadratfink/jy-transform/master.svg?style=flat-square
[dep-url-master]: https://david-dm.org/deadratfink/jy-transform/master
[dep-image-development]: https://img.shields.io/david/deadratfink/jy-transform/development.svg?style=flat-square
[dep-url-development]: https://david-dm.org/deadratfink/jy-transform/development

[devdep-image-master]: https://img.shields.io/david/dev/deadratfink/jy-transform/master.svg?style=flat-square
[devdep-url-master]: https://david-dm.org/deadratfink/jy-transform/master#info=devDependencies
[devdep-image-development]: https://img.shields.io/david/dev/deadratfink/jy-transform/development.svg?style=flat-square
[devdep-url-development]: https://david-dm.org/deadratfink/jy-transform/development#info=devDependencies

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## TOC

  - [Motivation](#motivation)
- [Usage](#usage)
  - [Usage Types](#usage-types)
  - [Use Cases](#use-cases)
  - [Limitations](#limitations)
  - [CLI Usage](#cli-usage)
  - [Origin and Target Type Inference](#origin-and-target-type-inference)
  - [API Usage](#api-usage)
  - [Using Custom Logger](#using-custom-logger)
- [API Reference](#api-reference)
- [Contributing](#contributing)
  - [Further information](#further-information)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Motivation

Why this module? After struggling with some huge YAML file and accidentally
occurring wrong indentions which results in an annoying failure investigation,
I decided to get rid of the YAML file and therefore, create a module which
should be aimed as the swiss army knife for transforming YAML, JS and JSON
types into each other format.

# Usage

The module can be used on CLI or as API (the latter is fully [Promise](http://bluebirdjs.com/docs/api-reference.html)
based).

## Usage Types

Since the module can be used in two different ways, use installation as follows:

- CLI: install globally via `-g` option
- API: install locally

Both usage types are described in more detail in the following sections.

## Use Cases

So, what are the typical use cases for this module? In terms of _transformation_
these consists of different phases:

- Reading files (`Reader`)
- Transforming JSON objects (`Transformer`)
- Apply dedicated actions on the intermediate JSON objects (`Transformer` + `Middleware`)
- Writing files (`Writer`)

### Reading

Reading from:

- _*.yaml_ file
- _*.js_ file
- _*.json_ file

Additionally, on API level to a:

- `stream.Readable`
 - Serialized JSON and YAML
 - Requires `options.origin` property set
 - Reads as UTF-8
- JS `object` (actually, this means the reading phase is skipped, because object is in-memory already)

### Transformation

The transformation can take place into several directions:

- YAML ⇒ JS
- YAML ⇒ JSON
- JS   ⇒ YAML
- JSON ⇒ YAML
- JS   ⇒ JSON
- JSON ⇒ JS
- YAML ⇒ YAML
- JSON ⇒ JSON
- JS   ⇒ JS

while:

- [YAML](http://http://yaml.org/) = _*.yaml_, _*.yml_
- [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) = _*.js_ (JS object)
- [JSON](http://json.org) = _*.json_ (JS object serialized as JSON)

### Middleware

Apply actions on the intermediate JS object via injected [Promise](http://bluebirdjs.com/docs/api-reference.html)
functions. This is an optional part for [transformation](#transformation) phase.

### Writing

Writing to:

- _*.yaml_ file
- _*.js_ file
- _*.json_ file

Additionally, on API level to a:

- `stream.Writable`
 - Serialized JS, JSON and YAML
 - Requires `options.target` property set
 - Writes UTF-8
- JS `object`

## Limitations

- Since this module is build to transform from and to different type formats, any
  `Function`s residing in JS type objects are _not_ supported, e.g. transforming
  
  ```javascript
  module.exports = {
      fooKey: 'foo',
      fooFunction: function foo() {
          //...
      }
  }
  ```
  
  to JSON would simply result in
  
  ```json
  {
      "fooKey": "foo"
  }
  ```
  
  while transforming to YAML type would even result in an `Error`, e.g. printed
  on CLI usage like this:
  
  ```
  ERROR: YAMLException: unacceptable kind of an object to dump [object Function]
  ```
  
- Multidocument handling would be a cool feature which refers in general to YAML
  and JS only, but at the moment we require that each document to transform is a
  _single_ one per source (or in case of JS could be identified)! This feature is
  planned and reflected in [#14](https://github.com/deadratfink/jy-transform/issues/14).
- Schema validation for input and output is another topic which is planned by
  [#1](https://github.com/deadratfink/jy-transform/issues/1) and
  [#2](https://github.com/deadratfink/jy-transform/issues/2).

## CLI Usage

The CLI provides the `jyt.js` command (actually, this might require the use of options).
After the global installation you can access the `Transformer`'s command options
with the usual `--help` option which prints an overview about all
available CLI properties:

```
$ jyt.js --help
Usage:
  jyt.js INPUT-FILE [OUTPUT-FILE] [OPTIONS]

Options:
  -o, --origin [STRING]  The origin type of INPUT-FILE: [ js | json | yaml ]. (Default is if not given, the type is tried to be inferred from the extension of source path, else it is 'yaml')
  -t, --target [STRING]  The target type of OUTPUT-FILE: [ js | json | yaml ]. (Default is if not given, the type is tried to be inferred from the extension of destination path, else it is 'js')
  -i, --indent [NUMBER]  The indention for pretty-print: 1 - 8. (Default is 4)
  -f, --force            Force overwriting of existing output files on write phase. When files are not overwritten (which is default),
                         then the next transformation with same output file name gets a consecutive number on the base file name, e.g. in
                         case of foo.yaml it would be foo(1).yaml.
  -m, --imports STRING   Define a 'module.exports[.identifier] = ' identifier (to read from JS _source_ file only, must be a valid JS
                         identifier!).
  -x, --exports STRING   Define a 'module.exports[.identifier] = ' identifier (for usage in JS destination file only, must be a valid JS
                         identifier!).
  -k, --no-color         Omit color from output
      --debug            Show debug information
  -v, --version          Display the current version
  -h, --help             Display help and usage details
```

### CLI Args

The ARGS are more formally defined in the following table:

| Arg | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
| `INPUT-FILE` | URI | The source file path for transformation. | - | yes |
| `OUTPUT-FILE` | URI | The destination file path to transform to. | When this options is omitted then the output file is stored relative to the input file (same base name but with another extension if type differs). If input and output type are the same then the file overwriting is handled depending on the `--force` value! | no |

**NOTE:** the input file has to be specified and should be _first_ argument (in fact, it can be anywhere but it must be before an out file argument)!

### CLI Options

The OPTIONS are more formally defined in the following table:

| Option (short) | Option (long) | Type | Description | Default | Required |
| --- | --- | --- | --- | --- | --- |
| `-o` | `--origin` | string of: [ _js_ &#124; _json_ &#124; _yaml_ ]</code> | The transformation origin type. | if not given, the type is tried to be inferred from the extension of source path, else it is _yaml_ | no |
| `-t` | `--target` | string of: [ _js_ &#124; _json_ &#124; _yaml_ ]</code> | The transformation target type. | if not given, the type is tried to be inferred from the extension of destination path, else it is _js_ | no |
| `-i` | `--indent` | integer<br>[ 1 - 8 ]<br> | The code indention used in destination files. | 2 | no |
| `-f` | `--force` | n/a | Force overwriting of existing output files on write phase. When files are not overwritten (which is default), then the next transformation with same output file name gets a consecutive number on the base file name, e.g. in case of _foo.yaml_ it would be _foo(1).yaml_.  | _false_ | no |
| `-m` | `--imports` | string | Define a 'module.exports[.identifier] = ' identifier (to read from JS _source_ file only, must be a valid JS identifier!) | _undefined_ | no |
| `-x` | `--exports` | string | Define a 'module.exports[.identifier] = ' identifier (for usage in JS _destination_ file only, must be a valid JS identifier!) | _undefined_ | no |
| `-k` | `--no-color` | n/a | Omit color from output. | _color_ | no |
|  n/a | `--debug` | n/a | Show debug information. | _false_ | no |
| `-v` | `--version` | n/a | Display the current version. | n/a | no |
| `-h` | `--help` | n/a | Display help and usage details. | n/a | no |


**NOTE:** an invalid indention setting (1 > `-i`, `--indent` > 8) does not raise an error but a default of 4 SPACEs is applied instead.

### Examples

Now we know which properties can be applied on CLI, so let's assume we
have a YAML content located in _foo.yaml_ holding this data:

```yaml
foo: bar
```
#### Example: YAML ⇒ JSON

Then we can transform it to a JSON content as _foo.json_ file:

```json
{
  "foo": "bar"
}
```

simply by using this command:

```
$ jyt.js foo.yaml -t json -i 4
```

In this example we have overwritten the standard target type (which is `js`)
and applying an indent of 4 SPACEs instead of the default (2). As default the output
file _foo.json_ is written relative to the input file (by omitting the
`dest` option here).

**NOTE:** here you _have_ to provide the target with option `-t json` or else the
default `js` would have been applied! If the source would have been a `js`
type like

```
$ jyt.js foo.js -t json -i 4
```

then the `js` value for `origin` is automatically inferred from file extension.
Accordingly, this is also true for the `target` option.

#### Example: JSON ⇒ JS
The command
```
$ jyt.js foo.json -i 4
```
results in _foo.js_:
```javascript
module.exports = {
    foo: "bar"
}
```

#### Example: JS ⇒ YAML
The command
```
$ jyt.js foo.js -t yaml
```
results in _foo.yaml_:
```yaml
foo: bar
```

#### Example: Transformation with Different Destination

Simply specify the _output_ file with a different file name:
```
$ jyt.js foo.json results/foobar.yaml
```

#### Example: Transformation with Unsupported Source File Extension

As said, normally we infer from file extension to the type, but assume the source
file has a file name which does not imply the type (here a JSON
type in a TEXT file), then you can simply provide the `-o` option with the
correct `origin` type (of course, the `-t` option works analogous):
```
$ jyt.js foo.txt foobar.yaml -o json
```

#### Example: Read from File with Exports Identifier

It could be that a JS source `exports` several objects and you want to read
from exactly the one you specify, then provide the `-m` (`--imports`) option.

In this this example we have a _foo.js_ file exporting _two_ objects:

```javascript
module.exports.foo = {
  foo: 'bar'
};

module.exports.bar = {
  bar: 'foo'
};
```
but you want to convert only `bar` object, then call:
```
$ jyt.js foo.js bar.yaml -m bar
```
to get the YAML result:
```yaml
bar: foo
```

**NOTE:** the same applies on API level when using JS objects as `dest`:

```javascript
var fooBar = {
  foo: 'bar',
  bar: 'foo'
};

var options = {
  src: fooBar,
  dest: {},
  exports: 'bar'
};

//...transform
```

The transformation will result in this in-memory object:

```javascript
bar: {
  foo: 'bar',
  bar: 'foo'
}
```
Of course, as sub-node of `options.dest`.

#### Example: Write Exports Identifier for JS File

Assume you want to generate a JS file with an exports string which gets an
identifier. We reuse the YAML file from above:
```yaml
foo: bar
```
using this command:
```
$ jyt.js foo.yaml foobar.js -x foobar
```
This generates the following output in JS file using `foobar` as identifier:
```javascript
module.exports.foobar = {
  foo: "bar"
}
```

**NOTE:** the identifier must be a valid JS identifier accoding to ECMAScript 6
(see also [Valid JavaScript variable names in ECMAScript 6](https://mathiasbynens.be/notes/javascript-identifiers-es6)
and [Generating a regular expression to match valid JavaScript identifiers](https://mathiasbynens.be/demo/javascript-identifier-regex)).

#### Example: Force Overwriting

**IMPORTANT NOTE:** when using this feature then any subsequent
execution which uses the same target/file name,
will overwrite the original source or target created beforehand!

By default this feature is not enabled to prevent you from accidentally
overwriting your input source or already generated targets.

But let's say we want to overwrite the original source now because you want
to change the indention from 2 to 4 SPACEs, then we can do this as follows:
```
$ jyt.js foo.js -f
```
Of course, leaving out the `-f` switch creates a new file relatively to
the `origin`, named as _foo(1).js_ (note the consecutive number). Naturally,
another run of the command would result in a file called _foo(2).js_
and so forth.

## Origin and Target Type Inference

The examples above have shown that we have an automatic type inference from file
extensions. This is supported as shown by the following table (from-to):

| File Extension | Type |
| --- | --- |
| _*.yaml_ | _yaml_ |
| _*.yml_ | _yaml_ |
| _*.js_ | _js_ |
| _*.json_ | _json_ |

**NOTE:** if you have files without an extension or e.g. _*.txt_ you _have_ to
specify the origin or target type!

## API Usage

Since the usage on CLI is a 2-step process:

 1. Read from source file to JS object ⇒ 
 2. Write out (maybe to other type)

the direct API calls additionally provide the usage of a _middleware_ function
where you can alter the input JS object before it is written and therefore, which turns
this into a 3-step process:

 1. Read from source ⇒ 
 2. Alter the JS object ⇒ 
 3. Write out (maybe to other type)

For more details about this and all the functions provided by this module please refer to the
[API Reference](https://github.com/deadratfink/jy-transform/wiki/API-v3).

The `origin` and `target` type inference is also standard for the API level.

### API Properties

The `Transformer` exposes the following function which takes besides an (optional)
`middleware` function the necessary `options` for the transformation:

```javascript
async function transform(options, middleware)
```

#### Transformer Options

The `options` object has to follow this key-values table:

| Option | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
| `origin` | <code>_String_</code> | The origin type. | If not given, the type is tried to be inferred from the extension of source path, else it is _yaml_. | no |
| `target` | <code>_String_</code> | The target type. | If not given, the type is tried to be inferred from the extension of destination path, else it is _js_. | no |
| `src` | <code>[ _String_ &#124; _Stream.Readable_ &#124; _Object_ ]</code> | The source information object: `String` is used as file path, `Stream.Readable` provides a stringified source and `object` is used as direct JS source. | - | yes |
| `dest` | <code>[ _String_ &#124; _Stream.Writable_ &#124; _Object_ ]</code> | The destination information object: `String` is used as file path, `Stream.Writable` writes a stringified source and `object` is used for direct JS object assignment of the (stringified or JS object) source. If a string is set as file path then the output and if input and output file path are the same, then the file overwriting is handled depending on the `force` value! | - | yes |
| `indent` | <code>_Number_</code> | The indention in files. | 2 | no |
| `force` | <code>_Boolean_</code> | Force overwriting of existing output files on write phase. When files are not overwritten, then the next transformation with same output file name gets a consecutive number on the base file name, e.g. in case of _foo.yaml_ it would be _foo(1).yaml_. | _false_ | no |
| `imports` | <code>_String_</code> | Define a `module.exports[.identifier] = ...` identifier (to read from JS _source_ only, must be a valid JS identifier!) | _undefined_ | no |
| `exports` | <code>_String_</code> | Define a `module.exports[.identifier] = ...` identifier (for usage in JS _destination_ only, must be a valid JS identifier!) | _undefined_ | no |

**NOTE:** an invalid indention setting (1 > indent > 8) does not raise an error but a default of 2 SPACEs is applied instead.

#### Example

```javascript
var options = {
  origin: 'json',
  target: 'yaml',
  src: 'foo.json',
  dest: './foo/bar.yaml',
  indent: 4
}
```

### Using Middleware

The `middleware` is optional but if provided it must be of type `Function` and
a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
One of the easiest ones is the identity function

_f(data) → data_

which could be expressed as [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
function as follows:

```javascript
const identity = async (data) => {
    return data;
}
```

Of course, this would have no effect on the provided JS data. Actually, this one is
used internally when no middleware is provided to ensure the proper promised
control flow.

OK, lets go back to a more practical example, e.g. we want to alter the value of
JS property before it is written to a file. Assuming we have this piece of YAML
object as input:

```yaml
foo: old bar
```

Applying this [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
as middleware

```javascript
const middleware = async (data) => {
  data.foo = 'new bar';
  return data;
};

transform(options, middleware)
  .then(function (msg){
      logger.info(msg);
  })
  .catch(function (err) {
      logger.error(err.stack);
  });
```

will result in such JSON file:

```json
{
  "foo": "new bar"
}
```

Of course, in real world scenarios you will have use cases which usually have a
higher complexity where one function might be insufficient or at least
inconvenient. but this does not raise a problem at all, because you can create
several functions to be applied in the whole transformation process by gathering
them in one function.

Let's assume we have some Promise functions to apply. For simplicity reasons we
simulate these for the moment by some functions, each adding a key-value to the
given (initially empty) JS object.

**NOTE:** each of them has to resolve with the `data` object!

```javascript
const key1 = async (data) => {
  objectPath.set(data, 'key1', 'value1');
  return data;
};

const key2 = async (data) => {
  objectPath.set(data, 'key2', 'value2');
  return data;
};

const key3 = async (data) => {
    objectPath.set(data, 'key3', 'value3');
    return data;
};
```

These can be collected by different aggregation or composition functions of the underlying
Promise framework, e.g. using the [`Promise.all([...])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
function. This one can collect all three functions above and ensure their proper subsequent execution:

```javascript
const middleware = (data) => {
  return Promise.all([key1(data), key2(data), key3(data)])
    .then(result => result[result.length - 1]);
};

var logger = new Logger();
var transformer = new Transformer(logger);
var options = {
   src: {}
};

return transform(options, middleware)
  .then(msg => logger.info(msg))
  .catch(err => logger.error(err.stack));
```

Then the result in the `middleware` function can be retrieved from the returned
array, i.e. in case of [`Promise.all([...])`](http://bluebirdjs.com/docs/api/promise.all.html)
you have to pick the _last_ element which contains the "final product".

From our example above it would be result in this object

```javascript
{
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
}
```

which then is passed back to the transformation chain. Following this pattern
you can do almost everything with the JS object, like

- deleting properties
- changing properties to other types
- validating and throwing error if not valid
- ...

Whatever you do during transformation, just keep it valid ;-)

## Using Custom Logger

It is usual that you use an own `logger` in your application. This module supports you by
letting you inject your logger as constructor argument: the `Reader`, `Transformer` and
`Writer` constructor will accept an (optional) logger object.

If you do not provide one, then the default logger is `console`.

```javascript
var logger = ...;

var reader = new Reader(logger);
var transformer = new Transformer(logger);
var writer = new Writer(logger);
```

At least, the passed `logger` object _has_ to support the following functions:

```javascript
function info(msg)
function debug(msg)
function trace(msg)
function error(err|msg)
```
Anyway, there are some fallbacks if a level is not supported:

- DEBUG ⇒ INFO
- TRACE ⇒ DEBUG

# API Reference

For more details on how to use the API, please refer to the
[API Reference](https://github.com/deadratfink/jy-transform/wiki/API-v3)
wiki which describes the full API and provides more examples.

# Contributing

Pull requests and stars are always welcome. Anybody is invited to take part
into this project. For bugs and feature requests, please create an
[issue](https://github.com/deadratfink/jy-transform/issues).
See the wiki [Contributing](https://github.com/deadratfink/jy-transform/wiki/Changelog)
section for more details about conventions.



## Further information

- [Module Details](./PACKAGE.md)

- [Public Api Reference](./API-PUBLIC.md)

- [Private Api Reference](./API-PRIVATE.md)

- [Makefile Reference](./MAKE.md)

#### v3.0.0

- **CLI & API Changes (Backwards Incompatible!):**
  - Removed support for Node.js < v4.0
  - Default `options.indent` is 2 (instead of 4) now which seems to be more common in the JS/Node.js community
  
- **API Changes only (Backwards Incompatible!):**
  - Prototype removal from `Transformer`, `Reader` and `Writer`, turning it to simple exports of functions
  - Easier usage by using named imports only for all classes (i.e. also for `Transformer`)
  - The formerly exported `middleware` is not public anymore
  - Eased interfaces:
    - The formerly exported `Reader.readJs(...)|readYaml(...)` functions are not public anymore and replaced by a more simple to use `read(options)` function
    - The formerly exported `Writer.writeJs(...)|writeJson(...)|readYaml(...)` functions are not public anymore and replaced by a more simple to use `write(options)` function
  - The `options.imports/exports` are not allowed to be empty strings anymore (just leave it out)
  - The exported constants `YAML`, `JS` and `JSON` (usable for `options.origin/target`) are renamed respectively to `TYPE_YAML`, `TYPE_JS` and `TYPE_JSON`
  - `options.dest` is required for `Transfomer` and `Writer` on API usage now
  - Removal of `LogWrapper` (no more logger injection possible/needed)
  
- Internal Changes & Improvements:
  - Removal of _development_ branch
  - Usage of [babel](https://babeljs.io/) and therefore most modern language features
  - Code base could be shrinked and readabilty improved
  - Usage of _native promises_ instead of [bluebird](http://bluebirdjs.com/docs/getting-started.html)
  - Tests re-written in [Jest](https://facebook.github.io/jest) (could get rid  of [assert](https://github.com/defunctzombie/commonjs-assert),
    [mocha](https://mochajs.org/) and [istanbul](https://github.com/gotwarlost/istanbul))
  - Add travis build for Node.js v8.x
  - Remove travis build for Node.js < v4.x
  - Removal of `OptionsHandler` and `Validator` (replaced validation stuff by [joi](https://github.com/hapijs/joi/tree/v10.5.0))

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


## License

The MIT License (MIT)

Copyright (c) 2016 [Jens Krefeldt](https://github.com/deadratfink)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
