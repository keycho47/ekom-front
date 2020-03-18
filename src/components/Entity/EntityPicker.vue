<template>
    <div>
        <b-row class="justify-content-md-center">

            <b-col v-if="userUser.role_id === 1">
                <template v-if="entities.length">
                    <b-button  style="margin: 5px" @click="goToProducts(entities[0].id)">{{entities[0].name}}</b-button>
                    <b-button  style="margin: 5px" @click="goToProducts(entities[1].id)">{{entities[1].name}}</b-button>
                    <b-button  style="margin: 5px" @click="goToProducts(entities[2].id)">{{entities[2].name}}</b-button>
                    <b-button  style="margin: 5px" @click="goToProducts(entities[3].id)">{{entities[3].name}}</b-button>
                    <b-button  style="margin: 5px" @click="goToProducts(entities[4].id)">{{entities[4].name}}</b-button>
                </template>
            </b-col>

            <b-col v-if="userUser.role_id === 2">
                <template v-if="entities.length">
                    <b-button  style="margin: 5px" @click="goToProducts(entities[1].id)">{{entities[1].name}}</b-button>
                    <b-button  style="margin: 5px" @click="goToProducts(entities[4].id)">{{entities[4].name}}</b-button>
                </template>

            </b-col>

            <b-col v-if="userUser.role_id === 3">
                <template v-if="entities.length">
                    <b-button  style="margin: 5px" @click="goToProducts(entities[0].id)">{{entities[0].name}}</b-button>
                    <b-button  style="margin: 5px" @click="goToProducts(entities[2].id)">{{entities[2].name}}</b-button>
                    <b-button  style="margin: 5px" @click="goToProducts(entities[4].id)">{{entities[4].name}}</b-button>

                </template>
            </b-col>
            <b-col v-if="userUser.role_id === 4">
                <template v-if="entities.length">
                    <b-button  style="margin: 5px" @click="goToProducts(entities[3].id)">{{entities[3].name}}</b-button>
                    <b-button  style="margin: 5px" @click="goToProducts(entities[4].id)">{{entities[4].name}}</b-button>
                </template>
            </b-col>
            <b-col v-if="userUser.role_id === ''">
                <p> Greška = nemas rolu u vuexu odi na login</p>
            </b-col>


        </b-row>
    </div>
</template>

<script>

    import axios from "axios";
    import {mapGetters , mapActions} from "vuex";

    //import { api_url } from '../../variables'
    //const STORAGE_KEY = 'entity_id';
    export default {
        name: 'EntityPicker',
        computed: mapGetters(['userToken' , 'userUser']),
        data(){
            return {
                entities: [],
                name: ''
            }
        },
        mounted() {
            this.getAuthUser();
            axios.get(`http://127.0.0.1:8001/api/entity`,{
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
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
            ...mapActions(['setEntityId' , 'getAuthUser']),
            goToProducts(entityId) {
                //localStorage.setItem(STORAGE_KEY , JSON.stringify(entityId));
                this.setEntityId(entityId);
                this.$router.push(`/client`)
            }
        }
    }
</script>

<style scoped>

</style>
