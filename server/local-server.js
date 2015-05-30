'use strict';

// Server framework
var express = require( 'express' );

var app = express();

// Middleware
var serveIndex = require( 'serve-index' );

/**
 * Expose a given path for serving files and browsing directories
 *
 * @method useDirectory
 * @param {String} path A path on the file system to serve
 */
function useDirectory( dirPath ) {
  app.use( express.static( dirPath ) );
  app.use( serveIndex( dirPath ) );
}

/**
 * Construct a page to serve a
 * @param  {String} filePath A path to a sketch file to use
 * @return {[type]}          [description]
 */
function useSketchFile( filePath ) {
  app.get( '/', function( req, res, next ) {
    res.send( 'TODO: Render a page to serve that sketch' );
  });
}

/**
 * Start the local server
 *
 * @method run
 * @param {Object}        options      Server configuration object
 * @param {Number|String} options.port The port on which to start the server
 */
function runServer( options ) {
  // Type coercion for port argument
  var port = typeof options.port === 'string' ? +options.port : options.port;

  // Start the server and return the server object
  return app.listen( port );
}

module.exports = {
  // Expose app as exports.server
  server: app,

  // Expose method to register static
  useDirectory: useDirectory,

  // Expose method to use a specific sketch file
  useSketchFile: useSketchFile,

  // Expose method to start the server
  run: runServer
};
