"use strict"

var mongoose = require('mongoose');

var topArtistSchema = mongoose.Schema(
  {
    userName:String,
    artistName:String,
    playCount:String,
    urlName:String
  }
);

var TopArtists = mongoose.model('TopArtists',topArtistSchema);
module.exports = TopArtists;

