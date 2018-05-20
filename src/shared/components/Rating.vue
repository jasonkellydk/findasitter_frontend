<template>
  <div>
    <template v-if="isReady">
      <star-rating read-only :show-rating="false" :star-size="30" :rating="ratingValue" />
      <p v-if="showCount" class="text-center">antal ratings: {{ ratings.length }}</p>
    </template>
    <p v-else>langsom net loader..</p>
  </div>
</template>

<style lang="scss" scoped>
  .text-center {
    text-align: center;
  }
</style>

<script>
export default {
  data () {
    return {
      isReady: false
    }
  },
  props: {
    userId: {
      required: true
    },
    showCount: {
      required: false,
      default: true
    }
  },
  mounted () {
    this.$store.dispatch('rating/findAllByUser', {
      userId: this.userId,
      cb: this.setReady
    })
  },
  methods: {
    setReady () {
      this.isReady = true
    }
  },
  computed: {
    ratings () {
      return this.$store.getters['rating/getRatingsByUser'](this.userId)
    },
    ratingValue () {
      const ratings = this.ratings
      let sum = 0

      ratings.forEach(rating => {
        sum += rating.rating
      })

      return Math.floor(sum / ratings.length)
    }
  }
}
</script>
