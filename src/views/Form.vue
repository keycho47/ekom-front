<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card-title class="flex display-2 font-weight-light font-italic">
          Upiši količinu :
        </v-card-title>
        <ProductForm />
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
import ProductForm from "@/components/Form/ProductForm.vue";
export default {
  name: "Form",
  components: {
    ProductForm
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
