<template>
  <div>
    <v-card dark class="properties">
      <v-container>
         <v-row v-if=" this.role === 'admin' ">
            <v-col>
            <v-btn class="icons" color="transparent" depressed>
              <v-icon large>mdi-email</v-icon>Send Message
            </v-btn>
          </v-col>
           <v-col>
            <v-btn class="icons" color="transparent" depressed>
              <v-icon large>mdi-block-helper</v-icon>Block Stuff
            </v-btn>
          </v-col>
          <v-col>
            <v-btn @click="deleteStuff" class="icons" color="transparent" depressed>
              <v-icon large>mdi-delete</v-icon>Delete Stuff
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-else-if="this.getStuffDetails.user.name === this.usernameInStorage">
          <v-col>
            <v-btn @click="deleteStuff" class="icons" color="transparent" depressed>
              <v-icon large>mdi-delete</v-icon>Delete Stuff
            </v-btn>
          </v-col>
          <v-col>
            <v-btn class="icons" color="transparent" depressed>
              <v-icon large>mdi-update</v-icon>Update Stuff
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <v-btn class="icons" color="transparent" depressed>
              <v-icon large>mdi-email</v-icon>Send Message
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

        <v-row>
          <v-col>
            <v-row class="label">Stuff name:</v-row>
            <v-row class="property">{{getStuffDetails.name}}</v-row>
          </v-col>
          <v-col v-if="this.getStuffDetails.user.name != this.usernameInStorage">
            <v-row class="label">Uploaded by:</v-row>
            <v-row id="username" class="property">
              <v-btn
                @click="goToUserDetails(getStuffDetails.user.name)"
                color="transparent"
                depressed
              >{{getStuffDetails.user.name}} from {{getStuffDetails.user.country}}</v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row class="label">Stuff price:</v-row>
            <v-row id="price">
              {{getStuffDetails.price}}
              <span id="currency">{{getStuffDetails.currency}}</span>
            </v-row>
          </v-col>
          <v-col>
            <v-row class="label">Date of Upload:</v-row>
            <v-row class="property">{{getStuffDetails.date}}</v-row>
          </v-col>
        </v-row>
        <v-row class="label">Stuff Description:</v-row>
        <v-row class="property">{{getStuffDetails.description}}</v-row>
      </v-container>
    </v-card>
    <v-card dark>
      <v-row pa-2>
        <template>
          <v-card
            v-for="image in getImages"
            :key="image"
            class="images"
            @click.stop="dialog = true" 
            @click="doThis(e)"
          >
            <v-img :src="image" height="200" width="200" display="inline"></v-img>
          </v-card>
          <v-dialog v-model="dialog">
            <template>
              <v-carousel class="carousel">
                <v-carousel-item id="carousel" v-for="image in getImages" :key="image" :src="image"></v-carousel-item>
              </v-carousel>
            </template>
          </v-dialog>
        </template>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getAllImage", window.sessionStorage.getItem("id"));
    this.$store.dispatch(
      "getStuffDetails",
      window.sessionStorage.getItem("id")
    );
  },
  data: () => ({
    dialog: false,
    usernameInStorage: window.localStorage.getItem("username"),
    stuffIdInStorage: window.sessionStorage.getItem("id"),
    role: window.localStorage.getItem("role")
  }),
  computed: {
    getStuffDetails() {
      return this.$store.state.stuffDetails;
    },
    getImages() {
      return this.$store.state.images;
    }
  },
  methods: {
    deleteStuff() {
      this.$store.dispatch("deleteStuff", {
        id :this.stuffIdInStorage,
        username: this.usernameInStorage})
        .then(setTimeout(() => this.$router.push("/mystuff"),1000));
    },
    markAsFavourite() {
      this.$store.dispatch("markAsFavourite", {
        username: this.usernameInStorage,
        stuffId: this.stuffIdInStorage
      });
      document.querySelector("#marked").style.display = "block";
      document.querySelector("#unmarked").style.display = "none";
    },
    unMarkAsFavourite() {
      document.querySelector("#unmarked").style.display = "block";
      document.querySelector("#marked").style.display = "none";
    },
    goToUserDetails(stuffuser) {
      window.sessionStorage.setItem("stuffuser", stuffuser);
      this.$router.push("/userdetails/" + stuffuser);
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

.images {
  margin-left: 2%;
  margin-top: 1%;
  margin-bottom: 1%;
}

.properties {
  margin-bottom: 2%;
  margin-top: 2%;
  margin: 2%;
  padding: 1%;
}

#price {
  font-size: 150%;
}

#currency {
  margin-left: 2%;
}

.icons {
  font-size: 120%;
  color: #ff6802;
}

#username {
  text-decoration: underline;
}

#marked {
  display:none;
}
</style>

