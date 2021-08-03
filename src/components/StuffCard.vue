<template>
  <v-card class="cards" dark justify="center">
    <p class="text">{{ header }}</p>
    <v-row pa-2 justify="center">
      <v-card
        v-for="stuff in this.allStuff"
        :key="stuff.id"
        @click="getDetails(stuff.id)"
        class="image-cards"
        dark
        max-height="270"
        max-width="270"
        justify="center"
      >
        <v-img :src="stuff.mainPicture" height="75%" width="100%"></v-img>
        <p v-if="stuff.name.length > 20" class="card-title">
          {{ stuff.name.slice(0, 20) }}
          <span>...</span>
        </p>

        <p v-else class="card-title">{{ stuff.name }}</p>
        <p class="price">
          {{ stuff.price }}
          <span id="currency">{{ stuff.currency }}</span>
        </p>
      </v-card>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["allStuff", "header"],
  methods: {
    getDetails(id) {
      this.$store.dispatch("getAllImage", id);
      this.$store.dispatch("getStuffDetails", id);
      this.$router.push(`/stuffdetails/` + id);
      window.sessionStorage.setItem("id", id);
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
  margin: 1%;
}

.image-cards {
  margin: 0.5%;
  background-color: #ff6802;
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
  font-size: 110%;
}
</style>
