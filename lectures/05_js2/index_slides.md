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
name: On the Menu

* more js
* es6

???



---
name: es6 template string

```js

const foo = 'bar'; // single quotes preferred but can use double

let a = 'The ' + foo + ' is high.'; // es5 'foobar'
//prefer es6:
let a = `The ${foo} is high.`;
```


???
* use the es6 template string constructions!






---
name:  let

* let variables are block-scoped (not whole function)
* still hoisted
* global let variables are not properties on `window`
* `for (let x...)` create a fresh binding for x in each iteration
* error to use a let variable before its declaration is reached
* redeclaring a variable with let is a SyntaxError

<!-- from https://hacks.mozilla.org/2015/07/es6-in-depth-let-and-const/ -->
???
* all good things
* use let instead of var, kids




---
name:  const

* simple:
  * variables declared with const are just like let
  * except that you can only assign to them when you declare them
  * ie. no reassignment

<!-- from https://hacks.mozilla.org/2015/07/es6-in-depth-let-and-const/ -->
???



---
name: closure trickiness

<p data-height="435" data-theme-id="24117" data-slug-hash="f2e5b9149a019b953859e6de0af83f54" data-default-tab="js,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/f2e5b9149a019b953859e6de0af83f54/">talking cat var scoping problem</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

???
* reference retained to a variable that changes!
* note: easy way to fix this in es6 to come
* DON"T USE var:
  * i is hoisted above for loop
  * i is available after for loop







---
name: OOP

* Object-oriented programming: methods
  * property of an object can be a function
  * instance variables

```javascript
var o = {
  count: 0,
  increment: function(amount) {
    this.count += amount || 1;
    return this.count;
  }
}

console.log(o.increment());  // 1
console.log(o.increment(2)); // 3
console.log(o.increment(2)); // 5
```


???





---
name: this

* `this` is special keyword for referring to the context
  * when a function is executed not when defined
* in methods (function properties of objects): `this` is bound to object
* in other functions: `this` refers to global object

```javascript
function foo() {  console.log(this); }

// normal function call
foo(); // `this` will refer to `window` in es5 and undefined in es6

// as object method
var obj = {bar: foo};
obj.bar(); // `this` will refer to `object`

// as constructor function
new foo(); // `this` will refer to
           // an object that inherits from `foo.prototype`
```

???
* some examples, confusing yes



---
name: this

```javascript
let LateBloomer = {
  petalCount: Math.ceil(Math.random() * 12) + 1,
  declare: function() {
  	console.log('I am a beautiful flower with '
                + this.petalCount + ' petals!');
  },
  bloom: function() {
  	setTimeout(this.declare, 1000);
  },

}

LateBloomer.bloom();   // undefined number of petals
// after 1 second, triggers the 'declare' method
```

???
* why do we care about `this`?
* this won't run
* setTimeout runs in the context of window
* so when it calls declare that function has no access to this.petalCount
* skip this quickly



---
name: this

```javascript
  bloom: function() {
  	setTimeout(this.declare.bind(this), 1000);
  },
}
```

* bind returns a new function with current `this` tied to the function
* on execute uses the bound `this` instead

???
* setTimeout's "this" refers to window
* needs `.bind(this)`
* bind returns a new function with this bound to a value.




---
name: that = this, bind

```javascript

var that = this;
setTimeout( function() {
  console.log(that);
}, 1000);

```

* assigning current `this` to a variable to freeze

???
* sometimes you will see people fix this with a closure
* reassing the current this to another variable
* BAD



---
name: that = this

<p data-height="300" data-theme-id="24117" data-slug-hash="9b0e116d14ee8078c8b86066f0d2ab5f" data-default-tab="js,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/9b0e116d14ee8078c8b86066f0d2ab5f/">9b0e116d14ee8078c8b86066f0d2ab5f</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

???
* this is button -- but setTimeout scope is window




---
name: functions have properties

```javascript
function plus1(value) {
  if (!plus1.invocations) {
    plus1.invocations = 0;
  }
  plus1.invocations++;
  return value + 1;
 }

 console.log(plus1(10));   // → 11
 console.log(plus1(20));   // → 21

 console.log(plus1.invocations); // → 2
```
???




---
name: classes (old way)

* Functions are classes in JavaScript:
  * Name the function after the class
  * use the new keyword
  * functions used this way are constructors

```javascript
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = function() { return this.width*this.height; }
}
var r = new Rectangle(26, 14);
console.log(r)
// Rectangle { width: 26, height: 14, area: [Function] }
```

???




---
name: inheritance

* prototype based:
  * a prototype object for each object instance
  * can have other prototype objects forming a chain
  * will search up the prototype chain until the property is found


???
* properties of an object are its own property in addition to all the properties up the prototype chain





---
name: adding to prototype

```javascript
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.area = function() {
   return this.width*this.height;
}

let r = new Rectangle(26, 14);  // {width: 26, height: 14}
r.area();  // 364
Object.keys(r) == [ 'width', 'height' ] // own properties
```


???
* changing prototype will cause all instances to change
* this is similar to just adding a property to a function buuut
* adding to prototype will change all instances




---
name: inheritance


```javascript

Rectangle.prototype = new Shape(...);

Square.prototype = new Rectangle();

//without separate constructor
let Rectangle = Object.create(Shape);

```

* If desired property not in Rectangle.prototype
* then look in Shape.prototype and so on


???
* can use Object.create() instead of constructor






---
name: getters and setters

```javascript
var pile = {
  elements: ["eggshell", "orange peel", "book"],
  get height () {
    return this.elements.length;
  },
  set height(value) {
    console.log("Ignoring attempt to set height to", value);
  }
};
console.log(pile.height); // → 3
pile.height = 100; // → Ignoring attempt to set height to 100
```

???
* want to include properties that are not methods but are computed?
* sure we got that





---
name: BUT WAIT!

What about es6?

* es6 has "real" classes
* stop talking about prototypes
* still really just an object / function


???





---
name: es6 class syntax

```javascript
class Bunny {
  constructor(name, favoriteFood){
    this.name = name;
    this.favoriteFood = favoriteFood;
  }
  eatFavFood() {
    console.log(`${this.favoriteFood}, yum!`);
  };
}

let es6Bunny = new Bunny('Brigadier Fluffkins', 'Raspberry Leaves');
es6Bunny.eatFavFood();
// Raspberry Leaves, yum!
```

<!-- from: https://medium.freecodecamp.com/learn-es6-the-dope-way-part-v-classes-browser-compatibility-transpiling-es6-code-47f62267661#.g5wa16op9 -->

???
* has constructor and methods
* much nicer syntax
* note: classes are *not* hoisted!





---
name: es6 inheritance

```javascript
class BelgianHare extends Bunny {
  constructor(favDrink, favoriteFood, name) {
    super(name, favoriteFood);
    this.favDrink = favDrink;
  }

  drinkFavDrink() {
    console.log(`glug glug ${this.favDrink}`)
  }
}
```
???
* as you would expect `extends`
* super to invoke base class constructor *required*















---
name: Functional Programming

* everything is a function
* no/minimal mutable objects
* state is in stack vs heap



???





---
name: imperative vs functional


```javascript
let results = [];
for (var i = 0; i < anArray.length; i++) {
  results[i] = anArray[i] * i;
}

```

```javascript

let results = anArray.map(function (value, i) {
  return value * i;
});

```



???
* map example, map calls the function with value and index
  * basically a for loops
* pass functions as arguments is key
  * is possible because functions are first-class
* note the array does not have to be mutable
* fp premise 1:  immutable is better
  * functions take in arguments
  * spit out new results
  * no modification of things in place





---
name: functions as arguments

```javascript
function foo(arg1, arg2) { return arg1 * arg2; }

let results = anArray.map(foo);  // args are unspecified no ()


let results = anArray.map(function (value, i) { //anon function
  return value * i;
});

let results = anArray.map((value, i) => {  //arrow
  return value * i;
});
```

???
* if you put in parens will execute immediately
* setInterval example





---
name: elegance

```javascript
let total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);
```

```javascript
console.log(sum(range(1, 10)));
```

???





---
name: higher order functions

* functions that operate on other functions
  * can take functions as arguments
  * can return functions

```javascript
setInterval(() => {  }, 1000);
```

???
* saw a higherorder function already





---
name: filter, map, reduce

<p data-height="400" data-theme-id="24117" data-slug-hash="74f50559357975493892499683747702" data-default-tab="js,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/74f50559357975493892499683747702/">higher order examples</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

???
*





---
name: chaining

<p data-height="400" data-theme-id="24117" data-slug-hash="070c691851aba008158126f4ff77556b" data-default-tab="js,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="https://codepen.io/timofei/pen/070c691851aba008158126f4ff77556b/">toTitlecase</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>


???





---
name: flatten, etc

<p data-height="400" data-theme-id="24117" data-slug-hash="af79914b72dfd8e302c52c3f0a96452e" data-default-tab="js,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/af79914b72dfd8e302c52c3f0a96452e/">flattening</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

???
* flattening and extending prototype
* sometimes frowned on to extend native types
  * mostly cause you can wreak havoc if you redefine something
  * just do so thoughtfully






---
name:

.fancy.medium_small[![](img/purefunction.jpg)]

* pure functions:
  * do not rely on external state, only parameters
  * do not change external state, only return values
* side effects:
  * when a function changes some state (instance / global var)
  * not always bad (console.log)
  * can be hard to debug and test

???
* why is good?
  * easier to combine functions that don't rely on some global state
  * easier to test functions where inputs are all declared
  * more like math
* more cool things --
  * can replace a pure function in memory





---
name: asynchronous js

* some functions take time
  * making network requests
  * any io really
  * or `setInterval / setTimeout`

???
* so far all the functions we have passed in have pretty much run instantly
* this is not always the case!
* setInterval






---
name: non-blocking


* java/python
  * when you run I/O functions
  * they block -- program does nothing while waiting
* javascript is non-blocking!
  * how it do?!


???




---
name:

.fancy.medium[![](img/event-gui.png)]


* event-driven programming:
  * application flow control driven by events/changes in state
  * central mechanism that listens for events
  * calls callback function once event is detected


???




---
name:

.fancy.medium[![](img/event-loop.png)]s

???





---
name: ajax

* asynchronous javascript and XML
  * people no longer really fetch xml/html
  * JSON data format

???




---
name:
```javascript
var data;       
$.ajax({
    url: 'http://api.something.com/all-datas',
    success: function( result ) {
        data = results;
        // But, this will!
        console.log( data );
    }
})
// Oops, this won't work...
console.log( data );
```

???
* this uses jquery ajax for readability
* common occurence!





---
name:

```javascript
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
   document.getElementById("demo").innerHTML = xhttp.responseText;
  }
};
xhttp.open("GET", "http://api.something.com/all-datas", true);
xhttp.send();
```

???
* now what if we needed to make further callbacks and requests based on the response?






---
name:

.fancy.medium[![](img/callback-hell.png)]

???




---
name:

* goal: keep code shallow
* some solutions for nested callbacks:
  * use named functions
  * use modules (more later)
  * promises
  * async (coming soon)

???
* fewer levels is easier to read




---
name: promises?

* rather than passing a callback:
  * return a promise that will be filled when done
* promise is representation of the result of asynchronous operation:
  * pending - initial state of a promise
  * fulfilled - successful operation
  * rejected - failed operation

```javascript
doSomething(args, doneCallback);
//vs
let donePromise = doSomething(args);
```

???
* not quite done yet
* where is the callback functionality?





---
name:

```javascript
fetch('http://api.something.com/all-datas"').then(function(response) {
	// do something with response, check for fields etc
}).then(function(returnedValue) {
	// ...
}).catch(function(err) {
	// Error :(
});
```

[http://davidwalsh.name/fetch](http://davidwalsh.name/fetch)

???
* fetch is a new api that babel will do the right thing with
  * don't need jquery ajax
* returns a promise





---
name:

```javascript
var cherishAndHonor = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…
  goDoSomethingAsynchronous( () => {
    if (/* everything turned out fine */) {
      resolve('Stuff worked!');
    }
    else {
      reject(Error('It broke'));
    }
  });
});
```

???
* construct a promise
* return resolve if it worked
* reject if not





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
![](img/asych-chain.svg){: .fancy .white-background}
]



???
* more at http://www.html5rocks.com/en/tutorials/es6/promises/






---
name: modules

* what if multiple js files and modularized code?
* es6 modules:
  * import
  * export
  * have own scope
  *

???





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
```


???
* more variations




---
name: webpack

.fancy.medium[![](img/what-is-webpack.png)]

???




---
name: babel

.fancy.medium[![](img/babel.png)]


???




---
name: eslint with airbnb style guide

.fancy.medium[![](img/airbnb.png)]

???
