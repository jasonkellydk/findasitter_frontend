<template>
  <div class="login">
      <div class="login__image">
      </div>
      <div class="login-form">
        <form @submit.prevent="authenticate" class="login__form__wrapper">
          <div>
            <p class="login-form__heading">Find din næste babysitter</p>
            <p class="login-form__subheading">Login</p>
          </div>

          <div class="login-form__element">
            <input
              v-model="email"
              class="form__element"
              name="email"
              type="text"
              placeholder="email"
              v-validate="'required|email'"
            />
          </div>
          <span class="error" v-show="errors.has('email')">{{ errors.first('email') }}</span>

          <div class="login-form__element">
            <input
              v-model="password"
              class="form__element"
              name="password"
              type="password"
              placeholder="password"
              autocomplete="new-password"
              v-validate="'required'"
            />
          </div>
          <span class="error" v-show="errors.has('password')">{{ errors.first('password') }}</span>

          <div v-if="hasError">
            <h4 class="error">Dine oplysninger stemmer ikke overens</h4>
          </div>

          <div class="login-form__element">
            <button
              v-if="isLoading"
              type="submit"
              class="button button--primary login-form__button"
              disabled>
              <i class="fas fa-circle-notch fa-spin"></i>
            </button>
            <button
              v-else
              type="submit"
              class="button button--primary login-form__button">
              Login
            </button>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
      isLoading: state => state.auth.isLoading,
      hasError: state => state.auth.hasError
    })
  },
  methods: {
    async authenticate () {
      const email = this.email
      const password = this.password

      const result = await this.$validator.validateAll()

      if (!result) {
        return
      }

      this.$store.dispatch('auth/authenticate', {
        user: {
          email,
          password
        },
        cb: () => {
          this.$router.replace({ name: 'Index' })
        }
      })
    }
  }
}
</script>
