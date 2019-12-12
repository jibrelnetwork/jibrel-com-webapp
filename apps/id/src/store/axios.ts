import axios from 'axios'

const instance = axios.create({
  // FIXME: take it from environment
  baseURL: 'http://api.jibrelcom.local/',
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,
})

export default instance
