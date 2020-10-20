<template>
  <div class="subMenu">
    <el-menu default-active="1-4"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :router="true"
             :collapse="isCollapse">
      <!-- 具有子菜单 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">学员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product">项目管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 常规菜单 -->
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
