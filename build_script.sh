#! /bin/bash

cd mongo-express-resource-opener-ng &&

ng build --output-hashing=none &&

cd .. &&

mkdir -p extension &&

mv mongo-express-resource-opener-ng/dist/mongo-express-resource-opener-ng/* extension



