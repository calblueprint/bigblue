#!/bin/sh

PATH=/home/ubuntu/.nvm/v0.10.48/bin:$PATH

set -e

npm install
export PATH="node_modules/.bin:node_modules/hubot/node_modules/.bin:$PATH"
