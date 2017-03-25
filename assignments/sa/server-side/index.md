---
layout: page
title: SA 6 MongoDB with Templating
published: true
---
![](/img/enm.png){: .small }

## Overview

Today we'll be learning how to create a petition site: it will be an [express](https://expressjs.com/) server that displays some data which is stored using [mongodb](https://www.mongodb.com/). We'll get a real taste of backend development with server-side rendering.

## Some Setup
First, let's download `node` and `mongodb` packages.
```bash
brew install node
brew install mongodb
echo "REDIRECT_URL = 'http://localhost:8080/petitions'" >> .env
```

🚀 We're going to be building a petition site, where users can sign various petitions. We will be using [express-babel-starter](https://github.com/dartmouth-cs52/express-babel-starter) to start — take a look through the `package.json` file. Mostly this sets us up with an `express` node server with a tiny bit of boiler plate as well as linting and babel. Do the usual: create your own repo and change the remote.

```bash
npm install
npm run dev
```

This will start our new node+express app in dev reloading mode.

## Intro Express

[Express](https://expressjs.com/) is a web framework for Node.js.  What it does for us is provide a way to listen for and respond to incoming web requests. Today, we will be creating API endpoints to respond to certain GET requests.

Take a look through the current `app/server.js` file. This is the entry point for the app. Just like `index.js` has been in our frontend app (the names of these are arbitrary). Note how we are setting the route:

```javascript
// default index route
app.get('/', (req, res) => {
  res.send('hi');
});
```
This function take 2 arguments:  request and response.  

Request is an express object that contains, among other things, any data that was part of the request. For instance, the JSON parameters we would POST or PUT in our asynchronous `axios` calls would be available as `req.body.parameterName`.

Response is another special express object that contains, among other things, a method named `send` that allows us a send back a response to the client.  When your api call gets back JSON data this is how it is returned.  Consider `res.send()` the equivalent of a network based `return` statement.

We'll add more routing in shortly, but first let's set up our database!

## Mongo Database Server

Mongo is the database that we are going to use.  We've already installed `mongodb` using Homebrew.  

Then follow further [installation instructions here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition).

 🚀 You will need to run the `mongod &` process, which your node app will connect to.  This is a background server process.

There is a commmandline client you can use to connect to the database: `mongo`. You can also play around with a more graphical client [robomongo](https://robomongo.org/).

🚀  Below are some commands we can run to create some petitions.
```bash
# mongoshell is a commandline interface to your local mongo db

show dbs
# will show your current databases

use bodypolitic
# will make bodypolitic the current database

db.petitions.insert(
   {
      'title': 'Sample Petition',
      'author':'Someone',
      'text': 'Some information about this petition. It is a really great petition.',
      'imageURL': '/img/card_background.jpg'
   }
)
# will insert an object into the database
# into a collection called petitions

db.petitions.find()
# returns everything in this collection
db.petitions.insert(
   {
     'title': "Immediate Release of Donald Trump's Tax Returns",
     'author':'Dartmouth Faculty',
     'text': 'The unprecedented economic conflicts of this administration need to be visible to the American people, including any pertinent documentation which can reveal the foreign influences and financial interests which may put Donald Trump in conflict with the emoluments clause of the Constitution.',
     'imageURL': '/img/card_background.jpg'
   }
)

# add in another entry

db.petitions.find({"author": "Dartmouth Faculty"})
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
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/bodypolitic';
mongoose.connect(mongoURI);
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

```

## Models

We're going to create a data model to work with.   A data model in mongoose is initialized from a schema, which is a description of the structure of the object.   This is much more like what you might be familiar with statically typed classes in Java.

🚀 Create a directory `app/models` and a file inside this directory named `petition.js`.


```javascript
import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const PetitionSchema = new Schema({
  title: String,
  author: String,
  text: String,
  imageURL: String,
  signatures: [{ type: Schema.Types.ObjectId, ref: 'Signee' }],
});


// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
```

This will do for now, let's see about how to use this.

## Views
We need to create views for how our petitions will look like on the page.
🚀 In directory `app/views` look at `index.ejs`.   This is html written in [ejs](https://www.npmjs.com/package/ejs), which allows us to embed javascript in html.   Therefore, when we re-render the index page, the index page will change depending on what objects we pass it.   In this case, `petitions` is the object we pass to `index.ejs`.   We can see how useful ejs is: we can use the control flow operator `%` for for loops and boolean logic, and we can display variable parameters with the `<%= %>` operator, such as `<%= petitions.title %>`.   It makes our static server  dynamic.

🚀 Let's download ejs:

```bash
npm install --save ejs
```

🚀 and see what the page looks like without any petitions, and change `app/server.js` to now render the page:

```javascript
// default index route

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.set('views', path.join(__dirname, '../app/views'));
// this just allows us to render ejs from the ../app/views directory

app.get('/', (req, res) => {
  petitions = [];
  res.render('index', { petitions });
});
```

🚀  How should we want our petitions to look?   Let's create `/views/petitions.ejs` file.   Let's start with including our partials as usual.

```
<html>

<% include partials/head %>

<body>
  <% include partials/nav %>
  <% include partials/modal %>

  <div>
    <div class="petition">
    </div>
  </div>
</body>
</html>
```

🚀  Now, we can design how the petition information will be displayed. Within the `<div class="petition">` tag, we can insert:


```html
<div class="image">
  <img class="petition-image" src="<%= petition.imageURL %>" alt="petition_image">
</div>
<div class="information">
  <div class="title"><%= petition.title %></div>
  <div class="author"><%= petition.author %></div>
  <div class="preview_text"><%= petition.text %></div>
  <div class="line">
    <div class="supporters">
      <img class="icon" src="/icons/supporter.png" alt="pen_icon"/>
        <div>Number of Supporters: <%= petition.signatures.length %></div>
    </div>
  </div>
```

To display not just the number of people who signed the petition but also the information of each signer, we can start with the template below to display signer's information under the petition information.  

```html
  <div class="signees">
    <% if (petition.signatures.length > 0) { %>
      <ul>
       <% petition.signatures.forEach(function(signer) { %>
         <li>
          ...
        </li>
       <% }); %>
       </ul>
    <% } %>
  </div>
```
{: .example}

## Controllers

Notice anything a little familiar in our terminology?   Yup, we're on our way to creating a standard MVC for our API server!   

🚀 Create a directory `app/controllers` and a file inside this named `petition_controller.js`.

What might the controller do?

Well it should have methods that perform all the main functionality of our API.  In short those methods would be:

```javascript
import Petition from '../models/petition';

export const addSignee = (petitionID, role, name, done) => {
  done(null, name);
};

export const getPetition = (petitionID, done) => {
  done(null, petitionID);
};

export const getPetitions = (done) => {
  done(null);
};
```

Let's fill these methods now with filler and then deal with the details later.


### Routing

Now we are ready to wire it all together with routes. We can create a separate routes file, but our application is pretty small, so we can store all of our routes in our `app/server.js`:

Express allows us to use a chaining method to simplify how our routes look. For instance here is how we could define our `petitions/:id` routes, for all petitions.

```javascript
// example!
// on routes that end in /petitions
// ----------------------------------------------------
app.get('/someroute/:someID', (req, res) => {
  /*someMethod*/
});
```
{: .example}

Note `/*someMethod*/` is just a comment, you would call a method there in a module that we will call the controller — more on that shortly!

Ok, remember how we defined all our API endpoints in our controller?   Let's map them in our router.

🚀 Use the syntax above to make routes to map the following:

* GET `/`: Call petitions.getPetitions and render `index` in the callback
* GET `/petitions/:id`:  Call Petitions.getPetition and render `petition` page in the callback
* GET `/sign/:petitionID`:  Call Petitions.addSignee and render `petition` page in the callback

## Controller Continued

Ok but our controller `controllers/petition_controller.js` is fairly useless.  We have everything wired, but we need to actually store stuff.

We should first implement the `getPetitions` endpoint.

Let's fill out the contents of the `getPetitions` method:

🚀 We just use our `Petition` Mongoose model schema to get all the petitions in the Petitions collection:

```javascript
export const getPetitions = (done) => {
  Petition.find({}, (error, petitions) => {
    done(null, petitions);
  });
};
```

🚀 Let's test this now and view the page at `localhost:9090/`. They should show our two petitions that we created in the `mongo` shell.

Now that we have the `getPetitions` method working, we have to use more database methods (all of them can be found in the [mongoose docs](http://mongoosejs.com/docs/queries.html)).
to implement the `getPetition` and `addSignee` methods.

In the `getPetition` method, we should use `.findOne()` to display the petition given by the id.
In the `addSignee` method, `.findOne()`, and `.save()` are helpful.
For both of these methods, need to get the router id that is passed in when we hit `/petitions/:id`.  This is accessible as `req.params.id` inside each of our controller functions that had this `:id` path variable.

## To Turn In

1. github url to your repo

### Extra Credit
* add more useful routes, such as creating petitions or deleting them, or removing a signature from a petition.
