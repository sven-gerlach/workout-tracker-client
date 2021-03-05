'use strict'
const config = require('./config')

function signUp (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-up',
    data: data
  })
}

module.exports = {
  signUp
}
