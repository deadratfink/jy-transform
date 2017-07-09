<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## TOC

- [Modules](#modules)
- [Members](#members)
- [Typedefs](#typedefs)
- [jy-transform:constants](#jy-transformconstants)
- [read ⇒ <code>Promise</code>](#read-%E2%87%92-codepromisecode)
- [transform ⇒ <code>Promise</code>](#transform-%E2%87%92-codepromisecode)
- [write ⇒ <code>Promise</code>](#write-%E2%87%92-codepromisecode)
- [ReaderOptions : <code>object</code>](#readeroptions--codeobjectcode)
- [WriterOptions : <code>object</code>](#writeroptions--codeobjectcode)
- [TransformerOptions : <code>object</code>](#transformeroptions--codeobjectcode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Modules

<dl>
<dt><a href="#module_jy-transform_constants">jy-transform:constants</a></dt>
<dd><p>Useful constants used for the module and its usage.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#read">read</a> ⇒ <code>Promise</code></dt>
<dd><p>Reads a particular content type from a source provided in the passed <code>options</code>.</p>
</dd>
<dt><a href="#transform">transform</a> ⇒ <code>Promise</code></dt>
<dd><p>The entry method for all transformation accepting a configuration object and
an (optional) middleware function. It executes the transformation logic.</p>
<ol>
<li>Input (read)</li>
<li>Transform [ + Middleware]</li>
<li>Output (write).</li>
</ol>
</dd>
<dt><a href="#write">write</a> ⇒ <code>Promise</code></dt>
<dd><p>Writes the passe JS object to a particular destination described by the passed <code>options</code>.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ReaderOptions">ReaderOptions</a> : <code>object</code></dt>
<dd><p>The configuration properties provided to the <code>read</code> function.</p>
</dd>
<dt><a href="#WriterOptions">WriterOptions</a> : <code>object</code></dt>
<dd><p>The writer configuration properties provided to the <code>write</code> function.</p>
</dd>
<dt><a href="#TransformerOptions">TransformerOptions</a> : <code>object</code></dt>
<dd><p>The configuration properties provided to the <code>transform</code> function.</p>
</dd>
</dl>

<a name="module_jy-transform_constants"></a>

## jy-transform:constants
Useful constants used for the module and its usage.

**Access**: public  

* [jy-transform:constants](#module_jy-transform_constants)
    * [~TYPE_YAML](#module_jy-transform_constants..TYPE_YAML) : <code>string</code>
    * [~TYPE_JSON](#module_jy-transform_constants..TYPE_JSON) : <code>string</code>
    * [~TYPE_JS](#module_jy-transform_constants..TYPE_JS) : <code>string</code>

<a name="module_jy-transform_constants..TYPE_YAML"></a>

### jy-transform:constants~TYPE_YAML : <code>string</code>
The `'yaml'` type constant.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: public  
<a name="module_jy-transform_constants..TYPE_JSON"></a>

### jy-transform:constants~TYPE_JSON : <code>string</code>
The `'json'` type constant.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: public  
<a name="module_jy-transform_constants..TYPE_JS"></a>

### jy-transform:constants~TYPE_JS : <code>string</code>
The `'js'` type constant.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: public  
<a name="read"></a>

## read ⇒ <code>Promise</code>
Reads a particular content type from a source provided in the passed `options`.

**Kind**: global variable  
**Returns**: <code>Promise</code> - The result.  
**Access**: public  
**Resolve**: <code>string</code> Resolves with JS object result.  
**Reject**: <code>ValidationError</code> If any `options` validation occurs.  
**Reject**: <code>Error</code> If any write error occurs.  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>ReaderOptions</code>](#ReaderOptions) | The read options. |

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

## transform ⇒ <code>Promise</code>
The entry method for all transformation accepting a configuration object and
an (optional) middleware function. It executes the transformation logic.

1. Input (read)
2. Transform [ + Middleware]
3. Output (write).

**Kind**: global variable  
**Returns**: <code>Promise</code> - The result.  
**Access**: public  
**Resolve**: <code>string</code> With the transformation result as message (e.g. to be logged by caller).  
**Reject**: <code>TypeError</code> Will throw this error when the passed `middleware` is not type of `Function`.  
**Reject**: <code>ValidationError</code> If any `options` validation occurs.  
**Reject**: <code>Error</code> Will throw any error if read, transform or write operation failed due to any reason.  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>TransformerOptions</code>](#TransformerOptions) | The configuration for a transformation. |
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

## write ⇒ <code>Promise</code>
Writes the passe JS object to a particular destination described by the passed `options`.

**Kind**: global variable  
**Returns**: <code>Promise</code> - The result.  
**Access**: public  
**Resolve**: <code>string</code> With the write success message.  
**Reject**: <code>Error</code> If any write error occurs.  
**Reject**: <code>ValidationError</code> If any `options` validation occurs.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JS source object to write. |
| options | [<code>WriterOptions</code>](#WriterOptions) | The write options. |

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
<a name="ReaderOptions"></a>

## ReaderOptions : <code>object</code>
The configuration properties provided to the `read` function.

**Kind**: global typedef  
**Access**: public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> \| <code>Stream.Readable</code> \| <code>object</code> |  | The source (if `string` type is treated as a file path). |
| origin | <code>string</code> | <code>&quot;yaml&quot;</code> | The origin type. |
| imports | <code>string</code> |  | The exports name for reading from JS source files or objects only. |

<a name="WriterOptions"></a>

## WriterOptions : <code>object</code>
The writer configuration properties provided to the `write` function.

**Kind**: global typedef  
**Access**: public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dest | <code>string</code> \| <code>Stream.Writable</code> \| <code>object</code> |  | The destination (if `string` type is treated as a file path). |
| target | <code>string</code> | <code>&quot;js&quot;</code> | The target type. |
| indent | <code>number</code> | <code>2</code> | The indention value for pretty-print of output. |
| exports | <code>string</code> |  | The exports name for usage in JS destination files only. |
| force | <code>string</code> | <code>false</code> | Force overwriting of existing output files on write phase. |

<a name="TransformerOptions"></a>

## TransformerOptions : <code>object</code>
The configuration properties provided to the `transform` function.

**Kind**: global typedef  
**Access**: public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> \| <code>Stream.Readable</code> \| <code>object</code> |  | The source (if `string` type is treated as a file path). |
| origin | <code>string</code> | <code>&quot;yaml&quot;</code> | The origin type. |
| imports | <code>string</code> |  | The exports name for reading from JS source files                                                      or objects only. |
| dest | <code>string</code> \| <code>Stream.Writable</code> \| <code>object</code> |  | The destination (if `string` type is treated as a file path). |
| target | <code>string</code> | <code>&quot;js&quot;</code> | The target type. |
| indent | <code>number</code> | <code>2</code> | The indention value for pretty-print of output. |
| exports | <code>string</code> |  | The exports name for usage in JS destination files only. |
| force | <code>string</code> | <code>false</code> | Force overwriting of existing output files on write phase. |

