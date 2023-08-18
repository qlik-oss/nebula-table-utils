#!/bin/bash -l

# make sure we have .d.ts files in our package
DTS=`ls ./lib/** | grep d.ts | wc -l`
echo "# of *.d.ts files is $DTS"
if [[ $DTS -eq 0 ]]; then
  echo "Missing *.d.ts files"
  exit 1
fi

# move everything into /lib/lib based on pkg structure
mkdir __temp__
mv lib/* __temp__
rm -rf lib
mkdir -p lib/lib
mv __temp__/* ./lib/lib
rm -rf __temp__

cp ./package.json ./lib
cp ./LICENSE ./lib
cp ./README.md ./lib

# publish
pnpm publish ./lib --ignore-scripts --no-git-checks --tag dev
