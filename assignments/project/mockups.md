---
layout: page
title: Mockups and Scaffolding
published: true
---



![](http://i.giphy.com/GWbMbUysgsIda.gif){: .fancy .tiny}

This milestone is all about mockups and sketches of your project and some initial code scaffolding.

## Mockups/Sketches

Based on the various features and pages you described in the feature spec, draw up sketches of each view.  Napkin style quick sketches are a good place to start. Focus more on thinking through the common actions that the users will be making rather than how and where the buttons go.  As you draw our these sketches with your team several things will come to light, features you might have missed or interactions that need to be changed.  Make your sketches comprehensive, they should cover all the views and functionality that your apps needs. Additionally you should make a site map style overview showing how the views are connected. Don't worry too much about making pixel perfect designs, once you have some sketches, refine them and feel free to make them pretty. It's more important to think through layout and functionality than making sure your color scheme or logo are perfect as you can continue to iterate on those.  I recommend against most wireframing software, for wireframing you might as well just sketch on paper. Once you are ready to make it prettier just go straight into a tool like [Sketch](https://www.sketchapp.com/).   There are many good design resources out there. Here's [one](http://cdn.ustwo.com/PPP/PP3.pdf) about pixel perfect design.

## Scaffolding

Now that you have your functionality mapped out let's start on planning the coding.  You now have the features all planned out.  How do you want to build it?  Plan out what technology you think you want to use and let's get some code scaffolding ready.   The project does have some minimal technical specs that must be fulfilled, but you are free to use alternative tech stacks as long as the whole team has some experience with them.

### Minimal Architecture:

* API server backend
  * should persist data to a database
  * should have multiple datatypes stored
* Frontend webapp
  * should read/write data from API
  * should have several views
  * should have styling!


In your project's main README.md file (you may have multiple repos, but for now just use the repo you'll be using for the frontend) start to outline the tech stack you will using. As you work on the project your README.md file will be a record of the tools you are using and how to get your dev environment running.

Start this doc now:

```
# Project Name

TODO: short project description, some sample screenshots or mockups

## Architecture

TODO:  descriptions of code organization and tools and libraries used

## Setup

TODO: how to get the project dev environment up and running, npm install etc

## Deployment

TODO: how to deploy the project

## Authors

TODO: list of authors

## Acknowledgments


```

You don't have to fill in the whole document for this milestone, but do start on it and fill in what you can. You should get some basics of your project up and running. If you are using starter code from the course, pull it into your repo.  Try do to a little layout so that you have a main component and a hello world for the frontend and a hello world from the backend.  If you have an idea of any modules and libraries you are planning on using, document them and or get them installed in your repos.

Note: using github will be an essential part of the final project.  We'd like you to use branches and pull requests as you work on the final project together.  You don't necessarily need to do code reviews, but doing git flow with feature branches will help you organize your team and your code.

## To Turn In:

* Mockups
  * Sketches of each view of your product
  * A site map showing how your views interconnect
* Code scaffolding:
  * some initial starter code
  * working hello worlds
  * github repos set up with README.md files started
