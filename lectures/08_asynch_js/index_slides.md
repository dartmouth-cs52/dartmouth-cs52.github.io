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
name: CS52 A Little More Javascript!

* callbacks
* promises
* immutable data structures


![](/assets/drawings/table-dont-call-me.jpg)


<!-- <iframe width="540" height="380" src="https://www.youtube.com/embed/otCpCn0l4Wo?start=15&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe><br> -->

???
* callbacks
* promises
* immutable data structures
* once created can't be touched
  * ie modified  




---
name: Javascript Fatigue

[![](img/stuck.png)](https://medium.com/@pistacchio/i-m-a-web-developer-and-i-ve-been-stuck-with-the-simplest-app-for-the-last-10-days-fb5c50917df#.imprd0m6d)

.medium[![](img/fuckwithit.png)]

???
* so if you are confused, thats ok, the whole world is confused about webdev!
* proliferation of technologies
* everybody trying to fix the problem different ways
* new standards coming out all the time
* but we've got the worlds most desired stack


---
name: Too Much?


.large[![](img/evil.jpg)]


???
* some overlapping assignments but every year i think about and talk to ta team about trying to cut things out and we end up deciding not to.



---
name: Used To Be Worse!


![](img/table-too-fast.jpg)


???
* learning is good for you - builds character
* lets look at survey
* quizzes - we're not having giant quizzes although i will start including small code puzzles



---
name: Callbacks


.medium[![](img/callbacks-table.jpg)]

???
* what is this callback thing
* functions that you pass to other functions



---
name: Callbacks Are Like Minions

.fancy.small[![](img/minions-handshake.gif)]

```js


minionHandleClick = (event) {
  this.setState({lastclicked: event.target })
}
<Component onClick=(this.minionHandleClick) />


```
???
* fyi in a class this is an experimental syntax you can [enable](http://babeljs.io/docs/plugins/transform-class-properties/)
* this analogy will get old
* they perform tasks for you 
* in this case we have a minion handle a click event
* 

---
name: Callbacks?Asynchronous?Non-blocking?

* the ideal minion
  * tell them what to do
  * they do it and call back later
  * you don't wait for them

.fancy.medium_small[![](img/minions-obey.gif)]


???
* what are some things that you might need to wait for?
* not waiting enables you to keep doing stuff
* whether evil or not

---
name: Minions Can Call A Friend

.small[![](img/minion-fight.gif)]

```js


kevinHandlesIt = (error, results) => {
  if (error) { return console.log(error) }
  // want to do folloup
  someOtherFollowupTask((error, results) => {
    //Do something with Results here
  });
}
someLongTask(kevinHandlesIt);

```

???
* functions can call other functions
* here we have a named minion and an anonymous minion
* where are error and results coming from?



---
name: (error, results)

.fancy.super-tiny[![](img/minion-no.gif)]

```js
const someLongTask = async (callback) => {
  try {
    await console.log('fetch me some beer');
    callback(null, 'success');
  } catch(error) {
    callback(error, null);
  }
};

someLongTask((error,result) => console.log(error,result));
// either null, stuff or 'error', null
```

???
* don't worry about the async await - getting there


---
name: Tasks that only a minion can do

.fancy.small[![](img/minion-gross.gif)]

* remember non-blocking, need event handlers

```js
fetch('beer').then( beer => {
  handleDrink(null, beer)
}).catch(error => {
  handleDrink(`sorry boss, ${error}`, null)
});
```

???
* oooh some new notation here, promises
* fetch takes time
* then notation - if success then otherwise catch
* what is drink here?


---
name: A world without Minions/Callbacks

.fancy.small[![](img/minion-purpse.gif)]

* nothing would happen in the right order
* or everything would block

???

* lot of syntax but remember the concepts too



---
name: Callback Hell!

.left[
![](img/callback-hell.png)
* lots of nested callbacks
* unwieldy
]
.right[![](img/minion-chain.gif)
]

???
* callback hell is when you have lots of nested callbacks
* functions that call other anonymous functions when they are done.
* how might we fix this?



---
name: How to Fix?

* goal: keep code shallow
* some solutions for nested callbacks:
  * **use named functions**
  * **use modules**
  * **promises**
  * **async/await**

???
* fewer levels is easier to read




---
name: promises?

* rather than passing a callback:
  * return a promise that will be filled when done
* promise represents result of asynchronous operation:
  * pending - initial state of a promise
  * fulfilled - successful operation
  * rejected - failed operation

```javascript
doSomething(args, doneCallback);
//vs
doSomething(args).then(doneStuff);
```

???
* basically a slightly different notation for running a callback





---
name:

.fancy.small[![](img/mouse.gif)]

```javascript
fetch('http://api.something.com/all-datas"').then( response => {
	// do something with response, check for fields etc
}).then( returnedValue => {
	// ...
}).catch( err => {
	// Error :(
});
```

[http://davidwalsh.name/fetch](http://davidwalsh.name/fetch)

???
* fetch is a new api that babel will do the right thing with
  * don't need jquery ajax
* returns a promise





---
name: Make a Promise

.fancy.super-tiny[![](img/minionpromise.png)]

```javascript
const aPromisifiedFunction = new Promise( (resolve, reject) => {
  // do a thing that takes a long time async, then…
  goDoSomethingAsynchronous( (error, result) => {
    if (error) { reject(Error('It broke')) }
    else { resolve(`Stuff worked! ${result}`) }
  });
});
```

???
* here's how to  make a promise
* return resolve if it worked
* reject if not
* you made a youtube promise already




---
name:

.left[
```javascript
asyncThing1().then(function() {
  return asyncThing2();
}).then(function() {
  return asyncThing3();
}).catch(function(err) {
  return asyncRecovery1();
}).then(function() {
  return asyncThing4();
}, function(err) {
  return asyncRecovery2();
}).catch(function(err) {
  console.log("Don't worry about it");
}).then(function() {
  console.log("All done!");
});
```
]
.right[
![](img/asych-chain.svg)
]



???
* more at http://www.html5rocks.com/en/tutorials/es6/promises/
* go to nearest catch





---
name: Promises


.large[![](img/promises.png)]


???
* here is how promises work
* create a promise with two callback functions
* one to handle success .then
* one to handle error .catch






---
name: Callback Simulation


<div 
  class="codepen" 
  data-prefill='{
    "stylesheets": ["//cs52.me/assets/css/codepen-mods.css"],
    "scripts": ["//cs52.me/assets/codepen-mods.js", "https://code.jquery.com/jquery-2.2.4.min.js"]
  }'
  data-preview="true"
  data-height="400" 
  data-theme-id="24117"
  data-default-tab="js,result"
  data-user="timofei"
  data-editable="true"
>
hit r to reload
<pre data-lang="babel" class="hidden">
asyncTest(1000, 'hello', false, (result, error) => {
  if (error) {
    print(`error: ${error}`);
  } else {
    print(result);
    asyncTest(1000, 'next', false, (result, error) => {
      if (error) {
        print(`error: ${error}`);
      } else {
        print(result);
        asyncTest(1000, 'here?', 'catch it', (result, error) => {
          if (error) {
            print(`error: ${error}`);
          } else {
            print(result);
          }
        });
      }
    });
  }
});

// a tiny function to show promises
// pass in timeout, desired result, desired error, and callback
function asyncTest(timeout, result, error, callback) {
  setTimeout(() => {
    if (!error) {
      callback(result);
    } else {
      callback(result, error);
    }
  }, timeout);
}

function print(line) {
  $('body').append(`&ltdiv>${line}&lt/div>`);
}
</pre>
<pre data-lang="css" class="hidden">
body {
  padding: 20px;
  font-size: 20px;
}
</pre>
</div>


???




---
name: Promises Simulation

<div 
  class="codepen hidden" 
  data-prefill='{
    "stylesheets": ["//cs52.me/assets/css/codepen-mods.css"],
    "scripts": ["//cs52.me/assets/codepen-mods.js", "https://code.jquery.com/jquery-2.2.4.min.js"]
  }'
  data-preview="true"
  data-height="400" 
  data-theme-id="24117"
  data-default-tab="js,result"
  data-user="timofei"
  data-editable="true"
>
<pre data-lang="babel">
asyncTest(1000, 'hello', false)
  .then(result => {
    print(result);
    return asyncTest(1000, 'next', false)
  })
  .then(result => {
    print(result);
    return asyncTest(1000, 'here?', 'catch it')
  })
  .then(result => {
    print(result);
  })
  .catch(error => {
    print(`error: ${error}`);
  })

// a tiny function to show promises
function asyncTest(timeout, result, error) {
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (!error) {
        fulfill(result);
      } else {
        reject(error);
      }
    }, timeout);
  });
}

function print(line) {
  $('body').append(`&ltdiv>${line}&lt/div>`);
}
</pre>
<pre data-lang="css">
body {
  padding: 20px;
  font-size: 20px;
}
</pre>
</div>
???

---
name: async / await

<div 
  class="codepen hidden" 
  data-prefill='{
    "stylesheets": ["//cs52.me/assets/css/codepen-mods.css"],
    "scripts": ["//cs52.me/assets/codepen-mods.js", "https://code.jquery.com/jquery-2.2.4.min.js"]
  }'
  data-preview="true"
  data-height="400" 
  data-theme-id="24117"
  data-default-tab="js,result"
  data-user="timofei"
  data-editable="true"
>
<pre data-lang="babel">

async function run() {
  try {
    let result = await asyncTest(1000, 'hello', false);
    print(result);
    result = await asyncTest(1000, 'next', false);
    print(result);
    result = await asyncTest(1000, 'here?', 'catch it');
    print(result);
  } catch(error) {
    print(`error: ${error}`);
  }
}

run();

// a tiny function to show promises
function asyncTest(timeout, result, error) {
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (!error) {
        fulfill(result);
      } else {
        reject(error);
      }
    }, timeout);
  });
}

function print(line) {
  $('body').append(`&ltdiv>${line}&lt/div>`);
}
</pre>
<pre data-lang="css">
body {
  padding: 20px;
  font-size: 20px;
}
</pre>
</div>


---
name: async / await

```js
const waitabit = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done!"), 1000)
});

async function f() {
  let result = await waitabit(); // wait till the promise resolves (*)
  alert(result); // "done!"

  let response = await fetch('http://someapi.io');
  let user = await response.json();
  alert(user); //done
}

f();
```

* more: https://javascript.info/async-await

???
* async/await provides a more natural syntax for working with Promises
* have some promises but want to write code that looks imperative style
* declare a function async
* then can use await inside it
* wait what about errors?


---
name: async / await

```js
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}

f();
```

???
* can use familiar try/catch
* i honestly prefer the promise then notation



---
name: Game

Practice your asynch (chrome only):

.medium[![](img/boomsync.png)]

http://boomsync.me/

credit: Irene Feng'17, Ben Packer'17, Byrne Hollander'17, Jenny Seong'GR

???
* a react app
* won dartmouth hackathon some years ago




---
name: Immutable Data Structures

.fancy.small[![](img/randall.gif)]

1. Randall mutates
1. Randall is bad
1. thus mutation is bad
1. $\blacksquare$

???
* 

---
name: but why?

```javascript
// first problem
let identity;
identity = 'one thing';
identity = 'another thing';
identity = 0;
identity = ['what will identity be in the future?'];
```

???
* you're trying to use it, but its a global and you don't know what it is




---
name: time and value


.fancy.small[![](img/backtothefuture.gif)]

* when values change over time
* how do you track?

???
* have reference to only the newest
* how do you track when something changes
* when you go back in time and try to change stuff, bad shit happens





---
name: side effects
exclude: true

```javascript

function obtuse(value) {
  const data = someFunc(value, instanceVar1);
  instanceVar2 *= data;
  console.log(instanceVar2);
}

obtuse(0);
```


???
* so much leakage in this example you have no idea what is happening
* hard to test, have multiple dependent variables -- as with science, too many dependent variables is bad
* TDD





---
name: what changed

```javascript
videos = ['video1', 'video2'];

$('.video li').forEach( (el, i) => {
  el.text(videos[i]);
});

fetch(url, (newVideos) => {
  videos += newVideos;
  // now what?
})

```

???
* we don't know which videos updated or added
* counter somewhere else on the page
* maybe a delete function elsewhere on page
* react immutable state is the answer here
* does this make sense



---
name: other solutions

* create complex models that keep track of dirty data
* re-run render often manually (backbonejs)
* chaos

???
* well or there is reacts nice state first views





---
name: State -> Render

```javascript
this.state.setState({foo:'bar'});


render() {
  <div>this.state.foo</div>
}
```

* however, have to do it right

```javascript
// mutating, data loss and unpredictable behavior
this.state.foo = 'not bar';
this.state.setState(this.state);

// vs shallow clone of object
const newState = Object.assign({}, ...this.state, {foo: 'not bar'});
this.state.setState(newState);

// or?
```


???
* react to the rescue
* trick to state:
  * render is pure function
  * state is updated to new state not mutated
* state is an object so generally mutable so lets be careful here





---
name: Strings Are Immutable

* strings are typically immutable in most languages!

```javascript
let foo = 'I am a string';
let bar = foo.toUpperCase();

bar == 'I AM A STRING';
foo == 'I am a string';
```

???
* great, you've all already worked with immutable data structures!




---
name: But not so array

```javascript
let v1 = [1];
let v2 = v1.push(2);

v2 == [1,2];
v1 == [1,2];
```

???
* original array is gonezo
* what if you needed it?





---
name:

![](img/immutable-logo.png)

```javascript
let v1 = Immutable.Array([1]);
let v2 = v1.push(2);

v2 == [1,2];
v1 = [1]
```

???
* no data loss!




---
name: Immutable Objects

```javascript
const note = Immutable.Map({
  title: 'hi',
  content: 'stuff',
});

const updatedNote = note.set({title: 'bye'});
```

???
* update is easy
* any drawbacks?



---
name: Inefficient you ask?

<!-- ![](img/shared-structure.gif) -->

<video loop controls>
  <source src="http://res.cloudinary.com/dali-lab/video/upload/w_452,h_270/v1546203223/cs52/shared-structure.webm" type="video/webm"/>
  <source src="http://res.cloudinary.com/dali-lab/video/upload/w_452,h_270/v1546203223/cs52/shared-structure.mp4" type="video/mp4"/>
  <source src="http://res.cloudinary.com/dali-lab/video/upload/w_452,h_270/v1546203223/cs52/shared-structure.ogv" type="video/ogg"/>
  Your browser does not support HTML5 video tags
</video>



<!-- .left[![](img/dag1.png)] -->

<!-- .right[![](img/dag2.png)] -->

[$O(log32 N)$ and more](https://www.youtube.com/watch?v=I7IdS-PbEgI)


???
* Structural Sharing
* Directed Acyclic Graph
* ok so its efficient $O(log32 N)$
* can use Trie to store arrays
* https://www.youtube.com/watch?v=I7IdS-PbEgI


---
name: Array in Trie

`const val = list.get(141)`

![](img/trie-array-get.jpg)

???
* array get stored in a trie
* trie for re-trie-val, now often pronounced try
* ordered tree, keyed by prefix
* usually 32bit binary keys, here we have 8 bits
* here we start from most significant bit


---
name: Array in Trie

`const newlist = list.set(141, 'foo')`

![](img/trie-array-set.jpg)

???
* and here's setting an array value



---
name: Map in Trie

![](img/trie-map-get.jpg)

???
* and here's a map
* only difference is index is hash value of key





---
name: Efficient Undo

```javascript
const history = [];
let note = Immutable.Map({
  title: 'hi',
  content: 'stuff',
});

// updating note
history.push(note);
note = note.set({content: 'real import stuff'});

// voila you has undo!
```


???
* easiest undo in the world
* remember this could be your whole app state for instance
* because render only relies on state...
* why does this work?  what is it that we are putting into the history array?





---
name: React and Immutable

* made for each other
* Immutable has simple nice api

```javascript
//init
this.state.notes = Immutable.Map();

//add something in
this.setState(prevState => (
  prevState.notes.push({title: 'new note'})
));

```


???
* literally made for each other at facebook
* for some internal reasons you can't make your whole state immutable but working on it





---
name:

.medium[![](img/firebase-logo.png)]

* BAAS
  * realtime data store
  * nice api
  * notifications
  * admin portal
  * scalability

???
* and it isn't even made by facebook?! but google
* backend as a service
* json storage -- who remembers JSON?


---
name: Firebase -> BAAS

.medium[![](img/whereinthestack_firebase.jpg)]

???
* provides data persistence for us



---
name: json data structures

```json
{
  "noteboard list": {
    "1": { "title":"notes from cs52", "author": "Ada Lovelace" },
    "2": { "title": "travel ideas", "author": "tim" }
  },
  "notes from cs52": {
    "1": {
      "title": "such great class",
      "content": "lectures are too fast!"
    },
    "2": { ... }
  },
  "travel ideas": { ... }
}
```

???
* more here: https://firebase.google.com/docs/database/web/structure-data
* don't nest too far
* document types (mongo will be similar)
* users
* notes






---
name: realtime database api

```javascript
//push()
const fb=firebase.database();

const id = fb.ref('users').push({username: name}).key()

//set()
fb.ref(`users/${id}`).set({username: name, email});

//update()
fb.ref('users').child(id).update({email: newEmail});

//remove()
fb.ref('users').child(id).remove();
```

???
* push appends data to dictionary
* set overwrites if exists
* updates





---
name: reading

<p data-height="450" data-theme-id="24117" data-slug-hash="bab1c926da57c4136b409b49ec364c8d" data-default-tab="js,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">hit r to reload</p>

???



---
name: writing


<p data-height="450" data-theme-id="24117" data-slug-hash="bfb7e2fcd1f8f4d3816e20160faf8648" data-default-tab="js,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">hit r to reload</p>

???





---
name: one last thing: modules

* what if multiple js files and modularized code?
* es6 modules:
  * import
  * export
  * have own scope

???
*




---
name:

```javascript
// create in new file myModule.js
function someCoolFunction() {
    return coolStuff;
}
function boringFunction(a, b) {
    return a + b;
}

export { someCoolFunction, boringFunction }
```

```javascript
// import
import { someCoolFunction, boringFunction } from 'myModule';
someCoolFunction();
// or
import * as cool from "myModule";
cool.someCoolFunction();
//or
import {someCoolFunction as newName} from "myModule";
newName();

```

???




---
name:

```javascript
// what if we want to export an object in a file myModule?
var coolCode = {
  function someCoolFunction() { return coolStuff; }
  function boringFunction(a, b) { return a + b; }
};

export default coolCode;
```

```javascript
// import
import coolCode from 'myModule';
coolCode.someCoolFunction();
```


???
* more variations


---
name:  React Notes

<video loop autoplay mute controls>
  <source src="http://res.cloudinary.com/dali-lab/video/upload/ac_none,w_800,h_510/v1546203223/cs52/live-notes-1080p.webm" type="video/webm"/>
  <source src="http://res.cloudinary.com/dali-lab/video/upload/ac_none,w_800,h_510/v1546203223/cs52/live-notes-1080p.mp4" type="video/mp4"/>
  <source src="http://res.cloudinary.com/dali-lab/video/upload/ac_none,w_800,h_510/v1546203223/cs52/live-notes-1080p.ogv" type="video/ogg"/>
  Your browser does not support HTML5 video tags
</video>


???
* what are some components you might need? 
* where might data live?

---
name: Firebase React Notes Architecture


![](img/firebase-architecture.jpg)


???
* 
* wrapper module
* there will be a websockets intro were we can replace what firebase is to us fairly quickly with websockets




---
name: Next Time


.medium[![](/assets/drawings/firebasemontster-table.jpg)]


* Work on Lab3 - start now!
* Redux to help us with state management
