<script setup>
import { onMounted, ref, computed } from 'vue'
import { vehicleService } from '@/services/vehicleService.js'

const carregando = ref(false)

const registros = ref([
  {
    id: 1,
    prefix: 'H1AN',
    brand: 'Fiat',
    model: 'Uno',
    type: 'UTILITARIO',
    status: 'DISPONIVEL',
    fuelType: 'GASOLINA',
    km: 45230,
  },
  {
    id: 2,
    prefix: 'K9XZ',
    brand: 'Chevrolet',
    model: 'Onix',
    type: 'UTILITARIO',
    status: 'EM_USO',
    fuelType: 'FLEX',
    km: 28910,
  },
  {
    id: 3,
    prefix: 'P3TR',
    brand: 'Volkswagen',
    model: 'Gol',
    type: 'PASSEIO',
    status: 'MANUTENCAO',
    fuelType: 'GNV',
    km: 67300,
  },
  {
    id: 4,
    prefix: 'Z7LM',
    brand: 'Toyota',
    model: 'Hilux',
    type: 'PASSEIO',
    status: 'DESATIVADA',
    fuelType: 'DIESEL',
    km: 112450,
  },
  {
    id: 5,
    prefix: 'Q2WE',
    brand: 'Renault',
    model: 'Kwid',
    type: 'UTILITARIO',
    status: 'EM_USO',
    fuelType: 'FLEX',
    km: 15870,
  },
])

const busca_filtro = ref('')
const marca_filtro = ref('')
const tipo_filtro = ref('')
const status_filtro = ref('')
const combustivel_filtro = ref('')

const emit = defineEmits(['editar'])

async function carregarTodos() {
  carregando.value = true
  try {
    registros.value = await vehicleService.listar()
    /*Retorna uma lista JSON da seguinte forma:
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
    case 'GNV': //É uma sigla
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
    // Impossibilita que o usuário visualize viaturas com a tag DESATIVADA, a não ser que ele selecione ela no filtro.
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

function edit(viatura) {
  emit('editar', viatura, 'edicao')
}

onMounted(() => carregarTodos())
</script>

<template>
  <div class="container">
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
        <input type="search" placeholder="Buscar pelo prefixo" v-model="busca_filtro" />
      </div>
      <div
        style="width: 1px; height: max(100%); border-left: 1px solid #cccc; margin: 0 10px 0 10px"
      />
      <select v-model="tipo_filtro">
        <option value="" selected>Tipo</option>
        <option value="UTILITARIO">Utilitário</option>
        <option value="PASSEIO">Passeio</option>
      </select>
      <select v-model="status_filtro">
        <option value="" selected>Status</option>
        <option value="DISPONIVEL">Disponível</option>
        <option value="MANUTENCAO">Manutenção</option>
        <option value="EM_USO">Em uso</option>
        <option value="DESATIVADA">Desativada</option>
      </select>
      <select v-model="combustivel_filtro">
        <option value="" selected>Combustível</option>
        <option value="DIESEL">Diesel</option>
        <option value="ETANOL">Etanol</option>
        <option value="GASOLINA">Gasolina</option>
        <option value="GNV">GNV</option>
        <option value="FLEX">Flex</option>
      </select>
    </div>
    <p style="align-self: center" v-if="registrosFiltrados.length === 0">Sem informação</p>
    <table v-else>
      <thead>
        <tr>
          <th>Prefixo</th>
          <th>Modelo</th>
          <th>Tipo</th>
          <th>Combustível</th>
          <th>Quilometragem</th>
          <th>Status</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reg in registrosFiltrados" :key="reg.id">
          <td>{{ reg.prefix }}</td>
          <td>{{ reg.brand }} {{ reg.model }}</td>
          <td>{{ refinarPalavra(reg.type) }}</td>
          <td>{{ refinarPalavra(reg.fuelType) }}</td>
          <td>{{ reg.km }}</td>
          <td>
            <div :class="reg.status">
              {{ refinarPalavra(reg.status) }}
            </div>
          </td>
          <td>
            <div class="editar-btn">
              <svg
                @click="edit(reg)"
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.container {
  width: 100%;
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
  width: 90%;
  align-self: center;
}
th,
td {
  text-align: center;
  vertical-align: middle;
  height: 40px;
}
/*Prefixo, modelo, tipo, combustível, quilometragem*/
th:nth-child(1),
th:nth-child(2),
th:nth-child(3),
th:nth-child(4),
th:nth-child(5) {
  width: max(200px);
}
/*Tags de status*/
td:nth-child(6) {
  width: max(100px);
}
td:nth-child(6) div {
  border-radius: 10px;
  width: 100px;
}
.DISPONIVEL {
  background-color: #ebf9f1;
  color: #1f9254;
}
.EM_USO,
.MANUTENCAO {
  background-color: #fef2e5;
  color: #cd6200;
}
.DESATIVADA {
  background-color: #fbe7e8;
  color: #a30d11;
}
/*Ícone de editar*/
td:nth-child(7) {
  color: #624de3;
  padding-top: 2px;
  width: 100px;
}
.editar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
svg {
  cursor: pointer;
}
</style>
