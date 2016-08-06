---
layout: page
title: HW 5 p1
published: true
---



## Blog: Server

![](img/enm.jpg){: .small}


For this assignment we are going to build an [express](https://expressjs.com/) and [mongodb](https://www.mongodb.com/) CRUD api server for our react+redux blog frontend. This will finally bring our stack all the way down to the database.

## Assignment At a Glance

* Part 1:
  * Intro to Express and Mongo: You'll get a bit more handholding here. We'll add in the `post` schema, get going with express routes, and get set up for adding in the other stuff.
  * Basic CRUD API: Building from the intro, we'll implement the full create, update, delete api for our blog.
* Part 2:
  * Authentication: We'll extend both our frontend and our backend to support authentication and users!


## Some Setup


First we should do some basic setup steps.  

🚀 Easiest is to start from a tiny [express-babel-starter](https://github.com/dartmouth-cs52/express-babel-starter) — take a look through the `package.json` file. Mostly this sets us up with an `express` node server with a tiny bit of boiler plate as well as linting and babel. Do the usual: create your own repo and change the remote.

```bash
npm install
npm run dev
```

This will start our new node+express app on http://localhost:9090 in dev reloading mode.

Ok, now that we got that out of the way. Let's dig in!  



### React App Debugging

The whole point here is to get your blog app working with this new server, so we will point your blog frontend to this new server.

🚀 Change your server api url:

```javascript
const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
```

And start up your react+redux blog app.  It'll be broken for now (should display no blog entries), but hopefully soon we'll have it all working!


## Intro Express

[Express](https://expressjs.com/) is a web framework for Node.js.  What it does for us is provide a way to listen for and respond to incoming web requests.

Each of the http API requests we were making in Part 1 will need to be provided in this assignment.

To recap the API has the following endpoints:

* GET  `/api/posts/`
  returns only title and tags for all posts
  `[[{"id":"",title":"","tags":""},...]`
* POST `/api/posts/` with post parameters `{'title', 'tags', 'content'}`
  creates a new post
* PUT `/api/posts/:postID` with parameters `{'title', 'tags', 'content'}`
  will update an entry
* GET `/api/posts/:postID`
  returns the post found at `postID`
* DELETE `/api/posts/:postID`
  deletes the post found at `postID`

Let's implement these and more!

Take a look through the current `app/server.js` file. This is the entry point for the app. Just like `index.js` has been in our frontend app (the names of these are arbitrary). Note how we are setting the route:

```javascript
// default index route
app.get('/', (req, res) => {
  res.send('hi');
});
```

This routing concept is identical to the routing we used in our react app.  It maps URL paths to functions.  These functions take 2 arguments:  request and response.  

Request is an express object that contains, among other things, any data that was part of the request. For instance, the JSON parameters we would POST or PUT in our asynchronous `axios` calls would be available as `req.body.title`, etc.  

Response is another special express object that contains, among other things, a method named `send` that allows us a send back a response to the client.  When your api call gets back JSON data this is how it is returned.  Consider `res.send()` the equivalent of a network based `return` statement.

We'll add more routing in shortly, but first let's set up our database!


## Mongo Database Server

Mongo is the database that we are going to use.  We will run a local mongo daemon to connect to for testing.


🚀 On OSX to install:

```bash
brew install mongodb
```

Then follow further [installation instructions here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition).

You will need to run the `mongod &` process, which your node app will connect to.  This is a background server process.

There is a commmandline client you can use to connect to the database: `mongo`. You can also play around with a more graphical client [robomongo](https://robomongo.org/).

```javascript
// mongoshell is a commandline interface to your local mongo db

show dbs
// will show your current databases

use mytest
// will make mytest the current database

db.buildings.insert(
   {
      "address" : {
         "street" : "9 Maynard",
         "zipcode" : "03755",
         "building" : "Sudikoff",
         "coord" : [ -72.2870536, 43.7068466 ]
      },
      "dept" : "CS",
   }
)
// will insert an object into the database
// into a collection called buildings

db.buildings.find()
// returns everything in this collection

db.buildings.insert(
   {
      "address" : {
         "street" : "2 E Wheelock St",
         "zipcode" : "03755",
         "building" : "Hopkins Center For the Arts",
         "coord" : [ -72.2901329, 43.7020189 ]
      },
      "dept" : "Hop",
   }
)
// add in another entry

db.buildings.find({"address.building": "Sudikoff"})
// finds a entry in database by nested key:value
```

Ok, so now you've played a little bit with mongo directly, let's build something on top of it.

## Mongoose

![](img/mongoose.jpg){: .small .fancy }

To connect to mongo we will use a module called `mongoose`. [Mongoose](http://mongoosejs.com/) is a an object model for mongo. This allows us to treat data that we are storing in mongo as objects that have a nice API for querying, saving, validating, etc.  Mongo is in general considered a schema-less store.  We store JSON documents in a large object tree similarly to firebase. However, with Mongoose we are able to specify a schema for our objects.  This is purely in code and allows use to validate and assert our data before inserting it into the database.

🚀 Install mongoose:  `npm install --save mongoose`

🚀 And just a little bit of code to get mongoose initialized with our database in `server.js`


```javascript
import mongoose from 'mongoose';


// DB Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/blog';
mongoose.connect(mongoURI);
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

```


## Model

We're going to create a data model to work with. A data model in mongoose is initialized from a schema, which is a description of the structure of the object. This is much more like what you might be familiar with statically typed classes in Java.

🚀 Create a directory `app/models` and a file inside this directory named `post_model.js`.


```javascript
import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const PostSchema = new Schema({
  title: String,
});

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
```

This will do for now, let's see about how to use this.

## Controller

Notice anything a little familiar in our terminology?   Yup, we're basically creating a standard MVC for our API server!   Well, except without much in the way of views, these will just be JSON.

🚀 Create a directory `app/controllers` and a file inside this named `post_controller.js`.

What might the controller do?

Well it should have methods that perform all the main functionality of our API.  In short those methods would be:

```javascript
import Post from '../models/post_model';

export const createPost = (req, res) => {
  res.send('post should be created here');
};
export const getPosts = (req, res) => {
  res.send('posts should be returned');
};
export const getPost = (req, res) => {
  res.send('single post looked up');
};
export const deletePost = (req, res) => {
  res.send('delete a post here');
};
export const updatePost = (req, res) => {
  res.send('update a post here');
};
```

Let's fill them in now with filler and then deal with the details later.


### Routing

Now we are ready to wire it all together with routes!  The way we are doing it earlier is not very extensible. We should create a separate file for routes, like we did with React.

🚀 Create:  `app/router.js`.

Here's some boilerplate to get us going:

```javascript
import { Router } from 'express';
import * as Posts from './controllers/post_controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

///your routes will go here

export default router;
```

Express provides a nice [route interface](https://expressjs.com/en/4x/api.html#router) that we will use to define all of our routes.

The chaining method simplifies how our routes look. For instance here is how we could define our `posts/:id` routes.

```javascript
// example!
// on routes that end in /posts
// ----------------------------------------------------
router.route('/someroute/:someID')
  .post(/*someMethod*/)
  .get(/*someMethod*/);
  .delete(/*someMethod*/);
```
{: .example}

Note `/*someMethod*/` is just a comment, you would call a method there in a module that we will call the controller — more on that shortly!


Ok, remember how we defined all our API endpoints?   Let's map them in our router.

🚀 Use the syntax above to make routes to map the following:

* POST `/posts`:  Posts.createPost
* GET `/posts`:  Posts.getPosts

and also for:

* GET `/posts/:id`: Posts.getPost
* PUT `/posts/:id`: Posts.updatePost
* DELETE `/posts/:id`: Posts.deletePost

You will have 2 `router.route()` definitions with separate chains of HTTP verb methods, one for `/posts` and one for `/posts/:id`.


### Import New Routes

🚀 Now in your `app/server.js` file import our new routes and assign them to handle all `/api/*` routes!

```javascript
//at top of server.js
import apiRouter from './router';

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);
```

Neat!

### First Pass Test

Let's test what we have done so far! Test out each of the routes using these curl commands (just modified version with localhost from hw4):

```bash
# all posts get:
curl -X GET "http://localhost:9090/api/posts"

# create new post
curl -X POST -H "Content-Type: application/json" -d '{
    "title": "first post",
    "tags": "words",
    "content":  "this is a test post"
}' "http://localhost:9090/api/posts"

# update by POSTID
curl -X PUT -H "Content-Type: application/json" -d '{
    "title": "new title",
    "tags": "new words",
    "content":  "old content"
}' "http://localhost:9090/api/posts/POSTID"

# fetch 1 by POSTID
curl -X GET "http://localhost:9090/api/posts/POSTID"

# delete by POSTID
curl -X DELETE -H "Content-Type: application/json" "http://localhost:9090/api/posts/POSTID"

```


## Controller Continued

Ok but our controller `controllers/post_controller.js` is fairly useless.  We have everything wired, but we need to actually store stuff.

Let's walk through making one of those endpoints not useless!

The most important might be the `createPost` endpoint.  If you recall from HW4 this gets called with the fields of our new post `{title: '', tags: '', contents: ''}`.  These end up in our `req` (request) object, specifically in `req.body`.

Let's fill out the contents of the `createPost` method:

🚀 create a new Post object:

```javascript
const post = new Post();
```

All our fields are available in `req.body`, so let's set them on the new Post object.

```javascript
post.title = req.body.title;
```

Now we just have to save the object (so far we've been working with a new instance purely in memory).  Most save and query methods in Mongoose can return promises — so let's stretch our promise muscles a little.

```javascript
post.save()
.then(result => {
  res.json({ message: 'Post created!' });
})
.catch(error => {
  res.json({ error });
});
```

It is common practice to return the modified object in a API call as confirmation, but often API's will just return various success codes also to indicate success or failure. We're going to return JSON though for now.


🚀 Let's test that this worked:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "title": "first post"
}' "http://localhost:9090/api/posts"
```

And then in mongo shell:  

```javascript
use blog
db.posts.find()
```

## Get All Endpoints Working


Your mission is to now implement the rest of the endpoints!  You have the wiring ready, all you need is to use the [mongoose docs](http://mongoosejs.com/docs/queries.html) to implement `getPost`, `getPosts`, `updatePost`, and `deletePost`.  You may find mongoose methods such as: `.find()`, `.findById()`, `.remove()` helpful.  You might want to look into sorting the results for `getPosts` by `created_at`.

Note!  In the above we only saved `title`, none of the other fields were defined in our Post Schema!  You should now go back and add the other fields we need to the model as well as to the all the controller methods.

One more caveat! Mongo happens to use `_id` instead of `id` as we have been so you could use a method like the following to format the list of posts to be cleaner.

```javascript
// this cleans the posts because we use id instead of dangling _id
// and we purposefully don't return content here either
const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags };
  });
};
```

This would be before you `res.json()` them back to the client.

And finally, you'll need to get the router id that is passed in when we hit `/posts/:id`.  This is accessible as `req.params.id` inside each of our controller functions that had this `:id` path variable.



## What about APIKEY

Note, unlike the blog api we've been using, nothing in the above relies on the query parameter `?key=foobar`. This is because this is your personal database for which we're shortly going to implement authentication, so you don't really need the APIKEY sandboxing.  If you were curious and wanted to implement it it would be available to you in `req.query.key` and easiest would be to store it in each document and then query on it.


## Hosting

We will need to host this new server component so your blog can use it instead of the `cs52-blog.herokuapp.com` one.  

Create a new Heroku app similarly to how to you did for the slack assignment:

1. Head over to [Heroku](https://www.heroku.com/) and login/sign up. Then, make a new app.
1. Now you need to connect to a mongo database.  Go to *Resources* and search for "mLab" under *Add-Ons*. Provision the *Sandbox* version of mLab for your app. This will automatically set a `MONGODB_URI` config variable so once you push your code to Heroku it will connect to this new mongo database.
1. Follow the steps under "Deploy Using Heroku Git".


## P1 Complete

Once you have all the api endpoints complete, test it out using your blog frontend, make sure all the parts still work!  IE. Change your HW4 `ROOT_URL` to point to your Heroku hosted server instance.  


## To Turn In

1. github url to your repo
1. working url for HW4 on surge that points to your new API server:
  * for HW4 create a new branch and a new surge site so we can test both version.
  * you can modify this new HW4 branch to add in new functionality for EC for this assignment.


## Extra Credit

* change your tags store to be an array rather than a string, can just split by whitespace
* add commenting to posts (either an array or another model) / change both api and frontend to support this.
* really at this point you can start modifying your blog to be whatever you want. Add in photo storage with S3 (tricky). Add in new fields to your posts.
* add in search support. Here's an [article](https://www.compose.com/articles/full-text-search-with-mongodb-and-node-js/) that might help you get started.
* in part 2 we'll introduce User and Authentication so don't implement those here though.
