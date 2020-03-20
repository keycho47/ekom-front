<template>
    <b-container>
    <div class="productList">
    <div :key="product.id" v-for="product in productList">
        <v-card>
            <b-button class="product" @click="goToForm(product.id)">{{product.name}}</b-button>
        </v-card>
    </div>
    </div>
    </b-container>
</template>

<script>

    import axios from "axios";
    import {mapGetters , mapActions} from "vuex";
    //import { api_url } from '../../variables'
    //const STORAGE_KEY = 'product_id';
    export default {
        name: "ProductList",
        computed: mapGetters(['userToken']),
        data(){
            return {
                productList: [],
                product: {
                    id: '',
                    name: '',
                }
            }
        },
        created() {

            const token = localStorage.getItem('user-token');
            this.UserRequest();
            //axios.get(`http://ekomapp.tech/api/products`,{
            axios.get(`products`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => this.productList = res.data)
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.push(`/login`)
                    }
                })
        },
        methods:{
            ...mapActions(['setProductId' , 'UserRequest']),
            goToForm(productId) {
                //localStorage.setItem(STORAGE_KEY , productId );
                this.setProductId(productId);
                this.$router.push(`/form`)
            }
        }
    }
</script>

<style scoped>
    .productList {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 1rem;
    }
    .product {
        border: 1px solid black;
        background: green;
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        position: relative;
        cursor: pointer;
        width: 100%;
        margin: 5px;
    }

</style>
