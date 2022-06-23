'use strict';

const supertest = require('supertest');
const { server } = require('../src/server');
const { sequelize } = require('../src/models');
const mockRequest = supertest(server);

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
});

let food1 = {
  name: 'Apple',
  calories: 95,
  type: 'fruit',
};

// Food Model
describe('Testing REST API', () => {

  //POST /api/v1/:model adds an item to the DB and returns an object with the added item
  test('Add an item to the DB', async () => {
    let response = await mockRequest.post('/food').send(food1);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Apple');
    expect(response.body.calories).toEqual(95);
    expect(response.body.type).toEqual('fruit');
  });

  // GET /api/v1/:model returns a list of :model items
  test('Return all food items from the DB', async () => {
    let response = await mockRequest.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Apple');
    expect(response.body.calories).toEqual(95);
    expect(response.body.type).toEqual('fruit');
  });

  // GET /api/v1/:model/ID returns a single item by ID
  test('Returns a specific food item from the DB', async () => {
    let response = await mockRequest.get('/food/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Apple');
    expect(response.body.calories).toEqual(95);
    expect(response.body.type).toEqual('fruit');
  });

  // PUT /api/v1/:model/ID returns a single, updated item by ID
  test('Returns a specific UPDATED food item from the DB', async () => {
    let response = await mockRequest.post('/food').send(food2);
    let getFood = await mockRequest.get(`/food/1`);

    expect(response.status).toEqual(200);
    expect(getFood.body.id).toEqual(1);
    expect(getFood.body.name).toEqual('Banana');
    expect(getFood.body.calories).toEqual(105);
    expect(getFood.body.type).toEqual('fruit');
  });

  // DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found
  test('DELETE a specific food item from the DB', async () => {
    let response = await mockRequest.delete('/food/1');
    let getFood = await mockRequest.get(`/food/1`);

    expect(response.status).toEqual(200);
    expect(getFood.body).toEqual({});
  });

});

let clothes1 = {
  name: 'Shirt',
  color: 'White',
  size: 'Medium',
};

// Clothes Model
describe('Testing REST API', () => {

  //POST /api/v1/:model adds an item to the DB and returns an object with the added item
  test('Add clothes to the DB', async () => {
    let response = await mockRequest.post('/clothes').send(clothes1);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Shirt');
    expect(response.body.color).toEqual('White');
    expect(response.body.size).toEqual('Medium');
  });

  // GET /api/v1/:model returns a list of :model items
  test('Return all clothes from the DB', async () => {
    let response = await mockRequest.get('/clothes');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Shirt');
    expect(response.body.color).toEqual('White');
    expect(response.body.size).toEqual('Medium');
  });

  // GET /api/v1/:model/ID returns a single item by ID
  test('Returns a specific clothing item from the DB', async () => {
    let response = await mockRequest.get('/clothes/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Shirt');
    expect(response.body.color).toEqual('White');
    expect(response.body.size).toEqual('Medium');
  });

  // PUT /api/v1/:model/ID returns a single, updated item by ID
  test('Returns a specific UPDATED food item from the DB', async () => {
    let response = await mockRequest.post('/clothes').send(clothes2);
    let getClothes = await mockRequest.get(`/clothes/1`);

    expect(response.status).toEqual(200);
    expect(getClothes.body.id).toEqual(1);
    expect(getClothes.body.name).toEqual('Shoes');
    expect(getClothes.body.calories).toEqual('Black');
    expect(getClothes.body.type).toEqual('W 8');
  });

  // DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found
  test('DELETE a specific clothing item from the DB', async () => {
    let response1 = await mockRequest.delete('/clothes/1');
    let getClothes = await mockRequest.get(`/clothes/1`);

    expect(response1.status).toEqual(200);
    expect(getClothes.body).toEqual({});
  });
  
});