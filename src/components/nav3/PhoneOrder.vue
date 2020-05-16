<template>
  <div id="PhoneOrder">
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
        min-width="80"
        fit="true"
        column-key="No"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="预约时间"
        align="center"
        min-width="85"
        fit="true"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="time_size">{{scope.row.createDt | data}} {{scope.row.createDt | time}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="电话"
        align="center"
        min-width="90"
        fit="true"
        show-overflow-tooltip
      >
      <template slot-scope="scope">
        <div class="time_size">{{scope.row.Tel}}</div>
      </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="65"
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
        <dd class="item1 xqfl1">姓名:</dd>
        <dd class="item2 xqfl2">{{Name}}</dd>
      </dl>
      <dl class="text xqfl" >
        <dd class="item1 xqfl1">电话:</dd>
        <dd class="item2 xqfl2 content">{{Tel}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">地址:</dd>
        <dd class="item2 xqfl2">{{Addr}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">预约时间:</dd>
        <dd class="item2 xqfl2">{{createDt}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">收件时间:</dd>
        <dd class="item2 xqfl2">{{RecvDt}}</dd>
      </dl>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible2" fullscreen>
      <dl class="text">
        <dd class="item1">编号:</dd>
        <dd class="item">{{C_No}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">电话:</dd>
        <dd class="item">
          <el-input
            clearable
            style="width: 90%"
            placeholder="请输入电话"
            v-model="C_tel">
          </el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">姓名:</dd>
        <dd class="item">
          <el-input
            clearable
            style="width: 90%"
            placeholder="请输入姓名"
            v-model="C_name">
          </el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">地址:</dd>
        <dd class="item">
          <el-input
            clearable
            style="width: 90%"
            placeholder="请输入地址"
            v-model="C_address">
          </el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">收件时间:</dd>
        <dd class="item" style="overflow: hidden;">
          <el-date-picker
            v-model="C_value"
            type="datetime"
            placeholder="收件时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 90%"
            :editable="false"
            class="left">
          </el-date-picker>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">预约时间:</dd>
        <dd class="item">{{C_createDt}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="upData()">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogFormVisible3" width="90%" top="25vh">
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">卡号:</dd>
        <dd class="del2">{{delNo}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">预约时间:</dd>
        <dd class="del2">{{delTime}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="del">删除</el-button>
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
      cardType: null,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      // 详情
      Addr: "", // 地址
      Name: "", // 姓名
      No: "", // 编号
      RecvDt: "", // 收件时间
      Tel: "", //电话
      createDt: "", // 预约时间  
      // 删除
      delNo: "",
      delTime:'',
      // 修改
      C_No:'',
      C_tel:'',
      C_name:'',
      C_address:'',
      C_value:'',
      C_createDt:''
    }
  },
  created() {
    this.getAllData();
  },
  methods: {
    // 表格
    getAllData() {
      let Client = localStorage.getItem("ClientAddr");
      let phoneOrder = axios.phoneOrder(Client);
      phoneOrder.then((res) => {
        if(res.data.State == '成功'){
          this.allData = res.data.Body;
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    // 添加
    getTimeData(){
      var date = new Date();
      let timeData;
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var seperator2 = ":";
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      hour = (hour < 10) ? '0' + hour : hour = hour;
      minute = (minute < 10) ? '0' + minute : minute = minute;
      second = (second < 10) ? '0' + second : second = second;
      timeData = year + seperator1 + month + seperator1 + strDate + " " + hour + seperator2 + minute + seperator2 + second;
      return timeData;
    },
    addOpen1() {
      this.$message({
        message: '添加成功',
        type: 'success'
      });
    },
    addData() {
      let createDt = this.getTimeData();
      let Client = localStorage.getItem("ClientAddr");
      let addPhoneOrder = axios.addPhoneOrder(Client, createDt);
      addPhoneOrder.then((res) => {
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
      this.Addr = row.Addr; // 地址
      this.Name = row.Name; // 姓名
      this.No = row.No; // 编号
      this.RecvDt = row.RecvDt // 收件时间
      this.Tel = row.Tel; //电话
      this.createDt = row.createDt // 预约时间  
      this.dialogFormVisible1 = true;
    },
    // 修改
    changeOpen1() {
      this.$message({
        message: '修改成功',
        type: 'success'
      });
    },
    changeData(row) {
      this.C_No = row.No;
      this.C_createDt = row.createDt;
      this.C_name = row.Name;
      this.C_tel = row.Tel;
      this.C_address = row.Addr;
      this.C_value = row.RecvDt;
      this.dialogFormVisible2 = true;
    },
    upData() {
      let Client = localStorage.getItem("ClientAddr");
      let tel = this.C_tel; // 电话
      let name = this.C_name; // 名称
      let no = this.C_No; // 编号
      let address = this.C_address; // 地址
      let time = this.C_value; // 收货时间
      let changePhoneOrder = axios.changePhoneOrder(Client,address,name,time,tel,no);
      changePhoneOrder.then((res) => {
        if(res.data.State == '成功'){
          this.getAllData();
          this.changeOpen1();
        }else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible2 = false;
    },
    // 删除
    delShow(row) {
      this.dialogFormVisible3 = true;
      this.delNo = row.No;
      this.delTime = row.createDt ;
    },
    delopen() {
      this.$message({
        message: '删除成功',
        type: 'success'
      });
    },
    del(){
      let Client = localStorage.getItem("ClientAddr");
      let delPhoneOrder = axios.delPhoneOrder(Client, this.delNo);
      delPhoneOrder.then((res) => {
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
#PhoneOrder {
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
.time_size{
  font-size: 10px;
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
.content{
  line-height: 2;
}
.left{
  float: left;
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
</style>
