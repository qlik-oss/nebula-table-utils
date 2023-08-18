#!/bin/bash -l

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc

echo "//npm.pkg.github.com/:_authToken=$GH_TOKEN" >> ~/.npmrc
echo "//npm.pkg.github.com/:always-auth=true" >> ~/.npmrc

cat ~/.npmrc
