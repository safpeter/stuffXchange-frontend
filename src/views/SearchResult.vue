<template>
  <div>
    <v-container>
      <StuffCard :header="this.header" :allStuff="getSearchResults"></StuffCard>
    </v-container>
  </div>
</template>

<script>
import StuffCard from "@/components/StuffCard.vue";
export default {
  components: { StuffCard },
  data: () => ({
    search: window.sessionStorage.getItem("search"),
    header: "Search Results"
  }),
  created() {
    this.$store.dispatch("getSearch", this.search);
  },
  computed: {
    getSearchResults() {
      return this.$store.state.searches;
    }
  },
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
