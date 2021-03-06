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
      api.getAllWorkouts()
        .then(response => {
          console.log(response)
          store.workouts = response.workouts
        })
        .catch(console.error)

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
      console.log(store)
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
        ui.showWorkoutFrame()
        $('#set-frame > p').text('Set 1')
        delete store.workout
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

  // get level of experience from drop-down list and add to user key in data obj
  const experience = $('#experience')[0].value
  data.user.experience = experience

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
  onAddExerciseToWorkouts
}
