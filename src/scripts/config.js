'use strict'

export let apiUrl
export const apiUrls = {
  production: 'https://ck7k22n5j9.execute-api.us-east-1.amazonaws.com/prod',
  development: 'http://localhost:3001/dev'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}
