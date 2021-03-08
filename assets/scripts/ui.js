'use strict'

const store = require('./store')
const moment = require('moment')
const api = require('./api')

function hideAllFrames () {
  $('#welcome-frame').hide()
  $('#sign-up-frame').hide()
  $('#sign-in-frame').hide()
  $('#nav-bar-frame').hide()
  $('#home-frame').hide()
  $('#security-frame').hide()
  $('#global-settings-frame').hide()
  $('#exercise-selection-frame').hide()
  $('#set-frame').hide()
  $('#personal-settings-frame').hide()
  $('#graph-frame').hide()
  $('#workout-history-frame').hide()
  // always hide the search text box (it is toggled by the
  // event listener on a check box in the exercise frame
  $('#search-exercise-text-box').hide()
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

function showHomeFrame (event) {
  hideAllFrames()
  // toggle active class
  if (event) {
    const currentNavBarListItem = $(event.target).parents('li.nav-item')
    toggleNavBarListItems(currentNavBarListItem)
  }
  $('#nav-bar-frame li:first').addClass('active')
  $('#nav-bar-frame').show()
  $('#home-frame').show()
}

function showWorkoutHistoryFrame (event) {
  hideAllFrames()
  // toggle active class
  const currentNavBarListItem = $(event.target).parents('li.nav-item')
  toggleNavBarListItems(currentNavBarListItem)
  $('#nav-bar-frame').show()
  $('#workout-history-frame').show()
}

function showStatsFrame (event) {
  hideAllFrames()
  // toggle active class
  const currentNavBarListItem = $(event.target).parents('li.nav-item')
  toggleNavBarListItems(currentNavBarListItem)
  $('#nav-bar-frame').show()
  $('#graph-frame').show()
}

function showSecurityFrame (event) {
  hideAllFrames()
  // toggle active class
  const currentNavBarListItem = $(event.target).parents('li.nav-item')
  toggleNavBarListItems(currentNavBarListItem)
  $('#nav-bar-frame').show()
  $('#security-frame').show()
}

function showGlobalSettingsFrame (event) {
  hideAllFrames()
  // toggle active class
  const currentNavBarListItem = $(event.target).parents('li.nav-item')
  toggleNavBarListItems(currentNavBarListItem)
  $('#nav-bar-frame').show()
  $('#global-settings-frame').show()
}

function showPersonalSettingsFrame (event) {
  hideAllFrames()
  // toggle active class
  const currentNavBarListItem = $(event.target).parents('li.nav-item')
  toggleNavBarListItems(currentNavBarListItem)
  $('#nav-bar-frame').show()
  $('#personal-settings-frame').show()
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
          <td><button type="button" class="button" data-workout-id="${id}"><span aria-hidden="true">&times;</span></button></td>
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
  showHomeFrame()
  // reset the set counter to 1
  $('#set-frame > p').text('Set 1')
  $('form').trigger('reset')

  // if current workout's exercise array is empty delete the workout from the db
  if (store.workout.exercise.length === 0) {
    api.deleteWorkout(store.workout._id)
      .then(console.log)
      .catch(console.error)
  }

  // delete workout from local storage
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

function showWarningModal (title, body) {
  $('#warning-message-title').text(title)
  $('#warning-message-body').text(body)
  $('#warning-message-modal').modal({
    backdrop: 'static',
    show: true
  })
}

function toggleNavBarListItems (highlightListItem) {
  // get all list items and remove the 'active' class
  $('#nav-bar-frame li').removeClass('active')
  highlightListItem.addClass('active')
}

function toggleExerciseSearchBar () {
  $('#search-exercise-text-box').toggle('fast')
}

module.exports = {
  showWelcomeFrame,
  showSignUpFrame,
  showSignInFrame,
  showStatsFrame,
  showHomeFrame,
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
  showUserModal,
  showWarningModal,
  toggleNavBarListItems,
  toggleExerciseSearchBar
}
