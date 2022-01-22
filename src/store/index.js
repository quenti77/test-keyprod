import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions.js'
import * as getters from './getters.js'
import * as mutations from './mutations.js'
import state from './state.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
