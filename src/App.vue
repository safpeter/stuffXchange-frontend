 
<template>
  <v-app id="app">
  <AppBar> </AppBar>  
  <v-content>
         <router-view> </router-view >
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
#app {
  background-color:#33312E !important;
  background-repeat: repeat;
  color: #424242;
  font-family:Cambria, Cochin, Georgia,  !important;
}


</style>