import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import(/* webpackChunkName: "article" */ '../views/Article.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/mine/:id',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/Mine.vue')
  },
  {
    path: '/writing',
    name: 'WritingArticle',
    component: () => import(/* webpackChunkName: "WritingArticle" */ '../views/WritingArticle.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
