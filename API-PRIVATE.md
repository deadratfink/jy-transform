## Modules

<dl>
<dt><a href="#module_jy-transform_constants">jy-transform:constants</a></dt>
<dd><p>Useful constants used for the module and its usage.</p>
</dd>
<dt><a href="#module_jy-transform_debug-log">jy-transform:debug-log</a> ℗</dt>
<dd><p>The debug logger. Can be enabled via environment variables (set to <code>true</code>):</p>
<ul>
<li><code>JYT_DEBUG</code>: (only DEBUG logging via <code>console.log</code>)</li>
<li><code>JYT_DEBUG</code>: (only ERROR logging via <code>console.error</code>)</li>
</ul>
</dd>
<dt><a href="#module_jy-transform_jyt">jy-transform:jyt</a> ℗</dt>
<dd><p>The command line interface.</p>
</dd>
<dt><a href="#module_jy-transform_middleware">jy-transform:middleware</a> ℗</dt>
<dd><p>The middleware ensuring functions module.</p>
</dd>
<dt><a href="#module_jy-transform_reader">jy-transform:reader</a></dt>
<dd><p>This module provides the <em>read</em> functionality for YAML, JS or JSON sources.</p>
</dd>
<dt><a href="#module_jy-transform_transformer">jy-transform:transformer</a></dt>
<dd><p>This module provides the <em>transform</em> functionality for YAML, JS or JSON source to destination mapping.</p>
</dd>
<dt><a href="#module_jy-transform_type-definitions">jy-transform:type-definitions</a> ℗</dt>
<dd><p>The type definitions for this module.</p>
</dd>
<dt><a href="#module_jy-transform_validation_joi-extensions-file-helper">jy-transform:validation:joi-extensions-file-helper</a> ℗</dt>
<dd><p>An (extended) Joi validation schema helper functions for the module options on FS validation.</p>
</dd>
<dt><a href="#module_jy-transform_validation_joi-extensions-identifier-helper">jy-transform:validation:joi-extensions-identifier-helper</a> ℗</dt>
<dd><p>An (extended) Joi validation schema helper function for the module options to validate ES6 identifiers.</p>
</dd>
<dt><a href="#module_jy-transform_validation_joi-extension">jy-transform:validation:joi-extension</a> ℗</dt>
<dd><p>The module exporting the <a href="#external_joi.Extension">Extension</a>s for option validations.</p>
</dd>
<dt><a href="#module_jy-transform_validation_options-schema-helper">jy-transform:validation:options-schema-helper</a> : <code>Object</code> ℗</dt>
<dd><p>Provides some helper functions used in <a href="module:validation:options-schema">module:validation:options-schema</a> to resolve default
values for origin and target depending on the <code>options.src</code> or <code>options.dest</code> value.</p>
</dd>
<dt><a href="#module_jy-transform_validation_options-schema">jy-transform:validation:options-schema</a> : <code>Object</code> ℗</dt>
<dd><p>The module options schema used in <a href="module:options-validator">module:options-validator</a>.</p>
</dd>
<dt><a href="#module_jy-transform_writer">jy-transform:writer</a></dt>
<dd><p>This module provides the <em>write</em> functionality for YAML, JS or JSON targets.</p>
</dd>
<dt><a href="#module_jy-transform_unit_helper-constants">jy-transform:unit:helper-constants</a> : <code>Object</code> ℗</dt>
<dd><p>The test suite constants definitions.</p>
</dd>
<dt><a href="#module_jy-transform_unit_logger">jy-transform:unit:logger</a> : <code>Object</code> ℗</dt>
<dd><p>The test suite logger.</p>
</dd>
<dt><a href="#module_jy-transform_test-unit_index">jy-transform:test-unit:index</a> ℗</dt>
<dd><p>This unit test module tests the correct exporting from <em>./index.js</em>.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-middleware">jy-transform:unit-test:test-middleware</a> ℗</dt>
<dd><p>This unit test suite checks the validity and correctness of <a href="middleware">middleware</a> module.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-reader">jy-transform:unit-test:test-reader</a> ℗</dt>
<dd><p>This unit test suite checks the validity and correctness of <em>./src/reader.js</em> module.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-transformer">jy-transform:unit-test:test-transformer</a> ℗</dt>
<dd><p>This unit test suite checks the correct transformation behaviour of <a href="Transformer">Transformer</a> class.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-writer">jy-transform:unit-test:test-writer</a> ℗</dt>
<dd><p>This unit test suite checks the validity and correctness of <em>./src/js</em> module.</p>
</dd>
<dt><a href="#module_jy-transform_test-unit_test-joi-extension-file-helper">jy-transform:test-unit:test-joi-extension-file-helper</a> ℗</dt>
<dd><p>This unit test module tests validation FS helper method.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-joi-extensions-identifier-helper">jy-transform:unit-test:test-joi-extensions-identifier-helper</a> ℗</dt>
<dd><p>This unit test suite checks validity and correctness of ES6 identifiers.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-options-schema-helper">jy-transform:unit-test:test-options-schema-helper</a> ℗</dt>
<dd><p>This unit test suite checks the validity and correctness of options schema helper methods.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-options-schema">jy-transform:unit-test:test-options-schema</a> ℗</dt>
<dd><p>This unit test suite checks the validity and correctness of options schema.</p>
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
<a name="module_jy-transform_debug-log"></a>

## jy-transform:debug-log ℗
The debug logger. Can be enabled via environment variables (set to `true`):
- `JYT_DEBUG`: (only DEBUG logging via `console.log`)
- `JYT_DEBUG`: (only ERROR logging via `console.error`)

**Access:** private  
<a name="module_jy-transform_debug-log..debug"></a>

### jy-transform:debug-log~debug
DEBUG function.

**Kind**: inner constant of <code>[jy-transform:debug-log](#module_jy-transform_debug-log)</code>  
**Access:** protected  
<a name="module_jy-transform_jyt"></a>

## jy-transform:jyt ℗
The command line interface.

**Access:** private  

* [jy-transform:jyt](#module_jy-transform_jyt) ℗
    * [~usage](#module_jy-transform_jyt..usage) : <code>string</code> ℗
    * [~packagePath](#module_jy-transform_jyt..packagePath) : <code>string</code> ℗
    * [~options](#module_jy-transform_jyt..options) : <code>Object</code> ℗
    * [~error(err)](#module_jy-transform_jyt..error) ℗
    * [~main(args, cliOptions)](#module_jy-transform_jyt..main) ℗

<a name="module_jy-transform_jyt..usage"></a>

### jy-transform:jyt~usage : <code>string</code> ℗
How to use the CLI.

**Kind**: inner constant of <code>[jy-transform:jyt](#module_jy-transform_jyt)</code>  
**Access:** private  
<a name="module_jy-transform_jyt..packagePath"></a>

### jy-transform:jyt~packagePath : <code>string</code> ℗
The path to package.json.

**Kind**: inner constant of <code>[jy-transform:jyt](#module_jy-transform_jyt)</code>  
**Access:** private  
<a name="module_jy-transform_jyt..options"></a>

### jy-transform:jyt~options : <code>Object</code> ℗
The options description for parsing the command line input, must be an object with opts defined like:
```
long_tag: [short_tag, description, value_type, default_value];
```

**Kind**: inner constant of <code>[jy-transform:jyt](#module_jy-transform_jyt)</code>  
**Access:** private  
<a name="module_jy-transform_jyt..error"></a>

### jy-transform:jyt~error(err) ℗
Prints the error to console and exit with 1.

**Kind**: inner method of <code>[jy-transform:jyt](#module_jy-transform_jyt)</code>  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>string</code> &#124; <code>Error</code> | The error to print. |

<a name="module_jy-transform_jyt..main"></a>

### jy-transform:jyt~main(args, cliOptions) ℗
The main entry callback. When calling `cli.main()` this receives the `options`
given on CLI, then does the transformation with these options and finally, it
prints the result to the CLI.

**Kind**: inner method of <code>[jy-transform:jyt](#module_jy-transform_jyt)</code>  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Array</code> | The first mandatory argument is the input file (`args[0]`), the second (optional)                           argument is the output file (`args[1]`). |
| cliOptions | <code>module:type-definitions~Options</code> | The options provided via CLI. |

<a name="module_jy-transform_middleware"></a>

## jy-transform:middleware ℗
The middleware ensuring functions module.

**Access:** private  

* [jy-transform:middleware](#module_jy-transform_middleware) ℗
    * [~identity(object)](#module_jy-transform_middleware..identity) ⇒ <code>Promise.&lt;object&gt;</code> ℗
    * [~identityMiddleware(object)](#module_jy-transform_middleware..identityMiddleware) ⇒ <code>Promise.&lt;object&gt;</code>
    * [~ensureMiddleware(middleware)](#module_jy-transform_middleware..ensureMiddleware) ⇒ <code>function</code>

<a name="module_jy-transform_middleware..identity"></a>

### jy-transform:middleware~identity(object) ⇒ <code>Promise.&lt;object&gt;</code> ℗
Promise which reflects the identity of passed JSON: `f(object) → object`.

**Kind**: inner method of <code>[jy-transform:middleware](#module_jy-transform_middleware)</code>  
**Returns**: <code>Promise.&lt;object&gt;</code> - - A Promise resolving the passed JS `object`.  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JS object which is resolved by Promise. |

<a name="module_jy-transform_middleware..identityMiddleware"></a>

### jy-transform:middleware~identityMiddleware(object) ⇒ <code>Promise.&lt;object&gt;</code>
Middleware Promise which reflects the identity of passed JS: `f(object) → object`.

**Kind**: inner method of <code>[jy-transform:middleware](#module_jy-transform_middleware)</code>  
**Returns**: <code>Promise.&lt;object&gt;</code> - A Promise resolving the passed JS object.  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The object which is returned in Promise. |

**Example**  
```js
import { identityMiddleware } from './lib/middleware';
transformer.transform(options, identityMiddleware)
  .then((object) => {
      // ...
  }):
```
<a name="module_jy-transform_middleware..ensureMiddleware"></a>

### jy-transform:middleware~ensureMiddleware(middleware) ⇒ <code>function</code>
Ensure that the given middleware Promise is a function if set.
If not set a new JSON 'identity' Promise is returned which simply passes
a JSON object.

**Kind**: inner method of <code>[jy-transform:middleware](#module_jy-transform_middleware)</code>  
**Returns**: <code>function</code> - - The given middleware Promise or a new JSON 'identity' middleware Promise function.  
**Throws**:

- <code>TypeError</code> - Will throw this error when the passed `middleware` is not type of `Function`.

**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| middleware | <code>function</code> | This middleware Promise can be used to intercept        the JSON object for altering he passed JSON, the function signature is        `function(object).` **NOTE:** the Promise has to return the processed JSON. |

**Example**  
```js
import { ensureMiddleware } from './lib/middleware';
const myMiddleware = async (object) => {
    //...do something with object
    return object;
};
transformer.transform(options, ensureMiddleware(myMiddleware))
  .then((transformedObject) => {
      //...
  }):
```
<a name="module_jy-transform_reader"></a>

## jy-transform:reader
This module provides the _read_ functionality for YAML, JS or JSON sources.

**Access:** public  

* [jy-transform:reader](#module_jy-transform_reader)
    * [~fsPromisified](#module_jy-transform_reader..fsPromisified) ℗
    * [~createReadableFunction(readable, bufs)](#module_jy-transform_reader..createReadableFunction) ⇒ <code>function</code> ℗
    * [~readFromStream(readable, resolve, reject, origin)](#module_jy-transform_reader..readFromStream) ℗

<a name="module_jy-transform_reader..fsPromisified"></a>

### jy-transform:reader~fsPromisified ℗
Promisified `fs` module.

**Kind**: inner constant of <code>[jy-transform:reader](#module_jy-transform_reader)</code>  
**Access:** private  
<a name="module_jy-transform_reader..createReadableFunction"></a>

### jy-transform:reader~createReadableFunction(readable, bufs) ⇒ <code>function</code> ℗
Creates a function to read from the passed source in to the given buffer array.

**Kind**: inner method of <code>[jy-transform:reader](#module_jy-transform_reader)</code>  
**Returns**: <code>function</code> - - The function which reads and buffers.  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| readable | <code>stream.Readable</code> | The source to read from. |
| bufs | <code>Array</code> | The temporary buffer array. |

<a name="module_jy-transform_reader..readFromStream"></a>

### jy-transform:reader~readFromStream(readable, resolve, reject, origin) ℗
Reads from a passed stream and resolves by callback.

**Kind**: inner method of <code>[jy-transform:reader](#module_jy-transform_reader)</code>  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| readable | <code>Stream.Readable</code> | The source to read from. |
| resolve | <code>function</code> | Callback for success case. |
| reject | <code>function</code> | Callback for Error case. |
| origin | <code>string</code> | Origin type, must be 'yaml' or 'json'/'js'. |

<a name="module_jy-transform_transformer"></a>

## jy-transform:transformer
This module provides the _transform_ functionality for YAML, JS or JSON source to destination mapping.

**Access:** public  

* [jy-transform:transformer](#module_jy-transform_transformer)
    * [~createTransformation](#module_jy-transform_transformer..createTransformation) ⇒ <code>Promise.&lt;string&gt;</code>
    * [~itmo](#module_jy-transform_transformer..itmo) ℗
    * [~transform](#module_jy-transform_transformer..transform) ⇒ <code>Promise.&lt;String&gt;</code>
    * [~transformations](#module_jy-transform_transformer..transformations) : <code>object</code> ℗
    * [~yamlToJson(options, [middleware])](#module_jy-transform_transformer..yamlToJson) ⇒ <code>Promise</code> ℗
    * [~jsToYaml(options, [middleware])](#module_jy-transform_transformer..jsToYaml) ⇒ <code>Promise</code> ℗
    * [~jsonToJs(options, [middleware])](#module_jy-transform_transformer..jsonToJs) ⇒ <code>Promise</code> ℗
    * [~jsToJson(options, [middleware])](#module_jy-transform_transformer..jsToJson) ⇒ <code>Promise</code> ℗
    * [~yamlToYaml(options, [middleware])](#module_jy-transform_transformer..yamlToYaml) ⇒ <code>Promise</code> ℗
    * [~jsonToJson(options, [middleware])](#module_jy-transform_transformer..jsonToJson) ⇒ <code>Promise</code> ℗
    * [~jsToJs(options, [middleware])](#module_jy-transform_transformer..jsToJs) ⇒ <code>Promise.&lt;String&gt;</code> ℗

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
<a name="module_jy-transform_transformer..itmo"></a>

### jy-transform:transformer~itmo ℗
Internal delegate function to execute transformation logic (ITMO):
- Input (read)
- Transform + Middleware
- Output (write)

**Kind**: inner property of <code>[jy-transform:transformer](#module_jy-transform_transformer)</code>  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | The configuration for a transformation. |
| read | <code>function</code> | The reader function. |
| [middleware] | <code>function</code> | The middleware to apply. |
| write | <code>function</code> | The writer functions. |

**Example**  
```js
var options = {...};
var middleware = async (obj) => {
    ...
};
const result = await itmo(options, readYaml, middleware, writeJson);
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
<a name="module_jy-transform_transformer..transformations"></a>

### jy-transform:transformer~transformations : <code>object</code> ℗
A transformation name to internal function mapping.

**Kind**: inner namespace of <code>[jy-transform:transformer](#module_jy-transform_transformer)</code>  
**Access:** private  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| yaml2js | <code>function</code> | The transformation function for YAML ⇒ JS. |
| yaml2json | <code>function</code> | The transformation function for YAML ⇒ JSON. |
| yaml2yaml | <code>function</code> | The transformation function for YAML ⇒ YAML. |
| json2yaml | <code>function</code> | The transformation function for JSON ⇒ YAML. |
| json2js | <code>function</code> | The transformation function for JSON ⇒ JS. |
| json2json | <code>function</code> | The transformation function for JSON ⇒ JSON. |
| js2yaml | <code>function</code> | The transformation function for JS ⇒ YAML. |
| js2json | <code>function</code> | The transformation function for JS ⇒ JSON. |
| js2js | <code>function</code> | The transformation function for JS ⇒ JS. |

<a name="module_jy-transform_transformer..yamlToJson"></a>

### jy-transform:transformer~yamlToJson(options, [middleware]) ⇒ <code>Promise</code> ℗
Convert YAML to JSON.

**Kind**: inner method of <code>[jy-transform:transformer](#module_jy-transform_transformer)</code>  
**Returns**: <code>Promise</code> - - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> - Will throw this error when the passed `middleware`
        is not type of `Function`.
- <code>Error</code> - Will throw plain error when writing to JSON destination failed due to any reason.

**Access:** private  
**See**: itmo  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | The configuration for a transformation. |
| [middleware] | <code>function</code> | This middleware Promise can be used to intercept        the JS object for manipulation. The function signature is:        ```        function(object)        ```        **NOTE:** the Promise has to return the processed JS object! |

**Example**  
```js
var logger = ...;
var options = {...};
var middleware = function (obj) {
    ...
};
var Transformer = require('jy-transform');
var transformer = new Transformer(logger);
transformer.yamlToJson(options, middleware);
```
<a name="module_jy-transform_transformer..jsToYaml"></a>

### jy-transform:transformer~jsToYaml(options, [middleware]) ⇒ <code>Promise</code> ℗
Convert JS to YAML.

**Kind**: inner method of <code>[jy-transform:transformer](#module_jy-transform_transformer)</code>  
**Returns**: <code>Promise</code> - - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> - Will throw this error when the passed `middleware`
        is not type of `Function`.
- <code>Error</code> - Will throw plain error when writing to YAML destination failed due to any reason.

**Access:** private  
**See**: itmo  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | The configuration for a transformation. |
| [middleware] | <code>function</code> | This middleware Promise can be used to intercept        the JS object for manipulation. The function signature is:        ```        function(object)        ```        **NOTE:** the Promise has to return the processed JS object! |

**Example**  
```js
var logger = ...;
var options = {...};
var middleware = function (obj) {
    ...
};
var Transformer = require('jy-transform');
var transformer = new Transformer(logger);
transformer.jsToYaml(options, middleware);
```
<a name="module_jy-transform_transformer..jsonToJs"></a>

### jy-transform:transformer~jsonToJs(options, [middleware]) ⇒ <code>Promise</code> ℗
Convert JSON to JS.

**Kind**: inner method of <code>[jy-transform:transformer](#module_jy-transform_transformer)</code>  
**Returns**: <code>Promise</code> - - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> - Will throw this error when the passed `middleware`
        is not type of `Function`.
- <code>Error</code> - Will throw plain error when writing to JS destination failed due to any reason.

**Access:** private  
**See**: itmo  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | The configuration for a transformation. |
| [middleware] | <code>function</code> | This middleware Promise can be used to intercept        the JS object for manipulation. The function signature is:        ```        function(object)        ```        **NOTE:** the Promise has to return the processed JS object! |

**Example**  
```js
var logger = ...;
var options = {...};
var middleware = function (obj) {
    ...
};
var Transformer = require('jy-transform');
var transformer = new Transformer(logger);
transformer.jsonToJs(options, middleware);
```
<a name="module_jy-transform_transformer..jsToJson"></a>

### jy-transform:transformer~jsToJson(options, [middleware]) ⇒ <code>Promise</code> ℗
Convert JS to JSON.

**Kind**: inner method of <code>[jy-transform:transformer](#module_jy-transform_transformer)</code>  
**Returns**: <code>Promise</code> - - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> - Will throw this error when the passed `middleware`
        is not type of `Function`.
- <code>Error</code> - Will throw plain error when writing to JSON destination failed due to any reason.

**Access:** private  
**See**: itmo  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | The configuration for a transformation. |
| [middleware] | <code>function</code> | This middleware Promise can be used to intercept        the JS object for manipulation. The function signature is:        ```        function(object)        ```        **NOTE:** the Promise has to return the processed JS object! |

**Example**  
```js
var logger = ...;
var options = {...};
var middleware = function (obj) {
    ...
};
var Transformer = require('jy-transform');
var transformer = new Transformer(logger);
transformer.jsToJson(options, middleware);
```
<a name="module_jy-transform_transformer..yamlToYaml"></a>

### jy-transform:transformer~yamlToYaml(options, [middleware]) ⇒ <code>Promise</code> ℗
Convert YAML to YAML.

**Kind**: inner method of <code>[jy-transform:transformer](#module_jy-transform_transformer)</code>  
**Returns**: <code>Promise</code> - - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> - Will throw this error when the passed `middleware`
        is not type of `Function`.
- <code>Error</code> - Will throw plain error when writing to YAML destination failed due to any reason.

**Access:** private  
**See**: itmo  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | The configuration for a transformation. |
| [middleware] | <code>function</code> | This middleware Promise can be used to intercept        the JS object for manipulation. The function signature is:        ```        function(object)        ```        **NOTE:** the Promise has to return the processed JS object! |

**Example**  
```js
var logger = ...;
var options = {...};
var middleware = function (obj) {
    ...
};
var Transformer = require('jy-transform');
var transformer = new Transformer(logger);
transformer.yamlToYaml(options, middleware);
```
<a name="module_jy-transform_transformer..jsonToJson"></a>

### jy-transform:transformer~jsonToJson(options, [middleware]) ⇒ <code>Promise</code> ℗
Convert JSON to JSON.

**Kind**: inner method of <code>[jy-transform:transformer](#module_jy-transform_transformer)</code>  
**Returns**: <code>Promise</code> - - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> - Will throw this error when the passed `middleware`
        is not type of `Function`.
- <code>Error</code> - Will throw plain error when writing to JSON destination failed due to any reason.

**Access:** private  
**See**: itmo  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | The configuration for a transformation. |
| [middleware] | <code>function</code> | This middleware Promise can be used to intercept        the JS object for manipulation. The function signature is:        ```        function(object)        ```        **NOTE:** the Promise has to return the processed JS object! |

**Example**  
```js
var logger = ...;
var options = {...};
var middleware = function (obj) {
    ...
};
var Transformer = require('jy-transform');
var transformer = new Transformer(logger);
transformer.jsonToJson(options, middleware);
```
<a name="module_jy-transform_transformer..jsToJs"></a>

### jy-transform:transformer~jsToJs(options, [middleware]) ⇒ <code>Promise.&lt;String&gt;</code> ℗
Convert JS to JS.

**Kind**: inner method of <code>[jy-transform:transformer](#module_jy-transform_transformer)</code>  
**Returns**: <code>Promise.&lt;String&gt;</code> - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> Will throw this error when the passed `middleware` is not type of `Function`.
- <code>Error</code> Will throw plain error when writing to JS destination failed due to any reason.

**Access:** private  
**See**: itmo  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | The configuration for a transformation. |
| [middleware] | <code>function</code> | This middleware Promise can be used to intercept        the JS object for manipulation. The function signature is:        ```        function(object)        ```        **NOTE:** the Promise has to return the processed JS object! |

**Example**  
```js
var options = {...};
var middleware = async (json) {
  ...
};
jsToJs(options, middleware);
```
<a name="module_jy-transform_type-definitions"></a>

## jy-transform:type-definitions ℗
The type definitions for this module.

**Access:** private  

* [jy-transform:type-definitions](#module_jy-transform_type-definitions) ℗
    * [~Options](#module_jy-transform_type-definitions..Options) : <code>object</code>
    * [~joi](#external_joi)
        * [.ValidationError](#external_joi.ValidationError)
        * [.Schema](#external_joi.Schema)
        * [.Extension](#external_joi.Extension)
        * [.validate](#external_joi.validate) : <code>function</code>

<a name="module_jy-transform_type-definitions..Options"></a>

### jy-transform:type-definitions~Options : <code>object</code>
The configuration properties provided to the framework functions.

**Kind**: inner typedef of <code>[jy-transform:type-definitions](#module_jy-transform_type-definitions)</code>  
**Access:** public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| origin | <code>string</code> | <code>&quot;yaml&quot;</code> | The origin type. |
| target | <code>string</code> | <code>&quot;js&quot;</code> | The target type. |
| src | <code>string</code> &#124; <code>Stream.Readable</code> &#124; <code>object</code> |  | The source (if `string` type is treated as a file path). |
| dest | <code>string</code> &#124; <code>Stream.Writable</code> &#124; <code>object</code> |  | The destination (if `string` type is treated as a file path). |
| indent | <code>number</code> | <code>2</code> | The indention in files. |
| imports | <code>string</code> |  | The exports name for reading from JS source files                                                      or objects only. |
| exports | <code>string</code> |  | The exports name for usage in JS destination files only. |
| force | <code>string</code> | <code>false</code> | Force overwriting of existing output files on write phase. |

<a name="external_joi"></a>

### jy-transform:type-definitions~joi
Hapi.js Joi.

**Kind**: inner external of <code>[jy-transform:type-definitions](#module_jy-transform_type-definitions)</code>  
**See**: [Hapi Joi](https://github.com/hapijs/joi)  

* [~joi](#external_joi)
    * [.ValidationError](#external_joi.ValidationError)
    * [.Schema](#external_joi.Schema)
    * [.Extension](#external_joi.Extension)
    * [.validate](#external_joi.validate) : <code>function</code>

<a name="external_joi.ValidationError"></a>

#### joi.ValidationError
Joi validation error.

**Kind**: static typedef of <code>[joi](#external_joi)</code>  
**See**: [Joi errors](hhttps://github.com/hapijs/joi/blob/v10.2.0/API.md#errors)  
<a name="external_joi.Schema"></a>

#### joi.Schema
The validation schema. Can be a [joi](#external_joi) type object or a plain object
where every key is assigned a [joi](#external_joi) type object.

**Kind**: static typedef of <code>[joi](#external_joi)</code>  
**See**: [Joi API](https://github.com/hapijs/joi/blob/v10.2.2/API.md#joi)  
<a name="external_joi.Extension"></a>

#### joi.Extension
Hapi.js Joi schema extension.

**Kind**: static typedef of <code>[joi](#external_joi)</code>  
**See**: [Hapi Joi Extension](https://github.com/hapijs/joi/blob/v10.2.2/API.md#extendextension)  
<a name="external_joi.validate"></a>

#### joi.validate : <code>function</code>
Joi `validate` method.

**Kind**: static typedef of <code>[joi](#external_joi)</code>  
**See**: [Joi.validate](https://github.com/hapijs/joi/blob/master/API.md#validatevalue-schema-options-callback)  
<a name="module_jy-transform_validation_joi-extensions-file-helper"></a>

## jy-transform:validation:joi-extensions-file-helper ℗
An (extended) Joi validation schema helper functions for the module options on FS validation.

**Access:** private  
<a name="module_jy-transform_validation_joi-extensions-file-helper..isExistingFile"></a>

### jy-transform:validation:joi-extensions-file-helper~isExistingFile(pathStr) ⇒ <code>boolean</code>
Checks if given `pathStr` is an existing file after resolving `pathStr` relative to CWD.

**Kind**: inner method of <code>[jy-transform:validation:joi-extensions-file-helper](#module_jy-transform_validation_joi-extensions-file-helper)</code>  
**Returns**: <code>boolean</code> - Value `true` if it is a file and exists, else `false`.  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| pathStr | <code>string</code> | The string to check for being a file. |

<a name="module_jy-transform_validation_joi-extensions-identifier-helper"></a>

## jy-transform:validation:joi-extensions-identifier-helper ℗
An (extended) Joi validation schema helper function for the module options to validate ES6 identifiers.

**Access:** private  

* [jy-transform:validation:joi-extensions-identifier-helper](#module_jy-transform_validation_joi-extensions-identifier-helper) ℗
    * [~identifierRegExpECMAScript6](#module_jy-transform_validation_joi-extensions-identifier-helper..identifierRegExpECMAScript6) : <code>RegExp</code> ℗
    * [~isValidEs6Identifier(identifier)](#module_jy-transform_validation_joi-extensions-identifier-helper..isValidEs6Identifier) ⇒ <code>boolean</code>

<a name="module_jy-transform_validation_joi-extensions-identifier-helper..identifierRegExpECMAScript6"></a>

### jy-transform:validation:joi-extensions-identifier-helper~identifierRegExpECMAScript6 : <code>RegExp</code> ℗
Created at [Generating a regular expression to match valid JavaScript identifiers]
(https://mathiasbynens.be/demo/javascript-identifier-regex).

**Kind**: inner constant of <code>[jy-transform:validation:joi-extensions-identifier-helper](#module_jy-transform_validation_joi-extensions-identifier-helper)</code>  
**Access:** private  
<a name="module_jy-transform_validation_joi-extensions-identifier-helper..isValidEs6Identifier"></a>

### jy-transform:validation:joi-extensions-identifier-helper~isValidEs6Identifier(identifier) ⇒ <code>boolean</code>
This method checks if a given `identifier` is a valid ECMAScript 6 identifier.

**Kind**: inner method of <code>[jy-transform:validation:joi-extensions-identifier-helper](#module_jy-transform_validation_joi-extensions-identifier-helper)</code>  
**Returns**: <code>boolean</code> - A `true` if valid, else `false`.  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | The identifier to check. |

**Example**  
```js
import { isValidEs6Identifier } from './validation/joi-extensions-identifier-helper.js';
const identifier = 'foo';
console.log('valid = ' + isValidEs6Identifier(identifier));
```
<a name="module_jy-transform_validation_joi-extension"></a>

## jy-transform:validation:joi-extension ℗
The module exporting the [Extension](#external_joi.Extension)s for option validations.

**Access:** private  
**See**: [Joi.extend(extension) method](https://github.com/hapijs/joi/blob/v10.2.2/API.md#extendextension).  
<a name="module_jy-transform_validation_joi-extension..EXTENSIONS"></a>

### jy-transform:validation:joi-extension~EXTENSIONS : <code>[Extension](#external_joi.Extension)</code> ℗
The common [Schema](#external_joi.Schema) validation extensions:
- `existingFile` - needs to be an absolute or relative path to an existing file.
- `validEs6Identifier` - needs to be a valid ECMAScript 6 identifier.

**Kind**: inner constant of <code>[jy-transform:validation:joi-extension](#module_jy-transform_validation_joi-extension)</code>  
**Access:** private  
<a name="module_jy-transform_validation_options-schema-helper"></a>

## jy-transform:validation:options-schema-helper : <code>Object</code> ℗
Provides some helper functions used in [module:validation:options-schema](module:validation:options-schema) to resolve default
values for origin and target depending on the `options.src` or `options.dest` value.

**Access:** private  
**See**: [module:validation:options-schema](module:validation:options-schema)  

* [jy-transform:validation:options-schema-helper](#module_jy-transform_validation_options-schema-helper) : <code>Object</code> ℗
    * [~inferOriginDefaultFromStreamReadableFilePath](#module_jy-transform_validation_options-schema-helper..inferOriginDefaultFromStreamReadableFilePath) ⇒ <code>string</code>
    * [~inferOriginDefaultFromFilePath](#module_jy-transform_validation_options-schema-helper..inferOriginDefaultFromFilePath) ⇒ <code>string</code>
    * [~inferTargetDefaultFromStreamWritableFilePath](#module_jy-transform_validation_options-schema-helper..inferTargetDefaultFromStreamWritableFilePath) ⇒ <code>string</code>
    * [~inferTargetDefaultFromFilePath](#module_jy-transform_validation_options-schema-helper..inferTargetDefaultFromFilePath) ⇒ <code>string</code>
    * [~getTypeFromFilePath(pathStr, origin, defaultValue)](#module_jy-transform_validation_options-schema-helper..getTypeFromFilePath) ⇒ <code>string</code> ℗

<a name="module_jy-transform_validation_options-schema-helper..inferOriginDefaultFromStreamReadableFilePath"></a>

### jy-transform:validation:options-schema-helper~inferOriginDefaultFromStreamReadableFilePath ⇒ <code>string</code>
TODO describe me.

**Kind**: inner constant of <code>[jy-transform:validation:options-schema-helper](#module_jy-transform_validation_options-schema-helper)</code>  
**Returns**: <code>string</code> - The origin type.  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | TODO describe me. |

<a name="module_jy-transform_validation_options-schema-helper..inferOriginDefaultFromFilePath"></a>

### jy-transform:validation:options-schema-helper~inferOriginDefaultFromFilePath ⇒ <code>string</code>
TODO describe me.

**Kind**: inner constant of <code>[jy-transform:validation:options-schema-helper](#module_jy-transform_validation_options-schema-helper)</code>  
**Returns**: <code>string</code> - The origin type.  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | TODO describe me. |

<a name="module_jy-transform_validation_options-schema-helper..inferTargetDefaultFromStreamWritableFilePath"></a>

### jy-transform:validation:options-schema-helper~inferTargetDefaultFromStreamWritableFilePath ⇒ <code>string</code>
TODO describe me.

**Kind**: inner constant of <code>[jy-transform:validation:options-schema-helper](#module_jy-transform_validation_options-schema-helper)</code>  
**Returns**: <code>string</code> - The target type.  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | TODO describe me. |

<a name="module_jy-transform_validation_options-schema-helper..inferTargetDefaultFromFilePath"></a>

### jy-transform:validation:options-schema-helper~inferTargetDefaultFromFilePath ⇒ <code>string</code>
TODO describe me.

**Kind**: inner constant of <code>[jy-transform:validation:options-schema-helper](#module_jy-transform_validation_options-schema-helper)</code>  
**Returns**: <code>string</code> - The target type.  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | TODO describe me. |

<a name="module_jy-transform_validation_options-schema-helper..getTypeFromFilePath"></a>

### jy-transform:validation:options-schema-helper~getTypeFromFilePath(pathStr, origin, defaultValue) ⇒ <code>string</code> ℗
Infer from path extension to a type using default value as fallback.

**Kind**: inner method of <code>[jy-transform:validation:options-schema-helper](#module_jy-transform_validation_options-schema-helper)</code>  
**Returns**: <code>string</code> - A type value.  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| pathStr | <code>string</code> | The file path with or without extension. |
| origin | <code>boolean</code> | If the type is origin (true) or target (false). |
| defaultValue | <code>string</code> | The default value to use if type cannot be inferred from path. |

<a name="module_jy-transform_validation_options-schema"></a>

## jy-transform:validation:options-schema : <code>Object</code> ℗
The module options schema used in [module:options-validator](module:options-validator).

**Access:** private  
**See**: [module:options-validator](module:options-validator)  

* [jy-transform:validation:options-schema](#module_jy-transform_validation_options-schema) : <code>Object</code> ℗
    * [~readerOptionsSchema](#module_jy-transform_validation_options-schema..readerOptionsSchema) : <code>JoiSchema</code> ℗
    * [~writerOptionsSchema](#module_jy-transform_validation_options-schema..writerOptionsSchema) : <code>JoiSchema</code> ℗
    * [~transformerOptionsSchema](#module_jy-transform_validation_options-schema..transformerOptionsSchema) : <code>JoiSchema</code> ℗

<a name="module_jy-transform_validation_options-schema..readerOptionsSchema"></a>

### jy-transform:validation:options-schema~readerOptionsSchema : <code>JoiSchema</code> ℗
The prepared [external:joi.JoiSchema](external:joi.JoiSchema) for validating the [Reader](Reader) options.

**Kind**: inner constant of <code>[jy-transform:validation:options-schema](#module_jy-transform_validation_options-schema)</code>  
**Access:** private  
<a name="module_jy-transform_validation_options-schema..writerOptionsSchema"></a>

### jy-transform:validation:options-schema~writerOptionsSchema : <code>JoiSchema</code> ℗
The prepared [external:joi.JoiSchema](external:joi.JoiSchema) for validating the [Writer](Writer) options.

**Kind**: inner constant of <code>[jy-transform:validation:options-schema](#module_jy-transform_validation_options-schema)</code>  
**Access:** private  
<a name="module_jy-transform_validation_options-schema..transformerOptionsSchema"></a>

### jy-transform:validation:options-schema~transformerOptionsSchema : <code>JoiSchema</code> ℗
The prepared [external:joi.JoiSchema](external:joi.JoiSchema) for validating the [Transformer](Transformer) options.

**Kind**: inner constant of <code>[jy-transform:validation:options-schema](#module_jy-transform_validation_options-schema)</code>  
**Access:** private  
<a name="module_jy-transform_writer"></a>

## jy-transform:writer
This module provides the _write_ functionality for YAML, JS or JSON targets.

**Access:** public  

* [jy-transform:writer](#module_jy-transform_writer)
    * [~fsPromisified](#module_jy-transform_writer..fsPromisified) ℗
    * [~createExportsString([exportsTo])](#module_jy-transform_writer..createExportsString) ⇒ <code>Promise.&lt;string&gt;</code> ℗
    * [~serializeJsToString(object, indent, [exportsTo])](#module_jy-transform_writer..serializeJsToString) ⇒ <code>Promise</code> ℗
    * [~serializeJsToJsonString(object, indent)](#module_jy-transform_writer..serializeJsToJsonString) ⇒ <code>string</code> ℗
    * [~getConsecutiveDestName(dest)](#module_jy-transform_writer..getConsecutiveDestName) ⇒ <code>string</code> ℗
    * [~writeToFile(object, dest, target, resolve, reject, [forceOverwrite])](#module_jy-transform_writer..writeToFile) ⇒ <code>Promise.&lt;string&gt;</code> ℗
        * [~mkdirAndWrite()](#module_jy-transform_writer..writeToFile..mkdirAndWrite) ℗
    * [~writeToStream(object, dest, target, resolve, reject)](#module_jy-transform_writer..writeToStream) ⇒ <code>Promise.&lt;string&gt;</code> ℗

<a name="module_jy-transform_writer..fsPromisified"></a>

### jy-transform:writer~fsPromisified ℗
Promisified `fs` module.

**Kind**: inner constant of <code>[jy-transform:writer](#module_jy-transform_writer)</code>  
**Access:** private  
<a name="module_jy-transform_writer..createExportsString"></a>

### jy-transform:writer~createExportsString([exportsTo]) ⇒ <code>Promise.&lt;string&gt;</code> ℗
Creates a potential named `'module.exports[.exportsTo]'` string.

**Kind**: inner method of <code>[jy-transform:writer](#module_jy-transform_writer)</code>  
**Returns**: <code>Promise.&lt;string&gt;</code> - Resolves with the exports string.  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| [exportsTo] | <code>string</code> | The export name. |

<a name="module_jy-transform_writer..serializeJsToString"></a>

### jy-transform:writer~serializeJsToString(object, indent, [exportsTo]) ⇒ <code>Promise</code> ℗
Serialize a JS object to string.

**Kind**: inner method of <code>[jy-transform:writer](#module_jy-transform_writer)</code>  
**Returns**: <code>Promise</code> - - Promise resolve with the serialized JS object.  
**Access:** private  
**Todo**

- [ ] [[#35](https://github.com/deadratfink/jy-transform/issues/35)] Add `'use strict';` in JS output file (->
  `'\'use strict\';' + os.EOL + os.EOL + ...`)?


| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JS Object to serialize. |
| indent | <code>number</code> | The indention. |
| [exportsTo] | <code>string</code> | Name for export (*IMPORTANT:* must be a valid ES6 identifier). |

<a name="module_jy-transform_writer..serializeJsToJsonString"></a>

### jy-transform:writer~serializeJsToJsonString(object, indent) ⇒ <code>string</code> ℗
Serialize a JS object to JSON string.

**Kind**: inner method of <code>[jy-transform:writer](#module_jy-transform_writer)</code>  
**Returns**: <code>string</code> - The serialized JSON.  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | Object to serialize. |
| indent | <code>number</code> | Indention. |

<a name="module_jy-transform_writer..getConsecutiveDestName"></a>

### jy-transform:writer~getConsecutiveDestName(dest) ⇒ <code>string</code> ℗
Turns the destination file name into a name containing a consecutive
number if it exists. It iterates over the files until it finds a file
name which does not exist.

**Kind**: inner method of <code>[jy-transform:writer](#module_jy-transform_writer)</code>  
**Returns**: <code>string</code> - - A consecutive file name or the original one if
                       `dest` file does not exist.  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| dest | <code>string</code> | The destination file. |

<a name="module_jy-transform_writer..writeToFile"></a>

### jy-transform:writer~writeToFile(object, dest, target, resolve, reject, [forceOverwrite]) ⇒ <code>Promise.&lt;string&gt;</code> ℗
Writes a serialized object to file.

**Kind**: inner method of <code>[jy-transform:writer](#module_jy-transform_writer)</code>  
**Returns**: <code>Promise.&lt;string&gt;</code> - Containing the write success message to handle by caller (e.g. for logging).  
**Throws**:

- <code>Error</code> If serialized JSON file could not be written due to any reason.

**Access:** private  
**See**

- [TYPE_YAML](TYPE_YAML)
- [TYPE_JSON](TYPE_JSON)
- [TYPE_JS](TYPE_JS)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>string</code> | The object to write into file. |
| dest | <code>string</code> | The file destination path. |
| target | <code>string</code> | The target type, one of [ 'yaml' | 'json' | 'js' ]. |
| resolve | <code>function</code> | The Promise `resolve` callback. |
| reject | <code>function</code> | The Promise `reject` callback. |
| [forceOverwrite] | <code>boolean</code> | Forces overwriting the destination file if `true`. |

<a name="module_jy-transform_writer..writeToFile..mkdirAndWrite"></a>

#### writeToFile~mkdirAndWrite() ℗
Ensures that all dirs exists for `dest` and writes the file.

**Kind**: inner method of <code>[writeToFile](#module_jy-transform_writer..writeToFile)</code>  
**Access:** private  
<a name="module_jy-transform_writer..writeToStream"></a>

### jy-transform:writer~writeToStream(object, dest, target, resolve, reject) ⇒ <code>Promise.&lt;string&gt;</code> ℗
Writes a string serialized data object to a stream.

**Kind**: inner method of <code>[jy-transform:writer](#module_jy-transform_writer)</code>  
**Returns**: <code>Promise.&lt;string&gt;</code> - Containing the write success message to handle by caller (e.g. for logging).  
**Throws**:

- <code>Error</code> If serialized JS object could not be written due to any reason.

**Access:** private  
**See**

- [Constants#TYPE_YAML](Constants#TYPE_YAML)
- [Constants#TYPE_JSON](Constants#TYPE_JSON)
- [Constants#TYPE_JS](Constants#TYPE_JS)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>string</code> | The data to write into stream. |
| dest | <code>string</code> | The stream destination. |
| target | <code>string</code> | The target type, one of [ 'yaml' | 'json' | 'js' ]. |
| resolve | <code>function</code> | The Promise `resolve` callback. |
| reject | <code>function</code> | The Promise `reject` callback. |

<a name="module_jy-transform_unit_helper-constants"></a>

## jy-transform:unit:helper-constants : <code>Object</code> ℗
The test suite constants definitions.

**Access:** private  

* [jy-transform:unit:helper-constants](#module_jy-transform_unit_helper-constants) : <code>Object</code> ℗
    * [~TEST_SUITE_DESCRIPTION_UNIT](#module_jy-transform_unit_helper-constants..TEST_SUITE_DESCRIPTION_UNIT) : <code>string</code>
    * [~TEST_SUITE_DESCRIPTION_FUNCTIONAL](#module_jy-transform_unit_helper-constants..TEST_SUITE_DESCRIPTION_FUNCTIONAL) : <code>string</code>

<a name="module_jy-transform_unit_helper-constants..TEST_SUITE_DESCRIPTION_UNIT"></a>

### jy-transform:unit:helper-constants~TEST_SUITE_DESCRIPTION_UNIT : <code>string</code>
The unit test suite description for the plugin.

**Kind**: inner constant of <code>[jy-transform:unit:helper-constants](#module_jy-transform_unit_helper-constants)</code>  
**Access:** public  
<a name="module_jy-transform_unit_helper-constants..TEST_SUITE_DESCRIPTION_FUNCTIONAL"></a>

### jy-transform:unit:helper-constants~TEST_SUITE_DESCRIPTION_FUNCTIONAL : <code>string</code>
The unit test suite description for the plugin.

**Kind**: inner constant of <code>[jy-transform:unit:helper-constants](#module_jy-transform_unit_helper-constants)</code>  
**Access:** public  
<a name="module_jy-transform_unit_logger"></a>

## jy-transform:unit:logger : <code>Object</code> ℗
The test suite logger.

**Access:** private  

* [jy-transform:unit:logger](#module_jy-transform_unit_logger) : <code>Object</code> ℗
    * [~INDENT](#module_jy-transform_unit_logger..INDENT) : <code>string</code> ℗
    * [~TEST_TMP_DIR](#module_jy-transform_unit_logger..TEST_TMP_DIR) : <code>string</code> ℗
    * [~winstonFileOptions](#module_jy-transform_unit_logger..winstonFileOptions) : <code>Object</code> ℗
        * [.timestamp()](#module_jy-transform_unit_logger..winstonFileOptions.timestamp) ⇒ <code>string</code>
    * [~winstonConsoleOptions](#module_jy-transform_unit_logger..winstonConsoleOptions) : <code>Object</code> ℗
        * [.timestamp()](#module_jy-transform_unit_logger..winstonConsoleOptions.timestamp) ⇒ <code>string</code>
    * [~logger](#module_jy-transform_unit_logger..logger)
    * [~formatter(options)](#module_jy-transform_unit_logger..formatter) ⇒ <code>string</code> ℗

<a name="module_jy-transform_unit_logger..INDENT"></a>

### jy-transform:unit:logger~INDENT : <code>string</code> ℗
An indent of 0 SPACEs.

**Kind**: inner constant of <code>[jy-transform:unit:logger](#module_jy-transform_unit_logger)</code>  
**Access:** private  
<a name="module_jy-transform_unit_logger..TEST_TMP_DIR"></a>

### jy-transform:unit:logger~TEST_TMP_DIR : <code>string</code> ℗
A temporary test directory.

**Kind**: inner constant of <code>[jy-transform:unit:logger](#module_jy-transform_unit_logger)</code>  
**Access:** private  
<a name="module_jy-transform_unit_logger..winstonFileOptions"></a>

### jy-transform:unit:logger~winstonFileOptions : <code>Object</code> ℗
Options for winston file logging.

**Kind**: inner constant of <code>[jy-transform:unit:logger](#module_jy-transform_unit_logger)</code>  
**Access:** private  
<a name="module_jy-transform_unit_logger..winstonFileOptions.timestamp"></a>

#### winstonFileOptions.timestamp() ⇒ <code>string</code>
Formats the timestamp as [Date](Date) ISO string prefixed by an indent.

**Kind**: static method of <code>[winstonFileOptions](#module_jy-transform_unit_logger..winstonFileOptions)</code>  
**Returns**: <code>string</code> - - The [Date](Date) ISO string.  
**See**: #INDENT  
<a name="module_jy-transform_unit_logger..winstonConsoleOptions"></a>

### jy-transform:unit:logger~winstonConsoleOptions : <code>Object</code> ℗
Options for winston console logging.

**Kind**: inner constant of <code>[jy-transform:unit:logger](#module_jy-transform_unit_logger)</code>  
**Access:** private  
<a name="module_jy-transform_unit_logger..winstonConsoleOptions.timestamp"></a>

#### winstonConsoleOptions.timestamp() ⇒ <code>string</code>
Overwrites the timestamp by indent.

**Kind**: static method of <code>[winstonConsoleOptions](#module_jy-transform_unit_logger..winstonConsoleOptions)</code>  
**Returns**: <code>string</code> - - The indent only.  
**See**: #INDENT  
<a name="module_jy-transform_unit_logger..logger"></a>

### jy-transform:unit:logger~logger
The winston logger.

**Kind**: inner constant of <code>[jy-transform:unit:logger](#module_jy-transform_unit_logger)</code>  
**Access:** protected  
<a name="module_jy-transform_unit_logger..formatter"></a>

### jy-transform:unit:logger~formatter(options) ⇒ <code>string</code> ℗
This function formats the log string by given options to log.

**Kind**: inner method of <code>[jy-transform:unit:logger](#module_jy-transform_unit_logger)</code>  
**Returns**: <code>string</code> - The log string.  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The formatter options. |

<a name="module_jy-transform_test-unit_index"></a>

## jy-transform:test-unit:index ℗
This unit test module tests the correct exporting from _./index.js_.

**Access:** private  
<a name="module_jy-transform_unit-test_test-middleware"></a>

## jy-transform:unit-test:test-middleware ℗
This unit test suite checks the validity and correctness of [middleware](middleware) module.

**Access:** private  
<a name="module_jy-transform_unit-test_test-reader"></a>

## jy-transform:unit-test:test-reader ℗
This unit test suite checks the validity and correctness of _./src/reader.js_ module.

**Access:** private  
<a name="module_jy-transform_unit-test_test-transformer"></a>

## jy-transform:unit-test:test-transformer ℗
This unit test suite checks the correct transformation behaviour of [Transformer](Transformer) class.

**Access:** private  
<a name="module_jy-transform_unit-test_test-writer"></a>

## jy-transform:unit-test:test-writer ℗
This unit test suite checks the validity and correctness of _./src/js_ module.

**Access:** private  
<a name="module_jy-transform_test-unit_test-joi-extension-file-helper"></a>

## jy-transform:test-unit:test-joi-extension-file-helper ℗
This unit test module tests validation FS helper method.

**Access:** private  
<a name="module_jy-transform_unit-test_test-joi-extensions-identifier-helper"></a>

## jy-transform:unit-test:test-joi-extensions-identifier-helper ℗
This unit test suite checks validity and correctness of ES6 identifiers.

**Access:** private  
<a name="module_jy-transform_unit-test_test-options-schema-helper"></a>

## jy-transform:unit-test:test-options-schema-helper ℗
This unit test suite checks the validity and correctness of options schema helper methods.

**Access:** private  
<a name="module_jy-transform_unit-test_test-options-schema"></a>

## jy-transform:unit-test:test-options-schema ℗
This unit test suite checks the validity and correctness of options schema.

**Access:** private  
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
