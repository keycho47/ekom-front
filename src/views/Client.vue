<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card-title class="flex display-2 font-weight-light font-italic">
          Odaberi klijenta :
        </v-card-title>
        <ClientPicker/>
      </v-container>
    </v-card>
  </v-container>
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
