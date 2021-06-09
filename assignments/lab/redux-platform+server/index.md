---
layout: page
title: Lab5
published: true
comment_term: lab-redux-blog+server
---



## Platform: Server

![](img/enm.jpg){: .small}


For this assignment we are going to build an [express](https://expressjs.com/) and [mongodb](https://www.mongodb.com/) CRUD api server for our react+redux blog frontend. This will finally bring our stack all the way down to the database.

Our server will be a pure api server, returning only JSON format data to our Lab4 frontend.

## Assignment At a Glance

  * Intro to Express and Mongo. [SA7](http://cs52.me/assignments/sa/server-side/) got you started with Express.js and Mongo, we'll now use that knowledge to build up an API server.  The difference here is that we won't be returning HTML but rather JSON. Easier! We'll add in the `post` schema, get going with express routes, and get set up for adding in the other stuff.
  * Basic CRUD API: Building from the intro, we'll implement the full create, update, delete api for our blog.

## Some Setup


First we should do some basic setup steps.  

🚀 Provision a repo for the server using the github classroom link in canvas.

🚀 Do what you did in [lab4](../redux-platform) when pulling from your own starterpack but in this case we'll pull from a different starter — create your repo with the usual github classroom link from canvas, add a starter remote to this premade starter pack, and pull from it.

```bash
#make sure you are in your project directory
git remote add starter git@github.com:dartmouth-cs52/express-babel-starter.git
git pull starter main
```

During SA7 we inspected the starterpack, it isn't very complicated - just express+babel+eslint (no webpack since we are using node).

Ok, now that we got that out of the way. Let's dig in! 


### React App Debugging

The whole point here is to get your blog app working with this new server, so we will point your blog frontend to this new server.

🚀 Change your server api url:

```javascript
const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://platform.cs52.me/api';
```

And start up your react+redux blog app.  It'll be broken for now (should display no blog entries), but hopefully soon we'll have it all working!


## Intro Express

[Express](https://expressjs.com/) is a web framework for Node.js.  What it does for us is provide a way to listen for and respond to incoming web requests.

Each of the http API requests we were making will need to be provided in this assignment.

To recap the API has the following endpoints:

* GET  `/api/posts/`
  returns only title, tags, and coverUrl for all posts
  `[[{"id":"",title":"","tags":"", "coverUrl": ""},...]`
* POST `/api/posts/` with post parameters `{'title', 'tags', 'content', 'coverUrl'}`
  creates a new post
* PUT `/api/posts/:postID` with parameters `{'title', 'tags', 'content', 'coverUrl'}`
  will update an entry
* GET `/api/posts/:postID`
  returns the post found at `postID`
* DELETE `/api/posts/:postID`
  deletes the post found at `postID`

Let's implement these and more!

Take a look through the current `src/server.js` file. This is the entry point for the app. Just like `index.js` has been in our frontend app (the names of these are arbitrary). Note how we are setting the route:

```javascript
// default index route
app.get('/', (req, res) => {
  res.send('hi');
});
```

This routing concept is identical to the routing we used in our react app.  It maps URL paths to functions.  These functions take 2 arguments:  `request` and `response`.  

**Request** is an express object that contains, among other things, any data that was part of the request. For instance, the JSON parameters we would POST or PUT in our asynchronous `axios` calls would be available as `req.body.title`, etc.  

**Response** is another special express object that contains, among other things, a method named `send` that allows us to send back a response to the client.  When your api call gets back JSON data this is how it is returned.  Consider `res.send()` the equivalent of a network based `return` statement.

We'll add more routing in shortly, but first let's set up our database!


## Mongo Database Server

Mongo is the database that we are going to use.  We will run a local mongo daemon to connect to for testing.

🚀 Install MongoDB Server and Client:  you should already have these installed from the [server-side short](../../sa/server-side) assignment [installation instructions here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition).

There is a commmandline client you can use to connect to the database: `mongo`. You can also play around with a more graphical client [mongodb compass community](https://www.mongodb.com/download-center?jmp=nav#compass) (just make sure to download the *community* version).

```bash
mongo
```

```javascript
// mongoshell is a commandline interface to your local mongo db

show dbs
// will show your current databases

use platform_db
// will make platform_db the current database name, db in the below refers to this.

db.posts.insert(
   {
     "title": "first post",
     "tags": "words",
     "content":  "this is a test post",
     "coverUrl": "https://media.giphy.com/media/uscuTAPrWqmqI/giphy.gif"
   }
)
// will insert an object into the database
// into a collection called posts

db.posts.find()
// returns everything in this collection

db.posts.find({"title": "first post"})
// finds a entry in database by nested key:value
```

Ok, so now you've played a little bit with mongo directly, let's build something on top of it.

## Mongoose

![](img/mongoose.jpg){: .small .fancy }

Don't forget to install  Mongoose! Just repeat the Mongoose section from [server-side](../sa/server-side/#mongoose)

Use `platform_db` instead of `polls` as your database name though!


## Model

We're going to create a `Post` data model to work with. You've already made something similar in [SA7](../sa/server-side/#models)

🚀 Create a directory `src/models` and a file inside this directory named `post_model.js`.


```javascript
import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field


// create PostModel class from schema


export default PostModel;
```

This will do for now, let's see about how to use this.

## Controller

🚀 Create a directory `src/controllers` and a file inside this named `post_controller.js`.

What might our controller do?

Well it should have methods that perform all the main functionality of our API.  In short those methods would be:

```javascript
import Post from '../models/post_model';

export const createPost = async (postFields) => {
  //await creating a post
  //return post
};
export const getPosts = async () => {
  //await finding posts
  //return posts
};
export const getPost = async (id) => {
  //await finding one post
  //return post
};
export const deletePost = async (id) => {
  //await deleting a post
  //return confirmation
};
export const updatePost = async (id, postFields) => {
  //await updating a post by id
  //return *updated* post
};
```

Let's just have them empty for now and then deal with the details later.  ⚠️ Note now this is a bit different from what we did in the server-side short.  There we played with promises, but here we'll play with async/await to make it a bit more readable. Up to you how you prefer it.

### Routing

Now we are ready to wire it all together with routes!  The way we were doing it earlier is not very extensible. Lets create a separate file for routes.

🚀 Create:  `src/router.js`.

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
// on routes ending in /someroute/:someID
// ----------------------------------------------------

const exampleHandleDelete = async (req,res) => {
    try {
      // use req.body etc to await some contoller function
      const result = await Contoller.someFunction(req.params.someID);
      // send back the result
      res.json(result);
    } catch (error) {
      // or catch the error and send back an error
      res.status(500).json({ error });
    }
}

router.route('/someroute/:someID')
  .post(async (req,res) => {
    // use req.body etc to await some contoller function
    // send back the result
    // or catch the error and send back an error
  })
  .get(/*your choice of defining inline above or function by reference below*/)
  .delete(exampleHandleDelete);
```
{: .example}

In short, you listen on a route and register various callback functions. Those could be defined inline, or separated out. In this example we are marking them as async functions and from each of these we will call the various controller methods we have defined.

Ok, remember how we defined all our API endpoints?   Let's map them in our router.

🚀 Use the syntax above to make routes and functions to handle the following:

* POST `/posts`:  Posts.createPost
* GET `/posts`:  Posts.getPosts

and also for:

* GET `/posts/:id`: Posts.getPost
* PUT `/posts/:id`: Posts.updatePost
* DELETE `/posts/:id`: Posts.deletePost

You will have 2 `router.route()` definitions with separate chains of HTTP verb methods, one for `/posts` and one for `/posts/:id`.


### Import New Routes

🚀 Now in your `src/server.js` file import our new routes and assign them to handle all `/api/*` routes!  Nicely organized. 

```javascript
//at top of server.js
import apiRouter from './router';

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// this should go AFTER body parser
app.use('/api', apiRouter);
```

Neat!

Note: the `app.use('api` line should go towards the bottom of the file, in particular after `bodyparser`.  The `server.js` file is **read top to bottom every connection request**, so when it hits the route definition if the body of the request hasn't been parsed you will get errors when you try to use  `req.body`.

### First Pass Test

Let's test what we have done so far! Test out each of the routes using these curl commands (just modified version with localhost from hw4).

🍸 Since you don't yet have the controller functions working, try making mock `res.json({'hi'})` test responses for each of the routes so you know that they are being called. 

```bash
# all posts get:
curl -X GET "http://localhost:9090/api/posts"

# create new post
curl -X POST -H "Content-Type: application/json" -d '{
    "title": "first post",
    "tags": "words",
    "content":  "this is a test post",
    "coverUrl": "https://media.giphy.com/media/uscuTAPrWqmqI/giphy.gif"
}' "http://localhost:9090/api/posts"

# update by POSTID
curl -X PUT -H "Content-Type: application/json" -d '{
    "title": "new title"
}' "http://localhost:9090/api/posts/POSTID"

# fetch 1 by POSTID
curl -X GET "http://localhost:9090/api/posts/POSTID"

# delete by POSTID
curl -X DELETE -H "Content-Type: application/json" "http://localhost:9090/api/posts/POSTID"

```


## Controller Continued

Ok, but our controller `controllers/post_controller.js` is fairly useless.  We have everything wired, but we need to actually store stuff.

Let's walk through making one of those endpoints not useless!

The most important might be how to handle `createPost`.  If you recall from Lab4 this gets called with the fields of our new post `{title: '', tags: '', contents: '', coverUrl: ''}`.  These end up in our `req` (request) object, specifically in `req.body`.

Let's fill out the contents of the `createPost` method:

🚀 create a new Post object:

```javascript
const post = new Post();
post.title = postFields.title;
```

🚀 All our fields are available in `req.body` and we should have passed them into our controller as `postFields` (or however you want to name the argument), so let's set them on the new Post object. You know how to do this.

Now we just have to save the object (so far we've been working with a new instance purely in memory).  Most save and query methods in Mongoose can return promises — which we know can also be used with async/await notation, so let's practice that a bit here.

```javascript
  try {
    const savedpost = await post.save();
    return savedpost;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
```

It is common practice to return the modified object in a API call as confirmation, but often API's will just return various success codes also to indicate success or failure.

⚠️ Now double check your route handler, are you `await`ing the controller function `Posts.createPost(req.body)` and then `res.json` responding with the results? 


🚀 Let's test that this worked:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "title": "first post"
}' "http://localhost:9090/api/posts"
```

And then in mongo shell `mongo`:

```javascript
use blog
db.posts.find()
```

## Get All Endpoints Working

Your mission is to now implement the rest of the endpoints!  You have the wiring ready, all you need is to use the [mongoose docs](http://mongoosejs.com/docs/queries.html) to implement `getPost`, `getPosts`, `updatePost`, and `deletePost`.  You may find mongoose methods such as: `.find()`, `.findById()`, `.remove()` helpful.  You might want to look into sorting the results for `getPosts` by `createdAt`.

<details markdown="block">
<summary>Add this to your schema definition to make sure the DB has the necessary timestamps to sort by</summary>


```js
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
}
```

</details>

⚠️ In the above we only saved `title`, none of the other fields were defined in our Post Schema!  You should now go back and add the other fields we need to the model as well as to the all the controller methods.

And finally, you'll need to get the router id that is passed in when we hit `/posts/:id`.  This is accessible as `req.params.id` inside each of our controller functions that had this `:id` path variable.

## What about APIKEY

Unlike the blog api we've been using, nothing in the above relies on the query parameter `?key=foobar`. This is because this is your personal database for which we're shortly going to implement authentication, so you don't really need the APIKEY sandboxing.  If you were curious and wanted to implement it it would be available to you in `req.query.key` and easiest would be to store it in the db as a new field and then query on it.

## Deploy

We will need to host this new server component so your blog can use it instead of the `platform.cs52.me` one.  

🚀 [Same steps as for the short.](../../sa/server-side/#deploy-to-heroku)

Create a new Heroku instance, but you can use the same mongo connection string which will look something like the following. Just make sure to change the DATABASENAME section for your new project so you aren't using the same one as the server-side short. 

`mongodb+srv://USERNAME:PASSWORD@cluster.yourmongoclusterid.mongodb.net/DATABASENAME?retryWrites=true&w=majority`


## Basic API server Complete!

Once you have all the api endpoints complete, test it out using your blog frontend, make sure all the parts still work!  IE. Change your Lab4 frontend `ROOT_URL` to point to your Heroku hosted server instance.  Commit and push your very slightly altered Lab4 so that it now uses your server instead of the provided CS52 one.


## To Turn In

1. github url to your repo, readme.md with what worked and what didn't
1. url to your new heroku app instance for testing
1. working url for Lab4 on netlify that points to your new API server. You should change it to point to the new heroku url that you get by clicking 'open app' on heroku.

## Extra Credit
*always mention your extra credit in the README.md file*

* change your tags store to be an array rather than a string, can just split by whitespace
* add commenting to posts (either an array or another model) / change both api and frontend to support this.
* really at this point you can start modifying your blog to be whatever you want. Add in new fields to your posts.
* add in search support.
* later we'll introduce User and Authentication so **do not** implement those here though.


### EC Option: Implementing Search

If you'd like to add Search, you'll need several things: a search bar, a UI for search results, a route in your API which can recieve a query. To make an object's fields searchable, add the following line immediately after you create your object's Schema:
```
ObjectSchema.index({ fieldToSearch1: 'text', fieldToSearch2: 'text', ... });
```
Indices allow Mongo to efficiently store and sort searchable information. By default, the ID of an object recieves an index. In this case, we're going to set Mongo's special ```$text``` index to match certain fields. Then, in your search-controller function, add:
```
const searchedObjects = await Object.find({ $text: { $search: my-query-string } })
```
where `my-query-string` is the string you're searching for. Notice that we use the same `Object.find()` function, except we pass in an object that acts as a filter.

Need more help? The [Mongo docs](https://docs.mongodb.com/manual/text-search/) are your friend! Alternatively, here's an [article](https://www.compose.com/articles/full-text-search-with-mongodb-and-node-js/) with a more detailed approach.
