<template>
  <div>
    <h1>Upiši količinu : </h1>
    <ProductForm/>
  </div>
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
