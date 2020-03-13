<template>
    <div>
        <b-row class="justify-content-md-center">
        <div :key="entity.id" v-for="entity in entities">
            <b-col>
            <b-button  style="margin: 5px" @click="goToProducts(entity.id)">{{entity.name}}</b-button>
            </b-col>
        </div>
        </b-row>
    </div>
</template>

<script>

    import axios from "axios";
    //import { api_url } from '../../variables'
    const STORAGE_KEY = 'entity_id';
    export default {
        name: "EntityPicker",
        data(){
            return {
                entities: [],
                entity: {
                    id: '',
                    name: '',
                }
            }
        },
        created() {
            const token = localStorage.getItem('user_token');
            axios.get(`http://ekomapp.tech/api/entity`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => this.entities = res.data.data)
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.push(`/login`)
                    }
                })
        },
        methods:{
            goToProducts(entityId) {
                localStorage.setItem(STORAGE_KEY , JSON.stringify(entityId));
                this.$router.push(`/product`)
            }
        }
    }
</script>

<style scoped>

</style>
