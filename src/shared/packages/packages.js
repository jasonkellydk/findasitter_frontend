import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueSeo from '@deveodk/vue-seo'
import VeeValidate from 'vee-validate'
import StarRating from 'vue-star-rating'
import VueCarousel from 'vue-carousel'
import VueFuse from 'vue-fuse'

const API_URL = process.env.API_URL

Vue.use(VueAxios, axios)
axios.defaults.baseURL = API_URL

Vue.use(vueSeo)
Vue.use(VueCarousel)

Vue.use(VueAxios, axios)
axios.defaults.baseURL = ''

Vue.use(VeeValidate)
Vue.component('star-rating', StarRating)
Vue.use(VueFuse)
