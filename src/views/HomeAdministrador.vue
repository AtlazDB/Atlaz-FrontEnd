<script setup>
import{ ref } from 'vue'
import AppVisualizador from '../components/AppVisualizador.vue'
import AppSeletorMes from '../components/AppSeletorMes.vue'

const tabela = ref("")
</script>
<template>
  <div class="visualizador">
    <AppVisualizador :tabela="tabela" />
  </div>
  <div class="seletor">
    <AppSeletorMes @data_selecionada="tabela = $event" />
  </div>
</template>

<style scoped>
.visualizador,
.seletor {
  margin: 20px 20px 40px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px;
}
.visualizador {
  height: fit-content;
  padding-bottom: 50px;
}
.seletor {
  margin-bottom: 0;
  height: fit-content;
  padding-top: 20px;
  padding-right: 10px;
  padding-bottom: 20px;
}
</style>
