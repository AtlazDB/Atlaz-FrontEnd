<script setup>
import { ref } from 'vue'
import AppVisualizador from '../components/AppVisualizador.vue'
import AppSeletorMes from '../components/AppSeletorMes.vue'
import Sidebar from '../views/Sidebar.vue'

const filtro = ref(null)
const acaoFormulario = () => {
  console.log('Abrir formulário')
}
</script>

<template>
  <div class="tela">
    <Sidebar
      nome="William Hasan"
      cargo="Administrador"
      userType="admin"
      @abrirFormulario="acaoFormulario"
    />
    <router-view />
    <div class="visualizador">
      <AppVisualizador :filtro="filtro" />
    </div>
    <div class="seletor">
      <AppSeletorMes @data_selecionada="filtro = $event" />
    </div>
  </div>
</template>

<style scoped>
.tela {
  display: flex;
  width: 100%;
  height: 200vh;
}
.visualizador {
  margin: 20px 10px 40px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px;
}
.visualizador {
  height: fit-content;
  padding-bottom: 50px;
  justify-items: center;
  flex-grow: 3;
}
</style>
