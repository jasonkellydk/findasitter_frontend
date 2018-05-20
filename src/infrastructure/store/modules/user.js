import { get, baseUrl } from '../../../infrastructure/services/HttpService'

const state = {
  users: {}
}

const actions = {
  findAllUsers ({ commit }, type) {
    get(baseUrl + '/users', type, response => {
      commit('setUsers', response.data)
    }, () => {})
  }
}

const mutations = {
  setUsers (state, users) {
    state.users = users
  }
}

const getters = {
  babies: state => {
    return state.users.filter(user => user.role.type === 'baby')
  },
  sitters: state => {
    return state.users.filter(user => user.role.type === 'sitter')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
