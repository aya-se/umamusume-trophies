<template>
  <div>
    <h1><i class="el-icon-warning" /> 歓迎ッ！</h1>
    <p><b>ウマ娘レースプランナー</b>へようこそ！！！</p>
    <p>
      このサイトの利用には<b>Googleアカウント</b>でのログインが必要です。下のボタンをクリックするとGoogleの認証画面にリダイレクトします。
    </p>
    <el-button type="success" round class="btn btn-default" @click="login">
      ログイン
    </el-button>
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
        this.success();
      } else {
        this.deleteLoginUser();
      }
    });
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ログイン後のページに遷移する
        this.$router.push("/loading");
      } else {
        // ログイン失敗。エラー処理など(通常はあり得ない？)
      }
    });
  },
  methods: {
    ...mapActions(["login", "setLoginUser", "logout", "deleteLoginUser"]),
    ...mapGetters(["uid"]),
    success() {
      this.$notify({
        title: "Success",
        message: "ログインに成功しました！",
        type: "success",
      });
    },
  },
};
</script>
