<template>
  <div>
    <h1>Login</h1>
    <p>uid:{{ this.$store.getters.uid }}</p>
    <button type="button" class="btn btn-default" @click="login">
      ログイン
    </button>
    <button type="button" class="btn btn-default" @click="logout">
      ログアウト
    </button>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user);
        console.log("is login.");
      } else {
        this.deleteLoginUser();
        console.log("No user is signed in.");
      }
    });
  },
  methods: {
    ...mapActions(["login", "setLoginUser", "logout", "deleteLoginUser"]),
    ...mapGetters(["uid"]),
  },
};
</script>
