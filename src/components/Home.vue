<template>
  <div id="home">
    <nav-menu></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu.vue'
export default {
  name: 'Home',
  components: {
    NavMenu
  }
}
</script>

<style scoped>
#home {
  padding: 0.05% 5%;
}
</style>
