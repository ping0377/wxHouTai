<template>
  <div id="ReservationSet">
    <!-- 预约件数设置 -->
    <el-row style="width: 100%; margin: 0px; text-align: left;" class="border" :gutter="20">
      <el-col :span="6">
        <p>预约件数设置</p>
      </el-col>
      <el-col :span="18" style="height: 36px; line-height: 36px;">
        <el-input v-model="tableData" style="width:80%;" type="number"></el-input>
        <el-button type="primary" size="small" @click="addClothsSum()">更新</el-button>
      </el-col>
    </el-row>
    <el-row style="width: 100%; margin: 0px; text-align: left;">
      <el-col :span="24">
        <!-- <el-table :data="tableData" style="width: 100%">
          <el-table-column label="编号" align="center" min-width="80" fit="true">
            <template slot-scope="scope">{{scope.$index + 1}}</template>
          </el-table-column>
          <el-table-column prop="num" label="预约件数" align="center" min-width="160" fit="true"></el-table-column>
          <el-table-column label="操作" align="center" min-width="80" fit="true">
            <template slot-scope="scope">
              <el-popover placement="left" trigger="click">
                <div>
                  <el-button
                    type="text"
                    size="small"
                    @click="changeClothsSum(scope.$index,scope.row)"
                  >修改</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="del(scope.$index,tableData,tableName)"
                  >删除</el-button>
                </div>
                <el-button type="text" slot="reference">操作</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table> -->
        <!-- <el-input v-model="tableData"></el-input> -->
      </el-col>
    </el-row>
    <!-- 预约时间设置 -->
    <el-row
      style="width: 100%; margin: 0px; text-align: left; padding-top: 5px;"
      class="border"
      :gutter="20"
    >
      <el-col :span="18">
        <p>预约时间设置</p>
      </el-col>
      <el-col :span="6" style="height: 36px; line-height: 36px;">
        <el-button type="primary" size="small" @click="addDate()">添加</el-button>
      </el-col>
    </el-row>
    <el-row style="width: 100%; margin: 0px; text-align: left;">
      <el-col :span="24">
        <el-table :data="timeData" style="width: 100%">
          <el-table-column label="编号" align="center" min-width="80" fit="true">
            <template slot-scope="scope">{{scope.$index + 1}}</template>
          </el-table-column>
          <el-table-column prop="time" label="预约时间" align="center" min-width="160" fit="true"></el-table-column>
          <el-table-column label="操作" align="center" min-width="80" fit="true">
            <template slot-scope="scope">
              <el-popover placement="left" trigger="click">
                <div>
                  <el-button type="text" size="small" @click="changeTime(scope.$index,scope.row)">修改</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="del(scope.$index,timeData,timeName)"
                  >删除</el-button>
                </div>
                <el-button type="text" slot="reference">操作</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 预约功能设置 -->
    <el-row class="fun">
      <el-col class="fun_top">
        <p class="set_up">预约功能设置</p>
        <el-button size="mini" type="primary" @click="upFun">UP</el-button>
      </el-col>
      <el-col class="set_up_title">功能设置</el-col>
      <el-col class="set_up_item">
        <span>是否开通店铺预约：</span>
        <el-switch class="switch" v-model="isShop"></el-switch>
      </el-col>
      <el-col class="set_up_item">
        <span>是否开通收衣点：</span>
        <el-switch class="switch" v-model="isPoint"></el-switch>
      </el-col>
      <el-col class="set_up_item">
        <span>是否开通快递柜下单：</span>
        <el-switch class="switch" v-model="isExpress"></el-switch>
      </el-col>
    </el-row>
    <!-- 图片 -->
    <dl>
      <el-row style="width: 100%; margin: 0px; text-align: left; padding-top: 5px;" :gutter="20">
        <el-col :span="18">
          <p>预约头部图片</p>
        </el-col>
        <el-col :span="6" style="height: 36px; line-height: 36px;">
          <template scope>
            <el-button type="primary" size="small" @click="dialogFormVisible3 = true">更新</el-button>
          </template>
        </el-col>
      </el-row>
      <el-row style="width: 100%; margin: 0px; margin-top: 10px;" :gutter="10">
        <el-col :span="24">
          <img :src="OrderTittleImg.Value" id="Img" alt="Image" @error="showDefImage" />
        </el-col>
      </el-row>
    </dl>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogFormVisible2" width="90%" top="25vh">
      <span>
        此操作将永久删除编号为
        <u>{{delIndex + 1}}</u>的数据
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="delData()">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 件数修改弹窗 -->
    <el-dialog title="预约件数修改" :visible.sync="dialogFormVisible" width="90%" top="25vh">
      <dl class="text xqfl">
        <dd class="item1 xqfl1">编号:</dd>
        <dd class="item xqfl2">{{c_Index + 1}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">预约件数:</dd>
        <dd class="item">
          <el-input v-model="C_num" placeholder="请输入预约件数" clearable></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upClothsSum()">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 时间修改弹窗 -->
    <el-dialog title="预约时间修改" :visible.sync="dialogFormVisible1" width="90%" top="25vh">
      <dl class="text xqfl">
        <dd class="item1 xqfl1">编号:</dd>
        <dd class="item xqfl2">{{c_Index + 1}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">预约时间:</dd>
        <dd class="item">
          <el-input v-model="C_time" placeholder="请输入预约时间" clearable></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="upTimeData()">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 图片弹窗 -->
    <el-dialog title="更新预约头部图片" :visible.sync="dialogFormVisible3" width="80%" top="25vh">
      <el-upload
        ref="upLoad"
        action="#"
        :http-request="addImg"
        :auto-upload="false"
        list-type="picture"
        accept=".jpeg, .png, .gif, .jpg"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    return {
      isShop: false,
      isPoint: false,
      isExpress: false,
      FunDatas: [], //预约功能设置
      OrderClothsSum: '', // 预约件数
      OrderDate: [], // 预约时间
      OrderTittleImg: {}, // 预约图片
      tableData: '0',  //数据
      timeData: [],
      // 修改
      c_Index: "",
      dialogFormVisible: false,
      C_num: "",
      dialogFormVisible1: false,
      C_time: "",
      // 删除
      dialogFormVisible2: false,
      delRow: [],
      delIndex: "",
      tableName: "",
      timeName: "",
      // 图片
      dialogFormVisible3: false,
      ImgUrl: ""
    };
  },
  created() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      let Client = localStorage.getItem("ClientAddr");
      let getReservationSet = axios.getReservationSet(Client);
      getReservationSet.then(res => {
        console.log(res)
        if (res.data.State == "成功") {
          this.getData(res.data.Body);
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    getData(data) {
      // this.OrderClothsSum = ;
      this.OrderDate = [];
      this.OrderTittleImg = {};
      for (let i = 0; i < data.length; i++) {
        switch (data[i].Name) {
          case "OrderClothsSum":
            this.OrderClothsSum=data[i].value;
            break;
          case "OrderDate":
            this.OrderDate.push(data[i]);
            break;
          case "funSetting":
            let funsetting = JSON.parse(data[i].Value)
            this.isShop = funsetting[0].isShop;
            this.isPoint = funsetting[1].isPoint;
            this.isExpress = funsetting[2].isExpress;
            break;
          default:
            this.OrderTittleImg = data[i];
        }
      }
      this.getTableData();
      this.getTimeData();
    },
    getTableData() {
      let str = this.OrderClothsSum;
      // str = str[0].Value;
      // let obj;
      if (!!str) {
        // obj = JSON.parse(str);
        this.tableData = str;
      } else {
        this.tableData = 0;
      }
      this.tableName = this.OrderClothsSum[0].Name;
    },
    getTimeData() {
      let str = this.OrderDate;
      str = str[0].Value;
      let obj;
      if (!!str) {
        obj = JSON.parse(str);
        this.timeData = obj;
      } else {
        this.timeData = [];
      }
      this.timeName = this.OrderDate[0].Name;
    },
    // 添加预约减数
    addClothsSum() {
      // if (this.tableData.length < 6) {
        // this.tableData.push({ num: "999" });
        let Client = localStorage.getItem("ClientAddr");
        let data = this.tableData;
        // let value = JSON.stringify(data);
        let setReservation = axios.setReservation(
          Client,
          data,
          "OrderClothsSum"
        );
        setReservation.then(res => {
          console.log(res)
          if (res.data.State == "成功") {
            this.$message.success("添加成功");
            this.getAllData();
          } else {
            this.$message.error(res.data.Reason);
          }
        });
      // } else {
      //   this.$message.warning("添加的数量不能超过6条");
      // }
    },
    addDate() {
      if (this.timeData.length < 6) {
        this.timeData.push({ time: "0:00-24:00" });
        let Client = localStorage.getItem("ClientAddr");
        let data = this.timeData;
        let value = JSON.stringify(data);
        console.log(data, value, JSON.parse(value));
        let setReservation = axios.setReservation(Client, value, "OrderDate");
        setReservation.then(res => {
          if (res.data.State == "成功") {
            this.$message.success("添加成功");
            this.getAllData();
          } else {
            this.$message.error(res.data.Reason);
          }
        });
      } else {
        this.$message.warning("添加的数量不能超过6条");
      }
    },
    // 修改
    changeClothsSum(index, data) {
      this.c_Index = index;
      this.C_num = data.num;
      this.dialogFormVisible = true;
    },
    upClothsSum() {
      let reg = /^[0-9]+$/;
      if (reg.test(this.C_num)) {
        this.tableData[this.c_Index].num = this.C_num;
      } else {
        this.tableData[this.c_Index].num = "0";
      }
      let Client = localStorage.getItem("ClientAddr");
      let data = this.tableData;
      let value = JSON.stringify(data);
      let setReservation = axios.setReservation(
        Client,
        value,
        "OrderClothsSum"
      );
      setReservation.then(res => {
        if (res.data.State == "成功") {
          this.$message.success("修改成功");
          this.getAllData();
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    changeTime(index, data) {
      this.c_Index = index;
      this.C_time = data.time;
      this.dialogFormVisible1 = true;
    },
    upTimeData() {
      if (!!this.C_time) {
        this.timeData[this.c_Index].time = this.C_time;
      }
      let Client = localStorage.getItem("ClientAddr");
      let data = this.timeData;
      let value = JSON.stringify(data);
      let setReservation = axios.setReservation(Client, value, "OrderDate");
      setReservation.then(res => {
        if (res.data.State == "成功") {
          this.$message.success("修改成功");
          this.getAllData();
          this.dialogFormVisible1 = false;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 删除
    del(index, data, name) {
      this.delIndex = index;
      this.delRow = data;
      this.delName = name;
      this.dialogFormVisible2 = true;
    },
    delData() {
      this.delRow.splice(this.delIndex, 1);
      let Client = localStorage.getItem("ClientAddr");
      let data = this.delRow;
      let value = JSON.stringify(data);
      let name = this.delName;
      let setReservation = axios.setReservation(Client, value, name);
      setReservation.then(res => {
        if (res.data.State == "成功") {
          this.$message.success("删除成功");
          this.getAllData();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible2 = false;
    },
    // 图片
    showDefImage() {
      event.target.src = "./static/img/zhanwei.jpg";
    },
    addImg(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        if (res.data.State == "成功") {
          this.ImgUrl = res.data.Body;
          this.setImg();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    setImg() {
      let Client = localStorage.getItem("ClientAddr");
      let value = this.ImgUrl;
      let setReservation = axios.setReservation(
        Client,
        value,
        "OrderTittleImg"
      );
      setReservation.then(res => {
        if (res.data.State == "成功") {
          this.$message.success("更新成功");
          this.getAllData();
          this.$refs.upLoad.clearFiles();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible3 = false;
    },
    submitUpload() {
      this.$refs.upLoad.submit();
    },
    //更新预约功能设置
    upFun() {
      let datas = [
        { "isShop": this.isShop },
        { "isPoint": this.isPoint },
        { "isExpress": this.isExpress }
      ];
      let Client = localStorage.getItem("ClientAddr");
      let data = JSON.stringify(datas);
      let setReservation = axios.setReservation(Client, data, "funSetting");
      setReservation
        .then(res => {
          if(res.data.State == "成功"){
            this.$message.success("预约功能更新成功")
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
#ReservationSet {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
p {
  padding: 0px 10px;
  margin: 8px 0px;
  font-size: 15px;
  color: #5b5b5b;
}
u {
  font-weight: bold;
  text-decoration: none;
  color: red;
  font-size: 16px;
}
dd {
  margin: 0px;
}
#Img {
  width: 90%;
  height: 200px;
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
/* 预约功能设置 */
.fun {
  padding: 0 10px;
  border-bottom: 2px solid #ebeef5;
}
.fun_top button {
  position: relative;
  right: 15px;
}
.set_up {
  text-align: left;
  display: inline-block;
  width: 78%;
}
.set_up_title {
  color: #909399;
  font-weight: 600;
  font-size: 16px;
}
.set_up_item {
  height: 45px;
  line-height: 45px;
  color: rgb(64, 73, 124);
  text-align: left;
  text-indent: 2em;
  font-size:15px;
}
.set_up_item .switch {
  height: 45px;
  line-height: 45px;
  position: absolute;
  right: 15%;
}
</style>