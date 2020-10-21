<template>
  <div>
    <b-row class="justify-content-md-center">
      <form @submit="addStock">
        <label>
          <b-input
            v-model="amount"
            type="text"
            name="ProductNumber"
            placeholder=" Add..."
          />
        </label>
        <b-button class="submit-btn" type="submit" variant="primary"
          >Dodaj</b-button
        >
      </form>
    </b-row>
    <b-row class="justify-content-md-center">
      <ul id="keyboard">
        <li class="letter" @click="numClick(1)">1</li>
        <li class="letter" @click="numClick(2)">2</li>
        <li class="letter" @click="numClick(3)">3</li>
        <li class="letter clearl" @click="numClick(4)">4</li>
        <li class="letter" @click="numClick(5)">5</li>
        <li class="letter" @click="numClick(6)">6</li>

        <li class="letter clearl" @click="numClick(7)">7</li>
        <li class="letter " @click="numClick(8)">8</li>
        <li class="letter" @click="numClick(9)">9</li>
        <li class="letter" @click="numClick(0)">0</li>
        <li class="lastitem" @click="numDelete">DEL</li>
      </ul>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

//import { api_url } from '../../variables'
export default {
  name: "ProductForm",
  computed: mapGetters(["getProfile", "client_id", "product_id", "entity_id"]),
  data() {
    return {
      productId: "",
      entityId: "",
      clientId: "",
      user_id: "",
      amount: "",
      productData: {
        idProduct: "",
        count: ""
      }
    };
  },
  created() {
    this.UserRequest();
  },
  methods: {
    ...mapActions(["UserRequest"]),
    numDelete() {
      this.amount = this.amount.slice(0, -1);
    },
    numClick(num) {
      this.amount = `${this.amount}${num}`;
    },
    addStock(e) {
      const token = localStorage.getItem("user-token");
      e.preventDefault();
      //axios.post(`http://ekomapp.tech/api/stock`,
      axios
        .post(
          `stock`,
          {
            product_id: this.product_id,
            quantity: this.amount,
            entity_id: this.entity_id,
            client_id: this.client_id,
            description: "desc",
            user_id: this.getProfile.id
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
      this.amount = "";
      this.$router.push(`/`);
    }
  }
};
</script>

<style scoped>
.submit-btn {
  margin: 5px;
  padding: 10px;
}
* {
  margin: 0;
  padding: 0;
}
body {
  font: 71%/1.5 Verdana, Sans-Serif;
  background: #eee;
}
#container {
  margin: 100px auto;
  width: 760px;
}
#keyboard {
  margin: 0;
  padding: 0;
  list-style: none;
}
#keyboard li {
  float: left;
  margin: 0 5px 5px 0;
  width: 60px;
  height: 60px;
  font-size: 24px;
  line-height: 60px;
  text-align: center;
  background: #fff;
  border: 1px solid #f9f9f9;
  border-radius: 5px;
}
.capslock,
.tab,
.left-shift,
.clearl,
.switch {
  clear: left;
}
#keyboard .tab,
#keyboard .delete {
  width: 70px;
}
#keyboard .capslock {
  width: 80px;
}
#keyboard .return {
  width: 90px;
}
#keyboard .left-shift {
  width: 70px;
}

#keyboard .switch {
  width: 90px;
}
#keyboard .rightright-shift {
  width: 109px;
}
.lastitem {
  margin-right: 0;
}
.uppercase {
  text-transform: uppercase;
}
#keyboard .space {
  float: left;
  width: 556px;
}
#keyboard .switch,
#keyboard .space,
#keyboard .return {
  font-size: 16px;
}
.on {
  display: none;
}
#keyboard li:hover {
  position: relative;
  top: 1px;
  left: 1px;
  border-color: #e5e5e5;
  cursor: pointer;
}
</style>
