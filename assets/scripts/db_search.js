'use strict'
const store = require('./store')
const _ = require('lodash')

// returns an array with all exercise names
function getUsedExerciseNames () {
  const usedExerciseNames = []
  const workouts = store.workouts
  for (const workout of workouts) {
    for (const exercise of workout.exercise) {
      usedExerciseNames.push(exercise.title)
    }
  }
  return usedExerciseNames
}

// return an array with all the exercises of a specific title
function getAllExercisesOfType (title) {
  const workouts = store.workouts
  const exercisesOfType = []
  for (const workout of workouts) {
    for (const exercise of workout.exercise) {
      if (exercise.title === title) {
        exercisesOfType.push(exercise)
      }
    }
  }
  return exercisesOfType
}

// param: an array of all exercises of the same type
// return: array with the elements representing the total workout volume for each exercise
function getWorkoutVolume (exercises) {
  const workoutVolumes = []
  for (const exercise of exercises) {
    let volume = 0
    for (const set of exercise.sets) {
      volume += _.round(set.weight * set.repetitions)
    }
    workoutVolumes.push(volume)
  }
  return workoutVolumes
}

module.exports = {
  getUsedExerciseNames,
  getAllExercisesOfType,
  getWorkoutVolume
}
