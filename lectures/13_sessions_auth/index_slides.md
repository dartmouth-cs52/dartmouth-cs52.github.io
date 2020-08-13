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
name: Today


.medium[![](img/tq-restful-api.jpg)]

* Sessions
* Authentication
<!-- * [https://tinyurl.com/cs52-19s-pitches](https://tinyurl.com/cs52-19s-pitches) -->

???
* adjusting milestones and will publish dates on canvas
* going to move quickly to get the projects started
* lab5.p2 is pretty short more like a short
* QUESTIONS?


<!-- 

* <a href="https://catherineparnell-cs52-lab4.surge.sh/" target="_blank">[pet words]</a>
* <a href="https://srishti-cs52-reduxplatform.surge.sh/" target="_blank">[ui pills]</a>
* <a href="https://jaltaire-cs52-contact-cards.surge.sh/" target="_blank">[contact cards]</a>
* <a href="https://chibuzo-cs52-platform.surge.sh/" target="_blank">[nasa api]</a>
* <a href="https://georginadavis-cs52-food-for-thought.surge.sh/" target="_blank">[food]</a>
* <a href="https://hershel-cs52-lab4.surge.sh/" target="_blank">[click to filter]</a>
* <a href="https://mortonlife.surge.sh/" target="_blank">[family blog]</a>
* <a href="https://aarishiyer-cs52-blog.surge.sh/" target="_blank">[modals all day]</a>
* <a href="https://yaorui-cs52-plantform-client.surge.sh/" target="_blank">[click to edit]</a>
* <a href="https://sarahhong-lab4-blog.surge.sh/" target="_blank">[art gallery]</a>
* <a href="https://manzi-cs52-blog.surge.sh/" target="_blank">[debugging]</a>
* <a href="https://juliettepouchol-cs52-blog.surge.sh/" target="_blank">[magic gradients]</a>
* <a href="https://katherinetaylor-cs52-blog.surge.sh./" target="_blank">[wfh life]</a>
 -->

---
name: Data Persistence and Sessions

* So far:
    * in client memory state storage
        * component state
        * redux store
        * routes (a type of state awareness?)
    * database storage
        * persist content data

???
* but this probably isn't all that we might need
* what is some state storage/awareness that we haven't done yet?


---
name: Sessions

.small[![](img/idontremember.gif)]

* state between each request to server
* who is logged in?
* what have they done?
* what page are they on?
* fields they have filled in but not submitted?
* what else? 

???
* stateless http
* so far we've had client in-memory storage
* and and some general database storage
* but nothing about connecting a specific session or user client-server




---
name: Browser State Persistence

.small[![](img/closewindow.gif)]


* what about after closing browser window?

???
* all browser




---
name: Session State

.medium[![](img/memento.gif)]

* keep some state in active browser
* and between browser sessions

???
* what we want to do
* if you haven't seen memento... 
* what might we want to store in between requests to connect them together? 





---
name: But where to store it?

* store data:
  * client
  * web server
  * database

???
* where to store some session data?
* we've done in memory - and now posts and stuff on the server




---
name: Stateless HTTP now a problem?

* HTTP request to server
  * how to identify?

???
* need to tell server who we are
* every request




---
name: Cookies

.large[![](img/cookieremembers-table.jpg)]


???




---
name: Cookies

.small[![](img/http_session_cookie_illustration.png)]


* since early days of http:
  * some state set by web server
  * browser attaches to every request
  * key: value pairs
  * domain: server, port (optional), URL prefix (optional)
* limitations still
  * data size < 4kb
  * limited total number per domain

???
* comes from unix magic-cookie
* which comes from fortune-cookie
* a cookie with a message





---
name: Cookies

```html
// server
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: cookie_name2=cookie_value2; expires=Sun, 16 Jul 2016 06:23:41 GM
```

```html
// browser cookie header
GET /index.html HTTP/1.1
Host: www.example.org
Cookie: cookie_name1=cookie_value1; cookie_name=cookie_value2;
```

???
* server sends cookie, client remembers it
* client sends cookie automatically back with each request
* browser and server implementation - not part of http specifically


---
name: Just a file

.medium[![](img/cookiefile.jpg)]


* just a file on your computer that your browser reads/writes automatically
* you can:
  * View cookies
  * Modify/corrupt cookies
  * Delete cookies
  * Create cookies
  * Allow them to be stolen

???
* user id in cookie
* could be changed!




---
name: Variety of Types


.left[
* session cookie (memory)
* persistent cookie (disk)
* secure (over https)
* HttpOnly (no js)
* 3d party (ads)
* zombie (resurrects)
]

.right[![](img/zombiecookie-table.jpg)
]

???
* zombie cookie is stored in a variety of different ways,  cached image in your browser, session storage, flash, etc, ip addr etc.
* 3rd party are dropped by iframes from ads for instance
* httponly don't allow js access from browser - so only via auto requests
* secure - only work over https

---
name: Tracked and Stolen

<iframe src="//giphy.com/embed/N4ZMex19Ju3XG" width="480" height="438" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

???
* cookies can be used to track you
* say you have an iframe and it loads foo.com
  * this can now drop a cookie for domain foo.com
  * but the iframe had some identifier that it was being shown on site y.com
  * now every time you go to some site that also uses the advertising provider
  * they know you've been there.


---
name: HTML5 WebStorage API

* sessionStorage
  * per origin, per window
  * only while window is open
  * survives reloads but not closes

```javascript
// Save data to sessionStorage
sessionStorage.setItem('key', 'value');
// Get saved data from sessionStorage
const data = sessionStorage.getItem('key');
// Remove saved data from sessionStorage
sessionStorage.removeItem('key')
```


???
* so maybe cookies have problems
* and we don't have enough control
* but we like javascript everything now right?
* accessed only through javascripty goodness
* still per origin - can't read another domains storage



---
name: HTML5 WebStorage API

.medium[![](img/localstorage.jpg)]

* localStorage
  * longer term per origin storage
  * 10mb
  * accessible from JS
  * not automatic

```javascript
localStorage.someSetting = 'orange';
```


???
* if the server needs to know anything in localStorage - we need to manually send it - unlike cookies






---
name: Frameworks Can Provide Sessions

* Both client and server are aware of some shared state via cookies
* Rails:
  * session[:user_id] = "pusheen"
  * cookie exists: get session data
  * otherwise: start new session
* manual encryption if any

???
* some frameworks automatically set on client and returned
* typically no encryption but easy
* typically use cookies




---
name: Additional Server Session Storage

* memory:
  * fast
  * expensive
  * can't load balance
  * doesn't last
* database
  * scalable
  * excessive
* specialized
  * *memcached*, *redis*
  * fast key:value stores

???
* frameworks might employ additional server session tracking
* server tracking of sessions
* still requires client data but can extend local session storage





---
name: Express.js Sessions

* `request.session` through middlewares
* we'll write our own that is more secure!

???
* is cookies based




---
name: Session Hijacking

.small[![](img/dogsled.gif)]

```html
// real bad
Cookie: user.password='this is my plain text password'

// still problematic
Cookie: connect.sid=2398sf98792874hk2kjh23iu
```
* 🔓 security through obscurity ⚠️

???
* what should we store in a cookie?
* if this could be guessed or stolen
* then attacker could easily become you
* **predictable session ids**
* security through obscurity?




---
name: HTTPS

.small[![](img/catcafe.gif)]

* even with good session id
* traffic can be monitored if not over HTTPS

???
* internet cafe wifi





---
name: CSRF

.medium_small[![](img/csrf_post.png)]


* cross site request forgery
  1. visit bank site and get session cookie
  1. later visit bad site
  1. bad site submits a form on your behalf to bank
  1. since session still valid...
  1. successful hacker transfers funds

???
* these days such an attack is rarer but still needs to be protected against
* cookies... are problematic because of the automatic include




---
name: CSRF

* many solutions
  * use secret form fields
  * use javascript to post JSON rather than forms
  * don't use cookies

???
* these days such an attack is rarer but still needs to be protected against
* cookies... are problematic because of the automatic include
* secret form fields with extra data for validation
* cross origin resource sharing protections help with js but not with form elements






---
name: Authentication

.medium[![](img/handshake.gif)]

* for sessions, for shared state, for identification, for permissions

???
* ok so we know some problems, if any shared state is required how do we guarantee identity? 
* big topic
* hw5 is about auth
* auth isn't just about users but also about roles and permissions




---
name: username and passwords

.medium[![](img/passwords.jpg)]


* passwords still pretty much defacto
* 2 factor authentication on the rise
  * phone or email validation 

???
* 2 factor typically now is key sent to phone
* as a user you might store password on **sticky note**




---
name: How to store password

![](img/saving_password.png)

???
* as a user you might store password on **sticky note**
* computer should do better
* generate random salt
* hash the password (where a hash is a one way crytographic function)
* store salt + hash (cat them together basically)
* no way to decrypt password
* on login compare hashes
* salt helps add some randomness so that an attacker couldn't do an easier lookup of hash to password -  would have to try all possibilities for the salt.




---
name: But browser

* once authenticated how to stay authenticated

<iframe src="//giphy.com/embed/26BROFLJSFhP0cMGk" width="680" height="440" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

???
* probably need to send back something to include in future requests
* dont' want to send password over and over / store password locally?



---
name: What to send back?

.medium[![](img/proveit.gif)]

* but stateless?
* once auth'd
   * give back identifying bit of data
   * need to include that data on every request

???
* wee could just say, yup authenticated; return true
* but then next request is unauthenticated again?
* need to send back some proof



---
name: Tokens Over Cookies

.medium[![](img/token_api_architecture.png)]

* can authenticate to another domain
* allows API

???
* cookies have problems
* and we are all js anyway
* separate servers for static and api
* multiple domains responsible for site
  * api1.domain
  * api2.domain etc





---
name: Tokens Over Cookies

.medium[![](img/cookie_token.png)]


???
* token:
  * manual wiring
  * somewhat cross-domain
* cookie:
  * automatically included
  * unique per domain
  * don't work across








---
name: Cookie

.medium[![](img/toptal-cookie.jpeg)]

???
* included automatically



---
name: Token

.medium[![](img/toptal-token.jpeg)]

???
* multi server support
* just need to include token for validation (stored salt+password == stored hash)





---
name: Auth Flow

.medium_small[![](img/auth_flow.png)]


???
* more auth flow




---
name: Tokens

![](img/bond-token.gif)


???
* what should this token thing be?
* this idea that a token, sometimes called bearer tokens (in that the bearer / person in possession of the token is authorized), requires that token to be somewhat special






---
name: JWT

.small[![](img/jwt-logo.svg)]

* JSON Web Token: [jwt.io](http://jwt.io)
* a bit of encrypted JSON
  * header: type of token and hash algo
  * payload: some fields like userid or email
  * signature:
    `hash(
      header +
      payload,
      secret)`


???
* is tricksy little bit
* signature is the tricksy bit
  * server side we take the header and payload and hash them with a secret key (known only on server)
  * on return we do the same and make sure the signature matches
  * if not deauth!
  * can force signout by changing secret key






---
name: JWT Contents

![](img/jwt_contents.png)

???
* what should be inside the JWT
* how about userid?




---
name: JWT Process

![](img/jwt-diagram.png)

???
* if we are reading the userid from jwt how can we be certain it wasn't changed?
* it is after all just some JSON
* clue: signature
* what is in signature?
* clue: header+payload one way hashed with secret




---
name: Sign-in Sign-up

![](img/token_process.png)

???





---
name: Social -> JWT Login

.medium[![](img/social-network-token-authentication.png)]

???
* social is a little tricker
* once user is logged in with fb on Frontend
* send to backend which needs to validate with FB
* then uses the fbid to either signin/signup and return jwt
* jwt then works for some extended period of time without need to reauth to FB





---
name: Tokens -> Access

.medium[![](img/fingerprint.gif)]

???

---
name:  

.small[![](img/hedgehog.gif)]

* summary:
    * tokens help authenticate a user to server
    * store role / permissions in user object
    * use localStorage for any clientside across browser window data

---
name: next up lab5p2

.small[![](/assignments/lab/redux-platform+auth/img/passport_strategies.png)]

* update lab4 and lab5 repositories to support authentication
* use passport library to handle authenticating server routes
* store user objects with salted+hashed passwords
