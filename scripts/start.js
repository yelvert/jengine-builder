#!/usr/bin/env node

var exec = exec = require('child_process').exec,
    path = require('path'),
    platform = process.platform,
    arch = process.arch,
    package = require(path.join(process.cwd(), 'package.json')),
    nwPath = path.join(process.cwd(), 'bin', 'node-webkit')
;

switch(platform) {
  case 'linux':
    if (arch === 'ia32') {
      nwPath = path.join(nwPath, 'linux_ia32', 'nw');
    } else if (arch === 'x64') {
      nwPath = path.join(nwPath, 'linux_x64', 'nw');
    } else {
      throw 'Architecture not supported!';
    }
    break;
  case 'darwin':
    nwPath = path.join(nwPath, 'darwin', 'node-webkit.app', 'Contents', 'MacOS', 'node-webkit');
    break;
  case 'win':
    nwPath = path.join(nwPath, 'nw.exe');
    break;
  default:
    throw 'Platform not supported!';
}
var run = [nwPath, (package["chromium-args"] || ''), '.'].join(' ');
console.log(run);
exec(run, function() {
  process.exit(0);
});