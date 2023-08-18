#!/bin/bash -l

echo "//registry.npmjs.org/:_authToken=$NPM_CI_TOKEN" >> ~/.npmrc

echo "//npm.pkg.github.com/:_authToken=$GH_TOKEN" >> ~/.npmrc
echo "//npm.pkg.github.com/:always-auth=true" >> ~/.npmrc
echo "@qlik-oss:registry=https://npm.pkg.github.com/" >> ~/.npmrc
cat ~/.npmrc
