# jy-transform 

This project aims to read, write and transform _*.yaml_ files to _.js_ or _*.json_ files or vice-versa via CLI or API.

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install jy-transform --global
```


## Tests

```sh
npm install
npm test
```

## Dependencies

- [bluebird](https://github.com/petkaantonov/bluebird): Full featured Promises/A+ implementation with exceptionally good performance
- [cli](https://github.com/chriso/cli): A tool for rapidly building command line apps
- [js-yaml](https://github.com/nodeca/js-yaml): YAML 1.2 parser and serializer
- [mkdirp-then](https://github.com/fs-utils/mkdirp-then): mkdirp as promised
- [serialize-js](https://github.com/RReverser/serialize-js): User-readable object serialization for JavaScript.

## Dev Dependencies

- [jsdoc-parse](https://github.com/jsdoc2md/jsdoc-parse): Jsdoc-annotated source code in, JSON format documentation out.
- [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown): jsdoc-annotated source in, markdown API docs out.
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [package-json-to-readme](https://github.com/zeke/package-json-to-readme): Generate a README.md from package.json contents


## License

SEE LICENSE IN [LICENSE.md](https://github.com/deadratfink/jy-transform/blob/master/LICENSE)

# Documentation

Why this module? After struggling with some huge YAML file and accidentally 
occurring wrong indentions which results in an annoying failure investigation, 
I decided to get rid of the YAML file and therefore, create a module which 
should be aimed as the swiss army knife for transforming YAML, JS and JSON 
files into each other.

The module is fully [Promise](http://bluebirdjs.com/docs/api-reference.html) 
based!

## Use Cases

- Reading files (`Reader`)
- Transforming JSON objects (`Transformer`)
- Altering JSON objects (`Transformer` + Middleware)
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

Alter JSON objects via injected [Promise](http://bluebirdjs.com/docs/api-reference.html) function.

### Writing

Writing to:

- _*.yaml_
- _*.js_
- _*.json_


## Usage

The module can be used in two different ways:

- On CLI (recommended install globally `-g`)
- Via API (install locally)

### Usage On CLI

The CLI provides the `jyt` command followed by a bunch of options:

| Name | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
| `-o, --origin` | [ _js_ &#124; _json_ &#124; _yaml_ ]</code> | The origin type. | _yaml_ | no |
| `-t, --target` | [ _js_ &#124; _json_ &#124; _yaml_ ]</code> | The target type. | _js_ | no |
| `-s, --src` | URI | The source file path. | - | yes |
| `-d, --dest` | URI | The destination file path. | _'relative to input file'_ | no |
| `-i, --indent` | positive integer | The indention for files. | _4_ | no |
| `-k, --no-color` | - | Omit color from output. | - | no |
| `--debug` | - | Show debug information. | - | no |
| `-v, --version` | - | Display the current version. | - | no |
| `-h, --help` | - | Display help and usage details. | - | no |  

After the global installation you can access the Transformer command options as follows:

```
$ jyt --help
```

This prints you an overview about all available properties:

```
$ jyt --help
Usage:
  jyt [OPTIONS]

Options: 
  -o, --origin [STRING]  The conversion origin: [ js | json | yaml ] (Default is yaml)
  -t, --target [STRING]  The conversion target: [ js | json | yaml ] (Default is js)
  -s, --src PATH         The absolute/relative input file path
  -d, --dest [PATH]      The absolute/relative output file path (Default is relative to input file.)
  -i, --indent [NUMBER]  The indention for pretty-print: 0 - 8 (Default is 4)
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

Here we have overwritten the standard target type (which is 'js') and applying an
indent of _2_ instead of the default _4_. As default the output file _./data/my.json_ 
is written relative to the input file (simply omit the `dest` option here). 

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

The `options` object parameter have to follow this key-values table:

| Name | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
| origin | <code>string</code> | The origin type. | 'yaml' | no |
| target | <code>string</code> | The target type. | 'js' | no |
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

# API Reference

## Classes

<dl>
<dt><a href="#Constants">Constants</a></dt>
<dd><p>Class which defines all constants usable in or with this module.</p>
</dd>
<dt><a href="#Reader">Reader</a></dt>
<dd><p>This class provides utility methods usable to read YAML, JSON or JS
       from a file to JS memory objects.</p>
</dd>
<dt><a href="#Transformer">Transformer</a></dt>
<dd><p>This class provides all methods usable to handle YAML, JSON and JS and
       their transformations.</p>
</dd>
<dt><a href="#Writer">Writer</a></dt>
<dd><p>This class provides utility methods usable to write JSON/JS
       from memory to a YAML, JSON or JS file.</p>
</dd>
</dl>

<a name="Constants"></a>
## Constants
Class which defines all constants usable in or with this module.

**Kind**: global class  

* [Constants](#Constants)
    * [new Constants()](#new_Constants_new)
    * [.UTF8](#Constants+UTF8) : <code>string</code>
    * [.YAML](#Constants+YAML) : <code>string</code>
    * [.JSON](#Constants+JSON) : <code>string</code>
    * [.JS](#Constants+JS) : <code>string</code>
    * [.TYPES](#Constants+TYPES) : <code>Array.&lt;string&gt;</code>
    * [.DEFAULT_INDENT](#Constants+DEFAULT_INDENT) : <code>number</code>
    * [.MIN_JSON_JS_INDENT](#Constants+MIN_JSON_JS_INDENT) : <code>number</code>
    * [.MIN_YAML_INDENT](#Constants+MIN_YAML_INDENT) : <code>number</code>
    * [.MAX_INDENT](#Constants+MAX_INDENT) : <code>number</code>
    * [.DEFAULT_OPTIONS](#Constants+DEFAULT_OPTIONS)
    * [.YAML_TO_JS](#Constants+YAML_TO_JS) : <code>string</code>
    * [.YAML_TO_JSON](#Constants+YAML_TO_JSON) : <code>string</code>
    * [.JS_TO_YAML](#Constants+JS_TO_YAML) : <code>string</code>
    * [.JSON_TO_YAML](#Constants+JSON_TO_YAML) : <code>string</code>
    * [.JSON_TO_JS](#Constants+JSON_TO_JS) : <code>string</code>
    * [.JS_TO_JSON](#Constants+JS_TO_JSON) : <code>string</code>
    * [.YAML_TO_YAML](#Constants+YAML_TO_YAML) : <code>string</code>
    * [.JSON_TO_JSON](#Constants+JSON_TO_JSON) : <code>string</code>
    * [.JS_TO_JS](#Constants+JS_TO_JS) : <code>string</code>
    * [.TRANSFORMATIONS](#Constants+TRANSFORMATIONS) : <code>Array.&lt;string&gt;</code>

<a name="new_Constants_new"></a>
### new Constants()
Constructs the constants.

**Returns**: <code>[Constants](#Constants)</code> - The instance.  
<a name="Constants+UTF8"></a>
### constants.UTF8 : <code>string</code>
The 'utf8' constant.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+YAML"></a>
### constants.YAML : <code>string</code>
The 'yaml' type constant.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JSON"></a>
### constants.JSON : <code>string</code>
The 'json' type constant.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JS"></a>
### constants.JS : <code>string</code>
The 'js' type constant.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+TYPES"></a>
### constants.TYPES : <code>Array.&lt;string&gt;</code>
The type constants assembled in an array: <tt>[ 'yaml', 'json', 'js' ]</tt>.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+DEFAULT_INDENT"></a>
### constants.DEFAULT_INDENT : <code>number</code>
The default file indention (4 SPACEs).

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+MIN_JSON_JS_INDENT"></a>
### constants.MIN_JSON_JS_INDENT : <code>number</code>
The minimum JSON/JS file indention (0 SPACE).

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+MIN_YAML_INDENT"></a>
### constants.MIN_YAML_INDENT : <code>number</code>
The minimum YAML file indention (1 SPACE).

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+MAX_INDENT"></a>
### constants.MAX_INDENT : <code>number</code>
The maximum file indention (8 SPACEs).

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+DEFAULT_OPTIONS"></a>
### constants.DEFAULT_OPTIONS
The default options.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| origin | <code>string</code> | The default origin type: 'yaml'. |
| target | <code>string</code> | The default target type: 'js'. |
| dest | <code>string</code> | The default dest description: 'relative to input file'. |
| indent | <code>number</code> | The default indention for files: 4. |

<a name="Constants+YAML_TO_JS"></a>
### constants.YAML_TO_JS : <code>string</code>
The transformation direction YAML -> JS.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+YAML_TO_JSON"></a>
### constants.YAML_TO_JSON : <code>string</code>
The transformation direction YAML -> JSON.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JS_TO_YAML"></a>
### constants.JS_TO_YAML : <code>string</code>
The transformation direction JS -> YAML.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JSON_TO_YAML"></a>
### constants.JSON_TO_YAML : <code>string</code>
The transformation direction JSON -> YAML.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JSON_TO_JS"></a>
### constants.JSON_TO_JS : <code>string</code>
The transformation direction JSON -> JS.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JS_TO_JSON"></a>
### constants.JS_TO_JSON : <code>string</code>
The transformation direction JS -> JSON.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+YAML_TO_YAML"></a>
### constants.YAML_TO_YAML : <code>string</code>
The transformation direction YAML -> YAML.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JSON_TO_JSON"></a>
### constants.JSON_TO_JSON : <code>string</code>
The transformation direction JSON -> JSON.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JS_TO_JS"></a>
### constants.JS_TO_JS : <code>string</code>
The transformation direction JS -> JS.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+TRANSFORMATIONS"></a>
### constants.TRANSFORMATIONS : <code>Array.&lt;string&gt;</code>
The transformation directions.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Reader"></a>
## Reader
This class provides utility methods usable to read YAML, JSON or JS
       from a file to JS memory objects.

**Kind**: global class  

* [Reader](#Reader)
    * [new Reader(logger)](#new_Reader_new)
    * [.logger](#Reader+logger) : <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code>
    * [.readJs(src)](#Reader+readJs) ⇒ <code>Promise</code>
    * [.readYaml(src)](#Reader+readYaml) ⇒ <code>Promise</code>

<a name="new_Reader_new"></a>
### new Reader(logger)
Constructs the `Reader` with an (optional) logger.

**Returns**: <code>[Reader](#Reader)</code> - The instance.  

| Param | Type | Description |
| --- | --- | --- |
| logger | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | (optional) Logger, default is `console. |

**Example**  
```js
var Reader = require('jy-transform').Reader;
var logger = ...;

var reader = new Reader(logger);
```
<a name="Reader+logger"></a>
### reader.logger : <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code>
The logger instance.

**Kind**: instance property of <code>[Reader](#Reader)</code>  
<a name="Reader+readJs"></a>
### reader.readJs(src) ⇒ <code>Promise</code>
Reads the data from a given _*.js_ or _*.json_ file source.

**Kind**: instance method of <code>[Reader](#Reader)</code>  
**Returns**: <code>Promise</code> - Containing the JSON object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | The JS/JSON source file to read. |

**Example**  
```js
var Reader = require('jy-transform').Reader;
var logger = ...;

var reader = new Reader(logger);
reader.readJs(./my.js)
    .then(function (json){
        logger.info(JSON.stringify(json));
    })
    .catch(function (err) {
        logger.error(err.stack);
    });

reader.readJs(./my.json)
    .then(function (json){
        logger.info(JSON.stringify(json));
    })
    .catch(function (err) {
        logger.error(err.stack);
    });
```
<a name="Reader+readYaml"></a>
### reader.readYaml(src) ⇒ <code>Promise</code>
Loads a single YAML file containing document and turns a JS object.

*NOTE:* This function does not understand multi-document sources, it throws
exception on those.

**Kind**: instance method of <code>[Reader](#Reader)</code>  
**Returns**: <code>Promise</code> - Containing the JSON object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | The YAML source file to read. |

**Example**  
```js
var Reader = require('jy-transform').Reader;
var logger = ...;

var reader = new Reader(logger);
reader.readYaml(./my.yaml)
    .then(function (json){
        logger.info(JSON.stringify(json));
    })
    .catch(function (err) {
        logger.error(err.stack);
    });
```
<a name="Transformer"></a>
## Transformer
This class provides all methods usable to handle YAML, JSON and JS and
       their transformations.

**Kind**: global class  

* [Transformer](#Transformer)
    * [new Transformer(logger)](#new_Transformer_new)
    * [.logger](#Transformer+logger) : <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code>
    * [.transform(options, middleware)](#Transformer+transform) ⇒ <code>Promise</code>

<a name="new_Transformer_new"></a>
### new Transformer(logger)
Constructs the `Transformer` with options and an (optional) logger.

**Returns**: <code>[Transformer](#Transformer)</code> - The instance.  

| Param | Type | Description |
| --- | --- | --- |
| logger | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | (optional) Logger, default is `console`. |

**Example**  
```js
var logger = ...;
var Transformer = require('jy-transform');
var transformer = new Transformer(logger);
```
<a name="Transformer+logger"></a>
### transformer.logger : <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code>
The logger instance.

**Kind**: instance property of <code>[Transformer](#Transformer)</code>  
<a name="Transformer+transform"></a>
### transformer.transform(options, middleware) ⇒ <code>Promise</code>
The entry method for all transformation accepting a configuration object and
an (optional) middleware function.

**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Returns**: <code>Promise</code> - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> Will throw this error when the passed `middleware`
        is not type of `Function`.
- <code>Error</code> Will throw plain error when writing to file failed due to any reason.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The transformation options. |
| middleware | <code>function</code> | This middleware Promise can be used to intercept        the JSON object for altering the passed JSON, the function signature is:        ```        function(json)        ```        The Promise has to return the processed JSON! |

**Example**  
```js
var Transformer = require('jy-transform');
var transformer = new Transformer(logger);
var Promise = require('bluebird');
var logger = ...;
var options = {...};
var middleware = function (json) {
    json.myproperty = 'new value';
    return Promise.resolve(json);
};

transformer.transform(options, middleware)
    .then(function (msg){
        logger.info(msg);
    })
    .catch(function (err) {
        logger.error(err.stack);
    });
```
<a name="Writer"></a>
## Writer
This class provides utility methods usable to write JSON/JS
       from memory to a YAML, JSON or JS file.

**Kind**: global class  

* [Writer](#Writer)
    * [new Writer(logger)](#new_Writer_new)
    * [.logger](#Writer+logger) : <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code>
    * [.writeYaml(json, dest, indent)](#Writer+writeYaml) ⇒ <code>Promise</code>
    * [.writeJson(json, dest, indent)](#Writer+writeJson) ⇒ <code>Promise</code>
    * [.writeJs(json, dest, indent)](#Writer+writeJs) ⇒ <code>Promise</code>

<a name="new_Writer_new"></a>
### new Writer(logger)
Constructs the `Writer` with an (optional) logger.

**Returns**: <code>[Writer](#Writer)</code> - The instance.  

| Param | Type | Description |
| --- | --- | --- |
| logger | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | (optional) Logger, default is `console`. |

**Example**  
```js
var Writer = require('jy-transform').Writer;
var logger = ...;

var writer = new Writer(logger);
```
<a name="Writer+logger"></a>
### writer.logger : <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code>
The logger instance.

**Kind**: instance property of <code>[Writer](#Writer)</code>  
<a name="Writer+writeYaml"></a>
### writer.writeYaml(json, dest, indent) ⇒ <code>Promise</code>
Writes a JSON object to a _*.yaml_ file.

**Kind**: instance method of <code>[Writer](#Writer)</code>  
**Returns**: <code>Promise</code> - Containing the write success message to handle by caller (e.g. for logging).  
**Throws**:

- <code>Error</code> If YAML file could not be written due to any reason.

**Access:** public  
**See**

- [MIN_YAML_INDENT](#Constants+MIN_YAML_INDENT)
- [DEFAULT_INDENT](#Constants+DEFAULT_INDENT)
- [MAX_INDENT](#Constants+MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The JSON to write into _*.yaml_ file. |
| dest | <code>string</code> | The file destination path. |
| indent | <code>number</code> | The indent in spaces. |

<a name="Writer+writeJson"></a>
### writer.writeJson(json, dest, indent) ⇒ <code>Promise</code>
Writes a JSON object to a _*.json_ file.

**Kind**: instance method of <code>[Writer](#Writer)</code>  
**Returns**: <code>Promise</code> - Containing the write success message to handle by caller (e.g. for logging).  
**Access:** public  
**See**

- [MIN_JSON_JS_INDENT](#Constants+MIN_JSON_JS_INDENT)
- [DEFAULT_INDENT](#Constants+DEFAULT_INDENT)
- [MAX_INDENT](#Constants+MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The JSON to write into _*.json_ file. |
| dest | <code>string</code> | The file destination path. |
| indent | <code>number</code> | The indent in spaces. |

<a name="Writer+writeJs"></a>
### writer.writeJs(json, dest, indent) ⇒ <code>Promise</code>
Writes a JSON object to a _*.js_ file.

**Kind**: instance method of <code>[Writer](#Writer)</code>  
**Returns**: <code>Promise</code> - Containing the write success message to handle by caller (e.g. for logging).  
**Access:** public  
**See**

- [MIN_JSON_JS_INDENT](#Constants+MIN_JSON_JS_INDENT)
- [DEFAULT_INDENT](#Constants+DEFAULT_INDENT)
- [MAX_INDENT](#Constants+MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The JSON to write into _*.js_ file. |
| dest | <code>string</code> | The file destination path. |
| indent | <code>number</code> | The indent in spaces. |

