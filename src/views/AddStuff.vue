<template>
  <div>
    <v-card dark id="card">
    <v-container>
      <v-form ref="form" enctype="multipart/form-data">
        <v-row justify="center" class="text">Add New Stuff</v-row>
        <v-row wrap>
          <v-col>
            <v-text-field
            class="text"
              dark
              outlined
              color="#ff6802"
              v-model="stuffName"
              label="Stuff Name"
              :rules="[rules.required,rules.nameLength]"
              cols="12"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
            class="text"
              dark
              outlined
              color="#ff6802"
              v-model="stuffPrice"
              label="Stuff Price"
              :rules="[rules.required,rules.priceRules]"
              cols="12"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-autocomplete
              dark
              outlined
              color="#ff6802"
              :items="getCurrencies"
              v-model="stuffCurrency"
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
          v-model="stuffDescription"
          :rules="[rules.required, rules.descriptionLength]"
          outlined
        ></v-textarea>
        <v-row>
          <v-col>
            <input id="input" type="file" @change="selectFile" accept="image/*" />
            <label for="input">
              <v-btn class="btn" color="#ff6802">Select Images</v-btn>
            </label>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn color="success" @click="sendStuff">Upload Stuff</v-btn>
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
            <v-img :src="image" height="200" width="200" display="inline-block"></v-img>
          </v-card>
          <img id="picture" width="35%" height="35%" />
        </v-row>
      </v-form>
    </v-container>
        </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    imagesToDisplay: [],
    stuffName: "",
    stuffPrice: "",
    stuffDescription: "",
    stuffCurrency: "",
    imagesToUpload: [],
    pictureTarget: "",
    rules: {
      required: value => !!value || "Required",
      nameLength: value =>
        value.length > 4 || "Name must be more than 5 characters ",
      priceRules: value => !isNaN(value) || "Price must be a number",
      descriptionLength: value =>
        value.length > 10 || "Description must be more than 10 characters"
    }
  }),
  created() {
    this.$store.dispatch("getCurrencies")
  },
  computed: {
    getCurrencies(){
      return this.$store.state.currencies;
    }
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
      data.set("name", this.stuffName);
      data.set("price", this.stuffPrice);
      data.set("currency", this.stuffCurrency);
      data.set("description", this.stuffDescription);
      data.set("username", window.localStorage.getItem("username"));
      this.imagesToUpload.forEach(i => data.append("images", i));
      this.$store.dispatch("uploadStuff", data)
      .then(setTimeout(() =>this.$router.push("/mystuff"), 1000)); 
    }
  }
};
</script>

<style scoped>

#card {
  margin:1%;
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
</style>