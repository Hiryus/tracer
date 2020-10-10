#!/bin/bash

if [ -z "$(git status package.json --porcelain=v2)" ]; then
    echo "No package update available (major versions not tested)."
else
    echo "Dependencies update detected, committing changes..."
	git config --global user.name "update-bot"
	git config --global user.email "<>"
    git add package.json package-lock.json
    git commit -m "chore(deps): dependencies update [skip ci]"
fi
