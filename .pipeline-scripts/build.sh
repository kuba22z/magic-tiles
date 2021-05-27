#!/bin/bash
#
# Author: Pierre Dahmani
# Created: 29.04.2021
#
# Description: builds the nuxt client.


# makes sure the cypress cache will be stored inside /nuxt-client.
# This cache will be used in our gitlab ci.
CYPRESS_CACHE_FOLDER="./cache/Cypress"

cd /nuxt-client || (echo "/nuxt-client not found." && exit 1)
# installs all dependencies
echo "installing dependencies..."
npm ci
echo "building nuxt client..."
npm run build
