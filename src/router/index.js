import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import AppIndex from '@/components/AppIndex.vue'
import Home from '@/components/Home.vue'
import Essay from '@/components/Essay.vue'
import Class from '@/components/Class.vue'
import SelfStudy from '@/components/SelfStudy.vue'
import SelfLearn from '@/components/SelfLearn.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/essay',
          name: 'Essay',
          component: Essay,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/class',
          name: 'Class',
          component: Class,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/selfstudy',
          name: 'SelfStudy',
          component: SelfStudy,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/selflearn',
          name: 'SelfLearn',
          component: SelfLearn,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})

export default router
