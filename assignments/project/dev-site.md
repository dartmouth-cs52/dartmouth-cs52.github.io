---
layout: page
title: Dev Site
published: true
---



![](http://i.giphy.com/IU9JNuUSmxZTy.gif){: .fancy .small}


Dev site goes live, this allows testing and sharing of progress for feedback.

## Dev Site

At this stage you should have rudimentary functionality in place.  There should be frontend components hitting api endpoints that are pulling data from the database. You should have all the components/views planned out and started in code even if they are simple placeholders.  Following the react/redux steps, you should be at the point where you have most of your presentational components laid out and have started on the wiring with at least one container fetching or posting data.  

### README.md

Make sure your README.md files are updated with the current installation and deployment instructions

## Travis CI

![](img/TravisCI-Full-Color-7f5db09495c8b09c21cb678c4de18d21.png){:  .tiny}


You will need to set up Travis CI for your project with automatic linting. You already have been using eslint, so now we'll just make sure that whenever you push to github it will automatically run eslint again just in case.  We'll also have Travis CI run other stuff for us, in particular it will push to surge automatically.  Here's a bit of a todo on [how to set up Travis](http://cs52.me/resources/travis).

### Deployment API

![](img/Heroku_logo.png){:  .tiny}

Set up your Heroku app to be connected to GitHub with [automatic deploys](https://devcenter.heroku.com/articles/github-integration#automatic-deploys).  Set this up so that whenever you merge a pull-request into your master branch for your server component, Heroku will pick up the change.  You will obviously still work locally on your own feature branches. Your master branch will be the branch that is tested and working.  You can set this up so that Heroku only updates if the Travis tests have completed successfully.

### Continuous Integration Frontend

![](img/surge.png){:  .tiny}

For the frontend, we can set up Surge with Travis so that it too will update automatically.  Here's how to set up [surge+travis](https://surge.sh/help/integrating-with-travis-ci).


## Such Dev Environment

Now, you can work in your local environment on your feature branch and when you are ready, merge it into master which will deploy it automatically. Do not simply start using the master branch and the dev site directly as your primary method of testing.  You should always be working locally first. But this does allow you to merge in changes quickly and you can have a shared dev site where you can see the latest pushed version of everyone's code and ask others for feedback.


## To Turn In:

* github URLs for the various repos involved with updated README.md files
* dev urls
  * url of frontend
  * url for api server
* screenshots of Travis CI running on pull requests with short short comment on what worked and what didn't
