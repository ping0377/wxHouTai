<template>
  <div id="coupon-sales-record">
    <el-tabs class="deliver-laundry" type="border-card">
      <el-tab-pane label="优惠券">
        <el-row class="border">
          <el-col :span="18" class="time">
            <span>{{viewTime1}} - {{viewTime2}}</span>
          </el-col>
          <el-col :span="6">
            <div style="width: 100%;">
              <el-button
                type="text"
                style="width: 100%; padding: 5px;"
                @click="dialogVisible1 = true"
              >查 询</el-button>
            </div>
          </el-col>
        </el-row>
        <div>
          <el-table height="calc(100vh - 148px)" :data="tableData1" style="width: 100%">
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="TicketName"
              label="券名称"
              min-width="80"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="tmoney"
              label="金额"
              min-width="70"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="addTime"
              label="购买时间"
              min-width="90"
            ></el-table-column>
            <el-table-column align="center" show-overflow-tooltip label="操作" min-width="65">
              <template v-slot="scope">
                <el-button @click="getRowData1(scope.row)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="洗衣券">
        <el-row class="border">
          <el-col :span="18" class="time">
            <span>{{viewTime3}} - {{viewTime4}}</span>
          </el-col>
          <el-col :span="6">
            <div style="width: 100%;">
              <el-button
                type="text"
                style="width: 100%; padding: 5px;"
                @click="dialogVisible2 = true"
              >查 询</el-button>
            </div>
          </el-col>
        </el-row>
        <div>
          <el-table height="calc(100vh - 148px)" :data="tableData2" style="width: 100%">
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="TicketName"
              label="券名称"
              min-width="80"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="tmoney"
              label="金额"
              min-width="70"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="addTime"
              label="购买时间"
              min-width="90"
            ></el-table-column>
            <el-table-column align="center" show-overflow-tooltip label="操作" min-width="65">
              <template v-slot="scope">
                <el-button @click="getRowData2(scope.row)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 查询 -->
    <el-dialog title="查询" :visible.sync="dialogVisible1" fullscreen>
      <div class="block">
        <p class="block-text">开始时间:</p>
        <el-date-picker
          v-model="timeValue1"
          type="datetime"
          placeholder="开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 90%"
          :editable="false"
          :clearable="false"
          class="left"
        ></el-date-picker>
      </div>
      <div class="block">
        <p class="block-text">结束时间:</p>
        <el-date-picker
          v-model="timeValue2"
          type="datetime"
          placeholder="开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 90%"
          :editable="false"
          :clearable="false"
          class="left"
        ></el-date-picker>
      </div>
      <div class="block">
        <p class="block-text">选择优惠券:</p>
        <el-select class="left" v-model="valN1" placeholder="请选择优惠券" style="width: 90%">
          <el-option label="全部优惠券" value></el-option>
          <el-option
            v-for="item in optionsN1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="block">
        <p class="block-text">选择员工:</p>
        <el-select class="left" v-model="valW" placeholder="请选择员工" style="width: 90%">
          <el-option label="全部员工" value></el-option>
          <el-option
            v-for="item in optionsW"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="block">
        <p class="block-text">是否使用:</p>
        <el-select class="left" v-model="isUser1" placeholder="请选择" style="width: 90%">
          <el-option label="全部状态" value></el-option>
          <el-option label="未使用" value="true"></el-option>
          <el-option label="已使用" value="false"></el-option>
        </el-select>
      </div>
      <div class="block">
        <p class="block-text">是否过期:</p>
        <el-select class="left" v-model="isTime1" placeholder="请选择" style="width: 90%">
          <el-option label="全部状态" value></el-option>
          <el-option label="未过期" value="false"></el-option>
          <el-option label="已过期" value="true"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button @click="serachData1" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="查询" :visible.sync="dialogVisible2" fullscreen>
      <div class="block">
        <p class="block-text">开始时间:</p>
        <el-date-picker
          v-model="timeValue3"
          type="datetime"
          placeholder="开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 90%"
          :editable="false"
          :clearable="false"
          class="left"
        ></el-date-picker>
      </div>
      <div class="block">
        <p class="block-text">结束时间:</p>
        <el-date-picker
          v-model="timeValue4"
          type="datetime"
          placeholder="开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 90%"
          :editable="false"
          :clearable="false"
          class="left"
        ></el-date-picker>
      </div>
      <div class="block">
        <p class="block-text">选择洗衣券:</p>
        <el-select class="left" v-model="valN2" placeholder="请选择洗衣券" style="width: 90%">
          <el-option label="全部洗衣券" value></el-option>
          <el-option
            v-for="item in optionsN2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="block">
        <p class="block-text">是否使用:</p>
        <el-select class="left" v-model="isTime2" placeholder="请选择" style="width: 90%">
          <el-option label="全部状态" value></el-option>
          <el-option label="未使用" value="true"></el-option>
          <el-option label="已使用" value="false"></el-option>
        </el-select>
      </div>
      <div class="block">
        <p class="block-text">是否过期:</p>
        <el-select class="left" v-model="isUser2" placeholder="请选择" style="width: 90%">
          <el-option label="全部状态" value></el-option>
          <el-option label="未过期" value="false"></el-option>
          <el-option label="已过期" value="true"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button @click="serachData2" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="dialogVisible3" fullscreen>
      <dl class="text">
        <dd class="item1">券编号:</dd>
        <dd class="item2">{{rowData1.ticketNo}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">用户名称:</dd>
        <dd class="item2">{{rowData1.UserName}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">用户电话:</dd>
        <dd class="item2">{{rowData1.UserTel}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">券名称:</dd>
        <dd class="item2">{{rowData1.TicketName}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">金额:</dd>
        <dd class="item2">{{rowData1.tmoney}}元</dd>
      </dl>
      <dl class="text">
        <dd class="item1">购买时间:</dd>
        <dd class="item2">{{rowData1.addTime}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">使用时间:</dd>
        <dd class="item2">{{rowData1.useTime}}</dd>
      </dl>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="dialogVisible4" fullscreen>
      <dl class="text">
        <dd class="item1">券编号:</dd>
        <dd class="item2">{{rowData2.ticketNo}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">用户名称:</dd>
        <dd class="item2">{{rowData2.UserName}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">用户电话:</dd>
        <dd class="item2">{{rowData2.UserTel}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">券名称:</dd>
        <dd class="item2">{{rowData2.TicketName}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">金额:</dd>
        <dd class="item2">{{rowData2.tmoney}}元</dd>
      </dl>
      <dl class="text">
        <dd class="item1">购买时间:</dd>
        <dd class="item2">{{rowData2.addTime}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">使用时间:</dd>
        <dd class="item2">{{rowData2.useTime}}</dd>
      </dl>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      // 1
      timeValue1: "",
      timeValue2: "",
      viewTime1: "",
      viewTime2: "",
      tableData1: [],
      dialogVisible1: false,
      // search 1
      valN1: "",
      optionsN1: [],
      valW: "",
      optionsW: [],
      isTime1: "",
      isUser1: "",
      // info 1
      dialogVisible3: false,
      rowData1: {},
      // 2
      timeValue3: "",
      timeValue4: "",
      viewTime3: "",
      viewTime4: "",
      tableData2: [],
      dialogVisible2: false,
      // search 2
      valN2: "",
      optionsN2: [],
      isTime2: "",
      isUser2: "",
      // info 2
      dialogVisible4: false,
      rowData2: {}
    };
  },
  created() {
    this.getTime();
    this.getTimeView();
    this.getCouponName();
    this.getWorker();
    this.getLaundryName();
    this.getData1();
    this.getData2();
  },
  methods: {
    // 初始化
    getTime() {
      this.$store.commit("coupon/getTime1");
      this.$store.commit("coupon/getTime2");
    },
    getTimeView() {
      let time = this.$store.state.coupon;
      // 1
      this.timeValue1 = time.timeValue1;
      this.timeValue2 = time.timeValue2;
      this.viewTime1 = time.viewTime1;
      this.viewTime2 = time.viewTime2;
      // 2
      this.timeValue3 = time.timeValue3;
      this.timeValue4 = time.timeValue4;
      this.viewTime3 = time.viewTime3;
      this.viewTime4 = time.viewTime4;
    },
    getCouponName() {
      let port = "Shop.ashx?Function=HttpQueryCoupon";
      let upData = axios.upData(port);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push({ value: data[i].pkNo, label: data[i].name });
          }
          this.optionsN1 = arr;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    getLaundryName() {
      let port = "Shop.ashx?Function=HttpQueryLaundryCoupon";
      let obj = {
        type: "后台"
      };
      let upData = axios.upData(port, obj);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push({ value: data[i].pkNo, label: data[i].name });
          }
          this.optionsN2 = arr;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    getWorker() {
      let Client = localStorage.getItem("ClientAddr");
      let getWorker = axios.getWorker(Client);
      getWorker.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push({ value: data[i].No, label: data[i].Name });
          }
          this.optionsW = arr;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 1
    getData1() {
      let port = "Shop.ashx?Function=HttpQueryCouponRecord";
      let obj = {
        type: "金额",
        StartDt: this.timeValue1,
        EndDt: this.timeValue2,
        WorkerNo: this.valW,
        TicketNo: this.valN1,
        IsUseful: this.isUser1,
        IsTimeOut: this.isTime1
      };
      let upData = axios.upData(port, obj);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          for (let i = 0; i < data.length; i++) {
            if (!data[i].useTime) {
              data[i].useTime = "无";
            }
          }
          this.tableData1 = data;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    serachData1() {
      let time = this.$store.state.coupon;
      this.$store.dispatch("coupon/changeTime1", this.timeValue1);
      this.$store.dispatch("coupon/changeTime2", this.timeValue2);
      this.getData1();
      this.timeValue1 = time.timeValue1;
      this.timeValue2 = time.timeValue2;
      this.viewTime1 = time.viewTime1;
      this.viewTime2 = time.viewTime2;
      this.dialogVisible1 = false;
    },
    getRowData1(data) {
      this.rowData1 = data;
      this.dialogVisible3 = true;
    },
    // 2
    getData2() {
      let port = "Shop.ashx?Function=HttpQueryLaundryCouponRecord";
      let obj = {
        type: "件数",
        StartDt: this.timeValue3,
        EndDt: this.timeValue4,
        TicketNo: this.valN2,
        IsUseful: this.isUser2,
        IsTimeOut: this.isTime2
      };
      let upData = axios.upData(port, obj);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          for (let i = 0; i < data.length; i++) {
            if (!data[i].useTime) {
              data[i].useTime = "无";
            }
          }
          this.tableData2 = data;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    serachData2() {
      let time = this.$store.state.coupon;
      this.$store.dispatch("coupon/changeTime3", this.timeValue3);
      this.$store.dispatch("coupon/changeTime4", this.timeValue4);
      this.getData2();
      this.timeValue3 = time.timeValue3;
      this.timeValue4 = time.timeValue4;
      this.viewTime3 = time.viewTime3;
      this.viewTime4 = time.viewTime4;
      this.dialogVisible2 = false;
    },
    getRowData2(data) {
      this.rowData2 = data;
      this.dialogVisible4 = true;
    }
  }
};
</script>

<style scoped>
dd {
  margin: 0px;
}
#coupon-sales-record {
  padding: 5px;
}
.border {
  border-bottom: 1px solid #e0e0e0;
}
.time {
  font-size: 14px;
  color: #727377;
  line-height: 26px;
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
.text {
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
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
</style>