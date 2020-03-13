import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allStuff: [],
    images: [],
    stuffDetails: [],
    countries: [],
    currencies: [],
  },
  mutations: {
    setAllStuff(state, allStuff) {
      state.allStuff = allStuff;
    },
    setImages(state, images) {
      state.images = images
    },
    setStuffDetails(state, stuffDetails) {
      state.stuffDetails = stuffDetails;
    },
    setCountries(state, countries) {
      state.countries = countries;
    },
    setCurrencies(state, currencies) {
      state.currencies = currencies;
    }

  },
  actions: {
    uploadStuff(context, stuff) {
      axios({
        method: "post",
        url: "http://localhost:9000/uploadstuff",
        data: stuff
      })
    },
    getAllStuff(context) {
      axios({
        method: "get",
        url: "http://localhost:9000/getallstuff"
      }).then(response => context.commit("setAllStuff", response.data))
    },
    getAllImage(context, id) {
      axios({
        method: "get",
        url: `http://localhost:9000/getimages/${id}`
      }).then(response => context.commit("setImages", response.data))
    },
    getStuffDetails(context, id) {
      axios({
        method: "get",
        url: `http://localhost:9000/stuffdetails/${id}`
      }).then(response => context.commit("setStuffDetails", response.data))
    },
    getCountries(context) {
      axios({
        method: "get",
        url: `http://localhost:9000/getcountries`
      }).then(response => context.commit("setCountries", response.data))
    },
    getCurrencies(context) {
      axios({
        method: "get",
        url: `http://localhost:9000/getcurrencies`
      }).then(response => context.commit("setCurrencies", response.data))
    },
  },

  modules: {}
});
