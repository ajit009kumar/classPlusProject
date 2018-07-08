'use strict'
import uniq from 'lodash/uniq'
import _ from 'lodash'

const defaultState = {
  filters: [],
  userInfo:{},
  age:undefined,
  country:undefined,
  gender:undefined,
  name:undefined,
  playcount:undefined,
  playlists:undefined,
  realname:undefined,
  subscriber:undefined,
  recentTracks:[],
  loveTracks:[],
  topTracks:[],
  topArtists:[]
}

export function userReducers (state = {players: []}, action) {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const { fieldName, value } = action;
      return {
        ...state,
        [fieldName]: value,
        [`${fieldName}ErrorMessage`]: undefined,
      };
    }

    case 'LOGIN':{
      return{
        ...state,
        userInfo:action.data
      }
    }

    case 'RESET':{
      return{
        ...defaultState
      }
    }

    case 'FETCH_BASIC_INFO':{
      const { data: {age,country,gender,name,playcount,playlists,realname,subscriber} } = action;
      return{
        ...state,
        age,
        country,
        gender,
        name,
        playcount,
        playlists,
        realname,
        subscriber,
        recentTracks:[],
        loveTracks:[],
        topTracks:[],
        topArtists:[]
      }
    }

    case 'FETCH_RECENT_TRACKS':{
      const { data: {recentTracks} } = action;
      return{
        ...state,
        recentTracks,
        age:undefined,
        country:undefined,
        gender:undefined,
        name:undefined,
        playcount:undefined,
        playlists:undefined,
        realname:undefined,
        subscribe:undefined,
        loveTracks:[],
        topTracks:[],
        topArtists:[]
      }
    }

    case 'FETCH_LOVED_TRACKS': {
      const { data: {loveTracks} } = action;
      return{
        ...state,
        loveTracks,
        recentTracks:[],
        topTracks:[],
        topArtists:[],
        age:undefined,
        country:undefined,
        gender:undefined,
        name:undefined,
        playcount:undefined,
        playlists:undefined,
        realname:undefined,
        subscribe:undefined,
      }
    }

    case 'FETCH_TOP_TRACKS':{
      const { data: {topTracks} } = action;
      return {
        ...state,
        topTracks,
        loveTracks:[],
        recentTracks:[],
        topArtists:[],
        age:undefined,
        country:undefined,
        gender:undefined,
        name:undefined,
        playcount:undefined,
        playlists:undefined,
        realname:undefined,
        subscribe:undefined,
      }
    }

    case 'FETCH_TOP_Artists':{
      const { data : {topArtists} } = action;
      return{
        ...state,
        topArtists,
        topTracks:[],
        loveTracks:[],
        recentTracks:[],
        age:undefined,
        country:undefined,
        gender:undefined,
        name:undefined,
        playcount:undefined,
        playlists:undefined,
        realname:undefined,
        subscribe:undefined,
      }
    }


    default:
      return {
        ...state
      }
  }
  return state
}
