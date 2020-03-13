<template>
  <div>
    <v-container>
    <v-card class="cards" dark justify="center" > 
      <v-row justify="center">
        <v-btn @click="goToAddStuff" id="btn-add" color="transparent" depressed>
          <v-icon x-large>mdi-plus-box</v-icon>Add New Stuff
        </v-btn>
      </v-row>
      <v-row class="text">Stuff To Sell</v-row>
      <v-row pa-2  justify="center">
        <v-card
          v-for="stuff in getAllStuff"
          :key="stuff.id"
          @click="getDetails(stuff.id)"
          dark
          class="image-cards"
          max-height="270"
          max-width="270"
          justify="center"
        >
          <v-img :src="stuff.mainPicture" height="70%" width="100%"></v-img>
          <v-card-title>{{stuff.name}}</v-card-title>
          <v-card-subtitle>{{stuff.price}}</v-card-subtitle>
        </v-card>
      </v-row>
       </v-card>
       <v-card class="cards" dark>
      <v-row class="text">Stuff To Buy</v-row>
       </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getAllStuff");
  },
  computed: {
    getAllStuff() {
      return this.$store.state.allStuff;
    }
  },

  methods: {
    goToAddStuff() {
      this.$router.push("/addstuff");
    },
    getDetails(id) {
      this.$store.dispatch("getAllImage", id);
      this.$store.dispatch("getStuffDetails", id);
      this.$router.push(`/stuffdetails/` + id);
    }
  }
};
</script>

<style scoped>
.text {
  color: #ff6802;
  padding: 2%;
  font-size: 110%;
  text-decoration: underline;
}

#btn-add {
  padding: 2%;
  font-size: 130%;
  color: #ff6802;
}

.image-cards {
  margin: 0.5%;
}

.cards{
  margin-bottom: 1%;
}
</style>