import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allStuff: [],
  },
  mutations: {
    setAllStuff(state, allStuff) {
      state.allStuff = allStuff;
    }
  },
  actions: {
    uploadStuff(stuff) {
      axios({
        method: "post",
        headers: { 'content-type': 'multipart/form-data' },
        url: "http://localhost:9000/uploadstuff",
        data: stuff
      })
    },
    getAllStuff(context) {
      axios({
        method: "get",
        url: "http://localhost:9000/getallstuff"
      }).then(response => context.commit("setAllStuff", response.data))
    }
  },

  modules: {}
});
