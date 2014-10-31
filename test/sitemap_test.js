'use strict';

var grunt = require('grunt');

exports.sitemap = {
  build: function(test) {
    var actual = grunt.file.read('tmp/build/sitemap.xml'),
        expected = grunt.file.read('test/expected/sitemap.xml');

    test.equal(actual, expected, 'should build the sitemap');

    test.done();
  },
};
