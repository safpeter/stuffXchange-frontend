<template>
  <div >
    <v-container v-if="this.role == 'user'">
      <v-card class="cards" dark justify="center">
        <v-row justify="center">
          <v-btn @click="goToAddStuff" id="btn-add" color="transparent" depressed>
            <v-icon x-large>mdi-plus-box</v-icon>Add New Stuff
          </v-btn>
        </v-row>
        <v-row class="text">Stuff To Sell</v-row>
        <v-row pa-2 justify="center" v-if="getAllUserStuff.length == 0">
          <p id="btn-add">There is no stuff you want to sell!</p>
        </v-row>
        <v-row pa-2 justify="center" v-else>
          <v-card
            v-for="stuff in getAllUserStuff"
            :key="stuff.id"
            @click="getDetails(stuff.id)"
            dark
            class="image-cards"
            max-height="270"
            max-width="270"
            justify="center"
          >
            <v-img :src="stuff.mainPicture" height="75%" width="100%"></v-img>
            <p v-if="stuff.name.length > 20" class="card-title">
              {{stuff.name.slice(0,20)}}
              <span>...</span>
            </p>
            <p v-else class="card-title">{{stuff.name}}</p>
            <p class="price">
              {{stuff.price}}
              <span id="currency">{{stuff.currency}}</span>
            </p>
          </v-card>
        </v-row>
      </v-card>
      <v-card class="cards" dark>
        <v-row class="text">Stuff To Buy</v-row>
        <v-row pa-2 justify="center" v-if="getAllFavouriteStuff.length == 0">
          <p id="btn-add">There is no stuff you are interested in!</p>
        </v-row>
        <v-row pa-2 justify="center" v-else>
          <v-card
            v-for="stuff in getAllFavouriteStuff"
            :key="stuff.id"
            @click="getDetails(stuff.id)"
            dark
            class="image-cards"
            max-height="270"
            max-width="270"
            justify="center"
          >
            <v-img :src="stuff.mainPicture" height="75%" width="100%"></v-img>
            <p v-if="stuff.name.length > 20" class="card-title">
              {{stuff.name.slice(0,20)}}
              <span>...</span>
            </p>
            <p v-else class="card-title">{{stuff.name}}</p>
            <p class="price">
              {{stuff.price}}
              <span id="currency">{{stuff.currency}}</span>
            </p>
            <p v-if="getUserRoles"></p>
          </v-card>
        </v-row>
      </v-card>
    </v-container>
    <v-container v-else-if="this.role == 'admin' ">
      <v-card class="cards" dark justify="center">
        <v-row justify="center">
        </v-row>
        <v-row class="text">Blocked Stuff</v-row>
        <v-row pa-2 justify="center" v-if="getAllUserStuff.length == 0">
          <p id="btn-add">There is no blocked stuff at the moment!</p>
        </v-row>
        <v-row pa-2 justify="center" v-else>
          <v-card
            v-for="stuff in getAllUserStuff"
            :key="stuff.id"
            @click="getDetails(stuff.id)"
            dark
            class="image-cards"
            max-height="270"
            max-width="270"
            justify="center"
          >
            <v-img :src="stuff.mainPicture" height="75%" width="100%"></v-img>
            <p v-if="stuff.name.length > 20" class="card-title">
              {{stuff.name.slice(0,20)}}
              <span>...</span>
            </p>
            <p v-else class="card-title">{{stuff.name}}</p>
            <p class="price">
              {{stuff.price}}
              <span id="currency">{{stuff.currency}}</span>
            </p>
          </v-card>
        </v-row>
      </v-card>
      <v-card class="cards" dark>
        <v-row class="text">Blocked Users</v-row>
        <v-row pa-2 justify="center" v-if="getAllFavouriteStuff.length == 0">
          <p id="btn-add">There is no blocked users at the moment!</p>
        </v-row>
        <v-row pa-2 justify="center" v-else>
          <v-card
            v-for="stuff in getAllFavouriteStuff"
            :key="stuff.id"
            @click="getDetails(stuff.id)"
            dark
            class="image-cards"
            max-height="270"
            max-width="270"
            justify="center"
          >
            <v-img :src="stuff.mainPicture" height="75%" width="100%"></v-img>
            <p v-if="stuff.name.length > 20" class="card-title">
              {{stuff.name.slice(0,20)}}
              <span>...</span>
            </p>
            <p v-else class="card-title">{{stuff.name}}</p>
            <p class="price">
              {{stuff.price}}
              <span id="currency">{{stuff.currency}}</span>
            </p>
          </v-card>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>

export default {
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
    role: window.localStorage.getItem("role")
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
.text {
  color: #ff6802;
  padding: 2%;
  font-size: 110%;
  text-decoration: underline;
  margin: 1%;
}

#btn-add {
  padding: 1%;
  font-size: 130%;
  color: #ff6802;
  margin: 1%;
}

.image-cards {
  margin: 0.5%;
}

.cards {
  margin-bottom: 1%;
}

.card-title {
  margin-left: 2%;
  margin-top: 2%;
  margin-bottom: 0%;
  font-size: 110%;
}

#currency {
  margin-left: 2%;
}

.price {
  margin-left: 2%;
  font-size: 110%;
}
</style>