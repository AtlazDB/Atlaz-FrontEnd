<script setup>
import { onMounted, ref, computed } from 'vue'
import { viaturaService } from '@/services/viaturaService.js'

const carregando = ref(true)
const registros = ref([
  {
    id: 1,
    prefixo: 'AAA',
    tipo: 'UTILITARIO',
    viaturaStatus: 'DISPONIVEL',
    modelo: {
      id: 1,
      nomeModelo: 'Civic',
      nomeMarca: 'Honda',
    },
  },
  {
    id: 2,
    prefixo: 'AAB',
    tipo: 'PASSEIO',
    viaturaStatus: 'EM_USO',
    modelo: {
      id: 2,
      nomeModelo: 'Uno',
      nomeMarca: 'Fiat',
    },
  },
  {
    id: 3,
    prefixo: 'AAC',
    tipo: 'UTILITARIO',
    viaturaStatus: 'MANUTENCAO',
    modelo: {
      id: 3,
      nomeModelo: 'HB20',
      nomeMarca: 'Hyundai',
    },
  },
  {
    id: 4,
    prefixo: 'AAD',
    tipo: 'PASSEIO',
    viaturaStatus: 'DESATIVADA',
    modelo: {
      id: 4,
      nomeModelo: 'Celta',
      nomeMarca: 'Fiat',
    },
  },
])
const busca_filtro = ref('')
const marca_filtro = ref('')
const tipo_filtro = ref('')
const status_filtro = ref('')

async function carregarTodos() {
  carregando.value = true
  try {
    registros.value = await viaturaService.listar()
    /*Retorna uma lista JSON da seguinte forma:
    {
      "id": 0,
      "prefixo": "string",
      "tipo": "UTILITARIO",
      "viaturaStatus": "ATIVO",
      "modelo": {
        "id": 0,
        "nomeModelo": "string",
        "nomeMarca": "string"
      }
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
  }
  palavra = palavra.replace('_', ' ')
  palavra = palavra.toLowerCase()
  return palavra[0].toUpperCase() + palavra.substring(1)
}

const registrosFiltrados = computed(() => {
  return registros.value.filter((r) => {
    const encontrarBusca =
      !busca_filtro.value || r.prefixo.toLowerCase().includes(busca_filtro.value.toLowerCase())

    const encontrarStatus = !status_filtro.value || r.viaturaStatus === status_filtro.value

    const encontrarTipo = !tipo_filtro.value || r.tipo === tipo_filtro.value

    const encontrarMarca =
      !marca_filtro.value ||
      r.modelo.nomeMarca.toLowerCase().includes(marca_filtro.value.toLowerCase())

    return encontrarStatus && encontrarBusca && encontrarMarca && encontrarTipo
  })
})

//onMounted(() => carregarTodos())
</script>

<template>
  <div class="container">
    <div class="searchHeader">
      <div class="searchBar">
        <input type="search" placeholder="Buscar pelo prefixo" v-model="busca_filtro" />
      </div>
      <select v-model="tipo_filtro">
        <option value="">Selecionar</option>
        <option value="UTILITARIO">Utilitário</option>
        <option value="PASSEIO">Passeio</option>
      </select>
      <select v-model="status_filtro">
        <option value="">Selecionar</option>
        <option value="DISPONIVEL">Disponível</option>
        <option value="MANUTENCAO">Manutenção</option>
        <option value="EM_USO">Em uso</option>
        <option value="DESATIVADA">Desativada</option>
      </select>
    </div>
    <table v-if="registros.length > 0">
      <thead>
        <tr>
          <th>Prefixo</th>
          <th>Modelo</th>
          <th>Tipo</th>
          <th>Combustível</th>
          <th>Status</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reg in registrosFiltrados" :key="reg.id">
          <td>{{ reg.prefixo }}</td>
          <td>{{ reg.modelo.nomeMarca }} {{ reg.modelo.nomeModelo }}</td>
          <td>{{ refinarPalavra(reg.tipo) }}</td>
          <td>(Combustível)</td>
          <td :class="reg.viaturaStatus">{{ refinarPalavra(reg.viaturaStatus) }}</td>
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
  margin-bottom: 10px;
}
.searchBar {
  width: 150px;
  background: #b1bdc8;
}
button {
  width: 150px;
}
.container {
  width: 100%;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 10px;
}
table {
  width: 100%;
}
th,
td {
  text-align: center;
  vertical-align: center;
  border: 1px solid #ccc;
}
/*Tags de status*/
td:nth-child(5) {
  border-radius: 10px;
  border: 1px solid #ccc;
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
td:nth-child(6) {
  color: #624de3;
  padding-top: 2px;
}
svg {
  cursor: pointer;
}
</style>
