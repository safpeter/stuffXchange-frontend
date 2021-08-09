<template>
  <div>
    <v-card dark class="properties">
      <v-container>
        <v-row>
          <v-col>
            <v-btn
              @click.stop="messageDialog = true"
              class="icons"
              color="transparent"
              depressed
            >
              <v-icon large>mdi-email</v-icon>Message to {{ this.stuffUser }}
            </v-btn>
          </v-col>
          <v-dialog v-model="messageDialog" max-width="1000">
            <MessageCard :initUsername="getDetails.name"></MessageCard>
          </v-dialog>
        </v-row>
        <v-row>
          <v-col>
            <v-row class="label">Username:</v-row>
            <v-row class="property">{{ getDetails.name }}</v-row>
          </v-col>
          <v-col>
            <v-row class="label">Member since:</v-row>
            <v-row class="property">{{ getDetails.dateOfSignUp }}</v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row class="label">Location:</v-row>
            <v-row class="property">{{ getDetails.country }}</v-row>
          </v-col>
          <v-col>
            <v-row class="label">E-mail address:</v-row>
            <v-row class="property">{{ getDetails.email }}</v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row class="label">Rating:</v-row>
            <v-col>
              <v-rating
                large
                readonly
                v-model="getDetails.rating"
                color="#ff6802"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
                hover
              ></v-rating>
              <v-row v-if="getDetails.numberOfRating === 0"
                >No ratings yet!</v-row
              >
              <v-row v-else
                >{{ getDetails.rating }} from
                {{ getDetails.numberOfRating }} rating</v-row
              >
            </v-col>
          </v-col>
          <v-col>
            <v-col>
              <v-row class="label">Your rating:</v-row>
              <v-col>
                <v-rating
                  large
                  v-model="rating"
                  color="#ff6802"
                  background-color="grey darken-1"
                  empty-icon="$ratingFull"
                  half-increments
                  hover
                  class="rating"
                  @input="sendRating"
                ></v-rating>
              </v-col>
            </v-col>
            <v-col></v-col>
          </v-col>
        </v-row>
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
    stuffUser: window.sessionStorage.getItem("stuffuser"),
    raterUserName: window.localStorage.getItem("username"),
    rating: 0,
    averageRating: ""
  }),
  created() {
    this.$store.dispatch("getUserDetails", this.stuffUser);
  },
  computed: {
    getDetails() {
      return this.$store.state.userDetails;
    }
  },
  methods: {
    sendRating() {
      this.$store
        .dispatch("sendRating", {
          raterUserName: this.raterUserName,
          userName: this.stuffUser,
          rating: this.rating
        })
        .then(
          setTimeout(
            () => this.$store.dispatch("getUserDetails", this.stuffUser),
            1000
          )
        );
    }
  }
};
</script>

<style scoped>
.label {
  color: #ff6802;
  text-decoration: underline;
  font-size: 90%;
}

.property {
  color: aliceblue;
  font-size: 110%;
}

.properties {
  margin-bottom: 2%;
  margin-top: 2%;
  margin: 2%;
  padding: 1%;
}

.icons {
  font-size: 120%;
  color: #ff6802;
}
</style>
