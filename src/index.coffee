xml = require 'xml'

module.exports = (env, callback) ->

  class Sitemap extends env.plugins.Page

    getFilename: ->
      'sitemap.xml'

    getPages: (contents) ->
      env.helpers.contents.list(contents).filter (content) ->
        content instanceof env.plugins.MarkdownPage and not content.metadata.noindex

    getView: -> (env, locals, contents, templates, callback) ->
      sitemap =
        urlset: [
          _attr:
            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
        ]
      for page in @getPages contents
        url = []
        url.push loc: "#{locals.url}#{page.url}"
        if page.metadata.date?
          url.push lastmod: page.date.toISOString()
        if page.metadata.changefreq?
          url.push changefreq: page.metadata.changefreq
        if page.metadata.priority?
          url.push priority: page.metadata.priority
        sitemap.urlset.push url: url
      callback null, new Buffer xml sitemap, declaration: true

  env.registerGenerator 'sitemap', (contents, callback) ->
    callback null, 'sitemap.xml': new Sitemap

  callback()
