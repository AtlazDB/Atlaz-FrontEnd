<script setup>
import { onMounted, ref, computed } from 'vue'
import { vehicleService } from '@/services/vehicleService.js'

const isLoading = ref(false)

const records = ref([])

const searchFilter = ref('')
const brandFilter = ref('')
const typeFilter = ref('')
const statusFilter = ref('')
const fuelFilter = ref('')

const emit = defineEmits(['editar'])

<<<<<<<< HEAD:src/components/AppVehicleVisualizer.vue
async function loadAll() {
  isLoading.value = true

  try {
    records.value = await vehicleService.listar()

    /* Retorna uma lista JSON da seguinte forma:
========
const showInfo = ref(false)
const viaturaInfo = ref(null)

async function carregarTodos() {
  carregando.value = true
  try {
    registros.value = await viaturaService.listar()

    /*Retorna uma lista JSON da seguinte forma:
>>>>>>>> dev:src/components/VehicleViewerApp.vue
    {
      "id": 0,
      "prefix": "string",
      "brand": "string",
      "model": "string",
      "type": "UTILITARIO",
      "status": "DISPONIVEL",
      "fuelType": "GASOLINA",
      "km": 0.1
    }
    */
  } catch (error) {
    console.error('Erro: ' + error)
  } finally {
    isLoading.value = false
  }
}

<<<<<<<< HEAD:src/components/AppVehicleVisualizer.vue
function formatWord(word) {
  switch (word) {
    case 'UTILITARIO':
      word = 'UTILITÁRIO'
      break

    case 'DISPONIVEL':
      word = 'DISPONÍVEL'
      break

    case 'MANUTENCAO':
      word = 'MANUTENÇÃO'
      break

    case 'GNV': // É uma sigla
      return 'GNV'
  }

  word = word.replace('_', ' ')
  word = word.toLowerCase()

  return word[0].toUpperCase() + word.substring(1)
}

const filteredRecords = computed(() => {
  return records.value.filter((record) => {
    const matchesSearch =
      !searchFilter.value ||
      record.prefix.toLowerCase().includes(searchFilter.value.toLowerCase())
========
const registrosFiltrados = computed(() => {
  return registros.value.filter((r) => {
    const encontrarBusca =
      !busca_filtro.value || r.prefix.toLowerCase().includes(busca_filtro.value.toLowerCase())
>>>>>>>> dev:src/components/VehicleViewerApp.vue

    const matchesStatus =
      !statusFilter.value || record.status === statusFilter.value

    // Impossibilita que o usuário visualize viaturas com a tag DESATIVADA,
    // a não ser que ele selecione ela no filtro.
    const hideDisabledStatus =
      statusFilter.value === 'DESATIVADA' ||
      record.status !== 'DESATIVADA'

    const matchesType =
      !typeFilter.value || record.type === typeFilter.value

    const matchesBrand =
      !brandFilter.value ||
      record.brand.toLowerCase().includes(brandFilter.value.toLowerCase())

    const matchesFuel =
      !fuelFilter.value || record.fuelType === fuelFilter.value

    return (
      matchesStatus &&
      matchesSearch &&
      matchesBrand &&
      matchesType &&
      matchesFuel &&
      hideDisabledStatus
    )
  })
})
function openInfo(viatura) {
  viaturaInfo.value = viatura
  showInfo.value = true
}

<<<<<<<< HEAD:src/components/AppVehicleVisualizer.vue
function edit(vehicle) {
  emit('editar', vehicle, 'edicao')
========
function closeInfo() {
  showInfo.value = false
  viaturaInfo.value = null
}
function edit(viatura) {
  emit('editar', viatura, 'edicao')
>>>>>>>> dev:src/components/VehicleViewerApp.vue
}

onMounted(() => loadAll())
defineExpose({ loadAll })
</script>

<template>
  <div class="container_tabela">
    <div class="searchHeader">
      <div class="searchBar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
          height="20"
          width="20"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="search"
          placeholder="Buscar pelo prefixo"
          v-model="searchFilter"
        />
      </div>

      <div
        style="width: 1px; height: max(100%); border-left: 1px solid #cccc; margin: 0 10px 0 10px"
      />

      <select v-model="typeFilter">
        <option value="" selected>Tipo</option>
        <option value="UTILITARIO">Utilitário</option>
        <option value="PASSEIO">Passeio</option>
      </select>

      <select v-model="statusFilter">
        <option value="" selected>Status</option>
        <option value="DISPONIVEL">Disponível</option>
        <option value="MANUTENCAO">Manutenção</option>
        <option value="EM_USO">Em uso</option>
        <option value="DESATIVADA">Desativada</option>
      </select>

      <select v-model="fuelFilter">
        <option value="" selected>Combustível</option>
        <option value="DIESEL">Diesel</option>
        <option value="ETANOL">Etanol</option>
        <option value="GASOLINA">Gasolina</option>
        <option value="GNV">GNV</option>
        <option value="FLEX">Flex</option>
      </select>
    </div>

    <p style="align-self: center" v-if="filteredRecords.length === 0">
      Sem informação
    </p>

    <table v-else>
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
<<<<<<<< HEAD:src/components/AppVehicleVisualizer.vue
        <tr
          v-for="record in filteredRecords"
          :key="record.id"
        >
          <td>{{ record.prefix }}</td>

          <td>
            {{ record.brand }} {{ record.model }}
          </td>

          <td>
            {{ formatWord(record.type) }}
          </td>

          <td>
            {{ formatWord(record.fuelType) }}
          </td>

          <td>
            {{ record.km }}
          </td>

          <td>
            <div :class="record.status">
              {{ formatWord(record.status) }}
            </div>
          </td>

          <td>
            <div class="edit-btn">
              <svg
                @click="edit(record)"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </div>
========
        <tr v-for="reg in registrosFiltrados" :key="reg.id">
          <td>{{ reg.prefix }}</td>
          <td>{{ reg.brand }} {{ reg.model }}</td>

          <td>
            <span class="status-color" :class="reg.status" :title="reg.status"></span>
          </td>

          <td>
            <span class="more-info-btn" @click="openInfo(reg)">•••</span>
>>>>>>>> dev:src/components/VehicleViewerApp.vue
          </td>
        </tr>
      </tbody>
    </table>
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
        <span class="info-value">{{ viaturaInfo.type }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">Combustível</span>
        <span class="info-value">{{ viaturaInfo.fuelType }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">Quilometragem</span>
        <span class="info-value">{{ viaturaInfo.km }} km</span>
      </div>
      <button
        class="btn-edit"
        @click="
          () => {
            edit(viaturaInfo)
            closeInfo()
          }
        "
      >
        Editar
      </button>
      <button class="btn-close" @click="closeInfo">X</button>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.container {
  width: 80%;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.searchHeader {
  display: flex;
  height: 25px;
  margin-bottom: 10px;
}

.searchBar {
  display: flex;
  align-items: center;
}

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

.searchBar input:focus {
  outline: none;
}

select {
  border: 2px solid #003366;
  color: #003366;
  border-radius: 15px;
  margin: 0 10px 0 10px;
}

table {
  width: 100%;
  margin: 0 auto;
}

th,
td {
  text-align: center;
  vertical-align: middle;
  height: 40px;
}

/* Prefixo, modelo, tipo, combustível, quilometragem */
th:nth-child(1),
th:nth-child(2),
th:nth-child(3),
th:nth-child(4),
th:nth-child(5) {
  width: max(200px);
<<<<<<<< HEAD:src/components/AppVehicleVisualizer.vue
}

/* Tags de status */
td:nth-child(6) {
  width: max(100px);
}

td:nth-child(6) div {
  border-radius: 10px;
  width: 100px;
========
  }
/*Tags de status*/
.status-color {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
>>>>>>>> dev:src/components/VehicleViewerApp.vue
}

.DISPONIVEL {
  background-color: #abf5cb;
  color: #0ae972;
}
<<<<<<<< HEAD:src/components/AppVehicleVisualizer.vue

.EM_USO,
========
.EM_USO {
  background-color: #ffc78a;
  color: #cd6200;
}

>>>>>>>> dev:src/components/VehicleViewerApp.vue
.MANUTENCAO {
  background-color: #fc887f;
  color: #cd6200;
}

.DESATIVADA {
  background-color: #fa6d74;
  color: #a30d11;
}

<<<<<<<< HEAD:src/components/AppVehicleVisualizer.vue
/* Ícone de editar */
td:nth-child(7) {
========
/*Ícone de editar*/
.more-info-btn {
>>>>>>>> dev:src/components/VehicleViewerApp.vue
  color: #624de3;
  padding-top: 2px;
  width: 100px;
  cursor: pointer;
}

<<<<<<<< HEAD:src/components/AppVehicleVisualizer.vue
.edit-btn {
========
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
>>>>>>>> dev:src/components/VehicleViewerApp.vue
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal-info {
  background: white;
  border-radius: 12%;
  padding: 40px;
  width: 400px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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

.info-label {
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.info-value {
  color: #222;
  font-size: 14px;
}

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

svg {
  cursor: pointer;
}
</style>
