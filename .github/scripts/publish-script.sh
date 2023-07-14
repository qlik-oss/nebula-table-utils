#!/bin/bash -l

# make sure we have .d.ts files in our package
DTS=`ls ./dist/** | grep d.ts | wc -l`
echo "# of *.d.ts files is $DTS"
if [[ $DTS -eq 0 ]]; then
  echo "Missing *.d.ts files"
  exit 1
fi

cp ./package.json ./dist
cp ./LICENSE ./dist
cp ./README.md ./dist

# publish
yarn publish ./dist --ignore-scripts