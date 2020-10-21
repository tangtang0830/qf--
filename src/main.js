import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入全局css和element-rest
import "../src/assets/styles/base.css";
import "../src/assets/styles/el-reset.css";
// 引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入iconfont
import "./assets/iconfont/iconfont.css"

Vue.use(ElementUI);
// Vue.config.productionTip = false;

// 按需引入

// import {Carousel,CarouselItem} from "element-ui"

// // 注册组件
// Vue.component("el-carousel",Carousel)
// Vue.component("el-carousel-item",CarouselItem)

// 路由前置钩子（导航守卫）
router.beforeEach((to, from, next) => {
  // next()
  // console.log(to);
  // console.log(from);
  // 用户登录之后，localstorage中有token
  let token = localStorage.getItem("qf-token");
  if (token) {
    // 如果是注册页面或者是登录页面，直接放行；
    next();
  } else {
    //没token
    if (to.path === "/login") {
      next();
    } else {
      // 如果访问的不是登入页，就要跳转到登入页
      next({ path: "/login" });
    }
  }
});
import "./utils/recursionRoutes"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
