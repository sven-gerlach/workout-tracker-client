'use strict'
import ui from './ui';
import events from './events';
import '../styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// hiding all frames
ui.showWelcomeFrame()

$.when($.ready).then(() => {
  const expeditedSignUpModal = $('#expedited-sign-up-modal');
  $('.go-to-welcome-frame').on('click', ui.showWelcomeFrame)
  $('#sign-in-button').on('click', ui.showSignInFrame)
  $('#sign-up-button').on('click', ui.showSignUpFrame)
  $('#security-button').on('click', ui.showSecurityFrame)
  $('#home-frame-button').on('click', ui.showHomeFrame)
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
  $('#personal-settings-button').on('click', events.setupPersonalSettingsFrame)
  $('#global-settings-button').on('click', ui.showGlobalSettingsFrame)
  $('#sign-out-button').on('click', events.onSignOut)
  $('#change-pw-form').on('submit', events.onChangePassword)
  $('#delete-account-form').on('submit', events.onDeleteAccount)
  $('#setup-workout-button').on('click', events.onSetUpWorkout)
  $('#exercise-selection-form').on('submit', events.onExerciseSelection)
  $('#set-form').on('submit', events.onSetEntry)
  $('#personal-settings-form').on('submit', events.onUpdatePersonalSettings)
  $('#search-for-exercise-names').keyup(ui.updateExerciseList)
  $('#add-exercise-to-list').on('click', events.onAddExerciseToWorkouts)
  $('#end-workout-button').on('click', events.onEndWorkout)
  $('#stats-button').on('click', events.onStatsButtonClick)
  $('#workout-history-button').on('click', events.onWorkoutHistoryButtonCLick)
  $('#used-exercise-titles-stats').on('change', events.onShowGraph)
  $('#number-of-workouts').on('change', ui.populateWorkoutTable)
  $('#workout-history-table').on('click', events.onDeleteWorkout)
  $('#search-exercise-checkbox').on('click', ui.toggleExerciseSearchBar)
  expeditedSignUpModal.modal('show');
  $('#confirm-expedited-sign-up-button').on('click', events.onExpeditedSignUp)
  $('#cancel-expedited-sign-up-button').on('click', () => expeditedSignUpModal.modal('hide'))
})
