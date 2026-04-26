<script setup>
import Sidebar from '@/views/Sidebar.vue'
import AppVisualizadorViatura from '@/components/AppVisualizadorViatura.vue'

import { ref } from 'vue'

const showForm = ref(false)

const openForm = () => {
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
}

const vehicles = ref([])
const id = ref('')
const modelo = ref('')
const combustivel = ref('')
</script>

<template>
  <div class="tela">
    <Sidebar
      nome="William Hasan"
      cargo="Administrador"
      userType="admin"
      @openForm="actionForm"
    />
    <router-view />
    <div class="visualizadorViatura">
      <h1 class="titulo">Viaturas cadastradas</h1>
      <button @click="openForm">
        Cadastrar nova viatura
      </button>
      <AppVisualizadorViatura />
    </div>
  </div>

  <div v-if="showForm" class="overlay" @click="closeForm">
    <div class="modal" @click.stop>

      <h2 class="titulo-modal">Cadastrar nova Viatura</h2>

      <div class="campo">
        <label>ID da Viatura</label>
        <input type="text" />
      </div>

      <div class="campo">
        <label>Modelo</label>
        <input type="text" />
      </div>

      <div class="campo">
        <label>Tipo de combustível</label>
        <div class="select-wrapper">
          <select>
            <option disabled selected>Selecione...</option>
            <option>Diesel</option>
            <option>Etanol</option>
            <option>Gasolina</option>
            <option>Álcool</option>
            <option>Flex</option>
          </select>
        </div>
      </div>

      <button class="btn-enviar">Enviar</button>

    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.tela {
  display: flex;
  background-color: #f4f6f9;
}
.visualizadorViatura {
  width: max(100%);
  padding: 10px;
}
h1 {
  margin-bottom: 10px;
}
button {
  background-color: #7AA6CC;
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
  height: 100%;
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
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.titulo-modal {
  font-size: 18px;
  color: #003366;
  border-left: 4px solid #003366;
  padding-left: 10px;
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
  border: 1px solid #ccc;
  outline: none;
  background: #fff;
}

.campo input:focus {
  border-color: #6a5acd;
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
  content: "▼";
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #6a5acd;
  pointer-events: none;
}

.btn-enviar {
  margin-top: 160git px;
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
