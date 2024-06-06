import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('@/views/GroupsView.vue')
    },
    {
      path: '/groups/:id',
      name: 'group',
      component: () => import('@/views/GroupView.vue')
    },
    {
      path: '/tests',
      name: 'tests',
      component: () => import('@/views/TestsView.vue')
    },
    {
      path: '/tests/:id',
      name: 'test',
      component: () => import('@/views/TestView.vue')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('@/views/UserView.vue')
    },
    {
      path: '/tests/pass/:uuid',
      name: 'test pass',
      component: () => import('@/views/TestPassView.vue')
    },
    {
      path: '/completions/:id',
      name: 'completion',
      component: () => import('@/views/AnswersView.vue')
    },
    {
      path: '/tests/create',
      name: 'create test',
      component: () => import('@/components/EditableQuestionsList.vue')
    },
    // @ts-expect-error there is no type for beforeEnter route that redirects somewhere
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: () => {
        useAuthStore().logout()
        router.push('/login')
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const store = useAuthStore()
  if (!store.isAuthenticated && !['index', 'login', 'register'].includes(to.name as string)) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  // const isTeacher = store.user?.is_teacher ?? false
  // console.log(isTeacher)
  // if (!isTeacher && !['test pass', 'completion', 'index', 'login', 'register'].includes(to.name as string)) {
  //   return { name: 'index' }
  // }
})

export default router
