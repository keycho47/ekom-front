<template>
  <b-container>
  <div>
    <h1>Odaberi funkciju : </h1>
    <EntityPicker/>
    <hr>
  </div>
  </b-container>
</template>
<script>
  import EntityPicker from '@/components/Entity/EntityPicker.vue'
  export default {
    name: 'Entity',
    components: {
      EntityPicker
    },
  }
</script>
