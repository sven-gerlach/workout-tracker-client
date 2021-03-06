'use strict'
const ui = require('./ui')
const events = require('./events')

// hiding all frames
ui.showWelcomeFrame()

$(() => {
  $('.go-to-welcome-frame').on('click', ui.showWelcomeFrame)
  $('#sign-in-button').on('click', ui.showSignInFrame)
  $('#sign-up-button').on('click', ui.showSignUpFrame)
  $('#workout-button').on('click', ui.showWorkoutFrame)
  $('#security-button').on('click', ui.showSecurityFrame)
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
  $('#about-me-button').on('click', ui.showAboutMeFrame)
  $('#sign-out-button').on('click', events.onSignOut)
  $('#change-pw-form').on('submit', events.onChangePassword)
  $('#setup-workout-button').on('click', events.onSetUpWorkout)
})
