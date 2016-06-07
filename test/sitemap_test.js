'use strict';

const fs = require('fs');
const path = require('path');

function read(filename) {
  return fs.readFileSync(filename, 'utf8');
}

exports.sitemap = {
  'build': (test) => {
    const actual = read(path.join(__dirname, '..', 'tmp', 'sitemap.xml'));
    const expected = read(path.join(__dirname, 'expected', 'sitemap.xml'));

    test.equal(actual, expected, 'should build the sitemap');

    test.done();
  },
};
