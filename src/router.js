import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterConfig from './router.config.json'

Vue.use(VueRouter)

const registerRoute = (config) => {
  let arrayRoutes = []
  config.map(page =>
    arrayRoutes.push({
      meta: page.meta,
      path: page.path,
      name: page.name,
      component: require(`@/views${page.filePath}`)
    })
  )

  return {arrayRoutes, pages: config}
}

const routes = registerRoute(RouterConfig).arrayRoutes

const router = new VueRouter({
  base: '/admin/',
  mode: 'history',
  fallback: false,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})

let indexScrollTop = 0
router.beforeEach((route, redirect, next) => {
  let title = route.meta.title + '-爱康'
  document.title = title || ''
  if (route.hash !== '') {
    const id = route.hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) element.scrollIntoView()
  }
  if (route.path !== '/') {
    indexScrollTop = document.body.scrollTop
  }
  next()
})

router.afterEach(route => {
  if (route.hash !== '') {
    const id = route.hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) element.scrollIntoView()
  }
  if (route.path !== '/') {
    document.body.scrollTop = 0
  } else {
    Vue.nextTick(() => {
      document.body.scrollTop = indexScrollTop
    })
  }
})

export default router // eslint-disable-next-line
