#!/bin/sh

ROOT_DIR=./.env

echo "Replacing env constants in constants.js file"

echo "Processing $file ...";


sed -i 's|SERVERURL|'${VUE_APP_SERVER_URL}'|g' $ROOT_DIR
sed -i 's|MTCPORT|'${VUE_APP_MTC_PORT}'|g' $ROOT_DIR
sed -i 's|HOMEPORT|'${VUE_APP_HOME_PORT}'|g' $ROOT_DIR
sed -i 's|KEYCLOAKPORT|'${VUE_APP_KEYCLOAK_PORT}'|g' $ROOT_DIR

cat $ROOT_DIR

