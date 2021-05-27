#!/bin/bash
#
# Author: Pierre Dahmani
# Created: 30.04.2021
#
# Description: stub. will be replaced by out unit and e2e tests.


cd /nuxt-client || (echo "/nuxt-client not found." && exit 1)
echo "Running e2e tests ..."
npm run test:e2e
