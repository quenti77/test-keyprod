import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardPage from '@/views/DashboardPage'

Vue.use(VueRouter)

const IndexOrder = () => import(/* webpackChunkName: "group-orders" */ '@/views/Orders/IndexPage')
const ShowOrder = () => import(/* webpackChunkName: "group-orders" */ '@/views/Orders/ShowPage')

const routes = [
  { path: '/', component: DashboardPage },
  { path: '/orders', component: IndexOrder },
  { path: '/orders/:orderId', name: 'orderShow', component: ShowOrder },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})

export default router
