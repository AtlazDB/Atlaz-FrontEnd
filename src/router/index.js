import { createRouter, createWebHistory } from 'vue-router'

import TechnicianForm from '../views/TechnicianForm.vue'
import HomeAdmin from '../views/HomeAdmin.vue'
import Login from '@/views/Login.vue'
import VehiclePage from '@/views/VehiclePage.vue'
import DashboardView from '../views/DashboardView.vue'
import AdminReports from '../views/AdminReports.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
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
    path: '/tabela-viaturas',
    name: 'viaturas',
    component: VehiclePage
  },
    {
    path: '/relatorios',
    name: 'relatorios',
    component: AdminReports
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
