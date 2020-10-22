import axios from "axios";
import router from "../router";
import ElementUI from "element-ui";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "/api" : "http://www.chst.vip";

axios.defaults.withCredentials = true; //允许请求携带认证

import NProgress from "nprogress"
// 中断请求属性
export let CancelToken = axios.CancelToken;

// 创建请求拦截器，可以给每个请求都携带上想要传递的内容
axios.interceptors.request.use(config => {
  // 登录和注册是不需要携带token
  let token = localStorage.getItem("qf-token");
  // config.url="/users/login?name=123"
  config.headers["authorization"] = token;
  // 放行
  return config;
  // console.log(config);
}),
  // 响应拦截
  axios.interceptors.response.use(config => {

    // console.log(config);
    let { data } = config;
    if (data.code === "1004" || data.code == "10022") {
      // 在当前的后台api中1004代表token校验失败，提示错误，并且让页面跳转到登入页
      // 10022表示session到期失效，提示错误，清切让页面跳转到登入页
      // alert ("登入信息失效，请重新登录")
      // console.log(ElementUI);
      ElementUI.Message.error("登入信息失效，请重新登入");
      localStorage.removeItem("qf-token")
      router.push("/login");
      window.location.reload()
    }
    return config;
  });

axios.create({
  timeout: 4000
});
// export{
//   CancelToken as default
// }
export default axios;
