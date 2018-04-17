---
layout: page
title: SA8 - Websockets
published: true
comment_term: sa-websockets
---

![](img/socket-io.png){: .small }


## Overview

We're going to build a [websocket](https://en.wikipedia.org/wiki/WebSocket) based server and refactor our notes app to use our own server rather than firebase!  You'll see how with just a little bit of code you can have a cool bidirectional event based server. You can also use this for implementing chat servers or push notification to your frontend!  


## Let's Start

🚀 Clone your **Lab3 with firebase**.  Create a new branch with `git checkout -b websockets`. We'll need to refactor this very slightly to not use firebase but use our new backend instead, and using a branch seems reasonable for this.


🚀 Clone [express-babel-starter](https://github.com/dartmouth-cs52/express-babel-starter) for our new server component.  When you clone remember you can rename the directory: so `git clone https://github.com/dartmouth-cs52/express-babel-starter.git notes-websocket-server`  would checkout the starter into a differently named directory.  


In the following at times we'll do stuff to both client (Lab3) and server (the new notes-websocket-server). This will be highlighted with **SERVER** vs **CLIENT**.


## Overview


Server:  we will utilize websockets and mongo to create a simple realtime backend.  You can use the techniques learned here for any realtime applications such as chat or notifications.  

Frontend:  we will utilize our realtime react notes app and refactor slightly.


## Database

**SERVER**

🚀 Remember how to make a mongoose model?   Sure, create a Note model in your models directory and give it the following fields (you may need to adjust the names of these later based on how you coded your Lab3):

```javascript
  title: String,
  x: Number,
  y: Number,
  zIndex: Number,
  text: String,
```

yarn add `mongoose`.

In your `server.js` set up your mongo connection:

```javascript
// DB Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/notes';
mongoose.connect(mongoURI);
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;
```


🚀 And let's make a controller while we are at it!

It'll be a bit simpler than the post controller.  We'll also do something similar to SA7 where we returned promises from our controller rather than operating on request and response objects.

* createNote: super simple, takes in note fields, and returns the save promise (doesn't need to create a new promise).
* getNotes:  this one is a bit trickier, hence full code is here. Returns the promise created by find(). If you recall our datastructure was a dictionary by note id. We can use an accumulator to construct an object from the array of notes that find gives us.
* deleteNote: delete a note by its id
* updateNote: update note, pretty similar to how you did it for posts


```javascript
import Note from '../models/note_model';



export const getNotes = () => {
  return Note.find({}).then(notes => {
    return notes.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
  });
};

export const deleteNote = (id) => {
  // to quote Prof. Cormen: left as an exercise to the reader
  // remember to return the mongoose function you use rather than just delete
}

export const createNote = (fields) => {
  // you know the drill. create a new Note mongoose object
  // return .save()
};

export const updateNote = (id, fields) => {
  return Note.findById(id)
  .then((note) => {
    // check out this classy way of updating only the fields necessary
    Object.keys(fields).forEach((k) => {
      note[k] = fields[k];
    });
    return note.save();
  });
};

```


## Socket.IO SERVER

We'll be using [socket.io](http://socket.io) serverside and clientside.  We could implement these from scratch with Node and HTML5 has websocket support built in, but socket.io provides nice reconnect functionality and integrates easily with an express app.



🚀 Install socket.io in **SERVER**:

```bash
yarn add socket.io http
```

We'll need to change a few things in our `server.js` file:

```javascript
// at top
import socketio from 'socket.io';
import http from 'http';


// add server and io initialization after app
const app = express();
const server = http.createServer(app);
const io = socketio(server);


// change app.listen to server.listen
server.listen(port);
```

🚀 Now our server can talk websockets!


### The Socket

Websockets are statefull connections.  Each client gets their own socket. Let's define some functionality — for now we'll just do everything in our `server.js` file but for any larger app you'd separate this out into a separate module.

🚀 In `server.js` add:

```javascript
// at top
import * as Notes from './controllers/note_controller';


// at the bottom of server.js
// lets register a connection listener
io.on('connection', (socket) => {
  // on first connection emit notes
  Notes.getNotes().then((result) => {
    socket.emit('notes', result);
  });

  // pushes notes to everybody
  const pushNotes = () => {
    Notes.getNotes().then((result) => {
      // broadcasts to all sockets including ourselves
      io.sockets.emit('notes', result);
    });
  };

  // creates notes and
  socket.on('createNote', (fields) => {
    Notes.createNote(fields).then((result) => {
      pushNotes();
    }).catch((error) => {
      console.log(error);
      socket.emit('error', 'create failed');
    });
  });
});
```


Ok we have some basic functionality now. Let's work on the frontend for a little bit. We'll come back and add more listeners here. Don't forget to start up mongod and also `npm run dev` the server.



## Socket.IO CLIENT

In your Lab3 new branch, let's add some socket.io smarts.

🚀 Install socket.io in CLIENT (Lab3)

```bash
yarn add socket.io-client
```


🚀 Some Setup in `index.js` or your main app component.

```javascript
// at top
import io from 'socket.io-client';
const socketserver = 'http://localhost:9090';
```

## Event Listeners

We will define some specific event listeners.  Firebase had the *on value* event listener, but for socket.io we will be able to define any number of our own custom events to listen to.

In your App **constructor** (we'll refactor simply and just put in all the socketio stuff directly into App for now) add the following:

```javascript
this.socket = io(socketserver);
this.socket.on('connect', () => { console.log('socket.io connected'); });
this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
this.socket.on('error', (error) => { console.log(error); });
```

Great!  Now test it out,  load up http://localhost:8080 and you should be connecting and devtools console should be showing "socket.io connected".


### Notes Listener

But what about notes?!!

🚀 Edit the function call in `componentWillMount` or `constructor` where you start your `firebase.fetchNotes()` handler.  We'll replace it with our socket.io listener:

```javascript

//instead of:
firebase.fetchNotes((notes) => {
  // where you handle all the setState and immutable stuff
  // keep this
});

// do
this.socket.on('notes', (notes) => {
  // where you handle all the setState and immutable stuff
  // keep this
});

```

All we are doing is subscribing to the notes event, and taking the payload and processing it the normal way. Since on the server we are emitting new notes immediately on connection this is all we need.  However, we don't have any notes yet, so we let's keep going and update everything on the front end so we don't have to keep fiddling with it.


## Notes Events

Ok, how do we send data to the server though?  Sockets are bidirectional so if you wanted you can emit events back to the server!


🚀 For each of the update, delete, and create methods you have just replace your firebase call with a socket.emit.

```javascript

// firebase.updateNote(id, fields);
this.socket.emit('updateNote', id, fields);
// note how you can pass in multiple arguments


// firebase.deleteNote(id);
this.socket.emit('deleteNote', id);


// firebase.createNote(note);
this.socket.emit('createNote', note);

```

And, that's it for the frontend!  Comment out your `import * as firebasedb` you won't need it no mo!

Try creating a note!


## SERVER Part Deux

Ok, let's add back in some more functionality on the server side.

```javascript

// on update note do what is needful
socket.on('updateNote', (id, fields) => {
  Notes.updateNote(id, fields).then(() => {
    pushNotes();
  });
});


// on deleteNote do what is needful
socket.on('deleteNote', (id) => {
  // you can do it
});

```


Now,  try it out!  


## Optimization (Optional)

Ok, for now this seems to work pretty well. However, if you were to push the server to Heroku (don't forget mLab), you'd notice a bad jitter as you drag the notes around.  Especially if you had it set to no grid.  We're basically doing no optimization so we are sending thousands of update messages.  When there is no lag things work perfectly smoothly.  As soon as you have a bit of lag our driven Notes component starts behaving badly.  

The Firebase SDK handled this for us by being very optimized.  It would batch together updates as well as doing internel state diff'ing to only send around the needed bits.  Our websockets implementation is fairly naive at this point. We send everything around at max speed.  


One thing we can do it throttle and debounce. Here's a good article on the [differences](https://css-tricks.com/debouncing-throttling-explained-examples/).   Just by adding this small optimization we can improve our performance by a lot.

🚀 On the **SERVER** side lets add in lodash.debounce and lodash.throttle: `npm install --save lodash.throttle lodash.debounce`.

Import them in `server.js`

```javascript
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
```

Now,  it turns out that in  particular we want to do different things depending on whether we are the viewer dragging around a note, or if we are another browser that is just seeing the note being dragged around.

* We want to **throttle** broadcasting notes out to all other browsers (where throttle means: send at a constant decent rate).  They don't need the precision of getting every single update, but they should get a smooth constant rate of updates.
* For the client that is initiating the dragging however, we want to debounce.  Basically we don't want delayed updates coming in and causing jitter. But there are different cases here as well:
  * for dragging we want heavy debouncing
  * for updating our text box, we want *no* debouncing at all

Ok, without further ado here's how we can do this.

```javascript
// add these at the top of your: io.on('connection' section
let emitToSelf = (notes) => {
  socket.emit('notes', notes);
};
emitToSelf = debounce(emitToSelf, 200);

let emitToOthers = (notes) => {
  socket.broadcast.emit('notes', notes);
};
emitToOthers = throttle(emitToOthers, 25);

const pushNotesSmoothed = () => {
  Notes.getNotes().then((result) => {
    emitToSelf(result);
    emitToOthers(result);
  });
};
```

We're creating two wrapper functions. One that emits to oneself (socket) and one that emits a broadcast to everybody **except** the originating socket. One we debounce, the other we throttle (just slightly).

🚀 Now, let's use this new `pushNotesSmoothed` function.  We can leave delete and create alone as those don't need to be smoothed, but update, that is the troublemaker. But we don't want to use the smoothed function if we are updating text,  that will cause really bad things.  We only want to use it if we updating x,y.  So let's test for that:


```javascript
//inside of your updateNote success .then
if (fields.text) {
  pushNotes();
} else {
  pushNotesSmoothed();
}
```


Ok.  Now it should work much better when deployed.  You don't have to deploy or turn this in, it is just for fun to play with websockets, but if you were to deploy it, you would see that this makes a big difference.  There are more optimizations that can be done, the easiest would be to make **Note** position not driven by props directly when you are dragging.  For now though, you have implemented in half an hour a working alternative backend to firebase.  


## Resources

* https://github.com/socketio/socket.io
* https://github.com/socketio/socket.io-client
