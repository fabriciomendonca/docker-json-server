#!/bin/sh

file=/data/server.js
if [ -f $file ]; then
    echo "Found server file"
fi

node server.js
