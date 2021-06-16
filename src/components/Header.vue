<template>
  <div id="header">
    <header id="tab" class="tab">
      <router-link to="/" class="link-content">
        <h1>ウマ娘レース計画ツール(仮)</h1></router-link
      >
      <el-menu mode="horizontal">
        <el-menu-item index="1" class="menu-item"
          ><router-link to="/list" class="link-content">
            List</router-link
          ></el-menu-item
        >
        <el-menu-item index="2" class="menu-item"
          ><router-link to="/planning" class="link-content">
            Planning</router-link
          ></el-menu-item
        >
        <el-menu-item index="3" class="menu-item"
          ><router-link to="/info" class="link-content">
            Info</router-link
          ></el-menu-item
        >
      </el-menu>
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
  z-index: 100;
  background-color: white;
}
.menu-item {
  width: 33.33333%;
}
.link-content {
  text-decoration: none;
  color: #2c3e50;
}
.link-content:visited {
  color: #2c3e50;
}
.link-content:hover {
  color: dodgerblue !important;
}
</style>
