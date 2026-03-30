<script setup>
import { ref } from 'vue'
const itens_seletor = ref([
  { titulo: 'Janeiro', data: '01/01/2025' },
  { titulo: 'Feveiro', data: '01/02/2025' },
  { titulo: 'Março', data: '01/03/2025' },
  { titulo: 'Abril', data: '01/04/2025' },
])
</script>

<template>
  <h1 class="titulo">Registros</h1>
  <!--
  <select>
    <option value="1">2026</option>
    <option value="2">2025</option>
  </select>
  -->
  <div class="meses">
    <div class="container" v-for="item in itens_seletor" :key="item.data" v-on:click="">
      <h1>{{ item.titulo }}</h1>
      <p>{{ item.data }}</p>
    </div>
  </div>
</template>

<style scoped>
.meses {
  display: flex;
  flex-direction: column;
  height: 230px;
  overflow-y: hidden;
  overflow-x: hidden;
  width: 130px;
}
.meses:hover {
  overflow-y: auto;
}
.titulo {
  font-size: 24px;
  border-left: 3px #003366 solid;
  padding-left: 5px;
}
.container {
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
  width: 130px;
}
h1 {
  font-size: 16px;
}
p {
  font-size: 12px;
  margin: 0;
}
</style>
