import axios from 'axios'

const baseURL = 'https://compilertestapi.herokuapp.com/api/v1/'
export default axios.create({
  baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    
 },
  withCredentials:false
})
