'use strict';

// Utility for constructing file system paths
var path = require( 'path' );

// File System access
var fs = require( 'fs' );

// Server framework
var express = require( 'express' );

// Create the web server object
var app = express();

// The `p5 serve --sketch="file.js"` case requires us to provide our own copy
// of p5 from within the CLI's node_modules directory: store the path to the
// install of the CLI itself (determined in relation to this local-server.js
// file by stepping up to the project root) to aid in locating those p5 files.
var cliDirectory = path.join( path.dirname( fs.realpathSync( __filename ) ), '../' );

// Middleware
var serveIndex = require( 'serve-index' );
var combynExpress = require( 'combynexpress' );
var favicon = require( 'serve-favicon' );

// Favicons make everything better!
app.use( favicon( __dirname + '/assets/favicon.ico' ) );

/**
 * Expose a given path for serving files and browsing directories
 *
 * @method useDirectory
 * @param {String} path A path on the file system to serve
 */
function useDirectory( serverRootPath ) {
  app.use( express.static( serverRootPath ) );
  app.use( serveIndex( serverRootPath ) );
}

/**
 * Construct a page to serve a specified .js file
 *
 * @method useSketchFile
 * @param {String} sketchFilePath A path to a sketch file to use
 */
function useSketchFile( sketchFilePath ) {

  // Verify that the provided path is to a .js file
  if ( ! /\.js/.test( sketchFilePath ) ) {
    console.error( 'Error: --sketch option must specify the path to a .js file' );
    process.exit( 1 );
  }

  // Resolve the relative path to the sketch file from the directory from
  // which the server was invoked
  var pathToSketch = path.join( process.cwd(), sketchFilePath );

  // Verify that the specified sketch file exists
  try {
    fs.statSync( pathToSketch );
  } catch( e ) {
    console.error( 'Error: ' + sketchFilePath + ' does not exist!' );
    process.exit( 1 );
  }

  // Construct the path to where p5 is installed within the CLI:
  // `'node_modules/p5/lib'` is the path to the CLI's internal copy of p5
  var pathToP5LibDir = path.join( cliDirectory, 'node_modules/p5/lib' );

  // Serve the p5 lib/ directory as "/lib/" on the server
  app.use( '/lib', express.static( pathToP5LibDir ) );

  // For the server index, render out a basic sketch HTML page
  app.get( '/', function( req, res, next ) {
    res.send( 'TODO: Render a page to serve that sketch' );
  });

  // Serve the directory whence the sketch file, in case it loads any
  // other assets within that directory
  useDirectory( path.dirname( pathToSketch ) );
}

/**
 * Start the local server
 *
 * @method run
 * @param {Object}        options      Server configuration object
 * @param {Number|String} options.port The port on which to start the server
 * @return {Object} The running Express server object
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
