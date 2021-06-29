<template>
  <div>
    <h1><i class="el-icon-s-opportunity" />レース計画</h1>
    <el-alert show-icon type="warning" :closable="false"
      >現時点でスペシャルウィークのみ機能します。</el-alert
    >
    <el-alert show-icon type="warning" :closable="false"
      ><b>ファン数目標</b>の達成を必ずしも考慮していません
      (キャラ・設定によっては目標達成できない結果が表示される可能性があります)。</el-alert
    >
    <h3>シナリオ選択</h3>
    <el-form :inline="true" ref="form-scenario">
      <el-form-item label="シナリオ">
        <el-select v-model="scenario" placeholder="Select">
          <el-option
            v-for="sce in scenarios"
            :key="sce"
            :label="sce"
            :value="sce"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <h3>キャラクター選択</h3>
    <el-form :inline="true" ref="form-chara">
      <el-form-item label="キャラクター">
        <el-select
          v-model="character"
          placeholder="Select"
          value-key="id"
          @change="setCalendar()"
        >
          <el-option
            v-for="cha in $store.state.characters.filter(function (item) {
              if (item.flag === 1) return true;
            })"
            :key="cha.id"
            :value="cha"
            :label="cha.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="芝">
        <el-select
          v-model="character.field_1"
          placeholder="Select"
          class="button-app"
          @change="setCalendar()"
        >
          <el-option
            v-for="app in appropriate"
            :key="app"
            :label="app"
            :value="app"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="ダート">
        <el-select
          v-model="character.field_2"
          placeholder="Select"
          class="button-app"
          @change="setCalendar()"
        >
          <el-option
            v-for="app in appropriate"
            :key="app"
            :label="app"
            :value="app"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="短距離">
        <el-select
          v-model="character.distance_1"
          placeholder="Select"
          class="button-app"
          @change="setCalendar()"
        >
          <el-option
            v-for="app in appropriate"
            :key="app"
            :label="app"
            :value="app"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="マイル">
        <el-select
          v-model="character.distance_2"
          placeholder="Select"
          class="button-app"
          @change="setCalendar()"
        >
          <el-option
            v-for="app in appropriate"
            :key="app"
            :label="app"
            :value="app"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="中距離">
        <el-select
          v-model="character.distance_3"
          placeholder="Select"
          class="button-app"
          @change="setCalendar()"
        >
          <el-option
            v-for="app in appropriate"
            :key="app"
            :label="app"
            :value="app"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="長距離">
        <el-select
          v-model="character.distance_4"
          placeholder="Select"
          class="button-app"
          @change="setCalendar()"
        >
          <el-option
            v-for="app in appropriate"
            :key="app"
            :label="app"
            :value="app"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <h3>詳細設定</h3>
    <el-form :inline="true" ref="form-method">
      <el-form-item label="出場適正下限">
        <el-select
          v-model="min_app"
          placeholder="Select"
          class="button-app"
          @change="setCalendar()"
        >
          <el-option
            v-for="app in appropriate"
            :key="app"
            :label="app"
            :value="app"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="ファンボーナス">
        <el-input-number
          v-model="fan_bonus"
          @change="setCalendar()"
          :min="0"
          :max="100"
        >
        </el-input-number>
      </el-form-item>
      <el-form-item label="最大連続出場レース数">
        <el-input-number
          v-model="race_limit_num"
          @change="setCalendar()"
          :min="1"
          :max="72"
        >
        </el-input-number>
      </el-form-item>
      <el-form-item label="夏合宿中は目標外レースに出場しない">
        <el-switch v-model="is_ban_summer" @change="setCalendar()"> </el-switch>
      </el-form-item>
      <el-form-item label="フィールド">
        <el-checkbox v-model="fields[0]" @change="setCalendar()"
          >芝</el-checkbox
        >
        <el-checkbox v-model="fields[1]" @change="setCalendar()"
          >ダート</el-checkbox
        >
      </el-form-item>
      <el-form-item label="距離">
        <el-checkbox v-model="distances[0]" @change="setCalendar()"
          >短距離</el-checkbox
        >
        <el-checkbox v-model="distances[1]" @change="setCalendar()"
          >マイル</el-checkbox
        >
        <el-checkbox v-model="distances[2]" @change="setCalendar()"
          >中距離</el-checkbox
        >
        <el-checkbox v-model="distances[3]" @change="setCalendar()"
          >長距離</el-checkbox
        >
      </el-form-item>
      <el-form-item label="クラス">
        <el-checkbox v-model="classes[0]" @change="setCalendar()"
          >GⅠ</el-checkbox
        >
        <el-checkbox v-model="classes[1]" @change="setCalendar()"
          >GⅡ</el-checkbox
        >
        <el-checkbox v-model="classes[2]" @change="setCalendar()"
          >GⅢ</el-checkbox
        >
        <el-checkbox v-model="classes[3]" @change="setCalendar()"
          >OP</el-checkbox
        >
        <el-checkbox v-model="classes[4]" @change="setCalendar()"
          >Pre-OP</el-checkbox
        >
        <el-checkbox v-model="not_win_only" @change="setCalendar()"
          >トロフィー未獲得のみ(未整備)</el-checkbox
        >
      </el-form-item>
    </el-form>

    <h3>レーススケジュール</h3>
    <p>
      <b>予想獲得ファン数</b>：{{ fan_sum }} ×
      {{ (1 + fan_bonus / 100).toFixed(2) }} =
      {{ (fan_sum * (1 + fan_bonus / 100)).toFixed(0) }}人
    </p>
    <div id="calendar">
      <template v-for="(item, id) in calendar">
        <el-card class="box-card" :key="id" v-if="12 <= id" shadow="never">
          <h4 class="calendar-name">{{ item.name }}</h4>
          <p class="info-text" v-if="item.races.length == 0">
            表示可能なレースがありません
          </p>
          <template v-for="item2 in item.races">
            <el-card
              class="box-card2"
              :class="borderColor(item2)"
              :key="item2.id"
              shadow="hover"
            >
              <div class="race-text">
                <p class="box-text1">
                  <b>{{ item2.name }}</b>
                </p>
                <p class="box-text2">
                  {{ item2.distance }}m ({{ item2.category }}) /
                  {{ item2.rotation }}
                  <el-tag
                    effect="plain"
                    type="warning"
                    class="tag-status"
                    size="small"
                    v-if="
                      $store.getters.races.find((v) => v.id === item2.id).status
                    "
                    ><i class="el-icon-star-on"
                  /></el-tag>
                  <el-tag
                    effect="plain"
                    type="warning"
                    class="tag-status"
                    size="small"
                    v-else
                    ><i class="el-icon-star-off"
                  /></el-tag>
                </p>
              </div>
              <div class="race-tag">
                <el-tag
                  effect="dark"
                  type="primary"
                  class="tag"
                  size="mini"
                  v-if="item2.class == 'GⅠ'"
                  >GⅠ</el-tag
                >
                <el-tag
                  effect="dark"
                  type="danger"
                  class="tag"
                  size="mini"
                  v-else-if="item2.class == 'GⅡ'"
                  >GⅡ</el-tag
                >
                <el-tag
                  effect="dark"
                  type="success"
                  class="tag"
                  size="mini"
                  v-else-if="item2.class == 'GⅢ'"
                  >GⅢ</el-tag
                >
                <el-tag
                  effect="dark"
                  type="warning"
                  class="tag"
                  size="mini"
                  v-else-if="item2.class == 'OP'"
                  >OP</el-tag
                >
                <el-tag
                  effect="dark"
                  type="warning"
                  class="tag"
                  size="mini"
                  v-else-if="item2.class == 'Pre-OP'"
                  >Pre-OP</el-tag
                >
                <el-tag
                  effect="plain"
                  type="success"
                  class="tag"
                  size="mini"
                  v-if="item2.field == '芝'"
                  >芝</el-tag
                >
                <el-tag
                  effect="plain"
                  type="warning"
                  class="tag"
                  size="mini"
                  v-else-if="item2.field == 'ダート'"
                  >ダート</el-tag
                >
              </div>
              <div class="fan">
                <el-tag type="info" class="tag-fan" size="small"
                  >ファン数 +{{ item2.fan }}人</el-tag
                >
                <el-tag
                  effect="dark"
                  type="danger"
                  class="tag-info"
                  size="small"
                  v-if="item2.isTarget"
                  >シナリオ</el-tag
                >
                <el-tag
                  effect="dark"
                  type="primary"
                  class="tag-info"
                  size="small"
                  v-else-if="item2.isRecommend"
                  >おすすめ</el-tag
                >
                <el-tag
                  effect="plain"
                  type="info"
                  class="tag-info"
                  size="small"
                  v-else
                  >適正OK</el-tag
                >
              </div>
            </el-card>
          </template>
        </el-card>
      </template>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      character: [{}],
      scenarios: ["URAファイナルズ"],
      scenario: "URAファイナルズ",
      appropriate: ["A", "B", "C", "D", "E", "F", "G"],
      calendar: [],
      fields: [true, true],
      distances: [true, true, true, true],
      classes: [true, true, false, false, false],
      not_win_only: false,
      min_app: "B",
      fan_bonus: 45,
      race_limit_num: 2,
      is_ban_summer: true,
      fan_sum: 0,
      dp: [], //レースレコメンド計算用のDP2次元配列
      mem: [], //レースレコメンド復元用の2次元配列
    };
  },
  mounted: function () {
    this.character = this.$store.state.characters[0];
    for (let i = 0; i < 72; i++) this.calendar.push({});
    this.setCalendar();
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
    borderColor(item) {
      if (item.isTarget) return "border-red";
      else if (item.isRecommend) return "border-blue";
      else return "";
    },
    setCalendar() {
      //適性に応じたフィルタ自動変更
      this.fields[0] = this.character.field_1 <= this.min_app;
      this.fields[1] = this.character.field_2 <= this.min_app;
      this.distances[0] = this.character.distance_1 <= this.min_app;
      this.distances[1] = this.character.distance_2 <= this.min_app;
      this.distances[2] = this.character.distance_3 <= this.min_app;
      this.distances[3] = this.character.distance_4 <= this.min_app;
      //カレンダーへのレース登録処理
      for (let i = 0; i < 72; i++) {
        let season = "";
        if (i < 24) season = "ジュニア級";
        else if (i < 48) season = "クラシック級";
        else if (i < 72) season = "シニア級";
        let month = Math.floor((i % 24) / 2) + 1;
        let term = "";
        if (i % 2 == 0) term = "月前半";
        else term = "月後半";
        Vue.set(this.calendar[i], "name", season + month + term);
        Vue.set(this.calendar[i], "races", new Array());
        //目標レースがある場合
        let isTarget = false;
        for (let j = 0; j < this.character.targets[this.scenario].length; j++) {
          let target = this.character.targets[this.scenario][j];
          const race = this.$store.getters.races.find(
            (v) => v.name === target.name
          );
          if (
            target.grade === Math.floor(i / 24) + 1 &&
            race.term_id === (i % 24) + 1
          ) {
            isTarget = true;
            Vue.set(this.calendar[i], "isTarget", true);
            let race2 = JSON.parse(JSON.stringify(race));
            race2.isTarget = true;
            console.log(race.isTarget, race2.isTarget);
            this.calendar[i].races.push(race2);
            break;
          }
        }
        //目標レースが無い場合(通常通りの追加)
        if (!isTarget) {
          Vue.set(this.calendar[i], "isTarget", false);
          for (let j = 0; j < this.$store.getters.races.length; j++) {
            let isValid = 1;
            //開催時期
            if ((i % 24) + 1 !== this.$store.getters.races[j].term_id)
              isValid = 0;
            if (i < 24 && this.$store.getters.races[j].junior === 0)
              isValid = 0;
            if (24 <= i && i < 48 && this.$store.getters.races[j].classic === 0)
              isValid = 0;
            if (48 <= i && this.$store.getters.races[j].senior === 0)
              isValid = 0;
            //フィールド
            if (!this.fields[0] && this.$store.getters.races[j].field === "芝")
              isValid = 0;
            if (
              !this.fields[1] &&
              this.$store.getters.races[j].field === "ダート"
            )
              isValid = 0;
            //距離
            if (
              !this.distances[0] &&
              this.$store.getters.races[j].category === "短距離"
            )
              isValid = 0;
            if (
              !this.distances[1] &&
              this.$store.getters.races[j].category === "マイル"
            )
              isValid = 0;
            if (
              !this.distances[2] &&
              this.$store.getters.races[j].category === "中距離"
            )
              isValid = 0;
            if (
              !this.distances[3] &&
              this.$store.getters.races[j].category === "長距離"
            )
              isValid = 0;
            //クラス
            if (!this.classes[0] && this.$store.getters.races[j].class === "GⅠ")
              isValid = 0;
            if (!this.classes[1] && this.$store.getters.races[j].class === "GⅡ")
              isValid = 0;
            if (!this.classes[2] && this.$store.getters.races[j].class === "GⅢ")
              isValid = 0;
            if (!this.classes[3] && this.$store.getters.races[j].class === "OP")
              isValid = 0;
            if (
              !this.classes[4] &&
              this.$store.getters.races[j].class === "Pre-OP"
            )
              isValid = 0;
            //トロフィー未獲得のみ
            if (
              this.not_win_only &&
              this.$store.getters.races[j].state === true
            )
              isValid = 0;
            //追加
            if (isValid) {
              this.calendar[i].races.push(
                JSON.parse(JSON.stringify(this.$store.getters.races[j]))
              );
            }
          }
        }
      }
      this.calculateDP();
    },
    calculateDP() {
      // DPテーブルの初期化
      const N = 72;
      const M = this.race_limit_num;
      for (let i = 0; i < N + 1; i++) {
        this.dp[i] = new Array(M + 1).fill(-1000000); //初期値は十分に小さな値
        this.mem[i] = new Array(M + 1).fill(-1); //初期値は-1(レースに出ない)
      }
      this.dp[12][1] = 700; //12ターン目(メイクデビュー)に基礎ファン数700人
      for (let i = 12; i < N; i++) {
        //目標レースがある場合
        if (this.calendar[i].isTarget) {
          let k = this.calendar[i].races.findIndex((v) => v.isTarget);
          let fan = this.calendar[i].races[k].fan;
          this.dp[i + 1][0] = -1000000;
          for (let j = 0; j < M; j++) {
            this.dp[i + 1][j + 1] = this.dp[i][j] + fan; //目標レースに必ず出場
            this.mem[i + 1][j + 1] = k;
          }
        }
        //目標レースはないが、夏合宿中はレースに出ない場合
        else if (
          this.is_ban_summer &&
          ((36 <= i && i <= 39) || (60 <= i && i <= 63))
        ) {
          for (let j = 0; j < M + 1; j++) {
            if (this.dp[i + 1][0] < this.dp[i][j]) {
              this.dp[i + 1][0] = this.dp[i][j]; //レースに出ない場合
              this.mem[i + 1][0] = -1;
            }
          }
        }
        //目標レースがない場合
        else {
          for (let j = 0; j < M + 1; j++) {
            if (this.dp[i + 1][0] < this.dp[i][j]) {
              this.dp[i + 1][0] = this.dp[i][j]; //レースに出ない場合
              this.mem[i + 1][0] = -1;
            }
            for (let k = 0; k < this.calendar[i].races.length; k++) {
              let fan = this.calendar[i].races[k].fan;
              if (j !== this.dp[i].length - 1)
                if (this.dp[i + 1][j + 1] < this.dp[i][j] + fan) {
                  this.dp[i + 1][j + 1] = this.dp[i][j] + fan; //k番目のレースに出る場合
                  this.mem[i + 1][j + 1] = k;
                }
            }
          }
        }
      }
      let max_dp = 0;
      for (let j = 0; j < N + 1; j++) {
        if (this.dp[N][max_dp] < this.dp[N][j]) {
          max_dp = j;
        }
      }
      // レコメンドレースの復元(レコメンド属性の登録)
      this.fan_sum = this.dp[N][max_dp];
      let idx = max_dp;
      for (let i = N; i >= 1; i--) {
        //レース復元
        if (this.mem[i][idx] >= 0 && idx >= 1) {
          if (this.calendar[i - 1].isTarget === false) {
            this.calendar[i - 1].races[this.mem[i][idx]].isRecommend = true;
          }
          console.log(
            i +
              " " +
              this.calendar[i - 1].name +
              " " +
              this.calendar[i - 1].races[this.mem[i][idx]].name +
              " " +
              idx +
              " " +
              this.dp[i][idx]
          );
        }
        for (let j = 0; j < N + 1; j++) {
          if (this.mem[i][idx] === -1) {
            if (this.dp[i - 1][j] === this.dp[i][idx]) {
              idx = j;
              break;
            }
          } else if (this.mem[i][idx] >= 0) {
            if (
              this.dp[i - 1][j] +
                this.calendar[i - 1].races[this.mem[i][idx]].fan ===
              this.dp[i][idx]
            ) {
              idx = j;
              break;
            }
          }
        }
      }
      console.log(this.dp);
    },
  },
};
</script>
<style scoped>
@media screen and (min-width: 480px) {
}
/deep/ .el-card__body {
  padding: 10px !important;
}
#calendar {
  display: table;
}
.box-card {
  overflow-y: visible;
  width: 255px;
  height: 300px;
  margin: 5px;
  padding: 0px !important;
  display: inline-grid;
}
.box-card2 {
  width: 99%;
  height: auto;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 10px;
  padding: 0px;
}
.info-text {
  font-size: 12px;
  margin-top: 100px;
}
.box-text1 {
  font-size: 14px;
  text-align: left;
  margin: 5px;
  margin-top: 0px;
}
.box-text2 {
  font-size: 13.5px;
  text-align: left;
  margin: 5px;
}
.box-image {
  height: 160px;
}
.calendar-name {
  margin-top: 10px;
  margin-bottom: 10px;
}
.race-text {
  display: inline-block;
  width: 80%;
  margin-top: 0px;
  vertical-align: top;
}
.race-tag {
  display: inline-block;
  width: 20%;
}
.tag {
  font-size: 10px;
  vertical-align: top;
  float: right;
  margin-top: 2.5px;
  margin-right: 5px;
}
.fan {
  vertical-align: center;
  text-align: center;
}
.tag-fan {
  width: 65%;
  display: inline-block;
  margin-right: 5px;
  color: darkslategrey !important;
}
.tag-info {
  width: 30%;
  font-size: 11px;
  margin-right: 5px;
  display: inline-block;
}
.tag-status {
  width: 5%;
  font-size: 11px;
  border: none;
  font-size: 15px;
  display: inline-block;
}
.web-button {
  margin-bottom: 5px !important;
}
.button-app {
  width: 60px;
}
.border-red {
  border-color: red;
  border-width: 2px;
}
.border-blue {
  border-color: dodgerblue;
  border-width: 2px;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
::-webkit-scrollbar {
  width: 7.5px;
}
::-webkit-scrollbar-track {
  background: #fff;
  border: none;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 10px;
  box-shadow: none;
}
</style>
