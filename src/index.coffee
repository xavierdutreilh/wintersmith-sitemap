xml = require 'xml'

module.exports = (env, callback) ->

  class Sitemap extends env.plugins.Page

    getFilename: ->
      'sitemap.xml'

    getPages: (contents) ->
      pages = []
      for filename in Object.keys contents
        content = contents[filename]
        if content instanceof env.plugins.MarkdownPage
          pages.push content
        else if content instanceof env.ContentTree
          Array::push.apply pages, @getPages content
      pages

    getView: -> (env, locals, contents, templates, callback) ->
      sitemap =
        urlset: [
          _attr:
            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
        ]
      for page in @getPages contents
        url = []
        url.push loc: "#{locals.url}#{page.url}"
        if page.metadata?
          if page.metadata.date?
            url.push lastmod: page.metadata.date.toISOString()
          if page.metadata.changefreq?
            url.push changefreq: page.metadata.changefreq
          if page.metadata.priority?
            url.push priority: page.metadata.priority
        sitemap.urlset.push url: url
      callback null, new Buffer xml sitemap, declaration: true

  env.registerGenerator 'sitemap', (contents, callback) ->
    tree =
      'sitemap.xml': new Sitemap
    callback null, tree

  callback()
