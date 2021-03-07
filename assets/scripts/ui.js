'use strict'

const store = require('./store')
const moment = require('moment')

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
  $('#graph-frame').hide()
  $('#workout-history-frame').hide()
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

function showWorkoutHistoryFrame () {
  hideAllFrames()
  $('#nav-bar-frame').show()
  $('#workout-history-frame').show()
}

function showStatsFrame () {
  hideAllFrames()
  $('#nav-bar-frame').show()
  $('#graph-frame').show()
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
  }).sort())
  populateExerciseTitleSelector(filteredExercises)
}

function populateExerciseTitleSelector (exercises) {
  let optionsString = ''
  exercises.forEach(exercise => {
    optionsString += `<option value="${exercise}">${exercise}</option>`
  })
  $('.used-exercise-titles').html(optionsString)
}

function populateWorkoutTable () {
  const limit = $('#number-of-workouts').val()

  let tableHtml = `
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Date</th>
        <th scope="col">Duration(min)</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>
  `
  let counter = 1

  _.forEachRight(store.workouts, workout => {
    if (counter <= limit || limit === 'all') {
      const date = _getDate(workout.createdAt)
      const duration = _getDuration(workout.createdAt, workout.updatedAt)
      const id = workout._id
      const tableRowHtml = `
        <tr>
          <th scope="row">${counter++}</th>
          <td>${date}</td>
          <td>${duration}</td>
          <td><button data-workout-id="${id}">x</button></td>
        </tr>
      `
      tableHtml += tableRowHtml
    }
  })

  tableHtml += `
    </tbody>
  `

  // Append workout history to html table
  $('#workout-history-table').html(tableHtml)

  // returns date
  function _getDate (dateString) {
    return moment(dateString).format('MM/DD')
  }

  // returns duration in minutes
  function _getDuration (start, end) {
    start = new Date(start)
    end = new Date(end)
    return moment(end - start).format('mm')
  }
}

function postWorkoutCleanUp () {
  showWorkoutFrame()
  $('#set-frame > p').text('Set 1')
  $('form').trigger('reset')
  delete store.workout
}

function showUserModal (title, body) {
  $('#user-message-title').text(title)
  $('#user-message-body').text(body)
  $('#user-message-modal').modal({
    backdrop: 'static',
    show: true
  })
}

module.exports = {
  showWelcomeFrame,
  showSignUpFrame,
  showSignInFrame,
  showWorkoutFrame,
  showStatsFrame,
  showWorkoutHistoryFrame,
  showSecurityFrame,
  showGlobalSettingsFrame,
  showExerciseSelectionFrame,
  showSetFrame,
  showPersonalSettingsFrame,
  clearForm,
  updatePersonalSettingsFormPlaceholders,
  updateExerciseList,
  populateExerciseTitleSelector,
  postWorkoutCleanUp,
  populateWorkoutTable,
  showUserModal
}
