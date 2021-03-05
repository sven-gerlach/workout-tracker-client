'use strict'
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')

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
    .then(console.log)
    .catch(console.error)
}

module.exports = {
  onSignUp,
  onSignIn
}
