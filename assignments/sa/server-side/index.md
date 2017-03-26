---
layout: page
title: SA 6 MongoDB with Templating
published: true
---
![](img/enm.jpg){: .small }

## Overview

Today we'll be learning how to create a petition site: it will be an [express](https://expressjs.com/) server that displays some data which is stored using [mongodb](https://www.mongodb.com/). We'll get a taste of backend development with server-side rendering.

## Some Setup
First, let's download `node` and `mongodb` packages.
```bash
brew install node
brew install mongodb
```

🚀 We're going to be building a petition site, where users can sign various petitions. We will be using [express-babel-starter](https://github.com/dartmouth-cs52/express-babel-starter) to start — take a look through the `package.json` file. Mostly this sets us up with an `express` node server with a tiny bit of boiler plate as well as linting and babel. Do the usual: create your own repo and change the remote.

```bash
npm install
npm run dev
```

This will start our new node+express app in dev reloading mode.

## Intro Express

[Express](https://expressjs.com/) is a web framework for Node.js.  What it does for us is provide a way to listen for and respond to incoming web requests. Today, we will be creating API endpoints to respond to certain GET requests.

Take a look through the current `app/server.js` file. This is the entry point for the app. Just like `index.js` has been in our frontend app (the names of these are arbitrary). Note how we are setting the route:

```javascript
// default index route
app.get('/', (req, res) => {
  res.send('hi');
});
```
This function take 2 arguments:  request and response.  

Request is an express object that contains, among other things, any data that was part of the request. For instance, the JSON parameters we would POST or PUT in our asynchronous `axios` calls would be available as `req.body.parameterName`.

Response is another special express object that contains, among other things, a method named `send` that allows us a send back a response to the client.  When your api call gets back JSON data this is how it is returned.  Consider `res.send()` the equivalent of a network based `return` statement.

We'll add more routing in shortly, but first let's set up our database!

## Mongo Database Server

Mongo is the database that we are going to use.  We've already installed `mongodb` using Homebrew.  Follow further [installation instructions here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition).

 🚀 You will need to run the `mongod &` process, which your node app will connect to.  This is a background server process.

There is a commmandline client you can use to connect to the database: `mongo`. You can also play around with a more graphical client [robomongo](https://robomongo.org/).

🚀  Below are some commands we can run to create some petitions.
```bash
# mongoshell is a commandline interface to your local mongo db

show dbs
# will show your current databases

use bodypolitic
# will make bodypolitic the current database

db.petitions.insert(
   {
      'title': 'Sample Petition',
      'author':'Someone',
      'text': 'Some information about this petition. It is a really great petition.',
      'imageURL': '/img/card_background.jpg'
   }
)
# will insert an object into the database
# into a collection called petitions

db.petitions.find()
# returns everything in this collection
db.petitions.insert(
   {
     'title': "Immediate Release of Donald Trump's Tax Returns",
     'author':'Dartmouth Faculty',
     'text': 'The unprecedented economic conflicts of this administration need to be visible to the American people, including any pertinent documentation which can reveal the foreign influences and financial interests which may put Donald Trump in conflict with the emoluments clause of the Constitution.',
     'imageURL': '/img/card_background.jpg'
   }
)

# add in another entry

db.petitions.find({"author": "Dartmouth Faculty"})
# finds a entry in database by key:value
```

Ok, so now you've played a little bit with mongo directly, let's build something on top of it.

## Mongoose

![](img/mongoose.jpg){: .small .fancy }

To connect to mongo in our app, we will use a module called `mongoose`. [Mongoose](http://mongoosejs.com/) is a an object model for mongo. This allows us to treat data that we are storing in mongo as objects that have a nice API for querying, saving, validating, etc.  Mongo is in general considered a schema-less store.  We store JSON documents in a large object tree similarly to firebase. However, with Mongoose we are able to specify a schema for our objects.  This is purely in code and allows use to validate and assert our data before inserting it into the database.

🚀 Install mongoose:  `npm install --save mongoose`

🚀 And add just a little bit of code to get mongoose initialized with our database in `server.js`:

```javascript
import mongoose from 'mongoose';

// DB Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/bodypolitic';
mongoose.connect(mongoURI);
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

```

## Models

We're going to create a data model to work with.   A data model in mongoose is initialized from a schema, which is a description of the structure of the object.   This is much more like what you might be familiar with statically typed classes in Java.

🚀 Create a directory `app/models` and a file inside this directory named `petition.js`.


```javascript
import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const PetitionSchema = new Schema({
  title: String,
  author: String,
  text: String,
  imageURL: String,
  signatures: [{ type: Schema.Types.ObjectId, ref: 'Signer' }],
});

// create model class
const PetitionModel = mongoose.model('Petition', PetitionSchema);

export default PetitionModel;
```

🚀 We see that the Petition Schema has a list of signatures as a field, which is of type Signer. Therefore, we have to make an object model for Signers. Let's make a new file called `signer.js`.

```javascript
import mongoose, { Schema } from 'mongoose';

const SignerSchema = new Schema({
  name: String,
  petitions: [{ type: Schema.Types.ObjectId, ref: 'Petition' }],
  role: String,
  date: { type: Date, default: Date.now },
});

// SignerSchema.set('toJSON', {
//   virtuals: true,
// });

const SignerModel = mongoose.model('Signer', SigneeSchema);
export default SignerModel;

```

## Views
We need to create views for how our petitions will look like on the page.
🚀  Let us create the directory `app/views` to hold all our view templates. Let's also create the directory `partials` within this directory.   We will write some html with [ejs](https://www.npmjs.com/package/ejs), which allows us to embed javascript in html.   Therefore, when we re-render the index page, the index page will change depending on what objects we pass it.  
🚀  We need a navigation bar, don't we? In the `app/views/partials` directory, create a `nav.ejs` file.

```html
<div class="topBar">
    <h1><a href="/">Voices of Dartmouth</a></h1>
    <h4>Hear Dartmouth faculty contribute their voices to things that matter</h4>
</div>
```

🚀 We also want a modal partial for people to fill in their name and role when signing a petition. Therefore, let's create a file called `modal.ejs` in the `app/views/partials/` directory:
```html
<div id="confirmation_modal" class="modal">
  <div class="modal-content">
    <span id="modal_close">&times;</span>
    <p>Please enter your name and role.</p>
    <form action="" method="get">
      <div>
        <input type="text" id="name-input" name="name" placeholder="Name"></input>
      </div>
      <div>
        <input type="text" id="role-input" name="role" placeholder="Class Year ('17) or Professor"></input>
      </div>
      <div>
        <input id="confirm_button" type="submit" name="submit" value="Confirm Signature"></input>
      </div>
    </form>
  </div>

  <script>
    const modal = $('#confirmation_modal');
    const close = $("#modal_close");
    close.click(function(event) {
        modal.hide();
    });
    window.onclick = function(event) {
        if (event.target.id == modal.attr('id')) {
            modal.hide();
        }
    }
  </script>
</div>
```

🚀  Looks like we have some styling to do with modals, and we're using jQuery. Let's create a `head.ejs` file in the partials directory to include this for all of our pages.  
```html
<head>
    <title>Voices of Dartmouth Faculty</title>
    <script
      src="https://code.jquery.com/jquery-3.1.1.min.js"
      integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
      crossorigin="anonymous"></script>
    <link href="/styles.css"rel="stylesheet" type="text/css"/>

</head>
```

Here's some css to get a working modal and navigation bar.
```css
.topBar{
  height: 25%;
  top:0;
  background-image: url(`img/dartmouth_background.png`);
}
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 50%; /* Could be more or less, depending on screen size */
}
```

(We're using this image file `dartmouth_background.png` for the background of our navigation bar, but you can find your own and insert your image in place of this one).
![](img/dartmouth_background.png){:.small .fancy}

Now, let's insert the nav bar and the modal into `index.ejs` file, which we create under the `app/views/` directory. This is really easy in ejs:
```html
<html>
  <& include partials/head %>
<body>
  <% include partials/nav %>
  <% include partials/modal %>
</body>
</html>
```

🚀  Now let's make the rest of the index page. We want to display all of the petitions, and information about them. We also need to include buttons for each petition to see more details and also to sign this petition.  Here is how we do it:
```html
<div>
  <ul class="petitions">
   <% if (petitions.length > 0) { %>
      <% petitions.forEach(function(petition) { %>
        <% const shorterText = petition.text.substring(0, 500) + "..."; %>
          <li>
            <div class="petition">
              <div class="image">
                <img class="petition-image" src=<%= petition.imageURL %> alt="petition_image">
              </div>
              <div>
                <div class="title"><%= petition.title %></div>
                <div class="author"><%= petition.author %></div>
                <div class="preview_text"><%= petition.text %></div>
                <div class="line">
                  <div>
                      <div>Number of Supporters: <%= petition.signatures.length %></div>
                  </div>
                  <div class="button-group">
                    <a href="/petitions/<%= petition.id%>">
                      <button class="btn" type="button">
                        <img class="icon"/>View Details
                      </button>
                    </a>
                    <button type="submit" class="button-primary" id="sign-button-<%=petition.id%>">
                      <img class="icon"/>Sign Petition
                    </button>
                    <script>
                      document.getElementById('#sign-button-<%=petition.id%>').click(function(event) {
                        event.preventDefault();
                        document.getElementById('#confirmation_modal').show();
                        document.getElementById('#confirmation_modal form').attr('action', "/sign/<%= petition._id %>");
                      });
                    </script>
                  </div>
                </div>
              </div>
            </div>
          </li>
      <% }); %>
    <% } %>
  </ul>
</div>
```

Here, ejs works its rendering magic. When we pass in an object to ejs, in this case, `petitions`, to render `index.ejs`, we follow this same template.   We don't have to write separate templates for every new petition added to `petitions`.       There are even more neat things ejs can help us with: we can use the control flow operator `%` for for loops and boolean logic, and we can display variable parameters with the `<%= %>` operator, such as `<%= petitions.title %>`.   In a nutshell, ejs makes our static html template dynamic.

🚀 Let's hook our file to our app. First, download ejs:

```bash
npm install --save ejs
```

🚀 and to see what the page looks like without any petitions, and change `app/server.js` to read our new index ejs page:

```javascript
import path from 'path';

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.set('views', path.join(__dirname, '../app/views'));
// this just allows us to render ejs from the ../app/views directory

app.get('/', (req, res) => {
  // we will later be able to get the petitions by calling a function, but let's pass in no petitions for now
  const petitions = [];
  res.render('index', { petitions });
});
```

Great, so now when we hit `localhost:9090`, we see the nav bar.

🚀  We will also make a page to look more closely at a specific petition (where the View Details button will link to).  Let's create an `/app/views/petition.ejs` file.   Let's start with including partials as usual.

```html
<html>
<body>
  <% include partials/nav %>
  <% include partials/modal %>

  <div>
    <div class="petition">
    </div>
  </div>
</body>
</html>
```

🚀  Now, we can design how the petition information will be displayed. Within the `<div class="petition">` tag, we can insert the same html we did to display the `petition.imageURL`, `petition.title`, `petition.author`, etc. as we did in the index.

🚀  To display not just the number of people who signed the petition but also the information of each signer, let's get rid of the button to view more details (because this page is the details page), and instead the information of all the signers under the sign petition button.  

```html
<div class="line">
  <div>
      <div>Number of Supporters: <%= petition.signatures.length %></div>
  </div>
  <div class="button-group">
    <button type="submit" class="button-primary" id="sign-button-<%=petition.id%>">
      <img class="icon"/>Sign Petition
    </button>
    <script>
      document.getElementById('#sign-button-<%=petition.id%>').click(function(event) {
        event.preventDefault();
        document.getElementById('#confirmation_modal').show();
        document.getElementById('#confirmation_modal form').attr('action', "/sign/<%= petition._id %>");
      });
    </script>
  </div>
  <div class="signees">
    <% if (petition.signatures.length > 0) { %>
      <ul>
       <% petition.signatures.forEach(function(signer) { %>
         <li>
          ...
        </li>
       <% }); %>
       </ul>
    <% } %>
  </div>
</div>
```
{: .example}
We'll let you design how the signer's information is displayed yourself: use some properties from the Signer model we just created!

## Controllers

Notice anything a little familiar in our terminology?   Yup, we're on our way to creating a standard MVC for our API server!   

🚀 Create a directory `app/controllers` and a file inside this named `petition_controller.js`.   What might this controller do? Well it should have methods that perform all the main functionality of our API.  In short those methods would be:

```javascript
import Petition from '../models/petition';
import * as Signatures from './signer_controller';

export const getPetition = (petitionID, done) => {
  done(null, petitionID); // should return Petition object
};

export const getPetitions = (done) => {
  done(null, []); // should return a list of Petition objects
};

export const addSigner = (petitionID, role, name) => {
  return {}; // this doesn't need to return anything necessarily, but we could return the Signer object
};

```

🚀  We set this code up to create another controller as well, `signer_controller`, which is adding signers to a certain petition.
``` javascript
import Signer from '../models/signer';

export const createSigner = (name, role) => {
  return {};
};
```
Since this method will actually be always called by `addSigner` from the `petitions` controller, we do not need a `done` callback here, and all it will do is return a Signer mongoose object.

All these methods do not do anything meaningful right now. Let's leave these methods now with filler and then deal with the details later.


### Routing

Now we are ready to wire our app all together with routes. We can create a separate routes file, but our application is pretty small, so we can store all of our routes in our `app/server.js`:

Express allows us to use a chaining method to simplify how our routes look. For instance here is how we could define our `petitions/:id` routes, for all petitions.

```javascript
// example!
// on routes that end in /petitions
// ----------------------------------------------------
app.get('/someroute/:someID', (req, res) => {
  /*someMethod*/
});
```
{: .example}

Note `/*someMethod*/` is just a comment, you would call a method there in a module that we will call the controller — more on that shortly!

Ok, remember how we defined all our API endpoints in our controller?   Let's map them in our router.

🚀 Use the syntax above to make routes to map the following:

* GET `/`: Call petitions.getPetitions and render `index` in the callback
* GET `/petitions/:id`:  Call Petitions.getPetition and render `petition` page in the callback
* GET `/sign/:petitionID`:  Call Petitions.addSigner and render the petition `petition` page in the callback

🚀  For example, we should change the code to render our `/` route to be:
```javascript
import * as Petitions from './controllers/petition_controller';

app.get('/', (req, res) => {
  Petitions.getPetitions((err, petitions) => {
    res.render('index', { petitions });
  });
});
```

We'll let you handle the next two routes. For both of these methods, you need to get the router id that is passed in when we hit `/petitions/:id`.  This is accessible as `req.params.id` inside each of our controller functions that had this `:id` path variable.

For the `/sign/:petitionID`, you can likewise access `:petitionID` through `req.params.petitionID`. Also, because the `Petitions.addSigner()` method requires the role and the name of the signer, you can access these through `req.query.role` and `req.query.name`: inputs on a modal are stored as queries, which in urls are stored as `?name=value`. You also may want to use `res.redirect('petitions/req.params.petitionID')` instead of `res.render('petition', {petition})` so you don't have to pass in an entire petition object when you don't have to.


## Controller Continued

Ok but our controller `controllers/petition_controller.js` is fairly useless.  We have everything wired, but we need to actually store stuff.

We should first implement the `getPetitions` endpoint.

🚀 We just use our `Petition` Mongoose model schema to get all the petitions in the Petitions collection:

```javascript
export const getPetitions = (done) => {
  Petition.find({}, (error, petitions) => {
    done(null, petitions);
  });
};
```

🚀 Let's test this now and view the page at `localhost:9090/`. They should show our two petitions that we created in the `mongo` shell.

Now that we have the `getPetitions` method working, we have to use more database methods (all of them can be found in the [mongoose docs](http://mongoosejs.com/docs/queries.html)).
to implement the `getPetition` and `addSigner` methods.

🚀  In the `getPetition` method, we should use `.findOne()` to display the petition given by the id. However, mongoose does not give the entire object model of the signatures in `petitions.signatures`. Therefore, in the callback of the `.findOne()` function for the getPetition method, we have to call the `.populate()` function:

```javascript
Petition.findOne({ _id: petitionId}, (error, petition) => {
    petition.populate('signatures', (result) => {
      done(null, petition);
    });
  });
```
This returns `petition` as an object whose list of signatures are actual Signature objects: not just signature ids.

🚀  In the `addSigner` method, `.findOne()`, and `.save()` need to be used. The `addSigner` method should find the petition, call the `Signatures.createSigner()` method, then add the id of the signer into the `petitions.signatures` list, and finally `save()` the petition to get the job done.

## Deploy to Heroku

Great! We have everything working now. We will need to host this new server component!  Create a new Heroku app similarly to how to you did for the slack assignment:

1. Head over to [Heroku](https://www.heroku.com/) and login/sign up. Then, make a new app.
1. Now you need to connect to a mongo database.  Go to *Resources* and search for "mLab" under *Add-Ons*. Provision the *Sandbox* version of mLab for your app. This will automatically set a `MONGODB_URI` config variable so once you push your code to Heroku it will connect to this new mongo database.
1. Follow the steps under "Deploy Using Heroku Git".

## To Turn In

1. github url to your repo
2. url to your new heroku app instance for testing

### Extra Credit
* add more useful routes, such as creating petitions or deleting them, or removing a signature from a petition.
