<template>
  <div>
          <v-container>
      <v-layout  row wrap >
    <v-flex md6>
        <h2>Stuff To Sell</h2>
    </v-flex>
                  <v-flex md6>
          <v-btn @click="goToAddStuff" id="btn-add" absolute color="transparent" depressed>
            <v-icon x-large>mdi-plus-box</v-icon>Add New Stuff
          </v-btn>
                  </v-flex>
      </v-layout>
      <v-layout row wrap>
          <v-card flat @click="getDetails(id)" dark class="mx-auto"  max-height="300" max-width="350">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" max-height="150"></v-img>
            <v-card-title>Stuff Name</v-card-title>
            <v-card-subtitle>Place</v-card-subtitle>
            <v-card-text>Price</v-card-text>
          </v-card>
      </v-layout>   
       </v-container>
    </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      window.history.back();
    },
    goToAddStuff() {
      this.$router.push("/addstuff");
    },
    getDetails(id) {
      this.$router.push(`/stuffdetails/` + id);
    }
  }
};
</script>

<style scoped>
#btn-add {
  font-size: 125%;
  margin-left: -3%;
  color: #424242;
}

.container {
  display: flex;
  position: relative;
}

.mx-auto{
  position: relative;
  margin-top: 5%;
  display: block;
}
</style>