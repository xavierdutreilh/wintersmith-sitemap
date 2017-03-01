const fs = require('fs')

function read (filename) {
  return fs.readFileSync(filename, 'utf8')
}

exports.sitemap = {
  'build': (test) => {
    const actual = read(`${__dirname}/../tmp/sitemap.xml`)
    const expected = read(`${__dirname}/expected/sitemap.xml`)

    test.equal(actual, expected, 'should build the sitemap')

    test.done()
  }
}
