import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// 创新页面要从丢失用户信息，所以要从localStorage中取
let userInfo = localStorage.getItem("qf-userInfo") ||{}
userInfo =JSON.parse(userInfo)
export default new Vuex.Store({
  state: {
    userInfo
  },
  mutations: {
    // 更改userInfo
    SET_USERINFO(state,payload){
      state.userInfo = payload
    }
  },
  actions: {},
  modules: {}
});
