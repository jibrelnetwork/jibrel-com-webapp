import axios from 'axios'

const instance = axios.create({
  // FIXME: take it from environment
  baseURL: 'https://api.jibrelcom.develop.jdev.network/',
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,
})

export default instance
