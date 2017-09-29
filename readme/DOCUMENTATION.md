## API in a Minute

### Transform from Source to Destination

```javascript
import { transform } from 'jy-transform';

const options = {
  src: 'foo/bar.yaml',            // E.g. read from YAML file...
  transform: async (object) => {  // ...with exchanging value...
    object.foo = 'new value';
    return object;
  },                            
  dest: 'foo/bar.json',           // ...to a new JSON file.
  indent: 4,                      // Ensure an indentation of 4.
};

// ---- Promise style:

transform(options)
  .then(console.log)
  .catch(console.error);


// ---- async/await style:

try {
  const msg = await transform(options);  // Transform, of course, inside an async.
  console.log(msg);                      // Success message!
} catch (err) {                          // Oops!
  console.error(err);
}
```

### Read into JS object from particular Source (File, Stream or JS Object)

```javascript
import { read } from 'jy-transform';

const options = { src: 'foo/bar.yaml' };  // E.g. read from file.

// ---- Promise style:

read(options)
  .then((object) => console.log(JSON.stringify(object))) // Print read object.
  .catch(console.error);

// ---- async/await style:

try {
  const object = await read(options);
  console.log(JSON.stringify(object));    // Print read object.
} catch (err) {
  console.error(err);
}
```

### Write JS object to particular Destination

```javascript
import { write } from 'jy-transform';

const options = { dest: 'foo/bar.yaml' }; // E.g. write to file.

// ---- Promise style:

write(object, options)
  .then(console.log)                      // Print write success message.
  .catch(console.error);

// ---- async/await style:

try {
  const msg = await write(object, options);
  console.log(msg);                      // Print write success message.
} catch (err) {
  console.error(err);
}
```

## CLI in 3 Seconds

### File Transformation

E.g. transform YAML content file to a JSON file with an indention of 4:

```text
$ jyt foo/bar.yaml -t json -i 4
```

## Why This Module?

After struggling with some huge YAML file and accidentally
occurring wrong indentations which results in an annoying investigation hell,
I decided to get rid of the YAML file and therefore, create a module which
should be aimed as the swiss army knife for transforming YAML, JS and JSON
types into each other format.

## Usage

The module can be used on CLI or as API (the latter is fully
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)/`async` based).

### Usage Types

Since the module can be used in two different ways, use installation as follows:

- CLI: install globally via `-g` option
- API: install locally

Both usage types are described in more detail in the following sections.

### Use Cases

So, what are the typical use cases for this module? In terms of _transformation_
these consists of different phases:

  1. Reading from source
  2. Transforming JSON objects or apply dedicated actions on the intermediate JSON objects
  3. Writing to a destination

#### Read Case

Reading from a file:

- _*.yaml_
- _*.js_
- _*.json_

Additionally, on API level from:

- `stream.Readable`:
   - Contains serialized JS, JSON or YAML
   - If not a file stream then setting requires `options.origin` property is mandatory
   - Reads as UTF-8
- JS `object`:
   - Actually, this means the reading phase is "skipped", because object is in-memory already
   - Of course, this case _cannot_ not be applied to serialized JSON or YAML content

#### Transformation Case

The _transformation_ is usually a format change, but can also be refer to content changes on the
intermediate JS object, the latter with the help of a configured `transform` callback function.
All possible directions are:

- YAML ⇒ JS
- YAML ⇒ JSON
- JS   ⇒ YAML
- JSON ⇒ YAML
- JS   ⇒ JSON
- JSON ⇒ JS
- YAML ⇒ YAML
- JSON ⇒ JSON
- JS   ⇒ JS

while:

- [YAML](http://http://yaml.org/) = _*.yaml_, _*.yml_
- [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) = _*.js_ (JS object)
- [JSON](http://json.org) = _*.json_ (JS object serialized as JSON)

As mentioned above the configured `transform` callback can apply particular actions on the intermediate JS object, but
this is an optional part for [transformation](#transformation) phase.

#### Write Case

Writing to a file:

- _*.yaml_
- _*.js_
- _*.json_

Additionally, on API level to:

- `stream.Writable`:
   - Serialized JS, JSON and YAML
   - Requires `options.target` property set
   - Writes UTF-8
- JS `object`:
   - JS as a simple reference
   - YAML and JSON as a serialized string

### Origin and Target Type Inference

This module supports automatic type inference from file extensions as shown by the following table (from-to):

| File Extension | Type |
| --- | --- |
| _*.yaml_ | _yaml_ |
| _*.yml_ | _yaml_ |
| _*.js_ | _js_ |
| _*.json_ | _json_ |

> **NOTE:** if you have files without an extension or e.g. _*.txt_ you _have_ to specify the origin or target type!

### Limitations

- Since this module is build to transform from and to different type formats, any
  `Function`s residing in JS type objects are _not_ supported, e.g. transforming
  
  ```javascript
  module.exports = {
    fooKey: 'foo',
    fooFunction: function foo() {
        //...
    }
  }
  ```
  
  to JSON would simply result in
  
  ```json
  {
    "fooKey": "foo"
  }
  ```
  
  while transforming to YAML type would even result in an `Error`, e.g. printed
  on CLI usage like this:
  
  ```
  ERROR: YAMLException: unacceptable kind of an object to dump [object Function]
  ```
  
- Multidocument handling would be a cool feature which refers in general to YAML
  and JS only, but at the moment we require that each document to transform is a
  _single_ one per source (or in case of JS could be identified)! This feature is
  planned and reflected in [#14](https://github.com/deadratfink/jy-transform/issues/14).

### CLI Usage

The CLI provides the `jyt` command which requires the use of some options.
After the global installation you can access the command options
with the usual `--help` option which prints an overview about all
available CLI properties:

```
$ jyt --help
Usage:
  jyt.js INPUT-FILE [OUTPUT-FILE] [OPTIONS]

Options:
  -o, --origin [STRING]  The origin type of INPUT-FILE: [ js | json | yaml ]. (Default is if not given, the type is tried to be inferred from the extension of source path, else it is 'yaml')
  -t, --target [STRING]  The target type of OUTPUT-FILE: [ js | json | yaml ]. (Default is if not given, the type is tried to be inferred from the extension of destination path, else it is 'js')
  -i, --indent [NUMBER]  The indentation for pretty-print: 1 - 8. (Default is 4)
  -f, --force            Force overwriting of existing output files on write phase. When files are not overwritten (which is default),
                         then the next transformation with same output file name gets a consecutive number on the base file name, e.g. in
                         case of foo.yaml it would be foo(1).yaml.
  -m, --imports STRING   Define a 'module.exports[.identifier] = ' identifier (to read from JS _source_ file only, must be a valid JS
                         identifier!).
  -x, --exports STRING   Define a 'module.exports[.identifier] = ' identifier (for usage in JS destination file only, must be a valid JS
                         identifier!).
  -k, --no-color         Omit color from output
      --debug            Show debug information
  -v, --version          Display the current version
  -h, --help             Display help and usage details
```

#### CLI Args

The ARGS are more formally defined in the following table:

| Arg | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
| `INPUT-FILE` | URI | The source file path for transformation. | - | yes |
| `OUTPUT-FILE` | URI | The destination file path to transform to. | When this options is omitted then the output file is stored relative to the input file (same base name but with another extension if type differs). If input and output type are the same then the file overwriting is handled depending on the `--force` value! | no |

> **NOTE:** the _input file_ has to be specified and should be _first_ argument (in fact, it can be
> anywhere but it must be _before_ an _output file_ argument)!

#### CLI Options

The OPTIONS are more formally defined in the following table:

| Option (short) | Option (long) | Type | Description | Default | Required |
| --- | --- | --- | --- | --- | --- |
| `-o` | `--origin` | string of: [ _js_ &#124; _json_ &#124; _yaml_ ]</code> | The transformation origin type. | if not given, the type is tried to be inferred from the extension of source path, else it is _yaml_ | no |
| `-t` | `--target` | string of: [ _js_ &#124; _json_ &#124; _yaml_ ]</code> | The transformation target type. | if not given, the type is tried to be inferred from the extension of destination path, else it is _js_ | no |
| `-i` | `--indent` | integer<br>[ 1 - 8 ]<br> | The code indentation used in destination files. | 2 | no |
| `-f` | `--force` | n/a | Force overwriting of existing output files on write phase. When files are not overwritten (which is default), then the next transformation with same output file name gets a consecutive number on the base file name, e.g. in case of _foo.yaml_ it would be _foo(1).yaml_.  | _false_ | no |
| `-m` | `--imports` | string | Define a 'module.exports[.identifier] = ' identifier (to read from JS _source_ file only, must be a valid JS identifier!) | _undefined_ | no |
| `-x` | `--exports` | string | Define a 'module.exports[.identifier] = ' identifier (for usage in JS _destination_ file only, must be a valid JS identifier!) | _undefined_ | no |
| `-k` | `--no-color` | n/a | Omit color from output. | _color_ | no |
|  n/a | `--debug` | n/a | Show debug information. | _false_ | no |
| `-v` | `--version` | n/a | Display the current version. | n/a | no |
| `-h` | `--help` | n/a | Display help and usage details. | n/a | no |

### Examples

Now we know which properties can be applied on CLI it's time for some examples. Let's assume we
have a YAML content located in _foo.yaml_ holding this data:

```yaml
foo: bar
```
#### Example: YAML ⇒ JSON

Then we can transform it to a JSON content as _foo.json_ file:

```json
{
    "foo": "bar"
}
```

simply by using this command:

```text
$ jyt foo.yaml -t json -i 4
```

In this example we have overwritten the standard _target_ type (which is `js`)
and applying an _indent_ of 4 SPACEs instead of the default (which is 2). As default the output
file _foo.json_ is written relative to the input file (by omitting the
`dest` option here).

> **NOTE:** here you _have_ to provide the target with option `-t json` or else the
> default `js` would have been applied!

If the source would have been a `js` type like in this example

```
$ jyt foo.js -t json -i 4
```

then the `js` value for `origin` is automatically inferred from file extension.
Accordingly, this is also true for the `target` option.

#### Example: JSON ⇒ JS

The command

```text
$ jyt foo.json
```
results in _foo.js_:
```javascript
export default {foo: 'bar'}
```

#### Example: JS ⇒ YAML

The command

```text
$ jyt foo.js -t yaml
```

results in _foo.yaml_:

```yaml
foo: bar
```

#### Example: Transformation with Different Destination

Simply specify the _output_ file with a different file name:

```text
$ jyt foo.json results/foobar.yaml
```

#### Example: Transformation with Unsupported Source File Extension

As said, normally we infer from file extension to the type, but assume the source
file has a file name which does not imply the type (here a JSON
type in a TEXT file), then you can simply provide the `-o` option with the
correct `origin` type:

```text
$ jyt foo.txt foobar.yaml -o json
```

> **NOTE:** of course, the `-t` (`--target`) option works analogous.

#### Example: Read from File with Exports Identifier

It could be that a JS source `exports` several objects and you want to read
from exactly the one you specify, then provide the `-m` (`--imports`) option.

In this this example we have a _foo.js_ file exporting _two_ objects:

```javascript
module.exports.foo = {
  foo: 'bar'
};

module.exports.bar = {
  bar: 'foo'
};
```
but you want to convert only `bar` object, then call:

```text
$ jyt foo.js bar.yaml -m bar
```

to get the YAML result:

```yaml
bar: foo
```

> **NOTE:** the same applies on API level when using JS objects as `dest`:
> 
> ```javascript
> const fooBar = {
>   foo: 'bar',
>   bar: 'foo'
> };
> 
> const options = {
>   src: fooBar,
>   dest: {},
>   exports: 'bar'
> };
>
> //...transform
> ```
> 
> The transformation will result in this in-memory object:
> 
> ```javascript
> bar: {
>   foo: 'bar',
>   bar: 'foo'
> }
> ```
> 
> Of course, as sub-node of `options.dest`.

#### Example: Write Exports Identifier for JS File

Assume you want to generate a JS file with an exports string which gets an
identifier. We reuse the YAML file from above:

```yaml
foo: bar
```

using this command:

```
$ jyt foo.yaml foobar.js -x foobar
```

This generates the following output in JS file using `foobar` as identifier:

```javascript
module.exports.foobar = {
  foo: "bar"
}
```

> **NOTE:** the identifier must be a valid JS identifier accoding to ECMAScript 6
> (see also [Valid JavaScript variable names in ECMAScript 6](https://mathiasbynens.be/notes/javascript-identifiers-es6)
> and [Generating a regular expression to match valid JavaScript identifiers](https://mathiasbynens.be/demo/javascript-identifier-regex)).

#### Example: Force Overwriting

> **IMPORTANT NOTE:** when using this feature then any subsequent execution which
> uses the same target/file name, can _overwrite_ the original source or target created beforehand!

Therefore, this feature is _not_ enabled by default to prevent you from accidentally
overwriting your input source or already generated targets.

But let's say we want to overwrite the original source now because you want
to change the indentation from 2 to 4 SPACEs, then we can do this as follows:

```text
$ jyt foo.js -i 4 -f
```

> **NOTE:** the other way round (i.e. leaving out the `-f` (`--force`)) switch would create a _new file_ relatively to
> the `src` _foo.js_, named as _foo(1).js_; note the consecutive number! Naturally,
> another run of the command would result in a file called _foo(2).js_ and so forth.

### API Usage

Since the usage on CLI is a 2-step process:

 1. Read from source file to JS object ⇒ 
 2. Write out (maybe to other type)

the direct API calls additionally provide the optional usage of a `transform` function
where you can alter the intermediate JS object before it is written and therefore, turns
this into a 3-step process:

 1. Read from source ⇒ 
 2. Transform the JS object ⇒ 
 3. Write out (maybe to other type)

For more details about this and all the functions provided by this module please refer to the
[API Reference](https://github.com/deadratfink/jy-transform/wiki/API-v3).

The `origin` and `target` type inference is also standard for the API level.

#### API Properties

The public `transform` function (that does not mean the optional `transform `callback here!) takes
the necessary `options` for the transformation:

```javascript
async function transform(options)
```

> **HINT:** of course, if you like you can use the `read`and `write` functionality solely besides any transformation needs.

#### Options

For a detailed description see:

- [Read Options](API-PUBLIC.md#readoptions--codeobjectcode)
- [Write Options](API-PUBLIC.md#writeoptions--codeobjectcode)
- [Transform Options](API-PUBLIC.md#transformoptions--codeobjectcode)

##### Example

```javascript
const options = {
  src: 'foo.json',
  origin: 'json', // actually, not needed here, inferred from src's extension automatically!
  dest: './foo/bar.yaml',
  target: 'yaml', // actually, not needed here, inferred from dest's extension automatically!
  indent: 4
}
```

#### Using Transform Callback

The `transform` property is optional but if provided it must be of type `Function` and could but must not be 
a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)/`async`.

- When being a Promise it has to resolve with the `data` object or reject with an `Error` based object.
- In case of normal or `async` function return `data` or throw an `Error`.

One of the easiest ones is the identity function

_f(data) → data_

which could be expressed as follows:

```javascript
const identity = data => data;
```

Of course, this would have no effect on the provided JS data. Actually, this one is
used internally as default when no `transform` function is configured to ensure the proper
control flow.

OK, lets go back to a more practical example, e.g. we want to alter the value of a
JS property before it is written to a file. Assuming we have this piece of YAML
as input from a file called _src.yaml_:

```yaml
foo: old bar
```

Applying this `transform` callback option to the `src` content

```javascript
import { transform } from 'jy-transform';

const options = {
  src: 'src.yaml',
  dest: 'result.json',
  transform: async (data) => {
    data.foo = 'new bar';
    return data;
  }
};

transform(options)
  .then(console.log)
  .catch(console.error);
```

will result in such JSON file content:

```json
{
  "foo": "new bar"
}
```

Of course, in real world scenarios you will have use cases which usually have a
higher complexity where one function might be insufficient or at least
inconvenient. but this does not raise a problem at all, because you can create
several functions to be applied in the whole transformation process by gathering
them in one function.

Let's assume we have some Promise functions to apply. For simplicity reasons we
simulate these for the moment by some functions, each adding a key-value to the
given (initially empty) JS object.

> **NOTE:** each of them has to resolve with the `data` object!

```javascript
const key1 = async (data) => {
  data.key1 = 'value1';
  return data;
};

const key2 = async (data) => {
  data.key2 = 'value2';
  return data;
};

const key3 = async (data) => {
  data.key3 = 'value3';
  return data;
};
```

These can be collected by different aggregation or composition functions of the underlying
Promise framework, e.g. using the [`Promise.all([...])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
function. This one can collect all three functions above and ensure their proper execution:

```javascript
import { transform } from 'jy-transform';

const options = {
  src: {},
  transform: (data) => Promise.all([key1(data), key2(data), key3(data)])
    .then(result => result[result.length - 1])
};

transform(options)
  .then(console.log)
  .catch(console.error);
```

The result in the `transform` function can be retrieved from the returned
array, i.e. in case of [`Promise.all([...])`](http://bluebirdjs.com/docs/api/promise.all.html)
you have to pick the _last_ element which contains the "final product".

From our example above it would be result in this object

```javascript
{
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
}
```

which is passed back to the transformation chain. Following this pattern
you can do almost everything with the JS object, like

- Deleting properties
- Changing properties to other types
- Validating and throwing/resolving with error if not valid
- ...

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, please create an
[issue](https://github.com/deadratfink/jy-transform/issues) or create a PR.
See the wiki [Contributing](https://github.com/deadratfink/jy-transform/wiki/Contributing)
section for more details about conventions.

