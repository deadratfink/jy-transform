<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## TOC

- [Modules](#modules)
- [Members](#members)
- [Constants](#constants)
- [Typedefs](#typedefs)
- [External](#external)
- [jy-transform:jyt ℗](#jy-transformjyt-%E2%84%97)
- [jy-transform:constants](#jy-transformconstants)
- [jy-transform:debug-log ℗](#jy-transformdebug-log-%E2%84%97)
- [jy-transform:io-utils ℗](#jy-transformio-utils-%E2%84%97)
- [jy-transform:reader ℗](#jy-transformreader-%E2%84%97)
- [jy-transform:serialize-utils ℗](#jy-transformserialize-utils-%E2%84%97)
- [jy-transform:transformer ℗](#jy-transformtransformer-%E2%84%97)
- [jy-transform:validation:joi-extensions-file-utils ℗](#jy-transformvalidationjoi-extensions-file-utils-%E2%84%97)
- [jy-transform:validation:joi-extensions-identifier-utils ℗](#jy-transformvalidationjoi-extensions-identifier-utils-%E2%84%97)
- [jy-transform:validation:joi-extension ℗](#jy-transformvalidationjoi-extension-%E2%84%97)
- [jy-transform:validation:options-schema-utils : <code>Object</code> ℗](#jy-transformvalidationoptions-schema-utils--codeobjectcode-%E2%84%97)
- [jy-transform:validation:options-schema : <code>Object</code> ℗](#jy-transformvalidationoptions-schema--codeobjectcode-%E2%84%97)
- [jy-transform:writer ℗](#jy-transformwriter-%E2%84%97)
- [jy-transform:unit-test:test-cli ℗](#jy-transformunit-testtest-cli-%E2%84%97)
- [jy-transform:unit-test:test-reader ℗](#jy-transformunit-testtest-reader-%E2%84%97)
- [jy-transform:unit-test:test-transformer ℗](#jy-transformunit-testtest-transformer-%E2%84%97)
- [jy-transform:unit-test:test-writer ℗](#jy-transformunit-testtest-writer-%E2%84%97)
- [jy-transform:unit:helper-constants : <code>Object</code> ℗](#jy-transformunithelper-constants--codeobjectcode-%E2%84%97)
- [jy-transform:unit:logger : <code>Object</code> ℗](#jy-transformunitlogger--codeobjectcode-%E2%84%97)
- [jy-transform:test-unit:index ℗](#jy-transformtest-unitindex-%E2%84%97)
- [jy-transform:test-unit:serialize-utils ℗](#jy-transformtest-unitserialize-utils-%E2%84%97)
- [jy-transform:test-unit:test-joi-extension-file-utils ℗](#jy-transformtest-unittest-joi-extension-file-utils-%E2%84%97)
- [jy-transform:unit-test:test-joi-extensions-identifier-utils ℗](#jy-transformunit-testtest-joi-extensions-identifier-utils-%E2%84%97)
- [jy-transform:unit-test:test-options-schema-utils ℗](#jy-transformunit-testtest-options-schema-utils-%E2%84%97)
- [jy-transform:unit-test:test-options-schema ℗](#jy-transformunit-testtest-options-schema-%E2%84%97)
- [readYamlFromfile ⇒ <code>Object</code> ℗](#readyamlfromfile-%E2%87%92-codeobjectcode-%E2%84%97)
- [mkdirAndWrite ℗](#mkdirandwrite-%E2%84%97)
- [readJsOrJsonFromFile ⇒ <code>Promise.&lt;string&gt;</code> ℗](#readjsorjsonfromfile-%E2%87%92-codepromiseltstringgtcode-%E2%84%97)
- [assertTransformSuccess ℗](#asserttransformsuccess-%E2%84%97)
- [assertYamlTransformSuccess](#assertyamltransformsuccess)
- [transformFunc](#transformfunc)
- [assertTransformSuccess](#asserttransformsuccess)
- [assertYamlTransformSuccess](#assertyamltransformsuccess-1)
- [_jsYaml ⇒ <code>Object</code> ℗](#_jsyaml-%E2%87%92-codeobjectcode-%E2%84%97)
- [fsPromisified ℗](#fspromisified-%E2%84%97)
- [fsPromisified ℗](#fspromisified-%E2%84%97-1)
- [ReadOptions : <code>object</code>](#readoptions--codeobjectcode)
- [WriteOptions : <code>object</code>](#writeoptions--codeobjectcode)
- [TransformOptions : <code>object</code>](#transformoptions--codeobjectcode)
- [joi ℗](#joi-%E2%84%97)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Modules

<dl>
<dt><a href="#module_jy-transform_jyt">jy-transform:jyt</a> ℗</dt>
<dd><p>The command line interface.</p>
</dd>
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
<dt><a href="#module_jy-transform_io-utils">jy-transform:io-utils</a> ℗</dt>
<dd><p>This module provides an I/O interface for files, streams or <code>Object</code>.</p>
</dd>
<dt><a href="#module_jy-transform_reader">jy-transform:reader</a> ℗</dt>
<dd><p>This module provides the <em>public</em> interface for the <em>read</em> functionality of YAML, JS or JSON sources
(file, <code>Object</code> or <a href="stream.Readable">stream.Readable</a>).</p>
</dd>
<dt><a href="#module_jy-transform_serialize-utils">jy-transform:serialize-utils</a> ℗</dt>
<dd><p>This module provides an interface for serializing JS either to string or the JSON format.</p>
</dd>
<dt><a href="#module_jy-transform_transformer">jy-transform:transformer</a> ℗</dt>
<dd><p>This module provides the <em>transform</em> functionality for YAML, JS or JSON source to destination mapping.</p>
</dd>
<dt><a href="#module_jy-transform_validation_joi-extensions-file-utils">jy-transform:validation:joi-extensions-file-utils</a> ℗</dt>
<dd><p>An (extended) Joi validation schema helper functions for the module options on FS validation.</p>
</dd>
<dt><a href="#module_jy-transform_validation_joi-extensions-identifier-utils">jy-transform:validation:joi-extensions-identifier-utils</a> ℗</dt>
<dd><p>An (extended) Joi validation schema helper function for the module options to validate ES6 identifiers.</p>
</dd>
<dt><a href="#module_jy-transform_validation_joi-extension">jy-transform:validation:joi-extension</a> ℗</dt>
<dd><p>The module exporting the <a href="#external_joi.Extension">Extension</a>s for option validations.</p>
</dd>
<dt><a href="#module_jy-transform_validation_options-schema-utils">jy-transform:validation:options-schema-utils</a> : <code>Object</code> ℗</dt>
<dd><p>Provides some helper functions used in <a href="module:validation:options-schema">module:validation:options-schema</a> to resolve default
values for origin and target depending on the <code>options.src</code> or <code>options.dest</code> value.</p>
</dd>
<dt><a href="#module_jy-transform_validation_options-schema">jy-transform:validation:options-schema</a> : <code>Object</code> ℗</dt>
<dd><p>The module options schema used in <a href="module:options-validator">module:options-validator</a>.</p>
</dd>
<dt><a href="#module_jy-transform_writer">jy-transform:writer</a> ℗</dt>
<dd><p>This module provides the <em>public</em> interface for the <em>write</em> functionality to write JS objects from
memory to a JSON/JS/YAML destination (file, <code>Object</code> or <a href="stream.Writable">stream.Writable</a>).</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-cli">jy-transform:unit-test:test-cli</a> ℗</dt>
<dd><p>This unit test suite checks the correct transformation behaviour of the CLI interface.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-reader">jy-transform:unit-test:test-reader</a> ℗</dt>
<dd><p>This unit test suite checks the validity and correctness of the Reader module.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-transformer">jy-transform:unit-test:test-transformer</a> ℗</dt>
<dd><p>This unit test suite checks the correct transformation behaviour of the Transformer module.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-writer">jy-transform:unit-test:test-writer</a> ℗</dt>
<dd><p>This unit test suite checks the validity and correctness of Writer module.</p>
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
<dt><a href="#module_jy-transform_test-unit_serialize-utils">jy-transform:test-unit:serialize-utils</a> ℗</dt>
<dd><p>This unit test suite checks the validity and correctness of JS serialization utility methods.</p>
</dd>
<dt><a href="#module_jy-transform_test-unit_test-joi-extension-file-utils">jy-transform:test-unit:test-joi-extension-file-utils</a> ℗</dt>
<dd><p>This unit test module tests validation FS helper method.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-joi-extensions-identifier-utils">jy-transform:unit-test:test-joi-extensions-identifier-utils</a> ℗</dt>
<dd><p>This unit test suite checks validity and correctness of ES6 identifiers.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-options-schema-utils">jy-transform:unit-test:test-options-schema-utils</a> ℗</dt>
<dd><p>This unit test suite checks the validity and correctness of options schema helper methods.</p>
</dd>
<dt><a href="#module_jy-transform_unit-test_test-options-schema">jy-transform:unit-test:test-options-schema</a> ℗</dt>
<dd><p>This unit test suite checks the validity and correctness of options schema.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#readYamlFromfile">readYamlFromfile</a> ⇒ <code>Object</code> ℗</dt>
<dd><p>Reads YAML from file.</p>
</dd>
<dt><a href="#mkdirAndWrite">mkdirAndWrite</a> ℗</dt>
<dd><p>Ensures that all dirs exists for file type <code>dest</code> and writes the JS object to file.</p>
</dd>
<dt><a href="#readJsOrJsonFromFile">readJsOrJsonFromFile</a> ⇒ <code>Promise.&lt;string&gt;</code> ℗</dt>
<dd><p>Writes a serialized object to file.</p>
</dd>
<dt><a href="#assertTransformSuccess">assertTransformSuccess</a> ℗</dt>
<dd><p>Helper method which asserts the successful transformation.</p>
</dd>
<dt><a href="#assertYamlTransformSuccess">assertYamlTransformSuccess</a></dt>
<dd><p>Helper method which asserts the successful transformation.</p>
</dd>
<dt><a href="#transformFunc">transformFunc</a></dt>
<dd><p>Transformation middleware changing value for <code>foo</code> property.</p>
</dd>
<dt><a href="#assertTransformSuccess">assertTransformSuccess</a></dt>
<dd><p>Helper method which asserts the successful transformation.</p>
</dd>
<dt><a href="#assertYamlTransformSuccess">assertYamlTransformSuccess</a></dt>
<dd><p>Helper method which asserts the successful transformation.</p>
</dd>
<dt><a href="#_jsYaml">_jsYaml</a> ⇒ <code>Object</code> ℗</dt>
<dd><p>Creates the options from the given transform function, source and destination path parameters.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#fsPromisified">fsPromisified</a> ℗</dt>
<dd><p>Promisified <code>fs</code> module.</p>
</dd>
<dt><a href="#fsPromisified">fsPromisified</a> ℗</dt>
<dd><p>Promisified <code>fs</code> module.</p>
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

## External

<dl>
<dt><a href="#external_joi">joi</a> ℗</dt>
<dd><p>Hapi.js Joi.</p>
</dd>
</dl>

<a name="module_jy-transform_jyt"></a>

## jy-transform:jyt ℗
The command line interface.

**Access**: private  

* [jy-transform:jyt](#module_jy-transform_jyt) ℗
    * [~usage](#module_jy-transform_jyt..usage) : <code>string</code> ℗
    * [~packagePath](#module_jy-transform_jyt..packagePath) : <code>string</code> ℗
    * [~cliOptionsSchema](#module_jy-transform_jyt..cliOptionsSchema) : <code>Object</code> ℗
    * [~error(err)](#module_jy-transform_jyt..error) ℗
    * [~main(args, cliOptions)](#module_jy-transform_jyt..main) ℗

<a name="module_jy-transform_jyt..usage"></a>

### jy-transform:jyt~usage : <code>string</code> ℗
How to use the CLI.

**Kind**: inner constant of [<code>jy-transform:jyt</code>](#module_jy-transform_jyt)  
**Access**: private  
<a name="module_jy-transform_jyt..packagePath"></a>

### jy-transform:jyt~packagePath : <code>string</code> ℗
The path to package.json.

**Kind**: inner constant of [<code>jy-transform:jyt</code>](#module_jy-transform_jyt)  
**Access**: private  
<a name="module_jy-transform_jyt..cliOptionsSchema"></a>

### jy-transform:jyt~cliOptionsSchema : <code>Object</code> ℗
The options description for parsing the command line input, must be an object with opts defined like:
```
long_tag: [short_tag, description, value_type, default_value];
```

**Kind**: inner constant of [<code>jy-transform:jyt</code>](#module_jy-transform_jyt)  
**Access**: private  
<a name="module_jy-transform_jyt..error"></a>

### jy-transform:jyt~error(err) ℗
Prints the error to console and exits process with 1.

**Kind**: inner method of [<code>jy-transform:jyt</code>](#module_jy-transform_jyt)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>string</code> \| <code>Error</code> | The error to print. |

<a name="module_jy-transform_jyt..main"></a>

### jy-transform:jyt~main(args, cliOptions) ℗
The main entry callback. When calling `cli.main()` this receives the `options`
given on CLI, then does the transformation with these options and finally, it
prints the result to the CLI.

**Kind**: inner method of [<code>jy-transform:jyt</code>](#module_jy-transform_jyt)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Array</code> | The first mandatory argument is the input file (`args[0]`), the second (optional)                           argument is the output file (`args[1]`). |
| cliOptions | <code>module:jy-transform:type-definitions~TransformOptions</code> | The options provided via CLI. |

<a name="module_jy-transform_constants"></a>

## jy-transform:constants
Useful constants used for the module and its usage.

**Access**: public  

* [jy-transform:constants](#module_jy-transform_constants)
    * [~UTF8](#module_jy-transform_constants..UTF8) : <code>string</code> ℗
    * [~TYPE_YAML](#module_jy-transform_constants..TYPE_YAML) : <code>string</code>
    * [~TYPE_JSON](#module_jy-transform_constants..TYPE_JSON) : <code>string</code>
    * [~TYPE_JS](#module_jy-transform_constants..TYPE_JS) : <code>string</code>
    * [~EXT_TO_TYPE_MAP](#module_jy-transform_constants..EXT_TO_TYPE_MAP) : <code>Object</code> ℗
    * [~DEFAULT_INDENT](#module_jy-transform_constants..DEFAULT_INDENT) : <code>number</code> ℗
    * [~MIN_INDENT](#module_jy-transform_constants..MIN_INDENT) : <code>number</code> ℗
    * [~MIN_YAML_INDENT](#module_jy-transform_constants..MIN_YAML_INDENT) : <code>number</code> ℗
    * [~MAX_INDENT](#module_jy-transform_constants..MAX_INDENT) : <code>number</code> ℗
    * [~DEFAULT_ORIGIN](#module_jy-transform_constants..DEFAULT_ORIGIN) : <code>string</code> ℗
    * [~DEFAULT_TARGET](#module_jy-transform_constants..DEFAULT_TARGET) : <code>string</code> ℗
    * [~DEFAULT_FORCE_FILE_OVERWRITE](#module_jy-transform_constants..DEFAULT_FORCE_FILE_OVERWRITE) : <code>boolean</code> ℗
    * [~DEFAULT_STRICT](#module_jy-transform_constants..DEFAULT_STRICT) : <code>boolean</code> ℗
    * [~DEFAULT_NO_ES6](#module_jy-transform_constants..DEFAULT_NO_ES6) : <code>boolean</code> ℗
    * [~DEFAULT_NO_SINGLE_QUOTES](#module_jy-transform_constants..DEFAULT_NO_SINGLE_QUOTES) : <code>boolean</code> ℗
    * [~ORIGIN_DESCRIPTION](#module_jy-transform_constants..ORIGIN_DESCRIPTION) : <code>string</code> ℗
    * [~TARGET_DESCRIPTION](#module_jy-transform_constants..TARGET_DESCRIPTION) : <code>string</code> ℗
    * [~DEST_DESCRIPTION](#module_jy-transform_constants..DEST_DESCRIPTION) : <code>string</code> ℗
    * [~DEFAULT_JS_IMPORTS_IDENTIFIER](#module_jy-transform_constants..DEFAULT_JS_IMPORTS_IDENTIFIER) : <code>string</code> ℗
    * [~DEFAULT_JS_EXPORTS_IDENTIFIER](#module_jy-transform_constants..DEFAULT_JS_EXPORTS_IDENTIFIER) : <code>string</code> ℗

<a name="module_jy-transform_constants..UTF8"></a>

### jy-transform:constants~UTF8 : <code>string</code> ℗
The 'utf8' constant.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
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
<a name="module_jy-transform_constants..EXT_TO_TYPE_MAP"></a>

### jy-transform:constants~EXT_TO_TYPE_MAP : <code>Object</code> ℗
A map for extensions to type.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..DEFAULT_INDENT"></a>

### jy-transform:constants~DEFAULT_INDENT : <code>number</code> ℗
The default file indention (4 SPACEs).

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..MIN_INDENT"></a>

### jy-transform:constants~MIN_INDENT : <code>number</code> ℗
The minimum file indention (0 SPACE) fo JS and JSON types.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..MIN_YAML_INDENT"></a>

### jy-transform:constants~MIN_YAML_INDENT : <code>number</code> ℗
The minimum file indention (0 SPACE) for YAML types.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..MAX_INDENT"></a>

### jy-transform:constants~MAX_INDENT : <code>number</code> ℗
The maximum file indention (8 SPACEs).

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..DEFAULT_ORIGIN"></a>

### jy-transform:constants~DEFAULT_ORIGIN : <code>string</code> ℗
The default `origin` value: 'yaml'.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..DEFAULT_TARGET"></a>

### jy-transform:constants~DEFAULT_TARGET : <code>string</code> ℗
The default `origin` value: 'js'.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..DEFAULT_FORCE_FILE_OVERWRITE"></a>

### jy-transform:constants~DEFAULT_FORCE_FILE_OVERWRITE : <code>boolean</code> ℗
Whether to overwrite existing file or object on output.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..DEFAULT_STRICT"></a>

### jy-transform:constants~DEFAULT_STRICT : <code>boolean</code> ℗
Whether to write a "use strict;" in JS type output.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..DEFAULT_NO_ES6"></a>

### jy-transform:constants~DEFAULT_NO_ES6 : <code>boolean</code> ℗
Whether _not_ to use ECMAScript6 syntax for JS type output.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..DEFAULT_NO_SINGLE_QUOTES"></a>

### jy-transform:constants~DEFAULT_NO_SINGLE_QUOTES : <code>boolean</code> ℗
Whether _not_ to use single-quotes style for values in JS type output (i.e. double-quotes).

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..ORIGIN_DESCRIPTION"></a>

### jy-transform:constants~ORIGIN_DESCRIPTION : <code>string</code> ℗
The `origin` description value.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..TARGET_DESCRIPTION"></a>

### jy-transform:constants~TARGET_DESCRIPTION : <code>string</code> ℗
The `target` description value.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..DEST_DESCRIPTION"></a>

### jy-transform:constants~DEST_DESCRIPTION : <code>string</code> ℗
The `dest` description value.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_constants..DEFAULT_JS_IMPORTS_IDENTIFIER"></a>

### jy-transform:constants~DEFAULT_JS_IMPORTS_IDENTIFIER : <code>string</code> ℗
The `src` exports identifier value to read.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
**Example**  
```js
module.exports.foo = {...}; // here 'foo' is the identifier for an object to read from the source!
```
<a name="module_jy-transform_constants..DEFAULT_JS_EXPORTS_IDENTIFIER"></a>

### jy-transform:constants~DEFAULT_JS_EXPORTS_IDENTIFIER : <code>string</code> ℗
The `dest` exports identifier value to write.

**Kind**: inner constant of [<code>jy-transform:constants</code>](#module_jy-transform_constants)  
**Access**: private  
<a name="module_jy-transform_debug-log"></a>

## jy-transform:debug-log ℗
The debug logger. Can be enabled via environment variables (set to `true`):
- `JYT_DEBUG`: (only DEBUG logging via `console.log`)
- `JYT_DEBUG`: (only ERROR logging via `console.error`)

**Access**: private  

* [jy-transform:debug-log](#module_jy-transform_debug-log) ℗
    * [~debug](#module_jy-transform_debug-log..debug)
    * [~error](#module_jy-transform_debug-log..error)

<a name="module_jy-transform_debug-log..debug"></a>

### jy-transform:debug-log~debug
DEBUG function.

**Kind**: inner constant of [<code>jy-transform:debug-log</code>](#module_jy-transform_debug-log)  
**Access**: protected  
<a name="module_jy-transform_debug-log..error"></a>

### jy-transform:debug-log~error
DEBUG function.

**Kind**: inner constant of [<code>jy-transform:debug-log</code>](#module_jy-transform_debug-log)  
**Access**: protected  
<a name="module_jy-transform_io-utils"></a>

## jy-transform:io-utils ℗
This module provides an I/O interface for files, streams or `Object`.

**Access**: private  

* [jy-transform:io-utils](#module_jy-transform_io-utils) ℗
    * [~readJsOrJsonFromFile(file, [imports])](#module_jy-transform_io-utils..readJsOrJsonFromFile) ⇒ <code>Object</code> ℗
    * [~readJsFromObject(object, [imports])](#module_jy-transform_io-utils..readJsFromObject) ⇒ <code>Object</code> ℗
    * [~getConsecutiveDestName(dest)](#module_jy-transform_io-utils..getConsecutiveDestName) ⇒ <code>string</code> ℗
    * [~writeToStream(object, dest, target)](#module_jy-transform_io-utils..writeToStream) ⇒ <code>Promise.&lt;string&gt;</code> ℗

<a name="module_jy-transform_io-utils..readJsOrJsonFromFile"></a>

### jy-transform:io-utils~readJsOrJsonFromFile(file, [imports]) ⇒ <code>Object</code> ℗
Reads JS or JSON from file.

**Kind**: inner method of [<code>jy-transform:io-utils</code>](#module_jy-transform_io-utils)  
**Returns**: <code>Object</code> - The read object.  
**Throws**:

- <code>Error</code> When an `imports` is given but the declared object key is not exported by the file.

**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | The file path. |
| [imports] | <code>string</code> | An object which is exported in the file. |

<a name="module_jy-transform_io-utils..readJsFromObject"></a>

### jy-transform:io-utils~readJsFromObject(object, [imports]) ⇒ <code>Object</code> ℗
Reads JS from JS object.

**Kind**: inner method of [<code>jy-transform:io-utils</code>](#module_jy-transform_io-utils)  
**Returns**: <code>Object</code> - The given `object` object or any sub-object specified by `imports`.  
**Throws**:

- <code>Error</code> When an `imports` is given but the declared object key is not contained in the source object.

**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>string</code> | The JS object source. |
| [imports] | <code>string</code> | An object which is is a sub-object in `object`. |

<a name="module_jy-transform_io-utils..getConsecutiveDestName"></a>

### jy-transform:io-utils~getConsecutiveDestName(dest) ⇒ <code>string</code> ℗
Turns the destination file name into a name containing a consecutive
number if it exists. It iterates over the files until it finds a file
name which does not exist.

**Kind**: inner method of [<code>jy-transform:io-utils</code>](#module_jy-transform_io-utils)  
**Returns**: <code>string</code> - A consecutive file name or the original one if `dest` file does not exist.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| dest | <code>string</code> | The destination file. |

<a name="module_jy-transform_io-utils..writeToStream"></a>

### jy-transform:io-utils~writeToStream(object, dest, target) ⇒ <code>Promise.&lt;string&gt;</code> ℗
Writes a string serialized data object to a stream.

**Kind**: inner method of [<code>jy-transform:io-utils</code>](#module_jy-transform_io-utils)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Containing the write success message to handle by caller (e.g. for logging).  
**Throws**:

- <code>Error</code> If serialized JS object could not be written due to any reason.

**Access**: private  
**See**

- [TYPE_YAML](TYPE_YAML)
- [TYPE_JSON](TYPE_JSON)
- [TYPE_JS](TYPE_JS)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>string</code> | The data to write into stream. |
| dest | <code>string</code> | The stream destination. |
| target | <code>string</code> | The target type, one of [ 'yaml' | 'json' | 'js' ]. |

<a name="module_jy-transform_reader"></a>

## jy-transform:reader ℗
This module provides the _public_ interface for the _read_ functionality of YAML, JS or JSON sources
(file, `Object` or [stream.Readable](stream.Readable)).

**Access**: private  

* [jy-transform:reader](#module_jy-transform_reader) ℗
    * [~readJsOrJson](#module_jy-transform_reader..readJsOrJson) ⇒ <code>Promise.&lt;Object&gt;</code> ℗
    * [~readYaml](#module_jy-transform_reader..readYaml) ⇒ <code>Promise.&lt;Object&gt;</code> ℗
    * [~read](#module_jy-transform_reader..read) ⇒ <code>Promise</code> ℗

<a name="module_jy-transform_reader..readJsOrJson"></a>

### jy-transform:reader~readJsOrJson ⇒ <code>Promise.&lt;Object&gt;</code> ℗
Reads the data from a given JS or JSON source.

**Kind**: inner property of [<code>jy-transform:reader</code>](#module_jy-transform_reader)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Contains the read JS object.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>ReadOptions</code>](#ReadOptions) | Contains the JS/JSON source reference to read from. |

<a name="module_jy-transform_reader..readYaml"></a>

### jy-transform:reader~readYaml ⇒ <code>Promise.&lt;Object&gt;</code> ℗
Loads a single YAML source containing document and returns a JS object.
*NOTE:* this function does not understand multi-document sources, it throws
exception on those.

**Kind**: inner property of [<code>jy-transform:reader</code>](#module_jy-transform_reader)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Contains the read JS object.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>ReadOptions</code>](#ReadOptions) | Contains the YAML source reference to read from. |

<a name="module_jy-transform_reader..read"></a>

### jy-transform:reader~read ⇒ <code>Promise</code> ℗
Reads a particular content type from a source provided in the passed `options`.

**Kind**: inner property of [<code>jy-transform:reader</code>](#module_jy-transform_reader)  
**Returns**: <code>Promise</code> - The result.  
**Access**: private  
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
<a name="module_jy-transform_serialize-utils"></a>

## jy-transform:serialize-utils ℗
This module provides an interface for serializing JS either to string or the JSON format.

**Access**: private  

* [jy-transform:serialize-utils](#module_jy-transform_serialize-utils) ℗
    * [~createExportString](#module_jy-transform_serialize-utils..createExportString) ⇒ <code>Promise.&lt;string&gt;</code> ℗
    * [~serializeJsToString](#module_jy-transform_serialize-utils..serializeJsToString) ⇒ <code>Promise.&lt;string&gt;</code> ℗
    * [~serializeJsToJsonString](#module_jy-transform_serialize-utils..serializeJsToJsonString) ⇒ <code>string</code> ℗

<a name="module_jy-transform_serialize-utils..createExportString"></a>

### jy-transform:serialize-utils~createExportString ⇒ <code>Promise.&lt;string&gt;</code> ℗
Creates a potential named `'module.exports[.exportsTo]'` string.

**Kind**: inner property of [<code>jy-transform:serialize-utils</code>](#module_jy-transform_serialize-utils)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Resolves with the exports string.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| es6 | <code>boolean</code> | Whether to use ECMAScript6 export syntax. |
| [exportsTo] | <code>string</code> | The export name. |

<a name="module_jy-transform_serialize-utils..serializeJsToString"></a>

### jy-transform:serialize-utils~serializeJsToString ⇒ <code>Promise.&lt;string&gt;</code> ℗
Serialize a JS object to string.

**Kind**: inner property of [<code>jy-transform:serialize-utils</code>](#module_jy-transform_serialize-utils)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - Promise resolve with the serialized JS content.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JS Object to serialize. |
| options | [<code>WriteOptions</code>](#WriteOptions) | The write options. |

<a name="module_jy-transform_serialize-utils..serializeJsToJsonString"></a>

### jy-transform:serialize-utils~serializeJsToJsonString ⇒ <code>string</code> ℗
Serialize a JS object to JSON string.

**Kind**: inner property of [<code>jy-transform:serialize-utils</code>](#module_jy-transform_serialize-utils)  
**Returns**: <code>string</code> - The serialized JSON.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The object to serialize. |
| indent | <code>number</code> | The code indention. |

<a name="module_jy-transform_transformer"></a>

## jy-transform:transformer ℗
This module provides the _transform_ functionality for YAML, JS or JSON source to destination mapping.

**Access**: private  
<a name="module_jy-transform_transformer..transform"></a>

### jy-transform:transformer~transform ⇒ <code>Promise</code>
The entry method for all transformations accepting a configuration object and
an (optional) middleware function. It executes the transformation logic.

1. Input (read)
2. Transform [ + Middleware]
3. Output (write).

**Kind**: inner property of [<code>jy-transform:transformer</code>](#module_jy-transform_transformer)  
**Returns**: <code>Promise</code> - The transformation result.  
**Access**: public  
**Resolve**: <code>string</code> With the transformation result as message (e.g. to be logged by caller).  
**Reject**: <code>TypeError</code> Will throw this error when the passed `middleware` is not type of `Function`.  
**Reject**: <code>ValidationError</code> If any `options` validation occurs.  
**Reject**: <code>Error</code> Will throw any error if read, transform or write operation failed due to any reason.  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>TransformOptions</code>](#TransformOptions) | The configuration for a transformation. |

**Example**  
```js
import { transform } from 'jy-transform';
const options = {
  src: 'foo/bar.yaml',            // From YAML file...
  transform: async (object) => {  // ...with exchanging value...
    object.foo = 'new value';
    return object;
  },
  target: 'foo/bar.json',         // ...to a new JSON file.
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
<a name="module_jy-transform_validation_joi-extensions-file-utils"></a>

## jy-transform:validation:joi-extensions-file-utils ℗
An (extended) Joi validation schema helper functions for the module options on FS validation.

**Access**: private  
<a name="module_jy-transform_validation_joi-extensions-file-utils..isExistingFile"></a>

### jy-transform:validation:joi-extensions-file-utils~isExistingFile(pathStr) ⇒ <code>boolean</code>
Checks if given `pathStr` is an existing file after resolving `pathStr` relative to CWD.

**Kind**: inner method of [<code>jy-transform:validation:joi-extensions-file-utils</code>](#module_jy-transform_validation_joi-extensions-file-utils)  
**Returns**: <code>boolean</code> - Value `true` if it is a file and exists, else `false`.  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| pathStr | <code>string</code> | The string to check for being a file. |

<a name="module_jy-transform_validation_joi-extensions-identifier-utils"></a>

## jy-transform:validation:joi-extensions-identifier-utils ℗
An (extended) Joi validation schema helper function for the module options to validate ES6 identifiers.

**Access**: private  

* [jy-transform:validation:joi-extensions-identifier-utils](#module_jy-transform_validation_joi-extensions-identifier-utils) ℗
    * [~identifierRegExpECMAScript6](#module_jy-transform_validation_joi-extensions-identifier-utils..identifierRegExpECMAScript6) : <code>RegExp</code> ℗
    * [~isValidEs6Identifier(identifier)](#module_jy-transform_validation_joi-extensions-identifier-utils..isValidEs6Identifier) ⇒ <code>boolean</code>

<a name="module_jy-transform_validation_joi-extensions-identifier-utils..identifierRegExpECMAScript6"></a>

### jy-transform:validation:joi-extensions-identifier-utils~identifierRegExpECMAScript6 : <code>RegExp</code> ℗
Created at [Generating a regular expression to match valid JavaScript identifiers]
(https://mathiasbynens.be/demo/javascript-identifier-regex).

**Kind**: inner constant of [<code>jy-transform:validation:joi-extensions-identifier-utils</code>](#module_jy-transform_validation_joi-extensions-identifier-utils)  
**Access**: private  
<a name="module_jy-transform_validation_joi-extensions-identifier-utils..isValidEs6Identifier"></a>

### jy-transform:validation:joi-extensions-identifier-utils~isValidEs6Identifier(identifier) ⇒ <code>boolean</code>
This method checks if a given `identifier` is a valid ECMAScript 6 identifier.

**Kind**: inner method of [<code>jy-transform:validation:joi-extensions-identifier-utils</code>](#module_jy-transform_validation_joi-extensions-identifier-utils)  
**Returns**: <code>boolean</code> - A `true` if valid, else `false`.  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | The identifier to check. |

**Example**  
```js
import { isValidEs6Identifier } from './validation/joi-extensions-identifier-utils.js';
const identifier = 'foo';
console.log('valid = ' + isValidEs6Identifier(identifier));
```
<a name="module_jy-transform_validation_joi-extension"></a>

## jy-transform:validation:joi-extension ℗
The module exporting the [Extension](#external_joi.Extension)s for option validations.

**Access**: private  
**See**: [Joi.extend(extension) method](https://github.com/hapijs/joi/blob/v10.2.2/API.md#extendextension).  
<a name="module_jy-transform_validation_joi-extension..EXTENSIONS"></a>

### jy-transform:validation:joi-extension~EXTENSIONS : [<code>Extension</code>](#external_joi.Extension) ℗
The common [Schema](#external_joi.Schema) validation extensions:
- `existingFile` - needs to be an absolute or relative path to an existing file.
- `validEs6Identifier` - needs to be a valid ECMAScript 6 identifier.

**Kind**: inner constant of [<code>jy-transform:validation:joi-extension</code>](#module_jy-transform_validation_joi-extension)  
**Access**: private  
<a name="module_jy-transform_validation_options-schema-utils"></a>

## jy-transform:validation:options-schema-utils : <code>Object</code> ℗
Provides some helper functions used in [module:validation:options-schema](module:validation:options-schema) to resolve default
values for origin and target depending on the `options.src` or `options.dest` value.

**Access**: private  
**See**: [module:validation:options-schema](module:validation:options-schema)  

* [jy-transform:validation:options-schema-utils](#module_jy-transform_validation_options-schema-utils) : <code>Object</code> ℗
    * [~inferDestDefaultFromSrc](#module_jy-transform_validation_options-schema-utils..inferDestDefaultFromSrc) ⇒ <code>string</code> \| <code>undefined</code>
    * [~inferOriginDefault](#module_jy-transform_validation_options-schema-utils..inferOriginDefault) ⇒ <code>string</code>
    * [~inferTargetDefault](#module_jy-transform_validation_options-schema-utils..inferTargetDefault) ⇒ <code>string</code>
    * [~isFileStream(object)](#module_jy-transform_validation_options-schema-utils..isFileStream) ⇒ <code>boolean</code> ℗
    * [~adaptTargetPathType(dest, [target])](#module_jy-transform_validation_options-schema-utils..adaptTargetPathType) ⇒ <code>string</code> ℗
    * [~getTypeFromFilePath(pathStr, defaultValue)](#module_jy-transform_validation_options-schema-utils..getTypeFromFilePath) ⇒ <code>string</code> ℗

<a name="module_jy-transform_validation_options-schema-utils..inferDestDefaultFromSrc"></a>

### jy-transform:validation:options-schema-utils~inferDestDefaultFromSrc ⇒ <code>string</code> \| <code>undefined</code>
This function is used to infer a _default_ value in case `options.dest` is not defined.
Checks if `context.src` is either a string or a file stream where can get the file path from.
If this detection process cannot be fulfilled (i.e. we cannot infer from options.src `Object`
type or a `Readable` type which is not a _file_ stream) then the function returns `undefined`.

**Kind**: inner constant of [<code>jy-transform:validation:options-schema-utils</code>](#module_jy-transform_validation_options-schema-utils)  
**Returns**: <code>string</code> \| <code>undefined</code> - The adapted `dest` path if possible, or `undefined`.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | The validation context. |

<a name="module_jy-transform_validation_options-schema-utils..inferOriginDefault"></a>

### jy-transform:validation:options-schema-utils~inferOriginDefault ⇒ <code>string</code>
Infers the _origin_ type value from current validation context.

**Kind**: inner constant of [<code>jy-transform:validation:options-schema-utils</code>](#module_jy-transform_validation_options-schema-utils)  
**Returns**: <code>string</code> - The target type.  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | The validation context. |

<a name="module_jy-transform_validation_options-schema-utils..inferTargetDefault"></a>

### jy-transform:validation:options-schema-utils~inferTargetDefault ⇒ <code>string</code>
Infers the _target_ type value from current validation context.

**Kind**: inner constant of [<code>jy-transform:validation:options-schema-utils</code>](#module_jy-transform_validation_options-schema-utils)  
**Returns**: <code>string</code> - The target type.  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | The validation context. |

<a name="module_jy-transform_validation_options-schema-utils..isFileStream"></a>

### jy-transform:validation:options-schema-utils~isFileStream(object) ⇒ <code>boolean</code> ℗
Checks if passed `object` is a file stream instance.

**Kind**: inner method of [<code>jy-transform:validation:options-schema-utils</code>](#module_jy-transform_validation_options-schema-utils)  
**Returns**: <code>boolean</code> - A `true` if passed `object` is a file stream instance, else `false`.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>\*</code> | The object to check. |

<a name="module_jy-transform_validation_options-schema-utils..adaptTargetPathType"></a>

### jy-transform:validation:options-schema-utils~adaptTargetPathType(dest, [target]) ⇒ <code>string</code> ℗
Returns the passes `dest` value or an adapted destination path (the latter if `target` is defined an differs from
destinations path extension).

**Kind**: inner method of [<code>jy-transform:validation:options-schema-utils</code>](#module_jy-transform_validation_options-schema-utils)  
**Returns**: <code>string</code> - The `dest` value or an adapted destination path.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| dest | <code>string</code> | The destination path. |
| [target] | <code>string</code> | The target file type of destination. |

<a name="module_jy-transform_validation_options-schema-utils..getTypeFromFilePath"></a>

### jy-transform:validation:options-schema-utils~getTypeFromFilePath(pathStr, defaultValue) ⇒ <code>string</code> ℗
Infer from path extension to a type using default value as fallback.

**Kind**: inner method of [<code>jy-transform:validation:options-schema-utils</code>](#module_jy-transform_validation_options-schema-utils)  
**Returns**: <code>string</code> - A type value.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| pathStr | <code>string</code> | The file path with or without extension. |
| defaultValue | <code>string</code> | The default value to use if type cannot be inferred from path. |

<a name="module_jy-transform_validation_options-schema"></a>

## jy-transform:validation:options-schema : <code>Object</code> ℗
The module options schema used in [module:options-validator](module:options-validator).

**Access**: private  
**See**: [module:options-validator](module:options-validator)  

* [jy-transform:validation:options-schema](#module_jy-transform_validation_options-schema) : <code>Object</code> ℗
    * [~forceSchema](#module_jy-transform_validation_options-schema..forceSchema) : [<code>Schema</code>](#external_joi.Schema) ℗
    * [~strictSchema](#module_jy-transform_validation_options-schema..strictSchema) : [<code>Schema</code>](#external_joi.Schema) ℗
    * [~noES6Schema](#module_jy-transform_validation_options-schema..noES6Schema) : [<code>Schema</code>](#external_joi.Schema) ℗
    * [~noSingleSchema](#module_jy-transform_validation_options-schema..noSingleSchema) : [<code>Schema</code>](#external_joi.Schema) ℗
    * [~indentSchema](#module_jy-transform_validation_options-schema..indentSchema) : [<code>Schema</code>](#external_joi.Schema) ℗
    * [~exportsSchema](#module_jy-transform_validation_options-schema..exportsSchema) : [<code>Schema</code>](#external_joi.Schema) ℗
    * [~targetSchema](#module_jy-transform_validation_options-schema..targetSchema) : [<code>Schema</code>](#external_joi.Schema) ℗
    * [~readOptionsSchema](#module_jy-transform_validation_options-schema..readOptionsSchema) : [<code>Schema</code>](#external_joi.Schema) ℗
    * [~writeOptionsSchema](#module_jy-transform_validation_options-schema..writeOptionsSchema) : [<code>Schema</code>](#external_joi.Schema) ℗
    * [~transformOptionsSchema](#module_jy-transform_validation_options-schema..transformOptionsSchema) : [<code>Schema</code>](#external_joi.Schema) ℗

<a name="module_jy-transform_validation_options-schema..forceSchema"></a>

### jy-transform:validation:options-schema~forceSchema : [<code>Schema</code>](#external_joi.Schema) ℗
The `force` option schema.

**Kind**: inner constant of [<code>jy-transform:validation:options-schema</code>](#module_jy-transform_validation_options-schema)  
**Access**: private  
<a name="module_jy-transform_validation_options-schema..strictSchema"></a>

### jy-transform:validation:options-schema~strictSchema : [<code>Schema</code>](#external_joi.Schema) ℗
The `force` option schema.

**Kind**: inner constant of [<code>jy-transform:validation:options-schema</code>](#module_jy-transform_validation_options-schema)  
**Access**: private  
<a name="module_jy-transform_validation_options-schema..noES6Schema"></a>

### jy-transform:validation:options-schema~noES6Schema : [<code>Schema</code>](#external_joi.Schema) ℗
The `no-es6` option schema.

**Kind**: inner constant of [<code>jy-transform:validation:options-schema</code>](#module_jy-transform_validation_options-schema)  
**Access**: private  
<a name="module_jy-transform_validation_options-schema..noSingleSchema"></a>

### jy-transform:validation:options-schema~noSingleSchema : [<code>Schema</code>](#external_joi.Schema) ℗
The `no-single` option schema.

**Kind**: inner constant of [<code>jy-transform:validation:options-schema</code>](#module_jy-transform_validation_options-schema)  
**Access**: private  
<a name="module_jy-transform_validation_options-schema..indentSchema"></a>

### jy-transform:validation:options-schema~indentSchema : [<code>Schema</code>](#external_joi.Schema) ℗
The `indent` option schema.

**Kind**: inner constant of [<code>jy-transform:validation:options-schema</code>](#module_jy-transform_validation_options-schema)  
**Access**: private  
<a name="module_jy-transform_validation_options-schema..exportsSchema"></a>

### jy-transform:validation:options-schema~exportsSchema : [<code>Schema</code>](#external_joi.Schema) ℗
The `exports` option schema.

**Kind**: inner constant of [<code>jy-transform:validation:options-schema</code>](#module_jy-transform_validation_options-schema)  
**Access**: private  
<a name="module_jy-transform_validation_options-schema..targetSchema"></a>

### jy-transform:validation:options-schema~targetSchema : [<code>Schema</code>](#external_joi.Schema) ℗
The `target` option schema.

**Kind**: inner constant of [<code>jy-transform:validation:options-schema</code>](#module_jy-transform_validation_options-schema)  
**Access**: private  
<a name="module_jy-transform_validation_options-schema..readOptionsSchema"></a>

### jy-transform:validation:options-schema~readOptionsSchema : [<code>Schema</code>](#external_joi.Schema) ℗
The prepared [Schema](#external_joi.Schema) for validating the [ReadOptions](#ReadOptions).

**Kind**: inner constant of [<code>jy-transform:validation:options-schema</code>](#module_jy-transform_validation_options-schema)  
**Access**: private  
<a name="module_jy-transform_validation_options-schema..writeOptionsSchema"></a>

### jy-transform:validation:options-schema~writeOptionsSchema : [<code>Schema</code>](#external_joi.Schema) ℗
The prepared [Schema](#external_joi.Schema) for validating the [WriteOptions](#WriteOptions).

**Kind**: inner constant of [<code>jy-transform:validation:options-schema</code>](#module_jy-transform_validation_options-schema)  
**Access**: private  
<a name="module_jy-transform_validation_options-schema..transformOptionsSchema"></a>

### jy-transform:validation:options-schema~transformOptionsSchema : [<code>Schema</code>](#external_joi.Schema) ℗
The prepared [Schema](#external_joi.Schema) for validating the [TransformOptions](#TransformOptions).

**Kind**: inner constant of [<code>jy-transform:validation:options-schema</code>](#module_jy-transform_validation_options-schema)  
**Access**: private  
<a name="module_jy-transform_writer"></a>

## jy-transform:writer ℗
This module provides the _public_ interface for the _write_ functionality to write JS objects from
memory to a JSON/JS/YAML destination (file, `Object` or [stream.Writable](stream.Writable)).

**Access**: private  

* [jy-transform:writer](#module_jy-transform_writer) ℗
    * [~writeYaml](#module_jy-transform_writer..writeYaml) ⇒ <code>Promise.&lt;string&gt;</code> ℗
    * [~writeJson](#module_jy-transform_writer..writeJson) ⇒ <code>Promise.&lt;string&gt;</code> ℗
    * [~writeJs](#module_jy-transform_writer..writeJs) ⇒ <code>Promise.&lt;string&gt;</code> ℗
    * [~write](#module_jy-transform_writer..write) ⇒ <code>Promise</code>

<a name="module_jy-transform_writer..writeYaml"></a>

### jy-transform:writer~writeYaml ⇒ <code>Promise.&lt;string&gt;</code> ℗
Writes a JS object to a YAML destination.

**Kind**: inner property of [<code>jy-transform:writer</code>](#module_jy-transform_writer)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Containing the write success message to handle by caller (e.g. for logging).  
**Throws**:

- <code>Error</code> If YAML destination could not be written due to any reason.

**Access**: private  
**See**

- [MIN_INDENT](MIN_INDENT)
- [DEFAULT_INDENT](DEFAULT_INDENT)
- [MAX_INDENT](MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JS object to write into YAML destination. |
| options | [<code>WriteOptions</code>](#WriteOptions) | The write destination and indention. |

<a name="module_jy-transform_writer..writeJson"></a>

### jy-transform:writer~writeJson ⇒ <code>Promise.&lt;string&gt;</code> ℗
Writes a JS object to a JSON destination.

**Kind**: inner property of [<code>jy-transform:writer</code>](#module_jy-transform_writer)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Containing the write success message to handle by caller (e.g. for logging).  
**Access**: private  
**See**

- [MIN_INDENT](MIN_INDENT)
- [DEFAULT_INDENT](DEFAULT_INDENT)
- [MAX_INDENT](MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JS object to write into JSON destination. |
| options | [<code>WriteOptions</code>](#WriteOptions) | The write destination and indention. |

<a name="module_jy-transform_writer..writeJs"></a>

### jy-transform:writer~writeJs ⇒ <code>Promise.&lt;string&gt;</code> ℗
Writes a JS object to a JS destination.

**Kind**: inner property of [<code>jy-transform:writer</code>](#module_jy-transform_writer)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Containing the write success message to handle by caller (e.g. for logging).  
**Access**: private  
**See**

- [MIN_INDENT](MIN_INDENT)
- [DEFAULT_INDENT](DEFAULT_INDENT)
- [MAX_INDENT](MAX_INDENT)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JSON to write into JS destination. |
| options | [<code>WriteOptions</code>](#WriteOptions) | The write options. |

<a name="module_jy-transform_writer..write"></a>

### jy-transform:writer~write ⇒ <code>Promise</code>
Writes the passed JS object to a particular destination described by the passed `options`.

**Kind**: inner property of [<code>jy-transform:writer</code>](#module_jy-transform_writer)  
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
<a name="module_jy-transform_unit-test_test-cli"></a>

## jy-transform:unit-test:test-cli ℗
This unit test suite checks the correct transformation behaviour of the CLI interface.

**Access**: private  

* [jy-transform:unit-test:test-cli](#module_jy-transform_unit-test_test-cli) ℗
    * [~CLI_TEST_BASE_DIR](#module_jy-transform_unit-test_test-cli..CLI_TEST_BASE_DIR) : <code>string</code> ℗
    * [~SRC_YAML](#module_jy-transform_unit-test_test-cli..SRC_YAML) : <code>string</code> ℗
    * [~SRC_JSON](#module_jy-transform_unit-test_test-cli..SRC_JSON) : <code>string</code> ℗
    * [~SRC_JS](#module_jy-transform_unit-test_test-cli..SRC_JS) : <code>string</code> ℗
    * [~CLI_OPTIONS_LONG_TO_SHORT_MAP](#module_jy-transform_unit-test_test-cli..CLI_OPTIONS_LONG_TO_SHORT_MAP) : <code>Object</code> ℗
    * [~createOptions(src, dest)](#module_jy-transform_unit-test_test-cli..createOptions) ⇒ <code>Object</code> ℗
    * [~execJyt(args)](#module_jy-transform_unit-test_test-cli..execJyt) ⇒ <code>Promise</code> ℗
    * [~optionsToArgs(options)](#module_jy-transform_unit-test_test-cli..optionsToArgs) ⇒ <code>Array.&lt;string&gt;</code> ℗

<a name="module_jy-transform_unit-test_test-cli..CLI_TEST_BASE_DIR"></a>

### jy-transform:unit-test:test-cli~CLI_TEST_BASE_DIR : <code>string</code> ℗
Temporary base dir for transformer test output.

**Kind**: inner constant of [<code>jy-transform:unit-test:test-cli</code>](#module_jy-transform_unit-test_test-cli)  
**Access**: private  
<a name="module_jy-transform_unit-test_test-cli..SRC_YAML"></a>

### jy-transform:unit-test:test-cli~SRC_YAML : <code>string</code> ℗
A YAML source file path.

**Kind**: inner constant of [<code>jy-transform:unit-test:test-cli</code>](#module_jy-transform_unit-test_test-cli)  
**Access**: private  
<a name="module_jy-transform_unit-test_test-cli..SRC_JSON"></a>

### jy-transform:unit-test:test-cli~SRC_JSON : <code>string</code> ℗
A JSON source file path.

**Kind**: inner constant of [<code>jy-transform:unit-test:test-cli</code>](#module_jy-transform_unit-test_test-cli)  
**Access**: private  
<a name="module_jy-transform_unit-test_test-cli..SRC_JS"></a>

### jy-transform:unit-test:test-cli~SRC_JS : <code>string</code> ℗
A JS source file path.

**Kind**: inner constant of [<code>jy-transform:unit-test:test-cli</code>](#module_jy-transform_unit-test_test-cli)  
**Access**: private  
<a name="module_jy-transform_unit-test_test-cli..CLI_OPTIONS_LONG_TO_SHORT_MAP"></a>

### jy-transform:unit-test:test-cli~CLI_OPTIONS_LONG_TO_SHORT_MAP : <code>Object</code> ℗
Object mapping from JS option to to short CLI option.

**Kind**: inner constant of [<code>jy-transform:unit-test:test-cli</code>](#module_jy-transform_unit-test_test-cli)  
**Access**: private  
<a name="module_jy-transform_unit-test_test-cli..createOptions"></a>

### jy-transform:unit-test:test-cli~createOptions(src, dest) ⇒ <code>Object</code> ℗
Creates the options from the given source and destination path parameters.

**Kind**: inner method of [<code>jy-transform:unit-test:test-cli</code>](#module_jy-transform_unit-test_test-cli)  
**Returns**: <code>Object</code> - The options object.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | The source path. |
| dest | <code>string</code> | The destination path. |

<a name="module_jy-transform_unit-test_test-cli..execJyt"></a>

### jy-transform:unit-test:test-cli~execJyt(args) ⇒ <code>Promise</code> ℗
Executes `./jyt` script with given args (which includes source, destination and all options).

**Kind**: inner method of [<code>jy-transform:unit-test:test-cli</code>](#module_jy-transform_unit-test_test-cli)  
**Returns**: <code>Promise</code> - A result, see details.  
**Access**: private  
**Resolve**: <code>string</code> The transformation success message.  
**Reject**: <code>Error</code> Any error occurred.  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Array.&lt;string&gt;</code> | The source, destination CLI arguments and all CLI options. |

<a name="module_jy-transform_unit-test_test-cli..optionsToArgs"></a>

### jy-transform:unit-test:test-cli~optionsToArgs(options) ⇒ <code>Array.&lt;string&gt;</code> ℗
Creates the CLI args/options from given `options` object.

**Kind**: inner method of [<code>jy-transform:unit-test:test-cli</code>](#module_jy-transform_unit-test_test-cli)  
**Returns**: <code>Array.&lt;string&gt;</code> - The CLI args and options.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>TransformOptions</code>](#TransformOptions) | The transformation options. |

<a name="module_jy-transform_unit-test_test-reader"></a>

## jy-transform:unit-test:test-reader ℗
This unit test suite checks the validity and correctness of the Reader module.

**Access**: private  
<a name="module_jy-transform_unit-test_test-transformer"></a>

## jy-transform:unit-test:test-transformer ℗
This unit test suite checks the correct transformation behaviour of the Transformer module.

**Access**: private  

* [jy-transform:unit-test:test-transformer](#module_jy-transform_unit-test_test-transformer) ℗
    * [~SRC_YAML](#module_jy-transform_unit-test_test-transformer..SRC_YAML) : <code>string</code> ℗
    * [~SRC_JSON](#module_jy-transform_unit-test_test-transformer..SRC_JSON) : <code>string</code> ℗
    * [~SRC_JS](#module_jy-transform_unit-test_test-transformer..SRC_JS) : <code>string</code> ℗
    * [~TRANSFORMER_TEST_BASE_DIR](#module_jy-transform_unit-test_test-transformer..TRANSFORMER_TEST_BASE_DIR) : <code>string</code> ℗

<a name="module_jy-transform_unit-test_test-transformer..SRC_YAML"></a>

### jy-transform:unit-test:test-transformer~SRC_YAML : <code>string</code> ℗
A YAML source file path.

**Kind**: inner constant of [<code>jy-transform:unit-test:test-transformer</code>](#module_jy-transform_unit-test_test-transformer)  
**Access**: private  
<a name="module_jy-transform_unit-test_test-transformer..SRC_JSON"></a>

### jy-transform:unit-test:test-transformer~SRC_JSON : <code>string</code> ℗
A JSON source file path.

**Kind**: inner constant of [<code>jy-transform:unit-test:test-transformer</code>](#module_jy-transform_unit-test_test-transformer)  
**Access**: private  
<a name="module_jy-transform_unit-test_test-transformer..SRC_JS"></a>

### jy-transform:unit-test:test-transformer~SRC_JS : <code>string</code> ℗
A JS source file path.

**Kind**: inner constant of [<code>jy-transform:unit-test:test-transformer</code>](#module_jy-transform_unit-test_test-transformer)  
**Access**: private  
<a name="module_jy-transform_unit-test_test-transformer..TRANSFORMER_TEST_BASE_DIR"></a>

### jy-transform:unit-test:test-transformer~TRANSFORMER_TEST_BASE_DIR : <code>string</code> ℗
Temporary base dir for writer test output.

**Kind**: inner constant of [<code>jy-transform:unit-test:test-transformer</code>](#module_jy-transform_unit-test_test-transformer)  
**Access**: private  
<a name="module_jy-transform_unit-test_test-writer"></a>

## jy-transform:unit-test:test-writer ℗
This unit test suite checks the validity and correctness of Writer module.

**Access**: private  
<a name="module_jy-transform_unit_helper-constants"></a>

## jy-transform:unit:helper-constants : <code>Object</code> ℗
The test suite constants definitions.

**Access**: private  

* [jy-transform:unit:helper-constants](#module_jy-transform_unit_helper-constants) : <code>Object</code> ℗
    * [~TEST_SUITE_DESCRIPTION_UNIT](#module_jy-transform_unit_helper-constants..TEST_SUITE_DESCRIPTION_UNIT) : <code>string</code>
    * [~TEST_SUITE_DESCRIPTION_FUNCTIONAL](#module_jy-transform_unit_helper-constants..TEST_SUITE_DESCRIPTION_FUNCTIONAL) : <code>string</code>
    * [~TEST_DATA_DIR](#module_jy-transform_unit_helper-constants..TEST_DATA_DIR) : <code>string</code> ℗
    * [~EXPECTED_VALUE](#module_jy-transform_unit_helper-constants..EXPECTED_VALUE) : <code>string</code> ℗

<a name="module_jy-transform_unit_helper-constants..TEST_SUITE_DESCRIPTION_UNIT"></a>

### jy-transform:unit:helper-constants~TEST_SUITE_DESCRIPTION_UNIT : <code>string</code>
The unit test suite description for the plugin.

**Kind**: inner constant of [<code>jy-transform:unit:helper-constants</code>](#module_jy-transform_unit_helper-constants)  
**Access**: public  
<a name="module_jy-transform_unit_helper-constants..TEST_SUITE_DESCRIPTION_FUNCTIONAL"></a>

### jy-transform:unit:helper-constants~TEST_SUITE_DESCRIPTION_FUNCTIONAL : <code>string</code>
The unit test suite description for the plugin.

**Kind**: inner constant of [<code>jy-transform:unit:helper-constants</code>](#module_jy-transform_unit_helper-constants)  
**Access**: public  
<a name="module_jy-transform_unit_helper-constants..TEST_DATA_DIR"></a>

### jy-transform:unit:helper-constants~TEST_DATA_DIR : <code>string</code> ℗
The basic test data directory path.

**Kind**: inner constant of [<code>jy-transform:unit:helper-constants</code>](#module_jy-transform_unit_helper-constants)  
**Access**: private  
<a name="module_jy-transform_unit_helper-constants..EXPECTED_VALUE"></a>

### jy-transform:unit:helper-constants~EXPECTED_VALUE : <code>string</code> ℗
An expected value from source files.

**Kind**: inner constant of [<code>jy-transform:unit:helper-constants</code>](#module_jy-transform_unit_helper-constants)  
**Access**: private  
<a name="module_jy-transform_unit_logger"></a>

## jy-transform:unit:logger : <code>Object</code> ℗
The test suite logger.

**Access**: private  

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

**Kind**: inner constant of [<code>jy-transform:unit:logger</code>](#module_jy-transform_unit_logger)  
**Access**: private  
<a name="module_jy-transform_unit_logger..TEST_TMP_DIR"></a>

### jy-transform:unit:logger~TEST_TMP_DIR : <code>string</code> ℗
A temporary test directory.

**Kind**: inner constant of [<code>jy-transform:unit:logger</code>](#module_jy-transform_unit_logger)  
**Access**: private  
<a name="module_jy-transform_unit_logger..winstonFileOptions"></a>

### jy-transform:unit:logger~winstonFileOptions : <code>Object</code> ℗
Options for winston file logging.

**Kind**: inner constant of [<code>jy-transform:unit:logger</code>](#module_jy-transform_unit_logger)  
**Access**: private  
<a name="module_jy-transform_unit_logger..winstonFileOptions.timestamp"></a>

#### winstonFileOptions.timestamp() ⇒ <code>string</code>
Formats the timestamp as [Date](Date) ISO string prefixed by an indent.

**Kind**: static method of [<code>winstonFileOptions</code>](#module_jy-transform_unit_logger..winstonFileOptions)  
**Returns**: <code>string</code> - - The [Date](Date) ISO string.  
**See**: #INDENT  
<a name="module_jy-transform_unit_logger..winstonConsoleOptions"></a>

### jy-transform:unit:logger~winstonConsoleOptions : <code>Object</code> ℗
Options for winston console logging.

**Kind**: inner constant of [<code>jy-transform:unit:logger</code>](#module_jy-transform_unit_logger)  
**Access**: private  
<a name="module_jy-transform_unit_logger..winstonConsoleOptions.timestamp"></a>

#### winstonConsoleOptions.timestamp() ⇒ <code>string</code>
Overwrites the timestamp by indent.

**Kind**: static method of [<code>winstonConsoleOptions</code>](#module_jy-transform_unit_logger..winstonConsoleOptions)  
**Returns**: <code>string</code> - - The indent only.  
**See**: #INDENT  
<a name="module_jy-transform_unit_logger..logger"></a>

### jy-transform:unit:logger~logger
The winston logger.

**Kind**: inner constant of [<code>jy-transform:unit:logger</code>](#module_jy-transform_unit_logger)  
**Access**: protected  
<a name="module_jy-transform_unit_logger..formatter"></a>

### jy-transform:unit:logger~formatter(options) ⇒ <code>string</code> ℗
This function formats the log string by given options to log.

**Kind**: inner method of [<code>jy-transform:unit:logger</code>](#module_jy-transform_unit_logger)  
**Returns**: <code>string</code> - The log string.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The formatter options. |

<a name="module_jy-transform_test-unit_index"></a>

## jy-transform:test-unit:index ℗
This unit test module tests the correct exporting from _./index.js_.

**Access**: private  
<a name="module_jy-transform_test-unit_serialize-utils"></a>

## jy-transform:test-unit:serialize-utils ℗
This unit test suite checks the validity and correctness of JS serialization utility methods.

**Access**: private  
<a name="module_jy-transform_test-unit_test-joi-extension-file-utils"></a>

## jy-transform:test-unit:test-joi-extension-file-utils ℗
This unit test module tests validation FS helper method.

**Access**: private  
<a name="module_jy-transform_unit-test_test-joi-extensions-identifier-utils"></a>

## jy-transform:unit-test:test-joi-extensions-identifier-utils ℗
This unit test suite checks validity and correctness of ES6 identifiers.

**Access**: private  
<a name="module_jy-transform_unit-test_test-options-schema-utils"></a>

## jy-transform:unit-test:test-options-schema-utils ℗
This unit test suite checks the validity and correctness of options schema helper methods.

**Access**: private  
<a name="module_jy-transform_unit-test_test-options-schema"></a>

## jy-transform:unit-test:test-options-schema ℗
This unit test suite checks the validity and correctness of options schema.

**Access**: private  

* [jy-transform:unit-test:test-options-schema](#module_jy-transform_unit-test_test-options-schema) ℗
    * [~expectOptionsValidationError(invalidOptions, schema)](#module_jy-transform_unit-test_test-options-schema..expectOptionsValidationError) ℗
    * [~expectOptionsValidationSuccess(validOptions, schema)](#module_jy-transform_unit-test_test-options-schema..expectOptionsValidationSuccess) ℗

<a name="module_jy-transform_unit-test_test-options-schema..expectOptionsValidationError"></a>

### jy-transform:unit-test:test-options-schema~expectOptionsValidationError(invalidOptions, schema) ℗
Expect a `ValidationError` for a given options function.

**Kind**: inner method of [<code>jy-transform:unit-test:test-options-schema</code>](#module_jy-transform_unit-test_test-options-schema)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| invalidOptions | [<code>ReadOptions</code>](#ReadOptions) \| [<code>WriteOptions</code>](#WriteOptions) | The options which potentially produce the error. |
| schema | <code>Schema</code> | The validation schema. |

<a name="module_jy-transform_unit-test_test-options-schema..expectOptionsValidationSuccess"></a>

### jy-transform:unit-test:test-options-schema~expectOptionsValidationSuccess(validOptions, schema) ℗
Expect a validation success for a given options.

**Kind**: inner method of [<code>jy-transform:unit-test:test-options-schema</code>](#module_jy-transform_unit-test_test-options-schema)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| validOptions | [<code>ReadOptions</code>](#ReadOptions) \| [<code>WriteOptions</code>](#WriteOptions) | The options which should be correct. |
| schema | <code>Schema</code> | The validation schema. |

<a name="readYamlFromfile"></a>

## readYamlFromfile ⇒ <code>Object</code> ℗
Reads YAML from file.

**Kind**: global variable  
**Returns**: <code>Object</code> - The read JS object from YAML file.  
**Throws**:

- <code>Error</code> When any I/O error occurs while the source file.

**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | The YAML file source. |

<a name="mkdirAndWrite"></a>

## mkdirAndWrite ℗
Ensures that all dirs exists for file type `dest` and writes the JS object to file.

**Kind**: global variable  
**Access**: private  
**See**

- [TYPE_YAML](TYPE_YAML)
- [TYPE_JSON](TYPE_JSON)
- [TYPE_JS](TYPE_JS)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>string</code> |  | The object to write into file. |
| dest | <code>string</code> |  | The file destination path. |
| target | <code>string</code> |  | The target type, one of [ 'yaml' | 'json' | 'js' ]. |
| [forceOverwrite] | <code>boolean</code> | <code>false</code> | Forces overwriting the destination file if `true`. |

<a name="readJsOrJsonFromFile"></a>

## readJsOrJsonFromFile ⇒ <code>Promise.&lt;string&gt;</code> ℗
Writes a serialized object to file.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;string&gt;</code> - Containing the write success message to handle by caller (e.g. for logging).  
**Throws**:

- <code>Error</code> If serialized JSON file could not be written due to any reason.

**Access**: private  
**See**

- [TYPE_YAML](TYPE_YAML)
- [TYPE_JSON](TYPE_JSON)
- [TYPE_JS](TYPE_JS)


| Param | Type | Description |
| --- | --- | --- |
| object | <code>string</code> | The object to write into file. |
| dest | <code>string</code> | The file destination path. |
| target | <code>string</code> | The target type, one of [ 'yaml' | 'json' | 'js' ]. |
| [forceOverwrite] | <code>boolean</code> | Forces overwriting the destination file if `true`. |

<a name="assertTransformSuccess"></a>

## assertTransformSuccess ℗
Helper method which asserts the successful transformation.

**Kind**: global variable  
**Access**: private  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | [<code>TransformOptions</code>](#TransformOptions) |  | The transformation options. |
| [es6] | <code>boolean</code> | <code>true</code> | Whether to use ES6 syntax. |

<a name="assertYamlTransformSuccess"></a>

## assertYamlTransformSuccess
Helper method which asserts the successful transformation.

**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The transformation options. |

<a name="transformFunc"></a>

## transformFunc
Transformation middleware changing value for `foo` property.

**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | To transform. |

<a name="assertTransformSuccess"></a>

## assertTransformSuccess
Helper method which asserts the successful transformation.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The transformation options. |
| [es6] | <code>boolean</code> | <code>true</code> | Whether to use ES6 syntax. |

<a name="assertYamlTransformSuccess"></a>

## assertYamlTransformSuccess
Helper method which asserts the successful transformation.

**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The transformation options. |

<a name="_jsYaml"></a>

## _jsYaml ⇒ <code>Object</code> ℗
Creates the options from the given transform function, source and destination path parameters.

**Kind**: global variable  
**Returns**: <code>Object</code> - The options object.  
**Access**: private  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> |  | The source path. |
| dest | <code>string</code> |  | The destination path. |
| [func] | <code>\*</code> | <code>transformFunc</code> | The transform function. |

<a name="fsPromisified"></a>

## fsPromisified ℗
Promisified `fs` module.

**Kind**: global constant  
**Access**: private  
<a name="fsPromisified"></a>

## fsPromisified ℗
Promisified `fs` module.

**Kind**: global constant  
**Access**: private  
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

<a name="external_joi"></a>

## joi ℗
Hapi.js Joi.

**Kind**: global external  
**Access**: private  
**See**: [Hapi Joi](https://github.com/hapijs/joi)  

* [joi](#external_joi) ℗
    * [.ValidationError](#external_joi.ValidationError)
    * [.Schema](#external_joi.Schema) ℗
    * [.Extension](#external_joi.Extension) ℗
    * [.validate](#external_joi.validate) : <code>function</code> ℗

<a name="external_joi.ValidationError"></a>

### joi.ValidationError
Joi validation error.

**Kind**: static typedef of [<code>joi</code>](#external_joi)  
**Access**: public  
**See**: [Joi errors](hhttps://github.com/hapijs/joi/blob/v10.2.0/API.md#errors)  
<a name="external_joi.Schema"></a>

### joi.Schema ℗
The validation schema. Can be a [joi](#external_joi) type object or a plain object
where every key is assigned a [joi](#external_joi) type object.

**Kind**: static typedef of [<code>joi</code>](#external_joi)  
**Access**: private  
**See**: [Joi API](https://github.com/hapijs/joi/blob/v10.2.2/API.md#joi)  
<a name="external_joi.Extension"></a>

### joi.Extension ℗
Hapi.js Joi schema extension.

**Kind**: static typedef of [<code>joi</code>](#external_joi)  
**Access**: private  
**See**: [Hapi Joi Extension](https://github.com/hapijs/joi/blob/v10.2.2/API.md#extendextension)  
<a name="external_joi.validate"></a>

### joi.validate : <code>function</code> ℗
Joi `validate` method.

**Kind**: static typedef of [<code>joi</code>](#external_joi)  
**Access**: private  
**See**: [Joi.validate](https://github.com/hapijs/joi/blob/master/API.md#validatevalue-schema-options-callback)  
