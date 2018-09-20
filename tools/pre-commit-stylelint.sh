#!/bin/bash
files=$(git diff --name-only HEAD | grep '\.css$')

# Prevent ESLint help message if no files matched
if [[ $files = "" ]] ; then
    exit 0
fi

failed=0
for file in ${files}; do
    git show :$file | ./node_modules/.bin/stylelint $file
    if [[ $? != 0 ]] ; then
        failed=1
    fi
done;

if [[ $failed != 0 ]] ; then
    echo "🚫    Stylelint failed, git commit denied!"
    exit $failed
fi

