import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/newaccount",
    name: "newAccount",
    component: () => import ("@/views/NewAccount.vue")
  },
  {
    path: "/",
    name: "login",
    component: () => import ("@/views/Login.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import ("@/views/Home.vue")
  },
  {
    path: "/sell",
    name: "sellstuff",
    component: () => import("@/views/SellStuff.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
