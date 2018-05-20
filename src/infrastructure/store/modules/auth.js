import { get, post, baseUrl } from '../../services/HttpService'

const state = {
  user: null,
  isAuthenticated: false,
  isReady: false,
  isLoading: false,
  hasError: false,
  accessToken: null
}

// Actions async
const actions = {
  createUser ({ commit, dispatch }, payload) {
    post(baseUrl + '/users', payload.user, response => {
      dispatch('authenticate', payload)
    }, () => {
      commit('setLoading', false)
      commit('setError', true)
    })
  },
  authenticate ({ commit }, payload) {
    commit('setLoading', true)
    commit('setError', false)

    post(baseUrl + '/auth/login', payload.user, response => {
      const { data: { accessToken } } = response

      commit('setAuthentication', accessToken)
      commit('setLoading', false)

      payload.cb()

      setTimeout(() => {
        get(baseUrl + '/auth/user', {}, response => {
          const { data } = response
          commit('setUser', data)
        })
      }, 0)
    }, () => {
      commit('setLoading', false)
      commit('setError', true)
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
  },
  setLoading (state, loading) {
    state.isLoading = loading
  },
  setError (state, error) {
    state.hasError = error
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
