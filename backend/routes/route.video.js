(function () {
  'use strict';

  const _ = require('lodash');
  const express = require('express');
  const router = express.Router();

  const SORT_DESC = -1;
  const videoModel = require('../models/model.video');
  const userModel = require('../models/model.user');

  function createVideoQuery() {
    return [
      {
        $lookup: {
          from: 'users',
          localField: 'shared_by',
          foreignField: '_id',
          as: 'sharedBy'
        }
      },
      {
        $lookup: {
          from: 'votes',
          localField: '_id',
          foreignField: 'video_id',
          as: 'votedBy'
        }
      }
    ];
  }

  router.get('/', function (req, res) {
    videoModel
      .aggregate(createVideoQuery())
      .sort({'timestamp': SORT_DESC})
      .then(function (videos) {
        res.json(videos.map(function (v) {
          const videoEntity = _.pick(v, ['_id', 'id', 'title', 'description', 'votedBy']);
          const {sharedBy, votedBy} = v;
          if (sharedBy.length) {
            return {
              ...videoEntity,
              sharedBy: _.pick(sharedBy[0], ['_id', 'username']),
              votedBy: _.map(votedBy, function (v) {
                return {user: v.user_id, vote: v.vote}
              })
            };
          }
          return videoEntity;
        }));
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  router.post('/', function (req, res) {
    const id = req.body?.id;
    const title = req.body?.title;
    const description = req.body?.description;
    const createdBy = req.body?.createdBy;

    videoModel
      .find({id})
      .then(function (videos) {
        if (videos.length === 0) {
          userModel
            .find({username: createdBy})
            .then(function (users) {
              if (users.length > 0) {
                const userId = _.pick(users[0], '_id');
                console.log('_id', userId);
                videoModel.create({id, title, description, shared_by: userId, timestamp: Date.now()})
                  .then(function (video) {
                    const videoEntity = _.pick(video, ['title', 'description', 'id', '_id']);
                    const userEntity = _.pick(users[0], 'username', '_id');
                    console.log('videoEntity', videoEntity);
                    res.json({
                      msg: 'Video has been shared!',
                      video: {...videoEntity, user: userEntity}
                    });
                  })
                  .catch(function (err) {
                    res.status(401).json({msg: 'Cannot share the video', error: err});
                  })
              } else {
                res.status(401).json({msg: 'User not found!'});
              }
            })
            .catch(function () {
              res.status(401).json({msg: 'User not found!'});
            });
        } else {
          res.status(401).json({msg: 'Video has been already shared!'});
        }
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  module.exports = router;

})();
