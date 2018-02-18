<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## TOC

- [Modules](#modules)
- [Typedefs](#typedefs)
- [jy-transform](#jy-transform)
- [ReadOptions : <code>object</code>](#readoptions--codeobjectcode)
- [WriteOptions : <code>object</code>](#writeoptions--codeobjectcode)
- [TransformOptions : <code>object</code>](#transformoptions--codeobjectcode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Modules

<dl>
<dt><a href="#module_jy-transform">jy-transform</a></dt>
<dd><p>This module provides the <em>public</em> interface for the <em>read</em>, <em>write</em> and <em>transform</em> functionality.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ReadOptions">ReadOptions</a> : <code>object</code></dt>
<dd><p>The configuration properties provided to the <code>read</code> function.</p>
</dd>
<dt><a href="#WriteOptions">WriteOptions</a> : <code>object</code></dt>
<dd><p>The configuration properties provided to the <code>write</code> function.</p>
</dd>
<dt><a href="#TransformOptions">TransformOptions</a> : <code>object</code></dt>
<dd><p>The configuration properties provided to the <code>transform</code> function.</p>
</dd>
</dl>

<a name="module_jy-transform"></a>

## jy-transform
This module provides the _public_ interface for the _read_, _write_ and _transform_ functionality.

**Access**: public  
**Author**: Jens Krefeldt <j.krefeldt@gmail.com>  

* [jy-transform](#module_jy-transform)
    * [~transform](#module_jy-transform..transform) ⇒ <code>Promise</code>
    * [~read](#module_jy-transform..read) ⇒ <code>Promise</code>
    * [~write](#module_jy-transform..write) ⇒ <code>Promise</code>
    * [~TYPE_YAML](#module_jy-transform..TYPE_YAML) : <code>string</code>
    * [~TYPE_JS](#module_jy-transform..TYPE_JS) : <code>string</code>
    * [~TYPE_JSON](#module_jy-transform..TYPE_JSON) : <code>string</code>

<a name="module_jy-transform..transform"></a>

### jy-transform~transform ⇒ <code>Promise</code>
The entry method for all transformations accepting a configuration object and
an (optional) callback function. It executes the transformation logic.

1. Input (read)
2. Transform [ + callback]
3. Output (write).

**Kind**: inner property of [<code>jy-transform</code>](#module_jy-transform)  
**Returns**: <code>Promise</code> - The transformation result.  
**Access**: public  
**Resolve**: <code>string</code> With the transformation result as message (e.g. to be logged by caller).  
**Reject**: <code>ValidationError</code> If any `options` validation occurs.  
**Reject**: <code>Error</code> Will throw any error if read, transform or write operation failed due to any reason.  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>TransformOptions</code>](#TransformOptions) | The configuration for a transformation. |

**Example**  
```js
import { transform } from 'jy-transform';
const options = {
  src: 'foo/bar.yaml',                 // From YAML file...
  transform: async (object) => {       // ...callback with exchanging value...
    object.foo = 'new value';
    return object;
  },
  target: 'foo/bar-transformed.json',  // ...to a new JSON file.
  indent: 4,
};

// ---- Promise style:

transform(options)
  .then(console.log)
  .catch(console.error);


// ---- async/await style:

try {
  const msg = await transform(options);
  console.log(msg);
} catch (err) {
  console.error(err.stack);
};
```
<a name="module_jy-transform..read"></a>

### jy-transform~read ⇒ <code>Promise</code>
Reads a particular content type from a source provided in the passed `options`.

**Kind**: inner property of [<code>jy-transform</code>](#module_jy-transform)  
**Returns**: <code>Promise</code> - The result.  
**Access**: public  
**Resolve**: <code>string</code> Resolves with JS object result.  
**Reject**: <code>ValidationError</code> If any `options` validation occurs.  
**Reject**: <code>Error</code> If any write error occurs.  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>ReadOptions</code>](#ReadOptions) | The read options. |

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
<a name="module_jy-transform..write"></a>

### jy-transform~write ⇒ <code>Promise</code>
Writes the passed JS object to a particular destination described by the passed `options`.

**Kind**: inner property of [<code>jy-transform</code>](#module_jy-transform)  
**Returns**: <code>Promise</code> - The result.  
**Access**: public  
**Resolve**: <code>string</code> With the write success message.  
**Reject**: <code>Error</code> If any write error occurs.  
**Reject**: <code>ValidationError</code> If any `options` validation occurs.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JS source object to write. |
| options | [<code>WriteOptions</code>](#WriteOptions) | The write options. |

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
<a name="module_jy-transform..TYPE_YAML"></a>

### jy-transform~TYPE_YAML : <code>string</code>
The `'yaml'` type constant.

**Kind**: inner constant of [<code>jy-transform</code>](#module_jy-transform)  
**Access**: public  
<a name="module_jy-transform..TYPE_JS"></a>

### jy-transform~TYPE_JS : <code>string</code>
The `'js'` type constant.

**Kind**: inner constant of [<code>jy-transform</code>](#module_jy-transform)  
**Access**: public  
<a name="module_jy-transform..TYPE_JSON"></a>

### jy-transform~TYPE_JSON : <code>string</code>
The `'json'` type constant.

**Kind**: inner constant of [<code>jy-transform</code>](#module_jy-transform)  
**Access**: public  
<a name="ReadOptions"></a>

## ReadOptions : <code>object</code>
The configuration properties provided to the `read` function.

**Kind**: global typedef  
**Access**: public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> \| <code>Stream.Readable</code> \| <code>object</code> |  | The source (if `string` type it is treated as a file path). |
| [origin] | <code>string</code> | <code>&quot;yaml&quot;</code> | The source origin type. |
| [imports] | <code>string</code> |  | The exports name for reading from JS source files or objects only. |

<a name="WriteOptions"></a>

## WriteOptions : <code>object</code>
The configuration properties provided to the `write` function.

**Kind**: global typedef  
**Access**: public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dest | <code>string</code> \| <code>Stream.Writable</code> \| <code>object</code> |  | The destination (if `string` type it is treated as a file path). |
| [target] | <code>string</code> | <code>&quot;js&quot;</code> | The destination target type. |
| [indent] | <code>number</code> | <code>2</code> | The indentation value for pretty-print of output. |
| [exports] | <code>string</code> |  | The exports name for usage in JS destination files only. |
| [force] | <code>string</code> | <code>false</code> | Force overwriting of existing output files on write phase. |
| [no-es6] | <code>boolean</code> | <code>false</code> | Whether not to use ECMAScript6 syntax for JS type output like                                                    `module.exports` instead of `export default`, applicable only                                                    for JS output. |
| [no-single] | <code>boolean</code> | <code>false</code> | Whether _not_ to use single-quotes style for values in JS type                                                    output (i.e. double-quotes). |

<a name="TransformOptions"></a>

## TransformOptions : <code>object</code>
The configuration properties provided to the `transform` function.

**Kind**: global typedef  
**Access**: public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> \| <code>Stream.Readable</code> \| <code>object</code> |  | The _read_ source (if `string` type it is treated as a file                                                      path). |
| [origin] | <code>string</code> | <code>&quot;yaml&quot;</code> | The _read_ source origin type. |
| [imports] | <code>string</code> |  | The _read_ exports name for reading from JS source files or                                                      objects only. |
| [transform] | <code>function</code> |  | The option is a _transformation_ function with the following                                                      signature:                                                      <p><p>                                                      ```                                                      [async|Promise] function(object)                                                      ``` |
| [dest] | <code>string</code> \| <code>Stream.Writable</code> \| <code>object</code> |  | The _write_ destination (if `string` type it is treated as a                                                      file path). This property could be optional in case we infer a                                                      value from `src` which is then either a string or a file stream                                                      where can get the file path from. If this detection process                                                      cannot be fulfilled then the property is `undefined` and the                                                      transform process will fail with a `ValidationError` on write                                                      phase. |
| [target] | <code>string</code> | <code>&quot;js&quot;</code> | The _write_ target type. |
| [indent] | <code>number</code> | <code>2</code> | The _write_ indentation value for pretty-print of output. |
| [exports] | <code>string</code> |  | The _write_ exports name for usage in JS destination files only. |
| [force] | <code>string</code> | <code>false</code> | Force overwriting of existing output files on write phase. |
| [no-es6] | <code>boolean</code> | <code>false</code> | Whether not to use ECMAScript6 syntax for JS type output like                                                     `module.exports` instead of `export default`, applicable only                                                     for JS output. |
| [no-single] | <code>boolean</code> | <code>false</code> | Whether _not_ to use single-quotes style for values in JS type                                                      output (i.e. double-quotes). |

