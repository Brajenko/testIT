import { createRouter, createWebHistory } from 'vue-router'
import Test from '@/components/Test.vue'
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Index from '@/components/Index.vue'
import Logout from '@/components/Logout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/test/:test_uuid',
      name: 'test',
      component: Test
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
  ]
})

export default router
