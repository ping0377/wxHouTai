<template>
  <div id="Jurisdiction">
    <!-- 查询 -->
    <el-row class="border">
      <el-col :span="12" class="time">
        <span>{{view1}}</span>
      </el-col>
      <el-col :span="6" class="time">
        <span>{{view2}}</span>
      </el-col>
      <el-col :span="6">
        <div style="width: 100%;">
          <el-button type="text" style="width: 100%; padding: 5px;" @click="dialogFormVisible2 = true">查 询</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      ref="filterTable"
      :data="allData"
      style="width: 100%"
      height="calc(100vh - 94px)"
      >
      <el-table-column
        prop="No"
        label="员工编号"
        align="center"
        min-width="110"
        fit="true"
        column-key="No"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="Name"
        label="员工姓名"
        align="center"
        min-width="140"
        fit="true"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="70"
        fit="true">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small" @click="setData(scope.row)">设置</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 设置弹窗 -->
    <el-dialog title="权限设置" :visible.sync="dialogFormVisible1" fullscreen>
      <el-tree
        :data="checkData"
        :props="defaultProps"
        accordion
        show-checkbox
        ref="tree"
        node-key="id">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="upData()">设 置</el-button>
      </span>
    </el-dialog>
    <!-- 查询 -->
    <el-dialog title="查询" :visible.sync="dialogFormVisible2" fullscreen>
      <div class="block">
        <span class="block-text">选择店铺:</span>
        <el-select class="left" v-model="val" placeholder="请选择店铺" style="width: 70%">
          <el-option :label="select_l" :value="select_v"></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="block-text">员工编号:</span>
        <el-input style="width: 70%" v-model="num" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
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
      TypeOptions: null,
      dialogFormVisible1: false, // 设置
      dialogFormVisible2: false, // 查询
      // 查询
      view1:"",
      view2:"",
      val:"",
      select_l:"全部店铺",
      select_v:null,
      num:"",
      options: [], // 店铺列表
      // 设置
      checkData: [], // 选项列表
      workerNo:"",
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getAllData();
    this.getOptions();
  },
  watch: {
    dialogVisible1(val) {
      if (val) {
        this.setCheck();  // 如果为true。那么调用设置树形默认值的方法
      }
    },
    deep: true,
    immediate: true
  },
  methods: {
    // 表格
    getAllData(sNo,wNo) {
      let Client = localStorage.getItem("ClientAddr");
      let shopNo = sNo;
      let workerNo = wNo;
      let searchStaff = axios.searchStaff(Client,shopNo,workerNo);
      searchStaff.then((res) => {
        if(res.data.State == '成功'){
          this.allData = res.data.Body;
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    getOptions() {
      let allShop = [];
      let Client = localStorage.getItem("ClientAddr");
      let getShop = axios.getShop(Client);
      getShop.then((res) => {
        if(res.data.State == '成功'){
          allShop = res.data.Body;
          if(allShop.length != 0) {
            for(let i=0;i<allShop.length;i++){
              this.options.push({label:allShop[i].Name,value:allShop[i].ShopNo});
            }
          }
          this.viewSearch();
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    // 权限设置
    getCheck(No){
      let allCheck = [];
      let arr = [];
      let wNo = No;
      this.checkData = [];
      let Client = localStorage.getItem("ClientAddr");
      let jurisdiction = axios.jurisdiction(Client,wNo);
      jurisdiction.then((res) => {
        if(res.data.State == '成功'){
          allCheck = res.data.Body;
          for(let i=0;i<allCheck.length;i++){
            arr[i] = [];
            for(let j=0;j<allCheck[i].Per.length;j++){
              arr[i].push({label:allCheck[i].Per[j].Name,id:allCheck[i].Per[j].No,isSet:allCheck[i].Per[j].isSet});
            }
            this.checkData.push({label:allCheck[i].PerGroupName,children:arr[i]})
          }
          this.setCheck();
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    setCheck(){
      let data = this.checkData;
      let checked = [];
      for(let i=0;i<data.length;i++){
        for(let j=0;j<data[i].children.length;j++){
          if(data[i].children[j].isSet == true){
            checked.push(data[i].children[j].id);
          }
        }
      }
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(checked);
      })
    },
    setOpen1() {
      this.$message({
        message: '设置成功',
        type: 'success'
      });
    },
    setData(row) {
      let wNo = row.No;
      this.workerNo = row.No
      this.getCheck(wNo);
      this.dialogFormVisible1 = true;
    },
    upData() {
      let Client = localStorage.getItem("ClientAddr");
      let checked = this.$refs.tree.getCheckedNodes();
      let wNo = this.workerNo;
      let setNo = [];
      if(checked.length != 0){
        for(let i=0;i<checked.length;i++){
          if(!(!!checked[i].children)){
            setNo.push(checked[i].id);
          };
        }
      }
      let setPer = axios.setPer(Client,wNo,setNo);
      setPer.then((res) => {
        if(res.data.State == '成功'){
          this.getAllData();
          this.setOpen1();
        }else{
          this.$message.error(res.data.Reason);
        }
      })
      this.dialogFormVisible1 = false;
    },
    // 查询
    searchData() {
      let sNo = this.val;
      let wNo = this.num;
      this.getAllData(sNo,wNo);
      this.dialogFormVisible2 = false;
      this.viewSearch();
    },
    viewSearch() {
      if(this.options.length != 0){
        for(let i=0;i<this.options.length;i++){
          if(this.options[i].value == this.val){
            this.view1 = this.options[i].label;
          }else if(!(!!this.val)){
            this.view1 = "全部店铺";
            this.val = null;
          }
        };
        if(!!this.num){
          this.view2 = this.num;
        }else{
          this.view2 = "全部员工";
        }
      }
    }
  }
}
</script>

<style scoped>
#Jurisdiction{
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
}
.item{
  text-align: left;
}
.item1{
  text-align: left;
  margin-bottom: 5px;
}
.item2{
  text-align: left;
}
.time{
  font-size: 14px;
  color: #727377;
  line-height: 26px;
}
.xqfl,.del{
  overflow: hidden;
}
.xqfl1{
  float: left;
  margin-bottom: 5px;
  margin-right: 5px;
}
.xqfl2{
  float: left;
  line-height: 19px;
}
.del1{
  float: left;
  text-align: right;
  margin-right: 5px;
  width: 20%;
}
.del2{
  float: left;
  text-align: left;
  width: 70%;
}
.tip{
  color: red;
  text-align: left;
  font-size: 14px;
  margin-top: 5px;
}
</style>
