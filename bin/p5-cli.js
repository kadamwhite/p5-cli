#!/usr/bin/env node
'use strict';

// Use commander to define CLI commands
var program = require( 'commander' );

// Get version from package.json
var appVersion = require( '../package' ).version;

// Link to the definition of the "serve" CLI subcommand
var serveCommand = require( '../commands/serve' );

// Create the CLI application object
var p5cli = program.version( appVersion );

// Documentation for the `p5 serve` command, defined below
var serveDescriptionText = [
  'Starts a local server to run a p5 sketch. Example commands:',
  '',
  '    p5 serve             Starts a web server in the current directory',
  '    p5 serve some/path   Starts a web server in the "some/path" directory',
  '    p5 serve sketch.js   Creates a page to show the specified sketch file',
  '    p5 run               Same as `p5 serve`'
].join( '\n' );

// Define `p5 serve` command
p5cli.command( 'serve' )

  // Add the `p5 run` alias for this command
  .alias( 'run' )

  // Provide descriptive text that will display when running `p5 serve --help`
  .description( serveDescriptionText )

  // Define the usage syntax of the library
  .usage( '<file or directory path> [options]' )

  // Optionally serve an HTML page loading an arbitrary JavaScript file,
  // instead of the current working directory
  .option( '-s, --sketch [file]', 'Relative path to a JavaScript sketch file to use' )

  // Permit overriding the :4444 port default for the local server
  .option( '-p, --port [port]', 'HTTP port on which to start the server', '4444' )

  // Run the "serve" command with the provided CLI options
  .action( serveCommand );

// Kick off command parsing & execution
p5cli.parse( process.argv );
