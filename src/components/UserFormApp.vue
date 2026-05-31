<script setup>
import { ref } from 'vue'
import { usuarioService } from '@/services/usuarioServices.js'
import CnhSelectorApp from '@/components/CnhSelectorApp.vue'

const emit = defineEmits(['close', 'saved'])

const load = ref(false)
const showForm = ref(false)
// Atributos do usuário
const id = ref(0)
const nome = ref('')
const matricula = ref('')
const email = ref('')
const senha = ref('')
const status = ref('DISPONIVEL')
const cnh = ref([])

const tipoAlteracao = ref('')
const erros = ref({})

const statusListEdit = ref(['DISPONIVEL', 'EM_CAMPO', 'DESLIGADO'])
const statusListReg = ref(['DISPONIVEL'])
const cnhList = ref(['A', 'B', 'C', 'D', 'E'])

defineExpose({ openForm })

function mascaraNome(e) {
  nome.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
}

function mascaraMatricula(e) {
  let v = e.target.value.replace(/\D/g, '').slice(0, 8)
  if (v.length > 7) v = v.slice(0, 7) + '-' + v.slice(7)
  matricula.value = v
}

// -- Funções
function formatWord(word) {
  const map = {
    DISPONIVEL: 'Disponível',
  }

  if (map[word]) return map[word]

  return word
    .replace('_', ' ')
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
}

function openForm(dados = null, tipoAlt = 'cadastro') {
  erros.value = {}

  id.value = dados?.id ?? 0
  nome.value = dados?.name ?? ''
  matricula.value = dados?.registrationNumber ?? ''
  email.value = dados?.email ?? ''
  senha.value = dados?.passwordHash ?? ''
  status.value = dados?.userStatus ?? 'DISPONIVEL'
  cnh.value = dados?.cnhTypes ?? []
  tipoAlteracao.value = tipoAlt
  console.log(dados)

  showForm.value = true
}

function closeForm() {
  emit('close')
}
function validateForm() {
  const e = {}

  if (!nome.value?.trim()) e.name = true
  if (!matricula.value?.trim()) e.registrationNumber = true
  if (!email.value?.trim()) e.email = true
  if (!senha.value?.trim() && tipoAlteracao.value === 'cadastro') e.senha = true
  if (!cnh.value) e.cnhType = true

  erros.value = e
  return Object.keys(e).length === 0
}

async function submitForm() {
  // Para desabilitar o botão de envio
  load.value = true
  if (!validateForm()) {
    alert('Todos os campos precisam ser preenchidos')
    load.value = false
    return
  }
  const payload = {
    id: id.value,
    name: nome.value,
    registrationNumber: matricula.value,
    email: email.value,
    passwordHash: senha.value,
    profile: 'TECNICO',
    userStatus: status.value || 'DISPONIVEL',
    cnhTypes: cnh.value,
  }
  try {
    if (tipoAlteracao.value === 'cadastro') {
      await usuarioService.criar(payload)
    } else if (tipoAlteracao.value === 'edicao') {
      await usuarioService.atualizar(payload.id, payload)
    }
    emit('saved') // avisa o pai para recarregar a lista
    closeForm()
  } catch (e) {
    console.log(e)
    load.value = false
  }
  load.value = false
}
</script>
<template>
  <!-- MODAL -->
  <div class="overlay" @click="closeForm">
    <div class="modal" @click.stop>
      <h1 class="titulo">
        {{ tipoAlteracao === 'cadastro' ? 'Cadastrar novo Usuário' : 'Editar Usuário' }}
      </h1>

      <div class="linha">
        <div class="campo">
          <label>Nome</label>
          <input
            class="ipt-field"
            :class="{ erro: erros.nome }"
            type="text"
            v-model="nome"
            @input="mascaraNome"
            placeholder="Ex: João Silva"
          />
        </div>

        <div class="campo">
          <label>Matrícula</label>
          <input
            class="ipt-field"
            :class="{ erro: erros.matricula }"
            type="text"
            v-model="matricula"
            @input="mascaraMatricula"
            placeholder="Ex: 1234567-8"
          />
        </div>
      </div>

      <div class="linha">
        <div class="campo">
          <label>Email</label>
          <input
            class="ipt-field"
            :class="{ erro: erros.email }"
            type="email"
            v-model="email"
            placeholder="exemplo@email.com"
          />
        </div>

        <div class="campo">
          <label>Senha</label>
          <input class="ipt-field" :class="{ erro: erros.senha }" type="password" v-model="senha" />
        </div>
      </div>

      <div class="campo">
        <label>Status</label>
        <div class="select-wrapper">
          <select
            class="sct-field"
            :class="{ erro: erros.status }"
            v-if="tipoAlteracao === 'cadastro'"
            v-model="status"
          >
            <option disabled value="">Selecione...</option>
            <option v-for="s in statusListReg" :key="s" :value="s">{{ formatWord(s) }}</option>
          </select>
          <select
            class="sct-field"
            :class="{ erro: erros.status }"
            v-if="tipoAlteracao === 'edicao'"
            v-model="status"
          >
            <option disabled value="">Selecione...</option>
            <option v-for="s in statusListEdit" :key="s" :value="s">{{ formatWord(s) }}</option>
          </select>
        </div>
      </div>
      <div class="campo">
        <label>CNH</label>
        <cnh-selector-app v-model:cnhList="cnh"/>
      </div>

      <button class="btn-enviar" :disabled="load" @click="submitForm()">Confirmar</button>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.titulo {
  font-size: 20px;
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
  max-height: 90%;
  width: 90%;
  max-width: 700px;
  background: #f8f9fb;
  border-radius: 20px;
  padding: 30px 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  gap: min(1vh, 10px);

  overflow-y: auto;
}
.modal::-webkit-scrollbar {
  display: none;
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

.select-wrapper {
  position: relative;
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

.add svg {
  rotate: 0deg;
  transition: 0.2s;
}

.add.ativo svg {
  rotate: 45deg;
  transition: 0.2s;
}
</style>
