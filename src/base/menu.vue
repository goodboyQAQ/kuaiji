<template>
    <div>
          <el-menu router default-active="this.$router.path" class="el-menu-vertical-demo"  :collapse="isCollapse" background-color="#545c64" text-color="#fff" style="height: 100%;" >
            <el-submenu index="1">
              <template slot="title">
                <i class="iconfont icon-jibenxinxi"></i>
                <span slot="title">基本信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/company">公司资质</el-menu-item>
                <el-menu-item index="/custmer">客户信息</el-menu-item>
                <el-menu-item index="/supplier">供应商信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="iconfont icon-kucunguanli"></i>
                <span slot="title">库存管理</span>
              </template>
              <el-menu-item-group>
                <span slot="title">原材料</span>
                <el-menu-item index="2-1">入库</el-menu-item>
                <el-menu-item index="2-2">出库</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title">半成品</span>
                <el-menu-item index="2-3">入库</el-menu-item>
                <el-menu-item index="2-4">出库</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title">成品</span>
                <el-menu-item index="2-5">入库</el-menu-item>
                <el-menu-item index="2-6">出库</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="iconfont icon-xiaoshouguanli"></i>
                <span slot="title">销售管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">销售订单</el-menu-item>
                <el-menu-item index="3-2">销售退回</el-menu-item>
                <el-menu-item index="3-3">应收账款管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          isCollapse: true,
        };
      },
        methods: {},
        computed: {},
        components: {},
    }
</script>
<style scoped>

</style>
