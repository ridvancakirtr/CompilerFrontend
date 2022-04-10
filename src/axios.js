import axios from 'axios'

const baseURL = 'http://localhost:3000/api/v1/'
export default axios.create({
  baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    
 },
  withCredentials:false
})
