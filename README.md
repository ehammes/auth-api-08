# LAB - Class 08

## Project: auth-api-08

### Author: Elizabeth Hammes

### Problem Domain  

In this final phase, the new requirement is to extend the restrictive capabilities of our routes to our API, implementing a fully functional, authenticated and authorized API Server using the latest coding techniques

Specifically, we want to make the following restrictions:

* Regular users can READ
* Writers can READ and CREATE
* Editors can READ, CREATE, and UPDATE
* Administrators can READ, CREATE, UPDATE, and DELETE
* Routes that end up performing those actions in our API/Database need to be protected by both a valid user and that user’s permissions

1. Task 1: Combine these 2 servers into a single server
2. Task 2: Create a new set of “Protected” API routes
3. Task 3: Apply best practices and quality engineering

### Links and Resources

* [ci/cd](https://github.com/ehammes/auth-api-08/actions) (GitHub Actions)

### Setup

#### `.env` requirements

* PORT
* SECRET
* DATABASE_URL

#### How to initialize/run your application

* nodemon

#### Features / Routes

Specific routes to hit

* POST : `/signup`
* POST : `/signin`
* GET : `/users`
* GET : `/secret`
* V1 Routes:
  * GET : `/api/v1/food`
  * GET : `/api/v1/food/1`
  * POST : `/api/v1/food`
  * PUT : `/api/v1/food/1`
  * DELETE : `/api/v1/food/1`
  * GET : `/api/v1/clothes`
  * GET : `/api/v1/clothes/1`
  * POST : `/api/v1/clothes`
  * PUT : `/api/v1/clothes/1`
  * DELETE : `/api/v1/clothes/1`
* V2 Routes:
  * GET : `/api/v2/food`
  * GET : `/api/v2/food/1`
  * POST : `/api/v2/food`
  * PUT : `/api/v2/food/1`
  * DELETE : `/api/v2/food/1`
  * GET : `/api/v2/clothes`
  * GET : `/api/v2/clothes/1`
  * POST : `/api/v2/clothes`
  * PUT : `/api/v2/clothes/1`
  * DELETE : `/api/v2/clothes/1`

#### Tests

* Run tests using `npm test`

#### UML

![lab 08 uml](/public/img/lab08_uml.jpg)