<template>
  <div class="landing">
    <div class="hero">
      <div class="hero-search">
      <div class="hero-search__background" :style="landingImage">
        <!-- Eager load the images -->
        <img v-for="landingImage in landingImages" :key="landingImage" :src="landingImage" style="opacity: 0">
      </div>
      <h1 class="hero-search__heading">
        Find de bedste babysittere i hele landet.
      </h1>

      <div class="search-bar">
        <i class="ion-ios-search-strong search-bar__icon"></i>
        <input type="text" class="form__input search-bar__input" placeholder='Prøv "Babysitter københavn"'>

        <div class="search-bar__button">
          <button class="button button--primary">Søg</button>
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
        <div class="review" v-for="n in 4" :key="n">
          <div class="review__inner">
            <i v-for="n in 5" :key="n" class="ion-ios-star-outline"></i>
             <div class="review_reviewer">
              <p>
                Roland Kock
              </p>
            </div>
            <p class="review__body">
              Det gik meget fint med at få adgang til nøgler, værelset var fint og rent. Indkvarteringen levede fint op til beskrivelsen, og alt i alt meget fredeli...
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <br/>

    <div class="feature">
      <div class="feature__heading">
        <h2 class="feature__header">Udvalgte familier</h2>
        <p class="feature__subheading">Find en højtvuderet samling af vores bedste familier</p>
      </div>
      <div class="feature__row">
        <div class="review" v-for="n in 4" :key="n">
          <div class="review__inner">
            <i v-for="n in 5" :key="n" class="ion-ios-star-outline"></i>
            <div class="review_reviewer">
              <p>
                Roland Kock
              </p>
            </div>
            <p class="review__body">
              Det gik meget fint med at få adgang til nøgler, værelset var fint og rent. Indkvarteringen levede fint op til beskrivelsen, og alt i alt meget fredeli...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentImage: '/static/images/frontpage/landing-1.jpg',
      slideInterval: null,
      landingImages: [
        '/static/images/frontpage/landing-1.jpg',
        '/static/images/frontpage/landing.jpg',
        '/static/images/frontpage/frontpage.jpg'
      ]
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
    landingImage () {
      return {
        'background-image': 'url(' + this.currentImage + ')'
      }
    }
  }
}
</script>

