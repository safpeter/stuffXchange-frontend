<template>
  <v-app id="app">
     <v-col cols="15" sm="6" md="4" class="search-bar" >
      <v-text-field
      class="orange--text"
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
      text-color="orange"
      class="navbar"
      v-model="drawer"
      app
      clipped
    >          <v-img class="logo" src="@/assets/StuffX-logo.png" height="34%" width="auto%"></v-img>
   <v-list-item v-for="item in items" :key="item.text" text-color="orange">
          <v-btn @click="gotoRoute(item.route)" class="orange--text" absolute color="transparent" depressed>     
            <v-list-item-action>
              <v-icon class="orange--text">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content >
              <v-list-item-title >{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>
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
  data: () => ({
      items: [
      { icon: "mdi-account", text: "My Profile" },
      { icon: "mdi-cash-multiple", text: "Stuff to sell", route:"sell"},
      { icon: "mdi-basket", text: "Stuff to Buy", route:"buy" },
      { icon: "mdi-magnify-plus", text: "Advanced Search", route:"search" },
      { icon: "mdi-logout", text: "Log out" }
    ],
  }), 

}
</script>
<style scoped >
.navbar {
  background-color:#424242 !important;
}

#app {
  background-color:orange !important;
  }

.search-bar{
  margin-left: 45%;
  color: orange !important;
}

.logo {
  margin-top: -1%;
 
}


</style>