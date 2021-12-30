import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Register from '@/views/register/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router
