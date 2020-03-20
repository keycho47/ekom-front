<template>
    <v-container>
        <v-card>
            <v-container>
                <v-card-title class="flex display-2 font-weight-light font-italic">
                    Proizvod :
                </v-card-title>
                <ProductList/>
            </v-container>
        </v-card>
    </v-container>
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
