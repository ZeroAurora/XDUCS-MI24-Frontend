import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/posts',
      name: 'post_list',
      component: () => import('../views/PostListView.vue'),
    },
    {
      path: '/posts/:id',
      name: 'post_detail',
      component: () => import('../views/PostDetailView.vue'),
    },
    {
      path: '/notifications',
      name: 'notification',
      component: () => import('../views/NotificationView.vue'),
    },
  ],
})

export default router
