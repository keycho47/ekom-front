<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card-title class="flex display-2 font-weight-light font-italic">
          Upiši količinu :
        </v-card-title>
        <ProductForm/>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
  import ProductForm from '@/components/Form/ProductForm.vue'
  export default {
    name: 'Form',
    components: {
      ProductForm
    },
  }
</script>
