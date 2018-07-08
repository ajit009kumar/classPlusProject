// import { Error } from 'mongoose';

// import axios from 'axios';
const express = require('express')
const validator = require('validator')
const passport = require('passport')
const axios = require('axios')
const config = require('./../../config')
const FmUser = require('./../models/fmUsers')
const UserDetails = require('./../models/userDetails')
const RecentTracks = require('./../models/recentTracks')
const TopArtists = require('./../models/topArtists')
const TopTracks = require('./../models/topTracks')
const LoveTracks = require('./../models/lovedTracks')

const router = new express.Router()

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (
    !payload ||
    typeof payload.email !== 'string' ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false
    errors.email = 'Please provide a correct email address.'
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false
    errors.password = 'Password must have at least 8 characters.'
  }

  if (
    !payload ||
    typeof payload.name !== 'string' ||
    payload.name.trim().length === 0
  ) {
    isFormValid = false
    errors.name = 'Please provide your name.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (
    !payload ||
    typeof payload.email !== 'string' ||
    payload.email.trim().length === 0
  ) {
    isFormValid = false
    errors.email = 'Please provide your email address.'
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false
    errors.password = 'Please provide your password.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-signup', err => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    })
  })(req, res, next)
})

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    })
  })(req, res, next)
})

router.post('/login-fm', async (req, res, next) => {
  const {username} = req.body
  let userName
  let tokenValue
  axios
    .get(
      `${config.fmUrl}?method=user.getinfo&user=${username}&api_key=${config.fmAuthKey}&format=json`
    )
    .then(function (response) {
      userName = response.data.user.name
      if (userName) {
        axios
          .get(
            `${config.fmUrl}?method=auth.gettoken&api_key=${config.fmAuthKey}&format=json`
          )
          .then(async function (response) {
            tokenValue = response.data.token
            const userData = {name: userName}

            const profileFields = {
              userName: username
            }

            const user = await FmUser.find({userName: username})
              .then(async doc => {
                if (doc.length == 0) {
                  await FmUser.create(profileFields)
                    .then(doc => {})
                    .catch(err => {
                      throw new Error('Error While Creating Fm User')
                    })
                }
              })
              .catch(err => {
                throw new Error('Error While Searching DB')
              })

            return res.json({
              success: true,
              message: 'You have successfully logged in!',
              token: tokenValue,
              user: userData
            })
          })
      }
    })
    .catch(err => {
      tokenValue = ''
      return res.json({
        success: true,
        message: 'Your Account Not Available on Fm! Please SignUpFirst!!',
        user: [],
        token: tokenValue
      })
    })
})

router.get('/userInfo', async (req, res, next) => {
  axios
    .get(
      `${config.fmUrl}?method=user.getinfo&user=${req.query.userName}&api_key=${config.fmAuthKey}&format=json`
    )
    .then(async function (response) {
      const {
        playlists,
        playcount,
        gender,
        name,
        subscriber,
        country,
        image,
        age,
        realname
      } = response.data.user

      const userInfo = {
        playlist: playlists,
        playCount: playcount,
        gender: gender,
        name: name,
        realName: realname,
        age: age,
        country: country
      }

      const user = await UserDetails.find({name: req.query.userName})
        .then(async doc => {
          if (doc.length == 0) {
            await UserDetails.create(userInfo).then(doc => {}).catch(err => {
              throw new Error('Error While Creating Fm User')
            })
          }
        })
        .catch(err => {
          throw new Error('Error While Searching DB')
        })

      return res.json({
        success: true,
        playlists,
        playcount,
        gender,
        name,
        subscriber,
        country,
        image,
        age,
        realname
      })
    })
})

router.get('/recentTracks', async (req, res, next) => {
  axios
    .get(
      `${config.fmUrl}?method=user.getrecenttracks&user=${req.query.userName}&api_key=${config.fmAuthKey}&format=json`
    )
    .then(async function (response) {
      await Promise.all(
        response.data.recenttracks.track.map(async track => {
          const trackInfo = {
            trackName: track.name,
            artistName: track.artist['#text'],
            urlName: track.url,
            userName: req.query.userName,
            liked: false
          }

          await RecentTracks.find({
            $and: [{trackName: track.name}, {userName: req.query.userName}]
          })
            .then(async doc => {
              if (doc.length == 0) {
                await RecentTracks.create(trackInfo)
                  .then(doc => {})
                  .catch(err => {
                    throw new Error('Error While Creating Fm User')
                  })
              }
            })
            .catch(err => {
              throw new Error('Error While Searching DB')
            })
        })
      )

      return res.json({
        success: true,
        recentTracks: response.data.recenttracks.track
      })
    })
})

router.get('/loveTracks', async (req, res, next) => {
  axios
    .get(
      `${config.fmUrl}?method=user.getlovedtracks&user=${req.query.userName}&api_key=${config.fmAuthKey}&format=json`
    )
    .then(async function (response) {
      await Promise.all(
        response.data.lovedtracks.track.map(async track => {
          const trackInfo = {
            userName: req.query.userName,
            artistName: track.artist.name,
            urlName: track.url,
            tracksName: track.name
          }

          await LoveTracks.find({
            $and: [{tracksName: track.name}, {userName: req.query.userName}]
          })
            .then(async doc => {
              if (doc.length == 0) {
                await LoveTracks.create(trackInfo)
                  .then(doc => {})
                  .catch(err => {
                    throw new Error('Error While Creating Fm User')
                  })
              }
            })
            .catch(err => {
              throw new Error('Error While Searching DB')
            })
        })
      )

      return res.json({
        success: true,
        loveTracks: response.data.lovedtracks.track
      })
    })
})

router.get('/topTracks', async (req, res, next) => {
  axios
    .get(
      `${config.fmUrl}?method=user.gettoptracks&user=${req.query.userName}&api_key=${config.fmAuthKey}&format=json`
    )
    .then(async function (response) {
      await Promise.all(
        response.data.toptracks.track.map(async track => {
          const trackInfo = {
            userName: req.query.userName,
            artistName: track.artist.name,
            playCount: track.playcount,
            urlName: track.url,
            topTracksName: track.name
          }

          await TopTracks.find({
            $and: [{topTracksName: track.name}, {userName: req.query.userName}]
          })
            .then(async doc => {
              if (doc.length == 0) {
                await TopTracks.create(trackInfo).then(doc => {}).catch(err => {
                  throw new Error('Error While Creating Fm User')
                })
              }
            })
            .catch(err => {
              throw new Error('Error While Searching DB')
            })
        })
      )

      return res.json({
        success: true,
        topTracks: response.data.toptracks.track
      })
    })
})

router.get('/topArtists', async (req, res, next) => {
  axios
    .get(
      `${config.fmUrl}?method=user.gettopartists&user=${req.query.userName}&api_key=${config.fmAuthKey}&format=json`
    )
    .then(async function (response) {
      await Promise.all(
        response.data.topartists.artist.map(async track => {
          const artistInfo = {
            userName: req.query.userName,
            artistName: track.name,
            playCount: track.playcount,
            urlName: track.url
          }

          await TopArtists.find({
            $and: [{artistName: track.name}, {userName: req.query.userName}]
          })
            .then(async doc => {
              if (doc.length == 0) {
                await TopArtists.create(artistInfo)
                  .then(doc => {})
                  .catch(err => {
                    throw new Error('Error While Creating Fm User')
                  })
              }
            })
            .catch(err => {
              throw new Error('Error While Searching DB')
            })
        })
      )

      return res.json({
        success: true,
        topArtists: response.data.topartists.artist
      })
    })
})

router.put('/changeLikedStatus',(req,res,next) => {
  console.log('===================>',req.query);
})

module.exports = router
