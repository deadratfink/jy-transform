<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
### TOC

- [Classes](#classes)
- [Typedefs](#typedefs)
- [Constants](#constants)
- [LogWrapper](#logwrapper)
- [Middleware](#middleware)
- [OptionsHandler](#optionshandler)
- [Reader](#reader)
- [Transformer](#transformer)
- [Validator](#validator)
- [Writer](#writer)
- [Options : <code>object</code>](#options--codeobjectcode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
       from a source (file, {object} or <a href="stream.Readable">stream.Readable</a>) to JS memory objects.</p>
</dd>
<dt><a href="#Transformer">Transformer</a></dt>
<dd><p>This class provides all methods usable to handle YAML, JSON and JS and
       their transformations.</p>
</dd>
<dt><a href="#Validator">Validator</a></dt>
<dd><p>This class validates JS identifier.
       <p>
       <strong>NOTE:</strong> this class is intended for internal use only!</p>
</dd>
<dt><a href="#Writer">Writer</a></dt>
<dd><p>This class provides utility methods usable to write JS objects
       from memory to a JSON/JS/YAML destination
       (file, object or <a href="stream.Readable">stream.Readable</a>).</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Options">Options</a> : <code>object</code></dt>
<dd></dd>
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
    * [.MIN_INDENT](#Constants+MIN_INDENT) : <code>number</code>
    * [.MAX_INDENT](#Constants+MAX_INDENT) : <code>number</code>
    * [.DEFAULT_ORIGIN](#Constants+DEFAULT_ORIGIN) : <code>string</code>
    * [.DEFAULT_TARGET](#Constants+DEFAULT_TARGET) : <code>string</code>
    * [.DEFAULT_FORCE_FILE_OVERWRITE](#Constants+DEFAULT_FORCE_FILE_OVERWRITE) : <code>boolean</code>
    * [.ORIGIN_DESCRIPTION](#Constants+ORIGIN_DESCRIPTION) : <code>string</code>
    * [.TARGET_DESCRIPTION](#Constants+TARGET_DESCRIPTION) : <code>string</code>
    * [.DEST_DESCRIPTION](#Constants+DEST_DESCRIPTION) : <code>string</code>
    * [.DEFAULT_JS_IMPORTS_IDENTIFIER](#Constants+DEFAULT_JS_IMPORTS_IDENTIFIER) : <code>string</code>
    * [.DEFAULT_JS_EXPORTS_IDENTIFIER](#Constants+DEFAULT_JS_EXPORTS_IDENTIFIER) : <code>string</code>
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
<a name="Constants+MIN_INDENT"></a>

### constants.MIN_INDENT : <code>number</code>
The minimum file indention (0 SPACE).

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+MAX_INDENT"></a>

### constants.MAX_INDENT : <code>number</code>
The maximum file indention (8 SPACEs).

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+DEFAULT_ORIGIN"></a>

### constants.DEFAULT_ORIGIN : <code>string</code>
The default `origin` value: 'yaml'.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+DEFAULT_TARGET"></a>

### constants.DEFAULT_TARGET : <code>string</code>
The default `origin` value: 'js'.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+DEFAULT_FORCE_FILE_OVERWRITE"></a>

### constants.DEFAULT_FORCE_FILE_OVERWRITE : <code>boolean</code>
Whether to overwrite existing file or object on output.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+ORIGIN_DESCRIPTION"></a>

### constants.ORIGIN_DESCRIPTION : <code>string</code>
The `origin` description value.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+TARGET_DESCRIPTION"></a>

### constants.TARGET_DESCRIPTION : <code>string</code>
The `target` description value.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+DEST_DESCRIPTION"></a>

### constants.DEST_DESCRIPTION : <code>string</code>
The `dest` description value.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+DEFAULT_JS_IMPORTS_IDENTIFIER"></a>

### constants.DEFAULT_JS_IMPORTS_IDENTIFIER : <code>string</code>
The `src` exports identifier value to read.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
**Example**  
```js
module.exports.foo = {...}; // here 'foo' is the identifier for an object to read from the source!
```
<a name="Constants+DEFAULT_JS_EXPORTS_IDENTIFIER"></a>

### constants.DEFAULT_JS_EXPORTS_IDENTIFIER : <code>string</code>
The `dest` exports identifier value to write.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+YAML_TO_JS"></a>

### constants.YAML_TO_JS : <code>string</code>
The transformation direction YAML ⇒ JS.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+YAML_TO_JSON"></a>

### constants.YAML_TO_JSON : <code>string</code>
The transformation direction YAML ⇒ JSON.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JS_TO_YAML"></a>

### constants.JS_TO_YAML : <code>string</code>
The transformation direction JS ⇒ YAML.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JSON_TO_YAML"></a>

### constants.JSON_TO_YAML : <code>string</code>
The transformation direction JSON ⇒ YAML.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JSON_TO_JS"></a>

### constants.JSON_TO_JS : <code>string</code>
The transformation direction JSON ⇒ JS.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JS_TO_JSON"></a>

### constants.JS_TO_JSON : <code>string</code>
The transformation direction JS ⇒ JSON.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+YAML_TO_YAML"></a>

### constants.YAML_TO_YAML : <code>string</code>
The transformation direction YAML ⇒ YAML.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JSON_TO_JSON"></a>

### constants.JSON_TO_JSON : <code>string</code>
The transformation direction JSON ⇒ JSON.

**Kind**: instance constant of <code>[Constants](#Constants)</code>  
**Access:** public  
<a name="Constants+JS_TO_JS"></a>

### constants.JS_TO_JS : <code>string</code>
The transformation direction JS ⇒ JS.

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
    * [new LogWrapper([logger])](#new_LogWrapper_new)
    * [.info(msg)](#LogWrapper+info)
    * [.debug(msg)](#LogWrapper+debug)
    * [.trace(msg)](#LogWrapper+trace)
    * [.error(msg)](#LogWrapper+error)
    * [.verboseOptions(options)](#LogWrapper+verboseOptions) ⇒

<a name="new_LogWrapper_new"></a>

### new LogWrapper([logger])
Constructs the `LogWrapper`.

**Returns**: <code>[LogWrapper](#LogWrapper)</code> - - The instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [logger] | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | <code>console</code> | Logger object. |

**Example**  
```js
var logger = ...;
var logWrapper = new LogWrapper(logger);
```
<a name="LogWrapper+info"></a>

### logWrapper.info(msg)
Log the options with INFO level.

**Kind**: instance method of <code>[LogWrapper](#LogWrapper)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The message to log. |

**Example**  
```js
var logger = ...;
var logWrapper = new LogWrapper(logger);
var msg = '...';
logWrapper.info(msg);
```
<a name="LogWrapper+debug"></a>

### logWrapper.debug(msg)
Log the options with DEBUG level (if logger supports it, else with INFO).

**Kind**: instance method of <code>[LogWrapper](#LogWrapper)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The message to log. |

**Example**  
```js
var logger = ...;
var logWrapper = new LogWrapper(logger);
var msg = '...';
logWrapper.debug(msg);
```
<a name="LogWrapper+trace"></a>

### logWrapper.trace(msg)
Log the options with TRACE level (if logger supports it, else with DEBUG).

**Kind**: instance method of <code>[LogWrapper](#LogWrapper)</code>  
**Access:** public  
**See**: [#debug](#debug)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The message to log. |

**Example**  
```js
var logger = ...;
var logWrapper = new LogWrapper(logger);
var msg = '...';
logWrapper.trace(msg);
```
<a name="LogWrapper+error"></a>

### logWrapper.error(msg)
Log the options with ERROR level.

**Kind**: instance method of <code>[LogWrapper](#LogWrapper)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The message to log. |

**Example**  
```js
var logger = ...;
var logWrapper = new LogWrapper(logger);
var msg = '...';
logWrapper.error(msg);
```
<a name="LogWrapper+verboseOptions"></a>

### logWrapper.verboseOptions(options) ⇒
Log the options with INFO level.

**Kind**: instance method of <code>[LogWrapper](#LogWrapper)</code>  
**Returns**: A Promise containing the passed `options` object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[Options](#Options)</code> | The properties to log with INFO. |

**Example**  
```js
var logger = ...;
var logWrapper = new LogWrapper(logger);
var options = {
    ...
};
logWrapper.verboseOptions(options)
    .then(function (options) {
        ...
    });
```
<a name="Middleware"></a>

## Middleware
Class which defines middleware Promises usable in or with this module.

**Kind**: global class  

* [Middleware](#Middleware)
    * [new Middleware()](#new_Middleware_new)
    * [.identityMiddleware](#Middleware+identityMiddleware) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.ensureMiddleware(middleware)](#Middleware+ensureMiddleware) ⇒ <code>Promise</code>

<a name="new_Middleware_new"></a>

### new Middleware()
Constructs the `Middleware`.

**Returns**: <code>[Middleware](#Middleware)</code> - - The instance.  
**Example**  
```js
var middleware = require('./lib/middleware.js');
```
<a name="Middleware+identityMiddleware"></a>

### middleware.identityMiddleware ⇒ <code>Promise.&lt;object&gt;</code>
Middleware Promise which reflects the identity of passed JSON: `f(object) → object`.

**Kind**: instance property of <code>[Middleware](#Middleware)</code>  
**Returns**: <code>Promise.&lt;object&gt;</code> - - A Promise resolving the passed `json` object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | The object which is returned in Promise. |

**Example**  
```js
var middleware = require('./lib/middleware.js');
var identityMiddleware = middleware.identityMiddleware;
transformer.transform(options, identityMiddleware)
    .then(function(object) {
        ...
    }):
```
<a name="Middleware+ensureMiddleware"></a>

### middleware.ensureMiddleware(middleware) ⇒ <code>Promise</code>
Ensure that the given middleware Promise is a function if set.
If not set a new JSON 'identity' Promise is returned which simply passes
a JSON object.

**Kind**: instance method of <code>[Middleware](#Middleware)</code>  
**Returns**: <code>Promise</code> - - The given middleware Promise or a new JSON 'identity' middleware Promise.  
**Throws**:

- <code>TypeError</code> - Will throw this error when the passed `middleware`
        is not type of `Function`.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| middleware | <code>function</code> | This middleware Promise can be used to intercept        the JSON object for altering he passed JSON, the function signature is:        ```        function(object)        ```        **NOTE:** the Promise has to return the processed JSON! |

**Example**  
```js
var middleware = require('./lib/middleware.js');
var myMiddleware = function(object) {
    //...
};
transformer.transform(options, middleware.ensureMiddleware(myMiddleware))
    .then(function(object) {
        //...
    }):
```
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
    * [.assertOptions](#OptionsHandler+assertOptions) ⇒ <code>Promise</code>
    * [.completeOptions(options)](#OptionsHandler+completeOptions) ⇒ <code>Promise</code>
    * [.ensureSrc(options)](#OptionsHandler+ensureSrc) ⇒ <code>Promise</code>
    * [.ensureDest(options)](#OptionsHandler+ensureDest) ⇒ <code>Promise</code>
    * [.assertOrigin(options)](#OptionsHandler+assertOrigin) ⇒ <code>Promise</code>
    * [.assertTarget(options)](#OptionsHandler+assertTarget) ⇒ <code>Promise</code>
    * [.ensureIndent(options)](#OptionsHandler+ensureIndent) ⇒ <code>Promise</code>
    * [.ensureOptions(options)](#OptionsHandler+ensureOptions) ⇒ <code>Promise</code>
    * [.validateTransformation(options)](#OptionsHandler+validateTransformation) ⇒ <code>Promise</code>

<a name="new_OptionsHandler_new"></a>

### new OptionsHandler([logger])
Constructs the `OptionsHandler` with an (optional) logger.

**Returns**: <code>[OptionsHandler](#OptionsHandler)</code> - The instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [logger] | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | <code>console</code> | Logger instance. |

**Example**  
```js
var OptionsHandler = require('./options-handler');
var logger = ...;

var optionsHandler = new OptionsHandler(logger);
```
<a name="OptionsHandler+assertOptions"></a>

### optionsHandler.assertOptions ⇒ <code>Promise</code>
Asserts that the given `options` and (optionally) the given properties are
inside the options. If not, the Promise rejects with proper error message.

**Kind**: instance property of <code>[OptionsHandler](#OptionsHandler)</code>  
**Returns**: <code>Promise</code> - - Promise which contains the `options` as result.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The objects which should be set. |
| [properties] | <code>Array.&lt;string&gt;</code> | Properties which should exist in `options`. |

**Example**  
```js
var options = {...};

assertOptions(options, ['src', 'origin'])
    .then(function (assertedOptions) {
        ...
    });
```
<a name="OptionsHandler+completeOptions"></a>

### optionsHandler.completeOptions(options) ⇒ <code>Promise</code>
Completes the given `options` object by enriching from default values or using
type inference if something required is "missing" (a missing `options.src` cannot
be completed becaue this is mandatory).

**Kind**: instance method of <code>[OptionsHandler](#OptionsHandler)</code>  
**Returns**: <code>Promise</code> - - A Promise containing the passed `options` object.  
**Throws**:

- <code>Error</code> - If `options` or `options.src` not passed.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[Options](#Options)</code> | The configuration for a transformation. |

**Example**  
```js
var OptionsHandler = require('./options-handler.js');
var logger = ...;
var options = {...};
var optionsHandler = new OptionsHandler(logger);

optionsHandler.completeOptions(options)
    .then(function (copiedOptions) {
        ...
    });
```
<a name="OptionsHandler+ensureSrc"></a>

### optionsHandler.ensureSrc(options) ⇒ <code>Promise</code>
Ensures that the given input source is valid.

**Kind**: instance method of <code>[OptionsHandler](#OptionsHandler)</code>  
**Returns**: <code>Promise</code> - - A Promise containing the passed `options` object.  
**Throws**:

- <code>Error</code> - If the `options.src` is not defined or the file represented by `options.src` does not exist.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[Options](#Options)</code> | The configuration for a transformation. |

**Example**  
```js
var OptionsHandler = require('./options-handler.js');
var logger = ...;
var options = {...};
var optionsHandler = new OptionsHandler(logger);

optionsHandler.ensureSrc(options)
    .then(function (ensuredOptions) {
        ...
    });
```
<a name="OptionsHandler+ensureDest"></a>

### optionsHandler.ensureDest(options) ⇒ <code>Promise</code>
This method ensures that destination file path is created if not set in
options. If not, then it creates the path relative to the source file using
its name and appending a proper extension depending on the `json`
property of `options` (if `true` then '.js', else '.json').

**Kind**: instance method of <code>[OptionsHandler](#OptionsHandler)</code>  
**Returns**: <code>Promise</code> - - A Promise containing the passed `options` object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[Options](#Options)</code> | The configuration for a transformation. |

**Example**  
```js
var OptionsHandler = require('./options-handler.js');
var logger = ...;
var options = {...};
var optionsHandler = new OptionsHandler(logger);

optionsHandler.ensureDest(options)
    .then(function (ensuredOptions) {
        ...
    });
```
<a name="OptionsHandler+assertOrigin"></a>

### optionsHandler.assertOrigin(options) ⇒ <code>Promise</code>
Checks if the given origin is valid.

**Kind**: instance method of <code>[OptionsHandler](#OptionsHandler)</code>  
**Returns**: <code>Promise</code> - - A Promise containing the passed `options` object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[Options](#Options)</code> | The configuration for a transformation. |

**Example**  
```js
var OptionsHandler = require('./options-handler.js');
var logger = ...;
var options = {...};
var optionsHandler = new OptionsHandler(logger);

optionsHandler.assertOrigin(options)
    .then(function (ensuredOptions) {
        ...
    });
```
<a name="OptionsHandler+assertTarget"></a>

### optionsHandler.assertTarget(options) ⇒ <code>Promise</code>
Checks if the given target is valid.

**Kind**: instance method of <code>[OptionsHandler](#OptionsHandler)</code>  
**Returns**: <code>Promise</code> - - A Promise containing the passed `options` object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[Options](#Options)</code> | The configuration for a transformation. |

**Example**  
```js
var OptionsHandler = require('./options-handler.js');
var logger = ...;
var options = {...};
var optionsHandler = new OptionsHandler(logger);

optionsHandler.assertTarget(options)
    .then(function (ensuredOptions) {
        ...
    });
```
<a name="OptionsHandler+ensureIndent"></a>

### optionsHandler.ensureIndent(options) ⇒ <code>Promise</code>
Checks if a valid indention value is given and corrects values if invalid (with default value: 4 SPACEs).

**Kind**: instance method of <code>[OptionsHandler](#OptionsHandler)</code>  
**Returns**: <code>Promise</code> - - A Promise containing the passed `options` object.  
**Access:** public  
**See**

- [MIN_INDENT](#Constants+MIN_INDENT)
- [DEFAULT_INDENT](#Constants+DEFAULT_INDENT)
- [MAX_INDENT](#Constants+MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| options | <code>[Options](#Options)</code> | The configuration for a transformation. |

**Example**  
```js
var OptionsHandler = require('./options-handler.js');
var logger = ...;
var options = {...};
var optionsHandler = new OptionsHandler(logger);

optionsHandler.ensureIndent(options)
    .then(function (ensuredOptions) {
        ...
    });
```
<a name="OptionsHandler+ensureOptions"></a>

### optionsHandler.ensureOptions(options) ⇒ <code>Promise</code>
This method ensures that the options object is set with all necessary and
correct values. The method does not alter the given object, but creates
and fills a new instance from the given values and/or default ones.

**Kind**: instance method of <code>[OptionsHandler](#OptionsHandler)</code>  
**Returns**: <code>Promise</code> - - A Promise containing a new and complete `options` object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[Options](#Options)</code> | The configuration for a transformation. |

**Example**  
```js
var OptionsHandler = require('./options-handler.js');
var logger = ...;
var options = {...};
var optionsHandler = new OptionsHandler(logger);

optionsHandler.ensureOptions(options)
    .then(function (ensuredOptions) {
        ...
    });
```
<a name="OptionsHandler+validateTransformation"></a>

### optionsHandler.validateTransformation(options) ⇒ <code>Promise</code>
This method validates the transformation process described by the given
options and provides the validate and enriched options and according name
to resolve a proper function.

**Kind**: instance method of <code>[OptionsHandler](#OptionsHandler)</code>  
**Returns**: <code>Promise</code> - - A Promise containing the passed `options` object and a 'transformation' string in an array.  
**Access:** public  
**See**: [transformations](transformations)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[Options](#Options)</code> | The configuration for a transformation. |

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
<a name="Reader"></a>

## Reader
This class provides utility methods usable to read YAML, JSON or JS
       from a source (file, {object} or [stream.Readable](stream.Readable)) to JS memory objects.

**Kind**: global class  

* [Reader](#Reader)
    * [new Reader([logger])](#new_Reader_new)
    * [.validator](#Reader+validator) : <code>[Validator](#Validator)</code>
    * [.readJs(options)](#Reader+readJs) ⇒ <code>Promise</code>
    * [.readYaml(options)](#Reader+readYaml) ⇒ <code>Promise</code>

<a name="new_Reader_new"></a>

### new Reader([logger])
Constructs the `Reader` with an (optional) logger.

**Returns**: <code>[Reader](#Reader)</code> - The instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [logger] | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | <code>console</code> | Logger instance. |

**Example**  
```js
var Reader = require('jy-transform').Reader;
var logger = ...;

var reader = new Reader(logger);
```
<a name="Reader+validator"></a>

### reader.validator : <code>[Validator](#Validator)</code>
The validator.

**Kind**: instance property of <code>[Reader](#Reader)</code>  
<a name="Reader+readJs"></a>

### reader.readJs(options) ⇒ <code>Promise</code>
Reads the data from a given JS or JSON source.

**Kind**: instance method of <code>[Reader](#Reader)</code>  
**Returns**: <code>Promise</code> - - Contains the read JS object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[Options](#Options)</code> | Contains the JS/JSON source reference to read from. |

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
<a name="Reader+readYaml"></a>

### reader.readYaml(options) ⇒ <code>Promise</code>
Loads a single YAML source containing document and returns a JS object.

*NOTE:* This function does not understand multi-document sources, it throws
exception on those.

**Kind**: instance method of <code>[Reader](#Reader)</code>  
**Returns**: <code>Promise</code> - - Contains the read JS object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[Options](#Options)</code> | Contains the YAML source reference to read from. |

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

<a name="new_Transformer_new"></a>

### new Transformer([logger])
Constructs the `Transformer` with options and an (optional) logger.

**Returns**: <code>[Transformer](#Transformer)</code> - - The instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [logger] | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | <code>console</code> | Logger instance. |

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
| options | <code>[Options](#Options)</code> | The configuration for a transformation. |
| [middleware] | <code>function</code> | This middleware Promise can be used to intercept        the JSON object for altering the passed JSON, the function signature is:        ```        function(json)        ```        **NOTE:** the Promise has to return the processed JSON! |

**Example**  
```js
var logger = ...;
var Transformer = require('jy-transform');
var transformer = new Transformer(logger);
var Promise = require('bluebird');
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
<a name="Validator"></a>

## Validator
This class validates JS identifier.
       <p>
       **NOTE:** this class is intended for internal use only!

**Kind**: global class  

* [Validator](#Validator)
    * [new Validator([logger])](#new_Validator_new)
    * [.validateIdentifier(identifier)](#Validator+validateIdentifier) ⇒ <code>boolean</code>

<a name="new_Validator_new"></a>

### new Validator([logger])
Constructs the `Validator` with an (optional) logger.

**Returns**: <code>[Writer](#Writer)</code> - The instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [logger] | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | <code>console</code> | Logger instance. |

**Example**  
```js
var Validator = require('./validator.js');
var logger = ...;

var validator = new Validator(logger);
```
<a name="Validator+validateIdentifier"></a>

### validator.validateIdentifier(identifier) ⇒ <code>boolean</code>
This method checks if a given `identifier` is a valid ECMAScript 6 identifier.

**Kind**: instance method of <code>[Validator](#Validator)</code>  
**Returns**: <code>boolean</code> - - `true` if valid, else `false`.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | The identifier to check. |

**Example**  
```js
var Validator = require('./validator.js');
var logger = ...;
var validator = new Validator(logger);
var identifier = 'foo';

logger.info('valid = ' + validator.validateIdentifier(identifier));
```
<a name="Writer"></a>

## Writer
This class provides utility methods usable to write JS objects
       from memory to a JSON/JS/YAML destination
       (file, object or [stream.Readable](stream.Readable)).

**Kind**: global class  

* [Writer](#Writer)
    * [new Writer([logger])](#new_Writer_new)
    * [.validator](#Writer+validator) : <code>[Validator](#Validator)</code>
    * [.writeYaml(object, options)](#Writer+writeYaml) ⇒ <code>Promise</code>
    * [.writeJson(object, options)](#Writer+writeJson) ⇒ <code>Promise</code>
    * [.writeJs(object, options)](#Writer+writeJs) ⇒ <code>Promise</code>

<a name="new_Writer_new"></a>

### new Writer([logger])
Constructs the `Writer` with an (optional) logger.

**Returns**: <code>[Writer](#Writer)</code> - The instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [logger] | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | <code>console</code> | Logger instance. |

**Example**  
```js
var Writer = require('jy-transform').Writer;
var logger = ...;

var writer = new Writer(logger);
```
<a name="Writer+validator"></a>

### writer.validator : <code>[Validator](#Validator)</code>
The validator.

**Kind**: instance property of <code>[Writer](#Writer)</code>  
<a name="Writer+writeYaml"></a>

### writer.writeYaml(object, options) ⇒ <code>Promise</code>
Writes a JS object to a YAML destination.

**Kind**: instance method of <code>[Writer](#Writer)</code>  
**Returns**: <code>Promise</code> - - Containing the write success message to handle by caller (e.g. for logging).  
**Throws**:

- <code>Error</code> - If YAML destination could not be written due to any reason.

**Access:** public  
**See**

- [MIN_INDENT](#Constants+MIN_INDENT)
- [DEFAULT_INDENT](#Constants+DEFAULT_INDENT)
- [MAX_INDENT](#Constants+MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | The JS object to write into YAML destination. |
| options | <code>[Options](#Options)</code> | The write destination and indention. |

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
<a name="Writer+writeJson"></a>

### writer.writeJson(object, options) ⇒ <code>Promise</code>
Writes a JS object to a JSON destination.

**Kind**: instance method of <code>[Writer](#Writer)</code>  
**Returns**: <code>Promise</code> - - Containing the write success message to handle by caller (e.g. for logging).  
**Access:** public  
**See**

- [MIN_INDENT](#Constants+MIN_INDENT)
- [DEFAULT_INDENT](#Constants+DEFAULT_INDENT)
- [MAX_INDENT](#Constants+MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | The JS object to write into JSON destination. |
| options | <code>[Options](#Options)</code> | The write destination and indention. |

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
<a name="Writer+writeJs"></a>

### writer.writeJs(object, options) ⇒ <code>Promise</code>
Writes a JS object to a JS destination. The object is prefixed by `module.exports = `.

**Kind**: instance method of <code>[Writer](#Writer)</code>  
**Returns**: <code>Promise</code> - - Containing the write success message to handle by caller (e.g. for logging).  
**Access:** public  
**See**

- [MIN_INDENT](#Constants+MIN_INDENT)
- [DEFAULT_INDENT](#Constants+DEFAULT_INDENT)
- [MAX_INDENT](#Constants+MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | The JSON to write into JS destination. |
| options | <code>[Options](#Options)</code> | The write destination and indention. |

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
<a name="Options"></a>

## Options : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| origin | <code>string</code> | <code>&quot;yaml&quot;</code> | The origin type. |
| target | <code>string</code> | <code>&quot;js&quot;</code> | The target type. |
| src | <code>string</code> &#124; <code>Readable</code> &#124; <code>object</code> |  | The source (`string` type is treated as a file path). |
| dest | <code>string</code> &#124; <code>Writable</code> &#124; <code>object</code> |  | The destination (`string` type is treated as a file path). |
| indent | <code>number</code> | <code>4</code> | The indention in files. |
| imports | <code>string</code> |  | The exports name for reading from JS source file or objects only. |
| exports | <code>string</code> |  | The exports name for usage in JS destination files only. |

