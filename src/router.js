import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import User from "./views/User";
import Soporte from "./views/Soporte";
import CreateNotification from "./views/CreateNotification";
import EditNotification from "./views/EditNotification";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/usuario",
      name: "usuario",
      component: User
    },
    {
      path: "/soporte",
      name: "soporte",
      component: Soporte
    },
    {
      path: "/notificacion/crear",
      name: "create-notification",
      component: CreateNotification
    },
    {
      path: "/notificacion/editar/:id",
      name: "edit-notification",
      component: EditNotification,
      props: true
    }
  ]
});
