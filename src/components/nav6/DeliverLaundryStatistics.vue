<template>
  <div id="deliver-laundry-statistics">
    <el-tabs class="deliver-laundry" type="border-card">
      <el-tab-pane label="服务统计">
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
        <div class="list_border border1">
          <!-- 1 -->
          <el-row :gutter="10" style="padding: 5px;">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <dl class="Text">
                  <dd class="Item1">{{allCash1}}元</dd>
                  <dd class="Item2">洗护总额</dd>
                </dl>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <dl class="Text">
                  <dd class="Item1">{{allNum1}}件</dd>
                  <dd class="Item2">总件数</dd>
                </dl>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <dl class="Text">
                  <dd class="Item1">{{allExtra1}}元</dd>
                  <dd class="Item2">附加总额</dd>
                </dl>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-table height="calc(100vh - 210px)" :data="tableData1" style="width: 100%">
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="Name"
              label="物件名称"
              min-width="85"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="InitialPrice"
              label="金额"
              min-width="80"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="clothesNum"
              label="件数"
              min-width="70"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="AttachPrice"
              label="附加费"
              min-width="70"
            ></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="档次统计">
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
        <div class="list_border border1">
          <!-- 1 -->
          <el-row :gutter="10" style="padding: 5px;">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <dl class="Text">
                  <dd class="Item1">{{allCash2}}元</dd>
                  <dd class="Item2">洗护总额</dd>
                </dl>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <dl class="Text">
                  <dd class="Item1">{{allNum2}}件</dd>
                  <dd class="Item2">总件数</dd>
                </dl>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <dl class="Text">
                  <dd class="Item1">{{allExtra2}}元</dd>
                  <dd class="Item2">附加总额</dd>
                </dl>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-table height="calc(100vh - 210px)" :data="tableData2" style="width: 100%">
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="Name"
              label="物件名称"
              min-width="85"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="InitialPrice"
              label="金额"
              min-width="80"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="clothesNum"
              label="件数"
              min-width="70"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="AttachPrice"
              label="附加费"
              min-width="70"
            ></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="分类统计">
        <el-row class="border">
          <el-col :span="18" class="time">
            <span>{{viewTime5}} - {{viewTime6}}</span>
          </el-col>
          <el-col :span="6">
            <div style="width: 100%;">
              <el-button
                type="text"
                style="width: 100%; padding: 5px;"
                @click="dialogVisible3 = true"
              >查 询</el-button>
            </div>
          </el-col>
        </el-row>
        <div class="list_border border1">
          <!-- 1 -->
          <el-row :gutter="10" style="padding: 5px;">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <dl class="Text">
                  <dd class="Item1">{{allCash3}}元</dd>
                  <dd class="Item2">洗护总额</dd>
                </dl>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <dl class="Text">
                  <dd class="Item1">{{allNum3}}件</dd>
                  <dd class="Item2">总件数</dd>
                </dl>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <dl class="Text">
                  <dd class="Item1">{{allExtra3}}元</dd>
                  <dd class="Item2">附加总额</dd>
                </dl>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-table height="calc(100vh - 210px)" :data="tableData3" style="width: 100%">
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="Name"
              label="物件名称"
              min-width="85"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="InitialPrice"
              label="金额"
              min-width="80"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="clothesNum"
              label="件数"
              min-width="70"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="AttachPrice"
              label="附加费"
              min-width="70"
            ></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
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
      <div class="block">
        <p class="block-text">选择店铺:</p>
        <el-select
          @change="getSelect"
          class="left"
          v-model="val"
          placeholder="请选择店铺"
          style="width: 90%"
        >
          <el-option label="全部店铺" value></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="block">
        <p class="block-text">衣物服务选择:</p>
        <el-select filterable class="left" v-model="val1" placeholder="请选择衣物服务" style="width: 90%">
          <el-option label="全部服务" value></el-option>
          <el-option
            v-for="item in optionsS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button @click="serachData1()" type="primary">确 定</el-button>
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
          placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 90%"
          :editable="false"
          :clearable="false"
          class="left"
        ></el-date-picker>
      </div>
      <div class="block">
        <p class="block-text">选择店铺:</p>
        <el-select
          @change="getSelect"
          class="left"
          v-model="val"
          placeholder="请选择店铺"
          style="width: 90%"
        >
          <el-option label="全部店铺" value></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="block">
        <p class="block-text">衣物档次选择:</p>
        <el-select filterable class="left" v-model="val2" placeholder="请选择衣物档次" style="width: 90%">
          <el-option label="全部档次" value></el-option>
          <el-option
            v-for="item in optionsL"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button @click="serachData2()" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="查询" :visible.sync="dialogVisible3" fullscreen>
      <div class="block">
        <p class="block-text">开始时间:</p>
        <el-date-picker
          v-model="timeValue5"
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
          v-model="timeValue6"
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
        <p class="block-text">选择店铺:</p>
        <el-select
          @change="getSelect"
          class="left"
          v-model="val"
          placeholder="请选择店铺"
          style="width: 90%"
        >
          <el-option label="全部店铺" value></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="block">
        <p class="block-text">衣物分类选择:</p>
        <el-select filterable class="left" v-model="val3" placeholder="请选择衣物分类" style="width: 90%">
          <el-option label="全部分类" value></el-option>
          <el-option
            v-for="item in optionsN"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button @click="serachData3()" type="primary">确 定</el-button>
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
      val: "",
      options: [],
      // 1
      timeValue1: "",
      timeValue2: "",
      viewTime1: "",
      viewTime2: "",
      tableData1: [],
      dialogVisible1: false,
      val1: "",
      optionsS: [],
      allNum1: 0,
      allCash1: 0,
      allExtra1: 0,
      // 2
      timeValue3: "",
      timeValue4: "",
      viewTime3: "",
      viewTime4: "",
      tableData2: [],
      dialogVisible2: false,
      val2: "",
      optionsL: [],
      allNum2: 0,
      allCash2: 0,
      allExtra2: 0,
      // 3
      timeValue5: "",
      timeValue6: "",
      viewTime5: "",
      viewTime6: "",
      tableData3: [],
      dialogVisible3: false,
      val3: "",
      optionsN: [],
      allNum3: 0,
      allCash3: 0,
      allExtra3: 0
    };
  },
  created() {
    this.getTime();
    this.getTimeView();
    this.getShop();
    this.getData1();
    this.getData2();
    this.getData3();
  },
  methods: {
    // 初始化
    getTime() {
      this.$store.commit("timer/getTime1");
      this.$store.commit("timer/getTime2");
      this.$store.commit("timer/getTime3");
    },
    getTimeView() {
      let time = this.$store.state.timer;
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
      // 3
      this.timeValue5 = time.timeValue5;
      this.timeValue6 = time.timeValue6;
      this.viewTime5 = time.viewTime5;
      this.viewTime6 = time.viewTime6;
    },
    getShop() {
      let Client = localStorage.getItem("ClientAddr");
      let getAllShop = axios.getAllShop(Client);
      getAllShop.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push({ value: data[i].No, label: data[i].Name });
          }
          this.options = arr;
          if (!!this.$store.state.timer.shopValue) {
            this.val = this.$store.state.timer.shopValue;
            this.getSelect();
          }
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    getSelect() {
      this.getServer();
      this.getLevel();
      this.getNum();
    },
    getServer() {
      let port = "Manager.ashx?Function=HttpQueryBaseService";
      let obj = {
        shopNo: this.val
      };
      let upData = axios.upData(port, obj);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push({ value: data[i].No, label: data[i].Name });
          }
          this.optionsS = arr;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    getLevel() {
      let port = "Manager.ashx?Function=HttpQueryBaseLevel";
      let obj = {
        shopNo: this.val
      };
      let upData = axios.upData(port, obj);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push({ value: data[i].No, label: data[i].Name });
          }
          this.optionsL = arr;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    getNum() {
      let port = "Manager.ashx?Function=HttpQueryBaseObjectType";
      let obj = {
        shopNo: this.val
      };
      let upData = axios.upData(port, obj);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push({ value: data[i].No, label: data[i].Name });
          }
          this.optionsN = arr;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 1
    getData1() {
      let port = "Shop.ashx?Function=HttpGetServiceNameCount";
      let obj = {
        ServiceName: this.val1,
        startTime: this.timeValue1,
        endTime: this.timeValue2
      };
      let upData = axios.upData(port, obj);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          let allNum = 0;
          let allExtra = 0;
          let allCash = 0;
          for (let i = 0; i < data.length; i++) {
            allNum += data[i].clothesNum;
            allCash += data[i].InitialPrice;
            allExtra += data[i].AttachPrice;
          }
          this.allCash1 = allCash.toFixed(2);
          this.allNum1 = allNum.toFixed(2);
          this.allExtra1 = allExtra.toFixed(2);
          this.tableData1 = data;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    serachData1() {
      let time = this.$store.state.timer;
      this.$store.dispatch("timer/changeTime1", this.timeValue1);
      this.$store.dispatch("timer/changeTime2", this.timeValue2);
      this.$store.dispatch("timer/changeShop", this.val);
      this.getData1();
      this.timeValue1 = time.timeValue1;
      this.timeValue2 = time.timeValue2;
      this.viewTime1 = time.viewTime1;
      this.viewTime2 = time.viewTime2;
      this.dialogVisible1 = false;
    },
    // 2
    getData2() {
      let port = "Shop.ashx?Function=HttpGetlevelNameCount";
      let obj = {
        levelName: this.val2,
        startTime: this.timeValue3,
        endTime: this.timeValue4
      };
      let upData = axios.upData(port, obj);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          let allNum = 0;
          let allExtra = 0;
          let allCash = 0;
          for (let i = 0; i < data.length; i++) {
            allNum += data[i].clothesNum;
            allCash += data[i].InitialPrice;
            allExtra += data[i].AttachPrice;
          }
          this.allCash2 = allCash.toFixed(2);
          this.allNum2 = allNum.toFixed(2);
          this.allExtra2 = allExtra.toFixed(2);
          this.tableData2 = data;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    serachData2() {
      let time = this.$store.state.timer;
      this.$store.dispatch("timer/changeTime3", this.timeValue3);
      this.$store.dispatch("timer/changeTime4", this.timeValue4);
      this.$store.dispatch("timer/changeShop", this.val);
      this.getData2();
      this.timeValue3 = time.timeValue3;
      this.timeValue4 = time.timeValue4;
      this.viewTime3 = time.viewTime3;
      this.viewTime4 = time.viewTime4;
      this.dialogVisible2 = false;
    },
    // 3
    getData3() {
      let port = "Shop.ashx?Function=HttpGetObjTypeCount";
      let obj = {
        objTypeName: this.val3,
        startTime: this.timeValue5,
        endTime: this.timeValue6
      };
      let upData = axios.upData(port, obj);
      upData.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          let allNum = 0;
          let allExtra = 0;
          let allCash = 0;
          for (let i = 0; i < data.length; i++) {
            allNum += data[i].clothesNum;
            allCash += data[i].InitialPrice;
            allExtra += data[i].AttachPrice;
          }
          this.allCash3 = allCash.toFixed(2);
          this.allNum3 = allNum.toFixed(2);
          this.allExtra3 = allExtra.toFixed(2);
          this.tableData3 = data;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    serachData3() {
      let time = this.$store.state.timer;
      this.$store.dispatch("timer/changeTime5", this.timeValue5);
      this.$store.dispatch("timer/changeTime6", this.timeValue6);
      this.$store.dispatch("timer/changeShop", this.val);
      this.getData3();
      this.timeValue5 = time.timeValue5;
      this.timeValue6 = time.timeValue6;
      this.viewTime5 = time.viewTime5;
      this.viewTime6 = time.viewTime6;
      this.dialogVisible3 = false;
    }
  }
};
</script>

<style scoped>
dd {
  margin: 0px;
}
#deliver-laundry-statistics {
  padding: 5px;
}
.time {
  font-size: 14px;
  color: #727377;
  line-height: 26px;
}
.border1 {
  max-width: calc(100% - 10px);
  margin: auto;
}
.border {
  border-bottom: 1px solid #e0e0e0;
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