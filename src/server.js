'use strict';

// 3rd Party Resources
const express = require('express');
let PORT = process.env.PORT || 3001;

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');

// **REQUIRE ROUTESç
const authRouter = require('./routes/auth.js');
const v1Routes = require('./routes/v1.js')
const v2Routes = require('./routes/v2.js')

const logger = require('./middleware/logger.js');

// Prepare the express app
const app = express();

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRouter);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);


// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: () => {
    if (!PORT) { throw new error ('Missing PORT'); }
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });
  },
};
