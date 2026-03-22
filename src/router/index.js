import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
   path: '/formulario-tecnico',
    name: 'formulario-tecnico',
    component: () => import('../views/FormularioTecnico.vue')
    },
  ],
})

export default router
