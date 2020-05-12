 <template class=appbar>
  <nav>
    <v-app-bar app color="#ff6802" clipped>
      <v-img src="@/assets/logo-StuffX.png" max-height="140%" max-width="12%"></v-img>
      <v-col cols="15" sm="4" md="4" class="search-bar">
        <v-text-field
          v-model="searchText"
          color="#ff6802"
          class="search-bar-text"
          solo-inverted
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          @input="search"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn depressed color="transparent" v-on="on" class="text-icon">
            <span id="menu">Menu</span>
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-container class="dropdown">
          <v-list-item v-for="item in items" :key="item.text">
            <v-btn
              @click="gotoRoute(item.route)"
              class="dark--text"
              absolute
              color="transparent"
              depressed
            >
              <v-list-item-action>
                <v-icon class="text-icon">{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="text-icon">{{ item.text }}</v-list-item-title>
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
    token: window.localStorage.getItem("token"),
    searchText: "",
    items: [
      { icon: "mdi-account", text: "My Profile", route: "profile" },
      { icon: "mdi-cash-multiple", text: "My Stuff", route: "mystuff" },
      { icon: "mdi-email", text: "Notifications", route: "notifications" },
      { icon: "mdi-magnify-plus", text: "Advanced Search", route: "search" },
      { icon: "mdi-logout", text: "Log out", route: "" }
    ]
  }),
  methods: {
    gotoRoute(route) {
      this.$router.push("/" + route);
      if (route == "") {
        setTimeout( () => {
        window.localStorage.removeItem("token");
         window.localStorage.removeItem("role");
        window.localStorage.removeItem("username");
        window.sessionStorage.removeItem("stuffuser");
         window.sessionStorage.removeItem("id");
        window.sessionStorage.removeItem("search");
      },1000)} 
    },
    search() {
      this.$store.dispatch("getSearch", this.searchText);
      this.$router.push("/search/" + this.searchText);
      window.sessionStorage.setItem("search", this.searchText);
    }
  }
};
</script>

<style scoped>
#menu {
  font-size: 130% !important;
}

.dropdown {
  width: 300px;
  background-color: #ff6802;
}

.search-bar {
  color: #ff6802 !important;
}

.search-bar-text {
  border: solid #33312e 1px;
  font-size: 110%;
}

.text-icon {
  color: #33312E !important;
  font-size: 120%;
}
</style>