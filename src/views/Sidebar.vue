<template>
    <div class="sidebar">

        <div class="perfil">
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