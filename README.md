# dartmouth-cs52.github.io

Source for the website for Dartmouth CS52.  Updated periodically.  Now includes slides and notes. Contribute at your leisure.

**NOTE:** assignments tend to change without notice, so if you are taking the class please refer to canvas / the published site at [cs52.me](http://cs52.me).

<hr>

Built with: [Jekyll](https://jekyllrb.com/), [GitHub Pages](https://pages.github.com/), and [Remarkjs](https://github.com/gnab/remark)

### Local installation

`gem install bundle`

`bundle install`

`bundle exec jekyll serve`

or

`bundle exec jekyll liveserve` for live reloading



### Slide Integration

uses [remarkjs](https://github.com/gnab/remark) for building slides - if you use the



```
<div class="slide" markdown="0">

# Title

---

# Agenda

1. Introduction
2. Deep-dive
3. ...

---

# Introduction

This is an intro.

---
</div>
```

By default the slide content will also be shown in converted markdown on the page.  If you prefer to have slide only content add a `hidden` class.



### Search Powered by Algolia

Create an `_algolia_api_key` file and copy the key from the [dashboard](https://www.algolia.com).

Run: `bundle exec jekyll algolia` to update the index (when new content is added)

Resources:

* https://community.algolia.com/jekyll-algolia/blog.html
* https://community.algolia.com/instantsearch.js/v2/getting-started.html


### Comments Powered by [utteranc.es](https://utteranc.es/)

See [github issues](https://github.com/dali-lab/build/issues) to moderate. All comments are stored in github as comments on issues. Issues are named by the page titles - so make sure they are unique.
