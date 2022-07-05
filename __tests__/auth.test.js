'use strict';

const { server } = require('../src/server.js');
const { db } = require('../src/models');
const base64 = require('base-64');
const supertest = require('supertest');
const mockRequest = supertest(server);

beforeAll (async () => {
  await db.sync();
});

afterAll (async () => {
  await db.drop();
});

describe('Auth Tests', () => {
  test('User signs up with POST /signup', async () => {
    let response = await mockRequest.post('/signup').send({
      username: 'elizabeth',
      password: 'password1234',
    });

    console.log('Response Body', response.body);
    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('elizabeth');
    expect(response.body.user.password).toBeTruthy();
    expect(response.body.user.password).not.toEqual('password1234');
  });

  test ('allows a user to signin to their account with a POST to /signin', async () => {
    let authStr = 'elizabeth:password1234';
    let encodedStr = base64.encode(authStr);
    let response = await mockRequest.post('/signin').set('Authorization', `Basic ${encodedStr}`);
    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('elizabeth');
  });

});
