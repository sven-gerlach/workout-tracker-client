'use strict'
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const store = require('./store')
const ui = require('./ui')

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
      store.user = data.user
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
      console.log(store)
      ui.showExerciseSelectionFrame()
    })
    .catch(console.error)
}

function onExerciseSelection (event) {
  event.preventDefault()
  const workoutId = store.workout._id
  const data = getFormFields(event.target)
  api.selectExercise(workoutId, data)
    .then(response => {
      console.log(response)
      store.workout.exercise.push(response.exercise)
      console.log(store)
    })
    .catch(console.error)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  onSetUpWorkout,
  onExerciseSelection
}
