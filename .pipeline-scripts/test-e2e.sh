#!/bin/bash
#
# Author: Pierre Dahmani
# Created: 30.04.2021
#
# Description: Runs the end to end tests.


# makes sure the cypress cache will be stored inside /nuxt-client.
# This cache will be used in our gitlab ci.
CYPRESS_CACHE_FOLDER="./cache/Cypress"

cd /nuxt-client || (echo "/nuxt-client not found." && exit 1)

echo "cypress cache folder: ..."
npx run cypress cache path

# makes sure the production server will be reachable under localhost
echo 'HOST_ADDR="localhost"' > .env

echo "Running e2e tests ..."
npm run test:e2e
echo "E2e tests finished."
