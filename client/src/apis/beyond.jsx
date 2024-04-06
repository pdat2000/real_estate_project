import axios from 'axios'

export const apiUploadImage = (data) =>
  axios({
    method: 'post',
    url: `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDYNARY_NAME
    }/image/upload`,
    data,
  })
