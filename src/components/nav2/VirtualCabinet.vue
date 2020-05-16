<template>
  <div id="VirtualCabinet">
    <div class="ab">
      <el-row>
        <el-col>
          <span class="inc">收衣点</span>
        </el-col>
      </el-row>
      <!-- 查询 -->
      <el-row>
        <el-col>
          <div style="width: 100%;text-align:right">
            <el-button type="text" class="inquiry" @click="getSearch()">查 询</el-button>
          </div>
        </el-col>
      </el-row>
      <div v-show="inquire" class="top">
        <el-row>
          <el-col :span="20" :offset="2">
            收衣点查询：
            <el-select size="mini" v-model="inquireNum" style="width: 63%" placeholder="选择收衣点">
              <el-option
                v-for="(item,index) in allInco"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="15" :offset="9">
            <el-button class="confirm" size="mini" plain @click="allEmployee()">所有收衣点</el-button>
            <el-button class="confirm" size="mini" plain @click="shopNofilter()">确定</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 折叠面板 -- 收衣点 -->
      <el-collapse accordion class="showText">
        <el-collapse-item v-for="(inco,index) in filterInc" :key="index" class="titleBS">
          <template slot="title">
            <span style="text-indent:2em; color: #8B8B8B;">{{inco.name}}</span>
          </template>
          <div>
            <el-button type="success" size="mini" @click="go(inco)">袋子</el-button>
            <el-button type="info" size="mini" @click="getIncData(inco)">详情</el-button>
            <el-button type="primary" size="mini" @click="changeIncData(inco)">编辑</el-button>
            <el-button type="danger" size="mini" @click="dltIncole(inco)">删除</el-button>
            <el-button size="mini" @click="createQR(inco,index)">二维码</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 二维码表格 -->
      <div id="createQRbox">
        <table style="min-width: 100%;">
          <thead>
            <tr>
              <th>二维码生成数据</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(create,index) in jsonData" :key="index">
              <td>{{create}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 添加收衣点 -->
      <el-row>
        <el-col :span="24">
          <el-button @click="showIncome()" class="showIncome" type="primary" plain round>添加收衣点</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 收衣点详情 -->
    <el-dialog title="收衣点详情" :visible.sync="incoDetails" fullscreen>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">所属店铺号:</dd>
        <dd class="item2 xqfl2">{{incFkshopNo}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">设备ID:</dd>
        <dd class="item2 xqfl2">{{incId}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">收衣点名称:</dd>
        <dd class="item2 xqfl2">{{incName}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">地址:</dd>
        <dd class="item2 xqfl2">{{incaddress}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">类型:</dd>
        <dd class="item2 xqfl2">{{incType}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">柜子数量:</dd>
        <dd class="item2 xqfl2">
          <span>{{incAll}}</span>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item2">
          使用情况：使用
          <span>{{incUse}}</span>剩余
          <span>{{(incAll-incUse)}}</span>
        </dd>
      </dl>
    </el-dialog>
    <!-- 收衣点添加弹窗 -->
    <div class="a" style="margin:10px;display:none">
      <p>添加收衣点（虚拟柜）</p>
      <dl class="text">
        <dd class="item1">
          选择店铺:
          <el-select size="small" v-model="addNo" style="width: 63%;margin:10px" placeholder="选择店铺">
            <el-option
              v-for="(item,index) in incShop"
              :key="index"
              :label="item.Name"
              :value="item.No"
            ></el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">收衣点编号:</dd>
        <dd class="item">
          <el-input
            v-model="addNum"
            class="inp"
            style="width: 90%"
            @blur="addHint(`hint1`,`编号`)"
            clearable
            placeholder="输入八位字符，只可包含数字和大写字母"
          ></el-input>
          <span class="hint" id="hint1"></span>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">收衣点名称:</dd>
        <dd class="item">
          <el-input
            v-model="addName"
            class="inp"
            style="width: 90%"
            @blur="addHint(`hint2`,`名称`)"
            clearable
          ></el-input>
          <span class="hint" id="hint2"></span>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">电话:</dd>
        <dd class="item">
          <el-input v-model="tel" class="inp" style="width: 90%" clearable></el-input>
          <span class="hint" id="hint2"></span>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">收衣点地址:</dd>
        <dd class="item">
          <el-input
            v-model="addAddress"
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
        <el-button id="add" type="primary" :plain="true" @click="addInc()">添 加</el-button>
      </span>
    </div>
    <!-- 收衣点修改弹窗 -->
    <div class="b" style="margin:10px;display:none">
      <p>编辑</p>
      <dl class="text">
        <dd class="item1">收衣点编号:</dd>
        <dd class="item">{{chIncId}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          选择店铺:
          <el-select size="small" v-model="chIncNo" style="width: 63%;margin:10px">
            <el-option
              v-for="(item,index) in incShop"
              :key="index"
              :label="item.Name"
              :value="item.No"
            ></el-option>
          </el-select>
        </dd>
        <dd class="item"></dd>
      </dl>
      <dl class="text">
        <dd class="item1">收衣点名称:</dd>
        <dd class="item">
          <el-input v-model="chIncName" style="width: 90%" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">地址:</dd>
        <dd class="item">
          <el-input
            v-model="chIncAddress"
            type="textarea"
            resize="none"
            clearable
            style="min-height:22px;width:82%"
            id="yongchedidian"
            @focus="map_"
          ></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">电话:</dd>
        <dd class="item">
          <el-input v-model="changetel" type="textarea" resize="none" clearable></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button id="add" type="primary" @click="upDataInc()">修改</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import * as axios from "@/common/js/axiosServer.js";
let that, url;
export default {
  data() {
    return {
      incbags: "", //收衣袋
      jsonData: [], //二维码数据
      incShop: [], //收衣点店铺
      inquire: false,
      inquireNum: "",
      // 收衣点修改
      chIncId: "", //收衣点编号
      chIncNo: "", //店铺号
      chIncName: "", //名称
      chIncAddress: "", //地址
      changetel: "", // 修改收衣点的电话
      chsheng: "",
      chshi: "",
      chxian: "",
      incoDetails: false, //收衣点详情
      allInco: [], //所有收衣点
      filterInc: [], //查询收衣点
      incName: "", //收衣点名称
      incaddress: "", //地址
      incType: "", //类型
      incId: "", //设备
      incAll: "", //柜子数量
      incUse: "", //柜子使用数量
      incFkshopNo: "", //所属店铺号
      dialogFormVisible4: false, // 添加
      dialogFormVisible5: false, //修改收衣点
      //添加虚拟柜
      addNum: "", //编号
      addName: "", //名称
      addNo: "", //店铺号
      addAddress: "", //地址
      lng: "", //经
      lat: "",
      x_lat: "", //修改的经度
      x_lng: "", //修改的纬度
      addtype: "虚拟柜",
      // 上传的省市区
      sheng: "",
      shi: "",
      xian: "",
      tel: ""
    };
  },
  beforeCreate: function() {
    that = this;
  },
  created: function() {
    this.income();
  },
  mounted() {
    if (this.$route.query.type == "tianjia") {
      this.dialogFormVisible4 = true;
      this.addAddress = this.$route.query.addr; //地址
      let latng = this.$route.query.latng;
      this.lat = latng.split(",")[0];
      this.lng = latng.split(",")[1];
      console.log(this.lat, this.lng);
      if (this.$route.query.addNo != "") {
        this.addNo = this.$route.query.addNo;
      }
      if (this.$route.query.addNum != "") {
        this.addNum = this.$route.query.addNum;
      }
      if (this.$route.query.addName != "") {
        this.addName = this.$route.query.addName;
      }
    } else if (this.$route.query.type == "bianji") {
      this.dialogFormVisible5 = true;
      this.chIncAddress = this.$route.query.addr;
      let latng = this.$route.query.latng;
      this.x_lat = latng.split(",")[0];
      this.x_lng = latng.split(",")[1];
      if (this.$route.query.chIncNo != "") {
        this.chIncNo = this.$route.query.chIncNo;
      }
      if (this.$route.query.chIncName != "") {
        this.chIncName = this.$route.query.chIncName;
      }
      if (this.$route.query.chIncId != "") {
        this.chIncId = this.$route.query.chIncId;
      }
    }
  },
  methods: {
    cancel() {
      $(".ab").css("display", "block");
      $(".b").css("display", "none");
      $(".a").css("display", "none");
    },
    getEl(id) {
      return document.getElementById(id);
    },
    getName(name) {
      return document.getElementsByClassName(name);
    },
    //生成二维码表格
    s2ab(s) {
      if (typeof ArrayBuffer !== "undefind") {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
    },
    // downloadExl() {
    //   let tab = XLSX.utils.table_to_book(this.getEl(`createQRbox`));
    //   let wopt = {
    //     bookType: "xlsx",
    //     bookSST: false,
    //     type: "binary"
    //   };
    //   let wbout = XLSX.write(tab, wopt);
    //   FileSaver.saveAs(
    //     new Blob([this.s2ab(wbout)], {
    //       type: "application/octet-stream;charset=utf-8"
    //     }),
    //     "二维码生成数据.xlsx"
    //   );
    // },
    
    //获取表格数据
    makeTab() {
      let tab = XLSX.utils.table_to_book(this.getEl(`createQRbox`));
      let wopt = {
        bookType: "xlsx",
        bookSST: false,
        type: "binary"
      };
      let wbout = XLSX.write(tab, wopt);
      FileSaver.saveAs(
        new Blob([this.s2ab(wbout)], {
          type: "application/octet-stream;charset=utf-8"
        }),
        "二维码生成数据.xlsx"
      );
      this.jsonData = [];
    },
    // 表格
    getIncs(inco, index) {
      let Client = localStorage.getItem("ClientAddr");
      let id = inco.deviceID;
      let getDoor = axios.getDoor(Client, id);
      getDoor.then(res => {
        if (res.data.State == "成功") {
          this.incbags = res.data.Body;
          try {
            if (this.incbags[0].boxIndex) {
              for (let i = 0; i < this.incbags.length; i++) {
                url =
                  "http://" +
                  window.location.host +
                  "/WeChat/virtualBoxOrder.aspx?";
                url += "boxIndex=" + this.incbags[i].boxIndex; //袋子编号
                this.jsonData.push(url);
              }
              setTimeout(this.makeTab, 0);
            }
          } catch (error) {
            this.$message({
              message: `操作失败,该收衣点没有收衣袋`,
              type: "warning"
            });
          }
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    //收衣袋 ———— 生成二维码表格
    createQR(inco, index) {
      this.getIncs(inco, index);
    },
    //所有收衣点店铺
    getAllShop() {
      let shop = {};
      this.incShop = [];
      let Client = localStorage.getItem("ClientAddr");
      let allInc = axios.AllVirtualShop(Client, shop);
      let shopData;
      allInc
        .then(resp => {
          if (resp.data.State == `成功`) {
            let Data = resp.data.Body;
            for (let i = 0; i < Data.length; i++) {
              shopData = {
                Name: "",
                No: ""
              };
              shopData.Name = Data[i].No + "-" + Data[i].Name;
              shopData.No = Data[i].No;
              this.incShop.push(shopData);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //全部收衣点
    allEmployee() {
      this.inquireNum = "";
      this.income();
    },
    //查询
    shopNofilter() {
      let name = this.inquireNum;
      let Client = localStorage.getItem("ClientAddr");
      let queryInc = axios.queryInc(Client, name);
      queryInc
        .then(resp => {
          console.log(resp);
          this.filterInc = resp.data.Body;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //清空隐藏查询
    clearInc() {
      this.inquireNum = "";
      this.inquire = false;
      this.income();
    },
    getSearch() {
      this.inquireNum = "";
      this.inquire = !this.inquire;
      this.income();
    },
    // 所有收衣点
    income() {
      this.getAllShop();
      let inc = {
        deviceID: "",
        shopNo: "",
        type: "虚拟柜"
      };
      let Client = localStorage.getItem("ClientAddr");
      let allInc = axios.allIncome(Client, inc);
      allInc
        .then(resp => {
          if (resp.data.State == `成功`) {
            this.allInco = resp.data.Body;
            this.filterInc = this.allInco;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //袋子
    go(data) {
      this.$Common.value = this.value;
      this.$router.push({
        path: "/sarkbox",
        name: "sarkbox",
        params: {
          deviceID: data.deviceID
        }
      });
    },
    // 收衣点详情
    getIncData(row) {
      this.incoDetails = true;
      this.incName = row.name;
      this.incId = row.deviceID;
      this.incaddress = row.address;
      this.incType = row.type;
      this.incUse = parseInt(row.use);
      this.incFkshopNo = row.fkshopNo;
      this.incAll = parseInt(row.all);
    },
    // 添加收衣点信息
    addHint(hintid, str) {
      if (event.target.value == "") {
        this.getEl(hintid).innerText = str + `不能为空`;
      }
      event.target.onfocus = () => {
        event.target.parentNode.nextElementSibling.innerText = "";
      };
    },
    // 添加收衣点  按钮点击事件
    showIncome() {
      $(".ab").css("display", "none");
      $(".b").css("display", "none");
      $(".a").css("display", "block");
    },
    hideInco() {
      this.dialogFormVisible4 = false;
    },
    // 添加收衣点
    addInc() {
      let inc = {
        deviceID: this.addNum,
        name: this.addName,
        shopNo: this.addNo,
        address: this.addAddress,
        lng: this.lng,
        lat: this.lat,
        type: `虚拟柜`,
        province: this.sheng,
        city: this.shi,
        district: this.xian,
        tel: this.tel
      };
      let Client = localStorage.getItem("ClientAddr");
      if (
        !!!this.addNum ||
        !!!this.addName ||
        !!!this.addNo ||
        !!!this.addAddress
      ) {
        this.$message.error(`信息未填完整`);
        return;
      } else if (!/^[A-Z\d]{8}$/.test(this.addNum)) {
        this.getEl("hint1").innerText = "格式不正确";
        return;
      } else {
        let addStore = axios.addStore(Client, inc);
        addStore
          .then(resp => {
            if (resp.data.State == `成功`) {
              this.$message({
                message: `添加成功`,
                type: "success"
              });
              [this.addNum, this.addName, this.addNo, this.addAddress] = [""];
              this.cancel();
              this.income();
            } else if (resp.data.Reason.indexOf(`店铺号无效`) >= 0) {
              this.$message({
                message: `店铺号无效，检查店铺号是否正确`,
                type: "warning"
              });
            } else if (resp.data.Reason.indexOf(`设备id不重复`) >= 0) {
              this.$message({
                message: `操作失败,请确认设备id不重复与系统数据是否正常`,
                type: "warning"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 删除收衣点
    dltIncole(row) {
      let inc = {
        deviceID: row.deviceID
      };
      let Client = localStorage.getItem("ClientAddr");
      let deletSpot = axios.deletIncome(Client, inc);
      deletSpot
        .then(resp => {
          if (resp.data.State == `成功`) {
            this.$message({
              message: `删除成功`,
              type: "success"
            });
            this.income();
          } else {
            this.$message({
              message: `删除失败，该收衣点还有收衣袋`,
              type: "warning"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 修改收衣点
    changeIncData(row) {
      console.log(row);
      this.chIncId = row.deviceID;
      this.chIncName = row.name;
      this.chIncAddress = row.address;
      this.chIncNo = row.fkshopNo;
      this.x_lat = row.lat;
      this.x_lng = row.lng;
      this.changetel=row.tel
      $(".ab").css("display", "none");
      $(".b").css("display", "block");
      $(".a").css("display", "none");
    },
    //收衣点修改
    upDataInc() {
      let inc = {
        deviceID: this.chIncId,
        name: this.chIncName,
        shopNo: this.chIncNo,
        address: this.chIncAddress,
        lng: this.x_lng,
        lat: this.x_lat,
        province: this.chsheng,
        city: this.chshi,
        district: this.chxian,
        tel: this.changetel
      };
      let Client = localStorage.getItem("ClientAddr");
      if (!!!this.chIncNo || !!!this.chIncName || !!!this.chIncAddress) {
        this.$message({
          message: `信息未填写完整`,
          type: "warning"
        });
        return;
      } else {
        let changeInc = axios.changeIncome(Client, inc);
        changeInc
          .then(resp => {
            if (resp.data.State == `成功`) {
              this.$message({
                message: `修改成功`,
                type: "success"
              });
              this.cancel();
              this.income();
            } else if (resp.data.Reason.indexOf(`店铺号无效`) >= 0) {
              this.$message({
                message: `店铺号无效，检查店铺号是否正确`,
                type: "warning"
              });
              return;
            } else {
              console.log(resp.data);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    map_() {
      AMap.plugin("AMap.Autocomplete", function() {
        var auto = new AMap.Autocomplete({
          input: "yongchedidian"
        });
        AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
        function select(e) {
          that.chIncAddress = e.poi.district + e.poi.name;
          console.log(e);
          console.log(e.poi.location.lat);
          console.log(e.poi.location.lng);
          that.x_lat = e.poi.location.lat;
          that.x_lng = e.poi.location.lng;
          that.chsheng = e.poi.district.slice(
            0,
            e.poi.district.indexOf("省") + 1
          );
          that.chshi = e.poi.district.slice(
            e.poi.district.indexOf("省") + 1,
            e.poi.district.indexOf("市") + 1
          );
          that.chxian = e.poi.district.slice(e.poi.district.indexOf("市") + 1);
        }
      });
    },
    // 添加收衣点
    map_1() {
      AMap.plugin("AMap.Autocomplete", function() {
        var auto = new AMap.Autocomplete({
          input: "tj_map"
        });
        AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
        function select(e) {
          that.addAddress = e.poi.district + e.poi.name;
          that.lat = e.poi.location.lat;
          that.lng = e.poi.location.lng;
          console.log(
            e.poi.district.slice(0, e.poi.district.indexOf("省") + 1)
          ); // 省
          console.log(
            e.poi.district.slice(
              e.poi.district.indexOf("省") + 1,
              e.poi.district.indexOf("市") + 1
            )
          ); // 市
          console.log(e.poi.district.slice(e.poi.district.indexOf("市") + 1)); // 县
          that.sheng = e.poi.district.slice(
            0,
            e.poi.district.indexOf("省") + 1
          );
          that.shi = e.poi.district.slice(
            e.poi.district.indexOf("省") + 1,
            e.poi.district.indexOf("市") + 1
          );
          that.xian = e.poi.district.slice(e.poi.district.indexOf("市") + 1);
        }
      });
    }
  }
};
</script>

<style scoped>
#Management {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#viewImg {
  width: 90px;
  height: 60px;
}
dd {
  margin: 0px;
}
.block {
  margin-bottom: 10px;
}
.block-text {
  text-align: left;
  font-size: 14px;
  margin: 0px;
  margin-bottom: 5px;
}
.left {
  float: left;
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
  width: 20%;
}
.del2 {
  float: left;
  text-align: left;
  width: 70%;
}
.tip {
  color: red;
  text-align: left;
  font-size: 14px;
  margin-top: 5px;
}
#Img {
  width: 200px;
  height: 134px;
}
#detailsImg {
  width: 50px;
  height: 113px;
}
.el-col-offset-2 {
  display: flex;
  justify-content: space-evenly;
  padding: 0.5em 0;
}
.el-button--danger {
  font-size: 1em;
}
.showIncome {
  margin: 0.5em;
}
.item2 span {
  margin: 0 0.5em;
  color: blue;
}
.hint {
  display: block;
  height: 1em;
  color: red;
  text-indent: 1em;
}
#shopnav {
  height: 46px;
  line-height: 46px;
  margin-bottom: 10px;
}
.el-menu--horizontal > .el-menu-item {
  height: 46px;
  line-height: 46px;
}
.inc {
  font-size: 1.2em;
  font-weight: 600;
}
.inquiry {
  width: 4em;
  padding: 3px;
  position: relative;
  right: 1em;
}
.showText {
  height: calc(100vh - 170px);
  overflow-y: scroll;
}
.top {
  margin-bottom: 10px;
}
</style>
<style>
.titleBS .el-collapse-item__header {
  height: 32px;
  line-height: 32px;
}
.titleBS .el-collapse-item__content {
  padding-bottom: 15px;
}
#createQRbox {
  display: none;
}
</style>