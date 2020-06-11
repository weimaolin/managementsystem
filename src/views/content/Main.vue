<template>
  <el-container>
    <!-- 侧边栏区域 -->
    <el-aside :width="isCollapse ? '64px' : '200px' ">
      <div class="toggle-button" @click="toggleCollapse">|||</div>
      <!-- 侧边导航栏 -->
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#b3c0d1"
        text-color="#030303"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-menu-item index="/system">
          <template slot="title">
            <i class="el-icon-s-help"></i>
            <span>M-SYSTEM</span>
          </template>
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>MENU</span>
          </template>
          <el-menu-item index="/systemhome">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
          </el-menu-item>
        </el-submenu>

      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <img
            class="logo"
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1891308905,3658478277&fm=26&gp=0.jpg"
            alt
          />
          <span>M-SYSTEM</span>
        </div>
        <el-link type="info" @click="exit">退出</el-link>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      // 折叠按钮属性
      isCollapse: false
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    exit() {
      this.$message({
        message: "此功能正在开发中...",
        type: "warning"
      });
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
//  侧边导航栏区域
.el-aside {
  background-color: #b3c0d1;
}
.el-container {
  height: 100%;
}
.el-main {
  margin: 0;
  padding: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
}
.el-header {
  //  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  line-height: 60px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-menu {
  border-right: none;
}

// 折叠按钮样式
.toggle-button {
  background-color: #b3c0d1;
  text-align: center;
  letter-spacing: 0.2em;
  line-height: 24px;
  cursor: pointer;
  font-size: 10px;
  color: #fff;
}

.toggle-button:hover {
  background-color: red;
}
// logo
.logo {
  width: 200px;
  height: 60px;
}

//内容样式
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}

.router-link-active {
  //点击时去掉下划线
  text-decoration: none;
}

a {
  text-decoration: none; //去掉原有链接文字下划线
}
</style>