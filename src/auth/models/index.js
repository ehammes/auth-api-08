'use strict'; // COMPLETED

const userModel = require('./users/users.js');
const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/model.js'); // copied
const foodModel = require('./food/model.js'); // copied
const Collection = require('./data-collection.js'); // copied

// Updated the below
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL || 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL);
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);

module.exports = { // Need to revisit food, clothes. where is dataModules?
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  food: new Collection(food),
  clothes: new Collection(clothes),
}
