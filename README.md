# react-native-workshop

Today we'll be using react-native to build a simple iOS app that allows us to search YouTube (just like short assignment 4, way back when.)

Note: for this workshop, you don't need to clone or fork this repo. Everything we do will be done locally.

## Set Up:

We should already have node installed on our machines, but just in case, let's go way to the beginning:

`$ brew install node`

And we should install Watchman, too, since react-native depends on it.

`$ brew install watchman`

Watchman is a file watching service that records when files change, and triggers actions when it detects changes.

Alright, now we're ready to use react-native! We'll want to install the Command Line Interface so we can call react-native commands from the terminal:

`$ npm install -g react-native-cli`

Great! Now we're ready to create our repo.

```
$ react-native init VidSearch
$ cd VidSearch
$ react-native run-ios
```

When the iPhone simulator pops up, you should be seeing a basic template for an iPhone app.

What just happened? React-Native bundled up everything for us, ran it through XCode, and opened up a simulator, all through the command line and without us ever having to open up XCode or write a single line of Swift code. Neat.

## Installing Dependencies
We're going to need a few dependencies from our trusty friend, the Node Package Manager.

Since we're making calls to the YouTube api, it would help if we made GET calls with axios, so:

`$ npm install --save axios`

Next, we'll need some specific react-native components that some other open source developers have kindly provided to us. This is fairly common in the react-native community, and it's great to have these pre-styled components at our disposal so we don't have to go through all the trouble of making an input field look nice, for example.

There are two components we'll be using in the workshop: [react-native-search-box](https://github.com/crabstudio/react-native-search-box), which is made to look like the classing iOS search bar, and most importantly, [react-native-youtube](https://github.com/inProgress-team/react-native-youtube), which allows us to play YouTube media within the application.

`$ npm install --save react-native-search-box`

`$ npm install --save react-native-youtube`

## Basic Navigation
One of the classic navigation components in iOS is the Tab Bar.

Create a new director in the top level of the project folder called `components`.
Then create two new files: `components/search.js` and `components/featured.js`.

```
import React, { Component } from 'react';

import {
    NavigatorIOS,
    View,
    Text,
  } from 'react-native';

class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Search component
        </Text>
      </View>
    );
  }
}

module.exports = Search;
```

And for  do the same for your `featured` component (with whatever refactoring is necessary).

Now let's connect them all together. Navigate to the file called `index.ios.js`. This is the top-level file for iOS dev in react native. (Side note: there's also an `index.android.js` file, which makes it fairly easy to convert to Android as well1 There are a few components in this workshop that aren't Android-friendly, so we won't be dealing with it, but it's nice to know it's there.)

Alright, so in `index.ios.js`, add the following code:

```
import React, { Component } from 'react';
import Featured from './components/featured';
import Search from './components/search';

import {
    AppRegistry,
    TabBarIOS,
  } from 'react-native';

class VidSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'search'
        };
    }

    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}
              translucent={false}
              unselectedItemTintColor='#9E9E9E'
              tintColor='#c4302b'
            >
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'search'}
                    systemIcon='search'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'search'
                        });
                    }}>
                    <Search />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'featured'}
                    systemIcon='featured'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'featured'
                        });
                    }}>
                    <Featured />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('VidSearch', () => VidSearch);
```

Alright, now head over to your simulator.

What's going on here? We forgot to add styling! Head back to `search.js` and add the following styling:

```
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

Don't forget to add `StyleSheet` to your imports at the top!

```
import {
    StyleSheet,
    NavigatorIOS,
    View,
    Text,
    StatusBar,
  } from 'react-native';
```

Copy the same thing into `featured.js`. Refresh the simulator again. Now we have a nice looking tab bar at the bottom of the page. Should look something like this:

![tab bar](./images/tab-bar.png)

Let's make the featured page look a little less boring. Replace all the code in it with this:

```
import React, { Component } from 'react';
import ImageView from './imageView';

import {
    StyleSheet,
    View,
    NavigatorIOS,
    Text,
    Image,
    StatusBar,
  } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Featured = (props) => {

  return (
    <View style={styles.container}>
    <StatusBar
     backgroundColor="blue"
     barStyle="light-content"
   />
    <NavigatorIOS
      style={styles.container}
      translucent={false}
      barTintColor='#c4302b'
      titleTextColor='white'
      initialRoute={{
        title: 'Yay React',
        component: ImageView,
      }}
    />
    </View>
  );
};


module.exports = Featured;
```

Now create a new file called `components/imageView.js`. We'll just put this nice react logo in it, so the page isn't so dreadfully boring.

Here's some more code!

```
import React from 'react';
import {
  View,
  Image,
} from 'react-native';


const ImageView = (props) => {
  return (
    <View>
      <Image
        style={{ width: 400, height: 300 }}
        source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
      />
    </View>
  );
};

module.exports = ImageView;
```

Now, instead of some gross text up in the top corner, we have this nice react logo, since we love react so much:

![featured tab](./images/featured.png)

## Adding Content to the Search Page
So we've got some basic navigation working on the app, but it looks pretty boring. Let's make some cool stuff on the search tab, like how about a nice table view?

Since a table-view is specific to iOS, but react-native is cross-platform, there's no actual table view component. Instead, what we'll need to do is create a list component and instantiate it in our `search` page.

Create a new file: `components/video_list.js`. Add some imports:

```
import React, { Component } from 'react';
import youtubeSearch from '../youtube-api';
import axios from 'axios';
import Search from 'react-native-search-box';

import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    ListView,
    TouchableHighlight,
  } from 'react-native';
```

Now that that's there, let's import it into `search.js` so we can use it.

```
// Near the top of search.js
import VideoList from './video_list';
```

And lets create a new class component:

```
import VideoDetail from './video_detail';

// Add styling here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  },
  listView: {
    backgroundColor: 'white',
  },
});

class VideoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: 'dog',
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  //---------- componentDidMount here! -----------//

  //------------ put fetchData here! -------------//

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <Text>
                   Loading videos...
               </Text>
      </View>
    );
  }

  showVideoDetail(video) {
    this.props.navigator.push({
      title: video.snippet.title,
      component: VideoDetail,
      passProps: { video },
    });
  }

  renderVideo(video) {
    return (
      <TouchableHighlight onPress={() => { this.showVideoDetail(video); }} underlayColor="#dddddd">
        <View>
          <View style={styles.container}>
            <Image
              source={{ uri: video.snippet.thumbnails.default.url }}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{video.snippet.title}</Text>
              <Text style={styles.subtitle}>{video.snippet.description}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }
    return (
      <View style={{ marginBottom: 150 }}>
        <Search
          backgroundColor='#c4302b'
          showsCancelButton={false}
          textFieldBackgroundColor='#c4302b'
          onChangeText={(query) => {
            this.setState({ query });
            // Call fetchData here!
            this.fetchData();
          }
          }
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderVideo.bind(this)}
          style={styles.listView}
        />
      </View>
    );
  }
}

module.exports = VideoList;
```

We need to actually gather our data from Youtube. Let's add in the fetchData method to make our API call.

```
fetchData() {
  youtubeSearch(this.state.query)
     .then((responseData) => {
       this.setState({
         dataSource: this.state.dataSource.cloneWithRows(responseData),
         isLoading: false,
       });
     })
     .done();
}
```

Where should we call this from? It would be nice if we could get the data from YouTube as soon as we get to the page. Can you recall from your React mastery which life cycle component is the ideal place to call it? You guessed it:

```
componentDidMount() {
  this.fetchData();
}
```

Now when the page loads, we'll make a call to fetchData to populate our list view.

Alright, let's update the `search.js` file to have a table view that lists all our videos. Replace the return statement in the render function with the following:

```
<View style={styles.container}>
  <StatusBar
    backgroundColor="blue"
    barStyle="light-content"
  />
  <NavigatorIOS
    style={styles.container}
    translucent={false}
    barTintColor='#c4302b'
    titleTextColor='white'
    tintColor='white'
    initialRoute={{
      title: 'Featured Videos',
      component: VideoList,
    }}
  />
</View>
```

Ah darn, one other thing. We need to actually have a reference to the API, right? This next part should (hopefully) look super familiar.

Create a new file at the top level of your project, `youtube-api.js`. Add the following:

```
import axios from 'axios';

const API_URL = 'https://www.googleapis.com/youtube/v3/search';
// const API_KEY = YOUR YOUTUBE DEVELOPER API KEY

const youtubeSearch = (term) => {
  const params = {
    part: 'snippet',
    key: API_KEY,
    q: term,
    type: 'video',
  };

  return new Promise((resolve, reject) => {
    axios.get(API_URL, { params })
      .then((response) => {
        resolve(response.data.items);
      })
      .catch((error) => {
        console.log(`youtube api error: ${error}`);
        reject(error);
      });
  });
};

export default youtubeSearch;
```

There's just one little thing you need to change in the above file. Remember when you had to get your API key from youtube before? No? Well, here's a quick refresher.

- Go to the [Google API Developer's Console](http://console.developers.google.com) and open the API manager.
- Go to 'credentials' on the left hand sidebar
- Locate your Youtube Data API v3 key. It's the same one from your short assignment 4, but we can reuse it here! Copy and paste it into `youtube-api.js`, where we've marked YOUR YOUTUBE DEVELOPER API KEY
- Accidentally deleted your API key? No biggie. Just follow the [old instructions from sa4](http://cs52.me/assignments/sa/react-videos/#youtube-api).

What's this videoDetail thing? We'll also need to create that. Make a new file called `compnents/video_detail.js` and paste in this code:

```
import React, { Component } from 'react';
import YouTube from 'react-native-youtube';

import {
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
  } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 107,
    height: 165,
    padding: 10,
  },
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565',
  },
});

class VideoDetail extends Component {
  render() {
    const video = this.props.video;
    const description = video.snippet.description || '';
    const vidId = video.id.videoId;
    return (
      <WebView
          style={styles.frame}
          source={{uri: `https://www.youtube.com/watch?v=${vidId}`}}
          renderLoading={this.renderLoading}
          renderError={this.renderError}
          automaticallyAdjustContentInsets={false}
      />
    );
  }
}

module.exports = VideoDetail;
```

This is a little different from what we've been doing. The WebView component is a sort of hybrid component that's actually just rendering a webpage. The `source` prop holds a uri that's called as if in a browser and then displayed in our application. Notice how it looks just like watching youtube on a mobile device. Pretty cool that we can do this within our application alongside native components, huh?

Here's what the app should be looking like now:
![finished app](./images/finished.png)

Search something unique and take a screenshot. You'll upload this to your repo to turn in.

## And We Are Done!
Look at you! You spend eight weeks in full-stack web dev, but little did you know it was actually smartphone programming in disguise! Here's what we accomplished today:

- [x] Learned how to set up a new iOS project in react native (from scratch!)
- [x] Implement Tab Bar navigation (without Swift code)
- [x] Learn how to use the react-native simulator
- [x] Made a table view on an iPhone in JavaScript
- [x] Make an API call to YouTube using axios
- [x] Evaded a quiz for an extra hour!

## Submission
To submit, create a new github repo and push your code up to it. In the README file, include the two screenshots we asked you to provide. On canvas, submit the URL to your repo. If you had a partner, submit their name too, so we can count the assignment for both of you.
