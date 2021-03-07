'use strict'
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const store = require('./store')
const ui = require('./ui')
const dbSearch = require('./db_search')

// todo: add auto-sign in feature
function onSignUp (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signUp(formData)
    .then(response => {
      console.log(response)
      // send id of form element to a function that clears that form
      ui.clearForm(event.delegateTarget.id)
    })
    .catch(response => {
      console.log(response)
      // send id of form element to a function that clears that form
      ui.clearForm(event.delegateTarget.id)
    })
}

function onSignIn (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signIn(formData)
    .then(data => {
      ui.showWorkoutFrame()

      // store user data and all historic workout data locally
      store.user = data.user

      // get all previous workouts and store them locally
      _getAllWorkouts()

      // update the personal settings form placeholders with the downloaded user data
      ui.updatePersonalSettingsFormPlaceholders()

      // send id of form element to a function that clears that form
      ui.clearForm(event.delegateTarget.id)
    })
    .catch(console.error)
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

function setupPersonalSettingsFrame () {
  ui.showPersonalSettingsFrame()
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

function onStatsButtonClick () {
  // get all previously used exercise titles and store them
  store.exerciseNames = dbSearch.getUsedExerciseNames()

  // populate exercise selector with all previously used exercises
  ui.populateExerciseTitleSelector(new Set(store.exerciseNames.sort()))

  ui.showStatsFrame()
}

function onShowGraph (event) {
  event.preventDefault()

  // get all previous workouts and store them locally
  _getAllWorkouts()
    .then(() => {
      // grab selected exercise and pass it to a function to get all sets of this exercise
      const title = getFormFields(event.target).exercise.title
      const exercises = dbSearch.getAllExercisesOfType(title)
      console.log(exercises)
    })
    .catch(console.error)
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
  onShowGraph
}
