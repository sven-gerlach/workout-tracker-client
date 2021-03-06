'use strict'

function hideAllFrames () {
  $('#welcome-frame').hide()
  $('#sign-up-frame').hide()
  $('#sign-in-frame').hide()
  $('#nav-bar-frame').hide()
  $('#workout-frame').hide()
  $('#security-frame').hide()
  $('#about-me-frame').hide()
  $('#exercise-selection-frame').hide()
  $('#set-frame').hide()
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

function showSecurityFrame () {
  hideAllFrames()
  $('#nav-bar-frame').show()
  $('#security-frame').show()
}

function showAboutMeFrame () {
  hideAllFrames()
  $('#nav-bar-frame').show()
  $('#about-me-frame').show()
}

function showExerciseSelectionFrame () {
  hideAllFrames()
  $('#exercise-selection-frame').show()
}

function showSetFrame () {
  hideAllFrames()
  $('#set-frame').show()
}

function clearForm (id) {
  $('#' + id).trigger('reset')
}

module.exports = {
  showWelcomeFrame,
  showSignUpFrame,
  showSignInFrame,
  showWorkoutFrame,
  showSecurityFrame,
  showAboutMeFrame,
  showExerciseSelectionFrame,
  showSetFrame,
  clearForm
}
