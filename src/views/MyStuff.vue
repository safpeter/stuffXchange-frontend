<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-btn @click="goToAddStuff" id="btn-add" color="transparent" depressed>
          <v-icon x-large>mdi-plus-box</v-icon>Add New Stuff
        </v-btn>
      </v-row>
      <v-row class="text">Stuff To Sell</v-row>
      <v-row pa-2>
        <v-card @click="getDetails(id)" dark class="cards"
         max-height="250" 
         max-width="310" 
         v-for="stuff in getAllStuff" :key="stuff.id">
                   <v-img  :src="stuff.mainPicture" height="70%" width="100%"></v-img>  
                  
          <v-card-title>{{stuff.name}}</v-card-title>
          <v-card-subtitle>{{stuff.price}}</v-card-subtitle>
        </v-card>
      </v-row>
      <v-row class="text">Stuff To Buy</v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
  }),
  created() {
    this.$store.dispatch("getAllStuff");
  },
  computed: {
    getAllStuff() {
      return this.$store.state.allStuff;
    },
  },
 
  methods: {
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
.text {
  color: #ff6802;
  padding: 2%;
  font-size: 120%;
}

#btn-add {
  font-size: 130%;
  color: #ff6802;
}

.cards {
  margin: 2%;
}
</style>