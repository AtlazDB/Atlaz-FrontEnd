<script setup>
import { ref } from 'vue'
import AppVisualizador from '../components/AppVisualizador.vue'
import AppSeletorMes from '../components/AppSeletorMes.vue'
import Sidebar from '@/views/Sidebar.vue'

const tabela = ref('')
</script>
<template>
  <div class="tela">
    <!--

    -->
    <aside>
      <Sidebar nome="William Hasan" cargo="Administrador" @abrirFormulario="acaoFormulario" />
    </aside>
    <div class="visualizador">
      <AppVisualizador :tabela="tabela" />
    </div>
    <!--

    -->
    <div class="seletor">
      <AppSeletorMes @data_selecionada="tabela = $event" />
    </div>
  </div>
</template>

<style scoped>
.tela {
  display: flex;
  width: 100vw;
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
