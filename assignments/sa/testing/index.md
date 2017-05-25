---
layout: page
title: SA10 - Testing
published: true
---

![Mocha and CHai](http://i.imgur.com/XHXkjS4.png)

### Overview

Today we'll be learning how to use [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) to implement unit tests on our redux blog server that we built in Lab 5. There are several kinds of testing. Obviously simply testing the functionality of your code as you are working on it is helpful, but regression testing can be a life saver.  Regression testing checks to make sure that existing code still works after you add new functionality to it.

Since our API is not very complex, this is just meant as an introduction to how to write API tests.

### Setup

```shell
npm install --save-dev mocha chai chai-http eslint-plugin-mocha
```

Add this additional script in your `package.json`:

```javascript
"test": "NODE_ENV=test mocha --compilers js:babel-core/register"
```

We need this because by default `mocha` only supports `es5`, therefore we need `babel` to compile our `es6` code for `mocha` to run it.

#### Eslint

Let's also configure our eslint to handle these new frameworks.

* add `mocha: true` under your `env`
* `mocha` under your `plugins`
* and add this additional `rule` - `import/no-extraneous-dependencies: [2, { devDependencies: true }]`

Your `.eslintrc` file should look something like this:

```javascript
{
  extends: "airbnb",
  parser: "babel-eslint",
  env: {
    browser: false,
    node: true,
    es6: true,
    mocha: true
  },
  rules: {
    strict: 0,
    quotes: [2, "single"],
    no-else-return: 0,
    new-cap: ["error", {"capIsNewExceptions": ["Router"]}],
    no-console: 0,
    import/no-unresolved: [2, { commonjs: true, caseSensitive: false}],
    no-unused-vars: ["error", { "vars": "all", "args": "none" }],
    no-underscore-dangle: 0,
    arrow-body-style: ["error", "always"],
    no-shadow: ["error", { "allow": ["done", "res", "cb", "err", "resolve", "reject"] }],
    no-use-before-define: ["error", { "functions": false }],
    max-len: 0,
    no-param-reassign: 0,
    mocha/no-exclusive-tests: "error",
    import/no-extraneous-dependencies: [2, { devDependencies: true }]
  },
  plugins: [
    'import',
    'mocha'
  ],
  ecmaFeatures: {
    jsx: true,
    modules: true
  }
}
```

### Adding a configuration file

Since we have a dev environment, a prod environment, and now we are adding a testing environment, its a good idea to add a configuration file in order to cleanup code like this `const port = process.env.PORT || 9090`.

In a separate `app/config.js` file. It should look something like this, where we define configuration variables for our three possible environments. We want to make sure that our test environment runs tests on a port and database that is separate from the development environment.

```javascript
import dotenv from 'dotenv';
dotenv.config({ silent: true });

const env = process.env.NODE_ENV || 'development';

const projectConfig = {
  development: {
    mongoURI: 'mongodb://localhost/blog',
    port: 9090,
  },
  production: {
    mongoURI: process.env.MONGODB_URI,
    port: process.env.PORT,
  },
  test: {
    mongoURI: 'mongodb://localhost/test',
    port: 9999,
  },
};

export default projectConfig[env];
```

To use this file, we can import it as such in our `server.js`.

```javascript
import config from './config';

mongoose.connect(config.mongoURI);
```

### Writing the actual tests

Before we were testing our APIs with curl:

```shell
# all posts get:
curl -X GET "http://localhost:9090/api/posts"

# create new post
curl -X POST -H "Content-Type: application/json" -d '{
    "title": "first post",
    "tags": "words",
    "content":  "this is a test post",
    "cover_url": "https://media.giphy.com/media/uscuTAPrWqmqI/giphy.gif"
}' "http://localhost:9090/api/posts"

```

Now we want to automate this by writing unit tests with Mocha and Chai. Mocha is a node.js testing framework and Chai is an assertion framework.

An assertion is a way to run some block of code and expect a particular response.  In our case we can assert that the response from a particular API endpoint will be what we expect.

#### Should

`Chai` provides a `should` style that allows us to chain assertions on objects. We can use `should` to assert that variables are certain types and have certain properties, attributes, and values. There are additional assertion types that you can read about [here](http://chaijs.com/guide/styles/).

```javascript
// EXAMPLES
const foo = 'bar'
const beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
beverages.should.have.property('tea').with.lengthOf(3);
```

#### API Tests

Lets make a new directory called `tests` in the root directory and add a `posts.js` file to it. Add the following code:

```javascript
import chai from 'chai';
import chaiHttp from 'chai-http';
import Post from '../app/models/postModel';
import server from '../app/server';  // make sure that you export the server

const should = chai.should();  // eslint-disable-line no-unused-vars
const ROOT_URL = '/api';
chai.use(chaiHttp);

describe('Posts', () => {
  beforeEach((done) => {  // Before each test we empty the database
    Post.remove({}, (err) => {
      done();
    });
  });

  describe('/GET Posts', () => {  // This tests our GET posts route
    it('it should GET all the posts', (done) => {  // A description of what should happen
      chai.request(server)
        .get(`${ROOT_URL}/posts`)  // Make the API request
        .end((err, res) => {  // Process the response
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
```

Now that we've added a get for the GET posts route, we should have a similar test for the our 4 routes in our application (GET, PUT, DELETE posts/id, POST posts).


#### To Turn In

- github url to your repo

###### Additional Readings

 * [Mocha Docs](https://mochajs.org/)
 * [Chai Docs](http://chaijs.com/)

###### Footnote
 * Ask Jason on slack with any comments, questions, or suggestions!
