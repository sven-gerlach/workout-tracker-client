'use strict'

const store = require('./store')
const moment = require('moment')
const api = require('./api')
const dbSearch = require('./db_search')
const events = require('./events')
const { Spinner } = require('spin.js')

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

function updateExerciseSelectionBox () {
  // make api call
  events.getAllWorkouts()
    .then(() => {
      // get all previously used exercise titles and store them
      store.exerciseNames = dbSearch.getUsedExerciseNames()

      // populate exercise selector with all previously used exercises
      populateExerciseTitleSelector(new Set(store.exerciseNames.sort()))
    })
    .catch(console.error)
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
  let optionsString = (exercises.size === 0) ? '<option value="" disabled selected>select exercise...</option>option>' : ''
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
        <tr data-workout-id="${id}">
          <th scope="row">${counter++}</th>
          <td>${date}</td>
          <td>${duration}</td>
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
  $('#set-frame h4').text('Set 1')
  $('form').trigger('reset')

  // if current workout's exercise array is empty, delete the workout from the db
  if (store.workout.exercise.length === 0) {
    api.deleteWorkout(store.workout._id)
      .then()
      .catch()
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

function showExitWorkoutModal (title, body) {
  $('#exit-workout-title').text(title)
  $('#exit-workout-body').text(body)
  $('#exit-workout-modal').modal({
    backdrop: 'static',
    show: true
  })
}

function showContinueSetModal (title, body) {
  $('#continue-set-title').text(title)
  $('#continue-set-body').text(body)
  $('#continue-set-modal').modal({
    backdrop: 'static',
    show: true
  })
}

function showDeleteUserModal (title, body) {
  $('#delete-user-message-title').text(title)
  $('#delete-user-message-body').text(body)
  $('#delete-user-warning-modal').modal({
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

function invokeSpinner () {
  const spinnerOptions = {
    lines: 12, // The number of lines to draw
    length: 20, // The length of each line
    width: 10, // The line thickness
    radius: 20, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#f0f8ff', // CSS color or array of colors
    fadeColor: '#000000', // CSS color or array of colors
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: 'spinner', // The CSS class to assign to the spinner
    position: 'absolute' // Element positioning
  }
  return new Spinner(spinnerOptions)
}

Object.assign(module.exports, {
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
  updateExerciseSelectionBox,
  updatePersonalSettingsFormPlaceholders,
  updateExerciseList,
  populateExerciseTitleSelector,
  postWorkoutCleanUp,
  populateWorkoutTable,
  showUserModal,
  showWarningModal,
  showExitWorkoutModal,
  showContinueSetModal,
  showDeleteUserModal,
  toggleNavBarListItems,
  toggleExerciseSearchBar,
  invokeSpinner
})
