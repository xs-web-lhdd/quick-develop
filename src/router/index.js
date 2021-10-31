import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import storage from '../utils/storage'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      keepAlive: true
    },
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
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    // 防止用户登陆后再通过路由跳转到登录界面：
    beforeEnter (to, from, next) {
      const isLogin = storage.getItem('isLogin')
      if (isLogin) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    // 防止用户登陆后再通过路由跳转到登录界面：
    beforeEnter (to, from, next) {
      const isLogin = storage.getItem('isLogin')
      if (isLogin) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
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
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  }
  // {
  //   path: '/replyLayer',
  //   name: 'ReplyLayer',
  //   component: () => import(/* webpackChunkName: "replyLayer" */ '../components/ReplyLayer.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 防止用户没有登录就直接进首页：
  const isLogin = storage.getItem('isLogin')
  if (!isLogin && (to.name !== 'Login' && to.name !== 'Register')) {
    next({ name: 'Login' })
  } else if (to.name === undefined) {
    // 没匹配到就是 404 页面
    next({ name: '404' })
  } else {
    next()
  }
})

export default router
