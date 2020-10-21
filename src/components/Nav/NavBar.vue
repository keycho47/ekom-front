<template>
  <v-app id="inspire">
    <v-container>
      <div height="400" class="overflow-hidden">
        <v-navigation-drawer
          v-model="drawer"
          :color="color"
          :expand-on-hover="expandOnHover"
          :mini-variant="miniVariant"
          :right="right"
          absolute
          dark
        >
          <v-list dense nav class="py-0">
            <v-list-item two-line :class="miniVariant && 'px-0'">
              <v-list-item-avatar>
                <img src="@/assets/emoji.png" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ getProfile.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  getProfile.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <div @click="goTo">
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    Home
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
            <v-btn @click="logout" class="ma-2" color="orange darken-2" dark>
              <v-icon dark left>mdi-arrow-left</v-icon> Logout
            </v-btn>
          </v-list>
        </v-navigation-drawer>
        <router-view />
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
//import curentState from '@/components/Nav/NavBar.vue'
export default {
  name: "NavBar",

  data() {
    return {
      drawer: true,

      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: true,
      miniVariant: true,
      expandOnHover: true,
      background: false
    };
  },
  components: {},
  watch: {
    $route(to) {
      if (to.path === "/login") {
        this.drawer = false;
      } else this.drawer = true;
    }
  },
  computed: mapGetters(["getProfile"]),
  mounted() {},
  methods: {
    ...mapActions(["AuthLogout"]),
    logout() {
      this.AuthLogout();
      this.$router.push("/login");
    },
    goTo() {
      if (this.$route.path !== "/") this.$router.push("/");
    }
  }
};
</script>

<style scoped></style>
