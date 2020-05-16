<template>
  <div id="ChargeSet">
    <!-- 模式 -->
    <el-row style="width: 100%; margin: 0px; text-align: left;" :gutter="20">
      <el-col :span="24">
        <p>充值模式设置</p>
      </el-col>
    </el-row>
    <el-row style="width: 100%; margin: 0px; text-align: left; margin-bottom: 10px;" :gutter="20">
      <el-col :span="18">
        <el-select v-model="value" placeholder="请选择" size="small" style="width: 90%;">
          <el-option
            v-for="item in optionsRechargeP"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" @click="upMode()">更新</el-button>
      </el-col>
    </el-row>
    <!-- 设置 -->
    <el-row style="width: 100%; margin: 0px; text-align: left; padding-top: 5px;" class="border" :gutter="20">
      <el-col :span="18">
        <p>充值赠送设置</p>
      </el-col>
      <el-col :span="6" style="height: 36px; line-height: 36px;">
        <el-button type="primary" size="small" @click="addSet()">添加</el-button>
      </el-col>
    </el-row>
    <el-row style="width: 100%; margin: 0px; text-align: left;">
      <el-col :span="24">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="calc(100vh - 198px)">
            <el-table-column
              prop="cash"
              label="充值金额"
              align="center"
              min-width="80"
              fit="true">
            </el-table-column>
            <el-table-column
              prop="send"
              label="赠送金额"
              align="center"
              min-width="80"
              fit="true">
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
                    <el-button type="text" size="small" @click="change(scope.$index,scope.row)">修改</el-button>
                    <el-button type="text" size="small" @click="del(scope.$index)">删除</el-button>
                  </div>
                  <el-button type="text" slot="reference">操作</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogFormVisible" width="90%" top="25vh">
      <span>此操作将永久删除该数据, 是否继续?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="delData()">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible2" width="90%" top="22vh">
      <dl class="text">
        <dd class="item1">充值金额:</dd>
        <dd class="item">
          <el-input v-model="C_cash" placeholder="请输入充值金额" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">赠送金额:</dd>
        <dd class="item">
          <el-input v-model="C_send" placeholder="请输入赠送金额" clearable></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="changeData()">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from '@/common/js/axiosServer.js'
export default {
  data() {
    return {
      RechargePattern:[], // 充值模式设置
      RechargeSendType:[], // 充值页面充值赠送金额类型
      optionsRechargeP:[
        {value: 'chargeSend',label: '充值赠送模式'},
        {value: 'disc',label: '打折模式'}
      ],
      value:"",
      tableData:[],
      // 删除
      dialogFormVisible:false,
      delIndex:"",
      // 修改
      dialogFormVisible2:false,
      c_Index:"",
      C_cash:0,
      C_send:0
    }
  },
  created() {
    this.getAllData();
  },
  methods: {
    getAllData(){
      let Client = localStorage.getItem("ClientAddr");
      let getChargeSet = axios.getChargeSet(Client);
      getChargeSet.then((res) => {
        if(res.data.State == '成功'){
          this.getData(res.data.Body);
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    getData(data){
      this.RechargePattern = [];
      this.RechargeSendType = [];
      for(let i=0;i<data.length;i++){
        switch(data[i].Name){
          case "RechargePattern":
            this.RechargePattern.push(data[i]);
            this.value = this.RechargePattern[0].Value;
            break;
          default:
            this.RechargeSendType.push(data[i]);
        }
      }
      this.getTableData()
    },
    getTableData(){
      let str = this.RechargeSendType;
      str = str[0].Value;
      let obj = JSON.parse(str);
      for(let i=0;i<obj.length;i++){
        if(!!obj[i].cash){
          obj[i].cash = obj[i].cash.toFixed(2);
        }else{
          obj[i].cash = 0;
        }
        if(!!obj[i].send){
          obj[i].send = obj[i].send.toFixed(2);
        }else{
          obj[i].send = 0;
        }
      }
      this.tableData = obj
    },
    upMode(){
      let Client = localStorage.getItem("ClientAddr");
      let setCharge = axios.setCharge(Client,this.value,"RechargePattern");
      setCharge.then((res) => {
        if(res.data.State == '成功'){
          this.$message.success('更新成功');
          this.getAllData();
        }else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    addSet(){
      if(this.tableData.length<6){
        this.tableData.push({cash:0,send:0});
        let Client = localStorage.getItem("ClientAddr");
        let data = this.tableData;
        for(let i=0;i<data.length;i++){
          if(!!data[i].cash){
            data[i].cash = parseFloat(data[i].cash);
          }else{
            data[i].cash = 0;
          }
          if(!!data[i].send){
            data[i].send = parseFloat(data[i].send);
          }else{
            data[i].send = 0;
          }
        }
        let value = JSON.stringify(data);
        let setCharge = axios.setCharge(Client,value,"RechargeSendType");
        setCharge.then((res) => {
          if(res.data.State == '成功'){
            this.$message.success('添加成功');
            this.getAllData();
          }else {
            this.$message.error(res.data.Reason);
          }
        });
      }else{
        this.$message.warning("添加的数量不能超过6条");
      }
    },
    // 修改
    change(index,data){
      this.c_Index = index;
      this.C_cash = data.cash;
      this.C_send = data.send;
      this.dialogFormVisible2 = true;
    },
    changeData(){
      this.tableData[this.c_Index].cash = this.C_cash;
      this.tableData[this.c_Index].send = this.C_send;
      let Client = localStorage.getItem("ClientAddr");
      let data = this.tableData;
      for(let i=0;i<data.length;i++){
        if(!!data[i].cash){
          data[i].cash = parseFloat(data[i].cash);
        }else{
          data[i].cash = 0;
        }
        if(!!data[i].send){
          data[i].send = parseFloat(data[i].send);
        }else{
          data[i].send = 0;
        }
      }
      let value = JSON.stringify(data);
      let setCharge = axios.setCharge(Client,value,"RechargeSendType");
      setCharge.then((res) => {
        if(res.data.State == '成功'){
          this.$message.success('修改成功');
          this.getAllData();
          this.dialogFormVisible2 = false;
        }else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 删除
    del(index){
      this.delIndex = index;
      this.dialogFormVisible = true;
    },
    delData(){
      this.tableData.splice(this.delIndex, 1);
      let Client = localStorage.getItem("ClientAddr");
      let data = this.tableData;
      for(let i=0;i<data.length;i++){
        if(!!data[i].cash){
          data[i].cash = parseFloat(data[i].cash);
        }else{
          data[i].cash = 0;
        }
        if(!!data[i].send){
          data[i].send = parseFloat(data[i].send);
        }else{
          data[i].send = 0;
        }
      }
      let value = JSON.stringify(data);
      let setCharge = axios.setCharge(Client,value,"RechargeSendType");
      setCharge.then((res) => {
        if(res.data.State == '成功'){
          this.$message.success('删除成功');
          this.getAllData();
        }else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible = false;
    }
  }
}
</script>

<style scoped>
#ChargeSet{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
p{
  padding: 0px 10px;
  margin: 8px 0px;
  font-size: 15px;
  color: #5B5B5B;
}
dd{
  margin: 0px;
}
.border{
  border-top: 10px solid #EEEEEE;
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
</style>
