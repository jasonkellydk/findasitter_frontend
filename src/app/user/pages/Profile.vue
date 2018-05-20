<template>
  <div class="profile">
    <div class="profile__bar"></div>
    <div class="cover">
      <img class="cover__image" :src="`https://api.adorable.io/avatars/101/abott@${user.email}.png`" :alt="user.name" />
      <h1 class="cover__header">{{ user.name }}</h1>
      <h3 class="cover__location">{{ user.location }}</h3>
      <div class="cover__rating">
        <rating v-if="user" :userId="user.id"/>
      </div>

      <div class="cover__cta" v-if="auth.id !== user.id && auth.role.type !== user.role.type">
        
        <div class="cover__rating-btn">
          <button class="button button--primary" @click="ratingForm.isVisible = true">Giv en rating</button>
          <div
            class="cover__form"
            v-if="ratingForm.isVisible" 
            v-on-clickaway="hideForm"
          >
            <form class="rating-form" @submit.prevent="submitRating">
              <div class="form__element">
                <star-rating :show-rating="false" :star-size="30" v-model="ratingForm.rating" />
                <span class="error" v-show="ratingForm.rating === 0">Du skal angive en rating</span>
              </div>

              <div class="form__element">
                <textarea
                  name="comment"
                  class="form__input rating-form__comment"
                  v-validate="'required'"
                  v-model="ratingForm.message"
                ></textarea>
                <span class="error" v-show="errors.has('comment')">{{ errors.first('comment') }}</span>
              </div>

              <div class="form__element">
                <button class="button button--primary" type="submit">Indsend</button>
              </div>
            </form>
          </div>
        </div>

        <button class="button button--secondary--outline">Rapporter</button>
      </div>
    </div>
    <div>
      <ul>
        <li v-for="rating in ratings" :key="rating.id">
          {{ rating.message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { directive as onClickaway } from 'vue-clickaway'

export default {
  directives: {
    onClickaway: onClickaway
  },
  data () {
    return {
      ratingForm: {
        isVisible: false,
        rating: 0,
        message: ''
      }
    }
  },
  methods: {
    hideForm () {
      this.ratingForm.isVisible = false
    },
    async submitRating () {
      const result = await this.$validator.validateAll()

      if (!result || this.ratingForm.rating === 0) {
        return
      }

      const rating = this.ratingForm.rating
      const message = this.ratingForm.message
      const ratingTo = this.user.id

      this.$store.dispatch('rating/createRating', {
        rating,
        message,
        ratingTo
      })

      this.ratingForm.isVisible = false
      this.ratingForm.rating = 0
      this.ratingForm.message
    }
  },
  computed: {
    ...mapState({
      users: state => state.user.users,
      auth: state => state.auth.user
    }),
    user () {
      const userId = this.$route.params.userId
      const user = this.users.filter(user => user.id === userId)
      return user[0]
    },
    ratings () {
      return this.$store.getters['rating/getRatingsByUser'](this.user.id)
    }
  }
}
</script>

