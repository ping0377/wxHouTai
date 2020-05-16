<template>
  <div id="card-type-statistics">
    <el-row class="border">
      <el-col :span="18" class="time">
        <span>{{viewTime1}} - {{viewTime2}}</span>
      </el-col>
      <el-col :span="6">
        <div style="width: 100%;">
          <el-button
            type="text"
            style="width: 100%; padding: 5px;"
            @click="dialogVisible = true"
          >查 询</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="card-type-box">
      <div class="card-total">
        消费总额:
        <span></span>元
      </div>
      <el-table height="calc(33vh - 59px)" :data="tableData1" style="width: 100%">
        <el-table-column align="center" show-overflow-tooltip prop="date" label="卡号" min-width="80"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="name" label="消费金额" min-width="80"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="卡类型" min-width="80"></el-table-column>
        <el-table-column align="center" label="操作" min-width="65">
          <template v-slot="scope">
            <el-button @click="getRowData1(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="card-type-box">
      <div class="card-total">
        扣款总额:
        <span></span>元
      </div>
      <el-table height="calc(33vh - 59px)" :data="tableData2" style="width: 100%">
        <el-table-column align="center" show-overflow-tooltip prop="date" label="卡号" min-width="80"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="name" label="扣款金额" min-width="80"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="卡类型" min-width="80"></el-table-column>
        <el-table-column align="center" label="操作" min-width="65">
          <template v-slot="scope">
            <el-button @click="getRowData2(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="card-type-box">
      <div style="background-color: #D3FFB8;" class="card-total">
        充值总额:
        <span></span>元
      </div>
      <el-table height="calc(33vh - 59px)" :data="tableData3" style="width: 100%">
        <el-table-column align="center" show-overflow-tooltip prop="date" label="卡号" min-width="80"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="name" label="充值金额" min-width="80"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="卡类型" min-width="80"></el-table-column>
        <el-table-column align="center" label="操作" min-width="65">
          <template v-slot="scope">
            <el-button @click="getRowData3(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="查询" :visible.sync="dialogVisible" fullscreen>
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
      <div class="block">
        <p class="block-text">选择卡类型:</p>
        <el-select filterable class="left" v-model="val" placeholder="请选择卡类型" style="width: 90%">
          <el-option label="全部卡类型" value></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="serachData()" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      // search
      dialogVisible: false,
      val: "",
      options: [],
      timeValue1: "",
      timeValue2: "",
      viewTime1: "",
      viewTime2: "",
      // 1
      tableData1: [],
      // 2
      tableData2: [],
      // 3
      tableData3: []
    };
  },
  created() {
    this.getTime();
    this.getTimeView();
    this.getCardType();
    this.getData();
  },
  methods: {
    // 初始化
    getTime() {
      this.$store.commit("card/getTime");
    },
    getTimeView() {
      let time = this.$store.state.card;
      this.timeValue1 = time.timeValue1;
      this.timeValue2 = time.timeValue2;
      this.viewTime1 = time.viewTime1;
      this.viewTime2 = time.viewTime2;
    },
    getCardType() {
      let port = "Manager.ashx?Function=HttpQueryCardType";
      let upData = axios.upData(port);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push({ value: data[i].No, label: data[i].Name });
          }
          this.options = arr;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 数据装入
    getData() {
      let port = "Shop.ashx?Function=HttpGetCardTypeCharge";
      let obj = {};
      let upData = axios.upData(port,obj);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          console.log(data);
        } else {
          this.$message.error(res.data.Reason);
        }
      })
    },
    serachData() {
      let time = this.$store.state.card;
      this.$store.dispatch("card/changeTime1", this.timeValue1);
      this.$store.dispatch("card/changeTime2", this.timeValue2);
      this.getData();
      this.timeValue1 = time.timeValue1;
      this.timeValue2 = time.timeValue2;
      this.viewTime1 = time.viewTime1;
      this.viewTime2 = time.viewTime2;
      this.dialogVisible = false;
    },
    // 详情
    getRowData1(data) {},
    getRowData2(data) {},
    getRowData3(data) {}
  }
};
</script>

<style scoped>
dd {
  margin: 0px;
}
.time {
  font-size: 14px;
  color: #727377;
  line-height: 26px;
}
.border {
  border-bottom: 1px solid #e0e0e0;
}
.card-type-box {
}
.card-total {
  font-size: 14px;
  color: #727377;
  background-color: #ffbaa4;
  text-align: left;
  padding: 5px;
}
.card-total span {
  font-size: 16px;
  font-weight: 700;
  margin-left: 6px;
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
</style>