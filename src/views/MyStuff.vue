<template>
  <v-container >
      <v-row>
                <v-col class="headers" absolute color="transparent" depressed>
                My Stuff
             </v-col>
              <v-col>
               <v-btn  class="headers"  absolute color="transparent" depressed><v-icon large> mdi-plus-box</v-icon>Add New Stuff</v-btn>
             </v-col>
     </v-row>
     <v-row>
        <v-card dark class="d-inline-block mx-auto">
    <v-container>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-img
            height="300"
            width="300"
            src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
          ></v-img>
        </v-col>

        <v-col
          cols="auto"
          class="text-center pl-0"
        >
          <v-row
            class="flex-column ma-0 fill-height"
            justify="center"
          >
            <v-col class="px-0">
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-col>

            <v-col class="px-0">
              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
            </v-col>

            <v-col class="px-0">
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
     </v-row>
  </v-container>
</template>


<style scoped>

  
</style>