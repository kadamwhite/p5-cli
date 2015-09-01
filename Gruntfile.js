module.exports = function( grunt ) {
  'use strict';

  // Reusable JSHintRC options
  var jshintrc = grunt.file.readJSON( '.jshintrc' );

  // Load tasks.
  require( 'load-grunt-tasks' )( grunt );

  grunt.initConfig({

    pkg: grunt.file.readJSON( 'package.json' ),

    jscs: {
      options: {
        config: '.jscsrc',
        reporter: require( 'jscs-stylish' ).path
      },
      grunt: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: [ 'bin/**/*.js', 'commands/**/*.js', 'lib/**/*.js', 'server/**/*.js' ]
      }
    },

    jshint: {
      options: {
        reporter: require( 'jshint-stylish' )
      },
      grunt: {
        options: jshintrc,
        src: 'Gruntfile.js'
      },
      lib: {
        options: jshintrc,
        src: [ 'bin/**/*.js', 'commands/**/*.js', 'server/**/*.js' ]
      }
    }

  });

  grunt.registerTask( 'lint', [ 'jshint', 'jscs' ] );
  grunt.registerTask( 'default', [ 'lint' ] );
};
