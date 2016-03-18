| Type | Status | Branch |
| --- | --- | --- |
| Travis | [![Build Status](https://travis-ci.org/deadratfink/jy-transform.svg?branch=master)](https://travis-ci.org/deadratfink/jy-transform) | master |
| Travis | [![Build Status](https://travis-ci.org/deadratfink/jy-transform.svg?branch=development)](https://travis-ci.org/deadratfink/jy-transform) | development

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
- [json-stringify-safe](https://github.com/isaacs/json-stringify-safe): Like JSON.stringify, but doesn&#39;t blow up on circular refs.
- [mkdirp-then](https://github.com/fs-utils/mkdirp-then): mkdirp as promised
- [serialize-js](https://github.com/RReverser/serialize-js): User-readable object serialization for JavaScript.

## Dev Dependencies

- [fs-extra](https://github.com/jprichardson/node-fs-extra): fs-extra contains methods that aren&#39;t included in the vanilla Node.js fs package. Such as mkdir -p, cp -r, and rm -rf.
- [jsdoc-parse](https://github.com/jsdoc2md/jsdoc-parse): Jsdoc-annotated source code in, JSON format documentation out.
- [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown): jsdoc-annotated source in, markdown API docs out.
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [package-json-to-readme](https://github.com/zeke/package-json-to-readme): Generate a README.md from package.json contents
- [winston](https://github.com/winstonjs/winston): A multi-transport async logging library for Node.js


## License

SEE LICENSE IN [LICENSE.md](https://github.com/deadratfink/jy-transform/blob/master/LICENSE)

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

## Usage

The module can be used in two different ways:

- On CLI (recommended install globally via `-g` option)
- Via API (install locally)

### Usage On CLI

The CLI provides the `jyt` command followed by a bunch of options:

| Name | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
| `-o, --origin` | [ _js_ &#124; _json_ &#124; _yaml_ ]</code> | The transformation origin type. | _yaml_ | no |
| `-t, --target` | [ _js_ &#124; _json_ &#124; _yaml_ ]</code> | The transformation target type. | _js_ | no |
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

Here we have overwritten the standard target type (which is _js_) and applying an
indent of _2_ instead of the default _4_. As default the output file _./data/my.json_ 
is written relative to the input file (simply omitting the `dest` option here). 

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

# API Reference

## Classes

<dl>
<dt><a href="#Constants">Constants</a></dt>
<dd><p>Class which defines all constants usable in or with this module.</p>
</dd>
<dt><a href="#LogWrapper">LogWrapper</a></dt>
<dd><p>Class which defines a <code>logger</code> wrapper usable in this module.
       <p>
       <strong>NOTE:</strong> This class is not to be intended to be called from
       outside this module!</p>
</dd>
<dt><a href="#Middleware">Middleware</a></dt>
<dd><p>Class which defines middleware Promises usable in or with this module.</p>
</dd>
<dt><a href="#OptionsHandler">OptionsHandler</a></dt>
<dd><p>Class which defines some useful methods to initialize and prepare the
       transformation options used in this module.
       <p>
       <strong>NOTE:</strong> This class is not to be intended to be called from
       outside this module!</p>
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
<dd><p>This class provides utility methods usable to write JSON/JS/YAML
       from memory to a JSON/JS/YAML file.</p>
</dd>
</dl>

<a name="Constants"></a>
## Constants
Class which defines all constants usable in or with this module.

**Kind**: global class  

* [Constants](#Constants)
    * [new Constants()](#new_Constants_new)
    * [.DEFAULT_OPTIONS](#Constants+DEFAULT_OPTIONS) : <code>object</code>
    * [.UTF8](#Constants+UTF8) : <code>string</code>
    * [.YAML](#Constants+YAML) : <code>string</code>
    * [.JSON](#Constants+JSON) : <code>string</code>
    * [.JS](#Constants+JS) : <code>string</code>
    * [.TYPES](#Constants+TYPES) : <code>Array.&lt;string&gt;</code>
    * [.DEFAULT_INDENT](#Constants+DEFAULT_INDENT) : <code>number</code>
    * [.MIN_JSON_JS_INDENT](#Constants+MIN_JSON_JS_INDENT) : <code>number</code>
    * [.MIN_YAML_INDENT](#Constants+MIN_YAML_INDENT) : <code>number</code>
    * [.MAX_INDENT](#Constants+MAX_INDENT) : <code>number</code>
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

**Returns**: <code>[Constants](#Constants)</code> - - The instance.  
<a name="Constants+DEFAULT_OPTIONS"></a>
### constants.DEFAULT_OPTIONS : <code>object</code>
The default options.

**Kind**: instance namespace of <code>[Constants](#Constants)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| origin | <code>string</code> | The default origin type: 'yaml'. |
| target | <code>string</code> | The default target type: 'js'. |
| dest | <code>string</code> | The default dest description: 'relative to input file'. |
| indent | <code>number</code> | The default indention for files: 4. |

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
The type constants assembled in an array: `[ 'yaml', 'json', 'js' ]`.

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
<a name="LogWrapper"></a>
## LogWrapper
Class which defines a `logger` wrapper usable in this module.
       <p>
       **NOTE:** This class is not to be intended to be called from
       outside this module!

**Kind**: global class  

* [LogWrapper](#LogWrapper)
    * [new LogWrapper(logger)](#new_LogWrapper_new)
    * [.debug(msg)](#LogWrapper+debug)
    * [.info(msg)](#LogWrapper+info)
    * [.error(msg)](#LogWrapper+error)
    * [.verboseOptions(options)](#LogWrapper+verboseOptions) ⇒

<a name="new_LogWrapper_new"></a>
### new LogWrapper(logger)
Constructs the `LogWrapper`.

**Returns**: <code>[LogWrapper](#LogWrapper)</code> - - The instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| logger | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | <code>console</code> | Logger object. |

<a name="LogWrapper+debug"></a>
### logWrapper.debug(msg)
Log the options with DEBUG level (logger supports it, else with INFO).

**Kind**: instance method of <code>[LogWrapper](#LogWrapper)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The message to log. |

<a name="LogWrapper+info"></a>
### logWrapper.info(msg)
Log the options with INFO level.

**Kind**: instance method of <code>[LogWrapper](#LogWrapper)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The message to log. |

<a name="LogWrapper+error"></a>
### logWrapper.error(msg)
Log the options with ERROR level.

**Kind**: instance method of <code>[LogWrapper](#LogWrapper)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The message to log. |

<a name="LogWrapper+verboseOptions"></a>
### logWrapper.verboseOptions(options) ⇒
Log the options with INFO level.

**Kind**: instance method of <code>[LogWrapper](#LogWrapper)</code>  
**Returns**: A Promise containing the passed `options` object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The properties to log with INFO. |

<a name="Middleware"></a>
## Middleware
Class which defines middleware Promises usable in or with this module.

**Kind**: global class  

* [Middleware](#Middleware)
    * [new Middleware()](#new_Middleware_new)
    * [.ensureMiddleware(middleware)](#Middleware+ensureMiddleware) ⇒ <code>Promise</code>

<a name="new_Middleware_new"></a>
### new Middleware()
Constructs the `Middleware`.

**Returns**: <code>[Middleware](#Middleware)</code> - - The instance.  
<a name="Middleware+ensureMiddleware"></a>
### middleware.ensureMiddleware(middleware) ⇒ <code>Promise</code>
Ensure that the given middleware Promise is a function if set.
If not set a new JSON 'identity' Promise is returned which simply passes
a JSON object.

**Kind**: instance method of <code>[Middleware](#Middleware)</code>  
**Returns**: <code>Promise</code> - The given middleware Promise or a new JSON 'identity' middleware Promise.  
**Throws**:

- <code>TypeError</code> Will throw this error when the passed `middleware`
        is not type of `Function`.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| middleware | <code>function</code> | This middleware Promise can be used to intercept        the JSON object for altering he passed JSON, the function signature is:        ```        function(json)        ```        The Promise has to return the processed JSON! |

<a name="OptionsHandler"></a>
## OptionsHandler
Class which defines some useful methods to initialize and prepare the
       transformation options used in this module.
       <p>
       **NOTE:** This class is not to be intended to be called from
       outside this module!

**Kind**: global class  

* [OptionsHandler](#OptionsHandler)
    * [new OptionsHandler([logger])](#new_OptionsHandler_new)
    * [.ensureOptions(options)](#OptionsHandler+ensureOptions) ⇒
    * [.validateTransformation(options)](#OptionsHandler+validateTransformation) ⇒

<a name="new_OptionsHandler_new"></a>
### new OptionsHandler([logger])
Constructs the `OptionsHandler` with an (optional) logger.

**Returns**: <code>[OptionsHandler](#OptionsHandler)</code> - The instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [logger] | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | <code>console</code> | Logger object. |

**Example**  
```js
var OptionsHandler = require('./options-handler.js');
var logger = ...;

var optionsHandler = new OptionsHandler(logger);
```
<a name="OptionsHandler+ensureOptions"></a>
### optionsHandler.ensureOptions(options) ⇒
This method ensures that the options object is set with all necessary and
correct values. The method does not alter the given object, but creates
and fills a new instance from the given values and/or default ones.

**Kind**: instance method of <code>[OptionsHandler](#OptionsHandler)</code>  
**Returns**: A Promise containing a new and complete `options` object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The minimum configuration for a transformation. |

<a name="OptionsHandler+validateTransformation"></a>
### optionsHandler.validateTransformation(options) ⇒
This method validates the transformation process described by the given
options and provides the according name to resolve a proper function.

**Kind**: instance method of <code>[OptionsHandler](#OptionsHandler)</code>  
**Returns**: A Promise containing the passed `options` object and a 'transformation' string.  
**Access:** public  
**See**: [transformations](transformations)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The minimum configuration for a transformation. |

<a name="Reader"></a>
## Reader
This class provides utility methods usable to read YAML, JSON or JS
       from a file to JS memory objects.

**Kind**: global class  

* [Reader](#Reader)
    * [new Reader([logger])](#new_Reader_new)
    * [.readJs(src)](#Reader+readJs) ⇒ <code>Promise</code>
    * [.readYaml()](#Reader+readYaml) ⇒ <code>Promise</code>

<a name="new_Reader_new"></a>
### new Reader([logger])
Constructs the `Reader` with an (optional) logger.

**Returns**: <code>[Reader](#Reader)</code> - The instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [logger] | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | <code>console</code> | Logger object. |

**Example**  
```js
var Reader = require('jy-transform').Reader;
var logger = ...;

var reader = new Reader(logger);
```
<a name="Reader+readJs"></a>
### reader.readJs(src) ⇒ <code>Promise</code>
Reads the data from a given _*.js_ or _*.json_ file source.

**Kind**: instance method of <code>[Reader](#Reader)</code>  
**Returns**: <code>Promise</code> - - Containing the JSON object.  
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
### reader.readYaml() ⇒ <code>Promise</code>
Loads a single YAML file containing document and turns a JS object.

*NOTE:* This function does not understand multi-document sources, it throws
exception on those.

**Kind**: instance method of <code>[Reader](#Reader)</code>  
**Returns**: <code>Promise</code> - - Containing the JSON object.  
**Access:** public  
**Param{string}**: src - The YAML source file to read.  
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
    * [new Transformer([logger])](#new_Transformer_new)
    * _instance_
        * [.transform(options, [middleware])](#Transformer+transform) ⇒ <code>Promise</code>
    * _inner_
        * [~ensureMiddleware](#Transformer..ensureMiddleware)
        * [~itmo(options, read, [middleware], write)](#Transformer..itmo)

<a name="new_Transformer_new"></a>
### new Transformer([logger])
Constructs the `Transformer` with options and an (optional) logger.

**Returns**: <code>[Transformer](#Transformer)</code> - - The instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [logger] | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | <code>console</code> | Logger object. |

**Example**  
```js
var logger = ...;
var Transformer = require('jy-transform');
var transformer = new Transformer(logger);
```
<a name="Transformer+transform"></a>
### transformer.transform(options, [middleware]) ⇒ <code>Promise</code>
The entry method for all transformation accepting a configuration object and
an (optional) middleware function.

**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Returns**: <code>Promise</code> - - Containing the transformation result as message (e.g.
         to be logged by caller).  
**Throws**:

- <code>TypeError</code> - Will throw this error when the passed `middleware`
        is not type of `Function`.
- <code>Error</code> - Will throw plain error when writing to file failed due to any reason.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Properties to configure the transformation. |
| [middleware] | <code>function</code> | This middleware Promise can be used to intercept        the JSON object for altering the passed JSON, the function signature is:        ```        function(json)        ```        <p>        **NOTE:** the Promise has to return the processed JSON! |

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
<a name="Transformer..ensureMiddleware"></a>
### Transformer~ensureMiddleware
Ensures that basic middleware is set.

**Kind**: inner property of <code>[Transformer](#Transformer)</code>  
<a name="Transformer..itmo"></a>
### Transformer~itmo(options, read, [middleware], write)
Internal function to execute transformation logic (ITMO):
- Input
- Transform
- Middleware
- Write

**Kind**: inner method of <code>[Transformer](#Transformer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The minimum configuration for a transformation. |
| read | <code>function</code> | The reader function. |
| [middleware] | <code>function</code> | The middleware to apply. |
| write | <code>function</code> | The writer functions. |

<a name="Writer"></a>
## Writer
This class provides utility methods usable to write JSON/JS/YAML
       from memory to a JSON/JS/YAML file.

**Kind**: global class  

* [Writer](#Writer)
    * [new Writer([logger])](#new_Writer_new)
    * [.writeYaml(json, dest, indent)](#Writer+writeYaml) ⇒ <code>Promise</code>
    * [.writeJson(json, dest, indent)](#Writer+writeJson) ⇒ <code>Promise</code>
    * [.writeJs(json, dest, indent)](#Writer+writeJs) ⇒ <code>Promise</code>

<a name="new_Writer_new"></a>
### new Writer([logger])
Constructs the `Writer` with an (optional) logger.

**Returns**: <code>[Writer](#Writer)</code> - The instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [logger] | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | <code>console</code> | Logger object. |

**Example**  
```js
var Writer = require('jy-transform').Writer;
var logger = ...;

var writer = new Writer(logger);
```
<a name="Writer+writeYaml"></a>
### writer.writeYaml(json, dest, indent) ⇒ <code>Promise</code>
Writes a JSON object to a _*.yaml_ file.

**Kind**: instance method of <code>[Writer](#Writer)</code>  
**Returns**: <code>Promise</code> - - Containing the write success message to handle by caller (e.g. for logging).  
**Throws**:

- <code>Error</code> - If YAML file could not be written due to any reason.

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
**Returns**: <code>Promise</code> - - Containing the write success message to handle by caller (e.g. for logging).  
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
**Returns**: <code>Promise</code> - - Containing the write success message to handle by caller (e.g. for logging).  
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

