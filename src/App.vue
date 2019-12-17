<template>
  <v-app id="app">
     <v-col cols="15" sm="6" md="4" class="search-bar">
      <v-text-field
        solo-inverted
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
      />  
     </v-col>
       <v-navigation-drawer
       absolute
      permanent
      right
      floating
      
      class="navbar"
      v-model="drawer"
      app
      clipped
    >
     </v-navigation-drawer>
      <v-content>
      <router-view/>
      </v-content>
  </v-app>
</template>
<script>
import home from "./views/Home";

export default {
  name: "App",  
}
</script>
<style scoped >
.navbar {
  background-color:#424242 !important;
  box-shadow:transparent;
}

#app {
  background-color:orange !important;
  }

.search-bar{
  margin-left: 45%;
}

</style>