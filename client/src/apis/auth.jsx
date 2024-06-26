import axios from "~/axios"

export const apiRegister = (data) =>
  axios({
    url: "/auth/signup",
    method: "POST",
    data,
  })

export const apiSignIn = (data) =>
  axios({
    url: "/auth/signin",
    method: "POST",
    data,
  })
