import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/activities'
  },
  {
    path: '/activities',
    name: 'Activities',
    component: () => import('../views/Activities.vue')
  },
  {
    path: '/plants',
    name: 'Plants',
    component: () => import('../views/Plants.vue')
  },
  {
    path: '/plants/add',
    name: 'AddPlant',
    component: () => import('../views/AddPlant.vue')
  },
  {
    path: '/plants/:id',
    name: 'Plant',
    component: () => import('../views/Plant.vue')
  },
  {
    path: '/plants/:id/edit',
    name: 'EditPlant',
    component: () => import('../views/EditPlant.vue')
  },
  {
    path: '/house',
    name: 'House',
    component: () => import('../views/House.vue')
  },
  {
    path: '/lab',
    name: 'Lab',
    component: () => import('../views/Lab.vue')
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('../views/System.vue')
  },
  {
    path: '/lab/lab-settings',
    name: 'Settings Lab',
    component: () => import('../views/lab/LabSettings.vue')
  },
  {
    path: '/lab/lab-store-rest-backend',
    name: 'Store REST Backend Lab',
    component: () => import('../views/lab/LabStoreRestBackend.vue')
  },
  {
    path: '/feature-toggles',
    name: 'FeatureToggles',
    component: () => import('../views/FeatureToggles.vue')
  },
  {
    path: '/app-settings',
    name: 'AppSettings',
    component: () => import('../views/AppSettings.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
