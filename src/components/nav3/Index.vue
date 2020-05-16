<template>
  <div id="Index">
    <!-- 时间搜索 -->
    <el-row class="border">
      <el-col :span="18" class="time">
        <span v-show="tip2">{{time.view1}} - {{time.view2}}</span>
        <span v-show="tip1" style="color: red;">注意：最多显示1000条记录</span>
      </el-col>
      <el-col :span="6">
        <div style="width: 100%;">
          <el-button type="text" style="width: 100%; padding: 5px;" @click="dialogFormVisible2 = true">查 询</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 显示表格 -->
    <el-table
      ref="filterTable"
      :data="allData"
      style="width: 100%"
      height="calc(100vh - 96px)" 
      >  <!-- 220px-25px -->
      <el-table-column
        prop="Shop"
        label="所属店铺"
        align="center"
        min-width="95"
        fit="true"
        column-key="Shop"
        :filters="optionsS"
        :filter-method="filterShop"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="UserTel"
        label="手机号"
        align="center"
        min-width="110"
        fit="true">
      </el-table-column>
      <el-table-column
        prop="sState"
        label="状态"
        align="center"
        min-width="65"
        fit="true"
        column-key="sState"
        :filters="optionsT"
        :filter-method="filterType"  
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="UserName"
        label="操作"
        align="center"
        min-width="50"
        fit="true">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="getData(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogFormVisible" fullscreen>
      <dl class="text">
        <dd class="item1">预约单号:</dd>
        <dd class="item2">{{No}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">所属店铺:</dd>
        <dd class="item2">{{Shop}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">下单时间:</dd>
        <dd class="item2">{{CreateDt}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">联系人:</dd>
        <dd class="item2">{{UserName}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">手机号:</dd>
        <dd class="item2">{{UserTel}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">收货地址:</dd>
        <dd class="item2">{{Addr}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">件数:</dd>
        <dd class="item2">{{iCount}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">状态:</dd>
        <dd class="item2">{{sState}}</dd>
      </dl>
    </el-dialog>
    <!-- 搜索 -->
    <el-dialog title="搜索" :visible.sync="dialogFormVisible2" fullscreen>
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 90%">
        </el-date-picker>
        <div v-show="tip3" style="width: 90%; margin: auto; text-align: left;">
          <span style="color: red; font-size: 14px;">开始时间不能为空</span>
        </div>
      </div>
      <div class="block">
        <el-date-picker
          v-model="value2"
          type="datetime"
          placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 90%">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="search()" v-model="time">查 询</el-button>
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
      optionsS: [],
      optionsT: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      Addr: '',
      CreateDt: '',
      No: '',
      Shop: '',
      UserName: '',
      UserTel: '',
      iCount: '',
      sState: '',
      // 时间
      time: {
        view1:'',
        view2:''
      },
      value1: '',
      value2: '',
      tip1: false,
      tip2: true,
      tip3: false
    };
  },
  created() {
    this.getAllData();
    this.getAllShop();
    this.getAllType();
  },
  watch: {
    time:{
      handler(n, o) {
        if(!!n.view1 && !!n.view2){
          this.tip1 = false;
          this.tip2 = true;
        }else {
          this.tip1 = true;
          this.tip2 = false;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getAllData() {
      let Client = localStorage.getItem("ClientAddr");
      let getAllData = axios.getAllData(Client);
      getAllData.then((res) => {
        if(res.data.State == '成功'){
          this.allData = res.data.Body;
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    getAllShop() {
      let allShop = [];
      let Client = localStorage.getItem("ClientAddr");
      let getShop = axios.getShop(Client);
      getShop.then((res) => {
        if(res.data.State == '成功'){
          allShop = res.data.Body;
          if(allShop.length != 0) {
            for(let i=0;i<allShop.length;i++){
              this.optionsS.push({text:allShop[i].Name,value:allShop[i].Name});
            }
          }
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    getAllType() {
      let allType = [];
      let Client = localStorage.getItem("ClientAddr");
      let getAllType = axios.getAllType(Client);
      getAllType.then((res) => {
        if(res.data.State == '成功'){
          allType = res.data.Body;
          if(allType.length != 0) {
            for(let i=0;i<allType.length;i++){
              this.optionsT.push({text:allType[i].Name,value:allType[i].Name});
            }
          }
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    getTimeData() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var seperator2 = ":";
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      hour = (hour != 0 && hour < 10) ? '0' + hour : hour = hour;
      minute = (minute < 10) ? '0' + minute : minute = minute;
      second = (second < 10) ? '0' + second : second = second;
      let Time1 = year + seperator1 + month + seperator1 + strDate;
      let Time2 = hour + seperator2 + minute + seperator2 + second;
      this.value2 = Time1 + " " + Time2;
    },
    search() {
      let dateStart = this.value1;
      let dateEnd = this.value2;
      let Client = localStorage.getItem("ClientAddr");
      if(dateStart == null){
        dateStart = "";
      }
      if(dateEnd == null){
        dateEnd = "";
      }
      let getSearchData = axios.getSearchData(Client, dateStart, dateEnd);
      if(!!this.value1 && !!this.value2){
        let hour1 = this.value1.split(" ")[1].split(":")[0];
        let hour2 = this.value2.split(" ")[1].split(":")[0];
        if(hour1 == "00") {
          hour1 = "0";
        };
        if(hour2 == "00") {
          hour2 = "0";
        }
        this.time.view1 = this.value1.split(" ")[0] + " " + hour1 + "时";
        this.time.view2 = this.value2.split(" ")[0] + " " + hour2 + "时";
        getSearchData.then((res) => {
          if(res.data.State == '成功'){
            this.allData = res.data.Body;
          }else{
          this.$message.error(res.data.Reason);
        }
        })
        this.dialogFormVisible2 = false;
      }else if(!!this.value1 && !(!!this.value2)) {
        this.getTimeData();
        let hour1 = this.value1.split(" ")[1].split(":")[0];
        let hour2 = this.value2.split(" ")[1].split(":")[0]
        if(hour1 == "00") {
          hour1 = "0";
        };
        if(hour2 == "00") {
          hour2 = "0";
        }
        this.time.view1 = this.value1.split(" ")[0] + " " + hour1 + "时";
        this.time.view2 = this.value2.split(" ")[0] + " " + hour2 + "时";
        getSearchData.then((res) => {
          if(res.data.State == '成功'){
            this.allData = res.data.Body;
          }else{
          this.$message.error(res.data.Reason);
        }
        })
        this.dialogFormVisible2 = false;
      }else if(!(!!this.value1) && !!this.value2) {
        this.tip3 = true;
      }else {
        this.time.view1 = "";
        this.time.view2 = "";
        getSearchData.then((res) => {
          if(res.data.State == '成功'){
            this.allData = res.data.Body;
          }else{
            this.$message.error(res.data.Reason);
        }
        })
        this.dialogFormVisible2 = false;
      }
    },
    // 查询
    filterShop(value, row) {
      return row.Shop === value;
    },
    filterType(value, row) {
      return row.sState === value;
    },
    // 表格
    getData(row){
      this.Addr = row.Addr;
      this.CreateDt = row.CreateDt;
      this.No = row.No;
      this.Shop = row.Shop;
      this.UserName = row.UserName;
      this.UserTel = row.UserTel;
      this.iCount = row.iCount;
      this.sState = row.sState;
      this.dialogFormVisible = true;
    }
  },
  filters:{
    shopNofilter:function(value){
      
    }
  }
}
</script>

<style scoped>
#Index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  overflow: hidden;
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
.border{
  border-bottom: 1px solid #E0E0E0;
}
.time{
  font-size: 14px;
  color: #727377;
  line-height: 26px;
}
</style>
