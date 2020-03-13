 
<template>
  <v-app id="app">
  <AppBar> </AppBar>  
  <v-content>
         <router-view> 
     <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-parallax>
         </router-view >
    </v-content>
     
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar"

export default {
  name: "App", 
  components: {AppBar}, 
 
}
</script>
<style scoped >
@import url('https://fonts.googleapis.com/css?family=Sen&display=swap');

#app {
  background-color:#33312E !important;
  background-repeat: repeat;
  font-size: 110%;
  font-family:'Sen',sans-serif;   

}


</style>