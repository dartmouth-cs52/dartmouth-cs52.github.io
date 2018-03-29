layout: true
class: center, middle
name: pic
background-size: contain

---

layout: true
class: center, top
name: fragment

.title[{{name}}]

---
layout: true
class: center, middle
name: base

.title[{{name}}]

---
name: this is git

.fancy.medium_small[![xkcd git](http://imgs.xkcd.com/comics/git.png)]

???

* TREEEESSS
* whaaaat?
* code version control system

---
name: social coding

<iframe src="//giphy.com/embed/3oD3YveOJWdwIAfZ5e" width="600" height="389" frameBorder="0" class="giphy-embed"></iframe>

???
* social coding
* changed the world enabling many mmore people to contribute easily
* github in particular has been instrumental in this


---
name: transports

.medium_small[![](img/git_data_transport.png)]

???


---
name: merge conflicts!

```javascript
<<<<<< HEAD
var h = 'hello, world';
======
var h = 'Hi!';
>>>>>> cb1abc6bd98cfc84317f8aa95a7662815417802d
```

???
* is scariest
* but take a deep breath will be fine
* fix the file
* git add the file
* git commit #comment is premade


---
name: git visualization

[https://onlywei.github.io/explain-git-with-d3/](https://onlywei.github.io/explain-git-with-d3/)

???
* used to have a bunch of slides but this is prettier
* lets try some things out here
* git branch - what it looks like
* git pull - what it looks like
* git rebase takes current checked out branch and makes it point to newer
* git merge creates a new merged commit node - messier but also clearer?
* fast forward is nice




---
name: git cheatsheet

[http://www.ndpsoftware.com/git-cheatsheet.html](http://www.ndpsoftware.com/git-cheatsheet.html)

???




---
name: Git Short Assignment!

[http://cs52.me/assignments/sa/git-map](http://cs52.me/assignments/sa/git-map)

???



---
name: Next Time

* CSS: Everything you wanted to know about making things look pretty.
* SA2 Due Friday
* LAB1 Out Today (can get started but due next week since you need CSS first)

???
