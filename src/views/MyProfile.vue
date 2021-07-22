<template>
  <v-container>
    <v-card class="mx-auto" color="dark" dark>
      <v-toolbar flat color="dark">
        <v-icon large class="text">mdi-account</v-icon>
        <v-toolbar-title justify="center" class="text">{{getDetails.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="#ff6802" fab @click="isEditing = !isEditing">
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
        <v-rating
        label="My Rating"
                  large
                  readonly
                  v-model="getDetails.rating"
                  color="#ff6802"
                  background-color="grey darken-1"
                  empty-icon="$ratingFull"
                  half-increments
                  hover
                ></v-rating>
                <v-row id="rating">
                  <v-col>
                  My rating : {{getDetails.rating}} from {{getDetails.numberOfRating}}
                  </v-col>
                  </v-row>
      <v-card-text>
        <v-text-field v-model="username" :disabled="!isEditing" color="white" :label="getDetails.name"></v-text-field>
        <v-text-field v-model="email" :disabled="!isEditing" color="white" :label="getDetails.email"></v-text-field>
        <v-autocomplete
          v-model="country"
          label= "Country"
          :disabled="!isEditing"
          :filter="customFilter"
          :items="getCountries"
          color="white"
          item-text="name"
        >{{getDetails.country}}</v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" color="success" @click="save">Save</v-btn>
      </v-card-actions>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2500"
       class="snackbar"
      >Your profile has been updated</v-snackbar>
    </v-card>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      hasSaved: false,
      isEditing: null,
      model: null,
      username: window.localStorage.getItem("username"),
      name :null,
      email:null,
      country:null
    };
  },
  created() {
    this.$store.dispatch("getUserDetails", this.username);
  },
  computed: {
    getDetails() {
      window.sessionStorage.setItem("userId", this.$store.state.userDetails.id)
      return this.$store.state.userDetails;
    },
    getCountries() {
      return this.$store.state.countries;
    }
  },
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    save() {
      this.$store.dispatch("updateProfile", {
        id : window.sessionStorage.getItem("userId"),
        name: this.name,
        email: this.email,
        country: this.country,
      });
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    }
  }
};
</script>

<style scoped>
.mx-auto {
  padding: 2%;
}

.text {
  color: #ff6802;
}
</style>