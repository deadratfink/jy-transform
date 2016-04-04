## Motivation

Why this module? After struggling with some huge YAML file and accidentally 
occurring wrong indentions which results in an annoying failure investigation, 
I decided to get rid of the YAML file and therefore, create a module which 
should be aimed as the swiss army knife for transforming YAML, JS and JSON 
types into each other format.

## Contributing

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
- `stream.Readable` (requires `options.origin` property set)
- any JS object (actually, this mean read phase is skipped, because object is in-memory already)

### Transformation

The transformation can take place into several directions:

- YAML -> JS
- YAML -> JSON
- JS   -> YAML
- JSON -> YAML 
- JS   -> JSON 
- JSON -> JS 
- YAML -> YAML     
- JSON -> JSON
- JS   -> JS       

while:

- YAML = _*.yaml_, _*.yml_
- JS   = _*.js_   (JSON object)  
- JSON = _*.json_ (JSON serialized)

### Middleware

Apply actions on the intermediate JSON object via injected [Promise](http://bluebirdjs.com/docs/api-reference.html) 
functions. This is an optional part for [transformation](#transformation) phase.

### Writing

Writing to:

- _*.yaml_ file
- _*.js_ file
- _*.json_ file
- `stream.Writable`  (requires `options.target` property set)
- any JS object

## Limitations

- Since this module is build to transform from and to different type formats, any 
  `Function`s residing in JS type objects are _not_ supported, e.g. transforming
  ```javascript
  module.exports = {
      myKey1: 'value1',
      myFunction: 'value2'
  }
  ```
  to JSON would simply result in 
  ```javascript
  {
      myKey1: 'value1'
  }
  ```
  while transforming to YAML type would even result in an `Error`, e.g. printed 
  on CLI usage like this:
  ```
  ERROR: YAMLException: unacceptable kind of an object to dump [object Function]
  ```
- Multidocument handling would be a cool feature which refers in general to YAML 
  and JS only, but at the moment we require that each document to transform is a 
_single_ one per file! This feature is planned and reflected 
 in [#14](https://github.com/deadratfink/jy-transform/issues/14).
- Schema validation for input and output is another topic which is planned by 
  [#1](https://github.com/deadratfink/jy-transform/issues/1) and 
  [#2](https://github.com/deadratfink/jy-transform/issues/2).

## CLI Usage

The CLI provides the `jyt` command (actually, this requires the use of options). 
After the global installation you can access the `Transformer` command options with the help 
command as follows:

```
$ jyt --help
```

### CLI Options

The `--help` option prints an overview about all available CLI properties:

```
$ jyt --help
Usage:
  jyt [OPTIONS]

Options: 
  -o, --origin [STRING]  The conversion origin: [ js | json | yaml ]. (Default is : if not given, the type is tried to be inferred from the extension of source path, else it is yaml)
  -t, --target [STRING]  The conversion target: [ js | json | yaml ]. (Default is : if not given, the type is tried to be inferred from the extension of destination path, else it is js)
  -s, --src PATH         The absolute/relative input file path.
  -d, --dest [PATH]      The absolute/relative output file path. When this 
                         options is ommited then the output file is stored 
                         relative to the input file (same base name but with 
                         another extension if type differs). If input and 
                         output type are the same then the file overwriting is 
                         handled depending on the '--force' value!  (Default is storing relative to input file)
  -i, --indent [NUMBER]  The indention for pretty-print: 1 - 8.  (Default is 4)
  -f, --force            Force overwriting of existing output files on write 
                         phase. When files are not overwritten (which is 
                         default), then the next transformation with same 
                         output file name gets a consecutive number on the base 
                         file name, e.g. in case of foo.yaml it would be 
                         foo(1).yaml. 
  -x, --exports STRING   Define a 'module.exports[.identifier] = ' 
                         identifier, for usage in JS destination files only 
                         and must be a valid JS identifier! 
  -k, --no-color         Omit color from output
      --debug            Show debug information
  -v, --version          Display the current version
  -h, --help             Display help and usage details
```

These are more formally defined in the following table: 

| Option (short) | Option (long) | Type | Description | Default | Required |
| --- | --- | --- | --- | --- | --- |
| `-o` | `--origin` | [ _js_ &#124; _json_ &#124; _yaml_ ]</code> | The transformation origin type. | if not given, the type is tried to be inferred from the extension of source path, else it is _yaml_ | no |
| `-t` | `--target` | [ _js_ &#124; _json_ &#124; _yaml_ ]</code> | The transformation target type. | if not given, the type is tried to be inferred from the extension of destination path, else it is _js_ | no |
| `-s` | `--src` | URI | The source file path for transformation. | - | yes |
| `-d` | `--dest` | URI | The destination file path to transform to. | When this options is ommited then the output file is stored relative to the input file (same base name but with another extension if type differs). If input and output type are the same then the file overwriting is handled depending on the `--force` value! | no |
| `-i` | `--indent` | integer<br> - [ _1_-_8_ ]<br> | The code indention used in destination files. | _4_ | no |
| `-f` | `--force` | n/a | Force overwriting of existing output files on write phase. When files are not overwritten (which is default), then the next transformation with same output file name gets a consecutive number on the base file name, e.g. in case of foo.yaml it would be foo(1).yaml.  | _false_ | no |
| `-x` | `--exports` | string | Define a 'module.exports[.identifier] = ' identifier, for usage in JS destination files only and must be a valid JS identifier!  | _undefined_ | no |
| `-k` | `--no-color` | n/a | Omit color from output. | _color_ | no |
|  n/a | `--debug` | n/a | Show debug information. | _false_ | no |
| `-v` | `--version` | n/a | Display the current version. | n/a | no |
| `-h` | `--help` | n/a | Display help and usage details. | n/a | no |

**NOTE:** an invalid indention setting (_1_ > `-i`, `--indent` > _8_) does not raise an error but a default of _4_ SPACEs is applied instead.

### Examples

Now we know which properties we can apply on CLI, so let's assume we 
have a YAML file located in _./foo.yaml_ holding this data:

```yaml
foo: bar
```
#### Example: YAML -> JSON

then we can transform it to a JSON file _foo.json_

```javascript
{
  "foo": "bar"
}
```

using this command:

```
$ jyt -s foo.yaml -t json -i 2
```

In this example we have overwritten the standard target type (which is `js`) 
and applying an indent of _2_ instead of the default _4_. As default the output 
file _foo.json_ is written relative to the input file (simply omitting the 
`dest` option here).

**NOTE:** here you _have_ to provide the target with `-t json` or else the 
default `js` would have been applied! If the source would have been a `js` 
type like

```
$ jyt -s foo.js -t json -i 2
```

then the `js` value for `origin` is automatically inferred from file extension. 
Accordingly, this is also true for the `target` option.

#### Example: JSON -> JS

```
$ jyt -s foo.json -i 2
```
```javascript
module.exports = {
  foo: "bar"
}
```

#### Example: JS -> YAML

```
$ jyt -s foo.json -t yaml
```
```yaml
foo: bar
```

#### Example: Transformation with Different Destination

Simply provide the `-d` with a different file name:

```
$ jyt -s foo.json -d results/foobar.yaml
```

#### Example: Transformation with Unsupported Source File Extension

As said, normally we infer from file extension to the type but assume the source 
file has a file name which does not imply the type (here JS 
type in a TEXT file), then you can simply provide the `-o` option with the 
correct `origin` type (of course, the `-t` option works analogous):


```
$ jyt -s foo.txt -o js -d foobar.yaml
```

#### Example: Write Exports Identifier for JS File

Assume you want to generate a JS file with an exports string which gets an 
identifier. We reuse the YAML file from above 

```yaml
foo: bar
```

using this command:

```
$ jyt -s foo.yaml -d foobar.js -x foobar
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

**IMPORTANT NOTE:** any subsequent execution using the same target/file name, 
will overwrite the original source or target created beforehand!

By default this feature is not enbled to prevent you from accidentially 
overwriting your input source or already generated targets.

But let's say we want to overwrite the original source now because you want 
to change the indention from 2 to 4 SPACEs, then we can do this as follows:

```
$ jyt -s foo.js -f
```

This would change the indention from 2 (created in example before) to 4 

Of course, leaving out the `-f` switch creates a new file relatively to 
the origin named _foo(1).js_ (note the consecutive number)! Naturally, 
another run of the command would result int a file called _foo(2).js_ 
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

1. Read source file in to JSON object -> 
2. Write out (to another type)

the direct API calls additionally provide the usage of a _middleware_ function 
where you can alter the input JSON object before it is written and therefore, which turns 
this into a 3-step process:
 
1. Read source file in -> 
2. Alter the JSON object -> 
3. Write out (to another type)

For more details about this and all the functions provided by this module please refer to the 
[API Reference](#api-reference) below.

The `origin` and `target` type inference is also standard for the API level.

### API Properties

The `Transformer` exposes the following function which takes besides an (optional) 
`middleware` function the necessary `options` for the transformation:

```javascript
function transform(options, middleware)
```

The `options` object has to follow this key-values table:

| Option | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
| origin | <code>string</code> | The origin type. | If not given, the type is tried to be inferred from the extension of source path, else it is _yaml_. | no |
| target | <code>string</code> | The target type. | If not given, the type is tried to be inferred from the extension of destination path, else it is _js_ | no |
| src | <code>string &#124; Readable &#124; object</code> | The source information object: `string` is used as file path, `Readable` stream provides a stringified source and `object` is used as direct JS source. | - | yes |
| dest | <code>string &#124; Writable &#124; object</code> | The destination information object: `string` is used as file path, `Writable` stream writes a stringified source and `object` is used as direct JS object for assignment. | The output file is stored relative to the input file (same base name but with another extension if type differs). If input and output type are the same then the file overwriting is handled depending on the 'force' value! | no |
| indent | <code>number</code> | The indention in files. | _4_ | no |
| force | <code>boolean</code> | Force overwriting of existing output files on write phase. When files are not overwritten, then the next transformation with same output file name gets a consecutive number on the base file name, e.g. in case of _foo.yaml_ it would be _foo(1).yaml_. | _false_ | no |
| exports | <code>string</code> | Define a 'module.exports[.identifier] = ' identifier, for usage in JS destination files only and must be a valid JS identifier! | _undefined_ | no |

**NOTE:** an invalid indention setting (_1_ > indent > _8_) does not raise an error but a default of _4_ SPACEs is applied instead.

#### Example

```javascript
var options = {
    origin: 'json',
    target: 'yaml',
    src: 'foo.json',
    dest: './foo/bar.yaml',
    indent: 2
}
```

### Using Middleware

The `middleware` is optional but if provided it must be of type `Function` and 
a [Promise](http://bluebirdjs.com/docs/api-reference.html). One of the easiest 
ones is the identity function 

_f(data) -> data_ 

which could be expressed as 
[Promise](http://bluebirdjs.com/docs/api-reference.html) function as follows:

```javascript
var middleware = function (json) {
    return Promise.resolve(json);
}
```

Of course, this would have no effect on the provided JSON data. Actually, this one is 
used internally when no middleware is provided to ensure the proper promised 
control flow.

OK, lets go back to a more practical example, e.g. we want to alter the value of
JSON property before it is written to a file. Assuming we have this piece of YAML
object as input:

```yaml
foo: old bar
```

Applying this [Promise](http://bluebirdjs.com/docs/api-reference.html) as middleware

```javascript
var middleware = function (json) {
    json.foo = 'new bar'; 
    return Promise.resolve(json);
}

transformer.transform(options, middleware)
    .then(function (msg){
        logger.info(msg);
    })
    .catch(function (err) {
        logger.error(err.stack);
    });
```

will result in such JSON file:

```javascript
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
simulate these for the moment by three functions, each adding a key-value to the 
given (initially empty) JSON object.

**NOTE:** each of them has to resolve with the `json` object! 


```javascript
function key1(json) {
    objectPath.set(json, 'key1', 'value1');
    return Promise.resolve(json);
}

function key2(json) {
    objectPath.set(json, 'key2', 'value2');
    return Promise.resolve(json);
}

function key3(json) {
    objectPath.set(json, 'key3', 'value3');
    return Promise.resolve(json);
}
```

These can be collected by different aggregation or composition functions of the underlying
Promise framework, e.g. using the  [`Promise.all([...])`](http://bluebirdjs.com/docs/api/promise.all.html) 
function. This one can collect all three functions above and ensure their proper subsequent execution:

 
```javascript
var middleware = function (json) {
    return Promise.all([key1(json), key2(json), key3(json)])
        .then(function(result) {
            return Promise.resolve(result[result.length - 1]);
        });
};

var transformer = new Transformer(logger);
var logger = ...;
var options = {...};

return transformer.transform(options, middleware)
    .then(function (msg){
        logger.info(msg);
    })
    .catch(function (err) {
        logger.error(err.stack);
    });
```

Then the result in the `middleware` function can be retrieved from the returned 
array, i.e. in case of [`Promise.all([...])`](http://bluebirdjs.com/docs/api/promise.all.html) 
you have to pick the _last_ element which contains the "final product". 
From our example above it would be

```javascript
{
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
}
```

which then is passed back to the transformation chain. Following this pattern 
you can do almost everything with the JSON object, like

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

At least, the passed logger object _has to_ support the following functions:

```javascript
function info(msg)
function debug(msg)
function error(msg)
```

---

For more details refer to the [API Reference](#api-reference) section which describes 
the full API and provides more examples.

