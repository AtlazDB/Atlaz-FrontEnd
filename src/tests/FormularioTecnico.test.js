import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import FormularioTecnico from '../views/FormularioTecnico.vue'

// Mock dos services
vi.mock('../services/viaturaService.js', () => ({
  viaturaService: {
    listar: vi.fn().mockResolvedValue([
      {
        id: 1,
        prefixo: 'US01',
        modelo: { nomeModelo: 'Prisma' }
      }
    ])
  }
}))

vi.mock('../services/ordemDeServico.js', () => ({
  ordemDeServicoService: {
    listaTipos: vi.fn().mockResolvedValue(['ADMINISTRATIVO', 'AUDITORIA']),
    salvar: vi.fn().mockResolvedValue({ id: 1 }),
  }
}))

vi.mock('../services/abastecimentoService.js', () => ({
  abastecimentoService: {
    criar: vi.fn().mockResolvedValue({}),
  }
}))

// Mock do Sidebar para não precisar de dependências extras
vi.mock('../views/Sidebar.vue', () => ({
  default: { template: '<div/>' }
}))

// Suprime o alert do jsdom nos testes
vi.stubGlobal('alert', vi.fn())

describe('FormularioTecnico', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(FormularioTecnico)
    await flushPromises()
  })

  it('validarData aceita data válida', () => {
    const resultado = wrapper.vm.validarData('02/04/2026')
    expect(resultado).toBe(true)
  })

  it('validarData rejeita formato errado', () => {
    expect(wrapper.vm.validarData('2026-04-02')).toBe(false)
  })

  it('validarData rejeita data inexistente', () => {
    expect(wrapper.vm.validarData('31/02/2026')).toBe(false)
  })

  it('validarData rejeita string vazia', () => {
    expect(wrapper.vm.validarData('')).toBe(false)
  })

  it('kmPercorrido calcula corretamente', () => {
    wrapper.vm.SaidaKM = '100'
    wrapper.vm.ChegadaKM = '250'
    expect(wrapper.vm.kmPercorrido).toBe('150.00')
  })

  it('kmPercorrido retorna 0 com campos vazios', () => {
    wrapper.vm.SaidaKM = ''
    wrapper.vm.ChegadaKM = ''
    expect(wrapper.vm.kmPercorrido).toBe(0)
  })

  it('validarFormulario retorna false com campos obrigatórios vazios', () => {
    // todos os campos começam vazios
    const resultado = wrapper.vm.validarFormulario()
    expect(resultado).toBe(false)
  })

  it('validarFormulario retorna true com todos os campos obrigatórios preenchidos', () => {
    wrapper.vm.viaturaSelecionada = 1
    wrapper.vm.ocorrenciaSelecionada = 'ADMINISTRATIVO'
    wrapper.vm.requisitante = 'Fulano'
    wrapper.vm.destinoSelecionado = 'Taubaté'
    wrapper.vm.SaidaKM = '100'
    expect(wrapper.vm.validarFormulario()).toBe(true)
  })

  it('resetarFormulario limpa todos os campos', () => {
    wrapper.vm.viaturaSelecionada = 1
    wrapper.vm.ocorrenciaSelecionada = 'ADMINISTRATIVO'
    wrapper.vm.requisitante = 'Fulano'
    wrapper.vm.SaidaKM = '100'
    wrapper.vm.Litros = '30'

    wrapper.vm.resetarFormulario()

    expect(wrapper.vm.viaturaSelecionada).toBe('')
    expect(wrapper.vm.ocorrenciaSelecionada).toBe('')
    expect(wrapper.vm.requisitante).toBe('')
    expect(wrapper.vm.SaidaKM).toBe('')
    expect(wrapper.vm.Litros).toBe('')
  })
})
