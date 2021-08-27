<template>
  <div class="info">
    <h2><i class="el-icon-info" /> 各種情報</h2>
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
        <li>レース計画ページで出場レースのプランニングができます。</li>
        <li>
          レース計画ページでプランニングされた出走レースのスケジュールを時系列形式で確認することが出来ます。
        </li>
      </div>
    </el-card>
    <el-card class="box-card-info" shadow="hover">
      <h3 style="margin-top: 5px">レース計画機能の仕様詳細</h3>
      <div>
        <li>
          レース計画ページで出場レースのプランニングができます。<b>「ファン数最大化」・「ノルマ達成効率重視」</b>の2つの戦略が利用可能です。<b>「ファン数最大化」</b>ではシナリオ等の制約下で可能な限りファン数を稼ぐためにレースに出場します(ファン活向け)。<b>「ノルマ達成効率重視」</b>ではシナリオ上達成すべきファン数のノルマをなるべく少ない出走数で満たすことを目標とします。
        </li>
        <li>
          特定の時期までに特定のファン数を稼ぐ<b>「ファン数ノルマ」</b>(キャラ目標・シナリオイベント)の達成を考慮することができます。URAシナリオにおける固有スキルレベルアップ、一部のキャラクターにおけるファン数目標などが中心です。
        </li>
        <li>
          予想獲得ファン数の値は<b>「出走レースに全て勝利した場合のファン数最低値」</b>です。実際には獲得ファン数はある程度ランダムであり、出走レースに全て勝利した場合の実際のファン数は予測値の1.00倍~1.09倍の範囲まで変動します。
        </li>
        <li>
          出走レースに勝利できなかった場合に備え、ノルマ達成計画に一定の「余裕」を設定することができます(全て勝利する前提であれば「余裕」は0%でも問題ありません)。
        </li>
        <li>
          一部ウマ娘において、適正の合わないレースに出走する場合(いわゆる<b>「負けイベント」</b>)ではファン数をカウントしない(0人扱い)ように配慮し、現実的に達成可能なプランとします。「負けイベント」であるかどうかはフィールドと距離の適正がAから合計で<b>2段階以上</b>下回っているかで判定しており、「詳細設定」から適正調節を行うことで判定が変更となる場合があります(例：マルゼンスキーの有馬記念は通常「負けイベント」扱いになりますが、長距離適性を上げることで判定が変更されます)。
        </li>
        <li>
          オグリキャップ・スマートファルコンなどのシナリオにおける「特定のクラスのレースで○回1着」という形式の目標にもある程度対応しています。ただし着順を考慮していません。つまり、「条件を満たすクラスのレースに○回以上出走する」と解釈してプランを作成しています。
        </li>
        <li>
          URAシナリオにおいて、メイクデビュー戦およびURAファイナルズのファン数は固定値として加算しています(メイクデビュー戦で1着を取れなかった場合のジュニア未勝利戦には対応していません)。
        </li>
        <li>
          URAシナリオにおいて、ダート系のウマ娘は固有スキルレベルアップに必要なファン数条件が緩和される仕様に対応済です。
        </li>
        <li>
          サイト上に明記していませんが、各レースの出走に必要なファン数条件を考慮したプランニングになっています(「メイクデビュー戦の次に皐月賞」などというようなプランは排除されているはずです、またファン数ボーナスが低すぎるとメイクデビュー戦の次にホープフルS等に出られなくなるはずです)。
        </li>
        <li>
          最大連続出場レース数は目標外レースに関する設定です。例えば値を2に設定した場合、「目標外・目標外・目標外」「目標外・目標・目標外」というパターンは制限しますが、「目標外・目標外・目標」というようなパターンは制限しません。なお体力0によるレース疲れのリスクは考慮していません。
        </li>
        <li>
          特にダートや短距離系のウマ娘は、初期設定では条件を満たすプランを作成できない場合があります。この場合はファン数ノルマの一部を無効にしたり、ファン数ボーナスをより高い値にするなど、条件を緩和することで実現可能なプランを作成可能です。
        </li>
        <li>
          マチカネフクキタルの第2・7目標レースはランダムに決定されますが、こちらは毎日杯・函館記念に固定しています。
        </li>
        <li>
          フジキセキのシナリオにおける目標分岐は三冠路線に固定しています。
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
