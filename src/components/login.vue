<template>
    <div style="width:700px;margin:40px auto;text-align:left">
      <span>用户名：</span>
      <el-input v-model="userName" style="width:300px;" @input="()=>{errorMsg1=''}"></el-input>
      <span style="color:red;font-size:12px;">{{errorMsg1}}</span><br/><br/>

      <span>密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
      <el-input v-model="password"  type="password" style="width:300px;" @input="()=>{errorMsg2=''}"></el-input>
      <span style="color:red;font-size:12px;">{{errorMsg2}}</span><br/><br/>

      <div style="width:350px;color: deepskyblue;font-size:12px;text-align: right" >
        <span style="cursor: pointer;" @click="">忘记密码？</span>
      </div>

      <el-button type="primary" @click="login" style="margin-left:100px;">登陆</el-button>
      <el-button  @click="register">注册</el-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              userName:'',
              password:'',
              errorMsg1:'',
              errorMsg2:''
            }
        },
        methods: {
          login(){
            var a=true;
            if(this.userName==null || this.userName=="" || this.userName==undefined){
              this.errorMsg1="用户名不能为空";
              a=false;
            }
            if(this.password==null || this.password=="" || this.password==undefined){
              this.errorMsg2="密码不能为空";
              a=false;
            }
            if(a==true){
              this.$ajax.post('api/login?username='+this.userName+'&password='+this.password).then(res=>{
                if(res.data.success){
                  window.location.href="/company";
                }else{
                  console.log(res.data);
                  this.errorMsg2=res.data.msg
                }
              });
            }
          },
          register(){
            console.log("注册");
          }
        },
        computed: {},
        components: {},
    }
</script>
<style scoped>

</style>
