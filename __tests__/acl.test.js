'use strict';

const { users, db } = require('../src/auth/models');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);

let testUser;

beforeAll(async () => {
  await db.sync();
  testUser = await users.create({username: 'Elizabeth', password: 'pasword1234', role: 'admin'});
});

afterAll(async () => {
  await db.drop();
});

let food1 = {
  name: 'Apple',
  calories: 95,
  type: 'fruit',
};

// Persmissions to access FOOD Model
describe('Access Control Tests', () => {


  // POST /api/v2/:model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item
  test('Authorized to create', async () => {
    let response = await request.get('/api/v2/create').set('Authorization', `Bearer ${testUser.token}`);
    let createFood = await mockRequest.post('/api/v2/food').send(food1);

    expect(response.status).toEqual(200);
    expect(createFood.body.id).toEqual(1);
    expect(createFood.body.name).toEqual('Apple');
    expect(createFood.body.calories).toEqual(95);
    expect(createFood.body.type).toEqual('fruit');
  });

  // GET /api/v2/:model with a bearer token that has read permissions returns a list of :model items
  test('Authorized to read', async () => {
    let response = await request.get('/api/v2/read').set('Authorization', `Bearer ${testUser.token}`);
    let food = await mockRequest.get('/api/v2/food');

    expect(response.status).toEqual(200);
    expect(food.body.id).toEqual(1);
    expect(food.body.name).toEqual('Apple');
    expect(food.body.calories).toEqual(95);
    expect(food.body.type).toEqual('fruit');
  });
  
  // GET /api/v2/:model/ID with a bearer token that has read permissions returns a single item by ID
  test('Authorized to read', async () => {
    let response = await request.get('/api/v2/read').set('Authorization', `Bearer ${testUser.token}`);
    let food1 = await mockRequest.get('/api/v2/food/1');

    expect(response.status).toEqual(200);
    expect(food1.body.id).toEqual(1);
    expect(food1.body.name).toEqual('Apple');
    expect(food1.body.calories).toEqual(95);
    expect(food1.body.type).toEqual('fruit');
  });
  
  // PUT /api/v2/:model/ID with a bearer token that has update permissions returns a single, updated item by ID
  test('Authorized to update', async () => {
    let response = await request.get('/api/v2/update').set('Authorization', `Bearer ${testUser.token}`);
    await mockRequest.post('/food').send(food2);
    let food1 = await mockRequest.get(`/api/v2/food/1`);

    expect(response.status).toEqual(200);
    expect(food1.body.id).toEqual(1);
    expect(food1.body.name).toEqual('Banana');
    expect(food1.body.calories).toEqual(105);
    expect(food1.body.type).toEqual('fruit');
  });
  
  
  // DELETE /api/v2/:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found

  test('Authorized to update', async () => {
    let response = await request.get('/update').set('Authorization', `Bearer ${testUser.token}`);
    await mockRequest.delete('/api/v2/food/1');
    let getFood = await mockRequest.get(`/api/v2/food/1`);

    expect(response.status).toEqual(200);
    expect(getFood.body).toEqual({});
  });
  
});

let clothes1 = {
  name: 'Shirt',
  color: 'White',
  size: 'Medium',
};

// Persmissions to access CLOTHES Model
describe('Access Control Tests', () => {


  // POST /api/v2/:model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item
  test('Authorized to create', async () => {
    let response = await request.get('/api/v2/create').set('Authorization', `Bearer ${testUser.token}`);
    let createClothes = await mockRequest.post('/api/v2/clothes').send(clothes1);

    expect(response.status).toEqual(200);
    expect(createClothes.body.id).toEqual(1);
    expect(createClothes.body.name).toEqual('Shirt');
    expect(createClothes.body.color).toEqual('White');
    expect(createClothes.body.size).toEqual('Medium');
  });

  // GET /api/v2/:model with a bearer token that has read permissions returns a list of :model items
  test('Authorized to read', async () => {
    let response = await request.get('/api/v2/read').set('Authorization', `Bearer ${testUser.token}`);
    let clothes = await mockRequest.get('/api/v2/clothes');

    expect(response.status).toEqual(200);
    expect(clothes.body.id).toEqual(1);
    expect(clothes.body.name).toEqual('Shirt');
    expect(clothes.body.color).toEqual('White');
    expect(clothes.body.size).toEqual('Medium');
  });
  
  // GET /api/v2/:model/ID with a bearer token that has read permissions returns a single item by ID
  test('Authorized to read', async () => {
    let response = await request.get('/api/v2/read').set('Authorization', `Bearer ${testUser.token}`);
    let clothes1 = await mockRequest.get('/api/v2/clothes/1');

    expect(response.status).toEqual(200);
    expect(clothes1.body.id).toEqual(1);
    expect(clothes1.body.name).toEqual('Shirt');
    expect(clothes1.body.color).toEqual('White');
    expect(clothes1.body.size).toEqual('Medium');
  });
  
  // PUT /api/v2/:model/ID with a bearer token that has update permissions returns a single, updated item by ID
  test('Authorized to update', async () => {
    let response = await request.get('/api/v2/update').set('Authorization', `Bearer ${testUser.token}`);
    await mockRequest.post('/clothes').send(clothes2);
    let clothes1 = await mockRequest.get(`/api/v2/clothes/1`);

    expect(response.status).toEqual(200);
    expect(clothes1.body.id).toEqual(1);
    expect(clothes1.body.name).toEqual('Shoes');
    expect(clothes1.body.calories).toEqual('Black');
    expect(clothes1.body.type).toEqual('W 8');
  });
  
  
  // DELETE /api/v2/:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found

  test('Authorized to update', async () => {
    let response = await request.get('/update').set('Authorization', `Bearer ${testUser.token}`);
    await mockRequest.delete('/api/v2/clothes/1');
    let getClothes = await mockRequest.get(`/api/v2/clothes/1`);

    expect(response.status).toEqual(200);
    expect(getClothes.body).toEqual({});
  });
  
});