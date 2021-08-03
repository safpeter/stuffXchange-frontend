<template>
  <div>
    <v-card dark>
      <v-container>
        <v-form>
          <v-row justify="center" class="header">New Message</v-row>
          <v-row wrap>
            <v-col>
              <v-text-field
                disabled
                dark
                outlined
                color="#ff6802"
                v-model="this.userName"
                label="Message To"
                :rules="[rules.required]"
                cols="10"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-textarea
            dark
            color="#ff6802"
            label="Message"
            v-model="messageText"
            rows="12"
            :rules="[rules.required]"
            outlined
          ></v-textarea>
          <v-row justify="center">
            <v-btn color="success" @click="sendMessage">Send Message</v-btn>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-container>
    </v-card>
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
  </div>
</template>

<script>
// import SockJS from "sockjs";
// import Stomp from "webstomp-client";
export default {
  data: () => ({
    messageTo: "",
    messageText: "",
    errorDialog: false,
    rules: {
      required: value => !!value || "Required"
    }
  }),
  //   mounted() {
  //     let socket = new SockJS("/secured/room");
  //     let stompClient = Stomp.over(socket);
  //     //let sessionId = "";

  //     stompClient.connect({}, function() {
  //       let url = stompClient.ws._transport.url;
  //       url = url.replace(
  //         "ws://localhost:8080/spring-security-mvc-socket/secured/room/",
  //         ""
  //       );
  //       url = url.replace("/websocket", "");
  //       url = url.replace(/^[0-9]+\//, "");
  //       console.log("Your current session is: " + url);
  //       //sessionId = url;
  //     });
  //   },
  methods: {
    sendMessage() {
      if (this.messageTo && this.messageText) {
        this.$store.dispatch("sendMessage", {
          address: this.messageTo,
          message: this.messageText
        });
      } else {
        this.errorDialog = true;
      }
    }
  },
  props: ["userName"]
};
</script>

<style scoped>
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
