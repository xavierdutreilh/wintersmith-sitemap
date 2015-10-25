'use strict';

var fs = require('fs');

function read(filename) {
  return fs.readFileSync(filename, {'encoding': 'utf8'});
}

exports.sitemap = {
  'build': function(test) {
    var actual = read('tmp/sitemap.xml');
    var expected = read('test/expected/sitemap.xml');

    test.equal(actual, expected, 'should build the sitemap');

    test.done();
  },
};
