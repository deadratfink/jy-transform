#!/bin/bash

api="true"
package="true"
changelog="true"
license="true"
env="false"
makefile="true"

while [[ $# -gt 1 ]]; do
  key="$1"

  case $key in
    -a|--api)
    api="$2"
    shift # past argument
    ;;
    -p|--package)
    package="$2"
    shift # past argument
    ;;
    -c|--changelog)
    changelog="$2"
    shift # past argument
    ;;
    -l|--license)
    license="$2"
    ;;
    -e|--env)
    env="$2"
    ;;
    -m|--makefile)
    makefile="$2"
    ;;
    *)
            # unknown option
    ;;
  esac
  shift
done

###############################################################################
# PACKAGE.md
###############################################################################

if [ "$package" == "true" ]; then
  printf "Create documentation (PACKAGE.md)\n"
  touch PACKAGE.md
  node node_modules/.bin/package-json-to-readme --no-footer package.json > PACKAGE.md
  cat readme/LOGO.md >> README.md
  printf "\n\n" >> README.md
  head -12 PACKAGE.md > README.md
  printf "\n\n" >> README.md
else
  # to ensure that the README.md is always empty at the beginning
  printf "" > README.md
fi

###############################################################################
# README.md
###############################################################################

cat readme/BADGES.md >> README.md

printf "<!-- START doctoc -->\n<!-- END doctoc -->\n\n" >> README.md
cat readme/DOCUMENTATION.md >> README.md
printf "\n\n" >> README.md

if [[ "$package" == "true" ]] || [[ "$api" == "true" ]] || [[ "$env" == "true" ]] || ([[ -f "$MAKE_FILE" ]] && [[ "$makefile" == "true" ]]); then
  printf "## Further information" >> README.md
  printf "\n\n" >> README.md
fi

if [ "$package" == "true" ]; then
  printf -- "- [Module Details](./PACKAGE.md)" >> README.md
  printf "\n\n" >> README.md
fi

###############################################################################
# API-PUBLIC.md
###############################################################################

if [ "$api" == "true" ]; then
  printf "Create documentation (API-PUBLIC.md)\n"
  touch API-PUBLIC.md
  node node_modules/.bin/jsdoc2md --no-cache --configure .jsdoc.json . > API-PUBLIC.md

  printf -- "- [Public Api Reference](./API-PUBLIC.md)" >> README.md
  printf "\n\n" >> README.md
fi

###############################################################################
# API-PRIVATE.md
###############################################################################

if [ "$api" == "true" ]; then
  printf "Create documentation (API-PRIVATE.md)\n"
  touch API-PRIVATE.md
  node node_modules/.bin/jsdoc2md --no-cache --private --configure .jsdoc.json . > API-PRIVATE.md

  printf -- "- [Private Api Reference](./API-PRIVATE.md)" >> README.md
  printf "\n\n" >> README.md
fi

###############################################################################
# MAKE.md
###############################################################################

MAKE_FILE=Makefile

if [[ -f "$MAKE_FILE" ]] && [[ "$makefile" == "true" ]]; then
  printf "Create documentation (MAKE.md)\n"

  printf "Target Call | Description | Dependencies\n---|---|---\n" > MAKE.md

  # find out what is the default goal (if set)
  DEFAULT_TARGET=$(awk 'BEGIN {FS = "^.DEFAULT_GOAL :=|^.DEFAULT_GOAL:= |^.DEFAULT_GOAL:="} /^.DEFAULT_GOAL.*/ {printf $2}' $MAKE_FILE | sed "s/ //g")
  if [ ! -z "$DEFAULT_TARGET" ]; then
     printf "  - Print default target: ${DEFAULT_TARGET}\n"
     printf "\`$ make\` | This calls the default target \`${DEFAULT_TARGET}\`. |\n" >> MAKE.md
  else
     printf "  - No default target found\n"
  fi

  # take care of all other targets
  printf "  - Print all targets"
  awk 'BEGIN {FS = ": |## "} /^[a-zA-Z_-]+:.*?## / {printf "\`$ make %s\` | %s | `%s`\n", $1, $3, $2}' Makefile | sed "s/| \`\`$/|/g" | sed "s/ \`$/\`/g"| sort  >> MAKE.md

  printf -- "- [Makefile Reference](./MAKE.md)" >> README.md
  printf "\n\n" >> README.md
fi

###############################################################################
# ENV.md
###############################################################################

if [ "$env" == "true" ]; then
  printf "Create documentation (ENV.md)\n"

  touch ENV.md
  babel-node node_modules/.bin/cfg-combined markdown > ENV.md

  printf -- "- [Environment Reference](./ENV.md)" >> README.md
  printf "\n\n" >> README.md
fi

###############################################################################
# Finalize README.md
###############################################################################

if [ "$changelog" == "true" ]; then
  cat readme/CHANGELOG.md >> README.md
  printf "\n\n" >> README.md
fi

if [ "$license" == "true" ]; then
  printf "## License\n\n" >> README.md
  cat LICENSE.md >> README.md
fi

###############################################################################
# Create the TOC in README.md
###############################################################################

node node_modules/.bin/doctoc README.md --github --title "## TOC" --maxlevel 2
