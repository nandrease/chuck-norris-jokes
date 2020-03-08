import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/favourites",
    name: "Favourites",
    // route level code-splitting
    // this generates a separate chunk (favourites.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "favourites" */ "../views/Favourites.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
