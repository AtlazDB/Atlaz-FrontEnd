<script setup>
import { ref } from 'vue'
import GeneralViewerApp from '../components/GeneralViewerApp.vue'
import MonthSelectorApp from '../components/MonthSelectorApp.vue'
import Sidebar from '../views/Sidebar.vue'

const userName = ref(localStorage.getItem('userName') || 'Administrador')

const filtro = ref(null)

const seletor = ref(null)
</script>

<template>
  <div class="tela">
    <Sidebar :nome="userName" cargo="Administrador" userType="admin" />
    <div class="componente">
      <h1 class="titulo">Registros</h1>
      <button class="sidebar-btn" @click="seletor.open()">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
        </svg>
      </button>
      <div class="table-view">
        <div class="container">
          <GeneralViewerApp :filtro="filtro" />
        </div>
        <div class="seletor">
          <MonthSelectorApp @data_selecionada="filtro = $event" ref="seletor" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.table-view {
  display: flex;
  width: 100%;
}

h1 {
  margin-bottom: 10px;
}

.container {
  margin: 20px 10px 40px;
}

.sidebar-btn {
  position: absolute;
  right: 10px;
  top: 20px;
  background-color: #ffffff;
  border: 0;
  cursor: pointer;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar-btn button {
  position: absolute;
  right: 20px;
  z-index: 101;
}
.sidebar-btn svg {
  transition: 0.2s;
  transform: rotate(-90deg);
}
.sidebar-btn svg:hover {
  color: white;
}
</style>
