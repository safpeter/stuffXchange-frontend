<template>
  <v-row>
    <v-col>
      <v-btn
        class="icons"
        color="transparent"
        @click.stop="messageDialog = true"
        depressed
      >
        <v-dialog v-model="messageDialog" max-width="1000">
          <MessageCard :initUsername="getStuffDetails.user.name"></MessageCard>
        </v-dialog>
        <v-icon large>mdi-email</v-icon>Message To
        {{ getStuffDetails.user.name }}
      </v-btn>
    </v-col>
    <v-col>
      <v-btn
        v-if="this.markedFav == true"
        @click="unMarkAsFavourite"
        class="icons"
        color="transparent"
        depressed
      >
        <v-icon large>mdi-star</v-icon>Marked as Favourite
      </v-btn>
      <v-btn
        v-else
        @click="markAsFavourite"
        class="icons"
        color="transparent"
        depressed
      >
        <v-icon large>mdi-star-outline</v-icon>Mark as Favourite
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import MessageCard from "@/components/MessageCard.vue";
export default {
  components: { MessageCard },
  props: ["initFavList"],
  created(){
      if (this.favList.includes(this.stuffId)){
        this.markedFav = true
      } else {
        this.markedFav = false
      }
  },
  data: vm => ({
    messageDialog: false,
    favList: vm.initFavList,
    stuffId: parseInt(window.sessionStorage.getItem("id")),
    usernameInStorage: window.localStorage.getItem('username'),
    markedFav: '',
  }),
  computed: {
    getStuffDetails() {
      return this.$store.state.stuffDetails;
    },
  },
  methods: {
    markAsFavourite() {
      this.markedFav = true,
      this.$store.dispatch("markAsFavourite", {
        username: this.usernameInStorage,
        stuffId: this.stuffId,
      });
    },
    unMarkAsFavourite() {
      this.markedFav = false
       this.$store.dispatch("markAsFavourite", {
        username: this.usernameInStorage,
        stuffId: this.stuffId,
      });
    },
  },
};
</script>

<style scoped>
.icons {
  font-size: 120%;
  color: #ff6802;
}

#marked {
  display: none;
}
</style>