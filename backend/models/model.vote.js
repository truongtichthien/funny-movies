(function () {
  'use strict';

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  /** Create Schema */
  const VoteSchema = new Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    video_id: {
      type: Schema.Types.ObjectId,
      ref: 'videos'
    },
    vote: {
      type: Number,
      default: 0
    }
  });

  module.exports = mongoose.model('votes', VoteSchema, 'votes');

})();
