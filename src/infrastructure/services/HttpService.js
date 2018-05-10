import axios from 'axios'
import store from '../../infrastructure/store/store'

const baseUrl = 'http://localhost:8000'

axios.interceptors.request.use(function (config) {
  const {state: { auth: { isAuthenticated, accessToken } }} = store

  if (!isAuthenticated) {
    return config
  }

  config.headers = {Authorization: `Bearer ${accessToken}`}
  return config
}, function (error) {
  return Promise.reject(error)
})

/**
 * @param path
 * @param data
 * @param cb
 * @param errorCb
 */
const get = (path, data, cb, errorCb) => {
  axios.get(path, {params: data})
        .then((response) => {
          cb(response)
        }).catch(error => {
          errorCb(error)
        })
}

/**
 * @param path
 * @param cb
 * @param errorCb
 */
const remove = (path, cb, errorCb) => {
  axios.delete(path)
        .then((response) => {
          cb(response)
        }).catch(error => {
          errorCb(error)
        })
}

/**
 * @param path
 * @param data
 * @param cb
 * @param errorCb
 */
const post = (path, data, cb, errorCb) => {
  axios.post(path, data)
        .then((response) => {
          cb(response)
        }).catch(error => {
          errorCb(error)
        })
}

/**
 * @param path
 * @param data
 * @param cb
 * @param errorCb
 */
const put = (path, data, cb, errorCb) => {
  axios.post(path, data)
        .then((response) => {
          cb(response)
        }).catch(error => {
          errorCb(error)
        })
}

export {
    get,
    remove,
    post,
    put,
    baseUrl
}
