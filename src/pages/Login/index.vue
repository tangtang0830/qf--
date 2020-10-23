<template>
  <div class="login">
    <div class="left"></div>
    <div class="loginContainer">
      <h1 class="title">千锋管理系统</h1>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密 码" style="color:#fff" prop="password">
          <el-input
            type="password"
            @keydown.native.enter="submitForm('loginForm')"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <video
      class="bg_video"
      muted
      src="../../assets/video/bg_video.mp4"
      autoplay
      loop
      preload="auto"
    ></video>
  </div>
</template>
<script>
//  登入逻辑的实现

// 1.收集用户输入的username&password传递给后端

// 2.登入通过后，将后端传入的token存到本地

// 3.每次请求的时候，携带token authorization

// 4.展示token校验正确的数据

// 5。校验不通过，跳转到登录页
import { login } from "@/api";
import { mapMutations } from "vuex";
export default {
  data() {
    // 校验用户名
    var validateUsername = (rule, value, callback) => {
      // 用户名正则，4到16位（字母，数字，下划线，减号）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
      if (!value) {
        callback(new Error("请输入用户名4到16位"));
      } else {
        callback();
      }
    };
    // 校验用户密码
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 打开登录加载动画

          const loading = this.$loading({
            lock: true,
            text: "正在登录.....",
            spinner: "el-icon-loading",
            background: "rgba(0,0,0,0.7)"
          });

          //代表本地校验通过
          // console.log(this.loginForm.username,this.loginForm.password)
          let { username, password } = this.loginForm;

          //发送登入请求
          login(username, password)
            .then(res => {
              console.log(res);
              //服务器响应，关闭loading动画
              loading.close();
              if (res.data.state) {
                this.$message.success("登录成功");
                // 用户名密码正确
                localStorage.setItem("qf-token", res.data.token);
                localStorage.setItem(
                  "qf-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                // 更改vuex中state["username"]的值
                this.SET_USERINFO(res.data.userInfo);
                // 跳转到主页
                this.$router.push("/Welcome");
              } else {
                //用户名或者密码错误
                this.$message.error("用户名密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.login {
  height: 100%;
  width: 100%;
  background: url("../../assets/imgs/bg.jpg");
  overflow: hidden;
}

.loginContainer {
  position: relative;
  z-index: 9;
  width: 25rem;
  height: 30.47619048rem;
  position: absolute;
  top: 50%;
  left: 75%;
  /* -webkit-transform: translate(-50%, -50%); */
  transform: translate(-50%, -50%);
  border-radius: 11px;
  background: rgba(83, 107, 182, 0.46);
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
}

.loginContainer .title {
  color: #fff;
  margin-top: 100px;
  margin-bottom: 50px;
}
.loginContainer .el-button.el-button--primary {
  width: 100%;
  background: linear-gradient(90deg, #1596fb, #002dff);
}

.loginContainer .bg_video {
  display: block;
  margin: auto;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
}

.left {
  width: 50%;
  height: 100%;
  background-image: url("../../assets/imgs/bg2.png");
  background-repeat: no-repeat;
  background-size: 50%;
  position: absolute;
  opacity: 0.7;
  background-position: 60% 65%;
}
.el-form.demo-loginForm {
  padding: 0 50px 0 0;
  color: #fff;
}
</style>
