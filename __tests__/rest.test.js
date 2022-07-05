'use strict';

const supertest = require('supertest');
const { db } = require('../src/models');
const { server } = require('../src/server');
const { sequelize } = require('../src/models');
const mockRequest = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

let food1 = {
  name: 'Apple',
  calories: 95,
  type: 'fruit',
};

let food2 = {
  name: 'Orange',
  calories: 95,
  type: 'fruit',
};

// Food Model
describe('Testing REST API', () => {

  //POST /api/v1/:model adds an item to the DB and returns an object with the added item
  test('Add an item to the DB', async () => {
    let response = await mockRequest.post('/api/v1/food').send(food1);

    expect(response.status).toEqual(201);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Apple');
    expect(response.body.calories).toEqual(95);
    expect(response.body.type).toEqual('fruit');
  });

  // GET /api/v1/:model returns a list of :model items
  test('Return all food items from the DB', async () => {
    let response = await mockRequest.get('/api/v1/food');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Apple');
    expect(response.body.calories).toEqual(95);
    expect(response.body.type).toEqual('fruit');
  });

  // GET /api/v1/:model/ID returns a single item by ID
  test('Returns a specific food item from the DB', async () => {
    let response = await mockRequest.get('/api/v1/food/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Apple');
    expect(response.body.calories).toEqual(95);
    expect(response.body.type).toEqual('fruit');
  });

  // PUT /api/v1/:model/ID returns a single, updated item by ID
  test('Returns a specific UPDATED food item from the DB', async () => {
    await mockRequest.put('/api/v1/food/1').send(food2);
    let getFood = await mockRequest.get('/api/v1/food/1');

    expect(getFood.status).toEqual(200);
    expect(getFood.body.id).toEqual(1);
    expect(getFood.body.name).toEqual('Orange');
    expect(getFood.body.calories).toEqual(95);
    expect(getFood.body.type).toEqual('fruit');
  });

  // DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found
  test('DELETE a specific food item from the DB', async () => {
    await mockRequest.delete('/api/v1/food/1');
    let getFood = await mockRequest.get('/api/v1/food/1');

    expect(getFood.status).toEqual(200);
    expect(getFood.body).toBeNull();
  });

});

let clothes1 = {
  name: 'Shirt',
  color: 'White',
  size: 'Medium',
};

let clothes2 = {
  name: 'Shirt',
  color: 'Red',
  size: 'Large',
};

// Clothes Model
describe('Testing REST API', () => {

  //POST /api/v1/:model adds an item to the DB and returns an object with the added item
  test('Add clothes to the DB', async () => {
    let response = await mockRequest.post('/api/v1/clothes').send(clothes1);

    expect(response.status).toEqual(201);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Shirt');
    expect(response.body.color).toEqual('White');
    expect(response.body.size).toEqual('Medium');
  });

  // GET /api/v1/:model returns a list of :model items
  test('Return all clothes from the DB', async () => {
    let response = await mockRequest.get('/api/v1/clothes');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Shirt');
    expect(response.body.color).toEqual('White');
    expect(response.body.size).toEqual('Medium');
  });

  // GET /api/v1/:model/ID returns a single item by ID
  test('Returns a specific clothing item from the DB', async () => {
    let response = await mockRequest.get('/api/v1/clothes/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Shirt');
    expect(response.body.color).toEqual('White');
    expect(response.body.size).toEqual('Medium');
  });

  // PUT /api/v1/:model/ID returns a single, updated item by ID
  test('Returns a specific UPDATED clothing item from the DB', async () => {
    await mockRequest.put('/api/v1/clothes/1').send(clothes2);
    let getClothes = await mockRequest.get(`/api/v1/clothes/1`);

    expect(getClothes.status).toEqual(200);
    expect(getClothes.body.id).toEqual(1);
    expect(getClothes.body.name).toEqual('Shirt');
    expect(getClothes.body.color).toEqual('Red');
    expect(getClothes.body.size).toEqual('Large');
  });

  // DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found
  test('DELETE a specific clothing item from the DB', async () => {
    await mockRequest.delete('/api/v1/clothes/1');
    let getClothes = await mockRequest.get(`/api/v1/clothes/1`);

    expect(getClothes.status).toEqual(200);
    expect(getClothes.body).toBeNull();
  });
  
});