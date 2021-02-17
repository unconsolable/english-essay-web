import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    user: {}
  },
  mutations: {
    token (state, payload) {
      state.token = payload
    },
    user (state, payload) {
      state.user = payload
    }
  }
})
