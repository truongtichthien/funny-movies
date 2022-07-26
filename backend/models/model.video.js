(function () {
  'use strict';

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  /** Create Schema */
  const VideoSchema = new Schema({
    id: String,
    title: String,
    description: String,
    shared_by: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    timestamp: Number
  });

  module.exports = mongoose.model('videos', VideoSchema, 'videos');

})();
