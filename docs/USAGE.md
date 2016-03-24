## Motivation

Why this module? After struggling with some huge YAML file and accidentally 
occurring wrong indentions which results in an annoying failure investigation, 
I decided to get rid of the YAML file and therefore, create a module which 
should be aimed as the swiss army knife for transforming YAML, JS and JSON 
files into each other.

## Contributing

Pull requests and stars are always welcome. Anybody is invited to take part 
into this project. For bugs and feature requests, please create an 
[issue](https://github.com/deadratfink/jy-transform/issues).
When contributing as coder, please take care of the following conventions:

- Enter yourself in the `constributors` section of _package.json_.
- We strictly follow [Semantic Versioning 2](http://semver.org) rules.
- The `development` branch is the leading branch. Create bugfix and feature 
  branches (or fork into you own namespace) and create pull 
  requests to `development` when finished. Any of these should be prefixed with 
  `bugfix/#...` or `feature/#...` (containing issue number followed by a short, "underscored" 
  proper meaning), e.g. 
  - `bugfix/#8_fix_js_reading_with_require`
  - `feature/#14_multidocument_support`
- The `master` branch is protected and will never be pushed directly (always use pull-requests).
- Indention for any file is 4 SPACEs.
- Keep code coverage high (> 90%).
- Doc everything with [JSDocs](http://usejsdoc.org/) and document concepts in 
  [README.md](https://github.com/deadratfink/jy-transform/blob/development/README.md)
  or [Wiki](https://github.com/deadratfink/jy-transform/wiki).
- Use single parenthesis (`'...'`) instead of double parenthesis (`"..."`)
- Avoid the of use parenthesis for keys in JSON objects.
- Use the strict mode (`'use strict';`) in _*.js_ files.


## Not Supported Yet / Plannings

At the moment we require that each document to transform is a _single_ one per file!

Multidocument handling would be a cool feature which refers in general to YAML 
and JS only and is currently not supported. This is planned and reflected 
in feature [#14](https://github.com/deadratfink/jy-transform/issues/14).

# Usage

The module can bu used on CLI or as API. The latter is fully [Promise](http://bluebirdjs.com/docs/api-reference.html) 
based. Besides transformation this module can also be used for laoding and/or writing 
YAML, JS or JSON files. 

## Usage Types

The module can be used in two different ways:

- On CLI (recommended install globally via `-g` option)
- Via API (install locally)

All use cases are described in more detail in the following sections.

## Use Cases

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

## CLI Usage

The CLI provides the `jyt` command (actually, this requires the use of a bunch of options). 
After the global installation you can access the Transformer command options with the help 
command as follows:

```
$ jyt --help
```

### CLI Options

The `--help` options prints an overview about all available CLI properties:

```
$ jyt --help
Usage:
  jyt [OPTIONS]

Options: 
  -o, --origin [STRING]  The conversion origin: [ js | json | yaml ] (Default is : if not given, the type is tried to be inferred from the extension of input path, else it is yaml)
  -t, --target [STRING]  The conversion target: [ js | json | yaml ] (Default is : if not given, the type is tried to be inferred from the extension of output path, else it is js)
  -s, --src PATH         The absolute/relative input file path
  -d, --dest [PATH]      The absolute/relative output file path (Default is relative to input file)
  -i, --indent [NUMBER]  The indention for pretty-print: 0 - 8 (json/js) and 1 - 8 (yaml) (Default is 4)
  -k, --no-color         Omit color from output
      --debug            Show debug information
  -v, --version          Display the current version
  -h, --help             Display help and usage details
```

These are more formally defined in the following table: 

| Name | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
| `-o, --origin` | [ _js_ &#124; _json_ &#124; _yaml_ ]</code> | The transformation origin type. | if not given, the type is tried to be inferred from the extension of source path, else it is _yaml_ | no |
| `-t, --target` | [ _js_ &#124; _json_ &#124; _yaml_ ]</code> | The transformation target type. | if not given, the type is tried to be inferred from the extension of destination path, else it is _js_ | no |
| `-s, --src` | URI | The source file path for transformation. | - | yes |
| `-d, --dest` | URI | The destination file path to transform to. | _'relative to input file'_ | no |
| `-i, --indent` | integer<br> - JSON/JS: _0_-_8_<br> - YAML: _1_-_8_ | The code indention used in destination files. | _4_ | no |
| `-k, --no-color` | n/a | Omit color from output. | _color_ | no |
| `--debug` | n/a | Show debug information. | _false_ | no |
| `-v, --version` | n/a | Display the current version. | n/a | no |
| `-h, --help` | n/a | Display help and usage details. | n/a | no |

Now we know which properties we can apply on CLI, so let's assume we 
have a YAML file located in _./data/my.yaml_ holding this data:

```yaml
myproperty: value
```

then we can transform it to a JSON file _./data/my.json_:

```javascript
{
  "myproperty": "value"
}
```

using this command:

```
$ jyt -s ./data/my.yaml -t json -i 2
```

In this example we have overwritten the standard target type (which is _js_) and applying an
indent of _2_ instead of the default _4_. As default the output file _./data/my.json_ 
is written relative to the input file (simply omitting the `dest` option here).

**NOTE:** here you _have_ to provide the target with `-t json` or else the default `js` would 
have been applied! If the source would have been a `js` type like

```
$ jyt -s ./data/my.js -t json -i 2
```

then the `js` value for `origin` is automatically inferred from file extension. 
Analogous, this is also true for the `target` option.

## Origin and Target Type Inference

The example above has shown that we have an automatic type inference from file 
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

| Name | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
| origin | <code>string</code> | The origin type. | if not given, the type is tried to be inferred from the extension of source path, else it is 'yaml' | no |
| target | <code>string</code> | The target type. | if not given, the type is tried to be inferred from the extension of destination path, else it is 'js' | no |
| src | <code>string &#124; Readable &#124; object</code> | The source information object: `string` is used as file path, `Readable` stream provides a stringified source and `object` is used as direct JS source.| - | yes |
| dest | <code>string &#124; Writable &#124; object</code> | The destination information object: `string` is used as file path, `Writable` stream writes a stringified source and `object` is used as direct JS object for assignment. | 'relative to input file' | no |
| indent | <code>number</code> | The indention in files. | 4 | no |  

#### Example

```javascript
var options = {
    origin: 'json',
    target: 'yaml',
    src: './my.json',
    dest: './temp/my.yaml',
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
used internally when no middleware is provided to ensure the proper promisified 
control flow.

OK, lets go back to a more practical example, e.g. we want to alter the value of
JSON property before it is written to a file. Assuming we have this piece of YAML
object as input:

```yaml
myproperty: old value
```

Applying this [Promise](http://bluebirdjs.com/docs/api-reference.html) as middleware

```javascript
var middleware = function (json) {
    json.myproperty = 'new value'; 
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
	"myproperty": "new value"
}
```

Of course, you often will have use cases with much more complex and/or huger logic where one function 
might be insufficient. This does not raise as a problem at all, because you can create several 
functions to be applied in the whole transformation process by gathering them in one function.

Let's assume we have some Promise functions to apply. For simplicity reasons we simulate 
these for the moment by three functions, each adding key-value to the given (empty) JSON 
object.

**BE AWARE:** each of them has to return the `json` object! 


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
Promise framework, e.g. the  [`Promise.all([...])`](http://bluebirdjs.com/docs/api/promise.all.html) 
function. This can collect all three functions above and ensure their proper execution:

 
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

The result in the `middleware` function can be retrieved from the `result` array, in `Promise.all([...])` 
you have to pick the last element which contains the "final product":

```javascript
{
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
}
```

which is then to be passed back to the transformation chain. Following this pattern 
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

