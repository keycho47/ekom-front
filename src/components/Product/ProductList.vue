<template>
  <v-container>
    <div class="productList">
      <div :key="product.id" v-for="product in productList">
        <div class="my-2">
          <v-btn @click="goToForm(product.id)" x-large color="success" dark>{{
            product.name
          }}</v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
//import { api_url } from '../../variables'
//const STORAGE_KEY = 'product_id';
export default {
  name: "ProductList",
  computed: mapGetters(["userToken"]),
  data() {
    return {
      productList: [],
      product: {
        id: "",
        name: ""
      }
    };
  },
  created() {
    const token = localStorage.getItem("user-token");
    this.UserRequest();
    //axios.get(`http://ekomapp.tech/api/products`,{
    axios
      .get(`products`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => (this.productList = res.data))
      .catch(err => {
        if (err.response.status === 401) {
          this.$router.push(`/login`);
        }
      });
  },
  methods: {
    ...mapActions(["setProductId", "UserRequest"]),
    goToForm(productId) {
      //localStorage.setItem(STORAGE_KEY , productId );
      this.setProductId(productId);
      this.$router.push(`/form`);
    }
  }
};
</script>

<style scoped>
.productList {
  display: grid;
  grid-template-columns: repeat(4, 0.5fr);
  grid-gap: 0.5rem;
}
</style>
