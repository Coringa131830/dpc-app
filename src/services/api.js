import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dpc-api-v2.herokuapp.com'
})

export default api
