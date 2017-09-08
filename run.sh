#!/bin/sh

file=/data/custom/server.js
if [ -f $file ]; then
    nodemon custom/server.js
else
    nodemon server.js
fi
