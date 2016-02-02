#!/usr/bin/env node

import http = require('http');

let port = process.env.PORT || 3000;

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello, world!\n');
}).listen(port);