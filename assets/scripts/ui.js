'use strict'

const store = require('./store')

function hideAllFrames () {
  $('#welcome-frame').hide()
  $('#sign-up-frame').hide()
  $('#sign-in-frame').hide()
  $('#nav-bar-frame').hide()
  $('#workout-frame').hide()
  $('#security-frame').hide()
  $('#global-settings-frame').hide()
  $('#exercise-selection-frame').hide()
  $('#set-frame').hide()
  $('#personal-settings-frame').hide()
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

function showGlobalSettingsFrame () {
  hideAllFrames()
  $('#nav-bar-frame').show()
  $('#global-settings-frame').show()
}

function showExerciseSelectionFrame () {
  hideAllFrames()
  $('#exercise-selection-frame').show()
}

function showSetFrame () {
  hideAllFrames()
  $('#set-frame').show()
}

function showPersonalSettingsFrame () {
  hideAllFrames()
  $('#nav-bar-frame').show()
  $('#personal-settings-frame').show()
}

function clearForm (id) {
  $('#' + id).trigger('reset')
}

function updatePersonalSettingsFormPlaceholders () {
  $('#name').attr('placeholder', store.user.name || '')
  $('#surname').attr('placeholder', store.user.surname || '')
  $('#age').attr('placeholder', store.user.age || '')
  $('#experience').val(store.user.experience || '')
}

// 4) for every key stroke, check if that string is in the exercise list and add all matching exercises to a scroll list
// 5) If user clicks on an item in scroll list it populates the next exercise box
function updateExerciseList () {
  const filterText = $(this).val()
  const filteredExercises = new Set(store.exerciseNames.filter(exercise => {
    return exercise.match(new RegExp(filterText, 'i'))
  }))
  let optionsString = ''
  filteredExercises.forEach(exercise => {
    optionsString += `<option value="${exercise}">${exercise}</option>`
  })
  $('#used-exercise-titles').html(optionsString)
}

function postWorkoutCleanUp () {
  showWorkoutFrame()
  $('#set-frame > p').text('Set 1')
  delete store.workout
}

module.exports = {
  showWelcomeFrame,
  showSignUpFrame,
  showSignInFrame,
  showWorkoutFrame,
  showSecurityFrame,
  showGlobalSettingsFrame,
  showExerciseSelectionFrame,
  showSetFrame,
  showPersonalSettingsFrame,
  clearForm,
  updatePersonalSettingsFormPlaceholders,
  updateExerciseList,
  postWorkoutCleanUp
}
