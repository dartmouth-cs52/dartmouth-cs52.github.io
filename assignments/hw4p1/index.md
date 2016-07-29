---
layout: page
title: HW 4 p1
published: true
---


## Redux Blog: Client

![](img/redux.png)

We'll build a React+Redux Blog Platform.  It doesn't even necessarily have to be a blog,  could be photo's or really anything you want. As long as there are individual post items that have some content that need to be saved to a database!


<iframe width="640" height="480" src="https://www.youtube.com/embed/vvtbz2WL7M4?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>


### Part 1

We'll build out a Create+Update+Delete (CRUD) style blogging app using React and Redux and React-Router.  We will use an API server hosted at: `cs52-blog.herokuapp.com`

### Part 2

We will rip out `cs52-blog.herokuapp.com` and build our own Nodejs+Express+Mongo based API server.  Finally FULL-STACK!


## Some Setup


First we should do some basic setup steps.  

🚀 You should start from your react+redux+starter from the [redux workshop](../workshops/redux) or you can grab the **with_redux** branch from the [js-react-starter](https://github.com/dartmouth-cs52/js-react-starter).  Do the usual: create your own repo and change the remote.

🚀 Webpack. When a route reloads to an error webpack-dev-server needs to know that it should always serve up our app from index.html even when we end up asking it for another route.


```javascript
//add to webpack.config.js
devServer: {
  port: 8080,
  historyApiFallback: {
    index: 'index.html',
  },
},
```

🚀 We should also make sure some of our paths in `index.html` are correct. Make sure each of the build paths starts with / like `/build/bundle.css` and `/build/bundle.js`.


Ok, now that we got that out of the way. Let's dig in!


## CRUD API

We'll be using an API server running at http://cs52-blog.herokuapp.com/api

The API has the following endpoints:

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


For each of these you need to append an api key.  This key can just be your `firstinitial_lastname`.   You can test the api using postman or curl.

There is a command that you can run in Terminal called `curl` that can fetch remote data.  Here's how you would use it for testing the api server.  This will also come in handy when you have to create the api server next week!

```bash
# all posts get:
curl -X GET "https://cs52-blog.herokuapp.com/api/posts?key=YOURKEY"

# create new post
curl -X POST -H "Content-Type: application/json" -d '{
    "title": "first post",
    "tags": "words",
    "content":  "this is a test post"
}' "https://cs52-blog.herokuapp.com/api/posts/?key=YOURKEY"

# update by POSTID
curl -X PUT -d '{
    "title": "new title",
}' "https://cs52-blog.herokuapp.com/api/posts/POSTID?key=YOURKEY"

# fetch 1 by POSTID
curl -X GET "https://cs52-blog.herokuapp.com/api/posts/POSTID?key=YOURKEY"

# delete by POSTID
curl -X DELETE -H "Content-Type: application/json" "https://cs52-blog.herokuapp.com/api/posts/POSTID?key=YOURKEY"

```

Try these out.  Run the create new post one a couple of times to populate your database!



## Routes

We're going to use some routes to set up our app with different "pages".  

🚀 Your routes could look something like this.  Basically you're going to have a route for creating new posts (this will be a form) and a page for showing a post by ID. The default route will show a list of all posts.


```html
<Route path="/" component={App}>
  <IndexRoute component={Index} />
  <Route path="posts/new" component={New} />
  <Route path="posts/:id" component={Show} />
</Route>
```

This is just the basics, feel free to expand on this.


### App

Is a simple component that simply renders a *NavBar* component and the `{props.children}` passed in by the router. You can think of this as your main layout — you can rename it to that if you prefer!


### NavBar

A simple component that renders a nav with two `<Link>` react-router components such as the following:

* `<Link to="/">your site name</Link>`
* `<Link to="posts/new">new post</Link>`


### Index

This will be the default page.  It will display a list of posts.  These posts can look like whatever you want.  The posts will be stored in the redux state rather than any single component so this will need to be a connected component that connects to `state.posts.all`.

Try the curl commands above,  you'll see that one of the fields you get back in the JSON is `id`.  You'll use that construct `Link` elements to `posts/postid` when you render the posts. Each post should be clickable to open it full page using the router.

Min specs at a glance:

* default page listing all posts
* show title and tags (for now)
* use post id to link to full view

### New

Component to create a new blog post (you can reuse this component for editing posts if you like).

### Show + edit

This is the component that gets loaded when you want to see the full rendered contents of a single post.  *Show* should display the full content of the post (selected by the ID that is passed in through `this.props.params.id`.  This post id parameter will come from the react-router when you navigate to:  `/posts/:postID`.  Where does postID come from in general?  It is automatically assigned to your post by the API when you create the post.

Your *Show* component should provide a way to edit the post.  You can either have an edit button that makes the whole post editable, or you could have in place editing for each field as in the gif.  Another option is to have an edit route:  `/posts/:id/edit` for instance.  Personal preference here.

Note for now the API server only supports title, tags, content as fields.  In part 2 you will implement your own server and can add or change fields then.

Min specs at a glance:

* render full content of post at route `/posts/:id`
* render markdown
* allow editing of post fields
  * either in separate form or as individual editable fields

## Redux

We will be using [redux](http://redux.js.org/) for our application state.  We're going to just have 1 reducer to start with: `postsReducer`.   This reducer will be associated with the key `posts` and will return an object to look something like this initially:

```javascript
posts: {
  all: [],
  post: null,
}
```

## Actions

Here are the minimum actions you should consider implementing.  

```javascript
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST:  'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
};
```

Now you might ask,  how the heck do we fetch from an API using actions!?

Don't worry, this part I'll walk you through.

###  Connecting to API

First thing we'll need is to install the `redux-thunk` library. Not another library!  Actually, we'll need two libraries for this functionality. `axios` will give us an nice promise based ajax library.


```javascript

npm install --save axios redux-thunk

```

#### [Axios](https://github.com/mzabriskie/axios)

Axios gives us a promise based interface to make API requests.   Here is an example of a get:

```javascript
const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=yourfirstname_yourlastname';

axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
  // do something with response.data  (some json)
}).catch(error => {
  // hit an error do something else!
});
```


Axios supports *GET*, *POST*, *PUT*, *DELETE*, and other *HTTP* verbs.

With *POST* and *PUT* you need to supply an object with key,value data.  Something like the following would work:

```javascript
const fields = {title: '', contents:'', tags: ''}
axios.post(`${ROOT_URL}/posts${API_KEY}`, fields)
```


#### [Thunks](https://github.com/gaearon/redux-thunk)

The big question on your mind is how you would put this into an action I bet.  Right?  No?

We have to set up `redux-thunk` first.

🚀 In your root `index.js` file:

```javascript
// at the top
import thunk from 'redux-thunk';

// change the applyMiddleware line:
applyMiddleware(thunk),
```

We'll dig into what middleware is later, but for now what you need to know is that middleware are basically functions that run between other stuff.  They can be very powerful. In our case `redux-thunk` allows our ActionCreators to return thunks rather than just actions.  These thunks are functions that are created on the fly to run something later.  Whaaaaaa?

Remember how ActionCreators just return an Action?  Well, what if you want the ActionCreator to first do something, perhaps fetch something from the internet?  Thunks allow this functionality.  Instead of immediately returning an Action object and flowing into the Reducer, we return a function that gets executed and can go off and do some stuff before dispatching the Action.


A redux thunk allows your ActionCreators to have access to dispatch actions.  Quite literally giving them access to a `dispatch` method.

```javascript
export function anAction() {
  // ActionCreator returns a function
  // that gets called with dispatch
  return (dispatch) => {
      // can now dispatch stuff
      dispatch({ type: 'SOME_ACTION', payload: {stuff: ''} });
  };
}
```

What we want to do is go and fetch some data from a rest api.  Being able to dispatch things in the middle of an action helps us do this. You'll want to do the `axios` call inside of your returned function.  You would dispatch the action if the promise was resolved and you potentially dispatch and error action in the catch.  You are combining the `redux-thunk` style ActionCreator with the `axios` api call.



## Reducers

To start with we'll only need 1 reducer.   This should be pretty straightforward, receive action for new posts, return `all: newPosts`.  Receive action for new single fetched post, return that.  Note, since we are structuring things so that the reducer returns an object, for each of the actions you'll need to return the existing state of the other fields.  You can use the `Object.assign` method we have used before, or the es6 [object spread operator](http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html).  You are also welcome to implement it with multiple reducers if that is easier to reason about.


## And you're done!

You now have a basic blog platform.


## To Turn In

1. GitHub repository URL (should be public so we can see it)
1. your working domain name URL on surge.sh
1. App should have individual routes for:
  * new
  * list view
  * full show view
1. App should make CRUD api calls
  * create
  * update
  * delete
  * fetch



## Extra Credit

* look snazzy
* add a filter posts functionality, filter by tags initially.
  * for now our api is limited so additional search will come in part 2
* more EC available in part 2!
