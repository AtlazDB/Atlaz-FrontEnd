<script setup>
import Sidebar from '@/views/Sidebar.vue'
import UserViewerApp from '@/components/UserViewerApp.vue'
import UserFormApp from '@/components/UserFormApp.vue'
import { nextTick, ref } from 'vue'

const showForm = ref(false)

const id = ref(0)
const nome = ref('')
const matricula = ref('')
const email = ref('')
const senha = ref('')
const status = ref('ATIVO')

const tipoAlteracao = ref('')
const erros = ref({})
const visualizador = ref(null)
const form = ref(null)

// ABRIR FORM
async function openForm(dados = null, tipoAlt = 'cadastro') {
  erros.value = {}

  id.value = 0
  nome.value = ''
  matricula.value = ''
  email.value = ''
  senha.value = ''
  status.value = 'ATIVO'

  if (dados != null) {
    id.value = dados.id
    nome.value = dados.name
    matricula.value = dados.registrationNumber
    email.value = dados.email
    status.value = dados.userStatus
  }

  tipoAlteracao.value = tipoAlt
  showForm.value = true
  await nextTick()
  await form.value?.openForm(dados, tipoAlt) // chama o openForm do filho
}
</script>

<template>
  <div class="tela">
    <Sidebar nome="William Hasan" cargo="Administrador" userType="admin" />

    <div class="componente">
      <h1 class="titulo">Técnicos cadastrados</h1>

      <div class="visualizadorTecnico">
        <button class="btn-cadastrar" @click="openForm()">Cadastrar técnico</button>

        <UserViewerApp
          ref="visualizador"
          @editar="(dados, tipoAlt) => openForm(dados, tipoAlt)"
        />
      </div>
      <!-- garante que o componente sobreponha os outros -->
      <Teleport to="body">
        <UserFormApp
          v-if="showForm"
          ref="form"
          @close="showForm = false"
          @saved="visualizador.carregarTodos()"
        />
      </Teleport>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.visualizadorTecnico {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.btn-cadastrar {
  align-self: flex-start;
  margin-left: 5%;
}

button {
  background-color: #7aa6cc;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 7px;
  margin-bottom: 30px;
}
button:hover {
  background-color: #457aad;
}
button:active {
  transform: scale(0.95);
  transition-duration: 0.1s;
}

.linha {
  display: flex;
  gap: 10px;
}
.linha .campo {
  width: 50%;
}

.campo label {
  font-size: 13px;
  color: #333;
}

.campo input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #6a5acd;
  outline: none;
  background: #fff;
}

.campo input:focus {
  border-color: #2f12d1;
}
.campo input.erro,
.campo select.erro {
  border-color: #ff0000;
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #6a5acd;
  background: #fff;
  appearance: none;
  outline: none;
  cursor: pointer;
}

.select-wrapper::after {
  content: '▼';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #6a5acd;
  pointer-events: none;
}

.btn-enviar {
  margin-top: 20px;
  align-self: center;

  background: #003366;
  color: white;
  border: none;
  padding: 10px 40px;
  border-radius: 20px;
  cursor: pointer;
}

.btn-enviar:hover {
  background: #002244;
}
</style>
