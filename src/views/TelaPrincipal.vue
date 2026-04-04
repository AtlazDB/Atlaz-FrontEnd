<template>
  <main class="container">


    <section class="background"></section>


    <section class="conteudo">

      <header class="cabecalho">
        <img src="../assets/logo-ipem.png" class="logo" />
      </header>

      <nav class="menu">
        <button @click="irParaAdministrador">Administrador</button>
        <button @click="irParaTecnico">Técnico</button>
      </nav>

    </section>

  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const irParaAdministrador = () => {
  router.push('/home-administrador')
}

const irParaTecnico = () => {
  router.push('/formulario-tecnico')
}
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}


.background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.5);
}


.conteudo {
  position: relative;
  z-index: 1;
  height: 100%;
}



.cabecalho {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  color: #003366;
}

.logo {
  width: 60%;
  margin-top: 100px;
  margin-left: 110px;
}


.menu {
  position: absolute;
  bottom: 40px;
  right: 10%;
  transform: translateX(-50%);

  display: flex;
  gap: 150px;
}

button {
  padding: 15px 30px;
  font-size: 14px;
  border-radius: 10px;
  border: none;
  background: #003366;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #003366;
}
@media (max-width: 768px) {
  .conteudo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* era space-between */
    gap: 130px; /* controla a distância entre logo e botões */
    padding: 40px 20px;
  }

  .cabecalho {
    position: static;
    justify-content: center;
    width: 100%;
  }

  .logo {
    width: 70%;
    margin: 0;
  }

  .menu {
    position: static;
    transform: none;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    right: auto;
    bottom: auto;
    padding-bottom: 20px;
  }

  button {
    width: 80%;
    min-width: 200px; /* garante espaço suficiente pro texto */
    font-size: 13px;
  }
}
</style>
