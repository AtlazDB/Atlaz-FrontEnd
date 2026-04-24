<script setup>
import Sidebar from '@/views/Sidebar.vue'
import AppVisualizadorViatura from '@/components/AppVisualizadorViatura.vue'
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
    <div class="visualizadorViatura">
      <h1 class="titulo">Viaturas cadastradas</h1>
      <button>Cadastrar nova viatura</button>
      <AppVisualizadorViatura />
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.tela {
  display: flex;
  background-color: #dddddd;
}
.visualizadorViatura {
  width: max(100%);
  padding: 10px;
}
</style>
