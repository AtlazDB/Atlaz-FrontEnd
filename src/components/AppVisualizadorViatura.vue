<script setup>
import { onMounted, ref, computed } from 'vue'
import { viaturaService } from '@/services/viaturaService.js'

const carregando = ref(true)
const registros = ref([])
const status_filtro = ref('')
const busca_filtro = ref('')
const marca_filtro = ref('')

async function carregarTodos() {
  carregando.value = true
  try {
    const viaturas = await viaturaService.listar()
    registros.value = viaturas.map((v) => ({
      id: v.id,
      prefixo: v.prefixo,
      modelo: v.modelo?.nomeModelo,
      marca: v.modelo?.nomeMarca,
      status: v.viaturaStatus,
    }))
  } catch (erro) {
    console.error('Erro: ' + erro)
  } finally {
    carregando.value = false
  }
}

const registrosFiltrados = computed(() => {
  return registros.value.filter((r) => {
    const encontrarStatus = !status_filtro.value || r.viaturaStatus === status_filtro.value

    const encontrarBusca =
      !busca_filtro.value || r.modelo.id.toLowerCase().includes(busca_filtro.value.toLowerCase())

    const encontrarMarca =
      !marca_filtro.value ||
      r.modelo.nomeMarca.toLowerCase().includes(marca_filtro.value.toLowerCase())

    return encontrarStatus && encontrarBusca && encontrarMarca
  })
})

onMounted(() => carregarTodos())
</script>

<template>
  <div class="visualizadorViatura">
    <h1 class="titulo">Viaturas cadastradas</h1>
    <button>Cadastrar nova viatura</button>
    <div class="searchHeader">
      <div class="searchBar">
        <input type="search" placeholder="Buscar por ID" />
      </div>
      <div class="statusFiltro">
        <select v-model="status_filtro">
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
          <option value="EM_USO">Em uso</option>
        </select>
      </div>
    </div>
    <table v-if="registros.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Modelo</th>
          <th>Status</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reg in registrosFiltrados" :key="reg.id">
          <td>{{ reg.prefixo }}</td>
          <td>{{ reg.marca }} {{ reg.modelo }}</td>
          <td :class="reg.status">{{ reg.status }}</td>
          <td>Editar</td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Modelo</th>
          <th>Status</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>H1AN</td>
          <td>Fiat Uno</td>
          <td class="ativo">Ativo</td>
          <td>
            <svg
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.visualizadorViatura {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
}
.searchHeader {
  display: flex;
  height: 20px;
  background: #003366;
}
.searchBar {
  width: 150px;
  background: #b1bdc8;
}
button {
  width: 150px;
}
th,
td {
  text-align: center;
  vertical-align: center;
  border: 1px solid #ccc;
}
/*Tags de status*/
td:nth-child(3) {
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 100px;
}
.ativo {
  background-color: #ebf9f1;
  color: #1f9254;
}
.inativo {
  background-color: #fbe7e8;
  color: #a30d11;
}
.emUso {
  background-color: #fef2e5;
  color: #cd6200;
}
/*Ícone de editar*/
td:nth-child(4) {
  color: #624de3;
  padding-top: 2px;
}
svg {
  cursor: pointer;
}
</style>
