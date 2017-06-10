const _ = require('lodash')
const pug = require('pug')

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

        const template = pug.compileFile(`${__dirname}/templates/sitemap.pug`)

        const entries = env.helpers.contents.list(contents).filter((entry) => (
          entry instanceof env.plugins.MarkdownPage && !entry.metadata.noindex
        ))
        const context = _.merge({entries}, locals)

        callback(null, Buffer.from(template(context)))
      }
    }
  }

  env.registerGenerator('sitemap', (contents, callback) => {
    callback(null, {'sitemap.xml': new Sitemap()})
  })

  callback()
}

module.exports = index
