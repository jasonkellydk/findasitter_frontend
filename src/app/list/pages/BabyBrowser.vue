<template>
  <div class="baby-browser">
    <div class="baby-browser__background"></div>
    <h1 class="baby-browser__header">Her er vores udvalg af babyer</h1>

    <ul class="list">
      <li class="list__item" v-for="user in babies" :key="user.id"
      @click="$router.push({ name: 'user.profile', params: { userId: user.id } })">
        <p>{{ user.name }}</p>
        <img class="list__image" :src="`https://api.adorable.io/avatars/101/abott@${user.email}.png`" :alt="user.name" />
        <rating v-if="user" :userId="user.id"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      babies: 'user/babies'
    })
  }
}
</script>

