#!/bin/sh

file=/data/server.js
if [ -f $file ]; then
    echo "Found server file"
fi

cp -R /custom-data/. /data/
nodemon server.js