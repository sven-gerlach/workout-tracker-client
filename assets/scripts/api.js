'use strict'
const config = require('./config')
const store = require('./store')

function signUp (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-up',
    data: data
  })
}

function signIn (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-in',
    data: data
  })
}

function getAllWorkouts () {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/workouts',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

function signOut () {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/sign-out',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

function changePassword (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/change-password',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: data
  })
}

function setUpWorkout (weightUnit) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/workouts',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      workout: {
        weightUnit: weightUnit
      }
    }
  })
}

function selectExercise (workoutId, data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/workouts/' + workoutId,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: data
  })
}

function createSet (workoutId, exerciseId, data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/workouts/' + workoutId + '/exercise/' + exerciseId,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: data
  })
}

function updatePersonalSettings (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/users',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: data
  })
}

function deleteWorkout (workoutId) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/workouts/' + workoutId,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  getAllWorkouts,
  signOut,
  changePassword,
  setUpWorkout,
  selectExercise,
  createSet,
  updatePersonalSettings,
  deleteWorkout
}
