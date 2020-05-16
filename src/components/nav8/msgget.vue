<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="4">
        <div>
          <el-input placeholder="请输入编号查询" v-model="pkNo" @input="inputpkNo"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入采集人姓名" v-model="workerName" @input="inputworkerName"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入店铺名称" v-model="shopName" @input="inputshopName"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select v-model="state" placeholder="请选择" @change="search">
          <el-option value="待审核"></el-option>
          <el-option value="已通过"></el-option>
          <el-option value="已拒绝"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-date-picker
          v-model="startDt"
          type="datetime"
          placeholder="选择开始时间"
          @change="inputstartDt"
        ></el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-date-picker v-model="endDt" type="datetime" placeholder="选择结束时间" @change="inputendDt"></el-date-picker>
      </el-col>
    </el-row>
    <!-- 头部的收衣点数据表格 -->
    <div class="msgtable">
      <el-table :data="tableData" style="width: 100%" align="center">
        <el-table-column prop="pkNo" label="编号"></el-table-column>
        <el-table-column prop="workerName" label="员工姓名"></el-table-column>
        <el-table-column prop="workerTel" label="员工电话"></el-table-column>
        <el-table-column prop="IDNo" label="身份证号"></el-table-column>
        <el-table-column prop="shopName" label="店铺名称"></el-table-column>
        <el-table-column prop="shopTel" label="负责人电话"></el-table-column>
        <el-table-column prop="BLno" label="营业执照编号"></el-table-column>
        <el-table-column prop="province" label="省"></el-table-column>
        <el-table-column prop="city" label="市"></el-table-column>
        <el-table-column prop="district" label="县"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <span v-show="scope.row.state==1">已通过</span>
            <span v-show="scope.row.state==0">待审核</span>
            <span v-show="scope.row.state==2">已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="BLimg" label="营业执照" class="blimg">
          <template slot-scope="prop">
            <span class="img">
              <img :src="prop.row.BLimg" alt />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <button @click="deletemsg(scope.row)"  type="danger" size="small">删除</button> -->
            <el-button @click="deletemsg(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="审核" width="150px">
          <template slot-scope="scope">
            <el-button @click="agree(scope.row)" type="primary" size="mini">通过</el-button>
            <el-button @click="refuse(scope.row)" type="warning" size="mini">拒绝</el-button>
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
      tableData: [], //表格数据
      // 查询
      pkNo: "", //采集数据编号
      workerName: "", //采集人姓名
      shopName: "", //店铺名称
      state: "", // 状态
      State: "",
      startDt: "", //开始时间
      endDt: "", //结束时间
      type: ""
    };
  },
  mounted() {
    this.gettablemsg();
  },
  methods: {
    gettablemsg() {
      let Client = localStorage.getItem("ClientAddr");
      let url = "Manager.ashx?Function=HttpQueryMinShopGather";
      let data = {
        pkNo: this.pkNo,
        workerName: this.workerName,
        shopName: this.shopName,
        state: this.State,
        startDt: this.startDt,
        endDt: this.endDt
      };
      let getacceptclothemsg = axios.getacceptclothemsg(url, Client, data);
      getacceptclothemsg.then(res => {
        console.log(res)
        if (res.data.State == "成功") {
          this.tableData = res.data.Body;
        }
      });
    },
    agree(row) {
      // 审核通过采衣点
      // console.log(row.pkNo);
      let Client = localStorage.getItem("ClientAddr");
      let url = "Manager.ashx?Function=HttpAuditMinShopGather";
      let data = {
        pkNo: row.pkNo,
        type: true
      };
      let agree = axios.auditmsg(url, Client, data);
      agree.then(res => {
        // console.log(res);
        if (res.data.State == "成功") {
          this.$message({
            message: "审核通过",
            type: "success"
          });
          this.gettablemsg();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    refuse(row) {
      // 拒绝采集衣点申请
      // row.pkNo   this.type
      let Client = localStorage.getItem("ClientAddr");
      let url = "Manager.ashx?Function=HttpAuditMinShopGather";
      let data = {
        pkNo: row.pkNo,
        type: false
      };
      let refuse = axios.auditmsg(url, Client, data);
      refuse.then(res => {
        // console.log(res);
        if (res.data.State == "成功") {
          this.gettablemsg();
          this.$message({
            type: "success",
            message: "已拒绝"
          });
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    inputendDt() {
      this.gettablemsg();
    },
    inputstartDt() {
      this.gettablemsg();
    },
    inputshopName() {
      this.gettablemsg();
    },
    inputworkerName() {
      this.gettablemsg();
    },
    inputpkNo() {
      this.gettablemsg();
    },
    search(selVal) {
      // console.log(selVal);
      // 0  待审核  1审核通过  2审核失败
      if (selVal == "待审核") {
        this.State = 0;
        this.gettablemsg();
      }
      if (selVal == "已通过") {
        this.State = 1;
        this.gettablemsg();
      }
      if (selVal == "已拒绝") {
        this.State = 2;
        this.gettablemsg();
      }
    },
    deletemsg(row) {
      // console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let pkNo = row.pkNo;
          let Client = localStorage.getItem("ClientAddr");
          let url = "Manager.ashx?Function=HttpDelMinShopGather";
          let delemsg = axios.delemsg(url, Client, pkNo);
          delemsg.then(res => {
            // console.log(res);
            if (res.data.State == "成功") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.gettablemsg();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped>
.delebtn {
  border: none;
  border-style: none;
  outline: none;
  width: 50px;
  height: 30px;
  background-color: #ccc;
  margin-bottom: 5px;
}
.container {
  margin: 0 auto;
  width: 98%;
  /* border: 1px solid red; */
  padding-top: 10px;
  height: 500px;
}
.img img {
  width: 110px;
  height: 100px;
}
</style>