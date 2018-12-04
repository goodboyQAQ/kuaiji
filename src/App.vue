<template>
  <div id="app">
    <Top ></Top>
    <el-container style=" border: 1px solid #eee">
      <el-aside style="width:70px;" height="100%">
        <Menu style="height:100%;min-height:600px;"></Menu>
      </el-aside>
      <el-container>
        <el-header style="border-bottom: 1px solid gray;">
          <div style="margin-left:30px;text-align: left"><h1>{{$route.meta.title}}</h1></div>
        </el-header>
        <el-main style="padding:0">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Top from './base/Top';
  import Menu from './base/menu';

export default {
  name: 'App',
  data() {
    return {
      isCollapse: true,

    };
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  components:{
    Top,Menu
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

/* 筛选框 el-form  */
.one-row{
  display: flex;
  justify-content: space-between;
}
.el-form-item__label{
  width:110px;
}
.el-dialog__footer{
  text-align: center;
}
.el-dialog__header{
  text-align:left;
}
/* 导入导出四个功能区*/
.tool{
  cursor: pointer;
  margin-right:20px;
}
.el-dialog__body{
  height:300px;
  overflow:auto;
}
</style>
