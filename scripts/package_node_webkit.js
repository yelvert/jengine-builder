#!/usr/bin/env node

var zipper = require('adm-zip');
var path = require('path');
var fs = require('fs');
var source = path.resolve(process.argv[0]);
var destination = path.resolve(process.argv[1]);
var commands = []
if (!fs.existsSync(source)) {
  throw "Source path does not exist!";
}
if (!fs.existsSync(destination)) {
  throw "Destination path does not exist!";
}

/**************************************************
Linux - x64
**************************************************/
commands.push(function() {
  var zipFile = new AdmZip();
  var childSource = path.join(source, 'linux_x64');
  fs.readdir(childSource, function(err, files) {
    if (err) {
      throw err;
    }
    files.forEach(function(file) {
      if (fs.stat(file).isFile()) {
        zipFile.addLocalFile(path.join(childSource, file));
      }
    });
    zipFile.writeZip(path.join(destination, 'linux_x64.zip'));
  });
});

/**************************************************
Linux - ia32
**************************************************/
commands.push(function() {
  var zipFile = new AdmZip();
  var childSource = path.join(source, 'linux_ia32');
  fs.readdir(childSource, function(err, files) {
    if (err) {
      throw err;
    }
    files.forEach(function(file) {
      if (fs.stat(file).isFile()) {
        zipFile.addLocalFile(path.join(childSource, file));
      }
    });
    zipFile.writeZip(path.join(destination, 'linux_ia32.zip'));
  });
});

/**************************************************
MacOSX
**************************************************/
commands.push(function() {
  var zipFile = new AdmZip();
  var childSource = path.join(source, 'darwin');
  fs.readdir(childSource, function(err, files) {
    if (err) {
      throw err;
    }
    files.forEach(function(file) {
      if (fs.stat(file).isFile()) {
        zipFile.addLocalFile(path.join(childSource, file));
      }
    });
    zipFile.writeZip(path.join(destination, 'darwin.zip'));
  });
});

/**************************************************
MacOSX
**************************************************/
commands.push(function() {
  var zipFile = new AdmZip();
  var childSource = path.join(source, 'win32');
  fs.readdir(childSource, function(err, files) {
    if (err) {
      throw err;
    }
    files.forEach(function(file) {
      if (fs.stat(file).isFile()) {
        zipFile.addLocalFile(path.join(childSource, file));
      }
    });
    zipFile.writeZip(path.join(destination, 'win32.zip'));
  });
});