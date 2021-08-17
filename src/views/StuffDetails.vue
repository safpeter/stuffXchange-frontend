<template>
  <div>
    <v-card dark class="properties">
      <v-container>
        <v-row v-if="getStuffDetails.user.name === this.usernameInStorage">
          <MyDetailHeader :initName="getStuffDetails.name"></MyDetailHeader>
        </v-row>
        <v-row v-else>
          <NotMyDetailHeader
            :initFavList="getFavouriteStuffIds"
          ></NotMyDetailHeader>
        </v-row>
        <v-row>
          <v-col>
            <v-row class="label">Stuff name:</v-row>
            <v-row class="property">{{ getStuffDetails.name }}</v-row>
            <v-row class="label">Stuff price:</v-row>
            <v-row id="price">
              <span>{{ getStuffDetails.price }}</span>
              <span id="currency">{{ getStuffDetails.currency }}</span>
            </v-row>
            <v-row>
              <v-col v-if="getStuffDetails.user.name != this.usernameInStorage">
                <v-row class="label">Uploaded by:</v-row>
                <v-row id="username" class="property">
                  <v-btn
                    @click="goToUserDetails(getStuffDetails.user.name)"
                    color="transparent"
                    depressed
                    >{{ getStuffDetails.user.name }} from
                    {{ getStuffDetails.user.country }}</v-btn
                  >
                </v-row>
              </v-col>
            </v-row>
            <v-row class="label">Date of Upload:</v-row>
            <v-row class="property">{{ getStuffDetails.date }}</v-row>
          </v-col>
          <v-col>
            <template>
              <v-card class="images" @click.stop="dialog = true">
                <v-img
                  :src="getImages[0]"
                  height="300"
                  width="600"
                  display="inline"
                ></v-img>
              </v-card>
            </template>
          </v-col>
        </v-row>
        <v-row class="label">Stuff Description:</v-row>
        <v-row class="property">{{ getStuffDetails.description }}</v-row>
      </v-container>
    </v-card>
    <v-card dark>
      <v-row pa-2>
        <template>
          <v-dialog v-model="dialog">
            <template>
              <v-carousel class="carousel">
                <v-carousel-item
                  id="carousel"
                  v-for="image in getImages"
                  :key="image"
                  :src="image"
                >
                  >
                </v-carousel-item>
              </v-carousel>
            </template>
          </v-dialog>
        </template>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import MyDetailHeader from "@/components/MyDetailHeader.vue";
import NotMyDetailHeader from "@/components/NotMyDetailHeader.vue";

export default {
  components: { MyDetailHeader, NotMyDetailHeader },
  created() {
    this.$store.dispatch("getAllImage", window.sessionStorage.getItem("id"));
    this.$store.dispatch(
      "getStuffDetails",
      window.sessionStorage.getItem("id")
    );
    this.$store.dispatch(
      "getAllFavouriteStuff",
      window.localStorage.getItem("username")
    );
  },
  data: () => ({
    dialog: false,
    usernameInStorage: window.localStorage.getItem("username"),
  }),
  computed: {
    getStuffDetails() {
      return this.$store.state.stuffDetails;
    },
    getImages() {
      return this.$store.state.images;
    },
    getAllFavouriteStuff() {
      return this.$store.state.allFavouriteStuff;
    },
    getFavouriteStuffIds() {
      let favStuffIds = [];
      for (let stuff of this.$store.state.allFavouriteStuff) {
        favStuffIds.push(stuff.id);
      }
      return favStuffIds;
    },
  },
  methods: {
    goToUserDetails(stuffuser) {
      window.sessionStorage.setItem("stuffuser", stuffuser);
      this.$router.push("/userdetails/" + stuffuser); 
      console.log(this.getFavouriteStuffIds);
    },
  },
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
  font-size: 160%;
}

#currency {
  margin-left: 2%;
  margin-top: 1%;
  font-size: 80%;
}

#username {
  text-decoration: underline;
}
</style>
