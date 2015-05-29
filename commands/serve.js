// var exec = require( 'child_process' ).exec;
// var chalk = require( 'chalk' );

// var server = require( '../server/server' );

var localServer = require( '../server/local-server' );

/**
 * Start a local server
 * @module commands
 * @submodule serve
 * @param  {Object} options          Command-line arguments (parsed from argv)
 * @param  {String} [options.sketch] A relative path to a JavaScript sketch file
 * @param  {String} [options.port]   The HTTP port on which to run the server
 */
function serve( options ) {
  // If options.sketch is provided, save the value
  var sketchFile = options.sketch || null;

  // If options.port is specified, convert it to a number and store the value; otherwise, use port 4444
  var port = options.port && +options.port || 4444;

  console.log( 'This will start a server' );
  console.log( options );
  console.log( process.cwd() );

  if ( ! sketchFile ) {
    // If no sketch file is provided, just serve the local directory
    localServer({
      port: port
    });

    return;
  }
}

module.exports = serve;
