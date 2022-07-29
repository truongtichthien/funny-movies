(function () {
  'use strict';

  const _ = require('lodash');
  const express = require('express');
  const mongoose = require('mongoose');
  const router = express.Router();

  const voteModel = require('../models/model.vote');
  const videoModel = require('../models/model.video');
  const userModel = require('../models/model.user');

  function objectId(string) {
    return mongoose.Types.ObjectId(string);
  }

  function createVoteResponse(videoId, userId, vote, res) {
    const videoPromise = new Promise(function (resolve, reject) {
      videoModel
        .find({_id: objectId(videoId)})
        .then(function (video) {
          resolve(video);
        })
        .catch(function (err) {
          reject(err);
        });
    })
    const userPromise = new Promise(function (resolve, reject) {
      userModel
        .find({_id: objectId(userId)})
        .then(function (user) {
          resolve(user);
        })
        .catch(function (err) {
          reject(err);
        });
    })

    Promise
      .all([videoPromise, userPromise])
      .then(function (responses) {
        const [video, user] = responses;
        if (video.length && user.length) {
          res.json({
            msg: 'Video has been voted!',
            video: _.pick(video[0], ['_id', 'id']),
            user: _.pick(user[0], ['_id', 'username']),
            vote
          });
        } else {
          res.status(401).json({msg: 'Cannot vote the video'});
        }
      });
  }

  router.post('/', function (req, res) {
    const videoId = req.body?.videoId;
    const userId = req.body?.userId;
    const value = req.body?.value;

    voteModel
      .findOne({
        video_id: objectId(videoId),
        user_id: objectId(userId),
      })
      .then(function (vote) {
        if (vote) {
          vote.vote = value;
          vote.save()
            .then(function () {
              createVoteResponse(videoId, userId, value, res)
            })
            .catch(function () {
            })
        } else {
          voteModel
            .create({
              video_id: objectId(videoId),
              user_id: objectId(userId),
              vote: value
            })
            .then(function () {
              createVoteResponse(videoId, userId, value, res)
            })
            .catch(function (err) {
              res.json(err);
            });
        }
      });
  });

  module.exports = router;

})();
