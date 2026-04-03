import { createRouter, createWebHistory } from 'vue-router'

import FormularioTecnico from '../views/FormularioTecnico.vue'
import HomeAdministrador from '../views/HomeAdministrador.vue'
import TelaPrincipal from '../views/TelaPrincipal.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: TelaPrincipal
  },
  {
    path: '/formulario-tecnico',
    name: 'formulario',
    component: FormularioTecnico
  },
  {
    path: '/home-administrador',
    name: 'administrador',
    component: HomeAdministrador
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router