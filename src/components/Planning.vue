<template>
  <div>
    <h1><i class="el-icon-s-opportunity" />レース計画</h1>
    <el-alert show-icon type="warning" :closable="false">整備中です！</el-alert>
    <h3>キャラクター選択</h3>
    <el-select v-model="character" :key="character.id" placeholder="Select">
      <el-option
        v-for="cha in $store.state.characters.filter(function (item) {
          if (item.flag === 1) return true;
        })"
        :key="cha.id"
        :label="cha.name"
        :value="cha"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="character.field_1"
      placeholder="Select"
      class="button-app"
    >
      <el-option
        v-for="app in appropriate"
        :key="app"
        :label="app"
        :value="app"
      >
      </el-option>
    </el-select>
    <p>{{ character }}</p>
    <h3>レーススケジュール</h3>
    <el-checkbox v-model="fields[0]" @change="setCalendar()">芝</el-checkbox>
    <el-checkbox v-model="fields[1]" @change="setCalendar()"
      >ダート</el-checkbox
    >
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
    <el-checkbox v-model="classes[0]" @change="setCalendar()">GⅠ</el-checkbox>
    <el-checkbox v-model="classes[1]" @change="setCalendar()">GⅡ</el-checkbox>
    <el-checkbox v-model="classes[2]" @change="setCalendar()">GⅢ</el-checkbox>
    <el-checkbox v-model="classes[3]" @change="setCalendar()">OP</el-checkbox>
    <el-checkbox v-model="classes[4]" @change="setCalendar()"
      >Pre-OP</el-checkbox
    >
    <el-checkbox v-model="not_win_only" @change="setCalendar()"
      >トロフィー未獲得のみ(未整備)</el-checkbox
    >
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
              :class="borderColor(item2.id)"
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
                  type="primary"
                  class="tag-info"
                  size="small"
                  v-if="recommends.includes(item2.id)"
                  >おすすめ</el-tag
                >
                <el-tag
                  effect="dark"
                  type="danger"
                  class="tag-info"
                  size="small"
                  v-else-if="targets.includes(item2.id)"
                  >シナリオ</el-tag
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
      appropriate: ["S", "A", "B", "C", "D", "E", "F", "G"],
      calendar: [],
      fields: [true, true],
      distances: [true, true, true, true],
      classes: [true, true, false, false, false],
      not_win_only: false,
      recommends: [1, 2, 3, 100, 125, 150],
      targets: [5, 10, 13, 24, 35, 60],
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
    onChange() {
      this.character = this.$store.state.characters.find(
        (v) => (v.name = this.character_name)
      );
      console.log("hoge");
      return;
    },
    borderColor(id) {
      if (this.recommends.includes(id)) return "border-blue";
      else if (this.targets.includes(id)) return "border-red";
      else return "";
    },
    setCalendar() {
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
        for (let j = 0; j < this.$store.getters.races.length; j++) {
          let isValid = 1;
          //開催時期
          if ((i % 24) + 1 !== this.$store.getters.races[j].term_id)
            isValid = 0;
          if (i < 24 && this.$store.getters.races[j].junior === 0) isValid = 0;
          if (24 <= i && i < 48 && this.$store.getters.races[j].classic === 0)
            isValid = 0;
          if (48 <= i && this.$store.getters.races[j].senior === 0) isValid = 0;
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
          if (this.not_win_only && this.$store.getters.races[j].state === true)
            isValid = 0;
          //追加
          if (isValid)
            this.calendar[i].races.push(this.$store.getters.races[j]);
        }
      }
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
  width: 60%;
  display: inline-block;
  margin-right: 5px;
  color: darkslategrey !important;
}
.tag-info {
  width: 27.5%;
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
