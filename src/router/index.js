import { createRouter, createWebHistory } from 'vue-router'

import FormularioTecnico from '../views/FormularioTecnico.vue'
import HomeAdministrador from '../views/HomeAdministrador.vue'
import Login from '@/views/Login.vue'


import TelaViatura from '@/views/TelaViatura.vue'
import DashboardView from '../views/DashboardView.vue'
import RelatoriosAdmin from '../views/RelatoriosAdmin.vue'
import RegisterTechnical from '@/views/RegisterTechnical.vue'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/formulario-tecnico',
    name: 'formulario',
    component: FormularioTecnico
  },
  {
    path: '/home-administrador',
    component: HomeAdministrador,
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
    component: TelaViatura
  },
  {
    path: '/relatorios',
    name: 'relatorios',
    component: RelatoriosAdmin
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
