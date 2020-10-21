<template>
  <div>
      <v-row justify="space-around">
          <v-date-picker v-model="picker" @change="callStock()" header-color="primary"></v-date-picker>
      </v-row>
        <hr>
      <v-row>
          <v-data-table
                  :headers="headers"
                  :items="stock"
                  sort-by="entity_name"
                  class="elevation-1"
          >
              <template v-slot:top>
                  <v-toolbar flat color="white">
                      <v-toolbar-title>Stock</v-toolbar-title>
                      <v-divider
                              class="mx-4"
                              inset
                              vertical
                      ></v-divider>
                      <v-label>{{current_state.current_state}} KM</v-label>
                      <v-spacer></v-spacer>
                  </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                  <v-icon
                          small
                          @click="deleteItem(item)"
                  >
                      mdi-delete
                  </v-icon>
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
import {mapGetters} from "vuex";
//import { api_url } from '../../variables'
export default {
    name: "CurrentState",
    computed: {
        ...mapGetters(["userToken"]),
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    data() {
        return {
        current_state: "",
        picker: new Date().toISOString().substr(0, 10),
            dialog: false,
            headers: [
                {
                    text: 'Entity',
                    align: 'start',
                    value: 'entity_name',
                },
                { text: 'User', value: 'user_name' },
                { text: 'Quantity', value: 'quantity' },
                { text: 'Client', value: 'client_name' },
                { text: 'Product Name', value: 'product_name' },
                { text: 'Time', value: 'time' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            stock: [],

        };
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
    },
  created() {
        this.initialize();
  },
  methods: {
      initialize () {
          const token = localStorage.getItem("user-token");
          axios
                  .get(`report/${this.picker}`, {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  })
                  .then(res => {
                      this.current_state = res.data
                      this.stock = res.data.stock
                  })
                  .catch(err => {
                      if (err.response.status === 401) {
                          this.current_state = 0;
                      }
                      console.log(err);
                  });
      },
      callStock(){
          const token = localStorage.getItem("user-token");
          axios
                  .get(`report/${this.picker}`, {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  })
                  .then(res => {
                      this.current_state = res.data
                      this.stock = res.data.stock
                  })
                  .catch(err => {
                      if (err.response.status === 401) {
                          this.current_state = 0;
                      }
                      console.log(err);
                  });
      },
      deleteItem (item) {
          const token = localStorage.getItem("user-token");
          confirm('Are you sure you want to delete this item?') &&
          axios
                  .delete(`stock/${item.id}`,{
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  })
                  .then(function (response){
                      console.log(response);
                  })
                  .catch(err => {
                      if (err.response.status === 401) {
                          this.$router.push(`/login`);
                      }
                  });
          this.initialize()
      },


  }
};
</script>

<style scoped></style>
