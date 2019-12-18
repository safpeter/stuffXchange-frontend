<template>
  <v-container >
      <v-row>
      <v-col>
        <div id="header" absolute color="transparent" depressed>My Stuff
  </div>
     </v-col>
      <v-col>
            <v-btn id="add-button" absolute color="transparent" depressed><v-icon large> mdi-plus-box</v-icon>Add New Stuff</v-btn>
      </v-col>
      </v-row>
  </v-container>
</template>


<style scoped>

#add-button{
  font-family:'Courier New', Courier, monospace !important; 
  margin-top: -10%;
  font-size: 140%;
  display: inline-block;
  margin-left: 12% ;
}

#header {
  font-family: 'Courier New', Courier, monospace !important;
  margin-top: -20%;
   margin-left: 20%;
  font-size:160%;
  color: black;
}
</style>