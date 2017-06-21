## Modules

<dl>
<dt><a href="#module_jy-transform_constants">jy-transform:constants</a></dt>
<dd><p>Useful constants used for the module and its usage.</p>
</dd>
<dt><a href="#module_jy-transform_reader">jy-transform:reader</a></dt>
<dd><p>This module provides the <em>read</em> functionality for YAML, JS or JSON sources.</p>
</dd>
<dt><a href="#module_jy-transform_transformer">jy-transform:transformer</a></dt>
<dd><p>This module provides the <em>transform</em> functionality for YAML, JS or JSON source to destination mapping.</p>
</dd>
<dt><a href="#module_jy-transform_writer">jy-transform:writer</a></dt>
<dd><p>This module provides the <em>write</em> functionality for YAML, JS or JSON targets.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#readJs">readJs</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Reads the data from a given JS or JSON source.</p>
</dd>
<dt><a href="#readYaml">readYaml</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Loads a single YAML source containing document and returns a JS object.
<em>NOTE:</em> this function does not understand multi-document sources, it throws
exception on those.</p>
</dd>
<dt><a href="#writeYaml">writeYaml</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Writes a JS object to a YAML destination.</p>
</dd>
<dt><a href="#writeJson">writeJson</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Writes a JS object to a JSON destination.</p>
</dd>
<dt><a href="#writeJs">writeJs</a> ⇒ <code>Promise</code></dt>
<dd><p>Writes a JS object to a JS destination. The object is prefixed by <code>module.exports[.${options.exports}] =</code>.</p>
</dd>
</dl>

<a name="module_jy-transform_constants"></a>

## jy-transform:constants
Useful constants used for the module and its usage.

**Access:** public  

* [jy-transform:constants](#module_jy-transform_constants)
    * [~DEFAULT_OPTIONS](#module_jy-transform_constants..DEFAULT_OPTIONS) : <code>object</code>
    * [~UTF8](#module_jy-transform_constants..UTF8) : <code>string</code>
    * [~TYPE_YAML](#module_jy-transform_constants..TYPE_YAML) : <code>string</code>
    * [~TYPE_JSON](#module_jy-transform_constants..TYPE_JSON) : <code>string</code>
    * [~TYPE_JS](#module_jy-transform_constants..TYPE_JS) : <code>string</code>
    * [~TYPES](#module_jy-transform_constants..TYPES) : <code>Array.&lt;string&gt;</code>
    * [~TYPE_MAP](#module_jy-transform_constants..TYPE_MAP) : <code>Object</code>
    * [~DEFAULT_INDENT](#module_jy-transform_constants..DEFAULT_INDENT) : <code>number</code>
    * [~MIN_INDENT](#module_jy-transform_constants..MIN_INDENT) : <code>number</code>
    * [~MAX_INDENT](#module_jy-transform_constants..MAX_INDENT) : <code>number</code>
    * [~DEFAULT_ORIGIN](#module_jy-transform_constants..DEFAULT_ORIGIN) : <code>string</code>
    * [~DEFAULT_TARGET](#module_jy-transform_constants..DEFAULT_TARGET) : <code>string</code>
    * [~DEFAULT_FORCE_FILE_OVERWRITE](#module_jy-transform_constants..DEFAULT_FORCE_FILE_OVERWRITE) : <code>boolean</code>
    * [~ORIGIN_DESCRIPTION](#module_jy-transform_constants..ORIGIN_DESCRIPTION) : <code>string</code>
    * [~TARGET_DESCRIPTION](#module_jy-transform_constants..TARGET_DESCRIPTION) : <code>string</code>
    * [~DEST_DESCRIPTION](#module_jy-transform_constants..DEST_DESCRIPTION) : <code>string</code>
    * [~DEFAULT_JS_IMPORTS_IDENTIFIER](#module_jy-transform_constants..DEFAULT_JS_IMPORTS_IDENTIFIER) : <code>string</code>
    * [~DEFAULT_JS_EXPORTS_IDENTIFIER](#module_jy-transform_constants..DEFAULT_JS_EXPORTS_IDENTIFIER) : <code>string</code>
    * [~YAML_TO_JS](#module_jy-transform_constants..YAML_TO_JS) : <code>string</code>
    * [~YAML_TO_JSON](#module_jy-transform_constants..YAML_TO_JSON) : <code>string</code>
    * [~JS_TO_YAML](#module_jy-transform_constants..JS_TO_YAML) : <code>string</code>
    * [~JSON_TO_YAML](#module_jy-transform_constants..JSON_TO_YAML) : <code>string</code>
    * [~JSON_TO_JS](#module_jy-transform_constants..JSON_TO_JS) : <code>string</code>
    * [~JS_TO_JSON](#module_jy-transform_constants..JS_TO_JSON) : <code>string</code>
    * [~YAML_TO_YAML](#module_jy-transform_constants..YAML_TO_YAML) : <code>string</code>
    * [~JSON_TO_JSON](#module_jy-transform_constants..JSON_TO_JSON) : <code>string</code>
    * [~JS_TO_JS](#module_jy-transform_constants..JS_TO_JS) : <code>string</code>
    * [~TRANSFORMATIONS](#module_jy-transform_constants..TRANSFORMATIONS) : <code>Array.&lt;string&gt;</code>

<a name="module_jy-transform_constants..DEFAULT_OPTIONS"></a>

### jy-transform:constants~DEFAULT_OPTIONS : <code>object</code>
The default options.

**Kind**: inner namespace of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**See**

- [ORIGIN_DESCRIPTION](ORIGIN_DESCRIPTION)
- [TARGET_DESCRIPTION](TARGET_DESCRIPTION)
- [DEST_DESCRIPTION](DEST_DESCRIPTION)

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| origin | <code>string</code> | <code>&quot;yaml&quot;</code> | The default origin type. |
| target | <code>string</code> | <code>&quot;js&quot;</code> | The default target type. |
| dest | <code>string</code> | <code>&quot;relative_to_input_file&quot;</code> | The default dest description. |
| indent | <code>number</code> | <code>4</code> | The default indention for files. |
| force | <code>boolean</code> | <code>false</code> | Whether to overwrite existing file on output. |
| imports | <code>string</code> |  | The exports name for reading from JS source file or objects only. |
| exports | <code>string</code> |  | The exports name for usage in JS file or object only. |

<a name="module_jy-transform_constants..UTF8"></a>

### jy-transform:constants~UTF8 : <code>string</code>
The 'utf8' constant.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..TYPE_YAML"></a>

### jy-transform:constants~TYPE_YAML : <code>string</code>
The 'yaml' type constant.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..TYPE_JSON"></a>

### jy-transform:constants~TYPE_JSON : <code>string</code>
The 'json' type constant.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..TYPE_JS"></a>

### jy-transform:constants~TYPE_JS : <code>string</code>
The 'js' type constant.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..TYPES"></a>

### jy-transform:constants~TYPES : <code>Array.&lt;string&gt;</code>
The type constants assembled in an array: `[ 'yaml', 'json', 'js' ]`.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..TYPE_MAP"></a>

### jy-transform:constants~TYPE_MAP : <code>Object</code>
A map for extensions to type.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..DEFAULT_INDENT"></a>

### jy-transform:constants~DEFAULT_INDENT : <code>number</code>
The default file indention (4 SPACEs).

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..MIN_INDENT"></a>

### jy-transform:constants~MIN_INDENT : <code>number</code>
The minimum file indention (0 SPACE).

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..MAX_INDENT"></a>

### jy-transform:constants~MAX_INDENT : <code>number</code>
The maximum file indention (8 SPACEs).

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..DEFAULT_ORIGIN"></a>

### jy-transform:constants~DEFAULT_ORIGIN : <code>string</code>
The default `origin` value: 'yaml'.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..DEFAULT_TARGET"></a>

### jy-transform:constants~DEFAULT_TARGET : <code>string</code>
The default `origin` value: 'js'.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..DEFAULT_FORCE_FILE_OVERWRITE"></a>

### jy-transform:constants~DEFAULT_FORCE_FILE_OVERWRITE : <code>boolean</code>
Whether to overwrite existing file or object on output.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..ORIGIN_DESCRIPTION"></a>

### jy-transform:constants~ORIGIN_DESCRIPTION : <code>string</code>
The `origin` description value.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..TARGET_DESCRIPTION"></a>

### jy-transform:constants~TARGET_DESCRIPTION : <code>string</code>
The `target` description value.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..DEST_DESCRIPTION"></a>

### jy-transform:constants~DEST_DESCRIPTION : <code>string</code>
The `dest` description value.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..DEFAULT_JS_IMPORTS_IDENTIFIER"></a>

### jy-transform:constants~DEFAULT_JS_IMPORTS_IDENTIFIER : <code>string</code>
The `src` exports identifier value to read.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
**Example**  
```js
module.exports.foo = {...}; // here 'foo' is the identifier for an object to read from the source!
```
<a name="module_jy-transform_constants..DEFAULT_JS_EXPORTS_IDENTIFIER"></a>

### jy-transform:constants~DEFAULT_JS_EXPORTS_IDENTIFIER : <code>string</code>
The `dest` exports identifier value to write.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..YAML_TO_JS"></a>

### jy-transform:constants~YAML_TO_JS : <code>string</code>
The transformation direction YAML ⇒ JS.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..YAML_TO_JSON"></a>

### jy-transform:constants~YAML_TO_JSON : <code>string</code>
The transformation direction YAML ⇒ JSON.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..JS_TO_YAML"></a>

### jy-transform:constants~JS_TO_YAML : <code>string</code>
The transformation direction JS ⇒ YAML.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..JSON_TO_YAML"></a>

### jy-transform:constants~JSON_TO_YAML : <code>string</code>
The transformation direction JSON ⇒ YAML.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..JSON_TO_JS"></a>

### jy-transform:constants~JSON_TO_JS : <code>string</code>
The transformation direction JSON ⇒ JS.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..JS_TO_JSON"></a>

### jy-transform:constants~JS_TO_JSON : <code>string</code>
The transformation direction JS ⇒ JSON.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..YAML_TO_YAML"></a>

### jy-transform:constants~YAML_TO_YAML : <code>string</code>
The transformation direction YAML ⇒ YAML.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..JSON_TO_JSON"></a>

### jy-transform:constants~JSON_TO_JSON : <code>string</code>
The transformation direction JSON ⇒ JSON.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..JS_TO_JS"></a>

### jy-transform:constants~JS_TO_JS : <code>string</code>
The transformation direction JS ⇒ JS.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_constants..TRANSFORMATIONS"></a>

### jy-transform:constants~TRANSFORMATIONS : <code>Array.&lt;string&gt;</code>
The transformation directions.

**Kind**: inner constant of <code>[jy-transform:constants](#module_jy-transform_constants)</code>  
**Access:** public  
<a name="module_jy-transform_reader"></a>

## jy-transform:reader
This module provides the _read_ functionality for YAML, JS or JSON sources.

**Access:** public  
<a name="module_jy-transform_transformer"></a>

## jy-transform:transformer
This module provides the _transform_ functionality for YAML, JS or JSON source to destination mapping.

**Access:** public  

* [jy-transform:transformer](#module_jy-transform_transformer)
    * [~createTransformation](#module_jy-transform_transformer..createTransformation) ⇒ <code>Promise.&lt;string&gt;</code>
    * [~transform](#module_jy-transform_transformer..transform) ⇒ <code>Promise.&lt;String&gt;</code>

<a name="module_jy-transform_transformer..createTransformation"></a>

### jy-transform:transformer~createTransformation ⇒ <code>Promise.&lt;string&gt;</code>
This method creates the transformation described by the given options resolving a name to get the proper function.

**Kind**: inner property of <code>[jy-transform:transformer](#module_jy-transform_transformer)</code>  
**Returns**: <code>Promise.&lt;string&gt;</code> - The transformation name.  
**Access:** public  
**See**: [transformations](transformations)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | The configuration for a transformation. |

**Example**  
```js
var OptionsHandler = require('./options-handler.js');
var logger = ...;
var optionsHandler = new OptionsHandler(logger);

optionsHandler.validateTransformation(options)
    .spread(function (validatedOptions, transformation) {
        ...
    )):
```
<a name="module_jy-transform_transformer..transform"></a>

### jy-transform:transformer~transform ⇒ <code>Promise.&lt;String&gt;</code>
The entry method for all transformation accepting a configuration object and
an (optional) middleware function.

**Kind**: inner property of <code>[jy-transform:transformer](#module_jy-transform_transformer)</code>  
**Returns**: <code>Promise.&lt;String&gt;</code> - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> Will throw this error when the passed `middleware` is not type of `Function`.
- <code>Error</code> Will throw plain error when writing to file failed due to any reason.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | The configuration for a transformation. |
| [middleware] | <code>function</code> | This middleware Promise can be used to intercept        the JSON object for altering the passed JSON, the function signature is:        ```        function(json)        ```        <p>        **NOTE:** the Promise has to return the processed JSON! |

**Example**  
```js
import { transform } from 'jy-transform';
const options = {...};
const middleware = async (json) {
    json.myproperty = 'new value';
    return json;
};

transform(options, middleware)
    .then(function (msg){
        logger.info(msg);
    })
    .catch(function (err) {
        logger.error(err.stack);
    });
```
<a name="module_jy-transform_writer"></a>

## jy-transform:writer
This module provides the _write_ functionality for YAML, JS or JSON targets.

**Access:** public  
<a name="readJs"></a>

## readJs ⇒ <code>Promise.&lt;Object&gt;</code>
Reads the data from a given JS or JSON source.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Contains the read JS object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | Contains the JS/JSON source reference to read from. |

**Example**  
```js
var Reader = require('jy-transform').Reader;
var logger = ...;
var reader = new Reader(logger);

// --- from file path

var options = {
   src: 'foo.js'
};

reader.readJs(options)
    .then(function (obj){
        logger.info(JSON.stringify(obj));
    })
    .catch(function (err) {
        logger.error(err.stack);
    });


// --- from Readable

options = {
    src: fs.createReadStream('foo.js')
};

reader.readJs(options)
    .then(function (obj){
        logger.info(JSON.stringify(obj));
    })
    .catch(function (err) {
        logger.error(err.stack);
    });


// --- from object

options = {
    src: {
        foo: 'bar'
    }
};

reader.readJs(options)
    .then(function (obj){
        logger.info(JSON.stringify(obj));
    })
    .catch(function (err) {
        logger.error(err.stack);
    });
```
<a name="readYaml"></a>

## readYaml ⇒ <code>Promise.&lt;Object&gt;</code>
Loads a single YAML source containing document and returns a JS object.
*NOTE:* this function does not understand multi-document sources, it throws
exception on those.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Contains the read JS object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | Contains the YAML source reference to read from. |

**Example**  
```js
var Reader = require('jy-transform').Reader;
var logger = ...;
var reader = new Reader(logger);

// --- from file path

options = {
    src: 'foo.yml'
};

reader.readYaml(options)
    .then(function (obj){
        logger.info(JSON.stringify(obj));
    })
    .catch(function (err) {
        logger.error(err.stack);
    });


// --- from Readable

options = {
    src: fs.createReadStream('foo.yml')
};

reader.readJs(options)
    .then(function (obj){
        logger.info(JSON.stringify(obj));
    })
    .catch(function (err) {
        logger.error(err.stack);
    });
```
<a name="writeYaml"></a>

## writeYaml ⇒ <code>Promise.&lt;string&gt;</code>
Writes a JS object to a YAML destination.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;string&gt;</code> - Containing the write success message to handle by caller (e.g. for logging).  
**Throws**:

- <code>Error</code> If YAML destination could not be written due to any reason.

**Access:** public  
**See**

- [Constants#MIN_INDENT](Constants#MIN_INDENT)
- [Constants#DEFAULT_INDENT](Constants#DEFAULT_INDENT)
- [Constants#MAX_INDENT](Constants#MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JS object to write into YAML destination. |
| options | <code>Options</code> | The write destination and indention. |

**Example**  
```js
var Writer = require('jy-transform').Writer;
var logger = ...;
var writer = new Writer(logger);

// ---- write obj to file

var obj = {...},
var options = {
  dest: 'result.yml',
  indent: 2
}

writer.writeYaml(obj, options)
    .then(function (msg){
        logger.info(msg);
    })
    .catch(function (err) {
        logger.error(err.stack);
    });


// ---- write obj to Writable

options = {
  dest: fs.createWriteStream('result.yml'),
  indent: 4
}

writer.writeYaml(obj, options)
  .then(function (msg){
    logger.info(msg);
  })
  .catch(function (err) {
    logger.error(err.stack);
  });
```
<a name="writeJson"></a>

## writeJson ⇒ <code>Promise.&lt;string&gt;</code>
Writes a JS object to a JSON destination.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;string&gt;</code> - Containing the write success message to handle by caller (e.g. for logging).  
**Access:** public  
**See**

- [Constants#MIN_INDENT](Constants#MIN_INDENT)
- [Constants#DEFAULT_INDENT](Constants#DEFAULT_INDENT)
- [Constants#MAX_INDENT](Constants#MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JS object to write into JSON destination. |
| options | <code>Options</code> | The write destination and indention. |

**Example**  
```js
var Writer = require('jy-transform').Writer;
var logger = ...;
var writer = new Writer(logger);

// ---- write obj to file

var obj = {...};
var options = {
    dest: 'result.json',
    indent: 2
}

writer.writeJson(obj, options)
    .then(function (msg){
        logger.info(msg);
    })
    .catch(function (err) {
        logger.error(err.stack);
    });


// ---- write obj to Writable

options = {
    dest: fs.createWriteStream('result.json'),
    indent: 4
}

writer.writeJson(obj, options)
    .then(function (msg){
        logger.info(msg);
    })
    .catch(function (err) {
        logger.error(err.stack);
    });

// ---- write obj to object

options = {
    dest: {},
    indent: 4
}

writer.writeJson(obj, options)
    .then(function (msg){
        logger.info(msg);
    })
    .catch(function (err) {
        logger.error(err.stack);
    });
```
<a name="writeJs"></a>

## writeJs ⇒ <code>Promise</code>
Writes a JS object to a JS destination. The object is prefixed by `module.exports[.${options.exports}] = `.

**Kind**: global variable  
**Returns**: <code>Promise</code> - - Containing the write success message to handle by caller (e.g. for logging).  
**Access:** public  
**See**

- [Constants#MIN_INDENT](Constants#MIN_INDENT)
- [Constants#DEFAULT_INDENT](Constants#DEFAULT_INDENT)
- [Constants#MAX_INDENT](Constants#MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JSON to write into JS destination. |
| options | <code>Options</code> | The write destination and indention. |

**Example**  
```js
var Writer = require('jy-transform').Writer;
var logger = ...;
var writer = new Writer(logger);

// ---- write obj to file

var obj = {...};
var options = {
    dest: 'result.js',
    indent: 2
}

writer.writeJs(obj, options)
    .then(function (msg){
        logger.info(msg);
    })
    .catch(function (err) {
        logger.error(err.stack);
    });


// ---- write obj to Writable

options = {
    dest: fs.createWriteStream('result.json'),
    indent: 4
}

writer.writeJs(obj, options)
    .then(function (msg){
        logger.info(msg);
    })
    .catch(function (err) {
        logger.error(err.stack);
    });


// ---- write obj to object

options = {
    dest: {},
    indent: 2
}

writer.writeJs(obj, options)
    .then(function (msg){
        logger.info(msg);
    })
    .catch(function (err) {
        logger.error(err.stack);
    });
```
