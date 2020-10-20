<template>
  <div class="home">
    <el-container>
      <!-- 侧边菜单栏 -->
      <el-aside width="200">
        <subMenu></subMenu>
      </el-aside>
      <el-container>
        <!-- 顶栏布局 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content">
                图标
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                千锋管理系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-avatar
                  shape="square"
                  :size="40"
                  fit="fit"
                  src="http://img.touxiangzhan.com/upload/image/1a2730570044n2909877585t26.jpg"
                ></el-avatar>
                <span>欢迎您:</span>
                <b class="nickname">{{userInfo.nickname}}</b>
                <span class="quit" @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- main内容布局 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getLoginLog } from "@/api";
import subMenu from "../../components/subMenu";
import {mapActions, mapState} from "vuex"
export default {
  computed: {
    ...mapState(["userInfo"])
  },
  components: {
    subMenu
  },
  mounted() {
    getLoginLog().then(res => {
      console.log(res);
    });
  },
  methods: {
    quit(){
      // 退出登入
      // 1。清除token和userInfo
      // 2.跳转到登入页
      localStorage.removeItem("qf-token")
      localStorage.removeItem("qf-userInfo")
      this.$router.push("/login")
    }
  }
};
</script>
<style scoped>
.quit{
  cursor: pointer;
  color: #fff;
}
/* 修改avatar的样式 */
.el-avatar.el-avatar--square {
  vertical-align: middle;
  margin-right: 10px;
  border-radius: 40px;
}
/* layout顶栏样式 */
.grid-content {
  border-radius: 4px;
  min-height: 60px;
}
.row-bg {
  background-color: rgb(41, 37, 37);
}

/* container样式 */
.el-header {
  background-color: rgb(41, 37, 37);
  color:#fff;
  text-align: center;
  line-height: 60px;
}


.el-main {
  background-color: rgb(41, 37, 37);
  color: #fff;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
