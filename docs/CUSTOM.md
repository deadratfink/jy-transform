# Documentation

Why this module? After struggling with some huge YAML file and accidentally 
occurring wrong indentions which results in an annoying failure investigation, 
I decided to get rid of the YAML file and therefore, create a module which 
should be aimed as the swiss army knife for transforming YAML, JS and JSON 
files into each other.

The module is fully [Promise](http://bluebirdjs.com/docs/api-reference.html) 
based!

## Use Cases

The transformation can take place into several directions:

- YAML -> JS
- YAML -> JSON
- JS   -> YAML (work in progress)
- JSON -> YAML (work in progress) 
- JS   -> JSON (planned) 
- JSON -> JS (planned)      

While:

- YAML = *.yaml
- JS   = *.js   (JSON object)  
- JSON = *.json (JSON serialized)


## Usage

The module can be used in two different ways:

- On CLI (recommended install globally `-g`)
- Via API (install locally)

### Usage On CLI

After the global installation you can access the Transformer command options as follows:

```
$ jyt --help
```

This prints you an overview about all available properties:

```
$ jyt --help
Usage:
  jyt [OPTIONS]

Options: 
  -t, --target STRING    The conversion target: [ js | json | yaml ]
  -s, --src PATH         The absolute/relative input file path
  -d, --dest [PATH]      The absolute/relative output file path (Default is relative to input file.)
  -i, --indent [NUMBER]  The indention for pretty print (0 - 8) (Default is 4)
  -k, --no-color         Omit color from output
      --debug            Show debug information
  -v, --version          Display the current version
  -h, --help             Display help and usage details

```

Let's assume we have a YAML file located in _./data/my.yaml_ holding this data

```yaml
myproperty: old value
```

we can transform it to a JSON file _./data/my.json_:

```javascript
{
  "myproperty": "new value"
}
```

using this command:

```
$ jyt -s ./data/my.yaml -t json -i 2
```

Here we have overwritten the standard target type (which is 'js') and applying an
indent of 2 instead of the default 4. As default the output file is written relative 
to the input file (`dest` option is missing here). 

### Usage As a library (API Calls)

Since the usage on CLI is a 2-step process:

1. Read file in -> 2. Write out (to another type)

the direct API calls additionally provide the usage of a middleware function 
where you can alter the input JSON object before it is put out which turns 
this into a 3-step process:
 
1. Read file in -> 2. Alter the JSON -> 3. Write out (to another type) 

The main transformation methods are the following:

```javascript
function yamlToJs(middleware)
function jsToYaml(middleware)
```

### Using Middleware

The `middleware` is optional but if provided it must be of type `Function` and 
a Promise. One of the easiest is the identify function _f(data) -> data_ which 
could be expressed as Promise function as shown:

```javascript
var middleware = function (json) {
    return Promise.resolve(json);
}
```

Of course, his would have no effect on the provided JSON data. Actually, this one is 
used internally when no middleware is provided to ensure the proper promisified 
control flow.

OK, lets go back to a more practical example, e.g. we want to alter the value of
JSON property before it is written to a file. Assuming we have this piece of YAML
object as input:

```javascript
myproperty: old value
```

Applying this Promise as middleware

```javascript
var middleware = function (json) {
    json.myproperty = 'new value'; 
    return Promise.resolve(json);
}
```
will result in such JSON file:

```javascript
{
	"myproperty": "new value"
}
```

Following this you can do everything with the JSON object, like

- deleting properties
- changing properties to other types
- validating and throwing error if not valid
- ...

Whatever, but keep it valid when transforming ;-)

## Injecting Logger

Optionally, the constructor accepts a logger object.

```javascript
var options = {...}
var logger = ...;

var transformer = new Transformer(options, logger);
...
``

At least, this passed logger object should support the following functions:

```javascript
function info(msg)
function debug(msg)
function error(msg)
function fatal(msg) // wishfully, but not mandatory
```

TODO...
