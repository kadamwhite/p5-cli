'use strict';

// Utility for constructing file system paths
var path = require( 'path' );

// Server framework
var express = require( 'express' );

var app = express();

// The `p5 serve --sketch="file.js"` case requires us to provide our own copy
// of p5 from within the CLI's node_modules directory: store the path to the
// install of the CLI itself to aid in locating those files
var cliDirectory = __dirname;

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
  // Construct the path to where p5 is installed within the CLI:
  // - `__dirname` is the directory in which this .js file exists
  // - `'../'` steps up one level to the the CLI's root project directory
  // - `'node_modules/p5/lib'` is the path to the CLI's installed copy of p5
  var pathToP5LibDir = path.join( cliDirectory, '../', 'node_modules/p5/lib' );

  // Serve the p5 lib/ directory as "/lib/" on the server
  app.use( '/lib', express.static( pathToP5LibDir ) );

  // For the server index, render out a basic sketch HTML page
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
