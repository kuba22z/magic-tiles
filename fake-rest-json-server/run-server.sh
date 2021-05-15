#!/bin/bash
#
# Author: Pierre Dahmani
# Created: 15.05.2021
#
# Description: starts the json server which will provide us with data for our
# api queries.

json-server --watch db.json --port 3001 &

