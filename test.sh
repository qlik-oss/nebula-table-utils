#!/bin/sh 

set -o pipefail

_sha=${_sha:=$SHA}
git fetch --depth=10000

# git-describe - Give an object a human readable name based on an available ref
# On PR actions/checkout checkouts a merge commit instead of commit sha, git describe
# returns merge commit. To avoid this unpredictable commit sha, we will describe
# the actual commit
git_rev=$(git describe --tags --abbrev=7 ${_sha} --match "v[0-9]*.[0-9]*.[0-9]*")

echo "===============";
echo $SHA;
echo $git_rev;
echo "===============";

# If git revision is not an exact semver tag, then bump patch
# An exact semver does not contain a '-'
if [[ "$git_rev" == *-* ]]; then
  echo 1;
  # Transforms 0.0.0-0-g1234abc to 0.0.1-0.g123abc
  git_rev=$(echo $git_rev | perl -ne 'm/(^v\d+\.\d+\.)(\d+)(.*)(\-g)(.*$)/ && print $1 . int(1+$2) . $3 . ".g" . $5')
fi

# If no version is returned from git describe, generate one
[ -z "$git_rev" ] && git_rev="v0.0.0-0.g${_sha:0:7}"

# Return Version without v prefix
VER=${git_rev#v}
# On tag push that matches refs/tags/v*.*.*, use that version regardless of git describe
if echo "$GITHUB_REF" | grep -E 'refs/tags/v[0-9]+\.[0-9]+\.[0-9]+$'; then
  echo 2;
  VER=${GITHUB_REF#*/v}
  RELEASE_TAG="1"
fi

echo "Set version: ${VER}"
if (echo $VER | egrep -- '-[0-9a-z.]+$' 1> /dev/null); then
  echo 3;
  npm version $VER --no-git-tag-version
fi

cat package.json | grep version