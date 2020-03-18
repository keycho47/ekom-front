<template>
  <div id="app">
    <NavBar v-if="$route.name !=='Login'"></NavBar>
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
    mounted() {
      console.log(JSON.stringify(this.$route));
    }
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



#nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
