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
name: CS52 A Little More JS!

* callbacks
* promises
* immutable data structures


<iframe width="540" height="380" src="https://www.youtube.com/embed/otCpCn0l4Wo?start=15&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe><br>

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
  * best practices as of this year



---
name: Too Much?


.large[![](img/evil.jpg)]


???
* last year had overlapping assignments eek



---
name: Used To Be Worse!


![](img/table-too-fast.jpg)


???
* learning is good for you - builds character



---
name: Table Questions

* is shadowing saving a variable passed in through props in a local variable copy? 

.medium[![](img/tq-state-money.jpg)]


???
* yes pretty much



<!-- 
name: Table Questions


.large[![](img/table-js-tim-vs-sergey.jpg)]

* engineering - knowing the properties of your materials
* in software - how do you test other peoples code / know its properties
* does it scale?  does it work in older browsers?
* does it handle all input safely?
* tests are important but also we aren't making programs to run rockets
* [apollo moon code](https://qz.com/726338/the-code-that-took-america-to-the-moon-was-just-published-to-github-and-its-like-a-1960s-time-capsule/)
* [nasa rules](http://pixelscommander.com/wp-content/uploads/2014/12/P10.pdf)

 -->



---
name: Callbacks


.medium[![](img/callbacks-table.jpg)]

???
* what is this callback thing
* functions that you pass to other functions



---
name: Callbacks Are Like Minions

<iframe src="//giphy.com/embed/iUOzkJmvnFfqM?hideSocial=true" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

```js
minionHandleClick = (event) {
  this.setState({lastclicked: event.target })
}
<Component onClick=(this.minionHandleClick) />
```
???
* fyi in a class this is an experimental syntax you can [enable](http://babeljs.io/docs/plugins/transform-class-properties/)
* this analogy will get old
* you give a minion a task and they run off to do it
* and report back later

---
name: Callbacks?Asynchronous?Non-blocking?

* Minions
  * tell them what to do
  * they do it and come back later
  * you don't wait for them

<iframe src="//giphy.com/embed/uBuzWfwVcadRC?hideSocial=true" width="480" height="307.2" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

???
* what are some things that you might need to wait for?
* not waiting enables you to keep doing stuff
* whether evil or not

---
name: Minions Can Call A Friend

.small[![](img/minion-fight.gif)]

```js
kevin = (error, results) => {
  if (error) { return console.log(error) }
  // want to do folloup
  someOtherFollowupTask((error, results) => {
    if (error) { return console.log(error) }
    //Do something with Results here
  });
}
someLongTask(kevin);

```

???
* minions can call other Minions
* here we have a named minion and an anonymous minion
* where are error and results coming from?



---
name: (error, results)

.super-tiny[![](img/minion-no.gif)]

```js
const someLongTask = async (callback) => {
  try {
    await console.log('fetch me some beer');
    callback(null, 'success');
  } catch(error) {
    callback('error', null);
  }
};

someLongTask((error,result) => console.log(error,result));
// either null, stuff or 'error', null
```

???
* don't worry about the async await - getting there


---
name: Tasks that only a minion can do

<iframe src="//giphy.com/embed/13FznCEnWSiUfK?hideSocial=true" width="480" height="259.9384615384615" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

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

<iframe src="//giphy.com/embed/sgmmPgR8C1O2A?hideSocial=true" width="480" height="270.42253521126764" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

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

.left[
* goal: keep code shallow
* some solutions for nested callbacks:
  * use named functions
  * use modules
  * promises
  * async/await
]

.right[
![](img/banana.gif)
]

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

<iframe src="https://giphy.com/embed/gVROkjyShPnos" width="450" height="304" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

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

.fancy.tiny[![](img/minionpromise.png)]

```javascript
const cherishAndHonor = new Promise( (resolve, reject) => {
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
name: Callback and Promises

<iframe src="//giphy.com/embed/FKi8xl7OAreCI" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

* Understand Callbacks
* Use Promises

???
* i promise you'll  like it




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

<p data-height="400" data-theme-id="24117" data-slug-hash="7695b67d77d1282779bfb48e0d3ab863" data-default-tab="js,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/7695b67d77d1282779bfb48e0d3ab863/">callback hell playground</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>


???




---
name: Promises Simulation

<p data-height="403" data-theme-id="24117" data-slug-hash="67475ea03f33ac4ca0469c9c2ee14552" data-default-tab="js,result" data-user="timofei" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/67475ea03f33ac4ca0469c9c2ee14552/">promise playground</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

???


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
name: Async/Await Simulation

<p data-height="403" data-theme-id="24117" data-slug-hash="2fe5da65f15718b584079a55ee4fd4f9" data-default-tab="js,result" data-user="timofei" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/2fe5da65f15718b584079a55ee4fd4f9/">async playground</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

???




---
name: Game

Practice your asynch (chrome only):

.medium[![](img/boomsync.png)]

http://boomsync.me/

credit: Irene Feng'17, Ben Packer'17, Byrne Hollander'17, Jenny Seong'GR

???
* a react app
* won hackday last year



---
name: Question Time


<iframe src="//giphy.com/embed/jTZVegIrdLCCY" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

???




---
name: Immutable Data Structures

<iframe src="//giphy.com/embed/zxxXYJqTlpBnO?hideSocial=true" width="480" height="259.2" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

1. Randall mutates
1. Randall is bad
1. thus mutation is bad
1. $\blacksquare$

???
* i haz proof

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


<iframe src="//giphy.com/embed/xsF1FSDbjguis" width="480" height="250" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

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

```javascript
// mutating, data loss and unpredictable behavior
this.state.foo = 'not bar';
this.state.setState(this.state);

// vs shallow clone of object
const newState = Object.assign({}, this.state, {foo: 'not bar'});
this.state.setState(newState);

// neither looks good
```


???
* react to the rescue
* trick to state:
  * render is pure function
  * state is updated to new state not mutated
* state is an object so generally mutable so lets be careful here





---
name: Strings Are Interesting

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
let note = Immutable.Map({
  title: 'hi',
  content: 'stuff',
});

let updatedNote = note.update({title: 'bye'});
```

???
* update is easy
* any drawbacks?



---
name: Inefficient you ask?

![](img/shared-structure.gif)

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
note = note.update({content: 'real import stuff'});

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
* no need for cloning objects or copying arrays
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
    "1": { "id":"notes from cs52", "author": "Ada Lovelace" },
    "2": { "id": "travel ideas", "author": "tim" }
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
name: writing


<p data-height="450" data-theme-id="24117" data-slug-hash="bfb7e2fcd1f8f4d3816e20160faf8648" data-default-tab="js,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="https://codepen.io/timofei/pen/bfb7e2fcd1f8f4d3816e20160faf8648/">React Comment Box with Firebase</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

???




---
name: reading

<p data-height="450" data-theme-id="24117" data-slug-hash="bab1c926da57c4136b409b49ec364c8d" data-default-tab="js,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/bab1c926da57c4136b409b49ec364c8d/">React Firebase Comments Only</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

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
name: Game

Practice your asynch:

.medium[![](img/boomsync.png)]

http://boomsync.me/

credit: Irene Feng'17, Ben Packer'17, Byrne Hollander'17, Jenny Seong'GR

???
* a react app
* won hackday last year





---
name: Next Time


* Lab3 due Monday
* Redux to help us with state management
