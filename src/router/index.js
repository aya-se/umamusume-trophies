import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import Login from "../components/Login.vue";
import List from "../components/List.vue";
import Planning from "../components/Planning.vue";
import Info from "../components/Info.vue";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "*",
      name: "default",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/list",
      name: "list",
      component: List,
    },
    {
      path: "/planning",
      name: "planning",
      component: Planning,
    },
    {
      path: "/info",
      name: "info",
      component: Info,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next();
      } else {
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      }
    });
  } else {
    next(); // next() を常に呼び出すようにしてください!
  }
});

export default router;
