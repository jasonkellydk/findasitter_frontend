<template>
  <nav class="navbar" :class="{'navbar--scrolled': scrolled}" role="navigation">
    <div class="navbar__container">
      <div class="navbar__logo">
        <router-link :to="{ name: 'Index' }" tag="i" class="ion-ribbon-b" ></router-link>
      </div>
      <ul
        class="navbar__items"
        :class="{'navbar__items--black' : ['/auth/login', '/auth/signup'].indexOf($route.path) !== -1}">
        <li class="navbar__items__item">
          <router-link
            v-if="user && user.role.authority === 'sitter'"
            class="navbar__items__item__link"
            :to="{ name: 'browse.babies' }"
          >Se babyer</router-link>
          <router-link
            v-else
            class="navbar__items__item__link"
            :to="{ name: 'Index' }"
          >Find babysitter</router-link>
        </li>
        <li class="navbar__items__item">
          <router-link class="navbar__items__item__link" :to="{ name: 'Index' }">Hjælp</router-link>
        </li>
        <template v-if="!isAuthenticated">
          <li class="navbar__items__item">
            <router-link class="navbar__items__item__link" :to="{ name: 'auth.signup' }">Tilmeld</router-link>
          </li>
          <li class="navbar__items__item">
            <router-link class="navbar__items__item__link" :to="{ name: 'auth.login' }">Log ind</router-link>
          </li>
        </template>
        <template v-else>
          <li class="navbar__items__item">
            <router-link v-if="user" class="navbar__items__item__link" :to="{ name: 'user.profile' }">{{ user.name }}</router-link>
          </li>
          <li class="navbar__items__item">
            <a @click="signOut" class="navbar__items__item__link" >Log ud</a>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      scrolled: false
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
      user: state => state.auth.user
    })
  },
  mounted () {
    window.addEventListener('scroll', this.checkScroll)
    this.checkScroll()
  },
  beforeDestroy () {
    window.removeEventListener('scroll')
  },
  methods: {
    signOut () {
      this.$store.dispatch('auth/signOut')
    },
    checkScroll () {
      if (window.pageYOffset > 200) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    }
  }
}
</script>

