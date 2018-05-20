<template>
  <div class="signup">
      <div class="signup__image">
      </div>
      <div class="signup-form">
        <form @submit.prevent="authenticate" class="signup__form__wrapper">
          <div>
            <p class="signup-form__heading">Bliv den babysitter du selv vil bruge</p>
            <p class="signup-form__subheading"><b> Tilmeld dig idag</b></p>
          </div>

           <div class="signup-form__element">
            <input
              v-model="name"
              class="form__element"
              name="name"
              type="text"
              placeholder="navn"
              v-validate="'required'"
            />
          </div>
          <span class="error" v-show="errors.has('name')">{{ errors.first('name') }}</span>

          <div class="signup-form__element">
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

          <div class="signup-form__element">
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

          <div class="signup-form__element">
            <label for="sitter">
              Sitter
              <input id="sitter" type="radio" name="role" v-model="role" value="sitter">
            </label>
            &nbsp; &nbsp; &nbsp;
            <label for="baby">
              Baby
              <input id="baby" type="radio" name="role" v-model="role" value="baby">
            </label>
          </div>

          <div v-if="hasError">
            <h4 class="error">Dine oplysninger stemmer ikke overens</h4>
          </div>

          <div class="signup-form__element">
            <button
              v-if="isLoading"
              type="submit"
              class="button button--primary signup-form__button"
              disabled>
              <i class="fas fa-circle-notch fa-spin"></i>
            </button>
            <button
              v-else
              type="submit"
              class="button button--primary signup-form__button">
              Tilmeld
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
      name: '',
      email: '',
      password: '',
      role: ''
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
      const name = this.name
      const role = this.role

      const result = await this.$validator.validateAll()

      if (!result) {
        return
      }

      this.$store.dispatch('auth/createUser', {
        user: {
          email,
          password,
          name,
          role
        },
        cb: () => {
          this.$router.replace({ name: 'Index' })
        }
      })
    }
  }
}
</script>
