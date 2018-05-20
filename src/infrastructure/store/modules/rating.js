import { post, get, baseUrl } from '../../services/HttpService'

const state = {
  ratings: []
}

const actions = {
  createRating ({ commit }, payload) {
    post(baseUrl + '/ratings', payload, response => {
      commit('setRating', [response.data])
    })
  },
  findAllByUser ({ commit }, payload) {
    get(baseUrl + '/ratings', { userId: payload.userId }, response => {
      commit('setRating', response.data)

      payload.cb()
    })
  }
}

const mutations = {
  setRating (state, ratings) {
    ratings.forEach(rating => {
      const index = state.ratings.findIndex(existingRating => existingRating.id === rating.id)

      if (index === -1) {
        state.ratings = [...state.ratings, rating]
      }
    })
  }
}

const getters = {
  getRatingsByUser: state => userId => {
    return state.ratings.filter(rating => rating.ratingTo.id === userId)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
