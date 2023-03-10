#!/bin/bash

# for each directory in the current directory
for dir in $(ls -d */)
do
    # go into the directory
    cd $dir
    # run npm install and npm run publish
    npm install
    version=$(node -p "require('./package.json').he3.version")
    id=$(node -p "require('./package.json').he3.id")
    currentVersion=$(curl -s https://api.test.he3.app/api/v1/hub/tool/$id/currentVersion | jq -r '.currentVersion')
    if [ "$version" != "$currentVersion" ]; then
        npm run publish --token $HE3_TOKEN
    fi
    cd ..
done