// Adapted from famous-cli https://github.com/Famous/famous-cli/blob/master/lib/autoupdate.js
'use strict';

// Utility for colorizing terminal output
var chalk = require( 'chalk' );

// Cross-platform utility to invoke command-line processes
var spawn = require( 'win-spawn' );

// Tools for retrieving and validating NPM package release versions
var semver = require( 'semver' );
var latestVersion = require( 'latest-version' );

// Details about the installed p5-cli package
var current = require( '../package' ).version;

/**
 * update
 *
 * Run the update command
 * @private
 * @param {function} callback function to execute with the return code from the update command
 * @returns {Promise} A promise that will complete when the update does
 */
function update( callback ) {
  return new Promise(function( resolve, reject ) {
    var child = spawn( 'npm', [ 'install', '-g', 'p5-cli' ]);

    child.on( 'close', function( statusCode ) {
      if ( statusCode === 0 ) {
        console.log( 'Update successful!' );
        resolve();
      } else {
        console.log([
          '\n', chalk.red( 'Update failed.' ),
          'It is possible you may need to run "npm install -g p5-cli" with\n',
          '"sudo" (OSX) or "run as administrator" (Windows).\n',
          'Continuing with the currently-installed version of p5...'
        ].join( ' ' ));
        reject( statusCode );
      }
    });
  });
}

/**
 * autoUpdate
 *
 * Check whether the currently installed version of p5-cli is behind the latest
 * version published in npm: auto-update if an update is required.
 *
 * @returns {Promise} A promise that will complete when the version has been verified
 * to be the latest or when the version update completes
 */
function autoUpdate() {
  return new Promise(function( resolve, reject ) {

    // Get the latest version of p5-cli
    latestVersion( 'p5-cli', function( err, latest ) {
      if ( err ) {
        reject( err );
      }

      if ( semver.lt( current, latest ) ) {
        // Notify user that p5 is being updated
        console.log([
          chalk.bold( 'p5-cli' ),
          'version',
          current,
          'is out of date. Updating to',
          latest + '...'
        ].join( ' ' ));

        resolve( update() );
      }
      resolve();
    });
  });
}

module.exports = autoUpdate;
