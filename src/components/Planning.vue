<template>
  <div>
    <h1><i class="el-icon-opportunity" />レース計画</h1>
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
    <p>未実装</p>
    <p>{{ character }}</p>
    <p></p>
  </div>
</template>
<script>
//import Vue from "vue";
export default {
  data() {
    return {
      character: [{}],
      appropriate: ["S", "A", "B", "C", "D", "E", "F", "G"],
    };
  },
  mounted: function () {
    //Vue.set(this.character, this.$store.state.characters[0]);
    this.character = this.$store.state.characters[0];
  },
  methods: {
    onChange() {
      this.character = this.$store.state.characters.find(
        (v) => (v.name = this.character_name)
      );
      console.log("hoge");
      return;
    },
  },
};
</script>
<style scoped>
.button-app {
  width: 60px;
}
</style>
