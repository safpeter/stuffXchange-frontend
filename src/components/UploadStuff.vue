<template>
  <v-card dark id="card">
    <v-container>
      <v-form ref="form" enctype="multipart/form-data">
        <v-row justify="center" class="text">{{ header }}</v-row>
        <v-row wrap>
          <v-col>
            <v-text-field
              class="text"
              dark
              outlined
              color="#ff6802"
              v-model="name"
              label="Stuff Name"
              :rules="[rules.required, rules.nameLength]"
              cols="12"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              class="text"
              dark
              outlined
              color="#ff6802"
              v-model="price"
              label="Stuff Price"
              :rules="[rules.required, rules.priceRules]"
              cols="12"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-autocomplete
              dark
              outlined
              color="#ff6802"
              :items="getCurrencies"
              v-model="currency"
              label="Currency"
              cols="12"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-textarea
          class="text"
          dark
          color="#ff6802"
          label="Stuff Description"
          v-model="description"
          rows="10"
          :rules="[rules.required, rules.descriptionLength]"
          outlined
        ></v-textarea>
        <v-row>
          <v-col>
            <input
              id="input"
              type="file"
              @change="selectFile"
              accept="image/*"
            />
            <label for="input">
              <v-btn class="btn" color="#ff6802">Select Images</v-btn>
            </label>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn color="success" @click="sendStuff"
              >{{ upButton }}   Stuff</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-card
            v-for="image in imagesToDisplay"
            :key="image.index"
            max-width="30%"
            color="#33312E"
            class="mx-auto"
          >
            <v-img
              :src="image"
              height="200"
              width="200"
              display="inline-block"
            ></v-img>
          </v-card>
          <img id="picture" width="35%" height="35%" />
           <v-snackbar v-model="hasUpdated" :timeout="2000" class="snackbar"
        >{{ name }}  {{ cardText }}</v-snackbar
      >
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: [
    "initHeader",
    "initName",
    "initPrice",
    "initCurrency",
    "initDescription",
    "upButton",
    "imagesToDisplay",
    "initUpdate" ,
    "initCardText"
  ],
  data: (vm) => ({
    description: vm.initDescription,
    name: vm.initName,
    currency: vm.initCurrency,
    price: vm.initPrice,
    imagesToUpload: [],
    pictureTarget: "",
    header: vm.initHeader,
    isUpdate: vm.initUpdate,
    hasUpdated: false,
    stuff: vm.initStuff,
    cardText: vm.initCardText,
    rules: {
      required: (value) => !!value || "Required",
      nameLength: (value) =>
        value.length > 4 || "Name must be more than 5 characters ",
      priceRules: (value) => !isNaN(value) || "Price must be a number",
      descriptionLength: (value) =>
        value.length > 10 || "Description must be more than 10 characters",
    },
  }),
  created() {
    this.$store.dispatch("getCurrencies");
  },
  computed: {
    getCurrencies() {
      return this.$store.state.currencies;
    },
  },
  methods: {
    selectFile(event) {
      let target = event.target.files[0];
      this.pictureTarget = target;
      this.imagesToUpload.push(target);
      let picture = document.getElementById("picture");
      picture.src = URL.createObjectURL(target);
      this.imagesToDisplay.push(picture.src);
    },
    sendStuff() {
      const data = new FormData();
      data.set("id", window.sessionStorage.getItem("id"))
      data.set("name", this.name);
      data.set("price", this.price);
      data.set("currency", this.currency);
      data.set("description", this.description);
      data.set("username", window.localStorage.getItem("username"));
      this.imagesToUpload.forEach((i) => data.append("images", i));
      if (this.isUpdate == true) {
        this.$store
          .dispatch("updateStuff", data)
          .then(this.hasUpdated = true)
          .then(setTimeout(() => this.$router.push("/stuffdetails/" + window.sessionStorage.getItem('id')), 2000));
      } else {
         this.$store
          .dispatch("uploadStuff", data)
          .then(this.hasUpdated = true)
          .then(setTimeout(() => this.$router.push("/mystuff"), 2000));
      }
    },
  },
};
</script>

<style scoped>
#card {
  margin: 1%;
}

.mx-auto {
  display: block;
  margin: 1rem !important;
}

.text {
  color: #ff6802;
  font-size: 120%;
}

#input {
  display: none;
}

#picture {
  display: none;
}
.btn {
  pointer-events: none;
}

.snackbar {
  font-size: 100%;
  margin-bottom: 40%;
}
</style>
