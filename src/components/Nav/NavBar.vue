<template>
    <div>
        <div>
            <b-navbar class="nav" toggleable="lg" type="dark" variant="info">
                <b-navbar-brand href="#">Ekom</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item>
                            <router-link to="/">Početak</router-link>
                        </b-nav-item>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">

                        <b-nav-form>
                            <b-button size="sm" class="my-2 my-sm-0">Search</b-button>
<!--                            <CurentState></CurentState>-->
                        </b-nav-form>

                        <b-nav-item-dropdown right>
                            <!-- Using 'button-content' slot -->
                            <template v-slot:button-content>
                                <em>{{userUser.name}}</em>
                            </template>
                            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    //import curentState from '@/components/Nav/NavBar.vue'
    export default {
        name: "NavBar",
        components: {
            //curentState,
        },
        computed: mapGetters(['userUser']),
        mounted() {
            if(this.$router.currentRoute.fullPath !== '/login'){
                this.getAuthUser();
            }
        },
        methods:{
            ...mapActions(['getAuthUser','clearToken']),
            logout(){
                this.clearToken();
                localStorage.clear();
                this.$router.push(`/login`)
            },
        }

    }
</script>

<style scoped>

</style>
