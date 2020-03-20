<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card-title class="flex display-2 font-weight-light font-italic">
          Odaberi funkciju :
        </v-card-title>
        <EntityPicker/>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
  import EntityPicker from '@/components/Entity/EntityPicker.vue'
  export default {
    name: 'Entity',
    components: {
      EntityPicker,
    },
  }
</script>
