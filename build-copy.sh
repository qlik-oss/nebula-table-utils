#!/bin/sh 


yarn build:prod

rm -rf ../030__Qlik_oss__sn-pivot-table/node_modules/@qlik-oss/table-common

mkdir ../030__Qlik_oss__sn-pivot-table/node_modules/@qlik-oss/table-common

cp -r ./dist/ ../030__Qlik_oss__sn-pivot-table/node_modules/@qlik-oss/table-common
