<template>
  <div class="container">

    <el-form :inline="true"  :model="form" class="demo-form-inline">
      <div class="one-row">
      <el-form-item label="公司名称：">
        <el-input v-model="form.companyName"/>
      </el-form-item>
      <el-form-item label="纳税人识别号：">
        <el-input v-model="form.taxpayer"/>
      </el-form-item>
      <el-form-item label="银行卡号：">
        <el-input v-model="form.accoutId"/>
      </el-form-item>
      <el-form-item label="法人：">
        <el-input v-model="form.corporation"/>
      </el-form-item>
      </div>

      <div class="one-row">
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item>
          <span style="margin-left:20px;"></span>
          <el-button type="primary" @click="select">查询</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </div>
    </el-form>

    <template>
      <div style="float:left;padding:20px">
        <span class='tool' @click="fnAdd">
          <i class="iconfont icon-xinzeng-shi"></i>
          <span>添加</span>
        </span>
        <span class='tool' @click="fnDownload">
          <i class="iconfont icon-download"></i>
          <span>导入模板</span>
        </span>
        <span class='tool' @click="fnImport">
          <i class="iconfont icon-daoru"></i>
          <span>导入</span>
        </span>
        <span class='tool' @click="fnExport">
          <i class="iconfont icon-daochu"></i>
          <span>导出</span>
        </span>
        <input id="myfile" type="file" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" value="点击上传"  @change="change" style='display:none;'>
      </div>
    </template>

    <el-table :data="tableData" stripe border  style="width: 100%">
      <el-table-column fixed prop="companyName" label="公司名称" width="180"/>
      <el-table-column prop="taxpayer" label="纳税人识别号" width="180"/>
      <el-table-column prop="address" label="公司地址"/>
      <el-table-column prop="phone" label="公司电话"/>
      <el-table-column prop="bank" label="开户行"/>
      <el-table-column prop="accoutId" label="银行卡号"/>
      <el-table-column prop="corporation" label="法人"/>
      <el-table-column prop="tel" label="法人电话"/>
      <el-table-column prop="remark" label="备注"/>
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
        <el-form-item label="公司名称：">
          <el-input v-model="formEdit.companyName"/>
        </el-form-item>
        <el-form-item label="纳税人识别号：">
          <el-input v-model="formEdit.taxpayer"/>
        </el-form-item>
        <el-form-item label="公司地址：">
          <el-input v-model="formEdit.address"/>
        </el-form-item>
        <el-form-item label="公司电话：">
          <el-input v-model="formEdit.phone"/>
        </el-form-item>
        <el-form-item label="开户行：">
          <el-input v-model="formEdit.bank"/>
        </el-form-item>
        <el-form-item label="银行卡号：">
          <el-input v-model="formEdit.accoutId"/>
        </el-form-item>
        <el-form-item label="法人：">
          <el-input v-model="formEdit.corporation"/>
        </el-form-item>
        <el-form-item label="法人电话：">
          <el-input v-model="formEdit.tel"/>
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

    export default {
        data() {
            return {
              total:0,
              currentPage:1,
              pageSize:10,
              pageNum:1,
              dialogTitle:'', //提交框标题
              submitType:'', //提交类型   插入或更新
              dialogEdit:false, //提交框显示
              form:{
                companyName:'',taxpayer:'',address:'',phone:'',
                bank:'',accoutId:'',corporation:'',tel:'',remark:''
              },
              formEdit:{
                id:'',companyName:'',taxpayer:'',address:'',phone:'',
                bank:'',accoutId:'',corporation:'',tel:'',remark:''
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
              this.$ajax.post('api/company/deletecompany')
                .then(res=>{
                    if(res.data.success){
                      this.$message({
                        type:"success",
                        message:res.data.message
                      })
                    }else{
                      this.$message(res.data.message);
                    }
              });
            })
          },
          fnAdd(){  //添加
            this.dialogTitle='添加',
            this.submitType='add';
            this.dialogEdit=true;
            this.formEdit={};
          },
          fnEdit(val){ //修改
            this.dialogTitle='修改'
            this.submitType='update';
            this.dialogEdit=true;
            this.formEdit.id=val.id;
            this.formEdit.companyName=val.companyName;
            this.formEdit.taxpayer=val.taxpayer;
            this.formEdit.address=val.address;
            this.formEdit.phone=val.phone;
            this.formEdit.bank=val.bank;
            this.formEdit.accoutId=val.accoutId;
            this.formEdit.corporation=val.corporation;
            this.formEdit.tel=val.tel;
            this.formEdit.remark=val.remark;

          },
          submit(){ //提交编辑
            if(this.submitType=='add'){  //添加操作
              this.$ajax.post('api/company/addcompany',this.formEdit)
                .then(res=>{
                  if(res.data.success){
                    this.dialogEdit=false;
                    this.getList();
                    this.$message({
                      type: "success",
                      message: "添加成功!"
                      }
                    );
                    this.initList();
                  }else{
                    this.$message(res.message);
                  }
                  this.dialogEdit=false;
              })
            }
            else if(this.submitType=='update'){ //更新操作
              this.$ajax.post('api/company/updatecompany',this.formEdit)
                .then(res=>{
                  if(res.data.success){
                    this.$message({
                        type: "success",
                        message: "修改成功!"
                      }
                    );
                    this.initList();
                  }else{
                    this.$message(res.message);
                  }
                  this.dialogEdit=false;

                })
            }
          },
          close(){ //关闭编辑框
           this.dialogEdit=false;
          },
          getList(){
            this.$ajax.post('api/company/getcompany',
              {bean:this.form,pageSize:this.pageSize,pageNum:this.pageNum})
              .then(res =>{
                if(res.data.success){
                  this.total=res.data.data.total;
                  this.tableData=res.data.data.list;
                }else{
                  this.$message(res.data.msg);
                }
            });
          },
          initList(){
            this.pageNum=1;
            this.form={};
            this.getList();
          },
          select(){ //筛选查询
            this.pageNum=1;
            this.pageSize=10;
            this.getList();
            this.$message({
              type:"success",
              message:"查询成功"
            });
          },
          handleSizeChange(p){
            this.pageSize=p;
            this.getList();
          },
          handleCurrentChange(p){
            this.pageNum=p;
            this.getList();
          },
          reset(){ //重置查询条件
            this.form.companyName='';
            this.form.corporation='';
            this.form.accoutId='';
            this.form.taxpayer='';
          },
          fnDownload(){
            window.location.href='api/company/temp';
          },
          fnImport(){
            document.getElementById("myfile").click();
          },
          change(){
            console.log("1");
            if (document.getElementById("myfile").files[0] != null) {
              let formData = new FormData();
              formData.append("file", document.getElementById("myfile").files[0]);
              const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              this.$ajax.post("/api/company/upload", formData)
                .then(res => {
                  if(res.data.success) {
                    console.log(res);
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
            window.location.href ="api/company/download?companyName="+this.form.companyName+ "&taxpayer="+
              this.form.taxpayer+"&accoutId="+this.form.accoutId+"&corporation="+this.form.corporation;
          },



        },
        created(){
          this.getList();
        },
        computed: {},
        components: {
        },
    }
</script>
<style scoped>
</style>
