<template>
  <v-container dark>
    <v-card class="card" md dark>
      <v-row justify="center">
        <v-img id="logo" src="@/assets/logo-StuffX.png" max-height="10%" max-width="30%"></v-img>
      </v-row>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="center" class="text">Create New Account</v-row>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="10">
            <v-text-field
              outlined
              class="text"
              v-model="name"
              :counter="20"
              label="Name"
              :rules="nameRules"
            ></v-text-field>
            <v-text-field
              outlined
              class="text"
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              outlined
              class="text"
              v-model="password"
              :append-icon="show1 ? items[0].icon1 : items[1].icon2"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
              required
            ></v-text-field>
            <v-autocomplete
              dark
              outlined
              class="text"
              :items="getCountries"
              v-model="country"
              label="Country"
            ></v-autocomplete>
            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Accept terms and condition?"
              required
            ></v-checkbox>
            <v-btn
              @click="sendRegistry"
              :disabled="!valid"
              color="success"
              class="mr-4"
            >Create Account</v-btn>
            <v-snackbar v-model="okayDialog" :timeout="2000" absolute>Successful Registration!</v-snackbar>
            <v-dialog v-model="emailErrorDialog" max-width="500">
              <v-card dark>
                <v-card-title wrap>E-mail address is already taken!</v-card-title>
                <v-card-text wrap>Please choose another e-mail address!</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="usernameErrorDialog" max-width="500">
              <v-card dark>
                <v-card-title wrap>Username is already taken!</v-card-title>
                <v-card-text wrap>Please choose another username!</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "newAccount",
  created() {
    this.$store.dispatch("getCountries");
  },
  computed: {
    getCountries() {
      return this.$store.state.countries;
    }
  },
  data: () => {
    return {
      show1: false,
      dialog: false,
      signResult: "",
      emailErrorDialog: false,
      usernameErrorDialog: false,
      okayDialog: false,
      valid: true,
      items: [
        { icon1: "mdi-eye-off-outline", text: "visibility_off" },
        { icon2: "mdi-eye-outline", text: "visibility" }
      ],
      password: "",
      passwordRules: [
        v => !!v || "Required.",
        v => v.length >= 8 || "Min 8 characters"
      ],
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v =>
          (v && v.length <= 20) ||
          v.length < 4 ||
          "Name must be less than 20 characters",
        v => v.length > 3 || "Name must be more than 3 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      country: "",
      checkbox: false,
      lazy: false
    };
  },
  methods: {
    sendRegistry() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
      this.$store
        .dispatch("sendRegistry", {
          name: this.name,
          email: this.email,
          password: this.password,
          country: this.country
        })
        .then(
          setTimeout(() => {
            if (
              this.$store.state.signResult ===
              "Existing e-mail address! Please find another one!"
            ) {
              this.emailErrorDialog = true;
            } else if (
              this.$store.state.signResult ===
              "Existing username! Please find another one!"
            ) {
              this.usernameErrorDialog = true;
            } else {
              this.okayDialog = true;
              setTimeout(() => {
                this.$router.push("/");
              }, 1500);
            }
          }, 1000)
        );
    }
  }
};
</script>

<style scoped>
#logo {
  padding: 0% !important;
  margin: -8%;
}

.card {
  background-color: #424242;
  padding: 1%;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 2%;
}

.text {
  color: #ff6802 !important;
  font-size: 110%;
}

#header {
  margin: 2%;
}
</style>
