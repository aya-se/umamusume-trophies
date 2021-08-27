<template>
  <div>
    <h2><i class="el-icon-s-opportunity" />レース計画</h2>
    <el-alert show-icon type="warning" :closable="false"
      >一部、未実装または不十分な機能があります。詳細は「各種情報」ページをご覧ください。</el-alert
    >
    <h3><i class="el-icon-s-flag"></i> シナリオ・キャラクター・戦略選択</h3>
    <el-form :inline="true" ref="form-scenario" class="form" size="small">
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
      <el-form-item label="キャラクター">
        <el-select
          v-model="character"
          placeholder="Select"
          value-key="id"
          @change="setFanQuota(), setCalendar()"
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
      <el-form-item label="戦略">
        <el-select
          v-model="strategy"
          placeholder="Select"
          value-key="name"
          @change="setCalendar()"
        >
          <el-option
            v-for="str in strategies"
            :key="str.name"
            :value="str"
            :label="str.text"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <h3 class="detail-title"><i class="el-icon-s-tools" /> 詳細設定</h3>
    <el-collapse class="detail-collapse">
      <el-collapse-item title="">
        <template slot="title" style="width: 100%"> </template>
        <el-form :inline="true" ref="form-method" class="form" size="small">
          <el-form-item label="余裕のあるノルマ達成計画(+%)">
            <el-input-number
              v-model="quota_leeway"
              @change="setCalendar()"
              :min="0"
              :step="5"
              :max="100"
            >
            </el-input-number>
          </el-form-item>
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
              :max="200"
            >
            </el-input-number>
          </el-form-item>
          <el-form-item label="最大連続出場レース数">
            <el-input-number
              v-model="race_limit_num"
              @change="setCalendar()"
              :min="0"
              :max="72"
            >
            </el-input-number>
          </el-form-item>
          <el-form-item label="夏合宿中は目標外レースに出場しない">
            <el-switch v-model="is_ban_summer" @change="setCalendar()">
            </el-switch>
          </el-form-item>
          <el-form-item label="フィールド" v-if="false">
            <el-checkbox v-model="fields[0]" @change="setCalendar()"
              >芝</el-checkbox
            >
            <el-checkbox v-model="fields[1]" @change="setCalendar()"
              >ダート</el-checkbox
            >
          </el-form-item>
          <el-form-item label="距離" v-if="false">
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
          <br />
          <el-form-item label="適正調節 (芝/ダ/短/マ/中/長)">
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
          <el-form-item label="">
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
          <el-form-item label="">
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
          <el-form-item label="">
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
          <el-form-item label="">
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
          <el-form-item label="">
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
            <el-checkbox
              v-model="not_win_only"
              @change="setCalendar()"
              v-if="false"
              >トロフィー未獲得のみ(未整備)</el-checkbox
            >
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <h3 class="quota-title"><i class="el-icon-s-order" />ファン数ノルマ一覧</h3>
    <el-collapse class="quota-collapse">
      <el-collapse-item title="">
        <el-table
          :data="fan_quota"
          class="fan-table"
          align="center"
          width="auto"
        >
          <el-table-column prop="term_id" label="時期" sortable width="180"
            ><template slot-scope="scope">
              {{ calendar[scope.row.term_id - 1].name }}
            </template></el-table-column
          >/>
          <el-table-column prop="num" label="目標人数" width="90"
            ><template slot-scope="scope">
              {{ scope.row.num }}人
            </template></el-table-column
          >/>
          <el-table-column prop="status" label="有効" width="60"
            ><template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :disabled="scope.row.type === 'target'"
                @change="setCalendar()"
              >
              </el-switch> </template></el-table-column
          >/>
          <el-table-column prop="text" label="詳細" width="360" />
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <el-alert show-icon type="error" :closable="false" v-if="is_failed"
      >条件を満たすプランが立てられませんでした！ファン数ノルマや出走可能条件の緩和を検討してください。</el-alert
    >
    <el-alert show-icon type="success" :closable="false" v-else
      ><b>予想獲得ファン数</b>：{{ fan_sum }} ×
      {{ (1 + fan_bonus / 100).toFixed(2) }} =
      {{ (fan_sum * (1 + fan_bonus / 100)).toFixed(0) }}人<el-button
        type="primary"
        round
        size="small"
        class="btn btn-default"
        @click="showActivities(true)"
      >
        <i class="el-icon-s-data" />出走スケジュール
      </el-button></el-alert
    >
    <modal
      name="activities"
      class="activities-modal"
      width="90%"
      height="auto"
      :scrollable="true"
    >
      <h3><i class="el-icon-s-data" /> 出走スケジュール</h3>
      <el-timeline>
        <el-timeline-item
          class="timeline"
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.term"
          placement="top"
        >
          <el-card
            class="box-card4"
            :class="borderColor(activity)"
            :key="activity.id"
            shadow="hover"
          >
            <div class="race-text">
              <p class="box-text1">
                <b>{{ activity.name }}</b>
              </p>
              <p class="box-text2">
                {{ activity.distance }}m ({{ activity.category }}) /
                {{ activity.rotation }}
                <el-tag
                  effect="plain"
                  type="warning"
                  class="tag-status"
                  size="small"
                  v-if="
                    $store.getters.races.find((v) => v.id === activity.id)
                      .status
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
                v-if="activity.class == 'GⅠ'"
                >GⅠ</el-tag
              >
              <el-tag
                effect="dark"
                type="danger"
                class="tag"
                size="mini"
                v-else-if="activity.class == 'GⅡ'"
                >GⅡ</el-tag
              >
              <el-tag
                effect="dark"
                type="success"
                class="tag"
                size="mini"
                v-else-if="activity.class == 'GⅢ'"
                >GⅢ</el-tag
              >
              <el-tag
                effect="dark"
                type="warning"
                class="tag"
                size="mini"
                v-else-if="activity.class == 'OP'"
                >OP</el-tag
              >
              <el-tag
                effect="dark"
                type="warning"
                class="tag"
                size="mini"
                v-else-if="activity.class == 'Pre-OP'"
                >Pre-OP</el-tag
              >
              <el-tag
                effect="plain"
                type="success"
                class="tag"
                size="mini"
                v-if="activity.field == '芝'"
                >芝</el-tag
              >
              <el-tag
                effect="plain"
                type="warning"
                class="tag"
                size="mini"
                v-else-if="activity.field == 'ダート'"
                >ダート</el-tag
              >
            </div>
            <div class="fan">
              <el-tag type="info" class="tag-fan" size="small"
                >ファン数 +{{ activity.fan }}人</el-tag
              >
              <el-tag
                effect="dark"
                type="danger"
                class="tag-info"
                size="small"
                v-if="activity.isTarget"
                >シナリオ</el-tag
              >
              <el-tag
                effect="dark"
                type="primary"
                class="tag-info"
                size="small"
                v-else-if="activity.isRecommend"
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
        </el-timeline-item>
      </el-timeline>
      <el-button
        type="danger"
        round
        class="btn btn-default"
        @click="showActivities(false)"
      >
        閉じる
      </el-button>
    </modal>
    <h3><i class="el-icon-s-marketing" />レースカレンダー</h3>
    <div id="calendar">
      <template v-for="(item, id) in calendar">
        <el-card
          class="box-card"
          :key="id"
          v-if="12 <= id && id <= 71"
          shadow="never"
        >
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
import firebase from "firebase";
import fan_quota from "@/../public/data/fan_quota.json";
export default {
  data() {
    return {
      character: [{}],
      scenarios: ["URAファイナルズ"],
      scenario: "URAファイナルズ",
      appropriate: ["A", "B", "C", "D", "E", "F", "G"],
      activities: [],
      calendar: [],
      fields: [true, true],
      distances: [true, true, true, true],
      classes: [true, true, true, true, true],
      not_win_only: false,
      min_app: "A",
      fan_bonus: 45,
      race_limit_num: 2,
      is_ban_summer: true,
      fan_sum: 0,
      fan_debut: 700,
      fan_extra: 7000 + 10000 + 30000,
      strategies: [
        { name: "fan", text: "ファン数最大化(ファン活・金策向け)" },
        { name: "efficient", text: "ノルマ達成効率重視" },
      ], // { name: "trophy", text: "トロフィー埋め" },
      strategy: { name: "efficient", text: "ノルマ達成効率重視" },
      quota_leeway: 10,
      fan_quota: [],
      dp: [], //レースレコメンド計算用のDP配列(月×連続出走回数×累積出走回数)
      mem: [], //レースレコメンド復元用の配列
      is_show_detail: false,
      is_failed: false,
    };
  },
  mounted: function () {
    this.character = this.$store.state.characters[0];
    for (let i = 0; i < 72; i++) this.calendar.push({});
    this.calendar.push({ name: "育成終了時" }); //育成終了時(ダミー)
    this.getAndSetTrophies();
    this.setFanQuota();
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
    setFanQuota() {
      //ファン数目標のリセット
      this.fan_quota = JSON.parse(JSON.stringify(fan_quota[this.scenario]));
      //一部のダートウマ娘のみ条件緩和あり
      if (
        this.character.name === "ハルウララ" ||
        this.character.name === "スマートファルコン"
      ) {
        if (this.scenario === "URAファイナルズ") {
          this.fan_quota.find((item) => item.id === 3).num = 40000;
          this.fan_quota.find((item) => item.id === 4).num = 60000;
          this.fan_quota.find((item) => item.id === 5).num = 80000;
        }
      }
      //ファン数目標があれば追加
      let fan_targets = this.character.targets[this.scenarios].filter(
        (v) => v.type === "fan"
      );
      for (let i = 0; i < fan_targets.length; i++) {
        let ft = fan_targets[i];
        this.fan_quota.push({
          id: ft.id,
          term_id: ft.term_id,
          num: ft.num,
          text: this.character.name + "の育成目標",
          type: "target",
          status: true,
        });
      }
      this.fan_quota.sort(function (a, b) {
        return a.term_id - b.term_id;
      });
    },
    onDelete(item) {
      this.fan_quota = this.fan_quota.filter((v) => v.id !== item.id);
      this.setCalendar();
    },
    showActivities(status) {
      if (status) this.$modal.show("activities");
      else this.$modal.hide("activities");
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
        let race_targets = this.character.targets[this.scenarios].filter(
          (v) => v.type === "race"
        );
        for (let j = 0; j < race_targets.length; j++) {
          let target = race_targets[j];
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
            race2.term = season + race2.term;
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
              let race2 = JSON.parse(
                JSON.stringify(this.$store.getters.races[j])
              );
              race2.term = season + race2.term;
              this.calendar[i].races.push(race2);
            }
          }
        }
      }
      this.calculateDP();
    },
    checkAppropriate(i, j) {
      let race = this.calendar[i].races[j];
      let app_cnt = 0;
      let app_field = "";
      let app_distance = "";
      //フィールド
      if (race.field === "芝") app_field = this.character.field_1;
      else if (race.field === "ダート") app_field = this.character.field_2;
      //距離
      if (race.category === "短距離") app_distance = this.character.distance_1;
      else if (race.category === "マイル")
        app_distance = this.character.distance_2;
      else if (race.category === "中距離")
        app_distance = this.character.distance_3;
      else if (race.category === "長距離")
        app_distance = this.character.distance_4;
      app_cnt += app_field.charCodeAt(0) - 65;
      app_cnt += app_distance.charCodeAt(0) - 65;
      return app_cnt;
    },
    checkRequirement(i, j) {
      let race = this.calendar[i].races[j];
      if (race.class === "OP" || race.class === "Pre-OP") return 375;
      else return race.requirement;
    },
    calculateDP() {
      // DPテーブルの初期化
      const INF = 1000000000;
      const N = 72;
      const M = this.race_limit_num;
      for (let i = 0; i < N + 1; i++) {
        this.dp[i] = [];
        this.mem[i] = [];
        for (let j = 0; j < N + 1; j++) {
          this.dp[i][j] = new Array(N + 1).fill(-INF); //初期値は十分に小さな値
          this.mem[i][j] = new Array(N + 1).fill(-INF); //初期値は-1(レースに出ない)
        }
      }
      this.dp[12][1][0] = this.fan_debut; //12ターン目(メイクデビュー)に基礎ファン数700人(累積出走に含めず)
      for (let i = 12; i < N; i++) {
        //目標レースがある場合
        if (this.calendar[i].isTarget) {
          let l = this.calendar[i].races.findIndex((v) => v.isTarget);
          let fan = this.calendar[i].races[l].fan;
          //適正が2段階以上低いレースは勝利しないものと想定
          if (this.checkAppropriate(i, l) >= 2) fan = 0;
          for (let j = 0; j < N; j++) {
            for (let k = 0; k < N; k++) {
              if (
                this.checkRequirement(i, l) <=
                this.dp[i][j][k] * (1 + this.fan_bonus / 100)
              ) {
                this.dp[i + 1][j + 1][k + 1] = this.dp[i][j][k] + fan; //目標レースに必ず出場
                this.mem[i + 1][j + 1][k + 1] = l;
              }
            }
          }
        }
        //目標レースはないが、夏合宿中はレースに出ない場合
        else if (
          this.is_ban_summer &&
          ((36 <= i && i <= 39) || (60 <= i && i <= 63))
        ) {
          for (let j = 0; j < N + 1; j++) {
            for (let k = 0; k < N + 1; k++) {
              if (this.dp[i + 1][0][k] < this.dp[i][j][k]) {
                //適正チェック
                this.dp[i + 1][0][k] = this.dp[i][j][k]; //レースに出ない場合
                this.mem[i + 1][0][k] = -1;
              }
            }
          }
        }
        //目標レースがない場合
        else {
          for (let j = 0; j < N + 1; j++) {
            for (let k = 0; k < N + 1; k++) {
              if (this.dp[i + 1][0][k] < this.dp[i][j][k]) {
                this.dp[i + 1][0][k] = this.dp[i][j][k]; //レースに出ない場合
                this.mem[i + 1][0][k] = -1;
              }
            }
            for (let k = 0; k < N; k++) {
              for (let l = 0; l < this.calendar[i].races.length; l++) {
                let fan = this.calendar[i].races[l].fan;
                //適正が2段階以上低いレースは勝利しないものと想定
                if (this.checkAppropriate(i, l) >= 2) fan = 0;
                if (j + 1 <= M)
                  if (this.dp[i + 1][j + 1][k + 1] < this.dp[i][j][k] + fan) {
                    if (
                      this.checkRequirement(i, l) <=
                      this.dp[i][j][k] * (1 + this.fan_bonus / 100)
                    ) {
                      this.dp[i + 1][j + 1][k + 1] = this.dp[i][j][k] + fan; //l番目のレースに出る場合
                      this.mem[i + 1][j + 1][k + 1] = l;
                    }
                  }
              }
            }
          }
        }
        //ノルマチェック(基準ノルマを満たせていないDPは全て無効化)
        if (this.fan_quota.some((v) => v.term_id === i + 1 && v.status)) {
          let quota = this.fan_quota.find(
            (v) => v.term_id === i + 1 && v.status
          ).num;
          for (let j = 0; j < N + 1; j++) {
            for (let k = 0; k < N + 1; k++) {
              if (
                this.dp[i + 1][j][k] * (1 + this.fan_bonus / 100) <
                quota * (1 + this.quota_leeway / 100)
              ) {
                this.dp[i + 1][j][k] = -INF;
                this.mem[i + 1][j][k] = -1;
              }
            }
          }
        }
      }
      //エクストラシナリオ分のファン数追加
      for (let j = 0; j < N + 1; j++) {
        for (let k = 0; k < N + 1; k++) {
          this.dp[N][j][k] += this.fan_extra;
        }
      }
      //最終ノルマチェック(基準ノルマを満たせていないDPは全て無効化)
      if (this.fan_quota.some((v) => v.term_id === N + 1 && v.status)) {
        let quota = this.fan_quota.find(
          (v) => v.term_id === N + 1 && v.status
        ).num;
        for (let j = 0; j < N + 1; j++) {
          for (let k = 0; k < N + 1; k++) {
            if (
              this.dp[N][j][k] * (1 + this.fan_bonus / 100) <
              quota * (1 + this.quota_leeway / 100)
            ) {
              this.dp[N][j][k] = -INF;
              this.mem[N][j][k] = -1;
            }
          }
        }
      }
      let best_j = 0;
      let best_k = 0;
      this.is_failed = true; //一瞬trueにする
      //戦略がfanもしくはtrophyの場合(ファン数重視)
      if (this.strategy.name !== "efficient") {
        let max_j = 0;
        let max_k = 0;
        for (let j = 0; j < N + 1; j++) {
          for (let k = 0; k < N + 1; k++) {
            if (
              this.dp[N][j][k] > 0 &&
              this.dp[N][max_j][max_k] <= this.dp[N][j][k]
            ) {
              max_j = j;
              max_k = k;
              this.is_failed = false;
            }
          }
        }
        best_j = max_j;
        best_k = max_k;
      }
      //戦略がefficientの場合(目標達成可能な最小出場回数重視)
      else if (this.strategy.name === "efficient") {
        let max_j = 0;
        let max_k = INF;
        for (let j = 0; j < N + 1; j++) {
          for (let k = 0; k < N + 1; k++) {
            if (
              this.dp[N][j][k] > 0 &&
              (k < max_k ||
                (k === max_k && this.dp[N][max_j][max_k] < this.dp[N][j][k]))
            ) {
              max_j = j;
              max_k = k;
              this.is_failed = false;
            }
          }
        }
        best_j = max_j;
        best_k = max_k;
      }
      // レコメンドレースの復元(レコメンド属性の登録)
      this.fan_sum = this.dp[N][best_j][best_k]; //表示用の基礎数値登録
      this.activities = []; //アクティビティ初期化
      let j = best_j;
      let k = best_k;
      for (let i = N; i >= 13; i--) {
        //直近はレースに出場したというパターン
        if (j > 0) {
          //出場したレースの復元
          this.activities.push(this.calendar[i - 1].races[this.mem[i][j][k]]);
          if (this.calendar[i - 1].isTarget === false) {
            this.calendar[i - 1].races[this.mem[i][j][k]].isRecommend = true;
          }
          //インデックスの更新(遷移前は必ずdp[i-1][j-1][k-1]のはずである)
          j--;
          k--;
        }
        //直近はレースに出ていないというパターン
        else if (j === 0) {
          //遷移前の検索(遷移前はdp[i-1][j][k]のはずである)
          for (let j2 = 0; j2 < N + 1; j2++) {
            if (this.dp[i - 1][j2][k] === this.dp[i][j][k]) {
              j = j2;
              break;
            }
          }
        }
      }
      this.activities.reverse(); //アクティビティ反転
      //console.log(this.dp);
    },
    getAndSetTrophies() {
      var database = firebase.database();
      database
        .ref("user_trophies/" + this.$store.getters.uid)
        .once("value")
        .then((snapshot) => {
          this.trophies = JSON.parse(snapshot.val());
          if (this.trophies === null) this.trophies = [];
          for (let i = 0; i < this.$store.getters.races.length; i++) {
            if (this.trophies.includes(this.$store.getters.races[i].id)) {
              Vue.set(this.$store.state.races[i], "status", true);
            }
          }
        }); //ここアロー関数じゃないと動かない
    },
  },
};
</script>
<style scoped>
@media screen and (min-width: 480px) {
}
/deep/ .el-alert {
  margin-left: 10px !important;
  margin-right: 10px !important;
  width: auto !important;
}
/deep/ [class*="_column"] {
  padding-top: 7.5px !important;
  padding-bottom: 7.5px !important;
}
/deep/ .el-card__body {
  padding: 10px !important;
}
/deep/ .el-form-item__label {
  padding-right: 10px !important;
  padding-left: 10px !important;
}
/deep/ .el-form-item {
  margin-bottom: 7.5px !important;
}
/deep/ .el-timeline {
  padding-left: 20px !important;
}
.detail-collapse {
  position: relative;
  z-index: 0;
}
.detail-title {
  position: absolute;
  width: 110px;
  left: 0;
  right: 0;
  padding-top: 10px;
  margin: auto;
  z-index: 1;
}
.quota-collapse {
  position: relative;
  z-index: 0;
}
.quota-title {
  position: absolute;
  width: 200px;
  left: 0;
  right: 0;
  padding-top: 10px;
  margin: auto;
  z-index: 1;
}
#calendar {
  display: table;
}
.form {
  border-color: lightgray;
}
.activities-modal {
  padding-top: 20px;
  padding-bottom: 20px;
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
.box-card4 {
  height: auto;
  margin-left: 0px;
  margin-right: 25px;
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
.btn {
  margin: 10px;
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
