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
name: Sessions and Auth


---
name: Today

* Sessions
* Authentication
* HWs

???






---
name: Sessions

* state between each request to server
* who is logged in?
* what have they done?

???
* stateless http
* so far we've had in memory storage
* and we've had database storage
* but nothing about connecting client-server




---
name: Browser State Persistence

* what about after closing browser window?

???
* all browser




---
name: Session State

* keep some state in active browser
* and between browser sessions

???




---
name: More State Storage

* store data:
  * client
  * web server
  * database

???
* where to store some session data?




---
name: Stateless HTTP

* HTTP request to server
  * how to identify?

???
* need to tell server who we are
* every request




---
name: Cookies

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
name:


<iframe src="//giphy.com/embed/5LiNKV5YurvKo" width="680" height="470" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

???




---
name: Cookies

```
// server
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: cookie_name2=cookie_value2; expires=Sun, 16 Jul 2016 06:23:41 GM
```

```
// browser cookie header
GET /index.html HTTP/1.1
Host: www.example.org
Cookie: cookie_name1=cookie_value1; cookie_name=cookie_value2;
```

???





---
name: Just a file

* View cookies
* Modify/corrupt cookies
* Delete cookies
* Create cookies
* Can be stolen

???
* user id in cookie
* could be changed!




---
name: Tracked and Stolen

<iframe src="//giphy.com/embed/4KcDtVDyFRQKA" width="480" height="438" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

???




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
* accessed only thorugh javascripty



---
name: HTML5 WebStorage API

* localStorage
  * longer term per origin storage
  * 10mb
  * accessible from JS
  * not automatic

```javascript
localStorage.someSetting = 'orange';
```


???







---
name: Framework Sessions

* Rails:
  * session[:user_id] = "pusheen"
  * cookie exists: get session data
  * otherwise: start new session
* manual encryption if any

???
* automatically set on client and returned




---
name: Server Session Storage

* memory:
  * fast
  * expensive
  * can't load balance
* database
  * scalable
  * excessive
* specialized
  * *memcached*, *redis*
  * fast key:value stores

???






---
name: Express.js Sessions

* `request.session` through middlewares
* we'll write out own that is more secure!

???








---
name: Session Hijacking

```
// real bad
Cookie: user.password='this is my plain text password'

// still problematic
Cookie: connect.sid=2398sf98792874hk2kjh23iu
```

???
* if this could be guessed or stolen
* then attacker could easily become you
* predictable session ids




---
name: HTTPS

* even with good session id
* traffic can be monitored if not over HTTPS

???
* internet cafe wifi





---
name: CSRF

* cross site request forgery
  1. visit bank site and get session cookie
  1. later visit bad site
  1. bad site submits a form on your behalf to bank
  1. since session still valid...
  1. successful hacker funds transfer

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
* more about security later but today is auth






---
name: Authentication

<iframe src="//giphy.com/embed/X68QCGb5qx596" width="680" height="470" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

???
* big topic
* hw5 is about auth
* auth isn't just about users but also about roles and permissions




---
name: username and passwords

* passwords still pretty much defacto
* 2 factor authentication on the rise

???
* 2 factor typically now is key sent to phone




---
name: How to store password

![](img/saving_password.png){: .medium .white-background}


???
* as a user you might store password on sticky note
* computer should do better
* generate random salt
* hash the password (where a hash is a one way crytographic function)
* store salt + hash
* no way to decrypt password
* on login compare hashes




---
name: But browser

* once authenticated how to stay authenticated

<iframe src="//giphy.com/embed/26BROFLJSFhP0cMGk" width="680" height="440" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

???
* probably need to send back something to include in future requests




---
name: Tokens Over Cookies

![](img/token_api_architecture.png){:  .medium_small .white-background}

* can authenticate to another domain
* allows API

???






---
name: Tokens Over Cookies

![](img/cookie_token.png){:  .medium_small .white-background}


???





---
name: What to send back?

* once auth'd
* give back identifying bit of data
* need to include that data on every request

???
* wee could just say, yup authenticated; return true
* but then next request is unauthenticated again?
* need to send back some proof





---
name: Cookie

![](img/toptal-cookie.jpeg){:  .medium_small }

???




---
name: Token

![](img/toptal-token.jpeg){:  .medium_small }

???







---
name: Auth Flow

![](img/auth_flow.png){: .hfit .white-background}


???





---
name: Tokens

![](img/bond-token.gif){: .medium}


???
* what should this token thing be?






---
name: JWT

![](img/jwt-logo.svg){: .small}

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






---
name: JWT Contents

![](img/jwt_contents.png){: .white-background}

???
* what should be inside the JWT
* how about userid?




---
name: JWT Process

![](img/jwt-diagram.png){: .white-background}

???





---
name: Sign-in Sign-up

![](img/token_process.png){: .white-background}

???





---
name: Social -> JWT Login

![](img/social-network-token-authentication.png){: .white-background}

???





---
name: Tokens -> Access

<iframe src="//giphy.com/embed/Zg4Lf6cO8Cm6A" width="780" height="570" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

???









---
name:


* http://cs52.me/assignments/hw5p1
* next week:
  * Testing
  * Scalability

???
