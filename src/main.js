import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyAlHw_T-7f-1lfCIknz97EIVjVu1cDSDS4",
  authDomain: "umamusume-trophies.firebaseapp.com",
  projectId: "umamusume-trophies",
  storageBucket: "umamusume-trophies.appspot.com",
  messagingSenderId: "599212928901",
  appId: "1:599212928901:web:0592f5f46163a701069eec",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
