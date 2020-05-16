<template>
  <div id="CardpostStatistics">
    <el-row class="border">
      <el-col :span="18" class="time">
        <span>{{view1}} - {{view2}}</span>
      </el-col>
      <el-col :span="6">
        <div style="width: 100%;">
          <el-button type="text" style="width: 100%; padding: 5px;" @click="dialogFormVisible2 = true;">查 询</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="border1">
      <el-row :gutter="10" style="padding: 5px;">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{TotalItemCount}}</dd>
              <dd class="Item2">退卡数</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{TotalCount}}点</dd>
              <dd class="Item2">赠送点数</dd>
            </dl>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table
      ref="filterTable"
      :data="allData"
      style="width: 100%"
      height="calc(100vh - 174px)" 
      >
      <el-table-column
        label="赠送时间"
        align="center"
        min-width="85"
        fit="true"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div class="time_size">{{scope.row.CreateDt | data}} {{scope.row.CreateDt | time}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="Tel"
        label="用户电话"
        align="center"
        min-width="95"
        fit="true"
        style="font-size: 10px"
        show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="time_size">{{scope.row.Tel}}</div>
          </template>
      </el-table-column>
      <el-table-column
        prop="iCount"
        label="赠送点数"
        align="center"
        min-width="80"
        fit="true"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="UserName"
        label="操作"
        align="center"
        min-width="60"
        fit="true">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="getRowData(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="dialogFormVisible1" fullscreen>
      <dl class="text">
        <dd class="item1">记录编号:</dd>
        <dd class="item2">{{pkNo}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">用户姓名:</dd>
        <dd class="item2">{{Name}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">用户电话:</dd>
        <dd class="item2">{{Tel}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">赠送点数:</dd>
        <dd class="item2">{{iCount}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">赠送时间:</dd>
        <dd class="item2">{{CreateDt}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">记录内容:</dd>
        <dd class="item2">{{recordInfo}}</dd>
      </dl>
    </el-dialog>
    <!-- 查询 -->
    <el-dialog title="查询" :visible.sync="dialogFormVisible2" fullscreen>
      <div class="block">
        <p class="block-text">开始时间:</p>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 90%"
          :editable="false"
          :clearable="false"
          class="left">
        </el-date-picker>
      </div>
      <div class="block">
        <p class="block-text">结束时间:</p>
        <el-date-picker
          v-model="value2"
          type="datetime"
          placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 90%"
          :editable="false"
          :clearable="false"
          class="left">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="searchData()">查 询</el-button>
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
      listData: [], //图表数据
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      // 详情
      CreateDt: "", // 赠送时间
      Name: "", // 用户姓名
      Tel: "", // 用户电话
      iCount: 0, // 赠送点数
      pkNo: "", // 记录编号
      recordInfo: "", // 记录内容
      // 图表
      TotalCount: 0, // 赠送点数
      TotalItemCount: 0, // 赠送条数
      // 查询
      view1:"",
      view2:"",
      val1:"",
      val2:"",
      value1:"",
      value2:""
    };
  },
  created() {
    this.getTime();
    this.search(this.value1,this.value2);
  },
  methods: {
    getTime() {
      var date = new Date();
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
      this.view1 = year + seperator1 + month + seperator1 + strDate;
      this.view2 = year + seperator1 + month + seperator1 + strDate;
      this.getTimeData();
    },
    getTimeData() {
      var date = new Date();
      let getData = this.$Common;
      var seperator2 = ":";
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      hour = (hour != 0 && hour < 10) ? '0' + hour : hour = hour;
      minute = (minute < 10) ? '0' + minute : minute = minute;
      second = (second < 10) ? '0' + second : second = second;
      if(getData.sTime){
        let hour1 = getData.sTime.split(" ")[1].split(":")[0];
        if(hour1 == "00") {
          hour1 = "0";
        };
        this.value1 = getData.sTime;
        this.view1 = getData.sTime.split(" ")[0] + " " + hour1 + "时";
      }else{
        this.value1 = this.view1 + " 00:00:00";
        this.view1 = this.view1 + " 0时";
      }
      if(getData.eTime){
        let hour2 = getData.eTime.split(" ")[1].split(":")[0];
        if(hour2 == "00") {
          hour2 = "0";
        };
        this.value2 = getData.eTime;
        this.view2 = getData.eTime.split(" ")[0] + " " + hour2 + "时";
      }else{
        this.value2 = this.view2 + " " + hour + seperator2 + minute + seperator2 + second;
        this.view2 = this.view2 + " " + hour + "时";
      }
    },
    search(sTime,eTime) {
      let Client = localStorage.getItem("ClientAddr");
      let startTime = sTime;
      let endTime = eTime;
      let data = [];
      this.listData = [];
      let searchDataIS = axios.searchDataIS(Client,startTime,endTime);
      searchDataIS.then((res) => {
        if(res.data.State == '成功'){
          data = res.data.Body.IntegralRecord;
          this.listData = res.data.Body.IntegralCount;
          for(var i=0;i<data.length;i++){
            if(!(!!data[i].iCount)){
              data[i].iCount = 0;
            };
          }
          this.allData = data;
          this.list();
          this.commData();
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    list() {
      if(this.listData != []) {
        this.TotalCount = this.listData.TotalCount; // 赠送点数
        this.TotalItemCount = this.listData.TotalItemCount; // 赠送条数
      }
    },
    commData() {
      this.$Common.sTime = this.value1;
      this.$Common.eTime = this.value2;
    },
    getRowData(row){
      this.CreateDt = row.CreateDt; // 赠送时间
      this.Name = row.Name; // 用户姓名
      this.Tel = row.Tel; // 用户电话
      this.iCount = row.iCount; // 赠送点数
      this.pkNo = row.pkNo; // 记录编号
      this.recordInfo = row.recordInfo; // 记录内容
      this.dialogFormVisible1 = true;
    },
    searchData() {
      let hour1 = this.value1.split(" ")[1].split(":")[0];
      let hour2 = this.value2.split(" ")[1].split(":")[0];
      if(hour1 == "00") {
        hour1 = "0";
      };
      if(hour2 == "00") {
        hour2 = "0";
      }
      this.view1 = this.value1.split(" ")[0] + " " + hour1 + "时";
      this.view2 = this.value2.split(" ")[0] + " " + hour2 + "时";
      let startT = this.value1;
      let endT = this.value2;
      this.search(startT,endT);
      this.dialogFormVisible2 = false;
    }
  }
}
</script>

<style scoped>
#CardpostStatistics {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
dd{
  margin: 0px;
}
.border{
  border-bottom: 1px solid #E0E0E0;
}
.border1{
  max-width: calc(100% - 10px);
  margin: auto;
}
.time_size{
  font-size: 10px;
}
.text{
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.Text{
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.Item1{
  font-size: 15px;
  color: #727377;
}
.Item2{
  font-size: 12px;
  color: #909399;
  font-weight: bold;
}
.time{
  font-size: 14px;
  color: #727377;
  line-height: 26px;
}
.item1{
  text-align: left;
  float: left;
  margin-bottom: 5px;
  margin-right: 5px;
}
.item2{
  text-align: left;
  float: left;
  line-height: 19px;
}
.block{
  margin-bottom: 10px;
  overflow: hidden;
}
.block-text{
  text-align: left;
  font-size: 14px;
  margin: 0px;
  margin-bottom: 5px;
}
.left{
  float: left;
}
</style>
