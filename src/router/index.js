import { createRouter, createWebHistory } from 'vue-router'

import TechnicianForm from '../views/TechnicianForm.vue'
import HomeAdmin from '../views/HomeAdmin.vue'
import Login from '@/views/Login.vue'
<<<<<<< HEAD
import VehiclePage from '@/views/VehiclePage.vue'
import DashboardView from '../views/DashboardView.vue'
import AdminReports from '../views/AdminReports.vue'
=======


import TelaViatura from '@/views/TelaViatura.vue'
import DashboardView from '../views/DashboardView.vue'
import RelatoriosAdmin from '../views/RelatoriosAdmin.vue'
import RegisterTechnical from '@/views/RegisterTechnical.vue'

>>>>>>> origin/dev

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
    path: '/abastecimento',
    name: 'abastecimento',
    component: () => import('@/views/TelaAbastecimento.vue')
  },
  {
    path: '/tabela-viaturas',
    name: 'viaturas',
    component: VehiclePage
  },
  {
    path: '/relatorios',
    name: 'relatorios',
<<<<<<< HEAD
    component: AdminReports
=======
    component: RelatoriosAdmin
  },
  {
  path: '/tecnicos',
  name: 'tecnicos',
  component: RegisterTechnical
>>>>>>> origin/dev
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
