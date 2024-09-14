import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { requireGuest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { requireGuest: true }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/auth/userView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/auth/logoutView.vue'),
      meta: { requireAuth: true, allowGuestAfterLogout: true } // need to authenticate first and after logout(no authenticated)
    }
  ]
})

router.beforeEach((to, from) => {
  const store = useAuthStore()

  if (to.meta.requireAuth && !store.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  } else if (to.meta.requireGuest && store.isAuthenticated) {
    return { name: 'home' }
  }
})
export default router
