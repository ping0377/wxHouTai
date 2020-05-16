<template>
  <div id="del-statistics">
    <el-card class="box-card">
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
        <el-table height="calc(100vh - 110px)" :data="tableData" style="width: 100%">
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="CardNo"
            label="卡号"
            min-width="70"
          ></el-table-column>
          <el-table-column align="center" show-overflow-tooltip label="删除时间" min-width="90">
            <template v-slot="scope">
              <div>{{scope.row.createTime | data}} {{scope.row.createTime | time}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="workerName"
            label="员工名称"
            min-width="80"
          ></el-table-column>
          <el-table-column align="center" label="操作" min-width="65">
            <template v-slot="scope">
              <el-button @click="getRowData(scope.row)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
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
          placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 90%"
          :editable="false"
          :clearable="false"
          class="left"
        ></el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button @click="serachData" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="dialogVisible2" fullscreen>
      <dl class="text">
        <dd class="item1">卡号:</dd>
        <dd class="item2">{{rowData.CardNo}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">卡类型:</dd>
        <dd class="item2">{{rowData.cardTypeName}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">删前余额:</dd>
        <dd class="item2">{{rowData.Balance}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">删除员工号:</dd>
        <dd class="item2">{{rowData.fkWorkerNo}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">删除员工名称:</dd>
        <dd class="item2">{{rowData.workerName}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">卡所属店铺号:</dd>
        <dd class="item2">{{rowData.fkshopNo}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">卡所属店铺名:</dd>
        <dd class="item2">{{rowData.shopName}}</dd>
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
      timeValue1: "",
      timeValue2: "",
      viewTime1: "",
      viewTime2: "",
      tableData: [],
      // search
      val: "",
      options: [],
      dialogVisible1: false,
      rowData: {},
      dialogVisible2: false
    };
  },
  created() {
    this.getTime();
    this.getTimeView();
    this.getData();
  },
  methods: {
    // 初始化
    getTime() {
      this.$store.commit("del/getTime");
    },
    getTimeView() {
      let time = this.$store.state.del;
      this.timeValue1 = time.timeValue1;
      this.timeValue2 = time.timeValue2;
      this.viewTime1 = time.viewTime1;
      this.viewTime2 = time.viewTime2;
    },
    // 数据装入
    getData() {
      let port = "Manager.ashx?Function=HttpQueryCardByRemoveRecord";
      let obj = {
        startTime: this.timeValue1,
        endTime: this.timeValue2
      };
      let upData = axios.upData(port, obj);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          this.tableData = data;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    getRowData(data) {
      this.rowData = data;
      this.dialogVisible2 = true;
    },
    serachData() {
      let time = this.$store.state.del;
      this.$store.dispatch("del/changeTime1", this.timeValue1);
      this.$store.dispatch("del/changeTime2", this.timeValue2);
      this.getData();
      this.timeValue1 = time.timeValue1;
      this.timeValue2 = time.timeValue2;
      this.viewTime1 = time.viewTime1;
      this.viewTime2 = time.viewTime2;
      this.dialogVisible1 = false;
    }
  }
};
</script>

<style scoped>
dd {
  margin: 0px;
}
#del-statistics {
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