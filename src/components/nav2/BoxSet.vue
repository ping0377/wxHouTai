<template>
  <div id="BoxSet">
    <div class="ab">
      <el-row>
        <el-col :span="18">
          <el-select v-model="value" filterable placeholder="请选择" class="selectBS">
            <el-option
              v-for="item in shoplist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <div style="width: 100%;">
            <el-button type="text" style="width: 100%; padding: 5px;" @click="search()">查 询</el-button>
          </div>
        </el-col>
      </el-row>
      <el-collapse accordion class="showText">
        <el-collapse-item v-for="(item,index) in boxlist" :key="index" class="titleBS">
          <template slot="title">
            <span style="padding-left: 10px; color: #8B8B8B;">{{item.name}}</span>
          </template>
          <div>
            <el-button size="mini" type="success" class="buttonBS" @click="go(item)">柜门</el-button>
            <el-button size="mini" type="info" class="buttonBS" @click="getData(item)">详情</el-button>
            <el-button size="mini" type="primary" class="buttonBS" @click="change(item)">编辑</el-button>
            <el-button size="mini" type="danger" class="buttonBS" @click="del(item)">删除</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div style="width: 100%;">
        <div>
          <el-button
            type="text"
            style="width: 49%; padding: 7px 0px;"
            @click="add_Box"
          >添 加</el-button>
          <el-button
            type="text"
            style="width: 49%; padding: 7px 0px; margin: 0px;"
            @click="Sum()"
          >统 计</el-button>
        </div>
      </div>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog
      title="详情"
      :visible.sync="dialogFormVisible1"
      width="90%"
      top="25vh"
      class="dialogBS"
    >
      <dl class="text xqfl">
        <dd class="item1 xqfl1">智能柜编号:</dd>
        <dd class="item xqfl2">{{deviceID}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">智能柜名称:</dd>
        <dd class="item xqfl2">{{name}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">智能柜地址:</dd>
        <dd class="item xqfl2">{{address}}</dd>
      </dl>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <div class="b" style="margin:10px;display:none">
      <p>编辑</p>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">智能柜编号:</dd>
        <dd class="item xqfl2">{{c_ID}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">智能柜名称:</dd>
        <dd class="item">
          <el-input v-model="c_name" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">智能柜地址:</dd>
        <dd class="item">
          <el-input
            v-model="c_address"
            type="textarea"
            resize="none"
            clearable
            style="min-height:22px;width:82%"
            id="yongchedidian"
            @focus="map_"
          ></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="changeData()">确 认</el-button>
      </span>
    </div>
    <!-- 删除弹窗 -->
    <el-dialog
      title="确认删除？"
      :visible.sync="dialogFormVisible3"
      width="90%"
      top="23vh"
      class="dialogBO"
    >
      <dl class="text">
        <dd>智能柜编号:</dd>
        <dd>{{delID}}</dd>
      </dl>
      <dl class="text">
        <dd>智能柜名称:</dd>
        <dd>{{delName}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="delData()">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 添加弹窗 -->
    <div class="a" style="margin:10px;display:none">
      <p>添加</p>
      <dl class="text">
        <dd class="item1">选择店铺:</dd>
        <dd class="item">
          <el-select v-model="addshopNo" filterable placeholder="请选择" class="selectBS">
            <el-option
              v-for="item in shoplist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">智能柜编号:</dd>
        <dd class="item">
          <el-input v-model="addID" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">智能柜名称:</dd>
        <dd class="item">
          <el-input v-model="addName" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">智能柜地址:</dd>
        <dd class="item">
          <el-input
            v-model="a_address"
            type="textarea"
            resize="none"
            clearable
            style="min-height:22px;width:82%"
            id="tj_map"
            @focus="map_1"
          ></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addData()">确 认</el-button>
      </span>
    </div>
    <!-- 统计弹窗 -->
    <el-dialog
      title="统计"
      :visible.sync="dialogFormVisible5"
      width="90%"
      top="25vh"
      class="dialogBS"
    >
      <dl class="text xqfl">
        <dd class="item1 xqfl1">智能柜总数:</dd>
        <dd class="item xqfl2">{{allSum}}个</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">当前店铺智能柜数量:</dd>
        <dd class="item xqfl2">{{sum}}个</dd>
      </dl>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
import { JsonPost } from "@/common/js/axiosServer.js";
let that
export default {
  beforeMount() {
    that = this;
  },
  data() {
    return {
      addshopNo: "", //添加洗衣柜店铺号
      href:
        "http://apis.map.qq.com/tools/locpicker?search=1&type=0&key=7Y7BZ-YWG6D-R3O4A-P45VJ-7EEYK-XPBIF&referer=myapp",
      value: "",
      shoplist: [],
      boxlist: [],
      allBox: [],
      // 详情
      dialogFormVisible1: false,
      address: "",
      deviceID: "",
      name: "",
      // 编辑
      dialogFormVisible2: false,
      c_ID: "",
      c_address: "",
      c_name: "",
      c_lat: "",
      c_lng: "",
      c_shopno: "",
      // 删除
      dialogFormVisible3: false,
      delName: "",
      delID: "",
      // 添加
      dialogFormVisible4: false,
      addName: "",
      a_address: "",
      addID: "",
      boxInfo: [],
      t_lng: "", //经度
      t_lat: "",
      // 统计
      dialogFormVisible5: false,
      allSum: 0,
      sum: 0
    };
  },
  created() {
    this.getShop();
  },
  mounted() {
    // console.log(this.$route.query.name); //从地址栏拿数据
    if (this.$route.query.type == "tianjia") {
      this.a_address = this.$route.query.addr; //地址
      let latng = this.$route.query.latng;
      this.lat = latng.split(",")[0];
      this.lng = latng.split(",")[1];
      if (this.$route.query.addID != "") {
        this.addID = this.$route.query.addID;
      }
      if (this.$route.query.addName != "") {
        this.addName = this.$route.query.addName;
      }
    } else if (this.$route.query.type == "bianji") {
      this.dialogFormVisible2 = true;
      this.c_address = this.$route.query.addr;
      let latng = this.$route.query.latng;
      this.c_lat = latng.split(",")[0];
      this.c_lng = latng.split(",")[1];
      if (this.$route.query.c_name != "") {
        this.c_name = this.$route.query.c_name;
      }
    }
  },
  methods: {
    add_Box(){
      $(".ab").css("display", "none");
      $(".b").css("display", "none");
      $(".a").css("display", "block");
    },
    cancel() {
      $(".ab").css("display", "block");
      $(".b").css("display", "none");
      $(".a").css("display", "none");
    },
    getBox() {
      let gt = JsonPost("WeChatUser.ashx?Function=HttpCabinetApi", {
        deviceID: this.addID,
        comd: "GetLockerInfo"
      });
      gt.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.addBoxs(res.data.Body.boxInfo);
          return;
        }
        this.$message.error(res.data.Reason);
      });
    },
    addBoxs(boxs) {
      let gt = JsonPost("Manager.ashx?Function=HttpChangeCabinetLocker", {
        deviceID: this.addID,
        boxInfo: boxs
      });
      gt.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.getAllData(this.value);
          this.dialogFormVisible4 = false;
          this.addName = "";
          this.a_address = "";
          this.addID = "";
          this.$message.success("添加成功");
          return;
        }
        this.$message.error(res.data.Reason);
      });
    },
    getShop() {
      let Client = localStorage.getItem("ClientAddr");
      let getShop = axios.getShop(Client);
      this.shoplist = [];
      getShop.then(res => {
        if (res.data.State == "成功") {
          let data = res.data.Body;
          for (let i = 0; i < data.length; i++) {
            this.shoplist.push({ value: data[i].ShopNo, label: data[i].Name });
          }
          this.getAllData();
          // console.log(this.$Common.value)
          // if (!this.$Common.value) {
          //   this.getAllData(res.data.Body[0].ShopNo);
          //   this.value = res.data.Body[0].ShopNo;
          // } else {
          //   this.getAllData(this.$Common.value);
          //   this.value = this.$Common.value;
          // }
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    getAllData(no) {
      let type = "实体柜";
      let Client = localStorage.getItem("ClientAddr");
      let getBox = axios.getBox(Client, type, no);
      getBox.then(res => {
        if (res.data.State == "成功") {
          if (res.data.Body == "抱歉，您要找的内容不存在") {
            this.boxlist = [];
            this.$message.error("该店铺暂无智能柜");
          } else {
            this.boxlist = res.data.Body;
          }
          // this.getAllBox();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    go(data) {
      this.$Common.value = this.value;
      this.$router.push({
        path: "/boxopen",
        name: "boxopen",
        params: {
          deviceID: data.deviceID
        }
      });
    },
    search() {
      this.getAllData(this.value);
    },
    getData(data) {
      this.address = data.address;
      this.deviceID = data.deviceID;
      this.name = data.name;
      this.dialogFormVisible1 = true;
    },
    change(data) {
      console.log(data);
      this.c_ID = data.deviceID;
      this.c_name = data.name;
      this.c_address = data.address;
      this.c_lat = data.lat;
      this.c_lng = data.lng;
      this.c_shopno = data.fkshopNo;
      $(".ab").css("display", "none");
      $(".b").css("display", "block");
      $(".a").css("display", "none");
    },
    changeData() {
      let Client = localStorage.getItem("ClientAddr");
      let obj = {
        name: this.c_name,
        shopNo: this.c_shopno,
        address: this.c_address,
        deviceID: this.c_ID,
        lng: this.c_lng,
        lat: this.c_lat,
        type: "实体柜"
      };
      let changeBox = axios.changeBox(Client, obj);
      changeBox.then(res => {
        if (res.data.State == "成功") {
          this.getAllData(this.value);
          this.cancel();
          this.$message.success("编辑成功");
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    del(data) {
      this.delID = data.deviceID;
      this.delName = data.name;
      this.dialogFormVisible3 = true;
    },
    delData() {
      let that = this;
      console.log(this.delID);
      var dleId = this.delID;
      var msg = this.$message;
      let gt = JsonPost("Manager.ashx?Function=HttpGetLocker", {
        deviceID: this.delID
      });
      gt.then(res => {
        console.log(res);
        var status = true;
        if (res.data.State == "成功") {
          res.data.Body.forEach((item, i) => {
            if (item.state == 1) {
              msg.error("删除失败,该柜子中还有订单没有结束");
              status = false;
              return;
            }
          });
          if (!status) {
            return;
          }
          if (res.data.Body.length > 0) {
            delDools(res.data.Body);
          } else {
            this.deBox();
          }
          return;
        }
        msg.error(res.data.Reason);
      });

      function delDools(boxs) {
        let gt = JsonPost("Manager.ashx?Function=HttpRemoveCabinetLocker", {
          deviceID: dleId,
          boxInfo: boxs
        });
        gt.then(res => {
          if (res.data.State == "成功") {
            that.deBox();
            return;
          }
          msg.error(res.data.Reason);
        });
      }
    },
    deBox() {
      let msg = this.$message;
      let Client = localStorage.getItem("ClientAddr");
      let delBox = axios.delBox(Client, this.delID);
      delBox.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.getAllData(this.value);
          this.dialogFormVisible3 = false;
          msg.success("删除成功");
        } else {
          msg.error(res.data.Reason);
        }
      });
    },
    addData() {
      if (!this.addID) {
        this.$message.warning("编号不能为空");
      } else if (!this.addName) {
        this.$message.warning("名称不能为空");
      } else if (!this.addshopNo) {
        this.$message.warning("请选择店铺");
      } else {
        let j = 0;
        for (let i = 0; i < this.allBox.length; i++) {
          if (this.addID == this.allBox[i].deviceID) {
            j = 1;
          }
        }
        if (j == 0) {
          let Client = localStorage.getItem("ClientAddr");
          let obj = {
            name: this.addName,
            shopNo: this.addshopNo,
            address: this.a_address,
            deviceID: this.addID,
            lat: this.lat,
            lng: this.lng,
            type: "实体柜"
          };
          let addBox = axios.addBox(Client, obj);
          addBox.then(res => {
            if (res.data.State == "成功") {
              this.cancel();
              this.getAllData();
              this.$message.success("添加成功");
            } else {
              this.$message.error(res.data.Reason);
            }
          });
        } else {
          this.$message.warning("编号已存在");
        }
      }
    },
    getAllBox() {
      let Client = localStorage.getItem("ClientAddr");
      let getBox = axios.getBox(Client, "实体柜");
      getBox.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.allBox = res.data.Body;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    Sum() {
      this.allSum = this.allBox.length;
      this.sum = this.boxlist.length;
      this.dialogFormVisible5 = true;
    },
    map_() {
      AMap.plugin("AMap.Autocomplete", function() {
        var auto = new AMap.Autocomplete({
          input: "yongchedidian"
        });
        AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
        function select(e) {
          that.c_address = e.poi.district + e.poi.name;
          console.log(e);
          console.log(e.poi.location.lat);
          console.log(e.poi.location.lng);
          that.c_lat = e.poi.location.lat;
          that.c_lng = e.poi.location.lng;
        }
      });
    },
    map_1() {
      AMap.plugin("AMap.Autocomplete", function() {
        var auto = new AMap.Autocomplete({
          input: "tj_map"
        });
        AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
        function select(e) {
          that.a_address = e.poi.district + e.poi.name;
          that.lat = e.poi.location.lat;
          that.lng = e.poi.location.lng;
        }
      });
    }
  }
};
</script>

<style>
.selectBS {
  width: 100%;
}
.selectBS .el-input__inner {
  height: 26px !important;
  line-height: 26px !important;
  border: 0px !important;
  font-size: 13px !important;
  text-align: center !important;
}
.selectBS .el-input__icon {
  line-height: 26px !important;
}
.titleBS .el-collapse-item__header {
  height: 32px !important;
  line-height: 32px !important;
}
.titleBS .el-collapse-item__content {
  padding-bottom: 15px;
}
.dialogBS .el-dialog .el-dialog__body {
  padding: 10px 20px 20px 20px !important;
}
</style>

<style scoped>
#BoxSet {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
dd {
  margin: 0px;
}
.el-popper {
  margin-top: 0px;
}
.showText {
  height: calc(100vh - 126px);
  overflow-y: scroll;
}
.buttonBS {
  padding: 5px 14px;
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