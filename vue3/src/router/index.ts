import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
const Subassembly = () => import('@/views/Subassembly.vue')
const LogIn = () => import('@/views/LogIn/index.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
      redirect: '/Subassembly',
      children: [
        {
          path: '/Subassembly',
          name: 'Subassembly',
          component: Subassembly
        },
        {
          path: '/LogIn',
          name: 'LogIn',
          component: LogIn
        },
      ]
    },
  ],
})

export default router
