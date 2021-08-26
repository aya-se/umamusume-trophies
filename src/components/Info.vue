<template>
  <div class="info">
    <h1><i class="el-icon-info" /> 各種情報</h1>
    <h3>ステータス情報</h3>
    <p>あなたのuid : {{ this.$store.getters.uid }}</p>
    <el-button type="danger" round class="btn btn-default" @click="logout">
      ログアウト
    </el-button>
    <el-card class="box-card-info" shadow="hover">
      <h3 style="margin-top: 5px">現在実装されている機能</h3>
      <div>
        <li>レース一覧表ページから開催されるレースの一覧を閲覧できます。</li>
        <li>
          レース一覧表ページから重賞(GⅠ~GⅢ)の各レースについてトロフィーの獲得状況を管理できます。獲得状況はアカウントごとに保存されます。
        </li>
        <li>
          レース計画ページで出場レースのプランニングができます。<b>「ファン数最大化」・「ノルマ達成効率重視」</b>の2つの戦略が利用可能であり、さらに特定の時期までに特定のファン数を稼ぐ<b>「ファン数ノルマ」</b>(キャラ目標・シナリオイベント)の達成を考慮することができます。
        </li>
      </div>
    </el-card>
    <el-card class="box-card-info" shadow="hover">
      <h3 style="margin-top: 5px">未実装・不十分な機能</h3>
      <div>
        <li>
          レース計画機能において、レコメンド後は自由に出走レースを選択できるような仕様にする予定です(今後実装予定)。
        </li>
        <li>
          レース計画機能において、出走レース一覧をリスト形式で確認できるようなページを作成予定です(今後実装予定)。
        </li>
        <li>
          レース計画機能において、各レースの出走条件を考慮していません(今後実装予定)。
        </li>
        <li>
          レース計画機能において、いわゆる「負けイベント」でも1着のファン数を獲得する扱いになっています。
        </li>
        <li>
          レース計画機能において、オグリキャップ・スマートファルコンの○回1着目標に対応していません(今後実装予定)。
        </li>
        <li>
          レース計画機能において、一部のダートウマ娘の救済措置(ファン数ノルマ条件の緩和)に対応していません(今後実装予定)。
        </li>
        <li>
          レース計画機能において、フジキセキの目標分岐は三冠路線に固定しています。また、マチカネフクキタルの第2・7目標ランダム抽選は毎日杯・函館記念に固定しています(対応検討中)。
        </li>
        <li>
          レース計画機能において、一部ウマ娘の隠しイベント達成を優先するようなプランニング(カレンチャンのサマースプリントシリーズ制覇など)に対応していません(実装検討中)。
        </li>
        <li>
          レスポンシブにはあまり対応できていません。現状ではPCまたはタブレット端末からの閲覧を推奨します。
        </li>
        <li>
          同一のアカウントについて複数のブラウザから同時にトロフィー獲得状況を編集することができません(仕様)。
        </li>
      </div>
    </el-card>
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
.box-card-info {
  width: 90%;
  height: auto;
  margin: auto;
  margin-top: 10px;
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
