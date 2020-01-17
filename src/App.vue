 
<template>
  <v-app id="app">
  <AppBar> </AppBar>  
  <v-content>
         <router-view> </router-view >
    </v-content>
     
  </v-app>
</template>

<script>
import home from "@/views/Home";
import login from "@/views/Login";
import AppBar from "@/components/AppBar"

export default {
  name: "App", 
  components: {AppBar}, 
 
}
</script>
<style scoped >
#app {
  background-color:#ff6802 !important;
  background-repeat: repeat;
  color: #424242;
  font-family:Cambria, Cochin, Georgia,  !important;
}


</style>