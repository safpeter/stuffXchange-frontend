<template>
  <v-row>
    <v-col>
      <v-btn @click="deleteStuff" class="icons" color="transparent" depressed>
        <v-icon large>mdi-delete</v-icon>Delete Stuff
      </v-btn>
    </v-col>
    <v-snackbar v-model="hasDeleted" :timeout="2000" class="snackbar">
        {{ this.name}} has been deleted!</v-snackbar>
    <v-col>
      <v-btn
        @click="goToUpdateStuff"
        class="icons"
        color="transparent"
        depressed
      >
        <v-icon large>mdi-update</v-icon>Update Stuff
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props:['initName'],
  data:vm => ({
    hasDeleted:false,
    name: vm.initName,
  }),
  methods: {
    deleteStuff() {
      this.$store
        .dispatch("deleteStuff", {
          id: window.sessionStorage.getItem("id"),
          username: window.localStorage.getItem("username"),
        })
        .then(this.hasDeleted = true)
        .then(setTimeout(() => this.$router.push("/mystuff"), 2000));
    },
    goToUpdateStuff() {
      this.$router.push("/update");
    },
  },
};
</script>

<style scoped>
.icons {
  font-size: 120%;
  color: #ff6802;
}

.snackbar {
  font-size: 100%;
  margin-bottom: 40%;
}
</style>