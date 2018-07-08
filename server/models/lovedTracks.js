"use strict"

var mongoose = require('mongoose');

var loveTracksSchema = mongoose.Schema(
  {
    userName:String,
    tracksName:String,
    artistName:String,
    urlName:String
  }
);

var LoveTracks = mongoose.model('LoveTracks',loveTracksSchema);
module.exports = LoveTracks;

