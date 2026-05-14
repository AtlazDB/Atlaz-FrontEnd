<template>

  <div class="tela">

    <Sidebar :nome="nomeUsuario" cargo="Técnico" userType="tecnico" />

    <div class="main">
      <h1>Histórico de Ocorrências</h1>

      <div class="container">
        <div class="searchHeader">
          <div class="searchBar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              height="20"
              width="20"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input type="search" placeholder="Buscar por viatura" v-model="busca_viatura" />
          </div>
          <input
            type="text"
            class="filtro-data"
            placeholder="Data (DD/MM/AAAA)"
            :value="busca_data"
            @input="mascaraData"
            maxlength="10"
          />
        </div>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th>Destino</th>
                <th>Data</th>
                <th>Viatura</th>
                <th>Mais informaçoes</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="registro in registrosFiltrados" :key="registro.id">
                <td>{{ registro.destination }}</td>
                <td>{{ formatarData(registro.dateTime) }}</td>
                <td>{{ registro.vehicle?.prefix }}</td>
                <td>
                  <span class="more-info-btn" @click="openInfo(registro)">•••</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="modalAberto" class="modal-overlay" @click="fecharModal">
          <div class="modal" @click.stop>
            <h2 class="modal-title">Detalhes da Ocorrência</h2>

            <div v-if="registroSelecionado">
              <div class="row">
                <div class="field">
                  <label>Tipo de Ocorrência</label>
                  <input type="text" :value="registroSelecionado.occurrenceType ?? '-'" disabled />
                </div>
                <div class="field">
                  <label>Requisitante</label>
                  <input type="text" :value="registroSelecionado.requester ?? '-'" disabled />
                </div>
              </div>

              <div class="row">
                <div class="field">
                  <label>Destino</label>
                  <input type="text" :value="registroSelecionado.destination ?? '-'" disabled />
                </div>
                <div class="field">
                  <label>Viatura</label>
                  <input type="text" :value="registroSelecionado.vehicle?.prefix ?? '-'" disabled />
                </div>
              </div>

              <div class="row">
                <div class="field">
                  <label>Data Saída</label>
                  <input
                    type="text"
                    :value="formatarData(registroSelecionado.departureDateTime)"
                    disabled
                  />
                </div>
                <div class="field">
                  <label>Hora Saída</label>
                  <input
                    type="text"
                    :value="formatarHora(registroSelecionado.departureDateTime)"
                    disabled
                  />
                </div>
              </div>

              <div class="row">
                <div class="field">
                  <label>Data Chegada</label>
                  <input
                    type="text"
                    :value="formatarData(registroSelecionado.arrivalDateTime)"
                    disabled
                  />
                </div>
                <div class="field">
                  <label>Hora Chegada</label>
                  <input
                    type="text"
                    :value="formatarHora(registroSelecionado.arrivalDateTime)"
                    disabled
                  />
                </div>
              </div>

              <div class="row">
                <div class="field">
                  <label>KM Chegada</label>
                  <input type="text" :value="formatarKm(registroSelecionado.arrivalKm)" disabled />
                </div>
                <div class="field">
                  <label>Justificativa</label>
                  <input type="text" :value="registroSelecionado.justification ?? '-'" disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/views/Sidebar.vue'
import { ref, onMounted, computed } from 'vue'
import { ordemDeServicoService } from '@/services/ordemDeServico.js'

const busca_viatura = ref('')
const busca_data = ref('')
const registros = ref([])
const modalAberto = ref(false)
const registroSelecionado = ref(null)

onMounted(async () => {
  registros.value = await ordemDeServicoService.listar()
})

const registrosFiltrados = computed(() => {
  return registros.value.filter((r) => {
    const viatura = r.vehicle?.prefix?.toLowerCase() ?? ''
    const matchViatura = viatura.includes(busca_viatura.value.toLowerCase())

    const dataFormatada = formatarData(r.dateTime)
    const matchData = busca_data.value === '' || dataFormatada.includes(busca_data.value)

    return matchViatura && matchData
  })
})

function mascaraData(e) {
  let v = e.target.value.replace(/\D/g, '')
  if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2)
  if (v.length > 5) v = v.slice(0, 5) + '/' + v.slice(5)
  busca_data.value = v
}
function formatarData(dataString) {
  if (!dataString) return '-'
  return new Date(dataString).toLocaleDateString('pt-BR')
}

function formatarHora(dataString) {
  if (!dataString) return '-'
  return new Date(dataString).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function formatarKm(km) {
  if (!km) return '-'
  return Number(km).toLocaleString('pt-BR') + ' km'
}

function openInfo(registro) {
  registroSelecionado.value = registro
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
  registroSelecionado.value = null
}
</script>

<style scoped>
.tela {
  display: flex;
  min-height: 100vh;
}

.main {
  flex: 1;
  background-color: #f0f2f5;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
}

h1 {
  color: #003366;
  font-size: 2rem;
  margin-bottom: 40px;
  font-weight: 600;
  max-width: 900px;
}

.container {
  width: 100%;
  max-width: 900px;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.searchHeader {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.searchBar {
  display: flex;
  align-items: center;
  background-color: #f4f6f9;
  border-radius: 6px;
  padding: 0 8px;
  height: 36px;
}

.searchBar svg {
  flex-shrink: 0;
}

.searchBar input {
  width: 160px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 13px;
  height: 100%;
  padding: 0 6px;
}

.filtro-data {
  height: 36px;
  border: none;
  border-radius: 6px;
  background-color: #f4f6f9;
  padding: 0 10px;
  font-size: 13px;
  width: 160px;
  outline: none;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  table-layout: fixed;
}

th,
td {
  padding: 12px 8px;
  font-size: 13px;
  text-align: left;
}

th:nth-child(1),
td:nth-child(1) {
  width: 35%;
}
th:nth-child(2),
td:nth-child(2) {
  width: 25%;
}
th:nth-child(3),
td:nth-child(3) {
  width: 20%;
}
th:nth-child(4),
td:nth-child(4) {
  width: 20%;
}

tr:hover td {
  background-color: #fafafa;
}

.more-info-btn {
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 2px;
  color: #6a5acd;
  user-select: none;
}

td:last-child,
th:last-child {
  text-align: center;
}
.more-info-btn:hover {
  color: #6a5acd;
}

.empty-msg {
  text-align: center;
  color: #999;
  padding: 24px;
  font-size: 14px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 16px;
}

.modal {
  position: relative;
  width: 90%;
  max-width: 700px;
  background: white;
  border-radius: 20px;
  padding: 30px 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-title {
  font-size: 18px;
  color: #003366;
  border-left: 4px solid #003366;
  padding-left: 10px;
  margin-bottom: 8px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.row {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.row .field {
  flex: 1;
  min-width: 0;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.field input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #003366;
  outline: none;
  background: white;
  color: #333;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .main {
    padding: 24px 16px;
  }

  h1 {
    font-size: 1.4rem;
    margin-bottom: 16px;
  }

  .container {
    padding: 12px;
  }

  th,
  td {
    padding: 8px 10px;
    font-size: 12px;
  }

  .modal {
    padding: 24px 20px;
  }

  .row {
    flex-direction: column;
    gap: 8px;
  }

  .row .field {
    width: 100%;
  }
}
</style>
