import axios from 'axios'

const headers = { 'Content-Type': 'multipart/form-data' }
export default axios.create({
  baseURL: process.env.URL_SERVER,
  headers: { ...headers }
})
