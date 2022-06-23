'use strict'; // COMPLETED**

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js'); //Added
const notFound = require('./error-handlers/404.js'); //Added

// **REQUIRE ROUTES
const authRoutes = require('./auth/routes/routes.js');

const logger = require('./middleware/logger.js'); // copied

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev')); 

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use('/api/v1', authRoutes); //added
app.use('/api/v2', authRoutes); //new


// Catchalls
app.use('*', notFound); // copied
// app.use(notFound); // Is this needed?
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
