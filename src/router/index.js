import { createRouter, createWebHistory } from 'vue-router'
import Header from '../views/header.vue'
import Login from '../views/login.vue';
import Register from '../views/register.vue';
import Dashboard from '../views/dashboard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'index', component: Header, meta: { guest: true } },
    {
      path: '/login', name: 'login', component: Login, meta: { guest: true }
    },
    { path: '/register', name: 'register', component: Register, meta: { guest: true } },
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },

  ]
})


router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') !== null) {
      next()
      return
    }
    next('/login')
  }
  else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token') !== null) {
      
      if (to.path == '/') {
        next()
        return
      }
      else {
        next('/dashboard')
        return
      }

    }
    next()
  }
  else {
    next()
  }
})
export default router
