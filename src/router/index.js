import { createRouter, createWebHistory } from 'vue-router'

import TechnicianForm from '../views/TechnicianForm.vue'
import HomeAdmin from '../views/HomeAdmin.vue'
import LoginUser from '@/views/LoginUser.vue'
import VehiclePage from '@/views/VehiclePage.vue'
import DashboardView from '../views/DashboardView.vue'
import AdminReports from '../views/AdminReports.vue'
import RegisterTechnical from '../views/RegisterTechnical.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginUser
  },
  {
    path: '/formulario-tecnico',
    name: 'formulario',
    component: TechnicianForm
  },
  {
    path: '/home-administrador',
    component: HomeAdmin,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardView
      }
    ]
  },
  {
    path: '/abastecimento',
    name: 'abastecimento',
    component: () => import('@/views/RefuellingScreen.vue')
  },
  {
    path: '/tabela-viaturas',
    name: 'viaturas',
    component: VehiclePage
  },
  {
    path: '/relatorios',
    name: 'relatorios',
    component: AdminReports
  },
  {
  path: '/tecnicos',
  name: 'tecnicos',
  component: RegisterTechnical
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
