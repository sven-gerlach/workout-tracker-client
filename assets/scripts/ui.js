'use strict'

function hideAllFrames () {
  $('#welcome-frame').hide()
  $('#sign-up-frame').hide()
  $('#sign-in-frame').hide()
  $('#nav-bar-frame').hide()
  $('#workout-frame').hide()
}

function showWelcomeFrame () {
  hideAllFrames()
  $('#welcome-frame').show()
}

function showSignUpFrame () {
  hideAllFrames()
  $('#sign-up-frame').show()
}

function showSignInFrame () {
  hideAllFrames()
  $('#sign-in-frame').show()
}

function showWorkoutFrame () {
  hideAllFrames()
  $('#nav-bar-frame').show()
  $('#workout-frame').show()
}

module.exports = {
  showWelcomeFrame,
  showSignUpFrame,
  showSignInFrame,
  showWorkoutFrame
}
