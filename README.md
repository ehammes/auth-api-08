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

- [ci/cd](https://github.com/ehammes/auth-api-08/actions) (GitHub Actions)
- [back-end server url Prod]() (Heroku) - TBD

### Setup

#### `.env` requirements (where applicable)

None

#### How to initialize/run your application (where applicable)

- nodemon

#### How to use your library (where applicable)

#### Features / Routes

Specific routes to hit

- POST : `/signup`
- POST : `/signin`
- GET : `/users`
- GET : `/secret`

Models:
- `api/v1/foods`
- `api/v2/foods`
- `api/v1/clothes`
- `api/v2/clothes`

#### Tests

- Run tests using `npm test`
