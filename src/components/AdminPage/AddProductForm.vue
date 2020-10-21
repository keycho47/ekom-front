<template>
  <div>
              <v-form
                @submit="submit"
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="name"
                  :counter="10"
                  :rules="nameRules"
                  label="Name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 8 characters"
                  counter
                  @click:append="show = !show"
                ></v-text-field>

                <v-select
                  v-model="select"
                  item-text="name"
                  item-value="id"
                  :items="roles"
                  :rules="[v => !!v || 'Item is required']"
                  label="Rola"
                  required
                ></v-select>
                <v-btn class="mr-4" type="submit">submit</v-btn>
              </v-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    show: false,
    password: "",
    name: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    roles: {},

  }),
  mounted() {
    const token = localStorage.getItem("user-token");
    axios
      .get(`roles`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => (this.roles = res.data))
      .catch(err => {
        if (err.response.status === 401) {
          this.$router.push(`/login`);
        }
      });
  },

  methods: {
    submit(e) {
      const token = localStorage.getItem("user-token");
      e.preventDefault();
      axios
        .post(
          `user/register`,
          {
            name: this.name,
            email: this.email,
            password: this.password,
            role_id: this.select
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
        this.name = "";
        this.email = "";
        this.password = "";
        this.select = "";

    }
  }
};
</script>
