<template>
    <div>
    <div>
        <label>{{current_state.current_state}}</label>
    </div>
    </div>
</template>

<script>

    import axios from "axios";
    import { api_url } from '../../variables'
    export default {
        name: "CurrentState",
        data(){
            return {
                current_state: ''
            }
        },
        created() {
            const token = localStorage.getItem('user_token');
            axios.get(`${api_url}/report`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => this.current_state = res.data)
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.push(`/login`)
                    }
                })
        },
    }
</script>

<style scoped>

</style>
