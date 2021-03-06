#!/usr/bin/env node

process.title = 'node-dhcp';

var path = require('path');
var dhcp = require('../lib/dhcp.js');
var Options = require('../lib/options.js');
var argv = require('minimist')(process.argv.slice(2));

var opts = {};
var force = []; // We force all options here, since the user explicitly stated the option

// Create a server

for (var arg in argv) {
  if (arg === '_') {
    /* void */
  } else if (arg === 'range') {
    opts.range = argv[arg].split('-');
  } else if (Options.conf[arg] !== undefined) {

    // If value is missing, minimist simply makes it true/false
    if (typeof argv[arg] !== 'boolean') {
      opts[arg] = argv[arg];
      force.push(argv[arg]);
    } else {
      console.error('Argument ' + arg + ' needs a value.');
      process.exit();
    }

  } else if (arg === 'help') {
    console.log('Usage:\n\tdhcpd --range 192.168.0.1-192.168.0.99 --option1 value1 --option2 value2 ...');
    process.exit();
  } else {
    console.error('Invalid argument ' + arg);
    process.exit();
  }
}

var server = dhcp.createServer(opts);

server.listen();
