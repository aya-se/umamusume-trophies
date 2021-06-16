import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import router from "@/router";
import races from "@/../public/data/races.json";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,
    isLogin: false,
    isLoading: false,
    races: races,
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    setLoginStatus(state, status) {
      state.isLogin = status;
    },
    setLoadingStatus(state, status) {
      state.isLoading = status;
    },
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    logout() {
      firebase.auth().signOut();
    },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
      this.state.isLoading = true;
      router.push("/loading");
    },
    setLoginStatus({ commit }, status) {
      commit("setLoginStatus", status);
    },
    setLoadingStatus({ commit }, status) {
      commit("setLoadingStatus", status);
    },
    getCsv(url) {
      getCsv(url);
    },
  },
  getters: {
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    isLogin(state) {
      return state.isLogin;
    },
    isLoading(state) {
      return state.isLoading;
    },
    races(state) {
      return state.races;
    },
  },
});

function getCsv(url) {
  //CSVファイルを文字列で取得。
  var txt = new XMLHttpRequest();
  txt.open("get", url, false);
  txt.send();

  //改行ごとに配列化
  var arr = txt.responseText.split("\n");

  //1次元配列を2次元配列に変換
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    //空白行が出てきた時点で終了
    if (arr[i] == "") break;

    //","ごとに配列化
    res[i] = arr[i].split(",");
  }
  return res;
}
