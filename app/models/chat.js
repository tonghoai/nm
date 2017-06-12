// app/models/chat.js

var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  user_id    : String,
  username   : String,
  nickname   : String,
  email      : String,
  msg        : String,
  sticker    : String,
  pic        : String,
  time       : String
});

module.exports = mongoose.model('chat', Schema);
