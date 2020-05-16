<template>
  <div class="fxmsg">
    <!-- 头部名称和电话 -->
    <div class="header">
      <el-row>
        <el-col :span="6" align="left">{{fxname}}</el-col>
        <el-col :span="8" :offset="10" align="right">{{fxtel}}</el-col>
      </el-row>
    </div>
    <!-- 选择时间 展示列表信息 -->
    <div class="fx_tabs">
      <el-tabs type="border-card" @tab-click="tabclick" v-model="tabmsg">
        <el-tab-pane label="今日">
          <span slot="label">
            <i class="el-icon-date"></i>
            今日
          </span>
        </el-tab-pane>
        <el-tab-pane label="近7日">
          <span slot="label">
            <i class="el-icon-date"></i>
            近7日
          </span>
        </el-tab-pane>
        <el-tab-pane label="近1月">
          <span slot="label">
            <i class="el-icon-date"></i>
            近1月
          </span>
        </el-tab-pane>
        <el-tab-pane label="更多">
          <span slot="label" @click="more_click">更多</span>
          <el-dialog title="时间选择" :visible.sync="dialogVisible" width="99%" align="left">
            <el-date-picker
              v-model="start_time"
              type="datetime"
              placeholder="开始时间"
              @change="start_sure"
            ></el-date-picker>
            <p></p>
            <el-date-picker
              v-model="over_time"
              type="datetime"
              placeholder="结束时间"
              @change="over_sure"
            ></el-date-picker>
            <span slot="footer" class="dialog-footer">
              <el-button @click="bb">取 消</el-button>
              <el-button type="primary" @click="fx_search">查询</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 7个方块-->
    <div class="content">
      <el-row :gutter="8">
        <el-col :span="6">
          <span class="square">
            <p>{{ReserveCount}}</p>
            <p>预约订单数</p>
          </span>
        </el-col>
        <el-col :span="6">
          <span class="square">
            <p>{{WashOrderCount}}</p>
            <p>完成洗衣单数</p>
          </span>
        </el-col>
        <el-col :span="6">
          <span class="square">
            <p>{{CompleteCount}}</p>
            <p>已完成实付额</p>
          </span>
        </el-col>
        <el-col :span="6">
          <span class="square">
            <p>{{NotCompleteCount}}</p>
            <p>未完成实付额</p>
          </span>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <el-row :gutter="8">
        <el-col :span="6">
          <span class="square">
            <p>{{CompleteClothes}}</p>
            <p>完成件数</p>
          </span>
        </el-col>
        <el-col :span="6">
          <span class="square">
            <p>{{NotCompleteClothes}}</p>
            <p>未完成件数</p>
          </span>
        </el-col>
        <el-col :span="6">
          <span class="see_msg">
            <p @click="see_msg">数据说明点击查看</p>
            <el-dialog title="数据说明:" :visible.sync="showmsg" width="99%" align="left">
              <p>1、计算方式按洗护订单状态计算</p>
              <p>2、实付额不含卡折扣 额，不含优惠券，不含临时折扣。</p>
              <p>3、件数安照洗衣订单实际件数计算。</p>
            </el-dialog>
          </span>
        </el-col>
      </el-row>
    </div>
    <!-- 方块下面的列表 -->
    <div class="table_list">
      <el-table
        :data="tableData"
        style="width: 100%;white-space:nowrap"
        border
        empty-text="该时间段没有订单哦~~"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column label="订单号" prop="ReserveNo" align="center" class-name="order"></el-table-column>
        <el-table-column label="件数" prop="iCount" align="center" width="50px"></el-table-column>
        <el-table-column label="状态" props="iState" align="center" width="70px">
          <template slot-scope="props">
            <span v-show="props.row.iState==0">未处理</span>
            <span v-show="props.row.iState==1">待收件</span>
            <span v-show="props.row.iState==2">洗涤中</span>
            <span v-show="props.row.iState==3">配送中</span>
            <span v-show="props.row.iState==4">已完成</span>
            <span v-show="props.row.iState==5">已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="createDt" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="see_details(scope.row)">详情</el-button>
            <el-dialog
              title="订单详情(更多信息请到店铺查询)"
              :visible.sync="showdetails"
              width="98%"
              align="left"
            >
              <el-form :model="detailsmsg" label-width="80px">
                <el-form-item label="洗衣单号:">
                  <el-input disabled v-model="detailsmsg.pkNo"></el-input>
                </el-form-item>
                <el-form-item label="订单金额:">
                  <el-input disabled v-model="detailsmsg.TotalPrice"></el-input>
                </el-form-item>
                <el-form-item label="实付金额:">
                  <el-input disabled v-model="detailsmsg.payMoney"></el-input>
                </el-form-item>
                <el-form-item label="洗衣状态:">
                  <template>
                    <span v-show="detailsmsg.fkOrderState=='0001'">已收件</span>
                    <span v-show="detailsmsg.fkOrderState=='0002'">已完成</span>
                    <span v-show="detailsmsg.fkOrderState=='0003'">已取消</span>
                  </template>
                </el-form-item>
                <el-form-item label="实际件数:">
                  <el-input disabled v-model="detailsmsg.iCount"></el-input>
                </el-form-item>
              </el-form>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    return {
      fxname: "", // 分销商编号
      fxtel: "", //分销商电话
      ReserveCount: "", //预约单总数
      WashOrderCount: "", //完成洗衣单数
      CompleteClothes: "", //完成件数
      NotCompleteClothes: "", //未完成件数
      CompleteCount: "", //已完成实付额
      NotCompleteCount: "", //未完成实付额
      detailsmsg: {}, // 列表项的订单详情
      showdetails: false, // 订单详情显示
      loading: false, //显示加载中
      tabmsg: "", //tabs选中的值
      dialogVisible: false, // 是否显示显示时间的dialog
      start_time: "", //更多时间选择中选择的开始时间
      over_time: "", //更多时间选择中选择的结束时间
      showmsg: false, //显示数据说明
      tableData: [] //列表 数据
    };
  },
  mounted() {
    // 今日：
    this.get_ordermsg();
    let now = new Date(); //当前时间
    var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)); //当天凌晨
    this.start_time = this.switch_time(timeStamp); //今日的开始时间
    this.over_time = this.switch_time(now); // 今日的结束时间
    let pkNo = localStorage.getItem("pkNo");
    this.fxname = localStorage.getItem("fxname");
    this.fxtel = localStorage.getItem("fxtel");
    // this.fxReserveCount=localStorage.getItem('fxReserveCount')
    // console.log(typeof this.start_time)
    let Client = localStorage.getItem("ClientAddr");
    let url = "Manager.ashx?Function=HttpQueryReserveListByPartner";
    // console.log(pkNo, "统计界面");
    let getfx_list = axios.getfx_list(
      pkNo,
      url,
      Client,
      this.start_time,
      this.over_time
    );
    getfx_list.then(res => {
      // console.log(res);
      if (res.data.State == "成功") {
        this.loading = false;
        this.tableData = res.data.Body;
      }
    });
  },
  methods: {
    bb() {
      this.dialogVisible = false;
      this.loading = false;
    },
    see_details(row) {
      // console.log(row.ReserveNo); // 编号
      // this.showdetails = true;
      let ReserveNo = row.ReserveNo;
      // console.log(ReserveNo);
      let url = `Manager.ashx?Function=HttpQueryWashOrderListByReserveNo`;
      // Manager.ashx?Function=HttpQueryWashOrderListByReserveNo
      let Client = localStorage.getItem("ClientAddr");
      let getdetails = axios.getdetails(url, Client, ReserveNo);
      getdetails.then(res => {
        // console.log(res);
        if (res.data.State == "成功") {
          this.detailsmsg = res.data.Body[0];
          this.showdetails = true;
        }else{
          this.$message('出现错误,未获得数据')
        }
      });
    },
    // 获取指定分销商的订单信息，渲染剩余5个方块
    get_ordermsg() {
      let PartnerNo = localStorage.getItem("fxid");
      let Client = localStorage.getItem("ClientAddr");
      let url = `Manager.ashx?Function=HttpQueryPartnerByPartnerNo`;
      let getmsg = axios.getordermsg(url, Client, PartnerNo);
      getmsg.then(res => {
        // console.log(res);
        if (res.data.State == "成功") {
          this.ReserveCount = res.data.Body[0].ReserveCount;
          this.WashOrderCount = res.data.Body[0].WashOrderCount;
          this.CompleteCount = res.data.Body[0].CompleteCount;
          this.NotCompleteCount = res.data.Body[0].NotCompleteCount;
          this.CompleteClothes = res.data.Body[0].CompleteClothes;
          this.NotCompleteClothes = res.data.Body[0].NotCompleteClothes;
        }
      });
    },
    switch_time(now) {
      var year = now.getFullYear();
      var month = (now.getMonth() + 1).toString();
      var day = now.getDate().toString();
      var hour = now.getHours().toString();
      var minute = now.getMinutes().toString();
      var second = now.getSeconds().toString();
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      if (hour.length == 1) {
        hour = "0" + hour;
      }
      if (minute.length == 1) {
        minute = "0" + minute;
      }
      if (second.length == 1) {
        second = "0" + second;
      }
      var dateTime =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      return dateTime;
    },
    tabclick(tab, event) {
      // tab.label 今日 近7日 近1月
      // console.log(this.tabmsg, tab.label);
      if (tab.label == "今日") {
        this.loading = true;
        let now = new Date(); //当天的当前时间
        var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)); // 当天凌晨的时间戳
        this.start_time = this.switch_time(timeStamp); //今日的开始时间
        // console.log(this.start_time);
        this.over_time = this.switch_time(now); // 今日的结束时间
        let pkNo = localStorage.getItem("pkNo"); //分销商编号
        let Client = localStorage.getItem("ClientAddr"); //登录保存的状态
        let url = "Manager.ashx?Function=HttpQueryReserveListByPartner"; //url接口
        let getfx_list = axios.getfx_list(
          pkNo,
          url,
          Client,
          this.start_time,
          this.over_time
        );
        getfx_list.then(res => {
          // console.log(res);
          if (res.data.State == "成功") {
            this.loading = false;
            this.tableData = res.data.Body;
          }
        });
      }
      if (tab.label == "近7日") {
        let nn = new Date();
        let now = this.switch_time(new Date()); //当天的当前时间
        // console.log(now);
        let now1 = new Date(new Date());
        now1.setDate(nn.getDate() - 7);
        // console.log(now1); // 7天前的时间
        this.start_time = this.switch_time(now1); // 开始
        this.over_time = now; //结束
        let pkNo = localStorage.getItem("pkNo"); //分销商编号
        let Client = localStorage.getItem("ClientAddr"); //登录保存的状态
        let url = "Manager.ashx?Function=HttpQueryReserveListByPartner"; //url接口
        let getfx_list = axios.getfx_list(
          pkNo,
          url,
          Client,
          this.start_time,
          this.over_time
        );
        getfx_list.then(res => {
          // console.log(res);
          if (res.data.State == "成功") {
            this.loading = false;
            this.tableData = res.data.Body;
          }
        });
      }
      if (tab.label == "近1月") {
        let nn = new Date();
        let now = this.switch_time(new Date()); //当天的当前时间
        // console.log(now);
        let now1 = new Date(new Date());
        now1.setDate(nn.getDate() - 30);
        // console.log(now1); // 7天前的时间
        this.start_time = this.switch_time(now1); // 开始
        this.over_time = now; //结束
        let pkNo = localStorage.getItem("pkNo"); //分销商编号
        let Client = localStorage.getItem("ClientAddr"); //登录保存的状态
        let url = "Manager.ashx?Function=HttpQueryReserveListByPartner"; //url接口
        let getfx_list = axios.getfx_list(
          pkNo,
          url,
          Client,
          this.start_time,
          this.over_time
        );
        this.loading = true;
        getfx_list.then(res => {
          console.log(res);
          if (res.data.State == "成功") {
            this.loading = false;
            this.tableData = res.data.Body;
          }
        });
      }
    },
    // 点击更多选择时间选项
    more_click() {
      this.dialogVisible = true;
    },
    start_sure() {
      //开始时间
      console.log(this.start_time);
    },
    over_sure() {
      //结束时间
      console.log(this.over_time);
    },
    fx_search() {
      //  选择更多时间区域进行数据查询
      this.dialogVisible = false;
      let pkNo = localStorage.getItem("pkNo");
      // console.log(typeof this.start_time)
      let Client = localStorage.getItem("ClientAddr");
      let url = "Manager.ashx?Function=HttpQueryReserveListByPartner";
      // console.log(pkNo, "统计界面");
      this.loading = true;
      let getfx_list = axios.getfx_list(
        pkNo,
        url,
        Client,
        this.start_time,
        this.over_time
      );
      getfx_list.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.loading = false;
          this.tableData = res.data.Body;
        }
      });
    },
    see_msg() {
      //点击查看数据说明信息
      this.showmsg = true;
    }
  }
};
</script>
<style scoped>
.el-input input {
  color: #5ebddc !important;
}
.order.cell{
  white-space: nowrap !important;
  overflow: hidden !important;
}
.header .el-row .el-col:nth-child(1) {
  padding-left: 5px;
}
.header .el-row .el-col:nth-child(2) {
  padding-right: 5px;
}
.table_list {
  margin-top: 15px;
  white-space: nowrap !important;
  overflow: hidden;
}
.table_list .el-form-item {
  margin-bottom: 10px !important;
}

.see_msg {
  color: #db6f6f;
  border: 1px solid #ccc;
  display: inline-block;
  height: 73px;
  width: 100%;
  font-weight: normal;
  cursor: pointer;
  font-size: 17px;
}
.see_msg .el-dialog {
  color: #fbe1e1;
  background-color: #fbe1e1;
}
.square {
  display: inline-block;
  height: 73px;
  width: 100%;
  border: 1px solid #ccc;
}
.square p:nth-child(2) {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
}
.square p:nth-child(1) {
  font-weight: bold;
}
.content {
  margin-top: 8px;
}
.fxmsg {
  width: 96%;
  margin: 0 auto;
  /* border:1px solid red; */
}
.header {
  background-color: #d4f2ff;
  height: 40px;
  line-height: 40px;
  margin-top: 4px;
}
.fx_tabs {
  margin-top: 5px;
}
.fx_tabs span {
  color: #34b5ec;
}
.el-tabs {
  height: 39px;
}
</style>