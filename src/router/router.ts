import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/newaccount",
    name: "newAccount",
    component: () => import("@/views/NewAccount.vue"),
    meta: { hideNavigation: true }
  },
  {
    path: "/",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: { hideNavigation: true }
  },
  {
    path: "/search/:search",
    name: "searchresult",
    component: () => import("@/views/SearchResult.vue")
  },
  {
    path: "/mystuff/",
    name: "mystuff",
    component: () => import("@/views/MyStuff.vue")
  },
  {
    path: "/addstuff",
    name: "addstuff",
    component: () => import("@/views/AddStuff.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/MyProfile.vue")
  },
  {
    path: "/stuffdetails/:id",
    name: "stuffdetails",
    component: () => import("@/views/StuffDetails.vue")
  },
  {
    path: "/userdetails/:name",
    name: "userdetails",
    component: () => import("@/views/UserDetails.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
