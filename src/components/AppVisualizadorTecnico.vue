<script setup>
import { onMounted, ref, computed } from 'vue'
import { usuarioService } from '@/services/usuarioServices.js'

const carregando = ref(false)
const registros = ref([
  {
    id_usuario: 1,
    nome: 'João Silva',
    matricula: '12345',
    email: 'joao@teste.com',
    usuario_status: 'ATIVO'
  },
  {
    id_usuario: 2,
    nome: 'Maria Souza',
    matricula: '67890',
    email: 'maria@teste.com',
    usuario_status: 'INATIVO'
  },
  {
    id_usuario: 3,
    nome: 'Carlos Lima',
    matricula: '54321',
    email: 'carlos@teste.com',
    usuario_status: 'ATIVO'
  },
])

const busca_filtro = ref('')
const status_filtro = ref('')

const emit = defineEmits(['editar'])

async function carregarTodos() {
  carregando.value = true

  try {
    const response = await usuarioService.listar()
    registros.value = response
  } catch (erro) {
    console.error('Erro ao carregar usuários:', erro)
  } finally {
    carregando.value = false
  }
}

defineExpose({
  carregarTodos
})

function refinarPalavra(palavra) {
  if (!palavra) return ''
  palavra = palavra.toLowerCase()
  return palavra[0].toUpperCase() + palavra.substring(1)
}

const registrosFiltrados = computed(() => {
  return registros.value.filter((r) => {
    const encontrarBusca =
      !busca_filtro.value ||
      r.nome.toLowerCase().includes(busca_filtro.value.toLowerCase())

    const encontrarStatus =
      !status_filtro.value || r.usuario_status === status_filtro.value

    const ocultarStatus =
      status_filtro.value === 'INATIVO' || r.usuario_status !== 'INATIVO'

    return encontrarBusca && encontrarStatus && ocultarStatus
  })
})

function edit(tecnico) {
  emit('editar', tecnico, 'edicao')
}

onMounted(carregarTodos)
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
          placeholder="Buscar pelo nome"
          v-model="busca_filtro"
        />
      </div>

      <div
        style="width: 1px; height: 100%; border-left: 1px solid #cccc; margin: 0 10px"
      />

      <select v-model="status_filtro">
        <option value="">Status</option>
        <option value="ATIVO">Ativo</option>
        <option value="INATIVO">Inativo</option>
      </select>
    </div>

    <p v-if="registrosFiltrados.length === 0" style="align-self: center">
      Sem informação
    </p>

    <table v-else>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Matrícula</th>
          <th>Email</th>
          <th>Status</th>
          <th>Editar</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="reg in registrosFiltrados" :key="reg.id_usuario">
          <td>{{ reg.nome }}</td>
          <td>{{ reg.matricula }}</td>
          <td>{{ reg.email }}</td>

          <td>
            <div :class="reg.usuario_status">
              {{ refinarPalavra(reg.usuario_status) }}
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
  margin: 0 10px;
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

.ATIVO,
.INATIVO {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 4px 10px;
  border-radius: 10px;
  width: 100px;
}

.ATIVO {
  background-color: #ebf9f1;
  color: #1f9254;
}

.INATIVO {
  background-color: #fbe7e8;
  color: #a30d11;
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
