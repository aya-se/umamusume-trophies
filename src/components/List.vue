<template>
  <div id="list">
    <h1><i class="el-icon-s-grid" />レース一覧表</h1>
    <el-alert show-icon type="info" :closable="false"
      >開催される全てのレースの情報を閲覧できます。トロフィー列のボタンではトロフィーの獲得状況を管理でき、ログイン中のアカウントごとにステータスが保存されます。</el-alert
    >
    <el-table :data="$store.getters.races" height="800" class="table">
      <el-table-column fixed prop="id" label="レース名" sortable width="180"
        ><template slot-scope="scope">
          {{ scope.row.name }}
        </template></el-table-column
      >/>
      <el-table-column
        prop="class"
        label="クラス"
        sortable
        width="90"
        :filters="[
          { text: 'GⅠ', value: 'GⅠ' },
          { text: 'GⅡ', value: 'GⅡ' },
          { text: 'GⅡ', value: 'GⅢ' },
          { text: 'OP', value: 'OP' },
          { text: 'Pre-OP', value: 'Pre-OP' },
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.class === 'GⅠ'" effect="dark" size="small"
            >GⅠ</el-tag
          >
          <el-tag
            v-else-if="scope.row.class === 'GⅡ'"
            effect="dark"
            type="danger"
            size="small"
            >GⅡ</el-tag
          >
          <el-tag
            v-else-if="scope.row.class === 'GⅢ'"
            effect="dark"
            type="success"
            size="small"
            >GⅢ</el-tag
          >
          <el-tag
            v-else-if="scope.row.class === 'OP'"
            effect="dark"
            type="warning"
            size="small"
            >OP</el-tag
          >
          <el-tag
            v-else-if="scope.row.class === 'Pre-OP'"
            effect="dark"
            type="warning"
            size="small"
            >Pre-OP</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="term_id" label="時期" sortable width="80"
        ><template slot-scope="scope">
          {{ scope.row.term }}
        </template></el-table-column
      >/>
      <el-table-column
        prop="category"
        label="分類"
        sortable
        width="80"
        :filters="[
          { text: '短距離', value: '短距離' },
          { text: 'マイル', value: 'マイル' },
          { text: '中距離', value: '中距離' },
          { text: '長距離', value: '長距離' },
        ]"
        :filter-method="filterHandler"
      />
      <el-table-column prop="distance" label="距離" sortable width="90">
        <template slot-scope="scope"> {{ scope.row.distance }}m </template>
      </el-table-column>
      <el-table-column
        prop="field"
        label="コース"
        sortable
        width="80"
        :filters="[
          { text: '芝', value: '芝' },
          { text: 'ダート', value: 'ダート' },
        ]"
        :filter-method="filterHandler"
        ><template slot-scope="scope">
          <el-tag
            v-if="scope.row.field === '芝'"
            effect="plain"
            type="success"
            size="small"
            >芝</el-tag
          >
          <el-tag
            v-else-if="scope.row.field === 'ダート'"
            effect="plain"
            type="warning"
            size="small"
            >ダート</el-tag
          >
        </template></el-table-column
      >
      <el-table-column
        prop="rotation"
        label="周回"
        sortable
        width="50"
        :filters="[
          { text: '右', value: '右' },
          { text: '左', value: '左' },
          { text: '直線', value: '直線' },
        ]"
        :filter-method="filterHandler"
      />
      <el-table-column prop="fan" label="ファン数" sortable width="90">
        <template slot-scope="scope"> +{{ scope.row.fan }}人 </template>
      </el-table-column>
      <el-table-column
        prop="junior"
        label="ジュニア級"
        sortable
        width="50"
        :filters="[
          { text: '〇', value: 1 },
          { text: '×', value: 0 },
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.junior === 1">〇</p>
          <p v-else>×</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="classic"
        label="クラシック級"
        sortable
        width="50"
        :filters="[
          { text: '〇', value: 1 },
          { text: '×', value: 0 },
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.classic === 1">〇</p>
          <p v-else>×</p>
        </template></el-table-column
      >
      <el-table-column
        prop="senior"
        label="シニア級"
        sortable
        width="50"
        :filters="[
          { text: '〇', value: 1 },
          { text: '×', value: 0 },
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.senior === 1">〇</p>
          <p v-else>×</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="トロフィー"
        sortable
        width="50"
        :filters="[
          { text: '済', value: true },
          { text: '未', value: false },
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.status"
            v-if="
              scope.row.class == 'GⅠ' ||
              scope.row.class == 'GⅡ' ||
              scope.row.class == 'GⅢ'
            "
            @change="onChange(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";
import firebase from "firebase";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      trophies: new Array(),
    };
  },
  mounted: function () {
    this.getAndSetTrophies();
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
    formatter(row) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    onChange(item) {
      //console.log(item.status);
      //console.log(this.$store.getters.uid + " " + item.id);
      var database = firebase.database();
      let room = "user_trophies/" + this.$store.getters.uid;
      if (item.status) {
        this.trophies.push(item.id);
        database.ref(room).set(JSON.stringify(this.trophies));
      } else {
        this.trophies.splice(this.trophies.indexOf(item.id), 1);
        database.ref(room).set(JSON.stringify(this.trophies));
      }
      this.getAndSetTrophies();
      return;
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
.table {
  margin: 0 auto;
  max-width: 1000px;
}
</style>
