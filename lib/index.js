'use strict';

const path = require('path');

module.exports = function(env, callback) {
  class Sitemap extends env.plugins.Page {
    getFilename() {
      return 'sitemap.xml';
    }

    getPages(contents) {
      return env.helpers.contents.list(contents).filter((content) => (
        content instanceof env.plugins.MarkdownPage &&
        !content.metadata.noindex
      ));
    }

    getView() {
      // jshint maxparams: 5
      return (env, locals, contents, templates, callback) => {
        const filepath = {
          'full': path.join(__dirname, 'templates', 'sitemap.jade'),
          'relative': path.join('templates', 'sitemap.jade'),
        };

        env.plugins.JadeTemplate.fromFile(filepath, (error, template) => {
          let ctx = {
            'pages': this.getPages(contents),
          };

          env.utils.extend(ctx, locals);

          template.render(ctx, callback);
        });
      };
    }
  }

  env.registerGenerator('sitemap', (contents, callback) => {
    callback(null, {'sitemap.xml': new Sitemap()});
  });

  callback();
};
