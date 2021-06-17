#!/bin/bash
#
# Author: Pierre Dahmani
# Created: 29.04.2021
#
# Description: copies files to mounted directory. These files will then be
# auto loaded by a pm2 watch hook.
# MAYBE(pierre): Only copy the specific files that are required.
# Would only really matter if the host would be on different server.
# Still better practice in my opinion.


DOMAIN_NAME="back2street.de"
BRANCH_NAME="$1"
COMMIT_MESSAGE="$2"
# using repo name for game name :] This name will only be displayed by pm2 and
# does not semanticly matter to much.
GAME="$3"

# displays error output if we have to many or not enough arguments.
if [ $# -ne 3 ]; then
    echo "You have either passed to many or to less arguments. Three are
    required."
    echo "You have passed: "
    for arg in "$@"; do
        echo "$arg"
    done
    exit 1
fi

TARGET_DIR=""
TARGET_PORT=""
# if we have dev or master branch, just copy there.
if [ "$BRANCH_NAME" == "master" ]; then
    TARGET_DIR="$BRANCH_NAME"
    TARGET_PORT=3500
elif [ "$BRANCH_NAME" == "development" ]; then
    TARGET_DIR="$BRANCH_NAME"
    TARGET_PORT=3501
elif echo "$COMMIT_MESSAGE" | grep -q "CI_STAGING_1"; then
    TARGET_DIR="staging1"
    TARGET_PORT=3502
elif echo "$COMMIT_MESSAGE" | grep -q "CI_STAGING_2"; then
    TARGET_DIR="staging2"
    TARGET_PORT=3503
else
    echo "Did not deploy the branch to any domain."
    exit 0
fi

echo "TARGET DIR: $TARGET_DIR"

echo "deploying files to $GAME-$TARGET_DIR.$DOMAIN_NAME"

sed -i "s/changeThisNameWithSed/$GAME-$TARGET_DIR/g" \
    /nuxt-client/ecosystem.config.js
sed -i "s/changeThisPortWithSed/$TARGET_PORT/g" \
    /nuxt-client/ecosystem.config.js

# remove previously built files
rm -R /deploy/$TARGET_DIR/.nuxt
echo "copying from /nuxt-client to /deploy/$TARGET_DIR.."
cp -RT /nuxt-client "/deploy/$TARGET_DIR"
echo "finished copying!"

echo "check the results at $GAME-$TARGET_DIR.$DOMAIN_NAME"

exit 0
