<template>
  <div>
    <v-row align-content="center">
      <v-data-table :headers="headers" :items="stock" sort-by="entity_name" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Današnji unos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-label>No Data</v-label>
        </template>
      </v-data-table>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
//import { api_url } from '../../variables'
export default {
  name: "CurrentState",
  computed: {
    ...mapGetters(["userToken", "getProfile"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  data() {
    return {
      current_state: "",
      picker: new Date().toISOString().substr(0, 10),
      dialog: false,
      headers: [
        {
          text: "Entity",
          align: "start",
          value: "entity_name"
        },
        { text: "User", value: "user_name" },
        { text: "Quantity", value: "quantity" },
        { text: "Client", value: "client_name" },
        { text: "Product Name", value: "product_name" },
        { text: "Time", value: "time" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      stock: [],
      user_id: ""
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  mounted() {
    this.user_id = this.getProfile.id;
    console.log(this.user_id);
  },
  created() {
    this.UserRequest();
    this.initialize();
  },
  methods: {
    ...mapActions(["UserRequest"]),
    initialize() {
      const token = localStorage.getItem("user-token");
      console.log(this.getProfile.id);
      axios
        .get(`report-user/${this.getProfile.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          this.current_state = res.data;
          this.stock = res.data.stock;
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.current_state = 0;
          }
          console.log(err);
        });
    },
    deleteItem(item) {
      const token = localStorage.getItem("user-token");
      confirm("Are you sure you want to delete this item?") &&
        axios
          .delete(`stock/${item.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(err => {
            if (err.response.status === 401) {
              this.$router.push(`/login`);
            }
          });
      this.initialize();
    }
  }
};
</script>

<style scoped></style>
