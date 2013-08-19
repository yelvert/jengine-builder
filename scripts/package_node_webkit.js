#!/usr/bin/env node

var args = require('optimist').argv._,
    logger = require('logger'),
    path = require('path'),
    fs = require('fs'),
    source = path.resolve(args[0]),
    destination = path.resolve(args[1]),
    fstream = require('fstream'),
    tar = require('tar'),
    zlib = require('zlib')
;

if (!fs.existsSync(source)) {
  throw "Source path does not exist!";
}
if (!fs.existsSync(path.dirname(destination))) {
  throw "Destination path does not exist!";
}

fstream.Reader({'path': source, 'type': 'Directory'})
  .pipe(tar.Pack())
  .pipe(zlib.Gzip())
  .pipe(fstream.Writer({'path': path.join(destination, 'node-webkit.tar.gz')}));