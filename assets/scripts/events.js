'use strict'
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const store = require('./store')
const ui = require('./ui')

// todo: add auto-sign in feature
function onSignUp (event) {
  event.preventDefault()
  const formData = getFormFields(event.currentTarget)
  api.signUp(formData)
    .then(console.log)
    .catch(console.log)
}

function onSignIn (event) {
  event.preventDefault()
  const formData = getFormFields(event.currentTarget)
  api.signIn(formData)
    .then(data => {
      store.user = data.user
      ui.showWorkoutFrame()
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

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut
}
