# wintersmith-sitemap [![Build Status](https://travis-ci.org/xavierdutreilh/wintersmith-sitemap.svg?branch=master)](https://travis-ci.org/xavierdutreilh/wintersmith-sitemap)

> A [Wintersmith](https://github.com/jnordberg/wintersmith) plugin to generate a sitemap.xml file

## Installation

Install globally or locally using npm:

```bash
npm install [-g] wintersmith-sitemap wintersmith-contents
```

Add `wintersmith-sitemap` and `wintersmith-contents` to your `config.json`:

```json
{
  "plugins": [
    "wintersmith-contents",
    "wintersmith-sitemap"
  ]
}
```

Define the `url` property in the `locals` property:

```json
{
  "locals": {
    "url": "http://example.com"
  }
}
```

## Usage

`wintersmith-sitemap` extracts all Markdown pages from the content tree and lists them into the sitemap. By default, the sitemap only contains the location of all pages. If you need to include more information like the last modification date, the change frequency, or the priority, you need to define this information in the metadata:

```markdown
---
title: Hello, world!
date: 2014-10-31 23:59:59
changefreq: weekly
priority: 0.8
template: entry.jade
---
```

If you want to exclude a page from the sitemap, you need to define `noindex: true` in the metadata:

```markdown
---
title: Hello, world!
date: 2014-10-31 23:59:59
template: entry.jade
noindex: true
---
```

## License

`wintersmith-sitemap` is released under the [MIT license](http://en.wikipedia.org/wiki/MIT_License).
