<template>
    <div class="sidebar">

        <div class="perfil">
            <img><svg width="77" height="81" viewBox="0 0 77 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M38.3333 7.33333C31.9821 7.33333 26.8333 12.2582 26.8333 18.3333C26.8333 24.4085 31.9821 29.3333 38.3333 29.3333C44.6846 29.3333 49.8333 24.4085 49.8333 18.3333C49.8333 12.2582 44.6846 7.33333 38.3333 7.33333ZM19.1667 18.3333C19.1667 8.20812 27.7479 0 38.3333 0C48.9188 0 57.5 8.20812 57.5 18.3333C57.5 28.4585 48.9188 36.6667 38.3333 36.6667C27.7479 36.6667 19.1667 28.4585 19.1667 18.3333ZM14.484 48.2166C22.1332 44.9368 31.372 44 38.3333 44C45.2947 44 54.5334 44.9368 62.1826 48.2166C69.9696 51.5556 76.6667 57.6474 76.6667 67.8333V71.5C76.6667 76.4667 72.4684 80.6667 67.1535 80.6667H9.51313C4.19825 80.6667 0 76.4667 0 71.5V67.8333C0 57.6474 6.69704 51.5556 14.484 48.2166ZM17.6201 54.9084C11.5113 57.5277 7.66667 61.5192 7.66667 67.8333V71.5C7.66667 72.5342 8.55428 73.3333 9.51313 73.3333H67.1535C68.1124 73.3333 69 72.5342 69 71.5V67.8333C69 61.5192 65.1554 57.5277 59.0465 54.9084C52.7999 52.2299 44.7887 51.3333 38.3333 51.3333C31.878 51.3333 23.8668 52.2299 17.6201 54.9084Z" fill="white"/>
</svg>

            <h3 class="nome">{{ nome }}</h3>
            <span class="cargo">{{ cargo }}</span>
        </div>

        <button class="menu" @click="$emit('abrirFormulario')">
            <span class="icon">📄</span>
            Formulário
        </button>
    </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    nome: {
      type: String,
      default: "Usuário"
    },
    cargo: {
      type: String,
      default: "Cargo"
    }
  }
};
</script>

<style scoped>

.sidebar {
  width: 240px;
  background-color: #003366;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
}

.perfil {
  text-align: center;
}

.nome {
  margin-top: 20px;
  font-size: 15px;
}

.cargo {
  font-size: 13px;
  color: #b1bdc8;
}

.menu {
  margin-top: 50px;
  background-color: #7aa6cc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu:hover {
  background-color: #7aa6cc;
}
</style>