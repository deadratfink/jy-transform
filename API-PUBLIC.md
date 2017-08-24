<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## TOC

- [Modules](#modules)
- [Typedefs](#typedefs)
- [jy-transform:constants](#jy-transformconstants)
- [ReadOptions : <code>object</code>](#readoptions--codeobjectcode)
- [WriteOptions : <code>object</code>](#writeoptions--codeobjectcode)
- [TransformOptions : <code>object</code>](#transformoptions--codeobjectcode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Modules

<dl>
<dt><a href="#module_jy-transform_constants">jy-transform:constants</a></dt>
<dd><p>Useful constants used for the module and its usage.</p>
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
<a name="ReadOptions"></a>

## ReadOptions : <code>object</code>
The configuration properties provided to the `read` function.

**Kind**: global typedef  
**Access**: public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> \| <code>Stream.Readable</code> \| <code>object</code> |  | The source (if `string` type it is treated as a file path). |
| origin | <code>string</code> | <code>&quot;yaml&quot;</code> | The source origin type. |
| imports | <code>string</code> |  | The exports name for reading from JS source files or objects only. |

<a name="WriteOptions"></a>

## WriteOptions : <code>object</code>
The configuration properties provided to the `write` function.

**Kind**: global typedef  
**Access**: public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dest | <code>string</code> \| <code>Stream.Writable</code> \| <code>object</code> |  | The destination (if `string` type it is treated as a file path). |
| target | <code>string</code> | <code>&quot;js&quot;</code> | The destination target type. |
| indent | <code>number</code> | <code>2</code> | The indentation value for pretty-print of output. |
| exports | <code>string</code> |  | The exports name for usage in JS destination files only. |
| force | <code>string</code> | <code>false</code> | Force overwriting of existing output files on write phase. |
| no-es6 | <code>boolean</code> | <code>false</code> | Whether not to use ECMAScript6 syntax for JS type output like                                                    `module.exports` instead of `export default`, applicable only                                                    for JS output. |
| no-single | <code>boolean</code> | <code>false</code> | Whether _not_ to use single-quotes style for values in JS type                                                    output (i.e. double-quotes). |

<a name="TransformOptions"></a>

## TransformOptions : <code>object</code>
The configuration properties provided to the `transform` function.

**Kind**: global typedef  
**Access**: public  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> \| <code>Stream.Readable</code> \| <code>object</code> |  | The _read_ source (if `string` type it is treated as a file                                                      path). |
| origin | <code>string</code> | <code>&quot;yaml&quot;</code> | The _read_ source origin type. |
| imports | <code>string</code> |  | The _read_ exports name for reading from JS source files or                                                      objects only. |
| transform | <code>function</code> |  | The option is a _transformation_ function with the following                                                      signature:                                                      <p><p>                                                      ```                                                      [async|Promise] function(object)                                                      ``` |
| dest | <code>string</code> \| <code>Stream.Writable</code> \| <code>object</code> |  | The _write_ destination (if `string` type it is treated as a                                                      file path). This property could be optional in case we infer a                                                      value from `src` which is then either a string or a file stream                                                      where can get the file path from. If this detection process                                                      cannot be fulfilled then the property is `undefined` and the                                                      transform process will fail with a `ValidationError` on write                                                      phase. |
| target | <code>string</code> | <code>&quot;js&quot;</code> | The _write_ target type. |
| indent | <code>number</code> | <code>2</code> | The _write_ indentation value for pretty-print of output. |
| exports | <code>string</code> |  | The _write_ exports name for usage in JS destination files only. |
| force | <code>string</code> | <code>false</code> | Force overwriting of existing output files on write phase. |
| no-es6 | <code>boolean</code> | <code>false</code> | Whether not to use ECMAScript6 syntax for JS type output like                                                     `module.exports` instead of `export default`, applicable only                                                     for JS output. |
| no-single | <code>boolean</code> | <code>false</code> | Whether _not_ to use single-quotes style for values in JS type                                                      output (i.e. double-quotes). |

