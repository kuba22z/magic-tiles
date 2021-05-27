#!/bin/bash
#
# Author: Pierre Dahmani
# Created: 29.04.2021
#
# Description: copies cypress binary into build path and builds the nuxt client


cd /nuxt-client || (echo "/nuxt-client not found." && exit 1)
# installs all dependencies
echo "installing dependencies..."
npm ci

# copies the cypress binary which will be cached to build path.
# reason: 'Both artifacts and caches define their paths relative to the
# project directory, and can’t link to files outside it.'
echo "copying cypress binary to ./nuxt-client/.cache/Cypress"
mkdir -p .cache
cp -R ~/.cache/Cypress .cache/

echo "building nuxt client..."
npm run build
