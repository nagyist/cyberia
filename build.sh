#!/bin/bash

echo "Clearing build directory"
mkdir -p build
rm -r build/*
mkdir build/lib
mkdir build/images

echo "Running tsc"
tsc

echo "Compiling images"
python3 process.py

echo "Moving other files"
cp html/* build
cp -r lib/*.js build/lib

echo "Complete"