<script setup>
import Sidebar from '@/views/Sidebar.vue'
import VehicleViewerApp from '@/components/VehicleViewerApp.vue'
import VehicleFormApp from '@/components/VehicleFormApp.vue'
import { ref, onMounted, nextTick } from 'vue'
import { modelService } from '@/services/modelService.js'

const showForm = ref(false)
const modelos = ref([])
const visualizador = ref(null)
const form = ref(null)

async function openForm(dados = null, tipoAlt = 'cadastro') {
  showForm.value = true
  await nextTick()
  await form.value?.openForm(dados, tipoAlt)
}

onMounted(async () => {
  modelos.value = await modelService.listar()
})
</script>

<template>
  <div class="tela">
    <Sidebar nome="ADMIN" cargo="Administrador" userType="admin" />
    <router-view />
    <div class="componente">
      <h1 class="titulo">Viaturas cadastradas</h1>
      <div class="visualizadorViatura">
        <VehicleViewerApp
          ref="visualizador"
          @editar="(dados, tipoAlt) => openForm(dados, tipoAlt)"
          @abrirModal="openForm()"
        />
      </div>
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
  border: 1px solid #003366;
  outline: none;
  background: #fff;
}

.campo input:focus {
  border-color: #003366;
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

@media (max-width: 600px) {
  .titulo {
    margin-top: 35px;
  }
}
</style>
