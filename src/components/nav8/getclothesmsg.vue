<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="10">开始时间</el-col>
      <el-col :span="10">结束时间</el-col>
      <el-col :span="1">
        <el-button type="primary" size="mini" @click="search">查询</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-date-picker v-model="startDt" type="datetime" placeholder="开始时间到秒" @change="startDt"></el-date-picker>
      </el-col>
      <el-col :span="12">
        <el-date-picker v-model="endDt" type="datetime" placeholder="结束时间到秒" @change="endDt"></el-date-picker>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="7" :offset="1">
        <span class="square">
          <p>{{paymoney}}</p>
          <p>支付总额</p>
        </span>
      </el-col>
      <el-col :span="7">
        <span class="square">
          <p>{{ordertotal}}</p>
          <p>订单总数</p>
        </span>
      </el-col>
      <el-col :span="7">
        <span class="square">
          <p>{{clothes}}</p>
          <p>衣物总件数</p>
        </span>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="收衣点名称" width="180"></el-table-column>
      <el-table-column prop="deviceID" label="收衣点编号" width="180"></el-table-column>
      <el-table-column prop="payMoney" label="实际支付金额"></el-table-column>
      <el-table-column prop="orderCount" label="订单数量"></el-table-column>
      <el-table-column prop="sumCount" label="衣物总件数"></el-table-column>
      <el-table-column prop="shopName" label="所属店铺"></el-table-column>
      <el-table-column prop="shopNo" label="店铺号"></el-table-column>
      <!-- <el-table-column label="详情">
        <el-button type="primary" size="mini" @click="getdetail">详情</el-button>
      </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    return {
      tableData: [],
      startDt: "",
      endDt: "",
      paymoney: 0, //实际支付金额
      ordertotal: 0, //订单总数
      clothes: 0 //衣物总数
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      let Client = localStorage.getItem("ClientAddr");
      let url = "Manager.ashx?Function=HttpMinShopStatistics";
      let data = {
        startDt: this.startDt,
        endDt: this.endDt
      };
      let getclothesmsg = axios.getclothesmsg(url, Client, data);
      getclothesmsg.then(res => {
        // console.log(res);
        if (res.data.State == "成功") {
          this.tableData = res.data.Body;
        }
        res.data.Body.map(item => {
          this.paymoney += Number(item.payMoney);
          this.ordertotal += Number(item.orderCount);
          this.clothes += Number(item.sumCount);
        });
      });
    },
    getdetail() {
      this.$router.push({ path: "/admin/details" });
    }
  }
};
</script>
<style scoped>
.el-date-editor {
  width: 100%;
}
.el-row {
  margin-bottom: 10px;
}
.square {
  display: inline-block;
  width: 100%;
  height: 60px;
  white-space: nowrap;
  border: 1px solid #ccc;
  overflow: hidden;
}
.square :nth-child(1) {
  font-size: 14px;
}
.square :nth-child(2) {
  line-height: 13px;
  font-size: 14px;
}
.container {
  padding-top: 10px;
  width: 98%;
  margin: 0 auto;
  height: 500px;
}
</style>