import axios from '~/axios'

export const apiCreateNewPropertyType = (data) =>
  axios({
    url: '/property-type',
    method: 'POST',
    data,
  })
