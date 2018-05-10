import { get, post, baseUrl } from '../../services/HttpService'

const state = {
  user: null,
  isAuthenticated: false,
  isReady: false,
  accessToken: null
}

// Actions async
const actions = {
  authenticate ({ commit }, payload) {
    post(baseUrl + '/auth/login', payload.user, response => {
      const { data: { accessToken } } = response

      commit('setAuthentication', accessToken)

      payload.cb()

      setTimeout(() => {
        get(baseUrl + '/auth/user', {}, response => {
          const { data } = response
          commit('setUser', data)
        })
      }, 0)
    })
  },
  signOut ({ commit }) {
    commit('setAuthentication', null)
    commit('setUser', null)
  }
}

// Mutation sync
const mutations = {
  setUser (state, user) {
    state.user = user
    state.isReady = true
  },
  setAuthentication (state, accessToken) {
    state.accessToken = accessToken
    state.isAuthenticated = accessToken !== null
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
