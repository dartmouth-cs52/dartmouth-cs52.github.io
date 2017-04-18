---
layout: page
title: ""
published: true
---

![](img/react-router.png){: .small }


## Overview

React + Routing

What if you want your frontend to have routes — different URLs that map to different components and layouts of components?   We're going to add React Router to our js-react-starter repos so all your future projects can have it!


## Let's Start


🚀 We're going to keep working on your starterpack for this assignment. So just dig up that repo and work there!

For this workshop we're just going to add React Router to your personal starter repository so now you'll have react+webpack+babel+sass+reactrouter!


## NPM It


```javascript

npm install --save react-router

```


## Done

Now you are ready to add React Router to your starter package!

Ok ok, Here's a bit more to get you going.


## Route file

It is good practice to put all your route definitions in one file (easy to tell what your app is doing then).

🚀 Create a file in src:  `routes.js`


In this file we're going to define some routes.


```javascript
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Welcome from './components/welcome';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Welcome} />
  </Route>
);
```

For now we'll keep it simple and just wrap the components we already have: *App* and *Welcome*



## Index File


🚀 Now we want to use our routes in  `index.js` instead of just *App*

```javascript
// at top
import { Router, browserHistory } from 'react-router';
import routes from './routes';

// replace ReactDOM.render with:
// entry point that just renders app
// could be used for routing at some point
ReactDOM.render(
  <Router history={browserHistory} routes={routes} />
  , document.getElementById('main'));
```


## Wait but APP


🚀 Now just edit App and put

```
{this.props.children}
```

Instead of where you are instantiating `<Welcome...`


Note:  the page should still be working and printing out your basic welcome message!

Great, now you can edit your basic welcome to include "React Router". 👍


## Now for the FUN PART!

🚀 Commit your code at this point. Now create a new branch called `testing`:

```bash
git commit -am "done with basic routing starter"
git branch testing
git checkout testing
```

*This is so you have a nice simple starter all separated out, and now we'll mess around with it.*


🚀 Create a more complicated layout and a couple of extra routes.

Here are some options, where each of the following is a React Component:

* *MainLayout*
  * *Nav*
  * *Center*
  * *Footer*
* add different routes for *Center* in addition to *Welcome* such as:
  * `posts` -> some list
  * `posts/:postId` -> can be hardwired to just display props.params.postId


## Let's see how far we get!



## Resources

* [https://github.com/reactjs/react-router](https://github.com/reactjs/react-router)
* [https://css-tricks.com/learning-react-router/](https://css-tricks.com/learning-react-router/)
