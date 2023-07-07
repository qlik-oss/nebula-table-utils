#!/bin/sh 


yarn build:prod


export $(grep -v '^#' .env.local | xargs)

PKG_PLACEMENT_DIR="@qlik-oss/nebula-table-utils";

rm -rf "${PVT_NODE_MODULES_DIR}/${PKG_PLACEMENT_DIR}";
mkdir "${PVT_NODE_MODULES_DIR}/${PKG_PLACEMENT_DIR}";
cp -r ./dist/ "${PVT_NODE_MODULES_DIR}/${PKG_PLACEMENT_DIR}";
