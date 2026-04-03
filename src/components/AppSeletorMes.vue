<script setup>
import { ref } from 'vue'
const itens_seletor = ref([
  { titulo: 'Janeiro', data: '2025' },
  { titulo: 'Fevereiro', data: '2025' },
  { titulo: 'Março', data: '2025' },
  { titulo: 'Abril', data: '2025' },
])
const emit = defineEmits(['data_selecionada'])
const selecionado = ref(null)
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
    <div
      class="container"
      v-for="item in itens_seletor"
      :key="item.titulo + item.data"
      v-on:click="() => {
          selecionado = item.titulo + item.data
          emit('data_selecionada', item.titulo + item.data)
        }"
      :class="{ ativo: selecionado === item.titulo + item.data }"
    >
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
  border-left: 5px #003366 solid;
  padding-left: 5px;
}
.container {
  border-bottom: 1px solid #ddd;
  padding-left: 5px;
  padding-bottom: 5px;
  width: 130px;
  cursor: pointer;
}
.container:hover {
  color: #003366;
  opacity: 0.7;
}
.container.ativo {
  color: #ffffff;
  background: #003366;
  transition: 0.3s;
}
h1 {
  font-size: 16px;
}
p {
  font-size: 12px;
  margin: 0;
}
</style>
