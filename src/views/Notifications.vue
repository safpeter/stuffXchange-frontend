<template>
  <div>
    <v-card id="card" dark>
      <v-container>
        <v-row justify="center">
          <v-btn
            @click.stop="messageDialog = true"
            id="btn-add"
            color="transparent"
            depressed
          >
            <v-icon x-large>mdi-plus-box</v-icon>New Message
          </v-btn>
          <v-dialog v-model="messageDialog" max-width="1000">
            <MessageCard ></MessageCard>
          </v-dialog>
          <v-dialog v-model="errorDialog" max-width="320">
            <v-card dark>
              <v-card-title wrap>Message failed to send!</v-card-title>
              <v-card-text wrap
                >Please fill out both of the fields above!</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row class="header">Incoming Messages</v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import MessageCard from "@/components/MessageCard.vue";
export default {
  components: { MessageCard },
  data: () => ({
    messageDialog: false,
    messageTo: "",
    messageText: "",
    errorDialog: false,
    rules: {
      required: (value) => !!value || "Required",
    },
  }),
  methods: {
    sendMessage() {
      if (this.messageTo && this.messageText) {
        this.$store.dispatch("sendMessage", {
          address: this.messageTo,
          message: this.messageText,
        });
      } else {
        this.errorDialog = true;
      }
    },
  },
};
</script>

<style scoped>
#btn-add {
  padding: 1%;
  font-size: 130%;
  color: #ff6802;
  margin: 1%;
}

#card {
  margin-bottom: 2%;
  margin-top: 2%;
  margin: 2%;
  padding: 1%;
}

.header {
  text-decoration: underline;
  color: #ff6802;
}
</style>
