import axios from 'axios'

export const apiUploadImage = (data) =>
  axios({
    method: 'post',
    url: `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDYNARY_NAME
    }/image/upload`,
    data,
  })

export const apiGetLongtitudeAndLatitudeFromAddress = (address) =>
  axios({
    method: 'GET',
    url: `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${
      import.meta.env.VITE_API_GEOAPIFREE
    }`,
  })
