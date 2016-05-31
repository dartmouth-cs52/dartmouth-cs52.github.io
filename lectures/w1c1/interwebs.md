---
layout: page
title: Week 1 Class 1 —
published: true
---


# The INTERWEBS #

"A series of tubes" — [Senator Ted Stevens (R-Alaska)](https://en.wikipedia.org/wiki/Series_of_tubes)

Okay... but tubes?

Well technically perhaps you can think of electrical and optical lines as tubes, but regardless before we can code for the web we should understand what all is involved.

Here is map of the submarine optical cables that provide internet connectivity globally. Note: most internet runs over physical cables, satellite is used only for remote areas and has a very high latency.

![](submarine_cables.jpg)
(from [submarinecablemap.com](http://www.submarinecablemap.com/))

![](connectivity2012.jpg)
(from [Chris Harrison](http://chrisharrison.net/index.php/Visualizations/InternetMap))

![](facebook_map.jpg)
(from [Paul Butler](https://gigaom.com/2010/12/14/facebook-draws-a-map-of-the-connected-world/))

The FB map is more of a social graph but does show internet connected Facebook users. Notice anything interesting missing?

So how does data traverse this really complicated graph of interconnected of wires?


## Protocols ##

Computers talk to each other just like humans.  When you have an interaction at a cafe with the barista you are following a social protocol. Protocols are simply the order and format of the conversation and both computer hardware and software employ protocols to communicate.

![](social_protocol.jpg)
(image from [Computer Networking: A Top Down Approach](https://wps.pearsoned.com/ecs_kurose_compnetw_6/))

We'll only be focusing on a few protocols but there are many protocols from how to transmit email to how your wifi sends radio signals.

## Layers ##

The internet currently operates using a system of layered protocols.  Your mail program does not need to know about how data gets transmitted between your computer and your wifi router, but both of these things have to work to get the data to your destination.

So the internet is made of layers. Like parfait.

Let's use a better analogy.

### Airline Routing ###

Say you are carrying some important data and you want to get from Boston to SF, most likely you'll want to fly.  There are many layered systems that are involved in getting you to your destination.

![](airline_packets.png)
(image from [Computer Networking: A Top Down Approach](https://wps.pearsoned.com/ecs_kurose_compnetw_6/) p. 48)

Note how these are layered.  Any given system adds information and provides a service.  So the baggage layer provides the service of transferring baggage for you and gives you a baggage tracking code that you carry with you.

Having a layered system allows us to add/remove/change services without impacting the rest of the stack. You can travel with carry-on for instance and skip the baggage service completely, or you can buy your ticket in different ways.

### Internet Protocol Suite ###

The internet is a complex system and uses a **layered service model** that consists of 5 layers. Each layer performs some actions for the layer above it and utilizes the layer below it.

* :apple: Application Layer:
  This layer includes protocols such as HTTP (web), SMTP(email), DNS(name service), FTP(file transfer protocol).  These are all application level in that they largely pass messages between specific applications.  In the case of HTTP for instance between web browser and a program running on a web server.
* :train2: Transport Layer:
  This layer is responsible for establishing a connection to the correct application on another host and guaranteed delivery of the applications messages. Most of what we will be seeing will be using TCP as the transport layer. TCP uses port numbers to identify applications on the hosts.  TCP only handles the transfer of application data and does not know anything about internet routing. That is for the Network Layer.
* :triangular_flag_on_post: Network Layer
  This layer contains the IP protocol. IP sends and routes packets between hosts. All internet connected devices that have a Network Layer must implement the IP protocol. TCP passes the target destination in the form of the IP address down to this layer which then routes it along the many different hosts on the way to the target.
* :link: Link Layer
  This layer passes data between hosts and includes protocols such as Ethernet and WiFi. Each host along the route talks to another in a particular way and neither your application, nor TCP, nor the network need to know how your ethernet.
* :telephone: Physical Layer
  This layer contains protocols for transferring bits along a wire or fiber optic cable. We'll largely ignore this layer.

Note: this [Internet Protocol Stack](https://en.wikipedia.org/wiki/Internet_protocol_suite) is not the only model. You may hear about the 7 layer [OSI model](https://en.wikipedia.org/wiki/OSI_model), however it is currently only a concept and is not implemented.

### Encapsulation and Packets

As data is passed down the layers it is encapsulated with additional layer specific headers. Here is a simplified view of the data packet as it passes down the stack.

![](encapsulation.jpg)

### Internet Data Flow

Say we have two computers (referred to as hosts) that need to communicate. For instance your laptop is Host A and Google is Host B. The router is the network hardware that directs (routes) internet traffic, similar to an airline controller. More on routing in a bit, suffice to say for now that routers end traffic along to the next router toward the destination.

![](layers.jpg)


## Addresses ##

But what about addresses?  To travel anywhere you need an address!

The IP protocol deals with addresses. Most of the internet runs on [IPv4](https://en.wikipedia.org/wiki/IPv4) addresses which are 32 bit numbers that look like  **nnn.nnn.nnn.nnn**.  IPv4 is running out of addresses as the whole space is only 4,294,967,296 (2^32) addresses.  However because of private networks (your laptop right now most likely has a private IP) IPv4 keeps living on.

Some things you should know about IP address.  The IP address space is subdivided into blocks.

### Private Addresses

`10.*.*.*` and `192.168.*.*` addresses are reserved for private networks.  Dartmouth Secure is a `10.` network.

`127.0.0.1` is reserved for your loopback address.  This is an address you can use when running your local dev environment!  `localhost`, `127.0.0.1`, `0.0.0.0` will all work to access the machine you are physically on.

These addresses are not publicly routable, meaning that routers across the internet will not know how to direct traffic to them.

![](noplacelikehome.jpg)

Publicly routable addresses are IPs that you can get to from anywhere.  All you really need to know here is that various registrars and countries are responsible for different blocks. Here's a map!

![](3327.jpg)


## Routing ##

Wait ok but how does a packet find its way around all those tubes!?

As a packet travels from one host to another it crosses through a series routers.  Each of these forwards the packet on based on a set of rules.   Routers will have typically have routing tables



```
if ( N matches a directly connected network address )

    Deliver datagram to D over that network link;

else if ( The routing table contains a route for N )

    Send datagram to the next-hop address listed in the routing table;

else if ( There exists a default route )

    Send datagram to the default route;

else

    Send a forwarding error message to the originator;
```
(from [wikipedia](https://en.wikipedia.org/wiki/IP_forwarding))





## Loading a page: the play ##

Lets play out a scenario.

If you don't read Hacker News, you should. So lets pull up a hacker news page.

![](internet.jpg)

_Human:_

 > Hey *Browser*, go to http://news.ycombinator.com

_Browser:_

 > Hold on, I don't know how to get there.

*Browser:*

 > Hey *Computer*,  what is the address for news.ycombinator.com?
 `host news.ycombinator.com`

*Computer:*

 > Hmm, one sec.

*Computer:*

 > Hey *ISP DNS server*, what's the address for news.ycombinator.com?

*ISP DNS Server:*

 > No idea, better ask someone more knowledge like the *ROOT DNS Servers*.

*Computer:*

 > Hey *ROOT DNS Servers* whois responsible for ycombinator.com?
 `whois ycombinator.com`

*ROOT DNS Servers:*

 > Better ask the *.COM DNS Servers*, they should know more.

*Computer:*

 > Hey *.COM DNS Servers*, what's the address for news.ycombinator.com?

*.COM DNS Servers:*

 > Oh, that was registered to Nicholas Sivo in 2005 and here's a list of *Hosts DNS Servers* that will know all about it.

*Computer:*

 > Ok now we're getting somewhere.
 > Hey *Hosts DNS Servers* what is the IP address for news.ycombinator.com.

*Hosts DNS Servers:*

 > Sure thing boss, here it is: *198.41.191.47*

*Computer hands address to Browser. Browser nods and gets back to work.*

*Browser:*

 > Hey *198.41.191.47*, I want to make a GET HTTP request. Give me / from the default http port for 80.

*198.41.191.47:*

 > Oooh, I'm just the load balancer, let me forward that request to one of my *Webservers*.

*198.41.191.47:*

 > Hey, *Webserver*, here's a request for you.

*Webserver:*

 > Ok, I have a *process* running on port 80 that should be able to answer that, please hold.

*Process:*

 > Lets, see, I need a list of today's top stories to answer that, one sec while I ask one of my *Database Servers*.

*Process:*

 > Hey *Database Server*: 'select title,description from stories order by date desc limit 10'    

*Database Server:*

 > Ok, ok.  Here you go: [results]

*Process takes results,  makes some pretty html for each row in the results and hands it to the webserver.*

*Webserver takes the html and responds to the waiting Browser.*

*Browser:*

 > Oh wow thanks. Ok I'll draw that on the screen! I think I know what all html should look like.
