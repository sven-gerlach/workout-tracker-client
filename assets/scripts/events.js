'use strict'
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const store = require('./store')
const ui = require('./ui')
const dbSearch = require('./db_search')
const graphData = require('./graph_data')

// todo: add auto-sign in feature
function onSignUp (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signUp(formData)
    .then(response => {
      console.log(response)
      // send id of form element to a function that clears that form
      ui.clearForm(event.delegateTarget.id)

      // insert pswd and email into sign-in form and then click sign-in button
      $('#sign-in-form input:first-child').val(formData.credentials.email)
      $('#sign-in-form input:nth-child(2)').val(formData.credentials.password)
      $('#sign-in-form button').click()
    })
    .then(() => {
      // launch welcome modal
      const title = 'Welcome to ProLoad!'
      const body = 'We hope you will be enjoying this app and that it helps you achieve that ephemeral "Progressive Overload" in your training.'
      ui.showUserModal(title, body)
    })
    .catch(response => {
      console.log(response)

      // Launch modal to alert user to the error
      if (response.responseJSON.name === 'BadParamsError') {
        const title = 'Incorrect Password'
        const body = 'It seems the two passwords do not match. Please try again.'
        ui.showUserModal(title, body)
      } else {
        const title = 'E-Mail Already Exists'
        const body = 'A user with that email seems to exist already. Please use a different e-mail address.'
        ui.showUserModal(title, body)
      }

      // send id of form element to a function that clears that form
      ui.clearForm(event.delegateTarget.id)
    })
}

function onSignIn (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signIn(formData)
    .then(data => {
      ui.showHomeFrame(event)

      // store user data and all historic workout data locally
      store.user = data.user

      // get all previous workouts and store them locally
      _getAllWorkouts()

      // update the personal settings form placeholders with the downloaded user data
      ui.updatePersonalSettingsFormPlaceholders()

      // send id of form element to a function that clears that form
      ui.clearForm(event.delegateTarget.id)

      // launch modal with welcome message
      const title = 'Welcome Back!'
      const body = 'What will you do today?'
      ui.showUserModal(title, body)
    })
    .catch(response => {
      console.error(response)

      // launch modal with error message
      const title = 'Incorrect Account Information'
      const body = 'It seems the account information provided, does not match our records. Please try again.'
      ui.showUserModal(title, body)
    })
}

function onSignOut () {
  api.signOut()
    .then(response => {
      console.log(response)
      for (const key in store) {
        delete store[key]
      }
      ui.showWelcomeFrame()
    })
    .catch(console.error)
}

function onChangePassword (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(response => {
      console.log(response)
      // send id of form element to a function that clears that form
      ui.clearForm(event.delegateTarget.id)
    })
    .catch(response => {
      console.error(response)
      // send id of form element to a function that clears that form
      ui.clearForm(event.delegateTarget.id)
    })
}

function onSetUpWorkout () {
  const weightUnit = $('#weight-unit')[0].value
  api.setUpWorkout(weightUnit)
    .then(response => {
      store.workout = response.workout
      ui.showExerciseSelectionFrame()

      // get all previously used exercise titles and store them
      store.exerciseNames = dbSearch.getUsedExerciseNames()

      // populate exercise selector with all previously used exercises
      ui.populateExerciseTitleSelector(new Set(store.exerciseNames.sort()))
    })
    .catch(console.error)
}

function onAddExerciseToWorkouts () {
  let exerciseName = $('#search-for-exercise-names').val()
  exerciseName = exerciseName[0].toUpperCase() + exerciseName.substring(1)
  store.exerciseNames.push(exerciseName)
  ui.updateExerciseList.call($('#search-for-exercise-names'))
}

function onExerciseSelection (event) {
  event.preventDefault()
  const workoutId = store.workout._id
  const data = getFormFields(event.target)
  api.selectExercise(workoutId, data)
    .then(response => {
      ui.showSetFrame()
      store.workout.exercise.push(response.exercise)
      ui.clearForm(event.originalEvent.originalTarget.id)
    })
    .catch(console.error)
}

function onSetEntry (event) {
  event.preventDefault()
  const workoutId = store.workout._id
  const exerciseId = store.workout.exercise[store.workout.exercise.length - 1]._id
  const data = getFormFields(event.target)
  api.createSet(workoutId, exerciseId, data)
    .then(response => {
      ui.clearForm(event.delegateTarget.id)
      const currentExercise = store.workout.exercise[store.workout.exercise.length - 1]
      currentExercise.sets.push(response.set)
      const buttonText = event.originalEvent.submitter.value
      if (buttonText === 'Next Set') {
        const nextSetNumber = currentExercise.sets.length + 1
        $('#set-frame > p').text(`Set ${nextSetNumber}`)
      }
      if (buttonText === 'New Exercise') {
        ui.showExerciseSelectionFrame()
        $('#set-frame > p').text('Set 1')
      }
      if (buttonText === 'I\'m Spent!') {
        ui.postWorkoutCleanUp()
      }
    })
    .catch(console.error)
}

function setupPersonalSettingsFrame (event) {
  ui.showPersonalSettingsFrame(event)
  // toggle active class
  const currentNavBarListItem = $(event.target).parents('li.nav-item')
  ui.toggleNavBarListItems(currentNavBarListItem)
}

function onUpdatePersonalSettings (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)

  // make ajax call to update db
  api.updatePersonalSettings(data)
    .then(response => {
      ui.clearForm(event.delegateTarget.id)
      console.log(response)
      store.user = response.user
      ui.updatePersonalSettingsFormPlaceholders()
    })
    .catch(console.error)
}

function onStatsButtonClick (event) {
  // get all previously used exercise titles and store them
  store.exerciseNames = dbSearch.getUsedExerciseNames()

  // populate exercise selector with all previously used exercises
  ui.populateExerciseTitleSelector(new Set(store.exerciseNames.sort()))

  ui.showStatsFrame(event)
  onShowGraph()
}

function onWorkoutHistoryButtonCLick (event) {
  ui.showWorkoutHistoryFrame(event)
  _getAllWorkouts()
    .then(() => {
      ui.populateWorkoutTable()
    })
    .catch(console.error)
}

function onShowGraph (event) {
  let exercises

  // get all previous workouts and store them locally
  _getAllWorkouts()
    .then(() => {
      // grab selected exercise and pass it to a function to get all sets of this exercise
      let title
      if (event == null) {
        title = $('used-exercise-titles-stats').val()
      } else {
        title = $(event.target).val()
      }
      exercises = dbSearch.getAllExercisesOfType(title)
      const volume = dbSearch.getWorkoutVolume(exercises)
      return volume
    })
    .then(volume => {
      // get the dates
      const dates = dbSearch.getWorkoutDates(exercises)
      return { volume, dates }
    })
    .then(data => {
      // graph the volume and the dates
      graphData.exerciseVolume(data.volume, data.dates)
    })
    .catch(console.error)
}

function onDeleteWorkout (event) {
  event.preventDefault()
  // Need to make sure the right parent object is selected regardless of whether user clicks on
  // the cross in the center or on the circle around it
  const workoutId = $(event.target.parentElement).data().workoutId || $(event.target).data().workoutId
  console.log(workoutId)
  ui.showWarningModal('Irreversible Request', 'Please confirm the irreversible removal of this workout.')
  $('#confirm-delete-button').on('click', () => {
    api.deleteWorkout(workoutId)
      .then(() => {
        return _getAllWorkouts()
      })
      .then(() => {
        ui.populateWorkoutTable()
        _deleteEventListeners()
      })
      .catch(() => {
        _deleteEventListeners()
      })
  })
  $('#cancel-delete-button').on('click', _deleteEventListeners)

  function _deleteEventListeners () {
    $('#confirm-delete-button').off()
    $('#cancel-delete-button').off()
  }
}

function _getAllWorkouts () {
  // get all previous workouts and store them locally
  return api.getAllWorkouts()
    .then(response => {
      console.log(response)
      store.workouts = response.workouts
      return Promise.resolve()
    })
    .catch(console.error)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  onSetUpWorkout,
  onExerciseSelection,
  onSetEntry,
  setupPersonalSettingsFrame,
  onUpdatePersonalSettings,
  onAddExerciseToWorkouts,
  onStatsButtonClick,
  onWorkoutHistoryButtonCLick,
  onShowGraph,
  onDeleteWorkout
}
