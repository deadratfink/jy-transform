#!/usr/bin/env bash

TMP=bin/tmp/
PREPARE_LOG=bin/tmp/release-prepare.log
file="VERSION.txt"
VERSION=$(cat "$file")
current=$(pwd)
echo -e $current
echo -e "Release prepare: $VERSION"
BIN=bin/prepare-release.sh

if [ ! -d "$TMP" ]; then
	mkdir bin/tmp/
else
	rm -Rf bin/tmp/
	mkdir bin/tmp/
fi

#git reset --hard
#git checkout --track origin/master
#git checkout --track origin/development
#export GIT_MERGE_AUTOEDIT=no
#git config gi
# tflow.branch.develop development
#git config gitflow.prefix.versiontag v
#git flow init -fd
#git flow release start $VERSION
#npm --no-git-tag-version version $VERSION
#json -I -o json-4 -f package.json
#git commit -am 'Published $VERSION release branch'
#git flow release publish $VERSION
