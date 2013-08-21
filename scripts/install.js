#!/usr/bin/env node

/**************************************************
Resources
**************************************************/
var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    installConfig = require('./install_config.json'),
    commands = [],
    sys = require('sys'),
    exec = require('child_process').exec,
    util = require('util'),
    tar = require("tar"),
    zlib = require('zlib')
;

function download(source, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(source, function (response) {
    var zipFile = '';
    response.setEncoding('binary');
    response.on('data', function(chunk){
      zipFile += chunk;
    });
    response.on('end', function(){
      fs.writeFile(dest, zipFile, 'binary', function(err){
        if (err) throw err;
        cb && cb();
      });
    });
  });
};

/**************************************************
Downloads
**************************************************/
commands.push(function () {
  var downloadSource = 'http://dl.dropboxusercontent.com/u/31904660/jengine_builder_downloads/node-webkit.tar.gz';
  console.log('Downloading ' + downloadSource);
  var zipPath = path.join(process.cwd(), 'tmp', 'node-webkit.tar.gz');
  download(downloadSource, zipPath, function() {
    console.log('Downloaded ' + downloadSource);
    console.log('Extracting node-webkit');
    fs.createReadStream(zipPath)
      .pipe(zlib.Gunzip())
      .pipe(tar.Extract({
        type: "Directory",
        path: path.join(process.cwd(), 'bin')
      })).on('error', function(err) {
        console.log(err);
      }).on('done', function() {
        console.log('Finished extracting node-webkit');
      });
  });
});

/**************************************************
Submodules
**************************************************/
commands.push(function () {
  exec('git submodule update', {
    cwd: process.cwd()
  }, function(){
    exec('git submodule update', {
      cwd: process.cwd()
    }, function(){});
  });
});

/**************************************************
Run Commands
**************************************************/
commands.forEach(function (command) {
  command();
});