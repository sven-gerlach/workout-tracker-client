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
  $('#personal-settings-button').on('click', events.setupPersonalSettingsFrame)
  $('#global-settings-button').on('click', ui.showGlobalSettingsFrame)
  $('#sign-out-button').on('click', events.onSignOut)
  $('#change-pw-form').on('submit', events.onChangePassword)
  $('#setup-workout-button').on('click', events.onSetUpWorkout)
  $('#exercise-selection-frame').on('submit', events.onExerciseSelection)
  $('#set-form').on('submit', events.onSetEntry)
  $('#personal-settings-form').on('submit', events.onUpdatePersonalSettings)
})
