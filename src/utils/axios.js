import axios from 'axios'
import config from '../config/defaultSettings'
import { logout } from '../redux/actions/authActions'
import {store} from "../redux/store"


const request = axios.create({
  baseURL: config.baseURL,
  timeout: 8000,
})

request.interceptors.request.use(
  config => {
    const token = store.getState().auth.accessToken

    if(token) {
      config.headers.Authorization = token
    }
    return config
  },

  error => errorHandler(error)
)


const errorHandler = (error, hooks) => {
  if (error?.response) {
    if(error.response?.data?.message) {
      // store.dispatch(showAlert(error.response.data.message))
    }

    if (error?.response?.status === 403) {

    }
    else if ( error?.response?.status === 401) {
      store.dispatch(logout())
    }
  }

  return Promise.reject(error.response)
}

request.interceptors.response.use(response => response.data , errorHandler)

export default request

