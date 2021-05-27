#!/bin/bash
#
# Author: Pierre Dahmani
# Created: 29.04.2021
#
# Description: builds the nuxt client.


cd /nuxt-client || (echo "/nuxt-client not found." && exit 1)
# installs all dependencies
echo "installing dependencies..."
npm ci
# copies the cypress binary to build path because we instead got error
# messages from gitlab ci
echo "copying cypress binary to ./nuxt-client/.cache/Cypress"
mkdir -p .cache
cp -R ~/.cache/Cypress .cache/
echo "resulting files in .cache:"
ls -lah .cache
echo "building nuxt client..."
npm run build
echo "try running cypress test here:"
CYPRESS_CACHE_FOLDER=./.cache/Cypress npm run test:e2e
