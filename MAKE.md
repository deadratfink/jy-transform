Target Call | Description | Dependencies
---|---|---
`$ make` | This calls the default target `help`. |
`$ make build` | Babel transpiles files from _./src_ to _./lib_. |
`$ make clean` | Removes generated files in folders ./node_modules, ./lib and ./coverage" |
`$ make eslint` | Runs ESLint. |
`$ make help` | Prints the help about targets. |
`$ make install` | Installs all modules |
`$ make publish` | Publishes module to NPM registry. | `test readme`
`$ make readme` | Creates all the documentation parts of the project |
`$ make test` | Runs the test suite and ESLint. |
