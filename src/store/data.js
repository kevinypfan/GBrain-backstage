import axios from '../utility/axiosInstance'

export default {
  state: {

  },
  mutations: {

  },
  actions: {
    findOneData (type, id) {
      return new Promise((resolve, reject) => {
        const authToken = window.localStorage.getItem('token');
        axios.get(`/${type}/${id}`, {headers: { authToken }})
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
      })
    }
  },
  getters: {

  }
}
