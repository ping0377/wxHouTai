<template>
  <div id="BoxOpen">
    <el-header style="height: 42px;" class="header">
      <el-row>
        <div @click="back()">
          <el-col :span="4" class="header-left">
            <i class="el-icon-arrow-left back"></i>
          </el-col>
        </div>
        <el-col :span="16" style="line-height: 22px; font-size: 15px;">柜门管理</el-col>
        <el-col :span="4" class="header-left"></el-col>
      </el-row>
    </el-header>
    <el-main style="height: calc(100vh - 68px); padding: 0px; padding-top: 0px;">
      <el-row class="count">
        <el-col :span="8" class="count-text">总数:{{sum}}</el-col>
        <el-col :span="8" class="count-text">已使用:{{unused}}</el-col>
        <el-col :span="8" class="count-text">未使用:{{used}}</el-col>
      </el-row>
      <el-collapse accordion class="showText">
        <el-collapse-item v-for="(item,index) in caselist" :key="index" class="titleBS">
          <template slot="title">
            <el-row style="width: 100%;">
              <el-col :span="19" class="name">
                <span>名称:{{item.nameBox}}</span>
                <span>编号:{{item.boxIndex}}</span>
              </el-col>
              <el-col
                :span="5"
                class="status"
                :class="{'lock' : item.locked, 'use': item.used}"
              >状态:{{item.type}}</el-col>
            </el-row>
          </template>
          <div>
            <el-button size="small" type="primary" class="buttonBS" @click="change(item)">编 辑</el-button>
            <el-button size="small" type="danger" class="buttonBS" @click="del(item)">删 除</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div>
        <el-button type="text" style="width: 49%; padding: 7px 0px;" @click="getDoors()">添 加</el-button>
        <el-button
          type="text"
          style="width: 49%; padding: 7px 0px; margin: 0px;"
          @click="upData"
        >刷 新</el-button>
      </div>
    </el-main>
    <el-footer class="footer" style="height: 26px; line-height: 26px;">芙蓉云洗衣后台手机版</el-footer>
    <!-- 编辑弹窗 -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible1"
      width="90%"
      top="23vh"
      class="dialogBO"
    >
      <dl class="text xqfl">
        <dd class="item1 xqfl1">柜门编号:</dd>
        <dd class="item xqfl2">{{boxIndex}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">柜门名称:</dd>
        <dd class="item">
          <el-input v-model="nameBox" clearable></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="changeData()">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog
      title="确认删除？"
      :visible.sync="dialogFormVisible2"
      width="90%"
      top="25vh"
      class="dialogBO"
    >
      <dl class="text">
        <dd>柜门编号:</dd>
        <dd>{{delIndex}}</dd>
      </dl>
      <dl class="text">
        <dd>柜门名称:</dd>
        <dd>{{delBox}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="delData()">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 添加弹窗 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogFormVisible3"
      width="90%"
      top="23vh"
      class="dialogBO"
    >
      <dl class="text">
        <dd class="item1">柜门编号:</dd>
        <dd class="item">
          <el-select v-model="addIndex" clearable>
            <el-option
              v-for="item in doors"
              :key="item.boxIndex"
              :label="item.boxIndex"
              :value="item.boxIndex"
              :disabled="item.disabled"
            >
              <span style="float: left">{{ item.nameBox }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.boxIndex }}</span>
            </el-option>
          </el-select>
        </dd>
      </dl>
      <!-- <dl>
        <dd class="item1">编号:</dd>
        <dd class="item">
          <el-input v-model="addIndex" clearable></el-input>
        </dd>
      </dl> -->
      <dl class="text">
        <dd class="item1">柜门名称:</dd>
        <dd class="item">
          <el-input v-model="addBox" clearable></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="addData()">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
import { JsonPost } from "@/common/js/axiosServer.js";
let updataData;
export default {
  data() {
    return {
      deviceID: "",
      caselist: [],
      used: 0,
      unused: 0,
      sum: 0,
      doors: [],
      // 编辑
      dialogFormVisible1: false,
      nameBox: "",
      boxIndex: "",
      editUsed: true,
      // 删除
      dialogFormVisible2: false,
      delIndex: "",
      delBox: "",
      // 添加
      BoxOptions: [],
      dialogFormVisible3: false,
      addIndex: "",
      addBox: ""
    };
  },
  created() {
    this.out();
    if (!!this.$route.params.deviceID) {
      this.getAllData(this.$route.params.deviceID);
    } else {
      this.$router.push({ path: "/admin/virtualcabinet" });
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.deviceID = this.$route.params.deviceID;
      },
      immediate: true
    }
  },
  methods: {
    out() {
      let Client = localStorage.getItem("ClientAddr");
      let getUserName = axios.getUserName(Client);
      getUserName.then(res => {
        if (res.data.State == "成功") {
          if (res.data.Body.Name == null) {
            this.userName = res.data.Body.No;
          } else {
            this.userName = res.data.Body.Name;
          }
        } else {
          this.$message({
            message: "请重新登陆",
            type: "error"
          });
          localStorage.removeItem("ClientAddr");

          this.$router.push({ path: "/login" });
        }
      });
    },
    getAllData(ID) {
      let Client = localStorage.getItem("ClientAddr");
      let id = ID;
      let getDoor = axios.getDoor(Client, id);
      getDoor.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          this.sum = data.length;
          this.used = 0;
          this.unused = 0;
          for (let i = 0; i < data.length; i++) {
            if (!!data[i].state) {
              data[i].type = "已使用";
              data[i].locked = true;
              data[i].used = false;
              this.unused += 1;
            } else {
              data[i].type = "未使用";
              data[i].locked = false;
              data[i].used = true;
              this.used += 1;
            }
          }
          this.caselist = data;
          console.log(data)
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    back() {
      history.back();
    },
    change(data) {
      this.nameBox = data.nameBox;
      this.boxIndex = data.boxIndex;
      this.dialogFormVisible1 = true;
      this.editUsed = data.used;
      updataData = data;
    },
    changeData() {
      if (!this.editUsed) {
        this.$message.error("该柜子使用中暂不可编辑柜门信息");
        return;
      }
      let Client = localStorage.getItem("ClientAddr");
      let boxInfo = [
        {
          nameBox: this.nameBox,
          boxIndex: this.boxIndex
        }
      ];
      let changeDoor = axios.changeDoor(Client, this.deviceID, boxInfo);
      changeDoor.then(res => {
        if (res.data.State == "成功") {
          this.getAllData(this.deviceID);
          this.dialogFormVisible1 = false;
          this.$message.success("编辑成功");
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    del(data) {
      this.delBox = data.nameBox;
      this.delIndex = data.boxIndex;
      this.dialogFormVisible2 = true;
    },
    delData() {
      let Client = localStorage.getItem("ClientAddr");
      let boxInfo = [
        {
          nameBox: this.delBox,
          boxIndex: this.delIndex
        }
      ];
      let delDoor = axios.delDoor(Client, this.deviceID, boxInfo);
      delDoor.then(res => {
        if (res.data.State == "成功") {
          this.getAllData(this.deviceID);
          this.dialogFormVisible2 = false;
          this.$message.success("删除成功");
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    addData() {
      if (!this.addIndex || !this.addBox) {
        this.$message.warning("编号和名称不能为空");
      } else {
        let j = 0;
        for (let i = 0; i < this.caselist.length; i++) {
          if (this.addIndex == this.caselist[i].boxIndex) {
            j = 1;
          }
        }
        if (j == 0) {
          let Client = localStorage.getItem("ClientAddr");
          let boxInfo = [
            {
              nameBox: this.addBox,
              boxIndex: this.deviceID + "-" + this.addIndex
            }
          ];
          let addDr = JsonPost("Manager.ashx?Function=HttpAddCabinetLocker", {
            deviceID: this.deviceID,
            boxInfo: boxInfo
          });
          // let changeDoor = axios.changeDoor(Client, this.deviceID, boxInfo);
          addDr.then(res => {
            if (res.data.State == "成功") {
              this.getAllData(this.deviceID);
              this.dialogFormVisible3 = false;
              this.$message.success("添加成功");
              this.addBox = "";
              this.addIndex = "";
            } else {
              this.$message.error(res.data.Reason);
            }
          });
        } else {
          this.$message.warning("编号已存在");
        }
      }
    },
    upData() {
      this.getAllData(this.deviceID);
    },
    getDoors() {
      this.dialogFormVisible3 = true;
      let gt = JsonPost("WeChatUser.ashx?Function=HttpCabinetApi", {
        deviceID: this.deviceID,
        comd: "GetLockerInfo"
      });
      gt.then(res => {
        if (res.data.State == "成功") {
          let Data = res.data.Body.boxInfo;
          for (let i = 0; i < Data.length; i++) {
            for (let j = 0; j < this.caselist.length; j++) {
              if (Data[i].boxIndex == this.caselist[j].boxIndex) {
                Data[i].disabled = true;
              }
            }
          }
          this.doors = Data;
          return;
        }
        this.$message.error(res.data.Reason);
      });
    }
  }
};
</script>

<style scoped>
p {
  margin: 0px;
}
dd {
  margin: 0px;
}
.header {
  padding: 10px 0px 10px 10px;
  background-color: #393d49;
  color: white;
}
.header-left {
  text-align: left;
}
.back {
  line-height: 22px;
  font-size: 15px;
}
.showText {
  height: calc(100vh - 128px);
  overflow-y: scroll;
}
.footer {
  border-top: 1px solid #ccc;
  background-color: #eeeeee;
}
.buttonBS {
  padding: 5px 15px;
}
.name {
  font-size: 12px;
  text-align: left;
  padding-left: 15px;
  color: #8b8b8b;
}
.name span{
  display: inline-block;
}
.name span:first-child{
  width: 52%
}
.use {
  color: #65c13e;
}
.lock {
  color: #f46c6b;
}
.status {
  font-size: 12px;
  text-align: left;
}
.count {
  height: 30px;
}
.count-text {
  font-size: 12px;
  line-height: 30px;
  text-align: left;
  padding-left: 20px;
  color: #b2b2b2;
}
.text {
  margin-top: 10px;
  margin-bottom: 10px;
}
.item {
  text-align: left;
}
.item1 {
  text-align: left;
  margin-bottom: 5px;
}
.xqfl {
  overflow: hidden;
}
.xqfl1 {
  float: left;
  margin-bottom: 5px;
  margin-right: 5px;
}
.xqfl2 {
  float: left;
  line-height: 19px;
}
</style>

<style>
.dialogBO .el-dialog .el-dialog__body {
  padding: 0px 20px !important;
}
</style>
