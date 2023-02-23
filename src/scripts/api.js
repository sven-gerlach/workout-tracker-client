'use strict'
import { apiUrl } from "./config";
import { store } from './store'

function signUp (data) {
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: data
  })
}

function signIn (data) {
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/sign-in',
    data: data
  })
}

function getAllWorkouts () {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/workouts',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

function signOut () {
  return $.ajax({
    method: 'DELETE',
    url: apiUrl + '/sign-out',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

function changePassword (data) {
  return $.ajax({
    method: 'PATCH',
    url: apiUrl + '/change-password',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: data
  })
}

function deleteUserAccount () {
  return $.ajax({
    method: 'DELETE',
    url: apiUrl + '/users/' + store.user._id,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

function setUpWorkout (weightUnit) {
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/workouts',
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
    url: apiUrl + '/workouts/' + workoutId,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: data
  })
}

function createSet (workoutId, exerciseId, data) {
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/workouts/' + workoutId + '/exercise/' + exerciseId,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: data
  })
}

function updatePersonalSettings (data) {
  return $.ajax({
    method: 'PATCH',
    url: apiUrl + '/users',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: data
  })
}

function deleteWorkout (workoutId) {
  return $.ajax({
    method: 'DELETE',
    url: apiUrl + '/workouts/' + workoutId,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

export default {
  signUp,
  signIn,
  getAllWorkouts,
  signOut,
  changePassword,
  deleteUserAccount,
  setUpWorkout,
  selectExercise,
  createSet,
  updatePersonalSettings,
  deleteWorkout,
}
