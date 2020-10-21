<template>
  <v-data-table :headers="headers" :items="products" sort-by="name" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Proizvodi</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>



<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Price", value: "price" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      price: 0,
      id: ""
    },
    defaultItem: {
      name: "",
      price: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      const token = localStorage.getItem("user-token");
      axios
        .get(`products`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => (this.products = res.data))
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push(`/login`);
          }
        });
    },

    editItem(item) {
      const token = localStorage.getItem("user-token");
      axios
        .get(`products/${item.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          this.editedItem = res.data;
          this.editedIndex = res.data.id;
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push(`/login`);
          }
        });
      this.dialog = true;
    },

    deleteItem(item) {
      const token = localStorage.getItem("user-token");
      confirm("Are you sure you want to delete this item?") &&
        axios
          .delete(`products/${item.id}`, {
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
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        const token = localStorage.getItem("user-token");
        axios
          .patch(
            `products/${this.editedItem.id}`,
            {
              name: this.editedItem.name,
              code: this.editedItem.name,
              uni_code: this.editedItem.name,
              price: this.editedItem.price
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(function(response) {
            console.log(response);
          })
          .catch(err => {
            if (err.response.status === 401) {
              this.$router.push(`/login`);
            }
          });
        this.initialize();
      } else {
        const token = localStorage.getItem("user-token");
        axios
          .post(
            `products`,
            {
              name: this.editedItem.name,
              code: this.editedItem.name,
              uni_code: this.editedItem.name,
              price: this.editedItem.price
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(function(response) {
            console.log(response);
          })
          .catch(err => {
            if (err.response.status === 401) {
              this.$router.push(`/login`);
            }
          });
      }
      this.close();
      this.initialize();
    }
  }
};
</script>

<style scoped>
</style>
