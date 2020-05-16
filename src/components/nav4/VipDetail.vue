<template>
  <div id="VipDetail">
    <el-table
      ref="filterTable"
      :data="allData"
      style="width: 100%"
      height="calc(100vh - 108px)"
      >
      <el-table-column
        prop="No"
        label="编号"
        align="center"
        min-width="70"
        fit="true"
        column-key="No"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="Header"
        label="标题"
        align="center"
        min-width="80"
        fit="true"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="Type"
        label="卡名称"
        align="center"
        min-width="100"
        :filters="optionsT"
        :filter-method="filterType" 
        fit="true"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="70"
        fit="true">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="click">
            <div>
              <el-button type="text" size="small" @click="getData(scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="changeData(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="delShow(scope.row)">删除</el-button>
            </div>
            <el-button type="text" slot="reference">操作</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%;">
      <el-button type="text" style="width: 100%;" @click="addData">添 加</el-button>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogFormVisible1" fullscreen>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">编号:</dd>
        <dd class="item2 xqfl2">{{No}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">标题:</dd>
        <dd class="item2 xqfl2">{{Header}}</dd>
      </dl>
      <dl class="text xqfl" >
        <dd class="item1 xqfl1">内容:</dd>
        <dd class="item2 xqfl2 content">{{Content}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">卡名称:</dd>
        <dd class="item2 xqfl2">{{Type}}</dd>
      </dl>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible2" fullscreen>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <dl class="text">
          <dd class="item1">编号:</dd>
          <dd class="item">{{C_No}}</dd>
        </dl>
        <dl class="text">
          <dd class="item1">标题:</dd>
          <dd class="item">
            <el-form-item prop="C_Header" class="C_Header">
              <el-input v-model="ruleForm.C_Header" clearable></el-input>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">内容:</dd>
          <dd class="item">
            <el-form-item prop="C_Content" class="C_Content">
              <el-input
                type="textarea"
                :rows="5"
                v-model="ruleForm.C_Content">
              </el-input>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">卡名称:</dd>
          <dd class="item">
            <el-form-item prop="C_Type" class="C_Type">
               <el-select v-model="ruleForm.C_Type" placeholder="请选择卡名称">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </dd>
        </dl>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="upData('ruleForm')">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogFormVisible3" width="90%" top="25vh">
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">卡号:</dd>
        <dd class="del2">{{delNo}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">卡名称:</dd>
        <dd class="del2">{{delType}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="del">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from '@/common/js/axiosServer.js'
export default {
  data() {
    return {
      allData: [],
      optionsT: [],
      cardType: null,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      // 详情
      Content: "",
      Header: "",
      No: "",
      Type: "",  
      // 删除
      delNo: "",
      delType: "",
      // 修改
      ruleForm: {
        C_Type:"",  // 卡名称
        C_Header: "",// 条件
        C_Content: "", // 说明
      },
      options:[],
      rules: {
        // 卡名称
        C_Type: [
          { required: true, message: '请选择卡名称', trigger: 'change' }
        ],
        // 说明
        C_Content: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        // 条件
        C_Header: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
      },
      C_No: ""
    }
  },
  created() {
    this.getAllData();
    this.getCardType();
  },
  methods: {
    // 表格
    getAllData() {
      let Client = localStorage.getItem("ClientAddr");
      let getCardDetail = axios.getCardDetail(Client);
      getCardDetail.then((res) => {
        if(res.data.State == '成功'){
          this.allData = res.data.Body;
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    getCardType() {
      let allType = []
      this.cardType = [];
      this.cardType.push({ No: null, Name: "全部" });
      if(this.cardType != null && this.cardType.length != 0) {
        let Client = localStorage.getItem("ClientAddr");
        let CardDetailType = axios.CardDetailType(Client);
        CardDetailType.then((res) => {
          if(res.data.State == '成功'){
            this.cardType = this.cardType.concat(res.data.Body);
            allType = res.data.Body;
            if(allType.length != 0) {
              let type = [];
              let typeName = [];
              for(let i=0;i<allType.length;i++){
                type.push(allType[i].Name);
                if(typeName.indexOf(type[i]) == -1){
                  typeName.push(type[i]);
                }
              }
              for(let j=0;j<typeName.length;j++){
                this.optionsT.push({value:typeName[j],text:typeName[j]});
              }
            }
          }else{
          this.$message.error(res.data.Reason);
        }
        })
      }
    },
    // 查询
    filterType(value, row) {
      return row.Type === value;
    },
    // 添加
    addOpen1() {
      this.$message({
        message: '添加成功',
        type: 'success'
      });
    },
    addData() {
      let Client = localStorage.getItem("ClientAddr");
      let addCardType = axios.addCardDetail(Client);
      addCardType.then((res) => {
        if(res.data.State == '成功'){
          this.getAllData();
          this.addOpen1();
        }else {
          this.$message.error(res.data.Reason);
        }
      })
    },
    // 详情
    getData(row) {
      this.No = row.No;
      this.Type = row.Type;
      this.Header = row.Header;
      this.Content = row.Content;
      this.dialogFormVisible1 = true;
    },
    // 修改
    changeOpen1() {
      this.$message({
        message: '修改成功',
        type: 'success'
      });
    },
    getOptions() {
      if(this.options.length == 0) {
        for(let i=1;i<this.cardType.length;i++){
          this.options.push({value:this.cardType[i].No,label:this.cardType[i].Name});
        }
      }
    },
    changeData(row) {
      this.getOptions();
      this.ruleForm.C_Header = row.Header;
      this.ruleForm.C_Content = row.Content;
      this.C_No = row.No;
      let val = "";
      for(let i=0;i<this.options.length;i++)
      {
        if(this.options[i].label == row.Type){
          val = this.options[i].value;
          break;
        }
      }
      this.ruleForm.C_Type = val;
      this.dialogFormVisible2 = true;
    },
    upData(formName) {
      this.$refs[formName].validate((valid) =>{
        if(valid) {
          let Client = localStorage.getItem("ClientAddr");
          let header = this.ruleForm.C_Header; //标题
          let type = this.ruleForm.C_Type; //卡名称
          let no = this.C_No; //编号
          let content = this.ruleForm.C_Content; // 说明
          let changeDataDetail = axios.changeDataDetail(Client,header,type,content,no);
          changeDataDetail.then((res) => {
            if(res.data.State == '成功'){
              this.getAllData();
              this.changeOpen1();
            }else {
              this.$message.error(res.data.Reason);
            }
          });
          this.dialogFormVisible2 = false;
        }
      });
    },
    // 删除
    delShow(row) {
      this.dialogFormVisible3 = true;
      this.delNo = row.No;
      this.delType = row.Type;
    },
    delopen() {
      this.$message({
        message: '删除成功',
        type: 'success'
      });
    },
    del(){
      let Client = localStorage.getItem("ClientAddr");
      let delCardDetail = axios.delCardDetail(Client, this.delNo);
      delCardDetail.then((res) => {
        if(res.data.State == '成功'){
          this.delopen();
          this.getAllData();
        }else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible3 = false;
    }
  }
}
</script>

<style scoped>
#VipDetail {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#viewImg{
  width: 90px;
  height: 60px;
}
dd{
  margin: 0px;
}
.block{
  margin-bottom: 10px;
}
.text{
  margin-top: 10px;
  margin-bottom: 10px;
}
.item{
  text-align: left;
}
.item1{
  text-align: left;
  margin-bottom: 5px;
}
.item2{
  text-align: left;
}
.xqfl,.del{
  overflow: hidden;
}
.xqfl1{
  float: left;
  margin-bottom: 5px;
  margin-right: 5px;
}
.xqfl2{
  float: left;
  line-height: 19px;
}
.del1{
  float: left;
  text-align: right;
  margin-right: 5px;
  width: 25%;
}
.del2{
  float: left;
  text-align: left;
  width: 65%;
}
.content{
  line-height: 2;
}
</style>
