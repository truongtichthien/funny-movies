(function () {
  'use strict';

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  /** Create Schema */
  const UserSchema = new Schema({
    username: String,
    password: String
  });

  module.exports = mongoose.model('users', UserSchema, 'users');

})();
