---
layout: page
title: Redux — Short Assignment
published: true
comment_term: sa-redux
---

[![](img/redux.png)](http://redux.js.org/)


## Overview

React + Routing + [Redux](http://redux.js.org/)

For this workshop we're just going to add redux to our starter pack and our YouTube video Short Assignment!

Redux is a fancy state management system that we'll be using to build our blog platform.  It will allow us to simplify our code and have a global state in our app with fewer callbacks!


## Let's Start Part 1

🚀 We're going to keep working on your starterpack for this assignment. So just dig up that repo and work there!  At this point you should have a starterpack that has webpack+babel+eslint+sass+react+reactrouter.  Remember to just push your new stuff to this. For grading we'll know which commits to look at.  You want to keep building this up.

Now we're going to add in Redux to your personal starter repository so now you'll have webpack+babel+eslint+sass+react+reactrouter+redux! Wow.


## Double check your tags:

```bash
git tag
```

You should have v1, v2, and v3. if you don't have v3 then [go back](../routing) and do that now.


## Redux


🚀 Install redux

```bash
yarn add redux react-redux redux-thunk
```

These are the packages we will be using. Redux is a general state management paradigm that does not necessarily need to be tied to React. But together they are an unstoppable force for clean webdevelopment — so we will use another module `react-redux` that connects the two.   We won't use `redux-thunk` today but will soon — it allows us to work better with asynchronous server calls.


## Chrome React and Redux Devtools

These Chrome extensions will greatly assist us in debugging our React+Redux apps.

### React Dev Tools:

If you don't have React Devtools installed yet, please do so now [React Devtools in Chrome Store](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

More docs [here](https://github.com/facebook/react-devtools).


### Redux Dev Tools

And [redux-devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) will give us time travel! No joke! Install this now!

More docs [here](https://github.com/zalmoxisus/redux-devtools-extension).

Using these tools will help save you hours/days of debugging.


## What is Redux

> Redux is a predictable state container for JavaScript apps.

Redux has 3 main concepts that we will tackle. Each concept is related to a particular structure within Redux.


- **Store**:  the entire state of your app is stored in an object tree inside a single store.
- **Actions**:  the only way to change the state tree 🌳is to emit an action — an object that describes that happened.
- **Reducers**:  specify the state transformation based on the actions triggered.




### Actions

Remember how our state is immutable (read-only)?   Actions are the way to trigger new states.  In plain React we would run `setState` based on events passed up through callbacks. With Redux we can still use local component state for certain things, but whenever we need a far reaching state change we will use actions instead.

An action is an object with at least the property `type: string`.  The convention is to make these all upper case. They can also have payloads of other associated data.  

For instance an action might be:

```javascript
{
  type: VIDEO_SELECTED,
  video: videoID
}
```
{: .example}

Actions ensure that no views or callbacks will write to the state. An action does not alter state itself,  it expresses an intent for the state to change. All actions are processed by associated reducers in a centralized manner.  Remember, actions are just plain old objects, they can be logged and stored, and replayed even!



### Reducers


When an action is triggered, reducers kick in to do the necessary state changes.  Reducers are functions that take in previous state + the action triggered, and return the next state.  This is similar to what we did with `setState` where we would take existing state and set it to new state.  Your app may have multiple reducers each responsible for a particular part of the state tree.  

An example reducer that responds to the above VIDEO_SELECTED action might look something like this:

```javascript
export default function(state = null, action) {
    switch (action.type) {
        case 'VIDEO_SELECTED':
            return { selectedVideo: action.video };
        default:
            return state;
    }
}
```

Note the switch statement.  Actions are global and **every reducer** gets called with every action. It is up to the reducer to act on the action or not.

### Store

Finally there is the Redux Store.  A redux store is a way to store the global state for your app.  So far for the React apps that we have built we have had local component state for a few of our smart components, and often have had a top level state inside of our App component.  Having your app state (minus in a single state tree has lots of positive benefits.  The store is initialized in your top level `index.js` file.


## Code

Let's wire this all together, it may seem a bit tricky at first but we'll work though it!


### File Structure

🚀 Create a file structure to store our actions and reducers.

```bash
mkdir src/actions src/reducers src/components
```


We're going to create an extensible action and reducer structure so there might be a little bit extra boilerplate, but not to worry it'll all make sense.


### Actions

Best way to trigger actions in a connected component is via triggering an ActionCreator.  Action creators are simply functions that return an action object. Remember an action object is an arbitrary object that that has at a minimum a type property `{ type: 'SOME_ACTION' }`.

🚀 Let's create an `actions/index.js` file and give it some very basic actions.

```javascript

// keys for actiontypes
export const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};


export function increment() {
  return {
    type: ActionTypes.INCREMENT,
    payload: null,
  };
}

export function decrement() {
  return {
    type: ActionTypes.DECREMENT,
    payload: null,
  };
}
```

1. we have `ActionType` an object with keys. This is simply so we have constants so we don't have to type in string identifiers.
2. `increment` just returns an INCREMENT action
3. `decrement` just returns a DECREMENT action


### Reducers

🚀 Let's create a `reducers/index.js` file.   

With ES6 if you have a directory with multiple files and an `index.js` file you can import it by the directory name:  `import ./reducers`.

We are going to split up our reducers into a top level root reducer and smaller reducers that each act on a part of the state tree. The root reducer will use `combineReducers` to combine multiple reducers together into our redux state.


```javascript
// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import CountReducer from './count-reducer';

const rootReducer = combineReducers({
  count: CountReducer,
});

export default rootReducer;
```

Here, we have created our `rootReducer` which combines all other potential reduces into one main state object with several top level keys.


🚀 Now create `reducers/count-reducer.js`

```javascript
import { ActionTypes } from '../actions';

const CountReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return state + 1;
    case ActionTypes.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default CountReducer;
```

Our `CountReducer` gets called with actions.  When it is called with the 2 actions it knows something about it will return new state.  What will our state object look like overall? Simply:

```javascript
{
  count: 0
}
```


### Initialize Store

The Redux store is the main class responsible for bringing it all together.  The store is initialized with the reducers and knows when and how to call them. The store contains our state data and contains the dispatch functionality that we need to trigger actions. It is what holds it all together.

Just a tiny bit more boilerplate, I promise.

🚀 Add the following to your root/main `index.js` file.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers';

import App from './components/app';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('main'));
```

*Note: in the above App is being loaded from the file `src/components/app.js`. You are welcome to move all your router navigation functional components there if you'd like to hang on to it as a an example. A nice pattern is to keep index.js as just the entry point with only setup stuff — and your main App component separated out.*


## Connected components

Now we have the basics done, we should create some connected components.  A connected component is one that is literally connected to the Redux store.  The way we do this is by wrapping a component in a higher-order function that returns a new component that has access to Redux.

🚀 First, lets create a separate directory for connected components.  Let's call our connected components `containers` as this is what the Redux creator [wants us to do](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.yobej4pio).


Now we should make some components that make use of our Redux setup!  These will be toy examples, and don't particularly need Redux.  But they'll demonstrate the various wirings needed for setting up a much more complicated app.


### Counter

🚀 Let's create a component for displaying our state. Create a new file `containers/counter.js`

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// this can be dumb or smart component - connect works with either
const Counter = (props) => {
  return (
    <div>
      Current Count: {props.count}
    </div>
  );
};

// connects particular parts of redux state to this components props
const mapStateToProps = state => (
  {
    count: state.count,
  }
);

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, null)(Counter));
```


Some things to note about the this component:

1. `mapStateToProps`.  This is a simple function that takes the full global state as an argument and maps some part or parts of it this components props.  The mapping is a simple object with key: value pairs. As is everything!
1. `connect`.  This is the magic that connects the component to Redux.  It takes 2 arguments: mapStateToProps and mapDispatchToProps and returns a new version of the component.
1. `props.count`.  Check it, passed into props from Redux.
1. `withRouter`. Gives you access to history and match in your component, not required for Route components but is for (i.e. `<Route component={SomeConnectedThing}/>`) `connect`ed redux components. An unfortunate part of react-router - as of 4/24/19 not yet converted into a hook.


🚀 Add `<Counter />` to the render method of one of the components that are currently displaying like *Welcome*


You should now see it rendering with a value of 0.  This value is coming from the default value in our reducer!


### Controls

🚀 Let's create one more component. Oof!  This time it'll just be a couple of buttons to call some actions.  Make one last file: `containers/controls.js`.

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import { increment, decrement } from '../actions';

const Controls = (props) => {
  return (
    <div>
      <button type="button" onClick={props.increment}>+</button>
      <button type="button" onClick={props.decrement}>-</button>
    </div>
  );
};

export default withRouter(connect(null, { increment, decrement })(Controls));
```


Some things to note about the this component:

1. `import { increment, decrement } from '../actions';`:  we're importing the 2 ActionCreators we created earlier.
1. `connect`: note the second argument to connect, this can either be a function mapDispatchToProps, or a simple dictionary mapping.  This makes sure that connected versions of the increment and decrement actioncreators are passed into props for us.
1. `props.increment/decrement`:  Here's the confusing part. You must call the connected version of the actionCreator methods in props rather than calling them directly. If you just call the methods directly nothing will happen (as Redux doesn't know about them. However the versions of the versions that are passed into `props` will get passed down into the reducer.



🚀 Add `<Controls />` to the render method of one of the components that are currently displaying like *Welcome*


Ok, so that may seem like a lot of code for a toy examples, but note that these two components don't need to have a common parent, and you don't to pass around functions in callbacks.  In a simple example like this it might not make much of a difference,  we could have put the counter into the local component state of the parent. However if you had multiple levels of components the callback tracking would get difficult.


We'll do much more React+Redux so if this is confusing don't worry!  


## Debugging


Last thing!  Try opening up the Redux Chrome DevTools and play with the timeline to move the state forward and back.

Play with the *slider* and note how you can export and import state. Imagine how powerful that would be if we could just save the whole state of a very complex app!


## Release it!

```bash
# commit and push as you normally would - but also
git tag v4
git push origin --tags
```

## Part 2: YouTube!

Currently our React YouTube search app works great, but could be improved by use of Redux. If you recall from the Short Assignment or from the hint above, we can use Redux to select the video to show in Detail View without passing properties multiple levels!

### Prepare the Repo

🚀 To begin, create a new branch `redux-sa` in your SA4 repo: https://github.com/dartmouth-cs52-19S/sa4-YOUR_USERNAME

Then navigate to your repository on the command line and pull in the updates you've just made to your starterpack:

``` bash
cd sa4-YOUR_USERNAME
git pull
git checkout redux-sa
git pull starter master
```
Hopefully, you should only have major conflicts in your `src/index.js` file. Let's handle them now!

🚀 First, copy all the code from the HEAD (Current Change) of `src/index.js` and paste it into its own new file `src/components/youtube.js`. Now go ahead and accept the incoming change.

<details>
<summary>Don't worry if you lost your HEAD, it's right here!</summary>

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import debounce from 'lodash.debounce';
import SearchBar from './components/search_bar';
import youtubeSearch from './youtube-api';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };

    this.search = debounce(this.search, 300);
    this.search('pixar');
  }

  search = (text) => {
    youtubeSearch(text).then((videos) => {
      this.setState({
        videos,
        selectedVideo: videos[0],
      });
    });
  }

  render() {
    return (
      <div>
        <SearchBar onSearchChange={this.search} />
        <div id="video-section">
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList onVideoSelect={(selectedVideo) => this.setState({ selectedVideo })} videos={this.state.videos} />
        </div>
      </div>
    );
  }
}
```
</details>

🚀 To finish off our merge, let's create a new endpoint in `components/app.js` for YouTube:

```javascript
// Add this import somewhere at the top
import YouTube from './youtube';

// Add a new NavLink to your Nav constant
<li><NavLink to="/youtube" exact>YouTube</NavLink></li>

// And add a new Route to the Switch in App
<Route exact path="/youtube" component={YouTube} />
```

🚀 Once you have finished handling the conflicts, go ahead and add, commit, and push the changes.

To update our code, we will follow largely the same process as above, but with more complicated functionality.

### Actions

Since selecting a video is a new action handled by our redux store, we will need to create a new function in `actions/index.js` to go along with it.

🚀 First let's expand our `ActionTypes`:

```javascript
// keys for actiontypes
export const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  SELECT: 'SELECT',
};
```

🚀 Next, we add a new function to use our SELECT type. Notice that this function, unlike before, is passed a variable to be used as a payload.

```javascript
export function selectVideo(video) {
  return {
    type: ActionTypes.SELECT,
    payload: video,
  };
}
```

### Reducers
🚀 Create `reducers/select_reducer.js`

```javascript
import { ActionTypes } from '../actions';

const SelectReducer = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.SELECT:
      return action.payload;
    default:
      return state;
  }
};

export default SelectReducer;
```

It is nearly the same as our previous reducer with two key differences:

1. Our initial state is now `null` to reflect the new type.
2. We update the state by returning `action.payload` instead of manipulating the state directly. Remember that we defined the payload as `video` in our actions file.

🚀 Add our new reducer to `reducers/index.js` so that the store knows to keep track of an additional state variable.

```javascript
// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import CountReducer from './count-reducer';
import SelectReducer from './select_reducer';

const rootReducer = combineReducers({
  count: CountReducer,
  video: SelectReducer,
});

export default rootReducer;
```

### Connected Components
Let's see what you remember!

🚀 In `components/video_list_item.js` connect `VideoListItem` to the redux store and change the react parent function `props.onVideoSelect(props.video)`to the new redux function `props.selectVideo(props.video)`. 

__HINT:__ if you're stuck, use `containers/controls.js` as an example

<details>
<summary>If you're *really* stuck, take a look here</summary>

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectVideo } from '../actions';

const VideoListItem = (props) => {
  const imgUrl = props.video.snippet.thumbnails.default.url;

  return (
    <li onClick={() => props.selectVideo(props.video)}>
      <img src={imgUrl} alt="video" />
      <div>{props.video.snippet.title}</div>
    </li>
  );
};

export default withRouter(connect(null, { selectVideo })(VideoListItem));
```
</details>

🚀 In `components/video_list.js` remove `onVideoSelect={props.onVideoSelect} ` from `VideoListItem` 

🚀 Last but not least, we need to connect `components/youtube.js`

1. Let's connect `YouTube` to our redux store. Note that in this example, we need to include `mapStateToProps` as well as our actioncreator!
2. Remove `video` from our state. It isn't necessary to keep the variable in both the react state and the redux store in this situation, though there are times where you would want to leave it in.
3. Add `this.props.selectVideo(videos[0])` to our search method.
4. Pass `video` to VideoDetail from our redux store: ` <VideoDetail video={this.props.video} />`
5. Remove `onVideoSelect` from `VideoList`

<details>
<summary>Give it a try on your own first!</summary>

```javascript
import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchBar from './search_bar';
import youtubeSearch from '../youtube-api';
import VideoList from './video_list';
import VideoDetail from './video_detail';
import { selectVideo } from '../actions';

class YouTube extends Component {
  constructor(props) {
    super(props);

	// 2
    this.state = {
      videos: [],
    };

    this.search = debounce(this.search, 300);
    this.search('pixar');
  }

        search = (text) => {
          youtubeSearch(text).then((videos) => {
            // 2
            this.setState({
              videos,
            });
            // 3
            this.props.selectVideo(videos[0]);
          });
        }

        render() {
          return (
            <div>
              <SearchBar onSearchChange={this.search} />
              <div id="video-section">
                // 4
                <VideoDetail video={this.props.video} />
                // 5
                <VideoList videos={this.state.videos} />
              </div>
            </div>
          );
        }
}

// 1
const mapStateToProps = (state) => (
  {
    video: state.video,
  }
);

export default withRouter(connect(mapStateToProps, { selectVideo })(YouTube));

```
</details>

## Debugging

Last thing!  Try opening up the Redux Chrome DevTools and play with the timeline to move the state forward and back.

Play with the *slider* and note how you can export and import state. Imagine how powerful that would be if we could just save the whole state of a very complex app!


## Release it!

Commit and push your changes to your new redux branch. No need to merge into master!

## To Turn In (Canvas)

* url to starterpack github repo (makes grading a whole lot easier and friendlier)
* url to redux branch of SA4 github repo
* url to starterpack surge.sh
* your starter pack should now
    * have a working redux counter!
    * be deployed to surge
    * lint correctly
* your youtube searcher should have the same functionality as before, but now with redux!



## Resources

* [http://redux.js.org/index.html](http://redux.js.org/index.html)
* [https://css-tricks.com/learning-react-redux/](https://css-tricks.com/learning-react-redux/)
* [Redux integration with React Router](https://reacttraining.com/react-router/web/guides/redux-integration)
* [React Router Redux Docs](https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux)
