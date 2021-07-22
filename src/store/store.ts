import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    headers: {
      "Authorization": "Bearer " + window.localStorage.getItem("token"),
      'Access-Control-Allow-Origin': '*'
    },
    allUserStuff: [],
    allFavouriteStuff: [],
    popularStuff:[],
    images: [],
    stuffDetails: [],
    countries: [],
    currencies: [],
    signResult: "",
    userDetails: [],
    deleteMessage: "",
    searches: [],
    userRating:"",
  },
  mutations: {
    setAllUserStuff(state, allStuff) {
      state.allUserStuff = allStuff;
    },
    setAllFavouriteStuff(state, allStuff) {
      state.allFavouriteStuff = allStuff;
    },
    setPopularStuff(state, popularStuff) {
      state.popularStuff = popularStuff;
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
    setUserDetails(state, details) {
      state.userDetails = details;
    },
    setDeleteResponse(state, message) {
      state.deleteMessage = message;
    },
    setSearches(state, searches) {
      state.searches = searches;
    },
   
  },
  actions: {
    uploadStuff(context, stuff) {
      axios({
        method: "post",
        url: "http://localhost:9000/uploadstuff",
        data: stuff,
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        },
      })
    },
    getAllUserStuff(context, username) {
      axios({
        method: "get",
        url: `http://localhost:9000/getalluserstuff/${username}`,
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        },
      }).then(response => context.commit("setAllUserStuff", response.data))
    },
    getAllFavouriteStuff(context, username) {
      axios({
        method: "get",
        url: `http://localhost:9000/getallfavouritestuff/${username}`,
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        },
      }).then(response => context.commit("setAllFavouriteStuff", response.data))
    },
    getAllImage(context, id) {
      axios({
        method: "get",
        url: `http://localhost:9000/getimages/${id}`,
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        },
      }).then(response => context.commit("setImages", response.data))
    },
    getStuffDetails(context, id) {
      axios({
        method: "get",
        url: `http://localhost:9000/stuffdetails/${id}`,
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        },
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
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        },
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
      }).then(response => (context.commit("setToken", response.data.token))
      )
    },
    getUserDetails(context, username) {
      axios({
        method: "get",
        url: `http://localhost:9000/getuserdetails/${username}`,
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        },
      }).then(response => context.commit("setUserDetails", response.data))
    },
    deleteStuff(context, data) {
      axios({
        method: "delete",
        url: `http://localhost:9000/deletestuff/${data.id}/${data.username}`,
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        },
      }).then(response => context.commit("setDeleteResponse", response.data))
    },
    getSearch(context, search) {
      axios({
        method: "get",
        url: `http://localhost:9000/getsearch/${search}`,
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        }
      }).then(response => context.commit("setSearches", response.data))
    },
    markAsFavourite(context, data) {
      axios({
        method: "post",
        url: `http://localhost:9000/markasfavourite`,
        data: data,
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        }
      })
    },
    sendRating(context, rating){
      axios({
        method:"post",
        url:`http://localhost:9000/rateuser`,
        data : rating,
        headers:{
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        }
      })
    },
    updateProfile(context, data){
      axios({
        method:"put",
        url:`http://localhost:9000/updateprofile/${data.id}`,
        data : data,
        headers:{
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        }
      }).then(response => context.commit("setUserDetails", response.data))
    },
    sendMessage(context, data){
      axios({
        method:"post",
        url:`http://localhost:9000/sendmessage`,
        data : data,
        headers:{
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        }
      }).then(response => context.commit("setUserDetails", response.data))
    },
    getPopularStuff(context, username) {
      axios({
        method: "get",
        url: `http://localhost:9000/getpopularstuff/${username}`,
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          'Access-Control-Allow-Origin': '*'
        },
      }).then(response => context.commit("setPopularStuff", response.data))
    },

  },

  modules: {}
});
