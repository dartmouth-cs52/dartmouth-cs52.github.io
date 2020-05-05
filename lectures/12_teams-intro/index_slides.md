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
name: This Week

* Today:
  * Workshop on other frontend frameworks
  * Meet your teams!
* Tomorrow
  * Workshop on how to do messaging
* Thursday:
  * Databases and Servers Into


???




<!-- name: CS52 Art



![](img/functions-table.jpg)



* quiz grading tonight, do people want a quick review? -->






---
name: How is the Redux?



![](img/table-dash-redux.jpg)


???
* redux review




---
name: Redux Map



![](img/table-redux-takeover.jpg)


???
* redux review



---
name: What Is REST API?


.medium[![](img/getsomerest.png)]

* <span style="color: #F27D00">RE</span>presentational <span style="color: #F27D00">S</span>tate <span style="color: #F27D00">T</span>ransfer
  * software architecture style
  * guidelines for web app to server communications

???
* what we used for bloggy
* transfer some state -> from remote server to client
* where state is data from server
* api -> application programming interface on the web
* following some guidlines





---
name:  RESTful API


* Server should export resources to clients using unique names (URIs)
  * http://api.domain.com/photo/ is a collection
  * http://api.domain.com/photo/48s9c8s83j is a resource
* Server supports a set of HTTP verb mapping to CRUD

???
* resources avaible via http
* in file like paths
* helps to organize and think in terms of **paths to resources** rather than actions or functions
* why is this bad?





---
name:  RESTful API

.medium[![](img/mongodb-crud-operations1.png)]


* Server supports a set of HTTP verbs mapping to CRUD
  * *GET* method - Read resource (list on collection)
  * *PUT* method - Update resource
  * *POST* method - Create resource
  * *DELETE* method - Delete resource
* **do**: PUT `api.com/posts/:id`
* **don't**: POST `api.com/updatePostByID`


???
* endpoints are resources not actions
* why would it be bad to have action endpoints?
   * have hundreds potentially
   * getUser, getUserProfile, getListViewAuthorized, etc






---
name: API Design

.medium[![](img/rest-crud.png)]


1. define resources, give them unique names (URIs)
1. clients use CRUD operations via HTTP methods
1. keep abstractions clean: GET's don't delete, etc

???





---
name: Teams


.medium[![](img/teams.jpg)]


???
* larger than usual but we'll do our best to coordinate
* walk through activity

