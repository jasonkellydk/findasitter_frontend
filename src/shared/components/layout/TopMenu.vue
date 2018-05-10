<template>
  <nav class="navbar" role="navigation">
    <div class="navbar__container">
      <div class="navbar__logo">
        <i class="ion-ribbon-b"></i>
      </div>
      <ul class="navbar__items">
        <li class="navbar__items__item">
          <router-link class="navbar__items__item__link" :to="{ name: 'Index' }">Find babysitter</router-link>
        </li>
        <li class="navbar__items__item">
          <router-link class="navbar__items__item__link" :to="{ name: 'Index' }">Hjælp</router-link>
        </li>
        <li class="navbar__items__item">
          <router-link class="navbar__items__item__link" :to="{ name: 'Index' }">Tilmeld</router-link>
        </li>
        <li class="navbar__items__item" v-if="!isAuthenticated">
          <router-link class="navbar__items__item__link" :to="{ name: 'auth.login' }">Log ind</router-link>
        </li>
        <li class="navbar__items__item" v-else>
          <a @click="signOut" class="button button--primary--outline" >Log ud</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
      user: state => state.auth.user
    })
  },
  methods: {
    signOut () {
      this.$store.dispatch('auth/signOut')
    }
  }
}
</script>

