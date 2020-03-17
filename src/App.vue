<template>
  <div id="app">
    <NavBar v-if="$router.currentRoute.path !=='/login'"></NavBar>
    <router-view style="margin-top:40px "/>
  </div>
</template>
<script>
  import NavBar from '@/components/Nav/NavBar.vue'
  export default {
    name: 'Form',
    components: {
      NavBar
    },
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: gray;
}
</style>
