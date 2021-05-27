#!/bin/bash
#
# Author: Pierre Dahmani
# Created: 30.04.2021
#
# Description: stub. will be replaced by out unit and e2e tests.


cd /nuxt-client || (echo "/nuxt-client not found." && exit 1)

# makes sure the production server will be reachable under localhost
echo 'HOST_ADDR="localhost"' > .env

# installing all packages and build server
# NOTE(pierre): (somehow did not work with cache in gitlab ci)
npm ci
npm run build

echo "Running e2e tests ..."
npm run test:e2e
