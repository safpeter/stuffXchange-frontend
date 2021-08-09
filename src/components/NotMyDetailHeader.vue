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
        @click="markAsFavourite"
        id="unmarked"
        class="icons"
        color="transparent"
        depressed
      >
        <v-icon large>mdi-star-outline</v-icon>Mark as Favourite
      </v-btn>
      <v-btn
        @click="unMarkAsFavourite"
        id="marked"
        class="icons"
        color="transparent"
        depressed
      >
        <v-icon large>mdi-star</v-icon>Marked as Favourite
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import MessageCard from "@/components/MessageCard.vue";
export default {
  components:{MessageCard},
  data:() => ({
    messageDialog:false,
  }),
  computed:{
    getStuffDetails() {
      return this.$store.state.stuffDetails;
    }
  },
  methods:{
     markAsFavourite() {
      this.$store.dispatch("markAsFavourite", {
        username: this.usernameInStorage,
        stuffId: this.stuffIdInStorage,
      });
      document.querySelector("#marked").style.display = "block";
      document.querySelector("#unmarked").style.display = "none";
    },
    unMarkAsFavourite() {
      document.querySelector("#unmarked").style.display = "block";
      document.querySelector("#marked").style.display = "none";
    },
  }
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