import store from '../../infrastructure/store/store'

// Pages
import Login from './pages/Login'
import SignUp from './pages/signup'

const routes = [
  {
    path: '/auth/login',
    name: 'auth.login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const {state: { auth: { isAuthenticated } }} = store
      return next(!isAuthenticated ? true : { name: 'Index' })
    }
  },
  {
    path: '/auth/signup',
    name: 'auth.signup',
    component: SignUp,
    beforeEnter: (to, from, next) => {
      const {state: { auth: { isAuthenticated } }} = store
      return next(!isAuthenticated ? true : { name: 'Index' })
    }
  }
]

export default routes
