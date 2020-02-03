<template>
  <div>
    <v-container>
      <v-form ref="form" v-model="valid">
        <v-row justify="center" class="text">Add New Stuff</v-row>
        <v-row wrap>
          <v-col>
            <v-text-field
              dark
              outlined
              color="#ff6802"
              v-model="stuffName"
              label="Stuff Name"
              required
              cols="12"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              dark
              outlined
              color="#ff6802"
              v-model="stuffName"
              label="Stuff Price"
              required
              cols="12"
            ></v-text-field>
          </v-col>
           <v-col>
            <v-autocomplete
              dark
              outlined
              color="#ff6802"
              v-model="stuffName"
              label="Currency"
              required
              cols="12"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-textarea dark color="#ff6802" label="Stuff Description" outlined></v-textarea>
       <v-row >
                       <v-col >
        <input id="input" type="file"  @change="selectFile" accept="image/*" />
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
        <div  v-for="image in images" :key="image.index" max-width="30%" color="#33312E" class="mx-auto" >
            <v-img  :src="image" height="200" width="200" display="inline-block"></v-img>
        </div>
        <img id="picture" width="30%" height="30%" >
       </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    images: [],
  }),
  methods: {
    selectFile(event) {
      let picture = document.getElementById("picture");
      picture.src = URL.createObjectURL(event.target.files[0]);
      this.images.push(picture.src);
      console.log(this.images);
    },
    sendStuff() {
      const data = new FormData();
      data.append("image");
    }
  }
};
</script>

<style scoped>
.mx-auto {
    display: block;
  margin: 1rem !important;
}

.text {
  color: #ff6802;
  font-size: 110%;
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