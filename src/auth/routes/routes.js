'use strict';

const express = require('express');
const router = express.Router(); //- changed authRouter to router

const { dataModules, users } = require('../models'); //updated

// AUTH
const basicAuth = require('../middleware/basic.js')
const bearerAuth = require('../middleware/bearer.js')
const permissions = require('../middleware/acl.js');


// ROUTERS Auth - changed authRouter to router
router.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

router.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

router.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});

router.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});

// RBAC ROUTES
router.get('/read', bearerAuth, permissions('read'), (req, res, next) => {
  res.status(200).send('Success! I have read permissions!');
});

router.get('/create', bearerAuth, permissions('create'), (req, res, next) => {
  res.status(200).send('Success! I have create permissions!');
});

router.get('/update', bearerAuth, permissions('update'), (req, res, next) => {
  res.status(200).send('Success! I have update permissions!');
});

router.get('/delete', bearerAuth, permissions('delete'), (req, res, next) => {
  res.status(200).send('Success! I have delete permissions!');
});


// ROUTERS Models

router.param('model', (req, res, next) => { // ** // Need to revisit food, clothes. where is dataModules in index.js?
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = router;
