import { createRouter, createWebHistory } from 'vue-router'
import FormularioTecnico from '../views/FormularioTecnico.vue'

const routes = [
    {
      path: '/',
      name: 'formulario-tecnico',
      component: FormularioTecnico
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router