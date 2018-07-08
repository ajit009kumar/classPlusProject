"use strict"

var mongoose = require('mongoose');

var fmUserSchema = mongoose.Schema(
  {
  userName:String
  },
  
  {
    strict: true,
    minimize: false,
  }
);

var FmUser = mongoose.model('FmUser',fmUserSchema);
module.exports = FmUser;