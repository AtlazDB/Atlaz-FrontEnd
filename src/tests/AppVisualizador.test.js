import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import AppVisualizador from '../components/AppVisualizador.vue'

// Mock dos services para não fazer chamadas HTTP reais
vi.mock('../services/abastecimentoService.js', () => ({
  abastecimentoService: {
    listar: vi.fn(),
    listarPorMes: vi.fn(),
  }
}))

vi.mock('../services/ordemDeServico.js', () => ({
  ordemDeServicoService: {
    listar: vi.fn(),
    listarPorMes: vi.fn(),
    exportarCsv: vi.fn(),
  }
}))

import { abastecimentoService } from '../services/abastecimentoService.js'
import { ordemDeServicoService } from '../services/ordemDeServico.js'

const ordemFake = {
  id: 1,
  tipoServico: 'ADMINISTRATIVO',
  localDestino: 'Taubaté',
  justificativa: 'Teste',
  requisitante: 'Fulano',
  kmSaida: 100,
  kmChegada: 200,
  dataSaida: '2026-04-02T17:36:00',
  dataRetorno: '2026-04-02T18:00:00',
  viatura: {
    prefixo: 'US01',
    modelo: { nomeModelo: 'Prisma' }
  }
}

const abastecimentoFake = {
  id: 1,
  litros: 30,
  valorTotal: 150,
  numeroNotaFiscal: 'NF-001',
  ordemServico: { id: 1 }
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('AppVisualizador', () => {
  it('exibe "Carregando..." enquanto busca os dados', async () => {
    // Segura a promise para o componente ficar em estado de carregando
    ordemDeServicoService.listar.mockReturnValue(new Promise(() => {}))
    abastecimentoService.listar.mockReturnValue(new Promise(() => {}))

    const wrapper = mount(AppVisualizador, {
      props: { filtro: null }
    })

    expect(wrapper.text()).toContain('Carregando...')
  })

  it('exibe "Sem informação" quando não há registros', async () => {
    ordemDeServicoService.listar.mockResolvedValue([])
    abastecimentoService.listar.mockResolvedValue([])

    const wrapper = mount(AppVisualizador, {
      props: { filtro: null }
    })

    await flushPromises()
    expect(wrapper.text()).toContain('Sem informação')
  })

  it('renderiza a tabela quando há registros', async () => {
    ordemDeServicoService.listar.mockResolvedValue([ordemFake])
    abastecimentoService.listar.mockResolvedValue([abastecimentoFake])

    const wrapper = mount(AppVisualizador, {
      props: { filtro: null }
    })

    await flushPromises()
    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.text()).toContain('US01')
  })

  it('formatarData converte corretamente', async () => {
    ordemDeServicoService.listar.mockResolvedValue([ordemFake])
    abastecimentoService.listar.mockResolvedValue([])

    const wrapper = mount(AppVisualizador, {
      props: { filtro: null }
    })

    await flushPromises()
    expect(wrapper.text()).toContain('02/04/2026')
  })

  it('formatarHora exibe só HH:mm', async () => {
    ordemDeServicoService.listar.mockResolvedValue([ordemFake])
    abastecimentoService.listar.mockResolvedValue([])

    const wrapper = mount(AppVisualizador, {
      props: { filtro: null }
    })

    await flushPromises()
    expect(wrapper.text()).toContain('17:36')
  })

  it('exibe - quando abastecimento está ausente', async () => {
    ordemDeServicoService.listar.mockResolvedValue([ordemFake])
    abastecimentoService.listar.mockResolvedValue([]) // sem abastecimento

    const wrapper = mount(AppVisualizador, {
      props: { filtro: null }
    })

    await flushPromises()
    const celulas = wrapper.findAll('td')
    // últimas 3 colunas: litros, valor, nota fiscal
    const textos = celulas.map(c => c.text())
    const tracos = textos.filter(t => t === '-')
    expect(tracos.length).toBeGreaterThanOrEqual(3)
  })
})
