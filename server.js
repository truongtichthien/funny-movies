(function () {
  'use strict';
  const rootDir = __dirname + '/src';

  const config = require('./backend/config');
  const express = require('express');
  const mongoose = require('mongoose');
  const morgan = require('morgan');
  const bodyParser = require('body-parser');
  const cookieParser = require('cookie-parser');

  const userCtrl = require('./backend/routes/route.user');
  const videoCtrl = require('./backend/routes/route.video');

  const app = express();
  // define root directory for resources
  app.use(express.static(rootDir, {index: false}));
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());

  app.use('/api/users', userCtrl);
  app.use('/api/videos', videoCtrl);

  /** Connect Database */
  const {connect} = mongoose;
  connect(config.database.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(function () {
      console.log('MongoDB Connected...');
    })
    .catch(function (err) {
      console.error('MongoDB Connection Failed: ', err);
    });

  /** Establish HTTP Connection */
  const port = process.env.PORT || config.webPort;
  app.listen(port, function () {
    console.log('API running on port ', port);
  });

})();
