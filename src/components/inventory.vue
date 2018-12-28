<template>
  <div class="container">

    <el-form :inline="true"  :model="form" class="demo-form-inline">
      <el-form-item label="名称：">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="类型：">
        <el-input v-model="form.type"/>
      </el-form-item>

      <el-form-item>
        <span style="margin-left:20px;"></span>
        <el-button type="primary" @click="select">查询</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>

    </el-form>

    <Tool @add="fnAdd" @download="fnDownload" @import="fnImport" @export="fnExport" @change="change"></Tool>


    <el-table :data="tableData" stripe border  style="width: 100%">
      <el-table-column fixed prop="name" label="名称"/>
      <el-table-column prop="type" label="类型"/>
      <el-table-column prop="belong" label="所属"/>
      <el-table-column prop="standard" label="规格"/>
      <el-table-column prop="price" label="单价"/>
      <el-table-column prop="unit" label="单位"/>
      <el-table-column prop="number" label="数量"/>
      <el-table-column prop="amount" label="总额"/>
      <el-table-column prop="remark" label="备注"/>
      <el-table-column prop="updateTime"  label="最后变动时间"/>
      <el-table-column label="操作" fixed="right" width="130px;">
        <template slot-scope="scope">
          <el-button @click="" type="primary" size="mini" icon="el-icon-edit" @click="fnEdit(scope.row)"></el-button>
          <el-button  type="danger" size="mini" icon="el-icon-delete" slot="reference" @click="fnDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog :title='dialogTitle' :visible="dialogEdit" width="30%" padding="30px" @close="close">
      <el-form  label-width="110px" v-model="formEdit">
        <el-form-item label="名称：">
          <el-input v-model="formEdit.name"/>
        </el-form-item>
        <el-form-item label="类型：">
          <el-input v-model="formEdit.type"/>
        </el-form-item>
        <el-form-item label="所属：">
          <el-input v-model="formEdit.belong"/>
        </el-form-item>
        <el-form-item label="规格：">
          <el-input v-model="formEdit.standard"/>
        </el-form-item>
        <el-form-item label="单价：">
          <el-input v-model="formEdit.price"/>
        </el-form-item>
        <el-form-item label="单位：">
          <el-input v-model="formEdit.unit"/>
        </el-form-item>
        <el-form-item label="数量：">
          <el-input v-model="formEdit.number"/>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="formEdit.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import Tool from '../base/tool';

    export default {
        data() {
            return {
              total:0,
              currentPage:1,
              dialogTitle:'', //提交框标题
              submitType:'', //提交类型   插入或更新
              dialogEdit:false, //提交框显示
              form:{
                name:"",type:""
              },
              formEdit:{
                id:"",name:"",type:"",belong:"",standard:"",price:"",
                unit:"",number:"",remark:""
              },
              page:{
                size:10,
                current:1
              },
              tableData: [],
            }
        },
        methods: {

          fnDelete(val) {  //删除
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$ajax.post('api/inventory/delete?id='+val.id)
                .then(res=>{
                    if(res.data.success){
                      this.$message({
                        type:"success",
                        message:res.data.msg
                      });
                      this.initList();
                    }else{
                      this.$message(res.data.msg);
                    }
              });
            })
          },
          fnAdd(){  //添加
            this.dialogTitle='添加',
            this.submitType='insert';
            this.dialogEdit=true;
            this.formEdit={};
          },
          fnEdit(val){ //修改
            this.dialogTitle='修改'
            this.submitType='update';
            this.dialogEdit=true;
            this.formEdit.id=val.id;
            this.formEdit.name=val.name;
            this.formEdit.type=val.type;
            this.formEdit.belong=val.belong;
            this.formEdit.standard=val.standard;
            this.formEdit.price=val.price;
            this.formEdit.number=val.number;
            this.formEdit.unit=val.unit;
            this.formEdit.remark=val.remark;
          },
          submit(){ //提交编辑
            if(this.submitType=='insert'){  //添加操作
              this.$ajax.post('api/inventory/insert',this.formEdit)
                .then(res=>{
                  if(res.data.success){
                    this.dialogEdit=false;
                    this.initList();
                    this.$message({
                      type: "success",
                      message: res.data.msg
                    });
                    this.initList();
                  }else{
                    this.$message(res.message);
                  }
                  this.dialogEdit=false;
              })
            }
            else if(this.submitType=='update'){ //更新操作
              this.$ajax.post('api/inventory/update',this.formEdit)
                .then(res=>{
                  if(res.data.success){
                    this.$message({
                        type: "success",
                        message:res.data.msg
                      }
                    );
                    this.initList();
                  }else{
                    this.$message(res.data.msg);
                  }
                  this.dialogEdit=false;

                })
            }
          },
          close(){ //关闭编辑框
           this.dialogEdit=false;
          },
          getList(){
            this.$ajax.post('api/inventory/get',{page:this.page,form:this.form})
              .then(res =>{
                if(res.data.success){
                  this.total=res.data.data.total;
                  this.tableData=res.data.data.records;
                  this.$message({
                      type: "success",
                      message:res.data.msg
                    }
                  );
                }else{
                  this.$message(res.data.msg);
                }
            });
          },
          initList(){ //初始化查询
            this.page.current=1;
            this.form={};
            this.getList();
          },
          select(){ //筛选查询
            this.page.current=1;
            this.getList();
            this.$message({
              type:"success",
              message:"查询成功"
            });
          },
          handleSizeChange(p){
            this.page.size=p;
            this.getList();
          },
          handleCurrentChange(p){
            this.page.current=p;
            this.getList();
          },
          reset(){ //重置查询条件
            this.form.name='';
            this.form.type='';
          },
          fnDownload(){
            window.location.href='api/inventory/temp';
          },
          fnImport(){
            document.getElementById("myfile").click();
          },
          change(){

            if (document.getElementById("myfile").files[0] != null) {
              let formData = new FormData();
              formData.append("file", document.getElementById("myfile").files[0]);
              const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              this.$ajax.post("/api/inventory/upload", formData)
                .then(res => {
                  if(res.data.success) {
                    this.$message({
                      type:"success",
                      message:res.data.msg
                    });
                    this.initList();
                  }else{
                    this.$message(res.data.msg);
                  }
                  loading.close(); //关闭遮罩层
                  document.getElementById("myfile").value = null;
                });
            }
          },
          fnExport(){
            window.location.href ="api/inventory/download?name="+this.form.name+ "&type="+ this.form.type;
          },



        },
        created(){
          this.getList();
        },
        computed: {},
        components: {
          Tool
        },
    }
</script>
<style scoped>
</style>
