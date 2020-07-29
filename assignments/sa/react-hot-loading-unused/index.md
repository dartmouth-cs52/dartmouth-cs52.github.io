---
layout: page
title: Advanced React Hot Loading
published: true
comment_term: react-hot-loading
---

![](img/react-hot-loader.gif){: .small }


## Overview

First, check out this [demo of react component hot loading](http://gaearon.github.io/react-hot-loader/)

🔥To make things hotter, we want to be able to reload a react component without reloading the whole darn page.

### Caveats

There are some caveats with using hot-loading. It doesn't quite always work, so you may encounter situations where weird things will happen and you have have to manually reload the page anyway.  This is all pretty new and still very actively under development.  Hence we are branding this as an advanced optional addition to your starterpack.

Does it make development super awesome?  Yes!  Can it sometimes malfunction and cause weirdness with state / components maybe not reloading the way you might expect?  Yes!  What is the worst case?  You either manually refresh the page, or if you find something else in your project that is incompatible you may have to turn it off (shouldn't take more than a few minutes to do permanently if you so desire). 

#### To Start 

🚀 To start you can simply clone your own existing starterpack assignment in whatever state it was after you added react to it.  

### React Hot Loading

🚀 Let's add in [react-hot-loader](https://github.com/gaearon/react-hot-loader). Peruse here if you want to learn more about how cool this is. Not only won't you have to refresh the page, but you also will retain some state to the page, in the middle of typing into search bar while editing code - it won't lose the text you typed in but will reload as much as it can. 

```bash
yarn add react-hot-loader
```

🚀 and add `react-hot-loader/babel` to your `.babelrc`:

```js
{
  "plugins": ["react-hot-loader/babel"]
}
```


```bash
yarn add @hot-loader/react-dom
```

```js
resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
}
```

🚀 Start up your webpack-dev-server:

```bash
yarn start
```


## Our First HOT LOADING View

We need to load in our first root App component slightly differently than we did before. 

🚀Create or Edit your base `src/App.js` component:

```js
import React from 'react';
//add in an import hot line
import { hot } from 'react-hot-loader/root';
import './style.scss';

const App = () => <div className="test">All the REACT are belong to us!</div>;

// export not just your App component, but your hot(App) component! 
export default hot(App);
```


🚀 Double check your `src/index.js` file to make sure you are just importing App and inserting it into the DOM like you were:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('main'));
```

Now check your page: http://localhost:8080


## Try it

Now if you edit `App.js`, carefully watch the page — it won't flash as it reloads.  Well that doesn't seem super useful does it? 

## Better Test


What if we build a tiny driven component that keeps some state and see what happens there? 

🚀 Create a new file `src/HotTest.js`

```js
import React, { Component } from 'react';


class HotTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  componentDidMount() {
    setInterval(() => { this.setState(prevState => ({ counter: prevState.counter + 1 })); }, 1000);
  }

  render() {
    return (
      <div>
        Try editing this text? The component should reload while keeping the counter going.
        <br />
        <div>{this.state.counter}</div>
      </div>
    );
  }
}

// note only the root component is exported hot
export default HotTest;
```

Now try it.  

🚀 Don't forget to import `HotTest` and insert it into your `App.js` somewhere. 

You may need a full refresh once, but once that counter is going you should be able to edit the page around it without needing to reload.  COOL! HOT! 

## Driven Input

What else do you need to get the following input field working?  Try it out in your page, same deal as before, it will keep the field filled out because the state won't reload.

```js
<input onChange={e => this.setState({ words: e.target.value })} value={this.state.words} />
```


## Git

Now don't forget to git add, commit, tag, and push if you want this as part of your starterpack for future projects.

```bash
git tag hot
git push origin --tags
```

## To Turn In

1. Submit github url for your starterpack.
1. Your App should have the following working:
  * hot reloading works as advertized
  * js is es6 and linted without errors
  * README file should mention hot loading