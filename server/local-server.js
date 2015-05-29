'use strict';

var liveServer = require( 'live-server' );

function serveCWD( options ) {
  var port = options.port;

  liveServer.start({
    port: port, // Set the server port
    host: '127.0.0.1', // Set the address to bind to
    root: process.cwd(), // Set root directory that's being served
    open: true // load your browser by default
  });
}

module.exports = serveCWD;
