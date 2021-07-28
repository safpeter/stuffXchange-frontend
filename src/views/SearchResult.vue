<template>
  <div>
    <v-container>
      <v-card class="cards" dark>
        <v-row pa-2 justify="center">
          <v-card
            v-for="stuff in getSearchResults"
            :key="stuff.id"
            @click="getDetails(stuff.id)"
            dark
            class="image-cards"
            max-height="270"
            max-width="270"
            justify="center"
          >
            <v-img :src="stuff.mainPicture" height="75%" width="100%"></v-img>
            <p v-if="stuff.name.length > 20" class="card-title">
              {{stuff.name.slice(0,20)}}
              <span>...</span>
            </p>
            <p v-else class="card-title">{{stuff.name}}</p>
            <p class="price">
              {{stuff.price}}
              <span id="currency">{{stuff.currency}}</span>
            </p>
          </v-card>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: window.sessionStorage.getItem("search")
  }),
  created() {
    this.$store.dispatch("getSearch", this.search);
  },
  computed: {
    getSearchResults() {
      return this.$store.state.searches;
    }
  },
  methods:{
     getDetails(id) {
      this.$store.dispatch("getAllImage", id);
      this.$store.dispatch("getStuffDetails", id);
      this.$router.push(`/stuffdetails/` + id);
      window.sessionStorage.setItem("id",id);
    } 
  }
};
</script>

<style scoped>
.image-cards {
  margin: 0.5%;
}

.cards {
  margin-bottom: 1%;
}

.card-title {
  margin-left: 2%;
  margin-top: 2%;
  margin-bottom: 0%;
  font-size: 110%;
}

#currency {
  margin-left: 2%;
}

.price {
  margin-left: 2%;
}
</style>

