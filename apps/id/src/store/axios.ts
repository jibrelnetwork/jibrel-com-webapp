import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://api.jibrelcom.local/',
  xsrfHeaderName: 'X-CSRFToken',
})

export default instance
