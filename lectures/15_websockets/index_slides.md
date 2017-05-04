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
name: Websockets



---
name: Today

* websockets
* project mockups

???






---
name: HTML5 WebSockets

![](img/globe.jpg){: .medium_small .white-background}


???
* in http




---
name: HTTP REST

![](img/HTTP-Long-Polling-Diagram.png){: .medium_small .white-background}

* request / response
* stateless
* auth tokens
* http verbs

???
* realtime is tricky





---
name: But REALTIME

* ajax polling
* long polling
* streaming


???
* draw
* oustretched hand
* only one direction



---
name: HTML5 WebSockets

![](img/httpsvsws.png){: .medium .white-background}


???
*




---
name: HTML5 WebSockets

* Bi-directional
* Event-based interface -- pub/sub
* Low level socket interface (remember tcp)


![](img/WebSockets-Diagram.png){: .medium_small .white-background}



???






---
name: Pros

* Realtime Events
* pub/sub simplicity
* efficient (no polling)
* stateful connections

???
*







---
name: Why Not Sockets for EVERYTHING?

* low level protocol means more things to implement
  * how to create/update/delete resources
  * no status codes
* stateful protocol
  * need sticky connections
  * more resources to support connections
* no caching, routing, multiplexing, compression

???
* unlike http,  websockets are stateful






---
name:


![](img/socket-io.png){: .medium .white-background}

???
* library for working with websockets
* automatic reconnections
* fallbacks in case browser doesn't support




---
name: Server

```javascript
io.on('connection', socket => {

  //outgoing
  socket.emit('news', { hello: 'world' });

  //incoming
  socket.on('submit', data => {
    console.log(data);
  });
});

io.sockets.emit('a broadcast', 'hello everyone');

```

???
*







---
name: Client

```javascript
const socket = io.connect('http://localhost');

//incoming
socket.on('news', data => {
  console.log(data);
  //outgoing
  socket.emit('submit', { my: 'data' });
});

```

???
*







---
name: Namespaces Server

```javascript
const chat = io
  .of('/chat')
  .on('connection', socket => {
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

const news = io
  .of('/news')
  .on('connection', socket => {
    socket.emit('item', { news: 'item' });
  });

```

???
* multiplexes so is efficient







---
name: Namespaces Client

```javascript
const chat = io.connect('http://localhost/chat')
const news = io.connect('http://localhost/news');

chat.on('connect', () => {
  chat.emit('hi!');
});

news.on('news', (data) => {
  news.emit('thanks Obama');
});
```

???
*







---
name: Callbacks Server

```javascript
socket.on('fetchPost',  (id, done) {
  Post.findById(id).then(post=> done(post);)
});
```

???
*







---
name: Callbacks Client

```javascript
socket.emit('fetchPost', id, (post) => {
  console.log(post);
});
```

???







---
name: broadcast

```javascript
socket.broadcast.emit('user connected', username);
```

???
*








---
name: Workshop!

[cs52.me/workshops/websockets](/workshops/websockets)


???




---
name: Nexttime

* project progress!

???
