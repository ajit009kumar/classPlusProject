"use strict"

var mongoose = require('mongoose');

var userDetailsSchema = mongoose.Schema(
  {
    name:String,
    realName:String,
    age:String,
    country:String,
    playCount:Number,
    playlist:String,
    subscriber:String,
    gender:String
  },
  
  {
    strict: true,
    minimize: false,
  }
);

var UserDetails = mongoose.model('UserDetails',userDetailsSchema);
module.exports = UserDetails;