# dartmouth-cs52.github.io

Source for the website for Dartmouth CS52.  Updated periodically.  Now includes slides and notes. Contribute at your leisure.

**NOTE:** assignments tend to change without notice, so if you are taking the class please refer to canvas / the published site at [cs52.me](http://cs52.me). 

<hr>

Built with: [Jekyll](https://jekyllrb.com/), [GitHub Pages](https://pages.github.com/), and [Remarkjs](https://github.com/gnab/remark)

### Local installation

`gem install bundle`

`bundle install`

`bundle exec jekyll serve`


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

this is an intro

---
</div>
```

By default the slide content will also be shown in converted markdown on the page.  If you prefer to have slide only content add a `hidden` class.
