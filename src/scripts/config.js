'use strict'

export let apiUrl
export const apiUrls = {
  production: 'https://glacial-lowlands-84293.herokuapp.com',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}
