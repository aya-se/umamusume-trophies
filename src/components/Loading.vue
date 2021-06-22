<template>
  <div id="" v-loading="true">
    <p>サインインしています...</p>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  created() {},
  computed: {},
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push("/list");
      } else {
        this.$router.push("/login");
      }
    });
  },
  methods: {},
};
</script>
