# jy-transform 

This project aims to transform *.yaml files to .js or *.json files or vice-versa via CLI or APi.

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

The transformation can take place into several directions:

- YAML -> JS
- YAML -> JSON
- JS   -> YAML (work in progress)
- JSON -> YAML (work in progress) 
- JS   -> JSON (planned) 
- JSON -> JS (planned)      

While:

- YAML = *.yaml
- JS   = *.js   (JSON object)  
- JSON = *.json (JSON serialized)


## Usage

The module can be used in two different ways:

- On CLI (recommended install globally `-g`)
- Via API (install locally)

### Usage On CLI

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
  -t, --target STRING    The conversion target: [ js | json | yaml ]
  -s, --src PATH         The absolute/relative input file path
  -d, --dest [PATH]      The absolute/relative output file path (Default is relative to input file.)
  -i, --indent [NUMBER]  The indention for pretty print (0 - 8) (Default is 4)
  -k, --no-color         Omit color from output
      --debug            Show debug information
  -v, --version          Display the current version
  -h, --help             Display help and usage details

```

Let's assume we have a YAML file located in _./data/my.yaml_ holding this data

```yaml
myproperty: old value
```

we can transform it to a JSON file _./data/my.json_:

```javascript
{
  "myproperty": "new value"
}
```

using this command:

```
$ jyt -s ./data/my.yaml -t json -i 2
```

Here we have overwritten the standard target type (which is 'js') and applying an
indent of _2_ instead of the default _4_. As default the output file is written relative 
to the input file (`dest` option is missing here). 

### Usage As a library (API Calls)

Since the usage on CLI is a 2-step process:

1. Read file in -> 2. Write out (to another type)

the direct API calls additionally provide the usage of a middleware function 
where you can alter the input JSON object before it is put out which turns 
this into a 3-step process:
 
1. Read file in -> 2. Alter the JSON -> 3. Write out (to another type) 

The main transformation methods are the following:

```javascript
function yamlToJs(middleware)
function jsToYaml(middleware)
```

### Using Middleware

The `middleware` is optional but if provided it must be of type `Function` and 
a [Promise](http://bluebirdjs.com/docs/api-reference.html). One of the easiest 
ones is the identity function _f(data) -> data_ which could be expressed as 
[Promise](http://bluebirdjs.com/docs/api-reference.html) function as shown:

```javascript
var middleware = function (json) {
    return Promise.resolve(json);
}
```

Of course, his would have no effect on the provided JSON data. Actually, this one is 
used internally when no middleware is provided to ensure the proper promisified 
control flow.

OK, lets go back to a more practical example, e.g. we want to alter the value of
JSON property before it is written to a file. Assuming we have this piece of YAML
object as input:

```javascript
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

Following this you can do everything with the JSON object, like

- deleting properties
- changing properties to other types
- validating and throwing error if not valid
- ...

Whatever, but keep it valid when transforming ;-)

## Injecting Logger

Optionally, the constructor accepts a logger object.

```javascript
var options = {...}
var logger = ...;
var transformer = new Transformer(options, logger);
```

At least, this passed logger object should support the following functions:

```javascript
function info(msg)
function debug(msg)
function error(msg)
function fatal(msg) // wishfully, but not mandatory
```

# API Reference

## Classes

<dl>
<dt><a href="#Constants">Constants</a></dt>
<dd><p>Class which defines all used constants.</p>
</dd>
<dt><a href="#Transformer">Transformer</a></dt>
<dd><p>This class provides all methods usable to handle YAML, JSON and JS and
       their transformations.</p>
</dd>
</dl>

<a name="Constants"></a>
## Constants
Class which defines all used constants.

**Kind**: global class  

* [Constants](#Constants)
    * [new Constants()](#new_Constants_new)
    * [.YAML](#Constants+YAML) : <code>string</code>
    * [.JSON](#Constants+JSON) : <code>string</code>
    * [.JS](#Constants+JS) : <code>string</code>
    * [.TYPES](#Constants+TYPES) : <code>Array.&lt;string&gt;</code>
    * [.DEFAULT_OPTIONS](#Constants+DEFAULT_OPTIONS) : <code>object</code>

<a name="new_Constants_new"></a>
### new Constants()
Constructs the constants.

**Returns**: <code>[Constants](#Constants)</code> - The instance.  
<a name="Constants+YAML"></a>
### constants.YAML : <code>string</code>
The 'yaml' type constant.

**Kind**: instance property of <code>[Constants](#Constants)</code>  
<a name="Constants+JSON"></a>
### constants.JSON : <code>string</code>
The 'json' type constant.

**Kind**: instance property of <code>[Constants](#Constants)</code>  
<a name="Constants+JS"></a>
### constants.JS : <code>string</code>
The 'js' type constant.

**Kind**: instance property of <code>[Constants](#Constants)</code>  
<a name="Constants+TYPES"></a>
### constants.TYPES : <code>Array.&lt;string&gt;</code>
The type constants assembled in an array.

**Kind**: instance property of <code>[Constants](#Constants)</code>  
<a name="Constants+DEFAULT_OPTIONS"></a>
### constants.DEFAULT_OPTIONS : <code>object</code>
The default options:

**Kind**: instance namespace of <code>[Constants](#Constants)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| origin | <code>string</code> | The default origin type: 'yaml'. |
| target | <code>string</code> | The default target type: 'js'. |
| dest | <code>string</code> | The default dest description: 'relative to input file.'. |
| indent | <code>number</code> | The default indention for files: 4. |

<a name="Transformer"></a>
## Transformer
This class provides all methods usable to handle YAML, JSON and JS and
       their transformations.

**Kind**: global class  

* [Transformer](#Transformer)
    * [new Transformer(options, logger)](#new_Transformer_new)
    * [.writeJson(json)](#Transformer+writeJson) ⇒ <code>Promise</code>
    * [.writeJs(json)](#Transformer+writeJs) ⇒ <code>Promise</code>
    * [.write(serializedJson)](#Transformer+write) ⇒ <code>Promise</code>
    * [.readJson()](#Transformer+readJson) ⇒ <code>Promise</code>
    * [.yamlToJs(middleware)](#Transformer+yamlToJs) ⇒ <code>Promise</code>
    * [.jsToYaml(middleware)](#Transformer+jsToYaml) ⇒ <code>Promise</code>

<a name="new_Transformer_new"></a>
### new Transformer(options, logger)
Constructs the transformer with options and an (optional) logger.

**Returns**: <code>[Transformer](#Transformer)</code> - The instance.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | the transformation options |
| logger | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | (optional) Logger, default is <tt>console</tt>. |

**Example**  
```js
var Transformer = require('jy-transform');
var options = {...}
var logger = ...;

var transformer = new Transformer(options, logger);
```
<a name="Transformer+writeJson"></a>
### transformer.writeJson(json) ⇒ <code>Promise</code>
Writes a JSON object to a *.json file.

**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Returns**: <code>Promise</code> - Containing no result.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The JSON to write into *.json file. |

<a name="Transformer+writeJs"></a>
### transformer.writeJs(json) ⇒ <code>Promise</code>
Writes a JSON object to a *.js file.

**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Returns**: <code>Promise</code> - Containing no result.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The JSON to write into *.js file. |

<a name="Transformer+write"></a>
### transformer.write(serializedJson) ⇒ <code>Promise</code>
Writes a serialized JSON object to file.

**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Returns**: <code>Promise</code> - Containing no result.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| serializedJson | <code>string</code> | The JSON string to write into file. |

<a name="Transformer+readJson"></a>
### transformer.readJson() ⇒ <code>Promise</code>
**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Returns**: <code>Promise</code> - Containing the JSON object.  
**Access:** public  
**Todo**

- [ ] Finish reading of JSON/JS with require and API Doc?

<a name="Transformer+yamlToJs"></a>
### transformer.yamlToJs(middleware) ⇒ <code>Promise</code>
Convert YAML file to JSON/JS file.

**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Returns**: <code>Promise</code> - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> Will throw this error when the passed <tt>middleware</tt>
        is not type of <tt>Function</tt>.
- <code>Error</code> Will throw plain error when writing to JSON/JS file failed due to any reason.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| middleware | <code>function</code> | This middleware Promise can be used to intercept        the JSON object for altering he passed JSON, the function signature is:        <p>        <tt>function(json)</tt>        </p>        The Promise has to return the processed JSON! |

**Example**  
```js
var Promise = require('bluebird');
var middleware = function (json) {
    json.myproperty = 'new value';
    return Promise.resolve(json);
};

transformer.yamlToJs(middleware);
```
<a name="Transformer+jsToYaml"></a>
### transformer.jsToYaml(middleware) ⇒ <code>Promise</code>
Convert JSON/JS file to YAML file.

**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Returns**: <code>Promise</code> - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> Will throw this error when the passed <tt>middleware</tt>
        is not type of <tt>Function</tt>.
- <code>Error</code> Will throw plain error when writing to YAML file failed due to any reason.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| middleware | <code>function</code> | This middleware Promise can be used to intercept        the JSON object for altering he passed JSON, the function signature is:        <p>        <tt>function(json)</tt>        </p>        The Promise has to return the processed JSON! |

**Example**  
```js
var Promise = require('bluebird');
var middleware = function (json) {
    json.myproperty = 'new value';
    return Promise.resolve(json);
};

transformer.jsToYaml(middleware);
```
