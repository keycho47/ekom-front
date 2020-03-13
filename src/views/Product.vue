<template>
    <div class="home">
        <h1>Proizvod : </h1>
        <ProductList/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import ProductList from '@/components/Product/ProductList.vue'



    export default {
        name: 'Product',
        components: {
            ProductList,
        },
    }
</script>
