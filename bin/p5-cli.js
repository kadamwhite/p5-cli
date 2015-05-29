#!/usr/bin/env node
'use strict';

// Use commander to define CLI commands
var program = require( 'commander' );

// Get version from package.json
var appVersion = require( '../package' ).version;

// Link to the definition of the "serve" CLI subcommand
var serveCommand = require( '../commands/serve' );

// Define the CLI application
var p5cli = program.version( appVersion );

// Define `p5 serve`, aliased to `p5 run`
p5cli.command( 'serve' )
  .alias( 'run' )
  .description( 'Start a local server to run a p5 sketch' )
  // Optionally serve an HTML page loading an arbitrary JavaScript file,
  // instead of the current working directory
  .option( '-s, --sketch [file]', 'Relative path to a JavaScript sketch file' )
  // Permit overriding the :4444 port default for the local server
  .option( '-p, --port [port]', 'HTTP port on which to start the server' )
  .action( serveCommand );

// Kick off command parsing & execution
p5cli.parse( process.argv );
