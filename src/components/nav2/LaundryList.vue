<template>
  <div id="LaundryList">
    <el-table
      ref="filterTable"
      :data="allData"
      style="width: 100%"
      height="calc(100vh - 108px)"
      >
      <el-table-column
        prop="No"
        label="编号"
        align="center"
        min-width="80"
        fit="true"
        column-key="No"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="Name"
        label="名称"
        align="center"
        min-width="170"
        fit="true"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="70"
        fit="true">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="click">
            <div>
              <el-button type="text" size="small" @click="changeData(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="delShow(scope.row)">删除</el-button>
            </div>
            <el-button type="text" slot="reference">操作</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%;">
      <el-button type="text" style="width: 100%;" @click="addData">添 加</el-button>
    </div>
    <!-- 修改弹窗 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible2" fullscreen>
      <dl class="text">
        <dd class="item1">编号:</dd>
        <dd class="item">{{C_No}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">姓名:</dd>
        <dd class="item">
          <el-input
            clearable
            style="width: 90%"
            placeholder="请输入姓名"
            v-model="C_name">
          </el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="upData()">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogFormVisible3" width="90%" top="25vh">
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">编号:</dd>
        <dd class="del2">{{delNo}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">名称:</dd>
        <dd class="del2">{{delName}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="del">删 除</el-button>
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
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      // 删除
      delNo: "",
      delName:'',
      // 修改
      C_No:'',
      C_name:'',
    }
  },
  created() {
    this.getAllData();
  },
  methods: {
    // 表格
    getAllData() {
      let Client = localStorage.getItem("ClientAddr");
      let WashList = axios.WashList(Client);
      WashList.then((res) => {
        if(res.data.State == '成功'){
          this.allData = res.data.Body;
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    // 添加
    addOpen1() {
      this.$message({
        message: '添加成功',
        type: 'success'
      });
    },
    addData() {
      let Client = localStorage.getItem("ClientAddr");
      let addWashList = axios.addWashList(Client);
      addWashList.then((res) => {
        if(res.data.State == '成功'){
          this.getAllData();
          this.addOpen1();
        }else {
          this.$message.error(res.data.Reason);
        }
      })
    },
    // 修改
    changeOpen1() {
      this.$message({
        message: '修改成功',
        type: 'success'
      });
    },
    changeData(row) {
      this.C_No = row.No;
      this.C_name = row.Name;
      this.dialogFormVisible2 = true;
    },
    upData() {
      let Client = localStorage.getItem("ClientAddr");
      let no = this.C_No; // 编号
      let name = this.C_name; // 名称
      let changeWashList = axios.changeWashList(Client,name,no);
      changeWashList.then((res) => {
        if(res.data.State == '成功'){
          this.getAllData();
          this.changeOpen1();
        }else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible2 = false;
    },
    // 删除
    delShow(row) {
      this.dialogFormVisible3 = true;
      this.delNo = row.No;
      this.delName = row.Name ;
    },
    delopen() {
      this.$message({
        message: '删除成功',
        type: 'success'
      });
    },
    del(){
      let Client = localStorage.getItem("ClientAddr");
      let delWashList = axios.delWashList(Client, this.delNo);
      delWashList.then((res) => {
        if(res.data.State == '成功'){
          this.delopen();
          this.getAllData();
        }else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible3 = false;
    }
  }
}
</script>

<style scoped>
#LaundryList {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#viewImg{
  width: 90px;
  height: 60px;
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
.time_size{
  font-size: 10px;
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
.content{
  line-height: 2;
}
.left{
  float: left;
}
.del1{
  float: left;
  text-align: right;
  margin-right: 5px;
  width: 25%;
}
.del2{
  float: left;
  text-align: left;
  width: 65%;
}
</style>
