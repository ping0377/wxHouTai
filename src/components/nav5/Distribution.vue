<template>
  <div id="Distribution">
    <el-row class="border">
      <el-col :span="12" class="time">
        <span>{{view1}}</span>
      </el-col>
      <el-col :span="6" class="time">
        <span>{{view2}}</span>
      </el-col>
      <el-col :span="6">
        <div style="width: 100%;">
          <el-button type="text" style="width: 100%; padding: 5px;" @click="getSearch()">查 询</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      ref="filterTable"
      :data="allData"
      style="width: 100%"
      height="calc(100vh - 94px)">
      <el-table-column
        prop="Counts"
        label="该月总发卡数"
        align="center"
        min-width="160"
        fit="true"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="sumValue"
        label="该月总充值额"
        align="center"
        min-width="160"
        fit="true">
      </el-table-column>
    </el-table>
    <!-- 查询 -->
    <el-dialog title="查询" :visible.sync="dialogFormVisible" fullscreen>
      <div class="block">
        <p class="block-text">选择年份:</p>
        <el-date-picker
          v-model="value1"
          type="year"
          placeholder="请选择年份"
          style="width: 90%"
          :editable="false"
          :clearable="false"
          class="left"
          format="yyyy 年"
          value-format="yyyy">
        </el-date-picker>
      </div>
      <div class="block">
        <p class="block-text">选择月份:</p>
        <el-date-picker
          v-model="value2"
          type="month"
          placeholder="请选择月份"
          style="width: 90%"
          :editable="false"
          :clearable="false"
          class="left"
          format="MM 月"
          value-format="MM">
        </el-date-picker>
      </div>
      <div class="block">
        <p class="block-text">选择员工:</p>
        <el-select class="left" v-model="val" placeholder="请选择员工" style="width: 90%">
          <el-option
            v-for="item in optionsW"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
      allData: [],
      dialogFormVisible: false,
      // 查询
      view1:"",
      view2:"",
      // 时间
      value1:"",
      value2:"",
      nowYear:0,
      nowMonth:0,
      // 员工
      val:"",
      optionsW:[],
      workerData:[],
      worker:'',
    };
  },
  created() {
    this.getWorker();
  },
  methods: {
    getWorker() {
      let Client = localStorage.getItem("ClientAddr");
      let getWorker = axios.getWorker(Client);
      getWorker.then((res) => {
        if(res.data.State == '成功'){
          this.workerData = res.data.Body;
          this.showWorker();
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    showWorker() {
      if(!(!!this.val)){
        this.worker = this.workerData[0].No;
        this.view2 = this.workerData[0].Name;
      }
      this.getTime();
    },
    search(no,year,month) {
      let Client = localStorage.getItem("ClientAddr");
      let No = no;
      let Year = year;
      let Month = month;
      this.allData = [];
      let data = [];
      let searchWDI = axios.searchWDI(Client,No,Year,Month);
      searchWDI.then((res) => {
        if(res.data.State == '成功'){
          data = res.data.Body;
          if(data.sumValue == ""){
            data.sumValue = 0; 
          }else{
            data.sumValue = parseFloat(data.sumValue).toFixed(2); 
          }
          this.allData.push(data);
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    workerOptions() {
      if(this.optionsW.length == 0) {
        if(this.workerData.length != 0){
          for(let i=0;i<this.workerData.length;i++){
            this.optionsW.push({value:this.workerData[i].No,label:this.workerData[i].Name});
          }
        }
      }
    },
    getTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      this.value1 = year.toFixed();
      this.value2 = month;
      this.nowYear = year;
      this.nowMonth = month;
      this.view1 = year + "年" + month + "月";
      this.search(this.worker,this.value1,this.value2);
    },
    getSearch() {
      this.workerOptions();
      this.val = this.worker;
      this.dialogFormVisible = true;
    },
    searchOpen1(){
      this.$message({
        message: '年份错误',
        type: 'error'
      });
    },
    searchOpen2(){
      this.$message({
        message: '月份错误',
        type: 'error'
      });
    },
    viewTime(){
      this.view1 = this.value1 + "年" + this.value2 + "月";
      for(let i=0;i<this.optionsW.length;i++){
        if(this.worker == this.optionsW[i].value){
          if(this.optionsW[i].label){
            this.view2 = this.optionsW[i].label;
          }else{
            this.view2 = this.optionsW[i].value;
          }
        }
      }
    },
    searchData() {
      let workerN = this.val;
      this.worker = this.val;
      let sYear = parseInt(this.value1);
      let sMonth = parseInt(this.value2);
      let nYear = parseInt(this.nowYear);
      let nMonth = parseInt(this.nowMonth);
      if(sYear < nYear){
        this.search(workerN,this.value1,this.value2);
        this.viewTime();
        this.dialogFormVisible = false;
      }else if(sYear == nYear){
        if(sMonth <= nMonth){
          this.search(workerN,this.value1,this.value2);
          this.viewTime();
          this.dialogFormVisible = false;
        }else{
          this.searchOpen2();
        }
      }else{
        this.searchOpen1();
      }
    }
  }
}
</script>

<style scoped>
#Distribution {
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
.text{
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.Text{
  margin-top: 10px;
  margin-bottom: 10px;
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
