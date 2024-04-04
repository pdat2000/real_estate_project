import axios from "~/axios"

export const apiGetCurrent = () =>
  axios({
    url: "/user/current",
    method: "GET",
  })
  
export const apiGetRoles = () =>
  axios({
    url: "/user/roles",
    method: "GET",
  })
