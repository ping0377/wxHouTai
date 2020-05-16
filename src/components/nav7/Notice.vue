<template>
  <div id="Notice">
    <!-- 查询 -->
    <el-row class="border">
      <el-col :span="18" class="time">
        <span>{{view}}</span>
      </el-col>
      <el-col :span="6">
        <div style="width: 100%;">
          <el-button
            type="text"
            style="width: 100%; padding: 5px;"
            @click="dialogFormVisible4 = true"
          >查 询</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table ref="filterTable" :data="allData" style="width: 100%" height="calc(100vh - 134px)">
      <el-table-column label="电话" align="center" min-width="90" fit="true" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="time_size">{{scope.row.Tel}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="微信"
        align="center"
        min-width="75"
        fit="true"
        column-key="No"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="shopName"
        label="店铺"
        align="center"
        min-width="90"
        fit="true"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" align="center" min-width="65" fit="true">
        <template slot-scope="scope">
          <el-popover placement="left" trigger="click">
            <div>
              <el-button type="text" size="small" @click="getData(scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="changeData(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="delShow(scope.row)">删除</el-button>
            </div>
            <el-button type="text" slot="reference">操作</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%;">
      <el-button type="text" style="width: 100%;" @click="dialogFormVisible5 = true">添 加</el-button>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogFormVisible1" fullscreen>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">编号:</dd>
        <dd class="item2 xqfl2">{{No}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">店铺:</dd>
        <dd class="item2 xqfl2">{{Shop}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">联系电话:</dd>
        <dd class="item2 xqfl2">{{Tel}}</dd>
      </dl>
    </el-dialog>
    <!-- 添加弹窗 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible5" fullscreen>
      <dl class="text">
        <dd class="item1">联系电话:</dd>
        <dd class="item">
          <el-input v-model="addTel" placeholder="请输入联系电话" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">微信昵称:</dd>
        <dd class="item">
          <el-select
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="loading"
            v-model="addWX"
            placeholder="请输入微信昵称"
            style="width: 100%"
          >
            <el-option
              v-for="item in wxOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺:</dd>
        <dd class="item">
          <el-select v-model="addShop" placeholder="请选择店铺" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible5 = false">取 消</el-button>
        <el-button @click="addData" type="primary">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog @closed="clearItem" title="修改" :visible.sync="dialogFormVisible2" fullscreen>
      <dl class="text">
        <dd class="item1">编号:</dd>
        <dd class="item">{{C_No}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">联系电话:</dd>
        <dd class="item">
          <el-input v-model="C_Tel" placeholder="请输入联系电话" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">微信昵称:</dd>
        <dd class="item">
          <el-select
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            @change="changeWX"
            :loading="loading"
            v-model="C_WX"
            placeholder="请输入微信昵称"
            style="width: 100%"
          >
            <el-option
              v-for="item in wxOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺:</dd>
        <dd class="item">
          <el-select v-model="C_Shop" placeholder="请选择店铺" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
        <dd class="del1">店铺:</dd>
        <dd class="del2">{{delShop}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="del">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 查询 -->
    <el-dialog title="查询" :visible.sync="dialogFormVisible4" fullscreen>
      <div class="block">
        <span class="block-text">选择店铺:</span>
        <el-select class="left" v-model="val" placeholder="请选择店铺" style="width: 70%">
          <el-option :label="select_l" :value="select_v"></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="searchData()">查 询</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    return {
      allData: [],
      TypeOptions: null,
      dialogFormVisible1: false, // 详情
      dialogFormVisible2: false, // 修改
      dialogFormVisible3: false, // 删除
      dialogFormVisible4: false, // 查询
      dialogFormVisible5: false, // 添加
      // 查询
      view: "",
      val: "",
      select_l: "全部店铺",
      select_v: null,
      // 详情
      No: "", // 编号
      Shop: "", // 店铺
      Tel: "", // 联系电话
      // 删除
      delNo: "",
      delShop: "",
      // 修改
      C_No: "", // 编号
      C_Tel: "", // 联系电话
      C_Shop: "", // 店铺
      C_WX: "", // 微信
      C_wxid: "",
      C_wx: "",
      options: [], // 店铺列表
      // 添加
      addTel: "",
      addShop: "",
      addWX: "",
      // 微信
      wxOptions: [],
      loading: false
    };
  },
  created() {
    this.getAllData();
    this.getOptions();
  },
  methods: {
    // 表格
    getAllData(sNo) {
      let Client = localStorage.getItem("ClientAddr");
      let shopNo = sNo;
      console.log(shopNo);
      let searchNotice = axios.searchNotice(Client, shopNo);
      searchNotice.then(res => {
        if (res.data.State == "成功") {
          this.allData = res.data.Body;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    getOptions() {
      let allShop = [];
      let Client = localStorage.getItem("ClientAddr");
      let getShop = axios.getShop(Client);
      getShop.then(res => {
        if (res.data.State == "成功") {
          allShop = res.data.Body;
          if (allShop.length != 0) {
            for (let i = 0; i < allShop.length; i++) {
              this.options.push({
                label: allShop[i].Name,
                value: allShop[i].ShopNo
              });
            }
          }
          this.viewSearch();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    remoteMethod(query) {
      let list = [];
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let Client = localStorage.getItem("ClientAddr");
          let getOpenId = axios.getOpenId(Client, query);
          getOpenId.then(res => {
            if (res.data.State == "成功") {
              let data = res.data.Body;
              for (let i = 0; i < data.length; i++) {
                list.push({ value: data[i].openId, label: data[i].nickName });
              }
              this.wxOptions = list;
            } else {
              this.$message.error(res.data.Reason);
            }
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    // 查询
    searchData() {
      let sNo = this.val;
      this.getAllData(sNo);
      this.dialogFormVisible4 = false;
      this.viewSearch();
    },
    viewSearch() {
      if (this.options.length != 0) {
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].value == this.val) {
            this.view = this.options[i].label;
          } else if (!!!this.val) {
            this.view = "全部店铺";
            this.val = null;
          }
        }
      }
    },
    // 添加
    addOpen1() {
      this.$message({
        message: "添加成功",
        type: "success"
      });
    },
    addData() {
      let Client = localStorage.getItem("ClientAddr");
      let obj = {
        Tel: this.addTel,
        OpenId: this.addWX,
        fkshopNo: this.addShop
      };
      let addNotice = axios.addNotice(Client, obj);
      addNotice.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.$message.success("添加成功");
          this.getAllData();
          this.dialogFormVisible5 = false;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 详情
    getData(row) {
      this.No = row.pkNo; // 员工编号
      this.Shop = row.shopName; // 员工姓名
      this.Tel = row.Tel; // 联系电话
      this.dialogFormVisible1 = true;
    },
    // 修改
    changeOpen1() {
      this.$message({
        message: "修改成功",
        type: "success"
      });
    },
    changeData(row) {
      this.C_No = row.pkNo; // 编号
      this.C_Tel = row.Tel; // 联系电话
      this.C_WX = row.nickName;
      this.C_wxid = row.OpenId;
      this.C_Shop = row.fkshopNo; // 店铺
      this.dialogFormVisible2 = true;
    },
    changeWX(val) {
      this.C_wx = val;
    },
    upData() {
      let Client = localStorage.getItem("ClientAddr");
      let No = this.C_No; // 编号
      let Tel = this.C_Tel; // 联系电话
      let Shop = this.C_Shop; // 店铺
      let wx;
      if (!!this.C_wx) {
        wx = this.C_wx;
      } else {
        wx = this.C_wxid;
      }
      let changeNotice = axios.changeNotice(Client, Tel, Shop, No, wx);
      changeNotice.then(res => {
        if (res.data.State == "成功") {
          this.changeOpen1();
          this.getAllData();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible2 = false;
    },
    clearItem() {
      this.wxOptions = [];
      this.C_wx = "";
      this.C_WX = "";
      this.C_wxid = "";
    },
    // 删除
    delShow(row) {
      this.delNo = row.pkNo; // 编号
      this.delShop = row.shopName; // 店铺
      this.dialogFormVisible3 = true;
    },
    delopen() {
      this.$message({
        message: "删除成功",
        type: "success"
      });
    },
    del() {
      let Client = localStorage.getItem("ClientAddr");
      let delNotice = axios.delNotice(Client, this.delNo);
      delNotice.then(res => {
        if (res.data.State == "成功") {
          this.delopen();
          this.getAllData();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible3 = false;
    }
  }
};
</script>

<style scoped>
#Notice {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
dd {
  margin: 0px;
}
.block {
  margin-bottom: 10px;
}
.text {
  margin-top: 10px;
  margin-bottom: 10px;
}
.time_size {
  font-size: 10px;
}
.item {
  text-align: left;
}
.item1 {
  text-align: left;
  margin-bottom: 5px;
}
.item2 {
  text-align: left;
}
.time {
  font-size: 14px;
  color: #727377;
  line-height: 26px;
}
.xqfl,
.del {
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
.del1 {
  float: left;
  text-align: right;
  margin-right: 5px;
  width: 25%;
}
.del2 {
  float: left;
  text-align: left;
  width: 65%;
}
.tip {
  color: red;
  text-align: left;
  font-size: 14px;
  margin-top: 5px;
}
</style>
