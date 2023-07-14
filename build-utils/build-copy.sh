#!/bin/sh 


yarn build:prod


export $(grep -v '^#' .env.local | xargs)

PKG_PLACEMENT_DIR="node_modules/@qlik-oss/nebula-table-utils";

BOLD="\033[1m";
NO_BOLD="\033[0m";
GREEN="\033[0;32m";
NO_COLOR="\033[0m";


handleCopy() {
  local NAME=${1};
  local DIR=${2};

  if [ -n "$DIR" ]; 
  then
    echo "=========================================================";
    echo "${BOLD}${NAME}${NO_BOLD}";
    echo "- ${NAME} variable provided (check)";

    PKG_PATH="${DIR}/${PKG_PLACEMENT_DIR}";

    if [ -d "$PKG_PATH" ];
    then 
      echo "- pkg exists -> try to remove and replace! (check)";
      rm -rf $PKG_PATH;
    fi
    
    mkdir -p $PKG_PATH;
    cp -r ./dist/ $PKG_PATH;

    
    echo "${GREEN}${BOLD}✅ UPDATED ${NAME} WITH LATES CHANGES IN 'nebula-table-utils'${NO_BOLD}${NO_COLOR}";
    echo "=========================================================";
  fi
}

handleCopy "PVT" $PV_TABLE_DIR;
handleCopy "SNT" $SN_TABLE_DIR;
