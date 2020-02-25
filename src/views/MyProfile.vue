<template>
  <v-container>
    <v-card class="mx-auto" color="dark" dark>
      <v-toolbar flat color="dark">
        <v-icon large class="text">mdi-account</v-icon>
        <v-toolbar-title justify="center" class="text">{{username}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="#ff6802" fab @click="isEditing = !isEditing">
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field :disabled="!isEditing" color="white" label="Name"></v-text-field>
        <v-text-field :disabled="!isEditing" color="white" label="Email"></v-text-field>
        <v-text-field :disabled="!isEditing" color="white" label="Password"></v-text-field>
        <v-autocomplete
          :disabled="!isEditing"
          :items="states"
          :filter="customFilter"
          color="white"
          item-text="name"
          label="Country"
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" color="success" @click="save">Save</v-btn>
      </v-card-actions>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2000"
        absolute
        bottom
        left
      >Your profile has been updated</v-snackbar>
    </v-card>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      hasSaved: false,
      isEditing: null,
      model: null,
      states: [
        { name: "Florida", abbr: "FL", id: 1 },
        { name: "Georgia", abbr: "GA", id: 2 },
        { name: "Nebraska", abbr: "NE", id: 3 },
        { name: "California", abbr: "CA", id: 4 },
        { name: "New York", abbr: "NY", id: 5 }
      ]
    };
  },

  methods: {
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    save() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    }
  }
};
</script>

<style scoped>
.mx-auto {
  padding: 2%;
}

.text {
  color: #ff6802;
}
</style>