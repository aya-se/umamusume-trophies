<template>
  <div id="app">
    <Header v-if="this.$store.getters.isLogin" />
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Header from "./components/Header.vue";
export default {
  components: { Header },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user);
        this.setLoginStatus(true);
        console.log("is login.");
      } else {
        this.deleteLoginUser();
        this.setLoginStatus(false);
        console.log("No user is signed in.");
      }
    });
  },
  methods: {
    ...mapActions([
      "login",
      "setLoginUser",
      "logout",
      "deleteLoginUser",
      "setLoginStatus",
      "getCsv",
    ]),
    ...mapGetters(["uid", "isLogin", "races"]),
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");
#app {
  font-family: "Noto Sans JP", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
}
</style>
