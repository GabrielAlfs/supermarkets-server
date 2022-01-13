#!/bin/sh

PROJECT_DIR=$(
  cd $(dirname "$0")
  pwd
)

build() {
  cd "$PROJECT_DIR"
  echo "Removing old files..."
  rm -rf ./dist/*
  echo "Building..."
  ./node_modules/.bin/tsc --project tsconfig.build.json
  echo "Build process done!"
}

build
