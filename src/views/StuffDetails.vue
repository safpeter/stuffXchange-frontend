<template>
  <div>
    <v-card dark class="properties">
      <v-container>
        <v-row class="label">Stuff name:</v-row>
        <v-row class="property">{{getStuffDetails.name}}</v-row>
        <v-row class="label">Stuff price:</v-row>
        <v-row class="property">{{getStuffDetails.price}}</v-row>
        <v-row class="label">Uploaded:</v-row>
        <v-row class="property">{{getStuffDetails.date}}</v-row>
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
          >
            <v-img  
            :src="image" 
            height="200"
             width="200" 
             display="inline"></v-img>
          </v-card>
          <v-dialog  
          v-model="dialog">
            <template>
              <v-carousel hide-delimiters>
                <v-carousel-item 
                height="600"
                 width="900"
                id="carousel" 
                v-for="image in getImages" 
                :key="image" 
                   :src="image"
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
export default {
  data: () => ({
    dialog: false
  }),
  computed: {
    getStuffDetails() {
      return this.$store.state.stuffDetails;
    },
    getImages() {
      return this.$store.state.images;
    }
  },
//   methods: {
//     //   getPicture(event){
//     //       let target = event.target;
//     //   }
//   }
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
}
</style>

