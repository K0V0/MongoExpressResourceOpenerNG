#! /bin/bash

export NODE_OPTIONS=--openssl-legacy-provider

cd mongo-express-resource-opener-ng &&

ng build --output-hashing=none &&

cd .. &&

rm -rf extension &&

mkdir -p extension &&

mv mongo-express-resource-opener-ng/dist/mongo-express-resource-opener-ng/* extension



