<script setup>
import HomeAdministrador from './views/HomeAdministrador.vue'
import AppSidebar from './components/AppSidebar.vue'
</script>

<template>
  <header></header>
  <body>
    <aside class="container">
      <AppSidebar />
    </aside>
    <div class="wrapper">
      <HomeAdministrador />
    </div>
  </body>
</template>

<style scoped>
body {
  display: flex;
  background-color: #f4f6f9;
}
.container {
  width: 30%;
  height: max-content;
}
.wrapper {
  width: 400px;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
