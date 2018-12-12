<template>
    <div style="background:white;height:60px;line-height: 60px;text-align: left">
      <i class="iconfont icon-caidan" style="font-size:30px;" v-if="open" @click="()=>{this.$emit('update:open',!open)}"></i>
      <i class="iconfont icon-caidan-copy" style="font-size:30px;" v-else @click="()=>{this.$emit('update:open',!open)}"></i>
      <span style="vertical-align: super">{{this.$route.meta.title}}</span>

    </div>
</template>
<script>
    export default {
        data() {
            return {
              open:true
            }
        },
        props:["open"],
        methods: {
          a(){
            console.log("aa");
          },
          b(){

          }
        },
        computed: {},
        components: {},
    }
</script>
<style scoped>
  i{
    margin-left:20px;
    margin-right:30px;
  }
</style>
