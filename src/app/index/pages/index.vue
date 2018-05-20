<template>
  <div class="landing">
    <div class="hero">
      <div class="hero-search">
      <div class="hero-search__background" :style="landingImage" />
      <h1 class="hero-search__heading">
        Find de bedste babysittere i hele landet.
      </h1>

      <div class="search-bar">
        <i class="ion-ios-search-strong search-bar__icon"></i>
        <input v-model="query" type="text" class="form__input search-bar__input" placeholder='Prøv "Babysitter københavn"'>

        <div class="search-bar__button">
          <button class="button button--primary">Søg</button>
        </div>

        <div v-if="results.length" class="search-results">
          <ul class="search-results__list">
            <li
              v-for="result in results"
              :key="result.id"
              @click="$router.push({ name: 'user.profile', params: { userId: result.id } })"
            >
              <input
                  class="search-results__radio"
                  :id="result.id"
                  type="radio"
                  name="search-results"
              />

              <label :for="result.id" class="search-results__item">
                {{ result.name }}
                <rating :showCount="false" :userId="result.id" />
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>

    <div class="feature">
      <div class="feature__heading">
        <h2 class="feature__header">Udvalgte babysittere</h2>
        <p class="feature__subheading">Find en højtvuderet samling af vores bedste babysittere</p>
      </div>
      <div class="feature__row">
       <carousel :perPage="4">
          <slide v-for="sitter in topSitters" :key="sitter.id">
            <div class="review">
            <div class="review__inner">
              <p class="review__body">
                <img  :src="`https://api.adorable.io/avatars/101/abott@${sitter.email}.png`" :alt="sitter.name" />
              </p>
              <rating :showCount="false" :userId="sitter.id" />
              <div class="review_reviewer">
                <p>
                  {{ sitter.name }}
                </p>
              </div>
            </div>
          </div>
          </slide>
        </carousel>
      </div>
    </div>
    
    <br/>

    <div class="feature">
      <div class="feature__heading">
        <h2 class="feature__header">Udvalgte familier</h2>
        <p class="feature__subheading">Find en højtvuderet samling af vores bedste familier</p>
      </div>
      <div class="feature__row">
        <carousel :perPage="4">
          <slide v-for="baby in topBabies" :key="baby.id" >
           <div class="review">
            <div class="review__inner">
              <p class="review__body">
                <img  :src="`https://api.adorable.io/avatars/101/abott@${baby.email}.png`" :alt="baby.name" />
              </p>
              <rating :showCount="false" :userId="baby.id" />
              <div class="review_reviewer">
                <p>
                  {{ baby.name }}
                </p>
              </div>
            </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Fuse from 'fuse.js'

export default {
  data () {
    return {
      currentImage: '/static/images/frontpage/landing-1.jpg',
      slideInterval: null,
      landingImages: [
        '/static/images/frontpage/landing-1.jpg',
        '/static/images/frontpage/landing.jpg',
        '/static/images/frontpage/frontpage.jpg'
      ],
      query: ''
    }
  },
  mounted () {
    this.slideInterval = setInterval(() => {
      const index = Math.floor(Math.random() * this.landingImages.length)
      this.currentImage = this.landingImages[index]
    }, 36 * 1000)
  },
  beforeDestroy () {
    clearInterval(this.slideInterval)
  },
  computed: {
    ...mapGetters({
      sitters: 'user/sitters',
      babies: 'user/babies'
    }),
    topBabies () {
      return this.babies.slice(1, 12)
    },
    topSitters () {
      return this.sitters.slice(1, 12)
    },
    results () {
      const fuse = new Fuse(this.sitters, {
        keys: [
          {
            name: 'location',
            weight: 0.8
          },
          {
            name: 'name',
            weight: 0.4
          }
        ]
      })

      return fuse.search(this.query).splice(1, 5)
    },
    landingImage () {
      return {
        'background-image': 'url(' + this.currentImage + ')'
      }
    }
  }
}
</script>

