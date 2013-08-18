#!/usr/bin/env node

/**************************************************
Resources
**************************************************/
var http = require('https');
var path = require('path');
var fs = require('fs');
var installConfig = require('./install_config.json');
var commands = [];
var sys = require('sys');
var exec = require('child_process').exec;
var util = require('util');

function download(source, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(source, function (response) {
    response.pipe(file);
    cb && cb();
  });
};

/**************************************************
Downloads
**************************************************/
commands.push(function () {
  var downloadSource = 'https://dl.dropboxusercontent.com/u/31904660/jengine_builder_downloads/';
  
  var platform = process.platform;
  var arch;
  switch (platform) {
    case 'linux':
    case 'sunos':
    case 'freebsd':
      platform = 'linux';
      arch = process.arch;
      break;
    case 'win32':
      platform = 'win';
    case 'mac':
      arch = 'ia32';
      break;
    default:
      throw "OS not supported";
  }

  var downloads = installConfig.downloads[platform][arch];
  if (downloads.directories) {
    downloads.directories.forEach(function (dir) {
      fs.mkdirSync(path.join(process.cwd(), path.normalize(dir)));
    });
  }
  if (downloads.files) {
    Object.keys(downloads.files).forEach(function (source) {
      var dest = path.join(process.cwd(), path.normalize(downloads.files[source]));
      download(downloadSource+source, dest);
    });
  }
  if (downloads.executables) {
    Object.keys(downloads.executables).forEach(function (source) {
      var dest = path.join(process.cwd(), path.normalize(downloads.executables[source]));
      download(downloadSource+source, dest, function() {
        fs.chmodSync(dest, '0764');
      });
    });
  }
});

/**************************************************
Submodules
**************************************************/
commands.push(function () {
  exec('git submodule init', {
    cwd: process.cwd()
  }, function(){});
});

/**************************************************
Run Commands
**************************************************/
commands.forEach(function (command) {
  command();
});