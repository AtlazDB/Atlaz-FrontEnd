<script setup>
import Sidebar from '@/views/Sidebar.vue'
import AppVisualizadorViatura from '@/components/AppVisualizadorViatura.vue'
import { modelService } from '@/services/modelService.js'
import VehicleFormApp from '@/components/VehicleFormApp.vue'

import { ref, onMounted, nextTick } from 'vue'

const showForm = ref(false)

const id = ref(0)
const prefixo = ref('')
const tipo = ref('')
const modelId = ref(null)
const modelos = ref([])
const combustivel = ref('')
const quilometragem = ref(0)
const status = ref('')
const tipoAlteracao = ref('')

const erros = ref({})
const visualizador = ref(null)
const form = ref(null)

//Padrão para cadastro
async function openForm(dados = null, tipoAlt = 'cadastro') {
  //Reset dos dados
  erros.value = {}
  id.value = 0
  prefixo.value = ''
  tipo.value = 'UTILITARIO'
  modelId.value = dados?.modelId ?? null
  combustivel.value = 'GASOLINA'
  quilometragem.value = 0
  status.value = 'DISPONIVEL'

  //Caso seja uma edição atribui os dados passados
  if (dados != null) {
    id.value = dados.id
    prefixo.value = dados.prefix
    tipo.value = dados.type
    combustivel.value = dados.fuelType
    quilometragem.value = dados.km
    status.value = dados.status
  }
  tipoAlteracao.value = tipoAlt
  showForm.value = true
  await nextTick() // espera o VehicleFormApp montar no DOM
  await form.value?.openForm(dados, tipoAlt) // chama o openForm do filho
}

onMounted(async () => {
  modelos.value = await modelService.listar()
})
</script>

<template>
  <div class="tela">
    <Sidebar nome="ADMIN" cargo="Administrador" userType="admin" @openForm="actionForm" />
    <router-view />
    <div class="componente">
      <h1 class="titulo">Viaturas</h1>
      <div class="visualizadorViatura">
        <button class="btn-cadastrar" @click="openForm()">Cadastrar viatura</button>
        <!-- chama a função 'editar' com parâmetros -->
        <AppVisualizadorViatura
          ref="visualizador"
          @editar="(dados, tipoAlt) => openForm(dados, tipoAlt)"
        />
      </div>
      <!-- garante que o componente sobreponha os outros -->
      <Teleport to="body">
        <VehicleFormApp
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

.visualizadorViatura {
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
</style>
