'use strict';

const path = require('path');

const jade = require('jade');

module.exports = function(env, callback) {
  class Sitemap extends env.plugins.Page {
    getFilename() {
      return 'sitemap.xml';
    }

    getView() {
      // jshint maxparams: 5
      return (env, locals, contents, templates, callback) => {
        let context = {
          'entries': env.helpers.contents.list(contents).filter((content) => (
            content instanceof env.plugins.MarkdownPage &&
            !content.metadata.noindex
          )),
          'page': this,
        };

        env.utils.extend(context, locals);

        const filename = path.join(__dirname, 'templates', 'sitemap.jade');
        const template = jade.compileFile(filename);

        callback(null, new Buffer(template(context)));
      };
    }
  }

  env.registerGenerator('sitemap', (contents, callback) => {
    callback(null, {'sitemap.xml': new Sitemap()});
  });

  callback();
};
