---
layout: page
title: SA 7 Server-side rendering in Express, and MongoDB!
published: true
---
![](img/enm.jpg){: .small }

## Overview

Today we'll be learning how to create a server side rendered polling webapp: it will be an [express](https://expressjs.com/) server that displays some data which is stored using [mongodb](https://www.mongodb.com/). We'll get a taste of how to use simple server side routes for displaying some html built up from data we will store in a database, and we will gain some knowledge about [express](https://expressjs.com/) — which we will be using in Lab 5!  We'll also use some [materializecss](http://materializecss.com/) for some basic styling.

<iframe width="800" height="374" src="https://www.youtube.com/embed/LjrdiK94FyU?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

## Some Setup
First, let's download `node` and `mongodb` packages.
```bash
brew install node
brew install mongodb
```

We're going to be building a poll site, where users can sign various polls. We will be using [express-babel-starter](https://github.com/dartmouth-cs52/express-babel-starter) to start — take a look through the `package.json` file. Mostly this sets us up with an `express` node server with a tiny bit of boiler plate as well as linting and babel.

🚀 Do what you did in [SA4](http://cs52.me/assignments/sa/react-videos/) when pulling from your own starterpack but in this case we'll pull from a different starter — create your own repo with the classroom link, add a starter remote to [express-babel-starter](https://github.com/dartmouth-cs52/express-babel-starter), and pull from it. Then run these following commands to start our new node+express app in dev reloading mode.

```bash
npm install
npm run dev
```

## Intro Express

[Express](https://expressjs.com/) is a web framework for Node.js.  What it does for us is provide a way to listen for and respond to incoming web requests. Today, we will be creating API endpoints to respond to certain CRUD-style requests.

Take a look through the current `app/server.js` file. This is the entry point for the app. Just like `index.js` has been in our frontend app (the names of these are arbitrary). Note how we are setting the route:

```javascript
// default index route
app.get('/', (req, res) => {
  res.send('hi');
});
```
The 2nd parameter to `.get()` is a function that takes 2 arguments:  request and response.  

Request is an express object that contains, among other things, any data that was part of the request. For instance, the JSON parameters we would POST or PUT in our asynchronous `axios` calls would be available as `req.body.parameterName`.

Response is another special express object that contains, among other things, a method named `send` that allows us a send back a response to the client.  When your api call gets back JSON data this is how it is returned.  Consider `res.send()` the equivalent of a network based `return` statement.

We'll add more routing in shortly, but first let's set up our database!

## Mongo Database Server

Mongo is the database that we are going to use.  We've already installed `mongodb` using Homebrew.  Follow further [installation instructions here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition).

 🚀 You will need to run the `mongod &` process, which your node app will connect to.  This is a background server process.

There is a commmandline client we'll use to connect to the database: `mongo`. You can also play around with a more graphical client [robomongo](https://robomongo.org/).

🚀  Below are some commands to run in the mongo client to create some polls.
```bash
# mongoshell is a commandline interface to your local mongo db

show dbs
# will show your current databases

use cs52poll
# will make cs52poll the current database

db.polls.insert(
   {
      'text': 'Pangolins are cute',
      'imageURL':'https://media.giphy.com/media/uscuTAPrWqmqI/giphy.gif',
      'upvotes': 0,
      'downvotes': 0,
   }
)
# will insert an object into the database
# into a collection called polls

db.polls.find()
# returns everything in this collection

db.polls.find({"text": "Pangolins are cute"})
# finds a entry in database by key:value
```

Ok, so now you've played a little bit with mongo directly, let's build something on top of it.

## Mongoose

![](img/mongoose.jpg){: .small .fancy }

To connect to mongo in our app, we will use a module called `mongoose`. [Mongoose](http://mongoosejs.com/) is a an object model for mongo. This allows us to treat data that we are storing in mongo as objects that have a nice API for querying, saving, validating, etc.  Mongo is in general considered a schema-less store.  We store JSON documents in a large object tree similarly to firebase. However, with Mongoose we are able to specify a schema for our objects.  This is purely in code and allows use to validate and assert our data before inserting it into the database.

🚀 Install mongoose:  `npm install --save mongoose`

🚀 And add just a little bit of code to get mongoose initialized with our database in `server.js`:

```javascript
import mongoose from 'mongoose';

// DB Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/cs52poll';
mongoose.connect(mongoURI);
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

```

## Models

We're going to create a data model to work with.   A data model in mongoose is initialized from a schema, which is a description of the structure of the object.   This is much more like what you might be familiar with statically typed classes in Java.

🚀 Create a directory `app/models` and a file inside this directory named `poll.js`.


```javascript
import mongoose, { Schema } from 'mongoose';

const PollSchema = new Schema({
  text: String,
  imageURL: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
}, {
  toJSON: {
    virtuals: true,
  },
});

PollSchema.virtual('score').get(function scoreCalc() {
  return this.upvotes - this.downvotes;
});

// create model class
const PollModel = mongoose.model('Poll', PollSchema);

export default PollModel;
```

There's a bit of stuff going on here.  We're creating a new PollSchema - this is a definition of what fields our Poll document should have. We're also enabling *virtuals* on our schema which allows us to have a computed field `score` that is returned with our object but doesn't need to be stored explicitly.

From this schema we create a Poll class or model which we can use in other files to perform queries on our database!  Mongoose models give us a familiar code based approach to database queries.


## Views
We need to create views for how our polls will look on the page.

🚀  Let us create the directory `app/views` to hold all our view templates. We will write some html with [ejs](https://www.npmjs.com/package/ejs), which allows us to embed javascript in html. This allows us to reuse html code and insert into other `.ejs` files. Let's create the directory `partials` within this directory for these reusable html components.  Another great thing we can do is pass javascript objects in html and perform simple functions to render them exactly the way we want it.

🚀  We need a navigation bar on every page, don't we? In the `app/views/partials` directory, create a `nav.ejs` file.

```html
<nav>
  <div class="nav-wrapper">
    <a href="/" class="brand-logo">Voices of Dartmouth</a>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="/new">say what you wanna say</a></li>
    </ul>
  </div>
</nav>
```

🚀 Before we move on you'll note a few classes above that may look familiar if you've used [materializecss](http://materializecss.com/) before. Let's create a `head.ejs` file in the partials directory to include all our CSS libraries and such.  

```html
<head>
  <title>Voices of Dartmouth</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
  <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
  <link href="/styles.css"rel="stylesheet" type="text/css"/>
</head>
```


Here's some css to get you going, put this in your `static/style.css` file.  `static` is where any assets that aren't computed should go, images for instance also.

```css
nav {
  background-image: url(img/dartmouth_background.png);
  background-size: cover;
  background-repeat: no-repeat;
  padding-left: 20px;
}

.card {
  width: 350px;
  height: 350px;
  margin: 20px;
}

.card-flex {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
}

.card-image {
  height: 60%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

```

(We're using this image file `dartmouth_background.png` for the background of our navigation bar, but you can find your own and insert your image in place of this one or right click and save image as).

![](img/dartmouth_background.png){:.small .fancy}

🚀 Now, let's insert the nav bar and the modal into `index.ejs` file, which we create under the `app/views/` directory. This is really easy in ejs:
```html
<html>
  <% include partials/head %>
<body>
  <% include partials/nav %>
  Hello
</body>
</html>
```


🚀 We should now be able to test this. Change `app/server.js` to read our new index ejs page:

```javascript
app.get('/', (req, res) => {
  // we will later be able to get the polls by calling a function, but let's pass in no polls for now
  const polls = [];
  res.render('index', { polls });
});
```

`res.render` takes the name of an ejs template and a dictionary of data that will be available for use inside of the template. For now we'll pass in `{ polls: [] }`

Great, so now when we hit `http://localhost:9090`, we see the nav bar. Cooool.


### Main List View

🚀  Now let's make the rest of the index page inside of `body`. We want to display all of the polls, and information about them. Here is how we do it:
```html
<div class="card-flex container section">
   <% if (polls.length > 0) { %>
      <% polls.sort(function(a,b) {return a.score < b.score}) %>
      <% polls.forEach(function(poll) { %>

        <div class="card">
          <div class="card-image" style="background-image: url(<%= poll.imageURL %>)">
          </div>
          <div class="card-content">
            <p><%= poll.text %></p>
          </div>
          <div class="card-action">
            <a data-id="<%=poll.id%>" data-vote="up" class="vote" ><i class="material-icons">thumb_up</i><%= poll.upvotes %></a>
            <a data-id="<%=poll.id%>" data-vote="down" class="vote" ><i class="material-icons">thumb_down</i><%= poll.downvotes %></a>
          </div>
        </div>
      <% }); %>
    <% } %>
</div>
```

There is a bunch of stuff going on there. In short we sort the polls by some `score`,  loop over the polls, and render some materializecss cards.

EJS is helping us by working its rendering magic. When we pass in an object to ejs, in this case, `polls`, to render `index.ejs`.  We don't have to write separate templates for every new poll added to `polls`.

There are even more neat things ejs can help us with: we can use the control flow operator `%` for for loops, boolean logic, and even creating variables, and we can display variables with the `<%= %>` operator, such as `<%= polls.title %>`. In a nutshell, ejs makes our static html template dynamic.


## Create A New Poll Page

🚀  We will also make a page to create new polls.  Let's create an `/app/views/new.ejs` file.   Let's start with including partials as usual.

```html
<html>
<% include partials/head %>
<body>
  <% include partials/nav %>
</body>
</html>
```

Now, we can design how the poll information will be displayed.  We can insert the same html we did to display the `poll.imageURL`, `poll.text`, etc. as we did in the index.

🚀 Here's some basic html for using a materializecss styled form. Note that the form method is `post` and that the action is `/new`.  This means that when we click the submit button we will submit an http post request to the server, hitting the `/new` route.

```html
<div class="section container">
  <div class="row">
    <form action="/new" method="post">
      <div class="row">
        <div class="input-field">
          <input name="imageURL" id="imageURL" type="text" class="validate">
          <label for="imageURL">Image URL</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <textarea name="text" id="text" type="text" class="materialize-textarea"></textarea>
          <label for="text">Poll Text</label>
        </div>
      </div>
      <button class="btn waves-effect waves-light" type="submit">Submit
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</div>
```

Nice, this doesn't work yet but your frontend is practically finished.

## Controllers

Notice anything a little familiar in our terminology?   Yup, we're on our way to creating a standard MVC for our API server!   

🚀 Create a directory `app/controllers` and a file inside this named `poll_controller.js`.   What might this controller do? Well it should have methods that perform all the main functionality of our API.  In short those methods would be:

```javascript
import Poll from '../models/poll';


export const getPolls = () => {
  // should return a promise that returns a list of polls
};

export const createPoll = (poll) => {
  // takes in an object with the fields that poll should shave
  // and saves them to the database
  // returns a promise
};

export const vote = (pollID, upvote) => {
  // takes in the poll id to update and a boolean of whether
  // to update or not.
  // returns a promise
}
```

All these methods do not do anything meaningful right now. Let's leave these methods now with filler and then deal with the details later.

### Routing

Now we are ready to wire our app all together with routes. We can create a separate routes file, but our application is pretty small, so we can store all of our routes in our `app/server.js`:

We can define our `polls/:id` routes for all polls like below:

```javascript
// example!
// on routes that end in /polls
// ----------------------------------------------------
app.get('/polls/:id', (req, res) => {
  /*someMethod*/
});
```
{: .example}


Note `/*someMethod*/` is just a comment, you would call a method there that calls our controller methods — more on that shortly!

Ok, remember how we defined all our API endpoints in our controller?  Let's map them in our router. You have access to methods on app `.get()`, `.post()`, and others that we won't be using.  

🚀 Use the syntax above to make routes to map to the following:

* GET `/`: Call polls.getPolls and render `index` in the callback:

```js
Polls.getPolls().then((polls) => {
  res.render('index', { polls });
}).catch((error) => {
  res.send(`error: ${error}`);
});
```

*Note: in case of error we're just sending back a single string with the error. Not very robust.*

* GET `/new`:  render the `new` page in the callback.

```js
res.render('new');
```

* POST `/new`: Call `Polls.createPoll()` and redirect to `/` on success.

```js
const newpoll = {
  text: req.body.text,
  imageURL: req.body.imageURL,
};
Polls.createPoll(newpoll).then((poll) => {
  res.redirect('/');
});
```

* POST `/vote/:id`: Call `Polls.vote()` and return success, we will use this to upvote/downvote.

```js
const vote = (req.body.vote === 'up');// convert to bool
Polls.vote(req.params.id, vote).then((result) => {
  res.send(result);
});
```

Note: `req.params.id` - where is that coming from? Similarly to how the routing works in react, the `:id` defined in the route!

🚀  Don't forget to import our Poll controller functions:

```javascript
import * as Polls from './controllers/poll_controller';
```

## Controller Continued

Ok, but our controller `controllers/poll_controller.js` is fairly useless.  We have everything wired, but we need to actually store stuff.

### getPoll

We should first implement the `getPolls` endpoint.

🚀 We just use our `Poll` Mongoose model schema to get all the polls in the Polls collection by calling the `.find()` method:

```javascript
export const getPolls = () => {
  return Poll.find({});
};
```

What is happening with the return above?  I thought we said we needed to return that *promise* thing? Turns out the mongoose `find()` method is a promise already, so we can just return it and use `.then()` in our route. Nice!

🚀 Let's test this now and view the page at `http://localhost:9090/`. They should show our two polls that we created in the `mongo` shell.

Now that we have the `getPolls` method working, we have to use more database methods (all of them can be found in the [mongoose docs](http://mongoosejs.com/docs/queries.html)).
to implement the `createPoll` and `vote` methods.

### createPoll

The createPoll function should take in an Object with `text` and `imageURL` fields. It will then instantiate a new Poll object, assign some values, and save.

🚀 Like so:

```js
export const createPoll = (poll) => {
  const p = new Poll();
  p.text = poll.text;
  p.imageURL = poll.imageURL;
  return p.save();
};
```

Note: `save` is a promise too! We were able to instantiate a new Poll easily with the `new` keyword just like a class, very nice.

### vote

The final controller function we need should take in a poll id and also whether to upvote or downvote. Let's take this argument in as a boolean.  At least that is one way to do it.  We will use the poll id to find the specific poll using `.findOne()`.

```js
export const vote = (pollID, upvote) => {
  return Poll.findOne({ _id: pollID }).then((poll) => {
    console.log(`updating vote: ${poll} ${upvote}`);
    if (upvote) {
      poll.upvotes += 1;
    } else {
      poll.downvotes += 1;
    }
    return poll.save();
  });
};
```

This one is a bit more complicated, we have to find the specific vote and set some fields and then save it.  Note how here we are both returning a promise but also have a `.then`.  Since you can chain them you can return a promise plus a then and that it still a promise.


## Upvote / Downvote

We now have all the server endpoints in place to add upvote/downvote capability, we just need to call our `vote/:id` endpoint from the frontend.

🚀 Let's add the following at the bottom of our `index.ejs` file.  It will enable our upvote / downvote buttons to actually work.

```js
<script>
$('.vote').click(function(event) {
  event.preventDefault();
  var vote=$(event.currentTarget).data('vote');
  var id=$(event.currentTarget).data('id');
  $.ajax({
    type: "POST",
    url: "/vote/"+id,
    data: {vote}
  }).done(location.reload());
});
</script>
```

In the above we make an ajax call to the server to update the fields, and then we just reload the page. There are better ways of updating our display but for now this should suffice!

## Deploy to Heroku

Great! We have everything working now. We will need to host this new server component!

1. Head over to [Heroku](https://www.heroku.com/) and login/sign up. Then, make a new app.
2. Now you need to connect to a mongo database.  Go to *Resources* and search for "mLab" under *Add-Ons*. Provision the *Sandbox* version of mLab for your app. This will automatically set a `MONGODB_URI` config variable so once you push your code to Heroku it will connect to this new mongo database. You'll need to enter in a credit card but it is free so it won't be charged.
3. Follow the steps under "Deploy Using Heroku Git".

## To Turn In

1. github url to your repo
1. url to your new heroku app instance

## Extra Credit

1. How might you delete polls?
1. What about preventing people from voting multiple times using cookies or localstorage?
