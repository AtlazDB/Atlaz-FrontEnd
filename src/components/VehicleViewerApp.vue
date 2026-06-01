<script setup>
import { onMounted, ref, computed } from 'vue'
import { viaturaService } from '@/services/viaturaService.js'

const carregando = ref(false)
const registros = ref([])

const busca_filtro = ref('')
const marca_filtro = ref('')
const tipo_filtro = ref('')
const status_filtro = ref('')
const combustivel_filtro = ref('')

const emit = defineEmits(['editar', 'abrirModal'])

const showInfo = ref(false)
const viaturaInfo = ref(null)
const consumoMedio = ref(null)
const carregandoConsumo = ref(false)

const showAviso = ref(false)
const avisoInfo = ref(null)

const disponiveis = computed(() => registros.value.filter((v) => v.status === 'DISPONIVEL').length)
const emUso = computed(() => registros.value.filter((v) => v.status === 'EM_USO').length)
const manutencao = computed(() => registros.value.filter((v) => v.status === 'MANUTENCAO').length)
const desativadas = computed(() => registros.value.filter((v) => v.status === 'DESATIVADA').length)

async function carregarTodos() {
  carregando.value = true
  try {
    registros.value = await viaturaService.listar()
  } catch (erro) {
    console.error('Erro: ' + erro)
  } finally {
    carregando.value = false
  }
}

function refinarPalavra(palavra) {
  switch (palavra) {
    case 'UTILITARIO':
      palavra = 'UTILITÁRIO'
      break
    case 'DISPONIVEL':
      palavra = 'DISPONÍVEL'
      break
    case 'MANUTENCAO':
      palavra = 'MANUTENÇÃO'
      break
    case 'GNV':
      return 'GNV'
  }
  palavra = palavra.replace('_', ' ')
  palavra = palavra.toLowerCase()
  return palavra[0].toUpperCase() + palavra.substring(1)
}

const registrosFiltrados = computed(() => {
  return registros.value.filter((r) => {
    const encontrarBusca =
      !busca_filtro.value || r.prefix.toLowerCase().includes(busca_filtro.value.toLowerCase())
    const encontrarStatus = !status_filtro.value || r.status === status_filtro.value
    const ocultarStatus = status_filtro.value === 'DESATIVADA' || r.status !== 'DESATIVADA'
    const encontrarTipo = !tipo_filtro.value || r.type === tipo_filtro.value
    const encontrarMarca =
      !marca_filtro.value || r.brand.toLowerCase().includes(marca_filtro.value.toLowerCase())
    const encontrarCombustivel =
      !combustivel_filtro.value || r.fuelType === combustivel_filtro.value
    return (
      encontrarStatus &&
      encontrarBusca &&
      encontrarMarca &&
      encontrarTipo &&
      encontrarCombustivel &&
      ocultarStatus
    )
  })
})

async function openInfo(viatura) {
  viaturaInfo.value = viatura
  showInfo.value = true
  consumoMedio.value = null
  carregandoConsumo.value = true
  try {
    consumoMedio.value = await viaturaService.getConsumoMedio(viatura.id)
  } catch (e) {
    consumoMedio.value = null
  } finally {
    carregandoConsumo.value = false
  }
}

function closeInfo() {
  showInfo.value = false
  viaturaInfo.value = null
  consumoMedio.value = null
}

function edit(viatura) {
  emit('editar', viatura, 'edicao')
}

function precisaManutencao(viatura) {
  return viatura.km >= (viatura.kmTrocaOleo ?? viatura.km + 10000)
}

function openAviso(viatura) {
  avisoInfo.value = viatura
  showAviso.value = true
}

function closeAviso() {
  showAviso.value = false
  avisoInfo.value = null
}

onMounted(() => carregarTodos())
defineExpose({ carregarTodos })
</script>

<template>
  <div class="cards-wrapper">
    <div class="card">
      <div class="card-icon icon-disponivel">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm-1 14.41-3.71-3.7 1.42-1.42L11 13.59l5.29-5.3 1.42 1.42L11 16.41z"/>
        </svg>
      </div>
      <div class="card-info">
        <span class="card-label">DISPONÍVEIS</span>
        <span class="card-value card-green">{{ disponiveis }}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-icon icon-emuso">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
        </svg>
      </div>
      <div class="card-info">
        <span class="card-label">EM USO</span>
        <span class="card-value card-orange">{{ emUso }}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-icon icon-manutencao">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M22.7 19l-9.1-9.1A6 6 0 0 0 4.5 3.4L8 6.9 6.9 8 3.4 4.5A6 6 0 0 0 9.9 13.6l9.1 9.1a1 1 0 0 0 1.4 0l2.3-2.3a1 1 0 0 0 0-1.4z"/>
        </svg>
      </div>
      <div class="card-info">
        <span class="card-label">MANUTENÇÃO</span>
        <span class="card-value card-red">{{ manutencao }}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-icon icon-desativada">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM4 12a8 8 0 0 1 11.29-7.29L4.71 16.29A7.96 7.96 0 0 1 4 12zm8 8a7.96 7.96 0 0 1-4.29-1.71L19.29 7a8 8 0 0 1-7.29 11z"/>
        </svg>
      </div>
      <div class="card-info">
        <span class="card-label">DESATIVADAS</span>
        <span class="card-value card-gray">{{ desativadas }}</span>
      </div>
    </div>
  </div>

  <div class="btn-wrapper">
    <button class="btn-cadastrar" @click="$emit('abrirModal')">Cadastrar nova viatura</button>
  </div>

  <div class="container_tabela">
    <div class="searchHeader">
      <div class="searchBar">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="1.5" stroke="currentColor" height="20" width="20">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
        </svg>
        <input type="search" placeholder="Buscar pelo prefixo" v-model="busca_filtro" />
      </div>
    </div>

    <div class="filtros">
      <select v-model="tipo_filtro">
        <option value="">Tipo</option>
        <option value="UTILITARIO">Utilitário</option>
        <option value="PASSEIO">Passeio</option>
      </select>
      <select v-model="status_filtro">
        <option value="">Status</option>
        <option value="DISPONIVEL">Disponível</option>
        <option value="MANUTENCAO">Manutenção</option>
        <option value="EM_USO">Em uso</option>
        <option value="DESATIVADA">Desativada</option>
      </select>
      <select v-model="combustivel_filtro">
        <option value="">Combustível</option>
        <option value="DIESEL">Diesel</option>
        <option value="ETANOL">Etanol</option>
        <option value="GASOLINA">Gasolina</option>
        <option value="GNV">GNV</option>
        <option value="FLEX">Flex</option>
      </select>
    </div>

    <p style="align-self: center" v-if="registrosFiltrados.length === 0">Sem informação</p>

    <table class="tabela-desktop" v-else>
      <thead>
        <tr>
          <th>Prefixo</th>
          <th>Modelo</th>
          <th>Status</th>
          <th>Mais Informações</th>
          <th>Avisos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reg in registrosFiltrados" :key="reg.id">
          <td>{{ reg.prefix }}</td>
          <td>{{ reg.brand }} {{ reg.model }}</td>
          <td><span class="status-color" :class="reg.status" :title="reg.status"></span></td>
          <td><span class="more-info-btn" @click="openInfo(reg)">•••</span></td>
          <td>
            <div
              class="warning-btn"
              :class="{ ativo: precisaManutencao(reg) }"
              @click="openAviso(reg)"
            >
              !
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="lista-mobile" v-if="registrosFiltrados.length > 0">
      <div class="card-viatura" v-for="reg in registrosFiltrados" :key="reg.id" @click="openInfo(reg)">
        <div class="card-viatura-header">
          <span class="card-viatura-prefix">{{ reg.prefix }}</span>
          <div style="display: flex; align-items: center; gap: 8px">
            <div
              class="warning-btn"
              :class="{ ativo: precisaManutencao(reg) }"
              @click.stop="openAviso(reg)"
            >
              !
            </div>
            <span class="status-color" :class="reg.status"></span>
          </div>
        </div>
        <span class="card-viatura-model">{{ reg.brand }} {{ reg.model }}</span>
        <span class="card-viatura-tipo">{{ refinarPalavra(reg.type) }} · {{ refinarPalavra(reg.fuelType) }}</span>
      </div>
    </div>
  </div>

  <div v-if="showInfo" class="overlay" @click="closeInfo">
    <div class="modal-info" @click.stop>
      <h3 class="modal-title">Informações da Viatura</h3>
      <div class="info-line">
        <span class="info-label">Prefixo</span>
        <span class="info-value">{{ viaturaInfo.prefix }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">Tipo</span>
        <span class="info-value">{{ refinarPalavra(viaturaInfo.type) }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">Combustível</span>
        <span class="info-value">{{ refinarPalavra(viaturaInfo.fuelType) }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">Quilometragem</span>
        <span class="info-value">{{ viaturaInfo.km }} km</span>
      </div>
      <div class="info-line">
        <span class="info-label">Troca de óleo</span>
        <span class="info-value">{{ viaturaInfo.kmTrocaOleo ?? '-' }} km</span>
      </div>
      <div class="info-line">
        <span class="info-label">Consumo médio</span>
        <span class="info-value">
          <span v-if="carregandoConsumo">...</span>
          <span v-else-if="consumoMedio && consumoMedio > 0">{{ consumoMedio }} km/L</span>
          <span v-else>Sem dados</span>
        </span>
      </div>
      <div class="info-line">
        <span class="info-label">CNH necessária</span>
        <span class="info-value">{{ viaturaInfo.tipoCnhNecessaria }}</span>
      </div>
      <button class="btn-edit" @click="() => { edit(viaturaInfo); closeInfo() }">Editar</button>
      <button class="btn-close" @click="closeInfo">X</button>
    </div>
  </div>

  <div v-if="showAviso" class="overlay" @click="closeAviso">
    <div class="modal-info" @click.stop>
      <h3 class="modal-title">Avisos da Viatura</h3>

      <div v-if="precisaManutencao(avisoInfo)" class="info-line">
        <span class="info-label">Troca de óleo</span>
        <span class="info-value">
          Viatura está com {{ avisoInfo.km }} km.
          Troca prevista para {{ avisoInfo.kmTrocaOleo }} km.
        </span>
      </div>

      <div v-else class="info-line">
        <span class="info-value">Nenhum aviso disponível.</span>
      </div>

      <button class="btn-close" @click="closeAviso">X</button>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  width: 80%;
  margin: 40px auto 10px auto;
}

.card {
  flex: 1;
  min-width: 140px;
  background: #ffffff;
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-disponivel { background: #d6f5e6; color: #1aab5e; }
.icon-emuso      { background: #fff0dc; color: #d97706; }
.icon-manutencao { background: #ffe2e0; color: #e53935; }
.icon-desativada { background: #ececec; color: #888888; }

.card-info { display: flex; flex-direction: column; gap: 2px; }

.card-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #888;
  text-transform: uppercase;
  white-space: nowrap;
}

.card-value {
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
}

.card-green  { color: #1aab5e; }
.card-orange { color: #d97706; }
.card-red    { color: #e53935; }
.card-gray   { color: #999; }

.btn-wrapper {
  width: 80%;
  margin: 10px auto 20px auto;
}

.btn-cadastrar {
  background-color: #7aa6cc;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 7px;
  cursor: pointer;
}

.btn-cadastrar:hover { background-color: #457aad; }

.searchHeader {
  display: flex;
  height: 25px;
  margin-bottom: 10px;
}

.searchBar { display: flex; align-items: center; }

.searchBar svg {
  background-color: #f4f6f9;
  border-radius: 5px 0 0 5px;
  cursor: default;
}

.searchBar input {
  width: 160px;
  background-color: #f4f6f9;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  height: 100%;
}

.searchBar input:focus { outline: none; }

select {
  color: #003366;
  border-radius: 15px;
  margin: 0 10px;
}

.tabela-desktop { width: 100%; }

th, td {
  text-align: center;
  vertical-align: middle;
  height: 40px;
}

.status-color {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.DISPONIVEL { background: #d6f5e6; }
.EM_USO     { background: #fff0dc; }
.MANUTENCAO { background: #ffe2e0; }
.DESATIVADA { background: #ececec; }

.more-info-btn {
  color: #624de3;
  padding-top: 2px;
  width: 100px;
  cursor: pointer;
}

.warning-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.warning-btn:hover { transform: scale(1.1); }
.warning-btn.ativo { background-color: #ff0000; }

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 16px;
  box-sizing: border-box;
}

.modal-info {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.modal-title {
  color: #003366;
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
}

.info-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-label { font-weight: 600; color: #555; font-size: 14px; }
.info-value { color: #222; font-size: 14px; }

.btn-edit {
  width: 100%;
  padding: 14px;
  background-color: #003366;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 15px;
}

.btn-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
}

.lista-mobile { display: none; }

.card-viatura {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #f8f9fb;
  margin-bottom: 8px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
}

.card-viatura-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-viatura-prefix { font-weight: 700; font-size: 15px; color: #003366; }
.card-viatura-model  { font-size: 13px; color: #444; }
.card-viatura-tipo   { font-size: 11px; color: #999; margin-top: 2px; }

@media (max-width: 600px) {
  .cards-wrapper {
    width: 95%;
    margin: 16px auto 10px auto;
    gap: 10px;
  }

  .card {
    flex: 1 1 calc(50% - 10px);
    min-width: 0;
    padding: 12px;
  }

  .card-value { font-size: 20px; }

  .btn-cadastrar {
    width: 100%;
    padding: 12px;
    font-size: 15px;
    text-align: center;
  }

  .container_tabela {
    width: 95%;
    padding: 10px;
  }

  .searchHeader {
    flex-direction: column;
    align-items: stretch;
  }

  .searchBar { height: 38px; }
  .searchBar svg { height: 38px; width: 38px; }
  .searchBar input { height: 38px; font-size: 14px; }

  .filtros {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
  }

  select {
    width: 100%;
    height: 34px;
    font-size: 12px;
    padding: 0 6px;
  }

  .tabela-desktop { display: none; }
  .lista-mobile   { display: block; }

  .modal-info { padding: 28px 18px; }

  .warning-btn { margin: 0; }
}
</style>
