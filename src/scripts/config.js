'use strict'

export let apiUrl
export const apiUrls = {
  production: 'https://workout-tracker-api-cl81.onrender.com',
  development: 'http://localhost:3001'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}
