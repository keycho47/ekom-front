<template>
    <div>

        <b-row class="justify-content-md-center">
        <b-form @submit="onSubmit">
            <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
            >
                <b-form-input
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Enter email"
                />
            </b-form-group>
            <label for="text-password">Password</label>
            <b-input type="password" id="text-password" v-model="form.password" aria-describedby="password-help-block"/>
            <b-form-text id="password-help-block">
                Your password must be 8-20 characters long, contain letters and numbers, and must not
                contain spaces, special characters, or emoji.
            </b-form-text>

            <b-button class="submit-btn" type="submit" variant="primary">Login</b-button>
            <p :if="error">{{error}}</p>
        </b-form>
        </b-row>
    </div>


</template>

<script>
    import { mapActions } from 'vuex';
    // import axios from "axios";
    // // import { api_url } from '../../variables'
    // const STORAGE_KEY_USER = 'user_id';
    // const STORAGE_KEY_TOKEN = 'user_token';
    export default {
        name: "ProductForm",
        data(){
            return{
                form: {
                    email: '',
                    password: ''
                },
                error: ''
            }
        },
        created() {
        },
        methods:{
            ...mapActions(["login"]),
            onSubmit(e) {
                e.preventDefault();
                this.login(this.form);
                //axios.post(`http://ekomapp.tech/api/user/login`, {
                // axios.post(`http://127.0.0.1:8001/api/user/login`,{
                //     email: this.form.email,
                //     password: this.form.password,
                //
                // })
                //     .then(function (response) {
                //         console.log(response);
                //         localStorage.setItem(STORAGE_KEY_USER , response.data.user.id );
                //         localStorage.setItem(STORAGE_KEY_TOKEN , response.data.access_token );
                //         this.error = response.data.data.massage;
                //     })
                //     .catch(err => {
                //         if (err.response.status === 401) {
                //             console.log(this.error);
                //         }
                //     });

            },
        }
    }
</script>

<style scoped>

</style>
