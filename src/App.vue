<template>
  <v-app id="app">
    <AppBar id="appbar" v-if="!$route.meta.hideNavigation"> </AppBar>
    <v-content>
      <router-view> </router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar";

export default {
  name: "App",
  components: { AppBar }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Vollkorn+SC&display=swap");

#app {
   background-color: #972d03 !important;
  background-repeat: repeat;
  font-size: 110%;
  font-family: "Vollkorn SC", serif;
}
</style>
