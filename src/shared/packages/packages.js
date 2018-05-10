import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueSeo from '@deveodk/vue-seo'

const API_URL = process.env.API_URL

Vue.use(VueAxios, axios)
axios.defaults.baseURL = API_URL

Vue.use(vueSeo)

Vue.use(VueAxios, axios)
axios.defaults.baseURL = ''
