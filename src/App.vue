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
.container {
  width: 15%;
  height: max-content;
}
.wrapper {
  display: flex;
}
</style>

<script>
export default {
  name: 'App'
}
</script>
