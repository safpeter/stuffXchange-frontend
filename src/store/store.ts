import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    headers:{
      "Authorization": "Bearer " + window.localStorage.getItem("token"),
      'Access-Control-Allow-Origin': '*'
    },
    allStuff: [],
    images: [],
    stuffDetails: [],
    countries: [],
    currencies: [],
    signResult: [],
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
    },
    setSignResult(state, result) {
      state.signResult = result;
    },
    setToken(state, token) {
      window.localStorage.setItem("token", token)
    },

  },
  actions: {
    uploadStuff(context, stuff) {
      axios({
        method: "post",
        url: "http://localhost:9000/uploadstuff",
        data: stuff,
        headers: this.state.headers
      })
    },
    getAllStuff(context) {
      axios({
        method: "get",
        url: "http://localhost:9000/getallstuff", 
        headers:{
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        },   
      }).then(response => context.commit("setAllStuff", response.data))
    },
    getAllImage(context, id) {
      axios({
        method: "get",
        url: `http://localhost:9000/getimages/${id}`,
        headers: this.state.headers
      }).then(response => context.commit("setImages", response.data))
    },
    getStuffDetails(context, id) {
      axios({
        method: "get",
        url: `http://localhost:9000/stuffdetails/${id}`,
        headers: this.state.headers
      }).then(response => context.commit("setStuffDetails", response.data))
    },
    getCountries(context) {
      axios({
        method: "get",
        url: `http://localhost:9000/getcountries`,
      }).then(response => context.commit("setCountries", response.data))
    },
    getCurrencies(context) {
      axios({
        method: "get",
        url: `http://localhost:9000/getcurrencies`,
       headers:this.state.headers,
      }).then(response => context.commit("setCurrencies", response.data))
    },
    sendRegistry(context, data) {
      axios({
        method: "post",
        url: `http://localhost:9000/auth/signup`,
        data: data,
      }).then(response => context.commit("setSignResult", response.data))
    },
    sendLogin(context, data) {
      axios({
        method: "post",
        url: `http://localhost:9000/auth/login`,
        data: data,
      }).then(response => context.commit("setToken",response.data.token))
    },

  },

  modules: {}
});
