import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import useAuthUser from 'src/composables/useAuthUser'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const { isLoggedIn } = useAuthUser()

    if (to.hash.includes('type=recovery') && to.name !== 'reset-password') {
      const accessToken = to.hash.split('&')[0]
      const token = accessToken.replace('#access_token=', '')

      // Redireciona para a página de recuperação de senha com o token
      return next({ name: 'reset-password', query: { token } })
    }

    if (!isLoggedIn() && to.meta.requiresAuth && !Object.keys(to.query).includes('fromEmail')) {
      return next({ name: 'login' })
    }

    next()
  })

  return Router
})
