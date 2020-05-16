<template>
  <div id="RechargeStatistics">
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
    <div class="list_border border1">
      <!-- 1 -->
      <el-row :gutter="10" style="padding: 5px;">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{iCount.toFixed(2)}}元</dd>
              <dd class="Item2">充值总数</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{RechargeValue.toFixed(2)}}元</dd>
              <dd class="Item2">充值总额</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{GiveMoney.toFixed(2)}}元</dd>
              <dd class="Item2">赠送总额</dd>
            </dl>
          </div>
        </el-col>
      </el-row>
      <!-- 2 -->
      <el-row :gutter="10" style="padding: 5px;">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{WeChatPayMoney.toFixed(2)}}元</dd>
              <dd class="Item2">微信</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{AliPayMoney.toFixed(2)}}元</dd>
              <dd class="Item2">支付宝</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{CashMoney.toFixed(2)}}元</dd>
              <dd class="Item2">现金</dd>
            </dl>
          </div>
        </el-col>
      </el-row>
      <!-- 3 -->
      <el-row :gutter="10" style="padding: 5px;">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text_N">
              <dd class="Item1"></dd>
              <dd class="Item2"></dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{IntegralMoney}}点</dd>
              <dd class="Item2">积分</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text_N">
              <dd class="Item1"></dd>
              <dd class="Item2"></dd>
            </dl>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      height="calc(100vh - 283px)" 
      >  <!-- 220px-25px -->
      <el-table-column
        prop="No"
        label="会员卡号"
        align="center"
        min-width="85"
        fit="true"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="RechargeMoney"
        label="充值金额"
        align="center"
        min-width="80"
        fit="true">
      </el-table-column>
      <el-table-column
        prop="PayMethod"
        label="支付方式"
        align="center"
        min-width="90"
        fit="true"
        show-overflow-tooltip
        :filters="optionsT"
        :filter-method="filterType">
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
        <dd class="item1">会员卡号:</dd>
        <dd class="item2">{{No}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">卡类型:</dd>
        <dd class="item2">{{Type}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">充值时间:</dd>
        <dd class="item2">{{PayDt}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">操作员工:</dd>
        <dd class="item2">{{Worker}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">充值金额:</dd>
        <dd class="item2">{{RechargeMoney}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">赠送金额:</dd>
        <dd class="item2">{{giveMoney}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">支付方式:</dd>
        <dd class="item2">{{PayMethod}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺:</dd>
        <dd class="item2">{{Shop}}</dd>
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
      tableData: [],
      listData: [], //图表数据
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      // 表格筛选
      optionsT: [],
      // 详情
      No: "", // 会员卡号
      PayDt: "", // 充值时间
      PayMethod: "", // 支付方式
      RechargeMoney: 0, // 充值金额
      Shop: "", // 店铺
      Type: "", // 卡类型
      Worker: "", // 操作员工
      giveMoney: 0, // 赠送金额
      // 图表
      AliPayMoney: 0, // 支付宝
      CashMoney: 0, // 现金
      IntegralMoney: 0, // 积分
      RechargeValue: 0, // 充值总额
      WeChatPayMoney: 0, // 微信
      GiveMoney: 0, // 赠送总额
      iCount: 0, // 充值总数
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
    getRowData(row){
      this.No = row.No; // 会员卡号
      this.PayDt = row.PayDt; // 充值时间
      this.PayMethod = row.PayMethod; // 支付方式
      this.RechargeMoney = row.RechargeMoney; // 充值金额
      this.Shop = row.Shop; // 店铺
      this.Type = row.Type; // 卡类型
      this.Worker = row.Worker; // 操作员工
      this.giveMoney = row.giveMoney; // 赠送金额
      this.dialogFormVisible1 = true;
    },
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
      let data_T = [];
      this.listData = [];
      let searchDataRCS = axios.searchDataRCS(Client,startTime,endTime,WorkerNo,ShopNo);
      searchDataRCS.then((res) => {
        if(res.data.State == '成功'){
          data_T = res.data.Body.CardInfo;
          for(var i=0;i<data_T.length;i++){
            if(!(!!data_T[i].RechargeMoney)){
              data_T[i].RechargeMoney = 0;
            };
            if(!(!!data_T[i].giveMoney)){
              data_T[i].giveMoney = 0;
            };
            data_T[i].RechargeMoney = data_T[i].RechargeMoney.toFixed(2);
            data_T[i].giveMoney = data_T[i].giveMoney.toFixed(2);
          }
          this.tableData = data_T;
          this.listData = res.data.Body.CardIncome;
          this.list();
          this.tableOptions();
          this.commData();
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    list() {
      if(this.listData != []) {
        this.AliPayMoney = this.listData.AliPayMoney; // 支付宝
        this.CashMoney = this.listData.CashMoney; // 现金
        this.IntegralMoney = this.listData.IntegralMoney; // 积分
        this.RechargeValue = this.listData.RechargeValue; // 充值总额
        this.WeChatPayMoney = this.listData.WeChatPayMoney; // 微信
        this.GiveMoney = this.listData.giveMoney; // 赠送总额
        this.iCount = this.listData.iCount; // 充值总数
      }
    },
    commData() {
      this.$Common.sTime = this.value1;
      this.$Common.eTime = this.value2;
      this.$Common.Shop = this.shop;
      this.$Common.Worker = this.worker;
    },
    // 表格筛选
    tableOptions(){
      let optionsAll = this.tableData;
      let optionsT = [];
      this.optionsT = [];
      for(let i=0;i<optionsAll.length;i++){
        if(optionsT.indexOf(optionsAll[i].PayMethod)==-1){
          optionsT.push(optionsAll[i].PayMethod);
        }
      }
      for(let j=0;j<optionsT.length;j++){
        this.optionsT.push({value:optionsT[j],text:optionsT[j]})
      }
    },
    filterType(value, row) {
      return row.PayMethod === value;
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
#RechargeStatistics{
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
.list_border{
  margin-top: 5px;
}
.Text{
  margin-top: 0px;
  margin-bottom: 0px;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.Text_N{
  margin-top: 0px;
  margin-bottom: 0px;
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
