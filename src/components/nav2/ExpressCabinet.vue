<template>
  <div id="ExpressCabinet">
    <div class="ab">
      <div class="buttons">
        <el-button type="primary" style="width: 40%;" @click="add">添 加</el-button>
        <!-- <el-button type="primary" style="width: 40%;" @click="addDialog = true" plain>查 询</el-button> -->
      </div>
      <!-- 所有快递柜 -->
      <el-table ref="filterTable" :data="scaks" style="width: 100%;">
        <el-table-column prop="name" align="center" min-width="70" fit="true" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="address"
          align="center"
          min-width="120"
          fit="true"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" min-width="60" fit="true">
          <template slot-scope="scope">
            <el-button type="text" slot="reference" @click="getIncData(scope.row)">操作</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情以及修改过弹窗 -->
    <div class="b" style="margin:10px;display:none">
      <p>设置</p>
      <el-form :model="upform">
        <el-form-item label="设备ID :" :label-width="formLabelWidth" class="mainstr">
          <span>{{upform.deviceID}}</span>
        </el-form-item>
        <el-form-item label="快递柜名称 :" :label-width="formLabelWidth">
          <el-input v-model="upform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="address_item" label="地址 :" :label-width="formLabelWidth">
          <el-input v-model="upform.address" type="textarea" resize="none" clearable style="min-height:22px;width:82%"
          id="yongchedidian" @focus="map_"></el-input>
        </el-form-item>
        <el-form-item label="选择店铺 :" :label-width="formLabelWidth">
          <el-select size="small" v-model="upform.fkshopNo" style="width: 100%;" placeholder="选择店铺">
            <el-option
              v-for="(item,index) in incShop"
              :key="index"
              :label="item.Name"
              :value="item.No"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型 :" :label-width="formLabelWidth">
          <el-radio-group v-model="upform.type">
            <el-radio label="丰巢柜">丰巢柜</el-radio>
            <el-radio label="速递易">速递易</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">关 闭</el-button>
        <el-button type="info" @click="dltSack(upform.deviceID)">删 除</el-button>
        <el-button id="add" type="primary" @click="changeSack()">保存更改</el-button>
      </span>
    </div>
    <!-- 添加快递柜 -->
    <div class="a" style="margin:10px;display:none">
      <p>添加</p>
      <el-form :model="aform">
        <el-form-item label="快递柜名称 :" :label-width="formLabelWidth">
          <el-input v-model="aform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备ID :" :label-width="formLabelWidth">
          <el-input v-model="aform.deviceID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择店铺 :" :label-width="formLabelWidth">
          <el-select size="small" v-model="aform.fkshopNo" style="width: 100%;" placeholder="选择店铺">
            <el-option
              v-for="(item,index) in incShop"
              :key="index"
              :label="item.Name"
              :value="item.No"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="address_item"
          label="地址 :"
          :label-width="formLabelWidth"
          style="text-align:left"
        >
          <el-input v-model="aform.address" type="textarea" resize="none" clearable style="min-height:22px;width:82%"
          id="tj_map" @focus="map_1"></el-input>
        </el-form-item>
        <el-form-item label="类型 :" :label-width="formLabelWidth">
          <el-radio-group v-model="aform.type">
            <el-radio label="丰巢柜">丰巢柜</el-radio>
            <el-radio label="速递易">速递易</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">关 闭</el-button>
        <el-button type="primary" @click="addSack()">确认添加</el-button>
      </div>
    </div> 
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
// import { lazyAMapApiLoaderInstance } from "vue-amap";

let that
export default {
  beforeMount() {
    that = this;
  },
  mounted() {
    this.getallScak();
    this.getAllData();
  },
  data() {
    return {
      // searchOption: {
      //   city: "全国",
      //   citylimit: true
      // },
      scaks: [], //快递柜
      incShop: [], //所有店铺
      updateDialog: false, //详情修改框
      addDialog: false, //添加框
      formLabelWidth: "90px",
      upform: {},
      type: "", //类型
      aform: {
        deviceID: "",
        name: "",
        fkshopNo: "",
        address: "",
        lng: "",
        lat: "",
        type: ""
      },
      operate: "" //操作类型 -- 添加 or 修改
    };
  },
  methods: {
    //添加
    add() {
      $(".ab").css("display", "none");
      $(".b").css("display", "none");
      $(".a").css("display", "block");
    },
    cancel() {
      $(".ab").css("display", "block");
      $(".b").css("display", "none");
      $(".a").css("display", "none");
    },
    //获取所有快递柜
    getallScak() {
      let data = {
        type: "快递柜",
        deviceID: "",
        shopNo: ""
      };
      let that = this;
      let Client = localStorage.getItem("ClientAddr");
      let url = "Manager.ashx?Function=HttpGetCabinets";
      let allsack = axios.getallSack(Client, data, url);
      allsack.then(res => {
        if (res.data.State == "成功") {
          this.scaks = res.data.Body;
        }
      });
    },
    //操作
    getIncData(row) {
      $(".ab").css("display", "none");
      $(".b").css("display", "block");
      $(".a").css("display", "none");
      this.upform = row;
    },
    // 获取普通店铺
    getAllData() {
      let Client = localStorage.getItem("ClientAddr");
      let getAllShop = axios.getAllShop(Client);
      let shop = {};
      let allInc = axios.AllVirtualShop(Client, shop);
      let shops;
      allInc
        .then(resp => {
          if (resp.data.State == `成功`) {
            shops = resp.data.Body;
            getAllShop.then(res => {
              if (res.data.State == "成功") {
                // 普通店铺(不包含收衣点店铺)
                for (let i = 0; i < res.data.Body.length; i++) {
                  for (let l = 0; l < shops.length; l++) {
                    if (res.data.Body[i].No == shops[l].No) {
                      res.data.Body.splice(i, 1);
                    }
                  }
                }
                this.incShop = res.data.Body;
              } else {
                this.$message.error(res.data.Reason);
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //添加快递柜
    addSack() {
      let Client = localStorage.getItem("ClientAddr");
      let url = "Manager.ashx?Function=HttpAddExpressCabinet";
      if (
        this.aform.name == "" ||
        this.aform.deviceID == "" ||
        this.aform.address == "" ||
        this.aform.type == "" ||
        this.aform.fkshopNo == ""
      ) {
        this.$message.error("信息不全");
        return;
      } else if (this.aform.lat == "" || this.aform.lng == "") {
        this.$message.error("请重新选择街道");
        return;
      }
      let addsack = axios.getallSack(Client, this.aform, url);
      addsack
        .then(res => {
          if (res.data.State == "成功") {
            this.$message.success("添加成功");
            this.aform.name = "";
            this.aform.deviceID = "";
            this.aform.address = "";
            this.aform.type = "";
            this.aform.fkshopNo = "";
            this.aform.lng = "";
            this.aform.lat = "";
            this.getallScak();
            this.cancel();
          }else if(res.data.State == "失败" && res.data.Reason.indexOf("确认设备id没有被占用") != -1){
            this.$message.error("添加失败,该设备ID被占用")
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "添加失败"
          });
        });
    },
    //修改快递柜
    changeSack() {
      let Client = localStorage.getItem("ClientAddr");
      let url = "Manager.ashx?Function=HttpChangeExpressCabinet";
      console.log(this.upform);
      if (
        this.upform.name == "" ||
        this.upform.deviceID == "" ||
        this.upform.address == "" ||
        this.upform.type == "" ||
        this.upform.fkshopNo == ""
      ) {
        this.$message.error("信息不全");
        return;
      } else if (this.upform.lat == "" || this.upform.lng == "") {
        this.$message.error("请重新选择街道");
        return;
      }
      let changesack = axios.getallSack(Client, this.upform, url);
      changesack
        .then(res => {
          if (res.data.State == "成功") {
            this.$message.success("修改成功");
            this.cancel();
          }
        })
        .catch(error => {
          this.$message.error("修改失败");
        });
    },
    //删除快递柜
    dltSack(deviceID) {
      let Client = localStorage.getItem("ClientAddr");
      let url = "Manager.ashx?Function=HttpRemoveExpressCabinet";
      let data = {
        deviceID: deviceID
      };
      this.$confirm("此操作将删除该快递柜, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let dltsack = axios.getallSack(Client, data, url);
          dltsack.then(res => {
            if (res.data.State == "成功") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getallScak();
              this.cancel();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //街道选择
    // onSearchResult(pois) {
    //   let latSum = 0;
    //   let lngSum = 0;
    //   if (pois && pois.length > 0) {
    //     //如果长度为1则无需转化
    //     var poi = pois[0];
    //     var lng = poi["lng"];
    //     var lat = poi["lat"];
    //     if (this.operate == "change") {
    //       this.upform.lat = lat;
    //       this.upform.lng = lng;
    //       this.upform.address = poi.name
    //     } else if (this.operate == "add") {
    //       this.aform.lat = lat;
    //       this.aform.lng = lng;
    //       this.aform.address = poi.name
    //     }
    //   }
    // }
    map_() {
      AMap.plugin("AMap.Autocomplete", function() {
        var auto = new AMap.Autocomplete({
          input: "yongchedidian"
        });
        AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
        function select(e) {
          that.upform.address = e.poi.district + e.poi.name;
          console.log(e);
          console.log(e.poi.location.lat);
          console.log(e.poi.location.lng);
          that.upform.lat=e.poi.location.lat
          that.upform.lng=e.poi.location.lng
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
          that.aform.address = e.poi.district + e.poi.name;
          that.aform.lat = e.poi.location.lat;
          that.aform.lng = e.poi.location.lng;
        }
      });
    },
  }
};
</script>

<style scoped>
.buttons {
  width: 100%;
  top: 40px;
  background-color: rgb(236, 245, 253);
}
.title {
  font-weight: 600;
  font-size: 1.2em;
}
.amap {
  height: 82vh;
  margin-top: 10px;
}
.mainstr {
  text-align: left;
}
.address_item {
  text-align: left;
}
.address {
  width: 75%;
  display: inline-block;
}
.el-vue-search-box-container {
  height: 32px;
  border: 1px solid #dcdfe6;
}
</style>
<style>
#add_search .search-box-wrapper .search-btn,#change_search .search-box-wrapper .search-btn{
  display: none;
}
.amap-logo {
  display: none;
}
#ExpressCabinet .el-table thead {
  display: none;
}
#ExpressCabinet .buttons .el-button--primary {
  padding: 5px 0;
  margin: 3px 0;
}
</style>