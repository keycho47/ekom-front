<template>
    <div>
        <b-row class="justify-content-md-center">
        <div :key="client.id" v-for="client in clients">

            <b-col>
                <b-button style="margin: 5px" @click="goToEntity(client.id)">{{client.name}}</b-button>
            </b-col>

        </div>
        </b-row>
    </div>
</template>

<script>

    import axios from "axios";
    import { api_url } from '../../variables'
    const STORAGE_KEY = 'client_id';
    export default {
        name: "ClientPicker",
        data(){
            return {
                clients: [],
                client: {
                    id: '',
                    name: '',
                },
            }
        },
        created() {
            const token = localStorage.getItem('user_token');
            axios.get(`${api_url}/clients`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => this.clients = res.data)
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.push(`/login`)
                    }else console.log(err)
                })
        },
        methods:{
            goToEntity(clientId) {
                localStorage.setItem(STORAGE_KEY , JSON.stringify(clientId));
                this.$router.push(`/entity`)
            }
        }
    }
</script>

<style scoped>

</style>
