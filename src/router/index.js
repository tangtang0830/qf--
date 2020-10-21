import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login";
import dynamicRoutes from "./dynamicRoutes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login
  },
  ...dynamicRoutes
];

const router = new VueRouter({
  routes
});

export default router;
