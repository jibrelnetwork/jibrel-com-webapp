import axios from 'axios'

import settings from 'app/settings'

const instance = axios.create({
  baseURL: settings.API_BASE_URL,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,
})

export default instance
