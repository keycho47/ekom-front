<template>
    <div>
    <div>
        <label>{{current_state.current_state}}</label>
    </div>
    </div>
</template>

<script>

    import axios from "axios";
    import { mapGetters } from 'vuex';
    //import { api_url } from '../../variables'
    export default {
        name: "CurrentState",
        computed: mapGetters(['userToken']),
        data(){
            return {
                current_state: ''
            }
        },
        created() {
            //const token = localStorage.getItem('user_token');
            //axios.get(`http://ekomapp.tech/api/report`,{
            axios.get(`report`,{
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(res => this.current_state = res.data)
                .catch(err => {
                    if (err.response.status === 401){
                        this.current_state = 0
                    }
                    console.log(err);
                })
        },
    }
</script>

<style scoped>

</style>
