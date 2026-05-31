<script setup>
import { onMounted, ref, computed } from 'vue'
import { usuarioService } from '@/services/usuarioServices.js'

const carregando = ref(false)
const registros = ref([])

const busca_filtro = ref('')
const status_filtro = ref('')

const userInfo = ref(null)
const showInfo = ref(false)

const emit = defineEmits(['editar', 'abrir-form', 'update:totais'])

const totalDisponiveis = computed(
  () => registros.value.filter((r) => r.userStatus === 'DISPONIVEL').length,
)
const totalEmCampo = computed(
  () => registros.value.filter((r) => r.userStatus === 'EM_CAMPO').length,
)
const totalDesligados = computed(
  () => registros.value.filter((r) => r.userStatus === 'DESLIGADO').length,
)

async function carregarTodos() {
  carregando.value = true

  try {
    registros.value = await usuarioService.listar()
    /*Retorna uma lista JSON da seguinte forma:
     * [
     *   {
     *    id: 0,
     *    name: '',
     *    registrationNumber: '',
     *    email: '',
     *    passwordHash: '',
     *    profile: 'TECNICO',
     *    userStatus: 'DISPONIVEL',
     *    cnhTypes: '' [A,B,C,D,E]
     *   }
     * ]
     */

    emit('update:totais', {
      disponiveis: totalDisponiveis.value,
      emCampo: totalEmCampo.value,
      desligados: totalDesligados.value,
    })
  } catch (erro) {
    console.error('Erro ao carregar usuários:', erro)
  } finally {
    carregando.value = false
  }
}

defineExpose({
  carregarTodos,
})

const registrosFiltrados = computed(() => {
  return registros.value.filter((r) => {
    const encontrarBusca =
      !busca_filtro.value || r.name.toLowerCase().includes(busca_filtro.value.toLowerCase())

    const encontrarStatus = !status_filtro.value || r.userStatus === status_filtro.value

    const ocultarStatus = status_filtro.value === 'DESLIGADO' || r.userStatus !== 'DESLIGADO'

    return encontrarBusca && encontrarStatus && ocultarStatus
  })
})

function openInfo(user) {
  userInfo.value = user
  showInfo.value = true
}

function closeInfo() {
  showInfo.value = false
  userInfo.value = null
}

function edit(tecnico) {
  emit('editar', tecnico, 'edicao')
}

onMounted(carregarTodos)
</script>

<template>
  <div class="btn-container">
    <button class="btn-cadastrar" @click="emit('abrir-form')">Cadastrar técnico</button>
  </div>
  <div class="container_tabela">
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

        <input type="search" placeholder="Buscar pelo nome" v-model="busca_filtro" />
      </div>

      <div
        style="width: 1px; height: max(100%); border-left: 1px solid #cccc; margin: 0 10px 0 10px"
      />

      <select v-model="status_filtro">
        <option value="">Status</option>
        <option value="DISPONIVEL">Disponível</option>
        <option value="EM_CAMPO">Em campo</option>
        <option value="DESLIGADO">Desligado</option>
      </select>
    </div>

    <p style="align-self: center" v-if="registrosFiltrados.length === 0">Sem informação</p>

    <table v-else>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Matrícula</th>
          <th>Email</th>
          <th>Status</th>
          <th>Informações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="reg in registrosFiltrados" :key="reg.id">
          <td>{{ reg.name }}</td>
          <td>{{ reg.registrationNumber }}</td>
          <td>{{ reg.email }}</td>

          <td>
            <span class="status-color" :class="reg.userStatus" :title="reg.userStatus"></span>
          </td>
          <td>
            <span class="more-info-btn" @click="openInfo(reg)">•••</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="showInfo" class="overlay" @click="closeInfo">
    <div class="modal-info" @click.stop>
      <h3 class="modal-title">Informações do usuário</h3>

      <div class="info-line">
        <span class="info-label">Registro</span>
        <span class="info-value">{{ userInfo.registrationNumber }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">Nome</span>
        <span class="info-value">{{ userInfo.name }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">Email</span>
        <span class="info-value">{{ userInfo.email }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">Senha</span>
        <span class="info-value">{{ userInfo.passwordHash }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">CNH</span>
        <span class="info-value">{{ userInfo.cnhTypes.sort().join(', ') || '-' }}</span>
      </div>
      <button
        class="btn-edit"
        @click="
          () => {
            edit(userInfo)
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

.btn-container {
  width: 80%;
  margin: 0 auto 20px auto;
  display: flex;
  justify-content: left;
}

.btn-cadastrar {
  background-color: #7aa6cc;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 7px;
  cursor: pointer;

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

/*Tags de status*/
.status-color {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.DISPONIVEL {
  background-color: #abf5cb;
  color: #0ae972;
}
.EM_CAMPO {
  background-color: #ffc78a;
  color: #cd6200;
}
.DESLIGADO {
  background-color: #fa6d74;
  color: #a30d11;
}

/*Ícone de editar*/
.more-info-btn {
  color: #624de3;
  padding-top: 2px;
  width: 100px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
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
@media (max-width: 600px) {

  .btn-container {
    justify-content: center;
    margin: 20px auto;
  }

  .tabela-container {
    width: 100%;
    justify-content: center;
  }

  .searchHeader {
    flex-direction: column;
    height: auto;
    gap: 8px;
    margin-bottom: 10px;
    align-items: stretch;
  }

}
</style>
