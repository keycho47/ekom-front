<template>
    <div>
        <h1>Admin</h1>
        <v-container class="grey lighten-5">
            <v-layout row wrap>
                <v-flex xs12 md4>
                    <v-container>
                        <v-btn @click="showUserForm" ma-4 outlined block class="primary"
                        >Dodaj radnika</v-btn
                        >
                    </v-container>
                    <v-container>
                        <v-btn @click="showProductTable" ma-4 outlined block class="primary">Lista Proizvoda</v-btn>
                    </v-container>
                    <v-container>
                        <v-btn ma-4 outlined block class="primary">Dodaj Klijenta</v-btn>
                    </v-container>
                    <v-container>
                        <v-btn ma-4 outlined block class="primary">Lista cijena</v-btn>
                    </v-container>
                    <v-container>
                        <v-btn @click="showStockReport" ma-4 outlined block class="primary">Report</v-btn>
                    </v-container>
                </v-flex>
                <v-flex xs12 md8>
                    <v-container>
                        <div v-if="showUser">
                            <AddProductForm />
                        </div>
                        <div v-if="showReport">
                        <CurrentState />
                        </div>
                        <div v-if="showProduct">
                        <ProductsTable />
                        </div>
                    </v-container>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>


<script>
import CurrentState from "../components/Nav/CurrentState";
import AddProductForm from "../components/AdminPage/AddProductForm";
import ProductsTable from "../components/AdminPage/ProductsTable";
export default {
  name: "Admin",
  components: {
    CurrentState,
    AddProductForm,
      ProductsTable,
  },
    data: () => ({
        showUser: true,
        showReport: false,
        showProduct: false,
        showClient: false,
        showPrices: false
    }),
    methods: {
        showUserForm() {
            this.showUser = !this.showUser;
            this.showReport = false;
            this.showClient = false;
            this.showProduct = false;
            this.showPrices = false;
        },
        showStockReport() {
            this.showUser = false
            this.showReport = !this.showReport;
            this.showClient = false;
            this.showProduct = false;
            this.showPrices = false;
        },
        showProductTable() {
            this.showUser = false
            this.showReport = false;
            this.showClient = false;
            this.showProduct = !this.showProduct;
            this.showPrices = false;
        },
    }
};
</script>

<style scoped></style>
