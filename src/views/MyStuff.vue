<template>
  <div>
    <v-container v-if="this.role == 'user'">
      <v-card id="add-card" align-center dark>
        <v-row justify="center">
          <v-btn @click="goToAddStuff" id="btn-add" color="transparent" depressed>
            <v-icon x-large>mdi-plus-box</v-icon>Add New Stuff
          </v-btn>
        </v-row>
        </v-card>
        <StuffCard v-if="getAllUserStuff.length == 0" :header="this.noSell"></StuffCard>
       <StuffCard v-else :header="this.sellHeader" :allStuff="getAllUserStuff"></StuffCard>
       <StuffCard v-if="getAllFavouriteStuff == 0" :header="this.noBuy"></StuffCard>
      <StuffCard v-else :header="this.buyHeader" :allStuff="getAllFavouriteStuff"></StuffCard>
    </v-container>
  </div>
</template>

<script>
import StuffCard  from '@/components/StuffCard.vue'
export default {
  components:{StuffCard},
  created() {
    this.$store.dispatch(
      "getAllUserStuff",
      window.localStorage.getItem("username")
    );
    this.$store.dispatch(
      "getAllFavouriteStuff",
      window.localStorage.getItem("username")
    );
    this.$store.dispatch(
      "getUserDetails",
      window.localStorage.getItem("username")
    );
  },
  data: () => ({
    role: window.localStorage.getItem("role"),
    buyHeader: "Stuff To Buy",
    sellHeader:"Stuff To Sell",
    noSell:"There is no stuff you want to sell at the moment!",
    noBuy:"There is no stuff you want to buy at the moment!",
  }),
  computed: {
    getAllUserStuff() {
      return this.$store.state.allUserStuff;
    },
    getAllFavouriteStuff() {
      return this.$store.state.allFavouriteStuff;
    },
    getUserRoles() {
      window.localStorage.setItem(
        "role",
        this.$store.state.userDetails.roles[0]
      );
      return this.$store.state.userDetails.roles[0];
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
      window.sessionStorage.setItem("id", id);
    }
  }
};
</script>

<style scoped>
#btn-add {
  padding: 1%;
  font-size: 130%;
  color: #ff6802;
  margin: 1%;
}

#add-card {
  margin-left:35%;
  margin-right: 35%;
}

</style>