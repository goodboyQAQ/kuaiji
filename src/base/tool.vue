<template>
    <div style="float:left;padding:20px">
      <span class='tool' @click="()=>{this.$emit('add')}">
        <i class="iconfont icon-xinzeng-shi"></i>
        <span>添加</span>
      </span>
      <span class='tool' @click="()=>{this.$emit('download')}">
        <i class="iconfont icon-download"></i>
        <span>导入模板</span>
      </span>
      <span class='tool' @click="()=>{this.$emit('import')}">
        <i class="iconfont icon-daoru"></i>
        <span>导入</span>
      </span>
      <span class='tool' @click="()=>{this.$emit('export')}">
        <i class="iconfont icon-daochu"></i>
        <span>导出</span>
      </span>
      <input id="myfile" type="file" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" value="点击上传"  @change="change" style='display:none;'>
    </div>
</template>
<script>
    export default {
      data() {
        return {

        };
      },
      props:['isCollapse'],
      methods: {},
      computed: {},
      components: {},
    }
</script>
<style scoped>

</style>
