import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/swimmSpeed/:weapon?',
      name: 'swimmSpeed',
      component: () => import('../views/SwimmSpeed.vue'),
      props: true,
    },
    {
      path: '/inkSaverMain/:weapon?',
      name: 'inkSaverMain',
      component: () => import('../views/InkSaverMain.vue'),
      props: true,
    },
    {
      path: '/inkSaverSub/:weapon?',
      name: 'inkSaverSub',
      component: () => import('../views/InkSaverSub.vue'),
      props: true,
    },
    {
      path: '/inkRecoveryUp/:weapon?',
      name: 'inkRecoveryUp',
      component: () => import('../views/InkRecoveryUp.vue'),
      props: true,
    },
    {
      path: '/runSpeed/:weapon?',
      name: 'runSpeed',
      component: () => import('../views/RunSpeed.vue'),
      props: true,
    }
  ]
})

export default router
