<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '../views/Sidebar.vue'

const userName = ref('Carregando...')

onMounted(() => {
  const nomeSalvo = localStorage.getItem('userName') // Confirme se 'userName' é a chave certa do seu login
  
  if (nomeSalvo) {
    userName.value = nomeSalvo
  } else {
    userName.value = 'Administrador' // Fallback de segurança
  }
})

const acaoFormulario = () => {
  console.log('Abrir formulário')
}
</script>

<template>
  <div class="tela-admin">
    <Sidebar
      :nome="userName"
      cargo="Administrador"
      userType="admin"
      @abrirFormulario="acaoFormulario"
    />

    <main class="conteudo">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.tela-admin {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden; /* Evita scroll duplo com a sidebar */
  background-color: #F8FAFC;
}

.conteudo {
  flex-grow: 1;
  overflow-y: auto; /* Permite scroll apenas no conteúdo do Dashboard */
}
</style>