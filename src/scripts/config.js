'use strict'

export let apiUrl
export const apiUrls = {
  production: 'https://proload.onrender.com',
  development: 'http://localhost:3001/dev'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}
