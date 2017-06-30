<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## TOC

- [Modules](#modules)
- [Members](#members)
- [jy-transform:reader](#jy-transformreader)
- [jy-transform:transformer](#jy-transformtransformer)
- [jy-transform:type-definitions](#jy-transformtype-definitions)
- [jy-transform:writer](#jy-transformwriter)
- [read ⇒ <code>Promise.&lt;string&gt;</code>](#read-%E2%87%92-codepromiseltstringgtcode)
- [transform ⇒ <code>Promise.&lt;String&gt;</code>](#transform-%E2%87%92-codepromiseltstringgtcode)
- [write ⇒ <code>Promise.&lt;string&gt;</code>](#write-%E2%87%92-codepromiseltstringgtcode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Modules

<dl>
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
<dd><p>Reads a particular content type from a source provided in the passed <code>options</code>.</p>
</dd>
<dt><a href="#transform">transform</a> ⇒ <code>Promise.&lt;String&gt;</code></dt>
<dd><p>The entry method for all transformation accepting a configuration object and
an (optional) middleware function. It executes the transformation logic:</p>
<ol>
<li>Input (read)</li>
<li>Transform [ + Middleware]</li>
<li>Output (write).</li>
</ol>
</dd>
<dt><a href="#write">write</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Writes the passe JS object to a particular destination described by the passed <code>options</code>.</p>
</dd>
</dl>

<a name="module_jy-transform_reader"></a>

## jy-transform:reader
This module provides the _read_ functionality for YAML, JS or JSON sources.

**Access:** public  
<a name="module_jy-transform_transformer"></a>

## jy-transform:transformer
This module provides the _transform_ functionality for YAML, JS or JSON source to destination mapping.

**Access:** public  
<a name="module_jy-transform_type-definitions"></a>

## jy-transform:type-definitions
The type definitions for this module.

**Access:** public  

* [jy-transform:type-definitions](#module_jy-transform_type-definitions)
    * [~ReaderOptions](#module_jy-transform_type-definitions..ReaderOptions) : <code>object</code>
    * [~WriterOptions](#module_jy-transform_type-definitions..WriterOptions) : <code>object</code>
    * [~TransformerOptions](#module_jy-transform_type-definitions..TransformerOptions) : <code>object</code>

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

<a name="module_jy-transform_writer"></a>

## jy-transform:writer
This module provides the _write_ functionality to write JS objects from memory to a JSON/JS/YAML
destination (file, object or [stream.Readable](stream.Readable)).

**Access:** public  
<a name="read"></a>

## read ⇒ <code>Promise.&lt;string&gt;</code>
Reads a particular content type from a source provided in the passed `options`.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;string&gt;</code> - Resolves with JS object result.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[ReaderOptions](#module_jy-transform_type-definitions..ReaderOptions)</code> | The read options. |

**Example**  
```js
import { read } from 'jy-transform';


// --- from file path

options = {
  src: 'foo.yml'
};

read(options)
  .then(obj => console.log(JSON.stringify(obj)))
  .catch(console.error);


// --- from Readable

options = {
  src: fs.createReadStream('foo.yml')
};

read(options)
  .then(obj => console.log(JSON.stringify(obj)))
  .catch(console.error);
```
<a name="transform"></a>

## transform ⇒ <code>Promise.&lt;String&gt;</code>
The entry method for all transformation accepting a configuration object and
an (optional) middleware function. It executes the transformation logic:
1. Input (read)
2. Transform [ + Middleware]
3. Output (write).

**Kind**: global variable  
**Returns**: <code>Promise.&lt;String&gt;</code> - Containing the transformation result as message (e.g. to be logged by caller).  
**Throws**:

- <code>TypeError</code> Will throw this error when the passed `middleware` is not type of `Function`.
- <code>Error</code> Will throw plain error when writing to _destination object_ failed due to any reason.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[TransformerOptions](#module_jy-transform_type-definitions..TransformerOptions)</code> | The configuration for a transformation. |
| [middleware] | <code>function</code> | This middleware Promise can be used to        intercept the JSON object for altering the passed JSON, the function signature is:        ```        async function(object)        ```        <p>        **NOTE:** the Promise has to return the processed JS object. |

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
<a name="write"></a>

## write ⇒ <code>Promise.&lt;string&gt;</code>
Writes the passe JS object to a particular destination described by the passed `options`.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;string&gt;</code> - Resolves with write success message.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JS source object to write. |
| options | <code>[WriterOptions](#module_jy-transform_type-definitions..WriterOptions)</code> | The write options. |

**Example**  
```js
import { write } from 'jy-transform';


// ---- write obj to file ---

const obj = {...};
const options = {
  dest: 'result.js',
  indent: 4
}

write(obj, options)
  .then(console.log)
  .catch(console.error);


// ---- write obj to Writable ---

options = {
  dest: fs.createWriteStream('result.json'),
  indent: 4
}

write(obj, options)
  .then(console.log)
  .catch(console.error);


// ---- write obj to object ---

options = {
  dest: {},
  indent: 4
}

write(obj, options)
  .then(console.log)
  .catch(console.error);
```
