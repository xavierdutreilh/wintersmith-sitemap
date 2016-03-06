'use strict';

const fs = require('fs');

function read(filename) {
  return fs.readFileSync(filename, {'encoding': 'utf8'});
}

exports.sitemap = {
  'build': (test) => {
    const actual = read('tmp/sitemap.xml');
    const expected = read('test/expected/sitemap.xml');

    test.equal(actual, expected, 'should build the sitemap');

    test.done();
  },
};
