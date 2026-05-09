<script setup>
import Sidebar from '@/views/Sidebar.vue'
import AppVisualizadorTecnico from '@/components/AppVisualizadorTecnico.vue'
import { usuarioService } from '@/services/usuarioServices.js'
import { ref } from 'vue'

const showForm = ref(false)

const id = ref(0)
const nome = ref('')
const matricula = ref('')
const email = ref('')
const senha = ref('')
const status = ref('ATIVO')
const tipoAlteracao = ref('')
const erros = ref({})

// ABRIR FORM
function openForm(dados = null, tipoAlt = 'cadastro') {
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
}

function closeForm() {
  showForm.value = false
}

// VALIDAÇÃO
function validateForm() {
  const e = {}

  if (!nome.value?.trim()) e.name = true
  if (!matricula.value?.trim()) e.registrationNumber = true
  if (!email.value?.trim()) e.email = true
  if (!senha.value?.trim() && tipoAlteracao.value === 'cadastro') e.senha = true

  erros.value = e
  return Object.keys(e).length === 0
}

const visualizador = ref(null)
async function submitForm() {
  if (!validateForm()) {
    alert('Todos os campos precisam ser preenchidos')
    return
  }

  const payload = {
    name: nome.value,
    registrationNumber: matricula.value,
    email: email.value,
    passwordHash: senha.value,
    profile: 'TECNICO',
    userStatus: status.value || 'ATIVO'
  }


  try {
    if (tipoAlteracao.value === 'cadastro') {
      await usuarioService.criar(payload)
    } else {
      await usuarioService.atualizar(id.value, payload)
    }
    closeForm()
    await visualizador.value.carregarTodos()
  } catch (e) {
    console.error('Erro ao salvar técnico:', e)
    alert('Erro ao salvar. Verifique o console.')
  }
}
</script>

<template>
  <div class="tela">
    <Sidebar nome="William Hasan" cargo="Administrador" userType="admin" />

    <div class="componente">
      <h1 class="titulo">Técnicos cadastrados</h1>

      <div class="visualizadorTecnico">
        <button @click="openForm()">Cadastrar novo técnico</button>

        <AppVisualizadorTecnico
          ref="visualizador"
          @editar="(dados, tipoAlt) => openForm(dados, tipoAlt)"
        />
      </div>
    </div>
  </div>

  <!-- MODAL -->
  <div v-if="showForm" class="overlay" @click="closeForm">
    <div class="modal" @click.stop>
      <h2 class="titulo-modal">Cadastrar Técnico</h2>

      <div class="linha">
        <div class="campo">
          <label>Nome</label>
          <input type="text" v-model="nome" :class="{ erro: erros.nome }" />
        </div>

        <div class="campo">
          <label>Matrícula</label>
          <input type="text" v-model="matricula" :class="{ erro: erros.matricula }" />
        </div>
      </div>

      <div class="linha">
        <div class="campo">
          <label>Email</label>
          <input type="email" v-model="email" :class="{ erro: erros.email }" />
        </div>

        <div class="campo">
          <label>Senha</label>
          <input type="password" v-model="senha" :class="{ erro: erros.senha }" />
        </div>
      </div>

      <div class="campo">
        <label>Status</label>
        <div class="select-wrapper">
          <select v-model="status">
            <option value="DISPONIVEL">Disponível</option>
            <option value="EM_CAMPO">Em campo</option>
            <option value="DESLIGADO">Desligado</option>
          </select>
        </div>
      </div>

      <button class="btn-enviar" @click="submitForm()">Salvar</button>
    </div>
  </div>
</template>


<style scoped>
@import '@/assets/style.css';

.visualizadorTecnico {
  width: max(100%);
  padding: 10px;
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: max(100%);
  background: rgba(0, 0, 0, 0.35);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
}

.modal {
  min-height: 520px;
  width: 90%;
  max-width: 700px;
  background: #f8f9fb;
  border-radius: 20px;
  padding: 30px 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  gap: 15px;
}

.titulo-modal {
  font-size: 18px;
  color: #003366;
  border-left: 4px solid #003366;
  padding-left: 10px;
}

.linha {
  display: flex;
  gap: 10px;
}
.linha .campo {
  width: 50%;
}
.campo {
  display: flex;
  flex-direction: column;
  gap: 5px;
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
