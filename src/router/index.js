import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardPage from '@/views/DashboardPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', component: DashboardPage
  },
  {
    path: '*', redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
