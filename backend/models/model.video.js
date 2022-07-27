(function () {
  'use strict';

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  /** Create Schema */
  const VideoSchema = new Schema({
    url: String,
    title: String,
    description: String,
    shared_by: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  });

  module.exports = mongoose.model('videos', VideoSchema, 'videos');

})();
