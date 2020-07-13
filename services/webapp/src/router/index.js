import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/plants'
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
    path: '/devices',
    name: 'Devices',
    component: () => import('../views/Devices.vue')
  },
  {
    path: '/devices/add',
    name: 'AddDevice',
    component: () => import('../views/AddDevice.vue')
  },
  {
    path: '/devices/:id',
    name: 'Device',
    component: () => import('../views/Device.vue')
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('../views/System.vue')
  },
  {
    path: '/lab-settings',
    name: 'Settings Lab',
    component: () => import('../views/LabSettings.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
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
