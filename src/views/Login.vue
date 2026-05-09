<template>

<div class="main">
    <div class="card-login">

      <header class="cabecalho">
        <img src="../assets/logo-ipem.png" class="logo" />
      </header>

     <label class="email-label">Email</label>
     <input
          v-model="email"
          type="text"
          class="campo-input"
          placeholder="Informe seu email"
        >
     <label class="campo-label">Senha</label>
     <input
          v-model="senha"
          type="password"
          class="campo-input"
          placeholder="Informe sua senha"
        >
            <button
               type="button"
               class="btn-entrar"
               @click="handleLogin">
                 Entrar
            </button>

</div>
</div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api.js'

const router = useRouter()
const email = ref('')
const senha = ref('')


async function handleLogin() {
  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: senha.value
    })
    console.log('Login response:', response.data)
    const { id, profile, name } = response.data

    console.log('Salvando userId:', id)
    localStorage.setItem('userId', id)
    localStorage.setItem('userProfile', profile)
    localStorage.setItem('userName', name)

    if (profile === 'ADMIN') {
      router.push('/home-administrador')
    } else {
      router.push('/formulario-tecnico')
    }
  } catch (e) {
    alert('Credenciais inválidas')
  }
}

</script>

<style scoped>

.main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #003366, #8ba9cc);
}

.card-login {
  background: white;
  border-radius: 18px;
  padding: 48px 52px 40px;
  width: 420px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-entrar{
   background: #003366;
   color:white;
   border: none;
   border-radius: 8px;
   padding: 15px;
   width: 100%;
   cursor: pointer;
}

.campo-input{
  width: 100%;
  max-width: 600px;
  padding: 10px;
  display: block;
  border: 1px solid #697179;
  border-radius: 10px;
  outline: none;
  margin: 0 auto 15px;;
  font-size: 14px;
}

.logo {
  width: 60%;
  margin-top: 10px;
  margin-left: 70px;
}
</style>
