<template>
    <div>
        <v-app id="inspire">
                <v-container
                        fluid
                        fill-height
                >
                    <v-layout
                            align-center
                            justify-center
                    >
                        <v-flex
                                xs12
                                sm8
                                md4
                        >
                            <v-card class="elevation-12">
                                <v-toolbar
                                        color="primary"
                                        dark
                                        flat
                                >
                                    <v-toolbar-title>Login form</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field
                                                label="Email"
                                                name="email"
                                                type="text"
                                                v-model="email"
                                        ></v-text-field>

                                        <v-text-field
                                                id="password"
                                                label="Password"
                                                name="password"
                                                type="password"
                                                v-model="password"
                                        ></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="login" color="primary">Login</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
        </v-app>
    </div>


</template>

<script>
    import { mapActions } from "vuex";
    export default {
        name: "login",
        data() {
            return {
                email: "",
                password: ""
            };
        },
        methods: {
            ...mapActions(["AuthRequest"]),
            login(){
                const { email, password } = this;
                this.AuthRequest({ email, password }).then(() => {
                    this.$router.push("/");
                });
            }
        }
    };
</script>

<style scoped>

</style>
