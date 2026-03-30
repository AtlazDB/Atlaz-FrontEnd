<script setup>
import HomeAdministrador from './views/HomeAdministrador.vue'
import AppSidebar from './components/AppSidebar.vue'
</script>

<template>
  <body>
    <aside class="container">
      <AppSidebar />
    </aside>
    <div class="wrapper">
      <HomeAdministrador />
    </div>
  </body>
</template>

<style>
body {
  margin: 0;
}
</style>
<style scoped>
* {
  display: flex;
  background-color: #f4f6f9;
  font-family: Arial, serif;
  border: none;
}
.container {
  width: 15%;
  height: max-content;
}
.wrapper {
  display: flex;
}
</style>
