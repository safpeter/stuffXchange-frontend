<template>
  <div>
    <v-container>
      <UploadStuff
        :initHeader="this.header"
        :upButton="this.upload"
        :imagesToDisplay="this.imagesToDisplay"
        :initPrice="this.stuffPrice"
        :initName="this.stuffName"
        :initCurrency="this.stuffCurrency"
        :initDescription="this.stuffDescription"
        :initUpdate="this.isUpdate"
      ></UploadStuff>
    </v-container>
  </div>
</template>

<script>
import UploadStuff from "@/components/UploadStuff.vue";
export default {
  components: { UploadStuff },
  data: () => ({
      stuffName:"",
      stuffPrice:"",
      stuffCurrency:"",
      stuffDescription:"",
      imagesToDisplay: [],
      header: "Add New Stuff",
      upload: "Upload",
      isUpdate: false
  }),
};
</script>