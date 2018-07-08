"use strict"

var mongoose = require('mongoose');

var recentTracksSchema = mongoose.Schema(
  {
    userName:String,
    trackName:String,
    artistName:String,
    urlName:String,
    liked:{
        type: Boolean,
        default: false,
    }
  },
  
  {
    strict: true,
    minimize: false,
  }
);

var RecentTracks = mongoose.model('RecentTracks',recentTracksSchema);
module.exports = RecentTracks;

