.PHONY: test clean readme

.DEFAULT_GOAL:=help

build: ## Babel transpiles files from _./src_ to _./lib_.
	@printf "Transpiling files from ./src to ./lib (babel)...\n"
	npm run build

install: ## Installs all modules
	@printf "Install all modules...\n"
	npm install

clean: ## Removes generated files in folders ./node_modules, ./lib and ./coverage"
	@printf "Removing ./lib, ./node_modules, ./lib and ./coverage...\n"
	rm -rf lib
	rm -rf node_modules
	rm -rf coverage

test: build ## Runs the test suite, ESLint and a [Node Security Plattform](https://nodesecurity.io/opensource) check.
	@printf "Running test suite, ESLint and NSP...\n"
	npm test
	npm run eslint
	npm run nsp

inch: build ## Runs [inch](https://github.com/rrrene/inchjs) for api-docs check. **NOTE: due to some bug in inch it does not work at the moment!**
	@printf "Running inch to check api-docs status...\n"
	npm run inch

nsp: ## Runs an [Node Security Plattform](https://nodesecurity.io/opensource) check.
	@printf "Running NSP check...\n"
	npm run nsp

readme: ## Creates all the documentation parts of the project: _README.md_, _MAKE.md_, _PACKAGE.md_ and _API.md_ (the latter based on [JSDoc](http://usejsdoc.org/)).
	@printf "Create documentation...\n"
	npm run readme

publish: test readme ## Publishes module to NPM registry.
	@printf "Publish module to NPM repo...\n"
	npm publish

eslint: ## Runs ESLint.
	@printf "Running ESLint...\n"
	npm run eslint

help: ## Prints the help about targets.
	@printf "Usage:    make [\033[34mtarget\033[0m]\n"
	@printf "Default:  \033[34m%s\033[0m\n" $(.DEFAULT_GOAL)
	@printf "Targets:\n"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf " \033[34m%-14s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort
