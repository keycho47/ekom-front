<template>
  <div>
    <b-container>
      <h1>Odaberi klijenta : </h1>
      <ClientPicker/>
      <hr>
    </b-container>
  </div>
</template>
<script>
  import ClientPicker from '@/components/Client/ClientPicker.vue'

  export default {
    name: 'Entity',
    components: {
      ClientPicker,

    },
  }
</script>
