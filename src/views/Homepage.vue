<template>
  <div>
    <v-container>
      <StuffCard :header="this.header" :allStuff="getPopularStuff"></StuffCard>
    </v-container>
  </div>
</template>

<script>
import StuffCard from "@/components/StuffCard.vue";
export default {
  components: { StuffCard },
  created() {
    this.$store.dispatch(
      "getPopularStuff",
      window.localStorage.getItem("username")
    );
  },
  computed: {
    getPopularStuff() {
      return this.$store.state.popularStuff;
    }
  },
  data() {
    return {
      isLoggedIn: true,
      header: "Popular Stuffs"
    };
  }
};
</script>
