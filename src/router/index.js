import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import Login from "../components/Login.vue";
import Loading from "../components/Loading.vue";
import List from "../components/List.vue";
import Planning from "../components/Planning.vue";
import Info from "../components/Info.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      name: "default",
      redirect: "/list",
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/loading",
      name: "loading",
      component: Loading,
    },
    {
      path: "/list",
      name: "list",
      component: List,
      meta: { requiresAuth: true },
    },
    {
      path: "/planning",
      name: "planning",
      component: Planning,
      meta: { requiresAuth: true },
    },
    {
      path: "/info",
      name: "info",
      component: Info,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("ログイン済");
        next();
      } else {
        console.log("リダイレクトします");
        next({
          path: "/login",
          query: { redirect: "/login" },
        });
      }
    });
  } else {
    next(); // next() を常に呼び出すようにしてください!
  }
});

export default router;
