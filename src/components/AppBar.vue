 <template>
 <nav>
    <v-app-bar app dark  clipped>
        <v-img class="logo" src="@/assets/logo-StuffX.png" max-height="140%" max-width="12%"></v-img>
        <v-col cols="15" sm="4" md="4" class="search-bar">
      <v-text-field
      color="#ff6802"
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
        class="text-icon"
        >
        <span>Menu</span>
        <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-container class="dropdown">
     <v-list-item v-for="item in items" :key="item.text" >
          <v-btn @click="gotoRoute(item.route)" class="dark--text" absolute color="transparent" depressed>     
            <v-list-item-action>
              <v-icon class="text-icon" id="icons">{{ item.icon }}</v-icon>
            </v-list-item-action >
            <v-list-item-content >
              <v-list-item-title class="text-icon" id="btn-text">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>
      </v-container>
    </v-menu>        
    </v-app-bar>
 </nav>
</template>



<script>
export default {
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

<style scoped>

.dropdown{
  width:300px;
  background-color: #424242;
}

.search-bar{
  color: #ff6802 !important;
  font-size: 110%;
}

.logo {
  margin-left: 0%;
  }

.text-icon {
color:#ff6802 !important;

}


</style>