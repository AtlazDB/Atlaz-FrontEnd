import { createRouter, createWebHistory } from 'vue-router'

import FormularioTecnico from '../views/FormularioTecnico.vue'
import HomeAdministrador from '../views/HomeAdministrador.vue'
import Login from '@/views/Login.vue'

import HistoricoOcorrencias from '@/views/HistoricoOcorrencias.vue'
import VehicleRegister from '@/views/VehicleRegister.vue'
import DashboardView from '../views/DashboardView.vue'
import RelatoriosAdmin from '../views/RelatoriosAdmin.vue'
import UserRegister from '@/views/UserRegister.vue'


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
    component: VehicleRegister
  },
  {
    path: '/relatorios',
    name: 'relatorios',
    component: RelatoriosAdmin
  },
  {
  path: '/tecnicos',
  name: 'tecnicos',
  component: UserRegister
  },
  {
  path: '/ocorrecias',
  name: 'ocorrecias',
  component: HistoricoOcorrencias
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
