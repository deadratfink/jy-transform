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
