import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utility/axiosInstance'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload;
    }
  },
  actions: {
    authLogin ({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/user/signin', payload)
          .then((res) => {
            console.log(res.headers);
            window.localStorage.setItem('token', res.headers['authtoken']);
            return axios.get('/api/user/me', {headers: {authToken: res.headers['authtoken']}})
          })
          .then(({data}) => {
            commit('setUser', data)
            resolve();
          })
          .catch((res) => {
            console.log(res.response.data);
            reject(res.response.data);
          })
      })
    },
    checkToken ({commit}, payload) {
      return new Promise((resolve, reject) => {
        const authToken = window.localStorage.getItem('token');
        axios.get('/api/user/me', {headers: { authToken }})
          .then(({data}) => {
            commit('setUser', data)
            resolve();
          })
          .catch((res) => {
            reject(res.response.data);
          })
      })
    },
    userLogout ({commit}) {
      return new Promise((resolve, reject) => {
        const authToken = window.localStorage.getItem('token');
        axios.delete('/api/user/logout', {headers: { authToken }}).then(() => {
          window.localStorage.removeItem('token');
          commit('setUser', null);
          resolve();
        }).catch(() => {
          reject();
        })
      })
    }
  },
  getters: {

  }
})
