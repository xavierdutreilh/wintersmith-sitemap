'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    'jshint': {
      'options': {
        'jshintrc': true,
      },
      'all': [
        'Gruntfile.js',
        '<%= nodeunit.tests %>',
      ],
    },
    'jscs': {
      'all': [
        'Gruntfile.js',
        '<%= nodeunit.tests %>',
      ],
    },
    'clean': {
      'lib': [
        'lib',
      ],
      'tests': [
        'tmp',
      ],
    },
    'wintersmith': {
      'build': {
        'options': {
          'config': 'test/fixtures/config.json',
        },
      },
    },
    'nodeunit': {
      'tests': [
        'test/*_test.js',
      ],
    },
    'bump': {
      'options': {
        'commitMessage': 'Bump version to {%= version %}',
      },
    },
  });

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.registerTask('test', [
    'clean',
    'wintersmith',
    'nodeunit',
  ]);

  grunt.registerTask('default', [
    'jshint',
    'jscs',
    'test',
  ]);
};
