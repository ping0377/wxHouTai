<template>
  <div id="VipStatistics">
    <el-row class="border">
      <el-col :span="18" class="time">
        <span v-show="tip2">{{time.view1}} - {{time.view2}}</span>
        <span v-show="tip1" style="color: red;">所有会员卡</span>
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
              <dd class="Item1">{{typeZ}}张</dd>
              <dd class="Item2">正常张数</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{typeG}}张</dd>
              <dd class="Item2">挂失张数</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{typeS}}张</dd>
              <dd class="Item2">失效张数</dd>
            </dl>
          </div>
        </el-col>
      </el-row>
      <!-- 2 -->
      <el-row :gutter="10" style="padding: 5px;">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{moneyC.toFixed(2)}}元</dd>
              <dd class="Item2">充值总额</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{moneyZ}}元</dd>
              <dd class="Item2">赠送总额</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{moneyX.toFixed(2)}}元</dd>
              <dd class="Item2">消费总额</dd>
            </dl>
          </div>
        </el-col>
      </el-row>
      <!-- 3 -->
      <el-row :gutter="10" style="padding: 5px;">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{Count}}张</dd>
              <dd class="Item2">总张数</dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <dl class="Text">
              <dd class="Item1">{{Sum.toFixed(2)}}元</dd>
              <dd class="Item2">总余额</dd>
            </dl>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 列表 -->
    <el-table ref="filterTable" :data="allData" style="width: 100%" height="calc(100vh - 283px)">
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <el-table-column fixed align="center" prop="Name" label="用户姓名" width="100" fit></el-table-column>
        </el-col>
        <el-col :xs="10" :sm="6" :md="4" :lg="3" :xl="1">
          <el-table-column align="center" prop="CardNo" label="卡号" width="100" fit></el-table-column>
        </el-col>
        <el-table-column prop="issueDate" label="注册时间" align="center" width="160" fit></el-table-column>
        <el-table-column label="用户电话" align="center" width="100" fit="true" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="Tel_size">{{scope.row.Tel}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="ConsumptionValue" label="消费金额" align="center" width="130"></el-table-column>
        <el-table-column prop="Balance" label="余额" align="center" width="130" fit></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="130" fit>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="getRowData(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-row>
    </el-table>
    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="dialogFormVisible1" fullscreen>
      <dl class="text">
        <dd class="item1">卡号:</dd>
        <dd class="item2">{{CardNo}}</dd>
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
        <dd class="item1">充值金额:</dd>
        <dd class="item2">{{RechargeValue}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">赠送金额:</dd>
        <dd class="item2">{{GiveValue}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">消费金额:</dd>
        <dd class="item2">{{ConsumptionValue}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">余额:</dd>
        <dd class="item2">{{Balance}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">发行日期:</dd>
        <dd class="item2">{{issueDate}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">卡状态:</dd>
        <dd class="item2">{{stateName}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">卡类型:</dd>
        <dd class="item2">{{typeName}}</dd>
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
          class="left"
        ></el-date-picker>
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
          class="left"
        ></el-date-picker>
      </div>
      <div class="block">
        <p class="block-text">姓名:</p>
        <el-input v-model="input1" placeholder="请输入内容" style="width: 90%" class="left"></el-input>
      </div>
      <div class="block">
        <p class="block-text">电话:</p>
        <el-input v-model="input2" placeholder="请输入内容" style="width: 90%" class="left"></el-input>
      </div>
      <div class="block">
        <p class="block-text">卡状态:</p>
        <el-select class="left" v-model="val1" placeholder="请选择卡状态" style="width: 90%">
          <el-option :label="select1_l" :value="select1_v"></el-option>
          <el-option
            v-for="item in optionsS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="block">
        <p class="block-text">卡类型:</p>
        <el-select class="left" v-model="val2" placeholder="请选择卡类型" style="width: 90%">
          <el-option :label="select2_l" :value="select2_v"></el-option>
          <el-option
            v-for="item in optionsT"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="block">
        <p class="block-text">店铺</p>
        <el-select
          class="left"
          v-model="val3"
          placeholder="请选择店铺"
          style="width: 90%"
          @change="change()"
        >
          <el-option :label="select2_l" :value="select2_v">全部</el-option>
          <el-option
            v-for="item in optionsD"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
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
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    return {
      allData: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      // 详情
      CardNo: "", //卡号
      Name: "", //用户姓名
      Tel: "", //用户电话
      RechargeValue: 0, //充值金额
      GiveValue: 0, //赠送金额
      ConsumptionValue: 0, //消费金额
      Balance: 0, //余额
      issueDate: "", //发行日期
      stateName: "", //卡状态
      typeName: "", //卡类型
      // 图表
      Count: 0, // 总张数
      typeZ: 0, // 正常张数
      typeG: 0, // 挂失张数
      typeS: 0, // 失效张数
      Sum: 0, // 总余额
      moneyC: 0, //充值金额
      moneyZ: 0, //赠送金额
      moneyX: 0, //消费金额
      // 查询
      input1: "", // 姓名
      input2: "", // 电话
      val1: "", // 卡状态
      val2: "", // 卡类型
      val3: "", // 店铺 选中的店铺  相当于店铺的编号
      value1: "", // 起始时间
      value2: "", // 结束时间
      name: "", //用户姓名
      tel: "", //用户电话
      select1_l: "全部",
      select1_v: "",
      select2_l: "全部",
      select2_v: "", //
      optionsS: [],
      optionsT: [],
      optionsD: [], //店铺列表
      StateName: "", //卡状态
      TypeName: "", //卡类型
      // 时间
      time: {
        view1: "",
        view2: ""
      },
      tip1: false,
      tip2: true
    };
  },
  created() {
    this.getTime();
    this.search(this.name, this.tel);
    this.getOptions(); //组件创建之后  请求店铺列表
  },
  watch: {
    time: {
      handler(n, o) {
        if (!!n.view1 && !!n.view2) {
          this.tip1 = false;
          this.tip2 = true;
        } else {
          this.tip1 = true;
          this.tip2 = false;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    change() {
      console.log(this.val3);
    },
    // 获得店铺列表
    getOptions() {
      let allShop = [];
      let Client = localStorage.getItem("ClientAddr");
      let getShop = axios.getShop(Client);
      getShop.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          allShop = res.data.Body;
          if (allShop.length != 0) {
            for (let i = 0; i < allShop.length; i++) {
              this.optionsD.push({
                label: allShop[i].Name,
                value: allShop[i].ShopNo
              });
            }
          }
          // this.viewSearch();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
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
      this.time.view1 = year + seperator1 + month + seperator1 + strDate;
      this.time.view2 = year + seperator1 + month + seperator1 + strDate;
      this.getTimeData();
    },
    getTimeData() {
      var date = new Date();
      let getData = this.$Common;
      var seperator2 = ":";
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      hour = hour != 0 && hour < 10 ? "0" + hour : (hour = hour);
      minute = minute < 10 ? "0" + minute : (minute = minute);
      second = second < 10 ? "0" + second : (second = second);
      if (getData.sTime) {
        let hour1 = getData.sTime.split(" ")[1].split(":")[0];
        if (hour1 == "00") {
          hour1 = "0";
        }
        this.value1 = getData.sTime;
        this.time.view1 = getData.sTime.split(" ")[0] + " " + hour1 + "时";
      } else {
        this.value1 = "";
        this.time.view1 = "";
      }
      if (getData.eTime) {
        let hour2 = getData.eTime.split(" ")[1].split(":")[0];
        if (hour2 == "00") {
          hour2 = "0";
        }
        this.value2 = getData.eTime;
        this.time.view2 = getData.eTime.split(" ")[0] + " " + hour2 + "时";
      } else {
        this.value2 = "";
        this.time.view2 = "";
      }
    },
    // 数据处理之后开始查询  给后端发送请求
    search(name, tel, sTime, eTime) {
      let Client = localStorage.getItem("ClientAddr");
      let startTime = sTime;
      let endTime = eTime;
      let Name = name;
      let Tel = tel;
      let shop = this.val3;
      let data = [];
      let searchDataVS = axios.searchDataVS(
        Client,
        startTime,
        endTime,
        Name,
        Tel,
        shop
      );
      searchDataVS.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          data = res.data.Body;
          for (var i = 0; i < data.length; i++) {
            if (!!!data[i].ConsumptionValue) {
              data[i].ConsumptionValue = 0;
            }
            if (!!!data[i].GiveValue) {
              data[i].GiveValue = 0;
            }
            if (!!!data[i].RechargeValue) {
              data[i].RechargeValue = 0;
            }
            if (!!!data[i].Balance) {
              data[i].Balance = 0;
            }
            data[i].ConsumptionValue = data[i].ConsumptionValue.toFixed(2);
            data[i].GiveValue = data[i].GiveValue.toFixed(2);
            data[i].RechargeValue = data[i].RechargeValue.toFixed(2);
            data[i].Balance = data[i].Balance.toFixed(2);
          }
          this.typeSearch(data);
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    list() {
      let data = this.allData;
      let count = data.length; // 总张数
      let count_Z = 0; // 正常张数
      let count_G = 0; // 挂失张数
      let count_S = 0; // 失效张数
      let sum = 0; // 总余额
      let money_C = 0; // 充值总额
      let money_Z = 0; // 赠送总额
      let money_X = 0; // 消费总额
      for (let i = 0; i < count; i++) {
        if (data[i].stateName == "正常") {
          count_Z++;
        }
        if (data[i].stateName == "挂失") {
          count_G++;
        }
        if (data[i].stateName == "失效") {
          count_S++;
        }
        sum += parseFloat(data[i].Balance);
        money_C += parseFloat(data[i].RechargeValue);
        money_Z += parseFloat(data[i].GiveValue);
        money_X += parseFloat(data[i].ConsumptionValue);
      }
      this.Count = count;
      this.typeZ = count_Z;
      this.typeG = count_G;
      this.typeS = count_S;
      this.Sum = sum;
      this.moneyC = money_C;
      this.moneyZ = money_Z;
      this.moneyX = money_X;
    },
    commData() {
      this.$Common.sTime = this.value1;
      this.$Common.eTime = this.value2;
    },
    getRowData(row) {
      this.CardNo = row.CardNo; // 卡号
      this.Name = row.Name; // 用户姓名
      this.Tel = row.Tel; // 用户电话
      this.RechargeValue = row.RechargeValue; // 充值金额
      this.GiveValue = row.GiveValue; //赠送金额
      this.ConsumptionValue = row.ConsumptionValue; // 消费金额
      this.Balance = row.Balance; // 余额
      this.issueDate = row.issueDate; //发行日期
      this.stateName = row.stateName; //卡状态
      this.typeName = row.typeName; //卡类型
      this.dialogFormVisible1 = true;
    },
    stateOptions() {
      let state = [];
      this.optionsS = [];
      for (let i = 0; i < this.allData.length; i++) {
        if (state.indexOf(this.allData[i].stateName) == -1) {
          state.push(this.allData[i].stateName);
        }
      }
      for (let j = 0; j < state.length; j++) {
        this.optionsS.push({ value: state[j], label: state[j] });
      }
    },
    typeOptions() {
      let TYPE = [];
      this.optionsT = [];
      for (let i = 0; i < this.allData.length; i++) {
        if (TYPE.indexOf(this.allData[i].typeName) == -1) {
          TYPE.push(this.allData[i].typeName);
        }
      }
      for (let j = 0; j < TYPE.length; j++) {
        this.optionsT.push({ value: TYPE[j], label: TYPE[j] });
      }
    },
    getSearch() {
      this.stateOptions();
      this.typeOptions();
      this.val2 = this.TypeName;
      this.val1 = this.StateName;
      this.dialogFormVisible2 = true;
    },
    //
    typeSearch(data) {
      let stName = this.val1;
      this.StateName = this.val1;
      let type = this.val2;
      this.TypeName = this.val2;
      let allData = data;
      let newData = [];
      for (let i = 0; i < allData.length; i++) {
        if (stName != "") {
          if (allData[i].stateName == stName) {
            if (type != "") {
              if (allData[i].typeName == type) {
                newData.push(allData[i]);
              }
            } else {
              newData.push(allData[i]);
            }
          }
        } else if (type != "") {
          if (allData[i].typeName == type) {
            newData.push(allData[i]);
          }
        } else {
          newData.push(allData[i]);
        }
      }
      this.allData = newData;
      this.list();
      this.commData();
    },
    //  点击查询，开始查询数据
    searchData() {
      let startT = "";
      let endT = "";
      if (!!this.value1 && !!this.value2) {
        let hour1 = this.value1.split(" ")[1].split(":")[0];
        let hour2 = this.value2.split(" ")[1].split(":")[0];
        if (hour1 == "00") {
          hour1 = "0";
        }
        if (hour2 == "00") {
          hour2 = "0";
        }
        this.time.view1 = this.value1.split(" ")[0] + " " + hour1 + "时";
        this.time.view2 = this.value2.split(" ")[0] + " " + hour2 + "时";
        startT = this.value1;
        endT = this.value2;
      }
      if (!!startT) {
        this.search(this.input1, this.input2, startT, endT);
      } else {
        this.search(this.input1, this.input2);
      }
      this.dialogFormVisible2 = false;
    }
  }
};
</script>

<style scoped>
#VipStatistics {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
dd {
  margin: 0px;
}
.border {
  border-bottom: 1px solid #e0e0e0;
}
.border1 {
  max-width: calc(100% - 10px);
  margin: auto;
}
.Tel_size {
  font-size: 10px;
}
.text {
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.list_border {
  margin-top: 5px;
}
.Text {
  margin-top: 0px;
  margin-bottom: 0px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.Item1 {
  font-size: 15px;
  color: #727377;
}
.Item2 {
  font-size: 12px;
  color: #909399;
  font-weight: bold;
}
.time {
  font-size: 14px;
  color: #727377;
  line-height: 26px;
}
.item1 {
  text-align: left;
  float: left;
  margin-bottom: 5px;
  margin-right: 5px;
}
.item2 {
  text-align: left;
  float: left;
  line-height: 19px;
}
.block {
  margin-bottom: 10px;
  overflow: hidden;
}
.block-text {
  text-align: left;
  font-size: 14px;
  margin: 0px;
  margin-bottom: 5px;
}
.left {
  float: left;
}
</style>
