'use strict';

const path = require('path');

const jade = require('jade');
const _ = require('lodash');

module.exports = function(env, callback) {
  class Sitemap extends env.plugins.Page {
    getFilename() {
      return 'sitemap.xml';
    }

    getView() {
      // jshint maxparams: 5
      return (env, locals, contents, templates, callback) => {
        if (!locals.url) {
          return callback(new Error('locals.url must be defined.'));
        }

        const filename = path.join(__dirname, 'templates', 'sitemap.jade');
        const template = jade.compileFile(filename);

        const context = _.merge({
          'entries': env.helpers.contents.list(contents).filter((entry) => (
            entry instanceof env.plugins.MarkdownPage &&
            !entry.metadata.noindex
          )),
        }, locals);

        callback(null, new Buffer(template(context)));
      };
    }
  }

  env.registerGenerator('sitemap', (contents, callback) => {
    callback(null, {'sitemap.xml': new Sitemap()});
  });

  callback();
};
