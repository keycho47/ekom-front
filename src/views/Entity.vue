<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card-title class="flex display-2 font-weight-light font-italic">Odaberi funkciju :</v-card-title>
        <EntityPicker />
        <v-col cols="12">
          <UserStock />
        </v-col>
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
import EntityPicker from "@/components/Entity/EntityPicker.vue";
import UserStock from "../components/Entity/UserStock";
export default {
  name: "Entity",
  components: {
    EntityPicker,
    UserStock
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
