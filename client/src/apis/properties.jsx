import axios from '~/axios'

export const apiGetProperties = (params) =>
  axios({
    url: '/properties',
    method: 'GET',
    params,
  })

export const apiGetDetailProperty = (id) =>
  axios({
    url: '/properties/one/' + id,
    method: 'GET',
  })
