<script setup>
import Sidebar from '@/views/Sidebar.vue'
import UserViewerApp from '@/components/UserViewerApp.vue'
import UserFormApp from '@/components/UserFormApp.vue'
import { nextTick, ref } from 'vue'

const userName = ref(localStorage.getItem('userName') || 'Administrador')

const showForm = ref(false)

const id = ref(0)
const nome = ref('')
const matricula = ref('')
const email = ref('')
const senha = ref('')
const status = ref('ATIVO')
const cnh = ref('')

const tipoAlteracao = ref('')
const erros = ref({})
const visualizador = ref(null)
const form = ref(null)

const totais = ref({ disponiveis: 0, emCampo: 0, desligados: 0 })

// ABRIR FORM
async function openForm(dados = null, tipoAlt = 'cadastro') {
  erros.value = {}

  id.value = 0
  nome.value = ''
  matricula.value = ''
  email.value = ''
  senha.value = ''
  status.value = 'ATIVO'
  cnh.value = ''

  if (dados != null) {
    id.value = dados.id
    nome.value = dados.name
    matricula.value = dados.registrationNumber
    email.value = dados.email
    status.value = dados.userStatus
    cnh.value = dados.cnhType
  }

  tipoAlteracao.value = tipoAlt
  showForm.value = true
  await nextTick()
  await form.value?.openForm(dados, tipoAlt) // chama o openForm do filho
}
</script>

<template>
  <div class="tela">
    <Sidebar :nome="userName" cargo="Administrador" userType="admin" />

     <div class="componente">
      <h1 class="titulo">Técnicos cadastrados</h1>

      <div class="status-cards">
        <div class="status-card">
          <div class="status-icon disponivel">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="2" stroke="currentColor" width="22" height="22">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="status-info">
            <span class="status-label">DISPONÍVEIS</span>
            <span class="status-count">{{ totais.disponiveis }}</span>
          </div>
        </div>

        <div class="status-card">
          <div class="status-icon em-campo">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="2" stroke="currentColor" width="22" height="22">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <div class="status-info">
            <span class="status-label">EM CAMPO</span>
            <span class="status-count">{{ totais.emCampo }}</span>
          </div>
        </div>

        <div class="status-card">
          <div class="status-icon desligado">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="2" stroke="currentColor" width="22" height="22">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <div class="status-info">
            <span class="status-label">DESLIGADOS</span>
            <span class="status-count">{{ totais.desligados }}</span>
          </div>
        </div>
      </div>

      <div class="visualizadorTecnico">


        <UserViewerApp
          ref="visualizador"
          @editar="(dados, tipoAlt) => openForm(dados, tipoAlt)"
          @abrir-form="openForm()"
          @update:totais="(t) => Object.assign(totais, t)"
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

.status-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 28px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 18px 28px;
  min-width: 180px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.status-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-icon.disponivel {
  background-color: #e6f9f0;
  color: #1aad5e;
}

.status-icon.em-campo {
  background-color: #fff4e5;
  color: #e07c00;
}

.status-icon.desligado {
  background-color: #f5f5f5;
  color: #888888;
}

.status-info {
  display: flex;
  flex-direction: column;
}

.status-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #999;
  text-transform: uppercase;
}

.status-count {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.1;
}

.visualizadorTecnico {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  border: 1px solid #003366;
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
  color: #003366;
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

@media (max-width: 600px) {
  .titulo {
    margin-top: 35px;
  }
  .status-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  width: 80%;
  margin: 40px auto 10px auto;
  }

 .status-card {
    flex: 1;
    min-width: 0;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 12px 8px;
    gap: 6px;
    border-radius: 10px;
  }

  .status-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
  }


  .status-icon svg { width: 18px; height: 18px; }

  .status-label { font-size: 9px; letter-spacing: 0.04em; }
  .status-count { font-size: 22px; }

  .visualizadorTecnico { width: 100%; }

  .linha {
    flex-direction: column;
    gap: 0;
  }

  .linha .campo {
    width: 100%;
  }

  .campo input,
  .select-wrapper select {
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    padding: 12px;
  }

  .btn-enviar {
    width: 100%;
    padding: 14px;
    font-size: 15px;
    border-radius: 25px;
    margin-top: 30px;
  }

}
</style>
