const jade = require('jade')
const _ = require('lodash')

function index (env, callback) {
  class Sitemap extends env.plugins.Page {
    getFilename () {
      return 'sitemap.xml'
    }

    getView () {
      return (env, locals, contents, templates, callback) => {
        if (!locals.url) {
          return callback(new Error('locals.url must be defined.'))
        }

        const filename = `${__dirname}/templates/sitemap.jade`
        const template = jade.compileFile(filename)

        const entries = env.helpers.contents.list(contents).filter((entry) => (
          entry instanceof env.plugins.MarkdownPage && !entry.metadata.noindex
        ))
        const context = _.merge({entries}, locals)

        callback(null, new Buffer(template(context)))
      }
    }
  }

  env.registerGenerator('sitemap', (contents, callback) => {
    callback(null, {'sitemap.xml': new Sitemap()})
  })

  callback()
}

module.exports = index
