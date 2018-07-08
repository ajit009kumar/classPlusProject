'use strict'
import axios from 'axios';
import validator from 'validator';
import Auth from '../modules/Auth';


export function updateField(fieldName,value){
  return function (dispatch) {
    dispatch({
      type: 'UPDATE_FIELD',
      fieldName,
      value,
    })
  }
}

export function loginUser(username){
  return function (dispatch) {
    axios
      .post('/auth/login-fm',{username:username})
      .then(function (response) {
        dispatch({
          type: 'LOGIN',
          data:response.data
        })
      })
    }
  }

  export function resetFieldValue() {
    return function (dispatch) {
      dispatch({
        type: 'RESET',
      })
    }
  }

  export function fetchBasicInfo(username) {
    return function(dispatch){
      axios.get(`/auth/userInfo?userName=${username}`).then(function(response){
        dispatch({
          type:'FETCH_BASIC_INFO',
          data:response.data
        })
      })
    }
  }

  export function fetchRecentlyPlayedTracks(username) {
    return function(dispatch) {
      axios.get(`/auth/recentTracks?userName=${username}`).then(function(response){
        dispatch({
          type:'FETCH_RECENT_TRACKS',
          data:response.data
        })
      })
    }
  }

  export function fetchLoveTracks(username) {
    return function(dispatch) {
      axios.get(`/auth/loveTracks?userName=${username}`).then(function(response){
        dispatch({
          type:'FETCH_LOVED_TRACKS',
          data:response.data
        })
      })
    }
  }

  export function fetchTopTracks(username) {
    return function(dispatch) {
      axios.get(`/auth/topTracks?userName=${username}`).then(function(response){
        dispatch({
          type:'FETCH_TOP_TRACKS',
          data:response.data
        })
      })
    }
  }

  export function fetchTopTopArtists(username) {
    return function(dispatch) {
      axios.get(`/auth/topArtists?userName=${username}`).then(function(response){
        dispatch({
          type:'FETCH_TOP_Artists',
          data:response.data
        })
      })
    }
  }

  
  export function changeStatus(trackName,userName) {
    console.log(trackName,userName);
    return function (dispatch) {
      axios.put('auth/changeLikedStatus/',{trackName,userName}).then(function(response){
        console.log('============================>',response.data);
        dispatch({
          type:'FETCH_RECENT_TRACKS',
          data:response.data
        })
      })
    }
  }