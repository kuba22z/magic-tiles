#!/bin/bash
#
# Author: Pierre Dahmani
# Created: 30.04.2021
#
# Description: Runs the end to end tests.


cd /nuxt-client || (echo "/nuxt-client not found." && exit 1)

# makes sure the production server will be reachable under localhost
echo 'HOST_ADDR="localhost"' > .env

echo "Running e2e tests ..."
CYPRESS_CACHE_FOLDER=./.cache/Cypress npm run test:e2e
echo "E2e tests finished."
