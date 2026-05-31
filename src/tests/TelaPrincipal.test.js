import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import TelaPrincipal from '../views/TelaPrincipal.vue'

// Cria um router novo para cada teste, evitando estado compartilhado
function criarRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: TelaPrincipal },
      { path: '/home-administrador', component: { template: '<div/>' } },
      { path: '/formulario-tecnico', component: { template: '<div/>' } },
    ]
  })
}

describe('TelaPrincipal', () => {
  it('renderiza os dois botões', () => {
    const wrapper = mount(TelaPrincipal, {
      global: { plugins: [criarRouter()] }
    })
    const botoes = wrapper.findAll('button')
    expect(botoes).toHaveLength(2)
    expect(botoes[0].text()).toBe('Administrador')
    expect(botoes[1].text()).toBe('Técnico')
  })

  it('navega para /home-administrador ao clicar em Administrador', async () => {
    const router = criarRouter()
    const wrapper = mount(TelaPrincipal, {
      global: { plugins: [router] }
    })
    await wrapper.findAll('button')[0].trigger('click')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/home-administrador')
  })

  it('navega para /formulario-tecnico ao clicar em Técnico', async () => {
    const router = criarRouter()
    const wrapper = mount(TelaPrincipal, {
      global: { plugins: [router] }
    })
    await wrapper.findAll('button')[1].trigger('click')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/formulario-tecnico')
  })
})
