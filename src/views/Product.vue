<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card-title class="flex display-2 font-weight-light font-italic">
          Proizvod :
        </v-card-title>
        <ProductList />
        <v-card-actions>
          <div class="my-2" @click="back()">
            <v-btn text small color="primary">Back</v-btn>
          </div>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/Product/ProductList.vue";

export default {
  name: "Product",
  components: {
    ProductList
  },
  methods: {
    back() {
      console.log(this.$router.go(-1));
      this.$router.go(-1);
    }
  }
};
</script>
