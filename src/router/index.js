import { createRouter, createWebHistory } from 'vue-router'

import TechnicalForm from '../views/TechnicalForm.vue'
import AdminHome from '../views/AdminHome.vue'
import MainScreen from '../views/MainScreen.vue'
import AppVehicleViewer from '../components/AppVehicleViewer.vue'
import VehicleScreen from '@/views/VehicleScreen.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainScreen
  },
  {
    path: '/technical-form',
    name: 'form',
    component: TechnicalForm
  },
  {
    path: '/admin-home',
    name: 'admin',
    component: AdminHome
  },
  {
    path: '/vehicle-table',
    name: 'vehicles',
    component: VehicleScreen
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router