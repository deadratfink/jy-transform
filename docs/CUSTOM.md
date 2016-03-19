## Motivation

Why this module? After struggling with some huge YAML file and accidentally 
occurring wrong indentions which results in an annoying failure investigation, 
I decided to get rid of the YAML file and therefore, create a module which 
should be aimed as the swiss army knife for transforming YAML, JS and JSON 
files into each other.

# Usage

The module is fully [Promise](http://bluebirdjs.com/docs/api-reference.html) 
based!

## Use Cases

- Reading files (`Reader`)
- Transforming JSON objects (`Transformer`)
- Apply dedicated actions on the intermediate JSON objects (`Transformer` + `Middleware`)
- Writing files (`Writer`)

### Reading

Reading from:

- _*.yaml_
- _*.js_
- _*.json_

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

- YAML = _*.yaml_
- JS   = _*.js_   (JSON object)  
- JSON = _*.json_ (JSON serialized)

### Middleware

Apply actions on the intermediate JSON object via injected [Promise](http://bluebirdjs.com/docs/api-reference.html) 
functions. This is an optional part for [transformation](#transformation) phase 
or is the transformation itself in case of same origin and target type.

### Writing

Writing to:

- _*.yaml_
- _*.js_
- _*.json_

## Not Supported Yet / Plannings

At the moment we require that each document to transform is a _single_ one per file!

Multidocument handling would be a cool feature which refers in general to YAML 
and JS only and is currently not supported. This is planned and reflected 
in feature [#14](https://github.com/deadratfink/jy-transform/issues/14).

## Usage

The module can be used in two different ways:

- On CLI (recommended install globally via `-g` option)
- Via API (install locally)

### Usage On CLI

The CLI provides the `jyt` command followed by a bunch of options:

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

After the global installation you can access the Transformer command options as follows:

```
$ jyt --help
```

This prints an overview about all available properties:

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

Now let's assume we have a YAML file located in _./data/my.yaml_ holding this data:

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

then `js` `origin` is automatically inferred from file extension.

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

### Usage As Library (API Calls)

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

#### Transformation Properties

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
| src | <code>string</code> | The source file path. | - | yes |
| dest | <code>string</code> | The destination file path. | 'relative to input file' | no |
| indent | <code>number</code> | The indention in files. | 4 | no |  

#### Example

```
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
```

will result in such JSON file:

```javascript
{
	"myproperty": "new value"
}
```

Following this pattern you can do everything with the JSON object, like

- deleting properties
- changing properties to other types
- validating and throwing error if not valid
- ...

Whatever, but keep it valid when transforming ;-)

## Injecting Logger

The `Reader`, `Transfomer` and `Writer` constructors accept an (optional) logger object.
Default logger is `console`.

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

