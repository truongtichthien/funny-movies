(function () {
  'use strict';

  const EXPIRED_TIME = 60; // minutes

  const _ = require('lodash');
  const jwt = require('jsonwebtoken');
  const md5 = require('crypto-js/md5');
  const express = require('express');
  const router = express.Router();
  const userModel = require('../models/model.user');

  function createAccessToken(user) {
    const payload = {info: 'Funny Movies Application', user: user};
    return jwt.sign(payload, 'SECRET_KEY', {expiresIn: EXPIRED_TIME * 60}, null);
  }

  function login(req, res) {
    /** parse request */
    const username = req.username;
    const password = req.password;

    userModel
      .find({username: username})
      .then(function (users) {
        if (users.length > 0) {
          // login
          const {password: pwd} = _.pick(users[0], 'password');
          if (pwd === password) {
            const userEntity = _.pick(users[0], 'username');
            const accessToken = createAccessToken(users[0]);

            res.json({
              authenticated: true,
              accessToken: accessToken,
              user: userEntity
            });
          } else {
            res.status(401).json({authenticated: false})
          }
        } else {
          // register
          userModel.create({username, password})
            .then(function (user) {
              const userEntity = _.pick(user, 'username');
              const accessToken = createAccessToken(user);

              res.json({
                msg: 'User has been registered',
                authenticated: true,
                accessToken: accessToken,
                user: userEntity
              });
            })
            .catch(function (err) {
              res.status(401).json({msg: 'User registration failed', error: err});
            })
        }
      })
      .catch(function (err) {
        res.json(err);
      });
  }

  /** login */
  router.post('/login', function (req, res) {
    req.body.password = md5(req.body.password).toString();
    login(req.body, res);
  });

  module.exports = router;

})();