<template>
  <v-container>
    <UploadStuff
      :header="this.header + getStuffDetails.name"
      :initName="getStuffDetails.name"
      :initPrice="getStuffDetails.price"
      :initCurrency="getStuffDetails.currency"
      :initDescription="getStuffDetails.description"
      :upButton="this.header "
      :imagesToDisplay="getImages"
    ></UploadStuff>
  </v-container>
</template>

<script>
import UploadStuff from "@/components/UploadStuff.vue";
export default {
  created(){
    this.$store.dispatch("getAllImage", window.sessionStorage.getItem("id"));
    this.$store.dispatch(
      "getStuffDetails",
      window.sessionStorage.getItem("id")
    );
  },
  components: { UploadStuff },
  computed: {
    getStuffDetails() {
      return this.$store.state.stuffDetails;
    },
    getImages() {
      return this.$store.state.images;
    },
  },
  data:() => ({
      header: "Update ",
    }),
};
</script>


