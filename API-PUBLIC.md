<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## TOC

- [Modules](#modules)
- [Members](#members)
- [jy-transform:constants](#jy-transformconstants)
- [jy-transform:reader](#jy-transformreader)
- [jy-transform:transformer](#jy-transformtransformer)
- [jy-transform:type-definitions](#jy-transformtype-definitions)
- [jy-transform:writer](#jy-transformwriter)
- [read ⇒ <code>Promise.&lt;string&gt;</code>](#read-%E2%87%92-codepromiseltstringgtcode)
- [write ⇒ <code>Promise.&lt;string&gt;</code>](#write-%E2%87%92-codepromiseltstringgtcode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
<dt><a href="#module_jy-transform_type-definitions">jy-transform:type-definitions</a></dt>
<dd><p>The type definitions for this module.</p>
</dd>
<dt><a href="#module_jy-transform_writer">jy-transform:writer</a></dt>
<dd><p>This module provides the <em>write</em> functionality to write JS objects from memory to a JSON/JS/YAML
destination (file, object or <a href="stream.Readable">stream.Readable</a>).</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#read">read</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>TODO: doc me.</p>
</dd>
<dt><a href="#write">write</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>TODO: doc me.</p>
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
<a name="module_jy-transform_reader"></a>

## jy-transform:reader
This module provides the _read_ functionality for YAML, JS or JSON sources.

**Access:** public  
<a name="module_jy-transform_transformer"></a>

## jy-transform:transformer
This module provides the _transform_ functionality for YAML, JS or JSON source to destination mapping.

**Access:** public  
<a name="module_jy-transform_transformer..transform"></a>

### jy-transform:transformer~transform ⇒ <code>Promise.&lt;String&gt;</code>
The entry method for all transformation accepting a configuration object and
an (optional) middleware function. It executes the transformation logic:
1. Input (read)
2. Transform [ + Middleware]
3. Output (write).

**Kind**: inner property of <code>[jy-transform:transformer](#module_jy-transform_transformer)</code>  
**Returns**: <code>Promise.&lt;String&gt;</code> - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> Will throw this error when the passed `middleware` is not type of `Function`.
- <code>Error</code> Will throw plain error when writing to file failed due to any reason.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>module:type-definitions~TransformerOptions</code> | The configuration for a transformation. |
| [middleware] | <code>function</code> | This middleware Promise can be used to intercept        the JSON object for altering the passed JSON, the function signature is:        ```        function(object)        ```        <p>        **NOTE:** the Promise has to return the processed JSON. |

**Example**  
```js
import { transform } from 'jy-transform';
const options = {...};
const middleware = async (object) {
  object.myproperty = 'new value';
  return object;
};

// ---- Promise style:

transform(options, middleware)
  .then(console.log)
  .catch(console.error);

// ---- async/await style:
try {
  const msg = await transform(options, middleware);
  console.log(msg);
} catch (err) {
  console.error(err.stack);
};
```
<a name="module_jy-transform_type-definitions"></a>

## jy-transform:type-definitions
The type definitions for this module.

**Access:** public  

* [jy-transform:type-definitions](#module_jy-transform_type-definitions)
    * [~ReaderOptions](#module_jy-transform_type-definitions..ReaderOptions) : <code>object</code>
    * [~WriterOptions](#module_jy-transform_type-definitions..WriterOptions) : <code>object</code>
    * [~TransformerOptions](#module_jy-transform_type-definitions..TransformerOptions) : <code>object</code>
    * [~TEESTTransformerOptions](#module_jy-transform_type-definitions..TEESTTransformerOptions) : <code>object</code>
    * [~TEESTT2ransformerOptions](#module_jy-transform_type-definitions..TEESTT2ransformerOptions) : <code>WriterOptions</code> &#124; <code>ReaderOptions</code>

<a name="module_jy-transform_type-definitions..ReaderOptions"></a>

### jy-transform:type-definitions~ReaderOptions : <code>object</code>
The configuration properties provided to the reader function.

**Kind**: inner typedef of <code>[jy-transform:type-definitions](#module_jy-transform_type-definitions)</code>  
**Access:** public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> &#124; <code>Stream.Readable</code> &#124; <code>object</code> |  | The source (if `string` type is treated as a file path). |
| origin | <code>string</code> | <code>&quot;yaml&quot;</code> | The origin type. |
| imports | <code>string</code> |  | The exports name for reading from JS source files or objects only. |

<a name="module_jy-transform_type-definitions..WriterOptions"></a>

### jy-transform:type-definitions~WriterOptions : <code>object</code>
The writer configuration properties provided to the writer function.

**Kind**: inner typedef of <code>[jy-transform:type-definitions](#module_jy-transform_type-definitions)</code>  
**Access:** public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dest | <code>string</code> &#124; <code>Stream.Writable</code> &#124; <code>object</code> |  | The destination (if `string` type is treated as a file path). |
| target | <code>string</code> | <code>&quot;js&quot;</code> | The target type. |
| indent | <code>number</code> | <code>2</code> | The indention in files. |
| exports | <code>string</code> |  | The exports name for usage in JS destination files only. |
| force | <code>string</code> | <code>false</code> | Force overwriting of existing output files on write phase. |

<a name="module_jy-transform_type-definitions..TransformerOptions"></a>

### jy-transform:type-definitions~TransformerOptions : <code>object</code>
The configuration properties provided to the transformer function.

**Kind**: inner typedef of <code>[jy-transform:type-definitions](#module_jy-transform_type-definitions)</code>  
**Access:** public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> &#124; <code>Stream.Readable</code> &#124; <code>object</code> |  | The source (if `string` type is treated as a file path). |
| origin | <code>string</code> | <code>&quot;yaml&quot;</code> | The origin type. |
| imports | <code>string</code> |  | The exports name for reading from JS source files                                                      or objects only. |
| dest | <code>string</code> &#124; <code>Stream.Writable</code> &#124; <code>object</code> |  | The destination (if `string` type is treated as a file path). |
| target | <code>string</code> | <code>&quot;js&quot;</code> | The target type. |
| exports | <code>string</code> |  | The exports name for usage in JS destination files only. |
| indent | <code>number</code> | <code>2</code> | The indention in files. |
| force | <code>string</code> | <code>false</code> | Force overwriting of existing output files on write phase. |

<a name="module_jy-transform_type-definitions..TEESTTransformerOptions"></a>

### jy-transform:type-definitions~TEESTTransformerOptions : <code>object</code>
The configuration properties provided to the transformer function.

**Kind**: inner typedef of <code>[jy-transform:type-definitions](#module_jy-transform_type-definitions)</code>  
**Access:** public  
<a name="module_jy-transform_type-definitions..TEESTT2ransformerOptions"></a>

### jy-transform:type-definitions~TEESTT2ransformerOptions : <code>WriterOptions</code> &#124; <code>ReaderOptions</code>
The configuration properties provided to the transformer function.

**Kind**: inner typedef of <code>[jy-transform:type-definitions](#module_jy-transform_type-definitions)</code>  
**Access:** public  
<a name="module_jy-transform_writer"></a>

## jy-transform:writer
This module provides the _write_ functionality to write JS objects from memory to a JSON/JS/YAML
destination (file, object or [stream.Readable](stream.Readable)).

**Access:** public  
<a name="read"></a>

## read ⇒ <code>Promise.&lt;string&gt;</code>
TODO: doc me.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;string&gt;</code> - Resolves with read success message.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>module:type-definitions~ReaderOptions</code> | The read options. |

<a name="write"></a>

## write ⇒ <code>Promise.&lt;string&gt;</code>
TODO: doc me.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;string&gt;</code> - Resolves with write success message.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The source object to write. |
| options | <code>module:type-definitions~WriterOptions</code> | The write options. |

