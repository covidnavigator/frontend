import { REFRESH_URL } from '../redux/consts'
import ApplicationHelper from '../assets/js/utils'

const axios = require('axios').default

export default function AxiosInterceptors() {
  let isRefreshing = false

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve(token)
      }
    })

    failedQueue = []
  }

  axios.interceptors.request.use(
    (config) => {
      const accessToken = ApplicationHelper.getCurrentUserData().token

      if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken
        config.headers['Content-Type'] = 'application/json'
      }

      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )
  // if access token expires, refresh token

  let failedQueue = []

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config

      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === 'Unauthorized' &&
        !originalRequest._retry
      ) {
        // if unsuccess, logOut
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject })
          })
            .then((res) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + res
              return axios(originalRequest)
            })
            .catch((err) => {
              return Promise.reject(err)
            })
        }

        originalRequest._retry = true
        isRefreshing = true

        const refreshToken = ApplicationHelper.getCurrentUserData().refreshToken

        return new Promise(function (resolve, reject) {
          axios
            .post(REFRESH_URL, { refreshToken })
            .then(({ data }) => {
              ApplicationHelper.setAuthenData(
                true,
                JSON.stringify({
                  permissions: data.permissions,
                  role: data.user.role,
                  fullName: data.user.username,
                  token: data.payload.token,
                  refresh: data.payload.refresh,
                })
              )

              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + data.payload.token
              originalRequest.headers['Authorization'] =
                'Bearer ' + data.payload.token
              processQueue(null, data.payload.token)
              resolve(axios(originalRequest))
            })
            .catch((err) => {
              processQueue(err, null)
              reject(err)
              if (err.response.status === 422) {
                ApplicationHelper.removeToken()
              }
            })
            .finally(() => {
              isRefreshing = false
            })
        })
      }

      return Promise.reject(error)
    }
  )
}
