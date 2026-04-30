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
    <div class="componente">
      <h1 class="titulo">Registros</h1>
      <div class="visualizador">
        <div class="tabela_visualizador">
          <AppVisualizador :filtro="filtro" />
        </div>
        <div class="seletor">
          <AppSeletorMes @data_selecionada="filtro = $event" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.visualizador {
  display: flex;
  width: 100%;
}

h1 {
  margin-bottom: 10px;
}
.tabela_visualizador {
  margin: 20px 10px 40px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px;
  width: max(100%);
  height: fit-content;
  min-height: 100px;
  padding-bottom: 50px;
  justify-items: center;
  flex-grow: 3;
}
</style>
