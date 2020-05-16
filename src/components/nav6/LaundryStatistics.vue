<template>
  <div id="LaundryStatistics">
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
              <dd class="Item1">{{totalPrice.toFixed(2)}}元</dd>
              <dd class="Item2">订单总价</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{payMoney.toFixed(2)}}元</dd>
              <dd class="Item2">支付总额</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{CardPayMoney.toFixed(2)}}元</dd>
              <dd class="Item2">卡支付</dd>
            </dl>
          </div>
        </el-col>
      </el-row>
      <!-- 2 -->
      <el-row :gutter="10" style="padding: 5px;">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{coupon.toFixed(2)}}元</dd>
              <dd class="Item2">优惠券</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{WeChatMoney.toFixed(2)}}元</dd>
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
      </el-row>
      <!-- 3 -->
      <el-row :gutter="10" style="padding: 5px;">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{CashMoney.toFixed(2)}}元</dd>
              <dd class="Item2">现金</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{tempDiscMoney.toFixed(2)}}元</dd>
              <dd class="Item2">临时折扣</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{cardDiscMoney.toFixed(2)}}元</dd>
              <dd class="Item2">会员折扣</dd>
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
        label="支付时间"
        align="center"
        min-width="85"
        fit="true"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="time_size">{{scope.row.PayDt | data}} {{scope.row.PayDt | time}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="PayMethod"
        label="支付方式"
        align="center"
        min-width="90"
        fit="true"
        :filters="optionsT"
        :filter-method="filterType">
      </el-table-column>
      <el-table-column
        prop="payMoney"
        label="支付总额"
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
        <dd class="item1">交易单号:</dd>
        <dd class="item2">{{No}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">衣物件数:</dd>
        <dd class="item2">{{iCount}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">订单总价:</dd>
        <dd class="item2">{{TotalPrice}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">支付总额:</dd>
        <dd class="item2">{{PayMoney}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">支付时间:</dd>
        <dd class="item2">{{PayDt}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">操作员工:</dd>
        <dd class="item2">{{Worker}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">折扣金额:</dd>
        <dd class="item2">{{DiscValue}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">优惠券:</dd>
        <dd class="item2">{{Coupon}}</dd>
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
      listData: [], // 图表数据
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      // 表格筛选
      optionsT: [],
      // 详情
      No: "", // 交易单号
      iCount: 0, // 衣物件数
      TotalPrice: 0, // 订单总价
      PayMoney: 0, // 支付总额
      PayDt: "", // 支付时间
      Worker: "", // 操作员工
      DiscValue: 0, // 折扣金额
      Coupon: 0, // 优惠券
      PayMethod: "", // 支付方式
      Shop: "", // 店铺
      // 图表
      totalPrice: 0, // 订单总价
      payMoney: 0, // 支付总额
      CardPayMoney: 0, // 卡支付
      coupon: 0, // 优惠券
      WeChatMoney: 0, // 微信
      AliPayMoney: 0, // 支付宝
      CashMoney: 0, // 现金
      tempDiscMoney: 0, // 临时折扣
      cardDiscMoney: 0, // 会员折扣
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
      this.No = row.No; // 交易单号
      this.iCount = row.iCount; // 衣物件数
      this.TotalPrice = row.TotalPrice; // 订单总价
      this.PayMoney = row.payMoney; // 支付总额
      this.PayDt = row.PayDt; // 支付时间
      this.Worker = row.Worker; // 操作员工
      this.DiscValue = row.DiscValue; // 折扣金额
      this.Coupon = row.Coupon; // 优惠券
      this.PayMethod = row.PayMethod; // 支付方式
      this.Shop = row.Shop; // 店铺
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
      let data = [];
      this.listData = [];
      let searchDataLS = axios.searchDataLS(Client,startTime,endTime,WorkerNo,ShopNo);
      searchDataLS.then((res) => {
        if(res.data.State == '成功'){
          data = res.data.Body.OrderInfo
          for(var i=0;i<data.length;i++){
            if(!(!!data[i].iCount)){
              data[i].iCount = 0;
            };
            if(!(!!data[i].TotalPrice)){
              data[i].TotalPrice = 0;
            };
            if(!(!!data[i].payMoney)){
              data[i].payMoney = 0;
            };
            if(!(!!data[i].DiscValue)){
              data[i].DiscValue = 0;
            };
            if(!(!!data[i].Coupon)){
              data[i].Coupon = 0;
            };
            data[i].TotalPrice = data[i].TotalPrice.toFixed(2);
            data[i].payMoney = data[i].payMoney.toFixed(2);
            data[i].DiscValue = data[i].DiscValue.toFixed(2);
            data[i].Coupon = data[i].Coupon.toFixed(2);
          }
          this.tableData = data;
          this.listData = res.data.Body.OrderIncome;
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
        this.totalPrice = this.listData.TotalPrice; // 订单总价
        this.payMoney = this.listData.payMoney; // 支付总额
        this.CardPayMoney = this.listData.CardPayMoney; // 卡支付
        this.coupon = this.listData.Coupon; // 优惠券
        this.WeChatMoney = this.listData.WeChatMoney; // 微信
        this.AliPayMoney = this.listData.AliPayMoney; // 支付宝
        this.CashMoney = this.listData.CashMoney; // 现金
        this.tempDiscMoney = this.listData.tempDiscMoney; // 临时折扣
        this.cardDiscMoney = this.listData.cardDiscMoney; // 会员折扣
      }
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
    commData() {
      this.$Common.sTime = this.value1;
      this.$Common.eTime = this.value2;
      this.$Common.Shop = this.shop;
      this.$Common.Worker = this.worker;
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
#LaundryStatistics {
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
