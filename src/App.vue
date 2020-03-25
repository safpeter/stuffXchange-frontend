 
<template>
  <v-app id="app">
  <AppBar id="appbar"> </AppBar>  
  <v-content>
         <router-view> 
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