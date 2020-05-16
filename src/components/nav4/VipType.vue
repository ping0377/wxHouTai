<template>
  <div id="VipType">
    <el-table ref="filterTable" :data="allData" style="width: 100%" height="calc(100vh - 108px)">
      <el-table-column
        prop="No"
        label="编号"
        align="center"
        min-width="60"
        fit="true"
        column-key="No"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="Name"
        label="名称"
        align="center"
        min-width="70"
        fit="true"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="图片" align="center" min-width="110" fit="true">
        <template slot-scope="scope">
          <img :src="scope.row.ImageUrl" id="viewImg" alt="Image" @error="showDefImage" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="80" fit="true">
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
      <el-button type="text" style="width: 100%;" @click="addData">添 加</el-button>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogFormVisible1" fullscreen>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">编号:</dd>
        <dd class="item2 xqfl2">{{No}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">名称:</dd>
        <dd class="item2 xqfl2">{{Name}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">有效期(天):</dd>
        <dd class="item2 xqfl2">{{lifeDate}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">工本费:</dd>
        <dd class="item2 xqfl2">{{gbMoney.toFixed(2)}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">充值赠送条件:</dd>
        <dd class="item2 xqfl2">{{givePoint.toFixed(2)}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">充值赠送金额:</dd>
        <dd class="item2 xqfl2">{{giveMoney.toFixed(2)}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">是否为团体卡:</dd>
        <dd class="item2 xqfl2">{{isBoon}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">卡展示折扣:</dd>
        <dd class="item2 xqfl2">{{discount}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">图片:</dd>
        <dd class="item2">
          <img :src="ImageUrl" id="Img" alt="Image" @error="showDefImage" />
        </dd>
      </dl>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible2" fullscreen>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <dl class="text">
          <dd class="item1">编号:</dd>
          <dd class="item">{{C_No}}</dd>
        </dl>
        <dl class="text">
          <dd class="item1">名称:</dd>
          <dd class="item">
            <el-form-item prop="C_Name" class="C_Name">
              <el-input v-model="ruleForm.C_Name" clearable></el-input>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">有效期(天):</dd>
          <dd class="item">
            <el-form-item prop="C_lifeD" class="C_lifeD">
              <el-input v-model="ruleForm.C_lifeD" clearable></el-input>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">工本费:</dd>
          <dd class="item">
            <el-form-item prop="C_gbM" class="C_gbM">
              <el-input v-model="ruleForm.C_gbM" clearable></el-input>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">充值赠送条件:</dd>
          <dd class="item">
            <el-form-item prop="C_giveP" class="C_giveP">
              <el-input v-model="ruleForm.C_giveP" clearable></el-input>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">充值赠送金额:</dd>
          <dd class="item">
            <el-form-item prop="C_giveM" class="C_giveM">
              <el-input v-model="ruleForm.C_giveM" clearable></el-input>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">是否为团体卡:</dd>
          <dd class="item">
            <el-form-item prop="C_giveM" class="C_giveM">
              <el-radio-group v-model="ruleForm.C_isteam">
                <el-radio :label="true">团体卡</el-radio>
                <el-radio :label="false">非团体卡</el-radio>
              </el-radio-group>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">卡展示折扣:</dd>
          <dd class="item">
            <el-form-item prop="C_giveM" class="C_giveM">
              <el-input type="number" v-model="ruleForm.C_rebate" clearable></el-input>
            </el-form-item>
          </dd>
        </dl>
      </el-form>
      <dl class="text">
        <!-- <dd class="item1">图片</dd> -->
        <dd class="item">
          <!-- <input type="file" ref="Img" id="Img"> -->
          <el-upload
            class="upload-demo"
            action
            :http-request="upImg"
            list-type="picture"
            accept=".jpeg, .png, .gif, .jpg"
            :limit="1"
            ref="upload1"
          >
            <span style="text-align: left;">图片:</span>
            <el-button size="small" type="primary">点击上传</el-button>
            <div class="prompt">只能上传jpg/png文件，且不超过1M</div>
          </el-upload>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="upData('ruleForm')">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogFormVisible3" width="90%" top="25vh">
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">卡号:</dd>
        <dd class="del2">{{delNo}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">名称:</dd>
        <dd class="del2">{{delName}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">是否为团体卡:</dd>
        <dd class="del2">{{isBoon}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">卡展示折扣:</dd>
        <dd class="del2">{{discount}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="del">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    // 工本费
    var checkGbM = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
      //带小数点的正则
    };
    // 充值赠送条件
    var checkGiveP = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    // 充值赠送金额
    var checkGiveM = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    // 有效期
    var checkLifeD = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else if (!/^\d{0,4}$/.test(value)) {
        callback(new Error("0~4位数数字"));
      } else {
        callback();
      }
    };
    return {
      changeImg: "",
      allData: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      // 详情
      Name: "",
      ImageUrl: "",
      No: "",
      gbMoney: 0,
      giveMoney: 0,
      givePoint: 0,
      lifeDate: 0,
      // 删除     略
      delNo: "",
      delName: "",
      isBoon: false,
      discount: "",
      // 修改
      ruleForm: {
        C_Name: "", // 名称
        C_gbM: 0, // 工本费
        C_giveM: 0, // 充值赠送金额
        C_giveP: 0, // 充值赠送条件
        C_lifeD: 0, // 有效期
        C_isteam: false, //是否为团体卡
        C_rebate: "" //卡展示折扣
      },
      rules: {
        // 名称
        C_Name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        // 工本费
        C_gbM: [{ validator: checkGbM, trigger: "blur" }],
        // 充值赠送金额
        C_giveM: [{ validator: checkGiveM, trigger: "blur" }],
        // 充值赠送条件
        C_giveP: [{ validator: checkGiveP, trigger: "blur" }],
        // 有效期
        C_lifeD: [{ validator: checkLifeD, trigger: "blur" }]
      },
      C_No: "",
      C_ImgUrl: ""
    };
  },
  created() {
    this.getAllData();
  },
  methods: {
    // 表格
    getAllData() {
      let Client = localStorage.getItem("ClientAddr");
      let getCardType = axios.getCardType(Client);
      let zhanwei = "./static/img/zhanwei.jpg";
      getCardType.then(res => {
        if (res.data.State == "成功") {
          for (var i = 0; i < res.data.Body.length; i++) {
            if (!!!res.data.Body[i].ImageUrl) {
              res.data.Body[i].ImageUrl = zhanwei;
            }
          }
          this.allData = res.data.Body;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
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
      let addCardType = axios.addCardType(Client);
      addCardType.then(res => {
        if (res.data.State == "成功") {
          this.getAllData();
          this.addOpen1();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 详情
    showDefImage() {
      event.target.src = "./static/img/zhanwei.jpg";
    },
    getData(row) {
      this.No = row.No;
      this.Name = row.Name;
      this.lifeDate = row.lifeDate;
      this.gbMoney = row.gbMoney;
      this.giveMoney = row.giveMoney;
      this.givePoint = row.givePoint;
      this.ImageUrl = row.ImageUrl;
      this.dialogFormVisible1 = true;
      row.isBoon == true
        ? (this.isBoon = "团体卡")
        : (this.isBoon = "非团体卡");
      this.discount = row.discount;
    },
    // 修改
    changeOpen1() {
      this.$message({
        message: "修改成功",
        type: "success"
      });
    },
    changeData(row) {
      this.C_No = row.No;
      this.ruleForm.C_Name = row.Name;
      this.ruleForm.C_lifeD = row.lifeDate;
      this.ruleForm.C_gbM = row.gbMoney;
      this.ruleForm.C_giveM = row.giveMoney;
      this.ruleForm.C_giveP = row.givePoint;
      this.ruleForm.C_isteam = row.isBoon;
      this.ruleForm.C_rebate = row.discount;
      this.changeImg = row.ImageUrl;
      this.dialogFormVisible2 = true;
    },
    //   upImg(){
    //     let img = this.$refs.Img;
    //     let Client = localStorage.getItem("ClientAddr");
    //     let file =img.files[0];
    //     let addImg = axios.addImg(Client, file);
    //     addImg.then((res) => {
    //       if(res.data.State == '成功'){
    //         this.C_ImgUrl = res.data.Body;
    //       }
    //     })
    //   },
    upImg(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        if (res.data.State == "成功") {
          this.C_ImgUrl = res.data.Body;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    upData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let Client = localStorage.getItem("ClientAddr");
          let imgUrl; //图片
          if (this.C_ImgUrl == "") {
            imgUrl = this.changeImg;
          } else {
            imgUrl = this.C_ImgUrl;
          }
          let name = this.ruleForm.C_Name; //名称
          let no = this.C_No; //编号
          let gbM = this.ruleForm.C_gbM; // 工本费
          let giveM = this.ruleForm.C_giveM; // 充值赠送金额
          let giveP = this.ruleForm.C_giveP; // 充值赠送条件
          let lifeD = this.ruleForm.C_lifeD; // 有效期
          let isteam = this.ruleForm.C_isteam; //是否为团体卡
          let discount = this.ruleForm.C_rebate; //折扣
          let changeTypeData = axios.changeTypeData(
            Client,
            name,
            imgUrl,
            lifeD,
            gbM,
            giveP,
            giveM,
            no,
            isteam,
            discount
          );
          changeTypeData.then(res => {
            if (res.data.State == "成功") {
              this.$refs.upload1.clearFiles();
              this.getAllData();
              this.changeOpen1();
            } else {
              this.$message.error(res.data.Reason);
            }
          });
          this.dialogFormVisible2 = false;
        }
      });
    },
    // 删除
    delShow(row) {
      this.dialogFormVisible3 = true;
      this.delNo = row.No;
      this.delName = row.Name;
      row.isBoon == true
        ? (this.isBoon = "团体卡")
        : (this.isBoon = "非团体卡");
      this.discount = row.discount;
    },
    delopen() {
      this.$message({
        message: "删除成功",
        type: "success"
      });
    },
    del() {
      let Client = localStorage.getItem("ClientAddr");
      let delCardType = axios.delCardType(Client, this.delNo);
      delCardType.then(res => {
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
.prompt{
  height: 20px;
  line-height: 30px;
  font-size: 12.5px;
  position: relative;
  right: -74px;
}
#VipType {
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
  width: 31%;
}
.del2 {
  float: left;
  text-align: left;
  width: 63%;
}
#Img {
  width: 140px;
}
</style>