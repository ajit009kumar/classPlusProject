"use strict"

var mongoose = require('mongoose');

var topTracksSchema = mongoose.Schema(
  {
    userName:String,
    topTracksName:String,
    artistName:String,
    playCount:String,
    urlName:String
  }
);

var TopTracks = mongoose.model('TopTracks',topTracksSchema);
module.exports = TopTracks;

