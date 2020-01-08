 
<template>
  <v-app id="app">
    <v-app-bar app dark  clipped>
      <div>
        <v-img app class="logo" src="@/assets/logo-StuffX.png" height="20%" width="42%"></v-img>
      </div>
        <v-col cols="15" sm="6" md="4" class="search-bar" >
      <v-text-field
      class="search-bar"
        solo-inverted
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
      />  
     </v-col>
     <v-spacer></v-spacer>
      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
        depressed
        color="#424242"
        v-on="on"
        class="orange--text"
        >
        <span>Menu</span>
        <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-container class="dropdown">
     <v-list-item v-for="item in items" :key="item.text" >
          <v-btn @click="gotoRoute(item.route)" class="dark--text" absolute color="transparent" depressed>     
            <v-list-item-action>
              <v-icon class="orange--text" id="icons">{{ item.icon }}</v-icon>
            </v-list-item-action >
            <v-list-item-content >
              <v-list-item-title class="orange--text" id="btn-text">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>
      </v-container>
    </v-menu>
    </v-app-bar>
      
  <v-content>
          <router-view />
    </v-content>
     
  </v-app>
</template>

<script>
import home from "./views/Home";
import login from "./views/Login";

export default {
  name: "App",  
  data: () => ({
          drawerRight: null,
      items: [
      { icon: "mdi-account", text: "My Profile", route:"profile" },
      { icon: "mdi-cash-multiple", text: "My Stuff", route:"mystuff"},
      { icon: "mdi-magnify-plus", text: "Advanced Search", route:"search" },
      { icon: "mdi-logout", text: "Log out" }
    ],
  }), 
  methods: {
    gotoRoute(route){
      this.$router.push("/" + route);
    }
  }
}
</script>
<style scoped >
#app {
  background-color:#f1803a !important;
  background-repeat: repeat;
  color: #424242;
  font-family:Georgia, 'Times New Roman', Times, serif!important;
}

.dropdown{
  width:300px;
  background-color: #424242;
}

.search-bar{
  color: #f1803a !important;
  font-size: 110%;
  margin-left: -20%;
}

.logo {
  margin-left: -5%;
  margin-top: 3%;
}

</style>