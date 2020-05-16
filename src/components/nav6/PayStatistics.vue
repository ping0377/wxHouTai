<template>
  <div id="PayStatistics">
    <el-row class="border">
      <el-col :span="18" class="time">
        <span>{{view1}} - {{view2}}</span>
      </el-col>
      <el-col :span="6">
        <div style="width: 100%;">
          <el-button type="text" style="width: 100%; padding: 5px;" @click="getSearch()">查 询</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="border1">
      <el-row :gutter="10" style="padding: 5px;">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{payCount}}笔</dd>
              <dd class="Item2">扣款笔数</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{payMoney.toFixed(2)}}元</dd>
              <dd class="Item2">扣款金额</dd>
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
        prop="Tel"
        label="手机号"
        align="center"
        min-width="90"
        fit="true"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="fkcardNo"
        label="卡号"
        align="center"
        min-width="85"
        fit="true"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="Value"
        label="扣款金额"
        align="center"
        min-width="80"
        fit="true"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="UserName"
        label="操作"
        align="center"
        min-width="65"
        fit="true">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="getRowData(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="dialogFormVisible1" fullscreen>
      <dl class="text">
        <dd class="item1">消费时间:</dd>
        <dd class="item2">{{RecordDt}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">姓名:</dd>
        <dd class="item2">{{Name}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">手机号:</dd>
        <dd class="item2">{{Tel}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">扣款金额:</dd>
        <dd class="item2">{{Value}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">消费后余额:</dd>
        <dd class="item2">{{afterBlance}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">卡类型:</dd>
        <dd class="item2">{{cardType}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">卡号:</dd>
        <dd class="item2">{{fkcardNo}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">消费项目:</dd>
        <dd class="item2">{{remark}}</dd>
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
      <div class="block">
        <p class="block-text">选择店铺:</p>
        <el-select class="left" v-model="val1" placeholder="请选择店铺" style="width: 90%">
          <el-option :label="select1_l" :value="select1_v"></el-option>
          <el-option
            v-for="item in optionsS"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <p class="block-text">选择员工:</p>
        <el-select class="left" v-model="val2" placeholder="请选择员工" style="width: 90%">
          <el-option :label="select2_l" :value="select2_v"></el-option>
          <el-option
            v-for="item in optionsW"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      // 详情
      Name: "", // 姓名
      RecordDt: "", // 消费时间
      Tel: "", // 手机号
      Value: 0, // 扣款金额
      afterBlance: 0, // 消费后余额
      cardType: "", // 卡类型
      fkcardNo: "", // 卡号
      remark: "", // 消费项目
      // 图表
      payCount: 0, // 扣款笔数
      payMoney: 0, // 扣款金额
      // 查询
      view1:"",
      view2:"",
      val1:"",
      val2:"",
      value1:"",
      value2:"",
      select1_l:"全部店铺",
      select1_v:null,
      select2_l:"全部员工",
      select2_v:null,
      optionsW:[],
      optionsS:[],
      workerData:[],
      shopData:[],
      worker:null,
      shop:null
    };
  },
  created() {
    this.getWorker();
    this.getShop();
    this.getTime();
    this.search(this.value1,this.value2,this.worker,this.shop);
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
      this.getData();
    },
    getShop() {
      let Client = localStorage.getItem("ClientAddr");
      let getShop = axios.getShop(Client);
      getShop.then((res) => {
        if(res.data.State == '成功'){
          this.shopData = res.data.Body;
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    getWorker() {
      let Client = localStorage.getItem("ClientAddr");
      let getWorker = axios.getWorker(Client);
      getWorker.then((res) => {
        if(res.data.State == '成功'){
          this.workerData = res.data.Body;
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    getData(){
      let getData = this.$Common;
      if(getData.Shop){
        this.shop = getData.Shop;
      }
      if(getData.Worker){
        this.worker = getData.Worker;
      }
    },
    search(sTime,eTime,wNo,sNo) {
      let Client = localStorage.getItem("ClientAddr");
      let startTime = sTime;
      let endTime = eTime;
      let WorkerNo = wNo;
      let ShopNo = sNo;
      let data = [];
      let searchDataPS = axios.searchDataPS(Client,startTime,endTime,WorkerNo,ShopNo);
      searchDataPS.then((res) => {
        if(res.data.State == '成功'){
          data = res.data.Body
          for(var i=0;i<data.length;i++){
            if(!(!!data[i].Value)){
              data[i].Value = 0;
            };
            if(!(!!data[i].afterBlance)){
              data[i].afterBlance = 0;
            };
            data[i].Value = data[i].Value.toFixed(2);
            data[i].afterBlance = data[i].afterBlance.toFixed(2);
          }
          this.allData = data;
          this.payCount = data.length;
          this.payMoney = 0.0 // 初始化
          for(let i=0;i<data.length;i++){
            this.payMoney += parseFloat(data[i].Value);
          }
          this.commData();
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    getRowData(row){
      this.Name = row.Name // 姓名
      this.RecordDt = row.RecordDt // 消费时间
      this.Tel = row.Tel // 手机号
      this.Value = row.Value // 扣款金额
      this.afterBlance = row.afterBlance // 消费后余额
      this.cardType = row.cardType // 卡类型
      this.fkcardNo = row.fkcardNo // 卡号
      this.remark = row.remark // 消费项目
      this.dialogFormVisible1 = true;
    },
    workerOptions(){
      if(this.optionsW.length == 0) {
        if(this.workerData.length != 0){
          for(let i=0;i<this.workerData.length;i++){
            this.optionsW.push({value:this.workerData[i].No,label:this.workerData[i].Name});
          }
        }
      }
    },
    shopOptions(){
      if(this.optionsS.length == 0) {
        if(this.shopData.length != 0){
          for(let i=0;i<this.shopData.length;i++){
            this.optionsS.push({value:this.shopData[i].ShopNo,label:this.shopData[i].Name});
          }
        }
      }
    },
    commData() {
      this.$Common.sTime = this.value1;
      this.$Common.eTime = this.value2;
      this.$Common.Shop = this.shop;
      this.$Common.Worker = this.worker;
    },
    getSearch() {
      this.workerOptions();
      this.shopOptions();
      this.val2 = this.worker;
      this.val1 = this.shop;
      this.dialogFormVisible2 = true;
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
      let shopN = this.val1;
      this.shop = this.val1;
      let workerN = this.val2;
      this.worker = this.val2;
      this.search(startT,endT,workerN,shopN);
      this.dialogFormVisible2 = false;
    }
  }
}
</script>

<style scoped>
#PayStatistics {
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
