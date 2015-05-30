/**
 * @module commands
 */
'use strict';

var path = require( 'path' );

var localServer = require( '../server/local-server' );

/**
 * Start a local server
 *
 * @method serve
 * @param  {String|Object} pathOrOptions   Either a path to a directory to
 *                                         serve, or the options object
 * @param  {Object}        [configOptions] The options object (if a directory
 *                                         was provided as the first argument)
 */
function serve( pathOrOptions, configOptions ) {
  var options; // Object defining any options specified for this CLI command
  var serverRoot; // The path to be used as the root of the web server

  if ( typeof pathOrOptions === 'string' ) {
    // If the first argument is a string, a path to a directory was provided,
    // and the second argument is the options object
    options = configOptions;

    // Check whether a .js file was provided
    if ( /\.js/.test( pathOrOptions ) ) {
      // If so, switch to --sketch mode
      options.sketch = pathOrOptions;
    } else {
      // Local server mode, with a relative path: serve the specified directory
      // instead of the current working directory
      serverRoot = path.resolve( process.cwd(), pathOrOptions );
    }
  } else {
    // If the first argument is not a string, an explicit directory to serve
    // was not provided and the first argument is the options object
    options = pathOrOptions;

    // Serve the current working directory by default
    serverRoot = process.cwd();
  }

  // If options.sketch was provided, either with --sketch or by passing a path
  // to a .js file, save that file path
  var sketchFile = options.sketch || null;

  // If options.port is specified, convert it to a number and store the value;
  // Otherwise, default to port 4444
  var port = options.port && +options.port || 4444;

  // Configure the server based on whether a sketch file was provided
  if ( sketchFile ) {
    localServer.useSketchFile( sketchFile );
    console.log( '\nServing sketch on port ' + port );
  } else {
    localServer.useDirectory( serverRoot );
    console.log( '\nServing directory ' + serverRoot + ' on port ' + port );
  }

  // Run the configured server
  localServer.run({
    port: port
  });
}

module.exports = serve;
