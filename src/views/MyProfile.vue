<template>
  <v-container>
    <v-card class="mx-auto" color="dark" dark>
      <v-toolbar flat color="dark">
        <v-icon large class="text">mdi-account</v-icon>
        <v-toolbar-title justify="center" class="text">{{
          getDetails.name
        }}</v-toolbar-title>
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
          My rating : {{ getDetails.rating }} from
          {{ getDetails.numberOfRating }}
        </v-col>
      </v-row>
      <v-card-text>
        <v-text-field
          v-model="username"
          :disabled="!isEditing"
          class="field"
          label="Username"
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="email"
          class="field"
          :disabled="!isEditing"
          label="E-mail"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          v-model="password"
          class="field"
          :disabled="!isEditing"
          label="Password"
          :rules="passwordRules"
          type="password"
        ></v-text-field>
        <v-autocomplete
          v-model="country"
          label="Country"
          :disabled="!isEditing"
          :filter="customFilter"
          :items="getCountries"
          class="field"
          >{{ getDetails.country }}</v-autocomplete
        >
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn :disabled="!isEditing" color="error" @click="getDialog"
          >Delete Profile</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" color="success" @click="save">Save</v-btn>
      </v-card-actions>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2000"
        class="snackbar"
      >{{this.updateSuccess}}</v-snackbar>
      <v-snackbar
        v-model="emailFail"
        :timeout="2000"
        class="snackbar"
      >{{this.updateEmailFail}}</v-snackbar>
      <v-snackbar
        v-model="nameFail"
        :timeout="2000"
        class="snackbar"
      >{{this.updateNameFail}}</v-snackbar>
    </v-card>
    <v-dialog persistent v-model="dialog" max-width="600">
      <v-card dark>
        <v-card-title wrap centered
          >Your Profile is going to be deleted permanently!</v-card-title
        >
        <v-card-text wrap
          >Are you sure you want to delete your profile?</v-card-text
        >
        <v-card-actions>
          <v-btn color="error" @click="noDelete">NO</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="deleteProfile">YES</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card dark>
        <v-card-title wrap centered>Your Profile is Deleted!</v-card-title>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      updateSuccess:'Your profile has been updated',
      updateEmailFail: 'This e-mail address already exists! Please choose another one!',
      updateNameFail: 'This Name address already exists! Please choose another one!',
      emailFail:false,
      nameFail:false,
      hasSaved: false,
      isEditing: null,
      model: null,
      dialog: false,
      deleteDialog: false,
      username:null,
      password: null,
      passwordRules: [
        (v) => v.length > 7 || "Password must be minimum 8 characters!",
      ],
      nameRules: [
        (v) =>
          (v && v.length <= 20) ||
          v.length < 4 ||
          "Name must be less than 20 characters",
        (v) => v.length > 3 || "Name must be more than 3 characters",
      ],
      email: null,
      emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      country: null,
    };
  },
  created() {
    this.$store.dispatch("getUserDetails", window.localStorage.getItem('username'));
  },
  computed: {
    getDetails() {
      window.sessionStorage.setItem("userId", this.$store.state.userDetails.id);
      return this.$store.state.userDetails;
    },
    getCountries() {
      return this.$store.state.countries;
    },
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
        id: window.sessionStorage.getItem("userId"),
        name: this.username,
        password: this.password,
        email: this.email,
        country: this.country,
      })
      .then(setTimeout(() => {
        if (this.$store.state.updateResult == 'Wrong E-mail' )  {
            this.emailFail = true 
            } else if(this.$store.state.updateResult == 'Wrong Name') {
                this.nameFail = true
          } else if(this.$store.state.updateResult == 'Profile Updated') {
              this.hasSaved = true,
              this.isEditing = !this.isEditing;
          }
      }, 2000))}
    ,
    getDialog() {
      this.dialog = true;
    },
    noDelete() {
      this.dialog = false;
    },
    deleteProfile() {
      this.$store
        .dispatch("deleteProfile", window.sessionStorage.getItem("userId"))
        .then((this.deleteDialog = true))
        .then(
          setTimeout(() => {
            this.$router.push("/");
          }, 2000)
        )
        .then(
          window.localStorage.removeItem("token"),
          window.localStorage.removeItem("role"),
          window.localStorage.removeItem("username"),
          window.sessionStorage.removeItem("stuffuser"),
          window.sessionStorage.removeItem("id"),
          window.sessionStorage.removeItem("search"),
          window.sessionStorage.removeItem("userId")
        );
    },
  }
};
</script>

<style scoped>
.mx-auto {
  padding: 2%;
  font-size: 120%;
}

.text {
  color: #ff6802;
}

.snackbar {
  font-size: 90%;
  margin-bottom: 40%;
}

.field {
  font-size: 130%;
}
</style>
