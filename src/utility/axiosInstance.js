import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://120.105.129.58/'
})

export default instance;
