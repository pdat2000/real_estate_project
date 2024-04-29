import axios from '~/axios'

export const apiGetCurrent = () =>
  axios({
    url: '/user/current',
    method: 'GET',
  })

export const apiGetRoles = () =>
  axios({
    url: '/user/roles',
    method: 'GET',
  })

export const apiUpdateProfile = (data) =>
  axios({
    url: '/user/profile',
    method: 'PUT',
    data,
  })
