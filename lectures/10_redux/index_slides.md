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
name: Redux


.medium[![](img/reduxgif.gif)]


---
name: CS52 Art

.left[![](img/table-redux-is-coming.jpg)]

.right[![](img/table-readucks.jpg)]


???
*


---
name: CS52 Art


.medium[![](img/firebasemontster-table.jpg)]


???
*

---
name: CS52 Art

.medium[![](img/table-all-the-react.jpg)]


* what are benefits of firebase over other stuff like amazon aws?
* what is robots.txt for?
* can JS push fake history to user's browser?


???
* robots.txt is for robots!
* pushState url needs to be same origin (same protocol+domain+port) according to the docs
* pretty much yup



---
name: CS52 Art

.tiny[![](img/table-all-the-assignments.jpg)]
.tiny[![](img/table-quiz-lab.jpg)]
.tiny[![](img/table-gpa-forgive-me.jpg)]
.tiny[![](img/table-dont-call-me.jpg)]


???
* finally some tears


---
name: course survey so far

<iframe src="https://dalilab.typeform.com/report/m0bPyl/D5ZFUjWpn0sOT64K" style="transform: scale(0.8) translateX(-150px) translateY(-125px) " width="1000" height="700" frameBorder="0" ></iframe>


???
* more ta hours or different times?
* enjoying hmws and learnign from them
* and good understand


---
name: things to like

* Super fun projects, learning a lot, TA's and prof super helpful
* The feeling of finishing a lab :)
* Everything we learn in class is directly applicable. I feel like I can go build something on my own after this class.
* Work load is pretty good
* making pretty/useful sites; the fun assignments! I like that creativity and humor are encouraged.
* The hands-on parts of the class are really fun.
* The material is really great -- enjoy building front-end stuff that I can show my parents or friends!
* Lots of assignments to get the hang of things
* That it’s not all lecture
* Fun classes and labs, great ideas with the workshops.
* Workshops in class!
* Lectures are good and easy to follow. The interactive games and activities built into lectures!
* The short assignments are very helpful - probably more helpful than the lectures in learning the material.



---
name: things to improve

* Maybe we could work on the lecture notes
* There is so much material that is being thrown very quickly and I am absorbing only a part of it. As fun as the labs and short assignments are, having a slightly slower pace would be great!
* Although I definitely think the late policy is very fair, even just one late day pass would be really helpful
* I'm not sure. Being able to start labs in class. The hardest part for me is just starting the lab...
* I think less workshops would be good
* Reduce number of workshops. I feel like I don’t learn much from them.  Would prefer if we could expand the list of technologies we learned in class
* Quizzes are too hard; The quizzes feel like they don't reflect the stated goal of just checking if you did the assignments.
* Nothing off the top of my head! I've really enjoyed it so far.
* More time walking through code examples
* More interactive breaks or parts of lecture



???
* 1 free 12hrs day pass is now available. - have given a couple out for extenuating circumstances, assignments are just close together so want to make sure people don't cascade
* too late to change how workshops work - generally i like them because they give you a breadth that we couldn't cover otherwise.  don't feel like you have to finish them or work on them outside of class though!
* i know I'm trying to do both a survey of everything - plus a deep dive on one stack
* but honestly which of those would you prefer to forgo?
* tips: start labs early and ask questions - some ta hours have nobody and then last day is swamped
* lecture notes are somewhat available by hitting 'p' on the slides to go into presenter mode


---
name: other comments/concerns/etc

* Can we learn about Django
* do we have quizzes after every lab?
* I like your gifs!!
* More time plz
* Socket.io and Slackbots!
* Can we go over the starter pack? Also my computer is rapidly running out of space. Is that a me problem? I wish I understood the basic tools we use better so I could use them myself in the future. I get the projects and the coding, but not how all the dependencies work and what they mean I can do.
* nope! it's a great class
* Really enjoying the class so far!



???
* i too wish for more time! :-)
* something like django with alternative server side workshop a bit later
* but we'll do server side ddon't worry
* sockets coming soon


---
name: What do we know about React so far?

* components - smart and dumb
* unidirectional data flow
* events and callbacks
* state and props
* rendering jsx


???




---
name: Problems

.medium[![](img/props-problems.png)]


???
* look familiar? we will fix it




---
name: Smart and Dumb components

.small[![](img/table-dumb-component-jpg.jpg)]


* smart components have state + props
* dumb components only props (function)

???
* dumb components can react too



---
name: Presentational and Container Components

* ***presentational***
  * concerned with how things look
  * have state for ui things but not data
  * generally get data as props
  * real view
  * reusable (your mini bootstrap)
* ***container***
  * concerned with data
  * pass data to presentational components
  * binds callbacks to self
  * can be *connected*

???
* so far we'd had both
* we've not really talked about this abstraction
* but will have a bit more of it soon with redux!




---
name: Flux

<iframe width="640" height="360" src="https://www.youtube.com/embed/nYkdrAPrdcw?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

???
* facebook's answer to scalability
* interesting worth watching



---
name: The beginning

![](img/facebook-problem1.png)


???
* multiple parts of webpage that tracked messages in different ways
* had a messenger window but also unread count



---
name: questionable design


![](img/facebook-problem2.png)


???
* bugs were insidious
* how do you handle both staying in synch - read in one meant mark as read in another
* had multiple data models responsible for each view
* updating one model would need to update another
  * unread thread count
  * unread messages
* had unread counts that were false positive




---
name: Chat

.medium[![](img/chat1.png)]


???
* increment unseen
* append message in chat
* if open append message in messages Views
* if chat tab is focused or messages is open - decrement unseen
* complex login living in multiple places
* imperative lots of steps with checks



---
name: Chat

.medium[![](img/external-control.png)]


???
* problem kept coming back as they fixed things due to complexity
* here's what the basic logic looked like
* handler had too much to do
* large amount of centralized logic is one solution but have to code for consistency problems
*
* chat tabs is easy - get a new message - append it
* less clear about unseen
* perhaps storing unseen as a list by threadID would be better
*
* use explicit data - actual unseen threads, not just counter
*
* moving display logic to each component so it can decide based on data how to render (sound familiar)
* separating data from view
* wanted to move these decisions closer to the actual views.




---
name: MVC

.medium[![](img/mvc-1.png)]


???
* two way binding here



---
name: MVC Problems

.medium[![](img/mvc-problems.png)]


???
* too much stuff to keep track off
* data changing over time
* would you be able to tell if there is an infinite loop - one model updating another and back





---
name: Enter Flux

![](img/flux-simple-f8-diagram-with-client-action-1300w.png)


???
* unidirectional data flow
* thanks facebook
* predictable - no multiple arrows
* finish a layer you are done
* with multiple Views easy as arrows go in one direction
* easy to reason about
* data changes - views update
* except that is more global and neat





---
name: unidirectional data flow

![](img/unidirection-control.png)


???
* track an action through the system
* easy consistency





---
name: Flow Based Programming

![](img/full-system.png)

???
* no backwards arrows
* can imagine testing is easy





---
name: MVC -> Flux

* loosely:
  * Views -> Views (React Components)
  * Controller -> Views (Container Components)
  * Model -> Store (also ~state)


???
* how do we convert one way of reasoning to another?







---
name:

![](img/wtf.png)

???
* flux was a bit tricky
* dan abramov comes up with answer - REDUX





---
name:

![Redux](img/redux-logo.png)

.small[![805k downloads](img/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f72656475782e7376673f7374796c653d666c61742d737175617265.svg)] 7/2016

.small[![2m downloads](img/downloads.svg)] 4/2017

.small[![6m downloads](img/redux-downloads.svg)] 4/2018


???
* Redux - a flux framework for the rest of us
* flux was more a paradigm
* redux takes those principles and makes them functional and awesome





---
name: Application Level State

* react is great
* but could use better data management
* Redux
  * data, model, controller
  * single object stores app state!


???
* so far we'd done,  component level state vs application level state
* we've hacked components to allow us to pass down component level state
* but not ideal solution






---
name: React Component Props


![Redux](img/redux-article-3-01.svg)


???
* not ideal, why do the parents need to know for instance?



---
name: Add a dash of Redux


![Redux](img/redux-article-3-02.svg)


???
* what if we had an application level store of data
* where a component can dispatch an action
* and others can subscribe to data - NOT EVENTS BUT ACTUAL DATA


---
name: Together at Last


![Redux](img/redux-article-3-03.svg)

???



---
name: State & Actions


![Redux](img/redux-article-3-04.svg)


???
* dispatch sends actions to reducers which return new state given old state


---
name: Multiple Reducers


![Redux](img/redux-article-3-05.svg)


???
* lets dance




---
name: In motion

.medium[![](img/ARCH-Redux2-real.gif)]


???
* and here's how it all moves Together
* state comes in together with action to form new state




---
name: example

.medium[![](img/youtube-react.png)]


???
* lets take youtube app
* had some complicated double layer wiring
* would have been nice not to pass so much stuff in props right?





---
name: example+redux


![](img/redux-videos.jpg)

???
* heres a version with redux
* seemed like too much to ask you all to rewrite the videos so the redux short is much simpler
* this drawing






---
name: An Action

```javascript
{
    type: 'VIDEO_SELECTED',
    selected: video,
}
```

* is just an object
* has a type property

???
* can be constant rather than string
* all Redux events trigger actions
* remeber only way to change applicaiton state is through actions






---
name: Action Creator

```javascript
export function selectVideo(video) {
  return {
    type: 'VIDEO_SELECTED',
    selected: video };
  }
}
```

* is called in an event
  * user or ajax callback
* is a function that returns an action object
* action is sent to all reducers


???





---
name:  Reducer


```javascript
export default function (state = [], action) {
  switch (action.type) {
    case 'VIDEO_SELECTED':
      return action.video;
    default:
      return state;
  }
}
```
* reducer produces new state
* based on currernt state + action
* return is assigned to key in main state


???
* we're going to use multiple reducers in most projects
* each reducer is responsible for one piece of the state object







---
name: Reducers

* must be a pure function!
* receive:
  * current state
  * action and any payload
* return:
  * new state
* do not have access to anything else

???














---
name:  Reducers

* all reducers get called hence `switch` on action
* return state for particular key
* must return some state, always merged
* default action return existing state

???
* REMEMBER  component state is different and can and should still be used






---
name: All fine and dandy

But how do our components know about any of this?

<iframe src="//giphy.com/embed/DeKJrr8vovqXC" width="480" height="259" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

???





---
name:  react-redux


<iframe src="//giphy.com/embed/O5XX68H6WfAlO" width="580" height="299" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

* no intrinsic connection
* upgrade smart objects to connected containers!

???




---
name:  who needs upgrades?

* not everyone
  * components that control data
  * need to trigger actions (could use props though)
  * need access to global state
  * may pass data to presentational children components


???
* some components, presentational ones don't need it
* just props based
* no need to overuse








---
name: react-redux connect

```javascript
import { connect } from 'react-redux';

class MyComponent extends Component { /* stuff */ }

export default connect(mapStateToProps,
  mapDispatchToProps)(MyComponent)
```

* higher order component!
* returns a component that is connected to redux


???






---
name: mapStateToProps

```javascript
  /* ... */
  render() {
    <div>{this.props.video}</div>
  }
}

const mapStateToProps = (state) => (
  {
    video: state.selectedVideo
  }
);

```
* global state -> props
* takes state as argument
* returns mapping to show up in `props`

???
* takes application state as argument
* and returns subtree that will show up as props inside the connected component
* exposes a bit of global state to this particular component






---
name: mapDispatchToProps

```javascript
import * as actions from './actions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectVideo: actions.selectVideo}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
//or shorthand
export default connect(mapStateToProps, {selectVideo: actions.selectVideo})(MyComponent);
// or even shorter:
export default connect(mapStateToProps, actions)(MyComponent);
```

* component must be connected to ActionCreator functions
* if called directly won't trigger reducer!
* lots of short hand [here](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
???







---
name: Provider

.left[![](img/reactasview.png)]
.right[

```html
ReactDOM.render(
  <Provider store={store}>
    <MyRootComponent />
  </Provider>,
  rootEl
)
```
]


???
* last thing, provides access to store to connected components
* required boilerplate





---
name: Redux Map

.medium[![](img/redux-map.jpg)]

???


---
name: Thunks

.medium[![](img/ARCH-Redux2-extended-real-declerative.gif)]

* what about asynch stuff like api calls?!?!

???
* in CS a thunk is a method that is created, often automatically, to assist a call to another method.
* what if we need to make an api call that takes time
* there a way we can fix that also
* we'll work with these in SA6




---
name: React-Videos with Thunks

.medium[![](img/redux-videos-with-middlewares.jpg)]


???



---
name: Redux Cheat Sheet

.medium[![](img/full-redux-cheat-sheet.jpg)]

???



---
name:


<iframe src="//giphy.com/embed/JjKYrKa8UVTNe" width="480" height="466" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

???
* ok that was a lot of codes
* but once you've set it up once it'll all start making sense
* remember we're learning how to build large-scale web apps










---
name: devtools

.medium[![](img/react-devtools.gif)]


???
* react devtools, hopefully you've all been using this






---
name: devtools

.medium[![](img/redux-devtools.png)]


???
* redux devtools give you state timemachine
* and you can just set the state, and import and export the state!






---
name: Question Time


<iframe src="//giphy.com/embed/jTZVegIrdLCCY" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

???
