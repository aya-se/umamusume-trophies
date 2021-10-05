<template>
  <div class="info">
    <h2><i class="el-icon-info" /> 各種情報</h2>
    <h3>バージョン情報</h3>
    <p>バージョン番号：ver.1.20</p>
    <p>最終更新日：2021年10月5日(火)</p>
    <h3>ステータス情報</h3>
    <p v-if="$store.getters.isLogin">
      利用中のアカウント：{{ this.$store.state.login_user.email }}
    </p>
    <p v-else>ログインしていません</p>
    <transition name="el-fade-in-linear">
      <div id="account">
        <h2><i class="el-icon-menu" /> Accounts</h2>
        <el-card class="box-card2" shadow="hover">
          <el-link target="_blank" href="https://twitter.com/Hakuba_snow"
            >Twitter</el-link
          >
          <p>
            <img class="box-image" src="../assets/twitter.png" />
          </p>
        </el-card>

        <el-card class="box-card2" shadow="hover">
          <el-link
            target="_blank"
            href="https://www.youtube.com/channel/UCW4FH8oKhHE8vIRnr0StJ8g"
            >Youtube</el-link
          >
          <p>
            <img class="box-image" src="../assets/youtube.png" />
          </p>
        </el-card>
        <el-card class="box-card2" shadow="hover">
          <el-link target="_blank" href="https://www.nicovideo.jp/series/183850"
            >NicoNico</el-link
          >
          <p>
            <img class="box-image" src="../assets/niconico.png" />
          </p>
        </el-card>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div id="contact">
        <h2><i class="el-icon-s-comment" /> Contacts</h2>
        サイトの不具合などありましたらお気軽にご連絡下さい。
        <p><b>Twitter： </b>@Hakuba_snow</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "info",
  data() {
    return {};
  },
  methods: {
    onClick(url) {
      window.open(url, "_blank");
    },
    ...mapActions([
      "login",
      "setLoginUser",
      "logout",
      "deleteLoginUser",
      "setLoginStatus",
      "getCsv",
    ]),
    ...mapGetters(["uid", "isLogin", "isLoading", "races"]),
  },
};
</script>
<style scoped>
.home {
  overflow: hidden;
}
.link-content {
  text-decoration: none;
  color: #2c3e50;
}
.link-content:visited {
  color: #2c3e50;
}
.link-content:hover {
  color: orange;
}
@media screen and (max-width: 480px) {
  .box-card {
    display: inline-block;
    width: 90%;
    height: auto;
    margin: 10px;
  }
  .box-card3 {
    display: inline-block;
    width: 90%;
    height: auto;
    margin: 10px;
  }
}
@media screen and (min-width: 480px) {
  .box-card {
    display: inline-block;
    width: 400px;
    height: auto;
    margin: 10px;
  }
  .box-card3 {
    display: inline-block;
    width: 400px;
    height: auto;
    margin: 10px;
  }
}
.box-card-info {
  width: 95%;
  height: auto;
  margin: auto;
  margin-top: 10px;
}
.box-card2 {
  display: inline-block;
  width: 150px;
  height: 180px;
  margin: 5px;
}
.box-image {
  height: 80px;
}
.timeline {
  width: auto;
  height: auto;
  font-size: 20px;
  padding-top: 20px;
  margin-right: 20px;
}
.tag {
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
}
.web-button {
  margin-bottom: 5px !important;
}
</style>
