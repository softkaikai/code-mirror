import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    account: ''
  },
  mutations: {
    setAccount (state, account) {
      state.account = account;
    }
  }
})

export default store
