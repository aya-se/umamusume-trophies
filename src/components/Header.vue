<template>
  <div id="header">
    <header class="tab" v-if="$mq === 'pc'">
      <router-link to="/" class="link-content">
        <h3 class="link-text">ウマ娘レースプランナー</h3></router-link
      >
      <div class="menu" v-if="$mq === 'pc'">
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
    <header class="tab" v-if="$mq === 'sm'">
      <tasty-burger-button
        type="squeeze"
        class="hamburger-button"
        color="lightgray"
        active-color="lightgray"
        @toggle="onClick()"
      />

      <router-link to="/" class="link-content">
        <h3 class="link-text">ウマ娘レースプランナー</h3></router-link
      >
      <el-collapse-transition>
        <div class="hamburger-menu" v-if="isOpen && $mq === 'sm'">
          <el-divider class="hamburger-divider" />
          <router-link to="/list" class="link-content">
            <i class="el-icon-s-grid" />レース一覧表
          </router-link>
          <el-divider class="hamburger-divider" />
          <router-link to="/planning" class="link-content">
            <i class="el-icon-s-opportunity" />レース計画
          </router-link>
          <el-divider class="hamburger-divider" />
          <router-link to="/info" class="link-content">
            <i class="el-icon-info" />各種情報
          </router-link>
        </div>
      </el-collapse-transition>
    </header>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "my-header",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    ...mapActions(["login", "setLoginUser", "logout", "deleteLoginUser"]),
    ...mapGetters(["uid"]),
    onClick() {
      this.isOpen = !this.isOpen;
    },
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
.hamburger-menu {
  color: lightgray;
}
.hamburger-button {
  float: left;
  margin-left: 10px;
  height: auto;
}
.hamburger-divider {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  width: auto;
}
.link-content:visited {
  color: #2c3e50;
}
.link-content:hover {
  color: dodgerblue !important;
}
</style>
