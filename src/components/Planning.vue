<template>
  <div>
    <h1><i class="el-icon-s-opportunity" />レース計画</h1>
    <el-alert show-icon type="warning" :closable="false">整備中ッ！</el-alert>
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
    <p>{{ calendar }}</p>
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
          if (i % 24 !== this.$store.getters.races[j].term_id) isValid = 0;
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
            this.calendar[i].races.push(this.$store.getters.races[j].name);
        }
      }
    },
  },
};
</script>
<style scoped>
.button-app {
  width: 60px;
}
</style>
