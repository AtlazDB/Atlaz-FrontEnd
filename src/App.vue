<script setup>
import HomeAdministrador from './views/HomeAdministrador.vue'
</script>

<template>
  <body>
    <div class="wrapper">
      <HomeAdministrador />
    </div>
  </body>
  <router-view />
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
.wrapper {
  display: flex;
  width: 100vw;
}
</style>

<script>
export default {
  name: 'App'
}
</script>
