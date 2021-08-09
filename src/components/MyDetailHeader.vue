<template>
  <v-row>
    <v-col>
      <v-btn @click="deleteStuff" class="icons" color="transparent" depressed>
        <v-icon large>mdi-delete</v-icon>Delete Stuff
      </v-btn>
    </v-col>
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
  methods: {
    data: () => ({
      usernameInStorage: window.localStorage.getItem("username"),
      stuffIdInStorage: window.sessionStorage.getItem("id"),
    }),
    deleteStuff() {
      this.$store
        .dispatch("deleteStuff", {
          id: this.stuffIdInStorage,
          username: this.usernameInStorage,
        })
        .then(setTimeout(() => this.$router.push("/mystuff"), 1000));
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

</style>