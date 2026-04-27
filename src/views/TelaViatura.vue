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
    <div class="componente">
      <h1 class="titulo">Viaturas cadastradas</h1>
      <div class="visualizadorViatura">
        <button>Cadastrar nova viatura</button>
        <AppVisualizadorViatura />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.visualizadorViatura {
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
</style>
