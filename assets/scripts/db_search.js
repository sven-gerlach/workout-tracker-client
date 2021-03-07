'use strict'
const store = require('./store')

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
function getAllExerciseTypes (title) {
  //
}

module.exports = {
  getUsedExerciseNames,
  getAllExerciseTypes
}
