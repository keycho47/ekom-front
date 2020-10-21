<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card-title class="flex display-2 font-weight-light font-italic">
          Odaberi klijenta :
        </v-card-title>
        <ClientPicker />
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
import ClientPicker from "@/components/Client/ClientPicker.vue";

export default {
  name: "Entity",
  components: {
    ClientPicker
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
