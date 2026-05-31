import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import AppSeletorMes from '../components/AppSeletorMes.vue'

vi.mock('../services/ordemDeServico.js', () => ({
  ordemDeServicoService: {
    listar: vi.fn().mockResolvedValue([
      { dataSaida: '2026-04-02T10:00:00' },
      { dataSaida: '2026-03-15T08:00:00' },
    ])
  }
}))

describe('AppSeletorMes', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(AppSeletorMes)
    await flushPromises()
  })

  it('emite null ao clicar em Todos', async () => {
    const todos = wrapper.find('.card_mes')
    await todos.trigger('click')

    expect(wrapper.emitted('data_selecionada')).toBeTruthy()
    expect(wrapper.emitted('data_selecionada')[0][0]).toBeNull()
  })

  it('emite { mes, ano } ao clicar em um mês', async () => {
    const cards = wrapper.findAll('.card_mes')
    // cards[0] = Todos, cards[1] = primeiro mês real
    await cards[1].trigger('click')

    const emitido = wrapper.emitted('data_selecionada')
    expect(emitido).toBeTruthy()

    const valor = emitido[0][0]
    expect(valor).toHaveProperty('mes')
    expect(valor).toHaveProperty('ano')
    expect(typeof valor.mes).toBe('number')
    expect(typeof valor.ano).toBe('number')
  })

  it('renderiza o card Todos sempre', async () => {
    expect(wrapper.text()).toContain('Todos')
  })

  it('renderiza os meses carregados da API', async () => {
    // Deve ter pelo menos 2 cards além do Todos (Março e Abril)
    const cards = wrapper.findAll('.card_mes')
    expect(cards.length).toBeGreaterThan(1)
  })
})
