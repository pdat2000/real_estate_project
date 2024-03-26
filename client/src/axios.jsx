import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
})

instance.interceptors.request.use(
  function (config) {
    let token = window.localStorage.getItem("rest06")
    if (token) token = JSON.parse(token)
    if (token.state?.token)
      config.headers = {
        Authorization: `Bearer ${token.state.token}`,
      }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return error.response.data
  }
)

export default instance
