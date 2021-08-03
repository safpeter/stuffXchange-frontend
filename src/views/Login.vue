<template>
  <div>
    <v-container>
      <v-card class="card">
        <v-row justify="center">
          <v-img
            id="logo"
            src="@/assets/logo-StuffX.png"
            max-height="100%"
            max-width="30%"
          ></v-img>
        </v-row>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row class="text" justify="center">Welcome to StuffX!</v-row>
          <v-row class="text" justify="center"
            >Enter your Username and Password to log in or create a new
            account!</v-row
          >
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="10">
              <v-text-field
                dark
                outlined
                class="text"
                v-model="name"
                :counter="20"
                :rules="nameRules"
                label="Name"
              ></v-text-field>
              <v-text-field
                dark
                class="text"
                outlined
                v-model="password"
                :append-icon="show1 ? items[0].icon1 : items[1].icon2"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                cols="12"
                counter
                @click:append="show1 = !show1"
                required
              ></v-text-field>
              <v-row>
                <v-col>
                  <v-btn @click="login" :disabled="!valid" color="success"
                    >Login</v-btn
                  >
                </v-col>
                <v-col>
                  <span class="text">Or</span>
                </v-col>
                <v-col>
                  <v-btn @click="newAccountBtn" color="#ff6802"
                    >Create account</v-btn
                  >
                </v-col>
              </v-row>
              <v-dialog v-model="dialog" max-width="290">
                <v-card dark>
                  <v-card-title wrap>Login failed</v-card-title>
                  <v-card-text wrap>Invalid Username or Password!</v-card-text>
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
  </div>
</template>

<script>
export default {
  name: "sign",
  created() {
    this.$store.dispatch("getCountries");
  },
  data: () => ({
    show1: false,
    dialog: false,
    valid: true,
    items: [
      { icon1: "mdi-eye-off-outline", text: "visibility_off" },
      { icon2: "mdi-eye-outline", text: "visibility" }
    ],
    password: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 20) || "Name must be less than 20 characters"
    ],

    lazy: false
  }),
  methods: {
    dispatch() {
      this.$store.dispatch("sendLogin", {
        username: this.name,
        password: this.password
      });
    },
    //  getResponse(){
    //     window.localStorage.setItem("username",this.name);
    //            (this.$store.dispatch("getUserDetails",this.name)).then(
    //              window.localStorage.setItem("role",  "user")).then(
    //                 this.$router.push("/home"));
    //  },
    // async login() {
    //   try {
    //     this.dispatch()
    //      let response = await  this.$store.signResult
    //      console.log(response)
    //      console.log(this.$store.state.signResult);

    //   } catch (err) {
    //     console.log("something went wrong!")
    //     this.dialog = true
    //   }
    // },
    login() {
      let promise = new Promise(resolve => {
        resolve(this.dispatch());
      });
      promise.then(
        setTimeout(() => {
          if (window.localStorage.getItem("token")) {
            window.localStorage.setItem("username", this.name);
            this.$store
              .dispatch("getUserDetails", this.name)
              .then(window.localStorage.setItem("role", "user"))
              .then(this.$router.push("/home"));
          } else {
            this.dialog = true;
          }
        }, 2500)
      );
    },
    newAccountBtn() {
      this.$router.push("/newAccount");
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
  margin: 2%;
}
</style>
