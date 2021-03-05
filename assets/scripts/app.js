'use strict'
const ui = require('./ui')
const events = require('./events')

// hiding all frames
ui.showWelcomeFrame()

$(() => {
  $('#sign-in-button').on('click', ui.showSignInFrame)
  $('#sign-up-button').on('click', ui.showSignUpFrame)
  $('.go-to-welcome-frame').on('click', ui.showWelcomeFrame)
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
})
