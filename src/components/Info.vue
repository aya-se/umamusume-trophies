<template>
  <div class="info">
    <h1><i class="el-icon-info" /> 各種情報</h1>
    <h3>ステータス情報</h3>
    <p>あなたのuid : {{ this.$store.getters.uid }}</p>
    <el-button type="danger" round class="btn btn-default" @click="logout">
      ログアウト
    </el-button>
    <h3>現在実装されている機能紹介</h3>
    <li>Listページから重賞(GⅠ~GⅢ)のレース一覧を閲覧できます。</li>
    <h3>未実装の機能</h3>
    <li>Planning機能は全て未実装です。</li>
    <li>OP,Pre-OPのレースに未対応です。</li>
    <li>アカウントごとのトロフィー獲得状況管理は未実装です。</li>
    <li>
      レスポンシブにはあまり対応できていません。現状ではPCまたはタブレット端末からの閲覧を推奨します。
    </li>
    <transition name="el-fade-in-linear">
      <div id="account">
        <h1><i class="el-icon-menu" /> Account</h1>
        <el-card class="box-card2" shadow="hover">
          <el-link target="_blank" href="https://twitter.com/Hakuba_snow"
            ><h3>Twitter</h3></el-link
          >
          <p>
            <img class="box-image" src="../assets/twitter.png" />
          </p>
        </el-card>

        <el-card class="box-card2" shadow="hover">
          <el-link
            target="_blank"
            href="https://www.youtube.com/channel/UCW4FH8oKhHE8vIRnr0StJ8g"
            ><h3>Youtube</h3></el-link
          >
          <p>
            <img class="box-image" src="../assets/youtube.png" />
          </p>
        </el-card>
        <el-card class="box-card2" shadow="hover">
          <el-link target="_blank" href="https://www.nicovideo.jp/series/183850"
            ><h3>NicoNico</h3></el-link
          >
          <p>
            <img class="box-image" src="../assets/niconico.png" />
          </p>
        </el-card>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div id="contact">
        <h1><i class="el-icon-s-comment" /> Contact</h1>
        GmailもしくはTwitterがおそらく一番反応早いと思うので、載せておきます。
        <p><b>Gmail： </b>kakkeno1@gmail.com</p>
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
.box-card2 {
  display: inline-block;
  width: 260px;
  height: auto;
  margin: 10px;
}
.box-image {
  height: 160px;
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
