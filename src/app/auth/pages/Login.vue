<template>
  <div class="login">
      <div class="login__form">
        <h1 v-if="isAuthenticated">yeeebo</h1>
        <form @submit.prevent="authenticate" class="login__form__wrapper">
          <div>
            <h1 class="login__form__heading">
              <i class="ion-ios-locked-outline"></i>
            </h1>
            <p class="login__form__subheading">Med vores unikke baby algoritme kan nu lave blockchain på baby niveau. featuring machine learning og selvkørende biler</p>
          </div>

          <div class="login__form__element">
             <input v-model="username" class="form__element" name="email" type="text" placeholder="email"/>
          </div>

          <div class="login__form__element">
            <input v-model="password" class="form__element" name="password" type="password" placeholder="password" autocomplete="new-password"/>
          </div>

          <div class="login__form__element">
            <button type="submit" class="button button--primary">Login</button>
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
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },
  methods: {
    authenticate () {
      const username = this.username
      const password = this.password

      this.$store.dispatch('auth/authenticate', {
        user: {
          username,
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
