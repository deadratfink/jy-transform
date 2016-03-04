# jy-transform 

This project aims to transform *.yaml files to .js or *.json files or vice-versa via CLI or APi.

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install jy-transform --global
```


## Tests

```sh
npm install
npm test
```

## Dependencies

- [bluebird](https://github.com/petkaantonov/bluebird): Full featured Promises/A+ implementation with exceptionally good performance
- [cli](https://github.com/chriso/cli): A tool for rapidly building command line apps
- [js-yaml](https://github.com/nodeca/js-yaml): YAML 1.2 parser and serializer
- [mkdirp-then](https://github.com/fs-utils/mkdirp-then): mkdirp as promised
- [serialize-js](https://github.com/RReverser/serialize-js): User-readable object serialization for JavaScript.

## Dev Dependencies

- [jsdoc-parse](https://github.com/jsdoc2md/jsdoc-parse): Jsdoc-annotated source code in, JSON format documentation out.
- [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown): jsdoc-annotated source in, markdown API docs out.
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [package-json-to-readme](https://github.com/zeke/package-json-to-readme): Generate a README.md from package.json contents


## License

MIT, SEE LICENSE IN [LICENSE.md](https://github.com/deadratfink/jy-transform/blob/master/LICENSE)

# Documentation

Why this module? After struggling with some huge YAML file and accidentally 
occurring wrong indentions which results in an annoying failure investigation, 
I decided to get rid of the YAML file and therefore, create a module which 
should be aimed as the swiss army knife for transforming YAML, JS and JSON 
files into each other.  

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

```sh
$ jyt --help
```

This prints you an overview about all available properties:

```sh
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

### Usage With API Calls

TODO...
# API Docs

## Classes

<dl>
<dt><a href="#Constants">Constants</a></dt>
<dd></dd>
<dt><a href="#Transformer">Transformer</a></dt>
<dd></dd>
</dl>

<a name="Constants"></a>
## Constants
**Kind**: global class  

* [Constants](#Constants)
    * [new Constants()](#new_Constants_new)
    * [.YAML](#Constants+YAML) : <code>string</code>
    * [.JSON](#Constants+JSON) : <code>string</code>
    * [.JS](#Constants+JS) : <code>string</code>
    * [.TYPES](#Constants+TYPES) : <code>Array.&lt;string&gt;</code>
    * [.DEFAULT_OPTIONS](#Constants+DEFAULT_OPTIONS) : <code>Object</code>

<a name="new_Constants_new"></a>
### new Constants()
Constructs the constants.

**Returns**: <code>[Constants](#Constants)</code> - the instance  
<a name="Constants+YAML"></a>
### constants.YAML : <code>string</code>
The 'yaml' type constant.

**Kind**: instance property of <code>[Constants](#Constants)</code>  
<a name="Constants+JSON"></a>
### constants.JSON : <code>string</code>
The 'json' type constant.

**Kind**: instance property of <code>[Constants](#Constants)</code>  
<a name="Constants+JS"></a>
### constants.JS : <code>string</code>
The 'js' type constant.

**Kind**: instance property of <code>[Constants](#Constants)</code>  
<a name="Constants+TYPES"></a>
### constants.TYPES : <code>Array.&lt;string&gt;</code>
The type constants.

**Kind**: instance property of <code>[Constants](#Constants)</code>  
<a name="Constants+DEFAULT_OPTIONS"></a>
### constants.DEFAULT_OPTIONS : <code>Object</code>
The default options.

**Kind**: instance property of <code>[Constants](#Constants)</code>  
<a name="Transformer"></a>
## Transformer
**Kind**: global class  

* [Transformer](#Transformer)
    * [new Transformer(options, logger)](#new_Transformer_new)
    * [.writeJson(json)](#Transformer+writeJson)
    * [.writeJs(json)](#Transformer+writeJs)
    * [.write(serializedJson)](#Transformer+write)
    * [.yamlToJs()](#Transformer+yamlToJs)
    * [.jsToYaml(middleware)](#Transformer+jsToYaml)

<a name="new_Transformer_new"></a>
### new Transformer(options, logger)
Constructs the transformer with options and an (optional) logger.

**Returns**: <code>[Transformer](#Transformer)</code> - the instance  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | the transformation options |
| logger | <code>logger</code> &#124; <code>cli</code> &#124; <code>console</code> | (optional) logger, default is <tt>console</tt> |

<a name="Transformer+writeJson"></a>
### transformer.writeJson(json)
Writes a JSON object to a *.json file.

**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | the JSON to write into *.json file |

<a name="Transformer+writeJs"></a>
### transformer.writeJs(json)
Writes a JSON object to a *.js file.

**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | the JSON to write into *.js file |

<a name="Transformer+write"></a>
### transformer.write(serializedJson)
Writes a serialized JSON object to file.

**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| serializedJson | <code>string</code> | the JSON string to write into file |

<a name="Transformer+yamlToJs"></a>
### transformer.yamlToJs()
Convert YAML file to JSON/JS file.

**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Access:** public  
<a name="Transformer+jsToYaml"></a>
### transformer.jsToYaml(middleware)
Convert JSON/JS file to YAML file.

**Kind**: instance method of <code>[Transformer](#Transformer)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| middleware | <code>function</code> | this middleware Promise can be used to intercept        the JSON object and inject transformations, the function signature is:        <p>        <tt>function(json)</tt>        </p>        The Promise has to return the processed JSON! |

