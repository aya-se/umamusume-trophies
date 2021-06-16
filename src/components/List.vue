<template>
  <div id="list">
    <h1>List</h1>
    <el-table :data="$store.state.races">
      <el-table-column
        fixed
        prop="name"
        label="レース名"
        sortable
        width="150"
      />
      <el-table-column
        prop="class"
        label="クラス"
        sortable
        width="90"
        :filters="[
          { text: 'GⅠ', value: 'G1' },
          { text: 'GⅡ', value: 'G2' },
          { text: 'GⅡ', value: 'G3' },
          { text: 'OP', value: 'OP' },
          { text: 'Pre-OP', value: 'Pre-OP' },
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.class === 'G1'" effect="dark" size="small"
            >GⅠ</el-tag
          >
          <el-tag
            v-else-if="scope.row.class === 'G2'"
            effect="dark"
            type="danger"
            size="small"
            >GⅡ</el-tag
          >
          <el-tag
            v-else-if="scope.row.class === 'G3'"
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
      <el-table-column prop="term" label="時期" sortable width="80" />
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
          { text: '〇', value: true },
          { text: '×', value: false },
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.junior === true">〇</p>
          <p v-else>×</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="classic"
        label="クラシック級"
        sortable
        width="50"
        :filters="[
          { text: '〇', value: true },
          { text: '×', value: false },
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.classic === true">〇</p>
          <p v-else>×</p>
        </template></el-table-column
      >
      <el-table-column
        prop="senior"
        label="シニア級"
        sortable
        width="50"
        :filters="[
          { text: '〇', value: true },
          { text: '×', value: false },
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.senior === true">〇</p>
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
          <el-checkbox v-model="scope.row.status" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
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
  },
};
</script>
