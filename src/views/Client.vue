<template>
  <div>
    <b-container>
      <h1>Odaberi klijenta : </h1>
      <ClientPicker/>
      <hr>
      <CurrentState/>
    </b-container>
  </div>
</template>
<script>
  import ClientPicker from '@/components/Client/ClientPicker.vue'
  import CurrentState from '@/components/Client/CurrentState.vue'
  export default {
    name: 'Entity',
    components: {
      ClientPicker,
      CurrentState

    },
  }
</script>
