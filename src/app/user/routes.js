// Pages
import Profile from './pages/Profile'
import store from '../../infrastructure/store/store'

const routes = [
  {
    path: '/user/profile/:userId',
    name: 'user.profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      const {params: { userId }} = to
      const {state: {user: { users }}} = store
      const index = users.findIndex(user => user.id === userId)

      return next(index !== -1 ? true : { name: 'Index' })
    }
  }
]

export default routes
