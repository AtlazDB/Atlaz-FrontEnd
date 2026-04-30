import { createRouter, createWebHistory } from 'vue-router'

import FormularioTecnico from '../views/FormularioTecnico.vue'
import HomeAdministrador from '../views/HomeAdministrador.vue'
import Login from '@/views/Login.vue'
import TelaPrincipal from '../views/TelaPrincipal.vue'
import AppVisualizadorViatura from '../components/AppVisualizadorViatura.vue'
import TelaViatura from '@/views/TelaViatura.vue'
import DashboardView from '../views/DashboardView.vue'
import RelatoriosAdmin from '../views/RelatoriosAdmin.vue'

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
    path: '/tabela-viaturas',
    name: 'viaturas',
    component: TelaViatura
  },
    {
    path: '/relatorios',
    name: 'relatorios',
    component: RelatoriosAdmin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router