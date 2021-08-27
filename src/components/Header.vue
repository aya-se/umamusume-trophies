<template>
  <div id="header">
    <header id="tab" class="tab">
      <router-link to="/" class="link-content">
        <h3 class="link-text">ウマ娘レースプランナー</h3></router-link
      >
      <div class="menu">
        <router-link to="/list" class="link-content">
          <i class="el-icon-s-grid" />レース一覧表
        </router-link>
        <router-link to="/planning" class="link-content">
          <i class="el-icon-s-opportunity" />レース計画
        </router-link>
        <router-link to="/info" class="link-content">
          <i class="el-icon-info" />各種情報
        </router-link>
      </div>
    </header>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "my-header",
  methods: {
    ...mapActions(["login", "setLoginUser", "logout", "deleteLoginUser"]),
    ...mapGetters(["uid"]),
  },
};
</script>

<style scoped>
#header {
  width: 100%;
  height: auto;
  padding-top: 15px;
  padding-bottom: 15px;
  z-index: 100;
  background-color: rgb(48, 48, 48);
}
.menu {
  display: inline-block;
}
.menu-item {
  width: 120px;
  padding: 0px !important;
  margin: 0px !important;
}
.link-text {
  display: inline-block;
  margin: 0px;
}
.link-content {
  text-decoration: none;
  color: lightgray !important;
  margin-left: 5px;
  margin-right: 5px;
}
.link-content:visited {
  color: #2c3e50;
}
.link-content:hover {
  color: dodgerblue !important;
}
</style>
