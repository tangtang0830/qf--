<template>
  <div class="login">
    <el-form
      :model="loginFrom"
      status-icon
      :rules="rules"
      ref="loginFrom"
      label-width="100px"
      class="demo-loginFrom"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="loginFrom.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginFrom.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginFrom')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    /**
     * @param {object} rule 就是一个表单验证对象
     * @param {string} value 输入值
     * @param {Function} callback 校验通过不传参，不通过传参
     */
    var validateUsername = (rule, value, callback) => {
      // console.log(rule)
      // console.log(value)
      // if (value === "") {
      //   callback(new Error("请输入用户名"));
      // } else {
      //   if (this.loginFrom.password !== "") {
      //     this.$refs.loginFrom.validateField("password");
      //   }
      //   callback();
      // }
      // 用户名正则 4到16位（字母，数字，下划线，减号）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
      if(!(value)){
        callback("4到16位（字母，数字，下划线，减号")
      }else{
        callback()
      }
    };
    var validatePassword = (rule, value, callback) => {
      // if (value === "") {
      //   callback(new Error("请再次输入密码"));
      // } else if (value !== this.loginFrom.username) {
      //   callback(new Error("两次输入密码不一致!"));
      // } else {
      //   callback();
      // }
      if(!(value)){
        callback("请输入密码")
      }else{
        callback()
      }
    };
    return {
      loginFrom: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {//代表本地校验通过
          alert("submit!");
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
  /* 表单样式 */
  .el-form {
    width: 400px;
  }
 
</style>

