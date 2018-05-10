import { post, baseUrl } from '../../../infrastructure/services/HttpService'

const state = {
  users: []
}

const actions = {
  createUser ({ commit }, payload) {
    post(baseUrl + '/users', payload, response => {
      console.log(response)
    })
  }
}

const mutations = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
