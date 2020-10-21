<template>
  <div>
    <b-row class="justify-content-md-center">
      <div :key="client.id" v-for="client in clients">
        <b-col>
          <b-button style="margin: 5px" @click="goToProduct(client.id)">{{
            client.name
          }}</b-button>
        </b-col>
      </div>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
//import { api_url } from '../../variables'
//const STORAGE_KEY = 'client_id';
export default {
  name: "ClientPicker",
  computed: mapGetters(["userToken"]),
  data() {
    return {
      clients: [],
      client: {
        id: "",
        name: ""
      }
    };
  },

  created() {
    const token = localStorage.getItem("user-token");
    //console.log(this.userToken);
    //axios.get(`http://ekomapp.tech/api/clients`,{
    axios
      .get(`clients`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => (this.clients = res.data))
      .catch(err => {
        if (err.response.status === 401) {
          this.$router.push(`/login`);
        } else console.log(err);
      });
  },
  methods: {
    ...mapActions(["setClientId"]),
    goToProduct(clientId) {
      //localStorage.setItem(STORAGE_KEY , JSON.stringify(clientId));
      this.setClientId(clientId);
      this.$router.push(`/product`);
    }
  }
};
</script>

<style scoped></style>
