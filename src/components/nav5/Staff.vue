<template>
  <div id="Staff">
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
          <el-button type="text" style="width: 100%; padding: 5px;" @click="inquiryShow()">查 询</el-button>
        </div>
      </el-col>
    </el-row>
    <div v-show="dialogFormVisible4">
      <el-row class="seachShop">
        <el-col :span="20" :offset="2">
          <!-- <el-input v-model="val" size="small" placeholder="请输入店铺号">
            <template slot="prepend" class="query">店铺号查询</template>
          </el-input>-->
          <span class="block-text">店铺查询:</span>
          <el-select class="left" size="mini" v-model="val" placeholder="请选择店铺" style="width: 70%">
            <!-- <el-option :label="select_l" :value="select_v"></el-option> -->
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="block">
            <span class="block-text">编号查询:</span>
            <el-input style="width:70%" size="mini" v-model="num" clearable></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <el-table
      ref="filterTable"
      :data="allData | shopNofilter"
      style="width: 100%"
      height="calc(100vh - 124px)"
    >
      <el-table-column
        prop="No"
        label="员工编号"
        align="center"
        min-width="80"
        fit="true"
        column-key="No"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="Name"
        label="员工姓名"
        align="center"
        min-width="80"
        fit="true"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="Shop"
        label="店铺"
        align="center"
        min-width="95"
        fit="true"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" align="center" min-width="65" fit="true">
        <template slot-scope="scope">
          <el-popover placement="left" trigger="click">
            <div>
              <el-button type="text" size="small" @click="getData(scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="changeData(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="delShow(scope.row)">开除</el-button>
            </div>
            <el-button type="text" slot="reference">操作</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%;">
      <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="addStaff = true">添 加</el-button>
    </div>
    <!-- 添加弹窗 -->
    <el-dialog title="添加员工" :visible.sync="addStaff" fullscreen>
      <dl class="text">
        <dd class="item1">
          <span class="star">*</span>员工名称:
        </dd>
        <dd class="item">
          <el-input v-model="addName" style="width: 90%" size="mini" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">联系电话:</dd>
        <dd class="item">
          <el-input v-model="addTel" style="width: 90%" size="mini" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">联系地址:</dd>
        <dd class="item">
          <el-input v-model="addWorkerAdd" style="width: 90%" size="mini" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          <span class="star">*</span>身份证号:
        </dd>
        <dd class="item">
          <el-input v-model="addIdNum" style="width: 90%" size="mini" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          <span class="star">*</span>性别:
        </dd>
        <dd class="item">
          <el-select size="mini" v-model="addSex" placeholder="请选择">
            <el-option value="男">男</el-option>
            <el-option value="女">女</el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          <span class="star">*</span>登陆密码:
        </dd>
        <dd class="item">
          <el-input
            v-model="addLoginPwd"
            show-password
            @focus="cleanTip"
            @blur="check"
            clearable
            style="width: 90%"
            size="mini"
          ></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          <span class="star">*</span>店铺选择:
        </dd>
        <dd class="item">
          <el-select v-model="addFkshopNo" placeholder="请选择店铺" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">备注:</dd>
        <dd class="item">
          <el-input v-model="addRemark" style="width: 90%" size="mini" clearable></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addStaff = false">取 消</el-button>
        <el-button id="add" type="primary" @click="addPersonnel()">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogFormVisible1" fullscreen>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">员工编号:</dd>
        <dd class="item2 xqfl2">{{No}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">员工姓名:</dd>
        <dd class="item2 xqfl2">{{Name}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">联系电话:</dd>
        <dd class="item2 xqfl2">{{Tel}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">身份证号:</dd>
        <dd class="item2 xqfl2">{{idNum}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">联系地址:</dd>
        <dd class="item2 xqfl2">{{workerAdd}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">性别:</dd>
        <dd class="item2 xqfl2">{{sex}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">登录密码:</dd>
        <dd class="item2 xqfl2">******</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">店铺:</dd>
        <dd class="item2 xqfl2">{{Shop}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">备注:</dd>
        <dd class="item2 xqfl2">{{Remark}}</dd>
      </dl>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible2" fullscreen>
      <dl class="text">
        <dd class="item1">员工编号：{{C_No}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1"><span class="star">*</span>员工姓名:</dd>
        <dd class="item">
          <el-input v-model="C_Name" placeholder="请输入员工姓名" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">联系电话:</dd>
        <dd class="item">
          <el-input v-model="C_Tel" placeholder="请输入联系电话" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">联系地址:</dd>
        <dd class="item">
          <el-input v-model="C_workerAdd" placeholder="请输入联系地址" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1"><span class="star">*</span>身份证号:</dd>
        <dd class="item">
          <el-input v-model="C_idNum" placeholder="请输入身份证号" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1"><span class="star">*</span>性别:</dd>
        <dd class="item">
          <el-select size="mini" v-model="C_sex" placeholder="请选择">
            <el-option value="男">男</el-option>
            <el-option value="女">女</el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1"><span class="star">*</span>登录密码:</dd>
        <dd class="item">
          <el-input
            v-model="C_loginPwd"
            type="password"
            show-password
            placeholder="请输入登录密码"
            @focus="cleanTip"
            @blur="check"
            clearable
          ></el-input>
        </dd>
        <dd v-show="tip" class="tip">密码不能为空</dd>
      </dl>
      <!-- <dl class="text">
        <dd class="item1">店铺:</dd>
        <dd class="item">
          <el-select v-model="C_Shop" placeholder="请选择店铺" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </dd>
      </dl>-->
      <dl class="text">
        <dd class="item1">备注:</dd>
        <dd class="item">
          <el-input
            type="textarea"
            v-model="C_Remark"
            placeholder="请输入内容"
            :autosize="{ minRows: 2, maxRows: 4}"
            clearable
          ></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="upData()">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="确认开除该员工?" :visible.sync="dialogFormVisible3" width="90%" top="25vh">
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">员工编号:</dd>
        <dd class="del2">{{delNo}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">员工姓名:</dd>
        <dd class="del2">{{delName}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="del">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 查询 -->
    <!-- <el-dialog title="查询"  fullscreen>
      <div class="block" :visible.sync="dialogFormVisible4">
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
      <div class="block">
        <span class="block-text">员工编号:</span>
        <el-input style="width: 70%" v-model="num" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="searchData()">查 询</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
let that;
export default {
  data() {
    return {
      allData: [],
      TypeOptions: null,
      addStaff: false, //添加弹窗
      addStaff: false, //添加员工弹窗
      addName: "", //名字
      addTel: "", //电话
      addWorkerAdd: "", //地址
      addIdNum: "", //身份证号
      addSex: "", //性别
      addLoginPwd: "", //登陆密码
      addFkshopNo: "", //店铺号
      addRemark: "", //备注
      dialogFormVisible1: false, // 详情
      dialogFormVisible2: false, // 修改
      dialogFormVisible3: false, // 删除
      dialogFormVisible4: false, // 查询
      // 查询
      view1: "",
      view2: "",
      val: "",
      select_l: "全部店铺",
      select_v: null,
      num: "",
      // 详情
      No: "", // 员工编号
      Name: "", // 员工姓名
      Tel: "", // 联系电话
      workerAdd: "", //联系地址
      idNum: "", // 身份证号
      sex: "", // 性别
      Shop: "", // 店铺
      Remark: "", // 备注
      // 删除
      delNo: "",
      delName: "",
      // 修改
      C_No: "", // 员工编号
      C_Name: "", // 员工姓名
      C_Tel: "", // 联系电话
      C_workerAdd: "", //联系地址
      C_idNum: "", // 身份证号
      C_sex: "", // 性别
      C_loginPwd: "", // 登录密码
      C_Shop: "", // 店铺
      options: [
        {
          label: `全部员工`,
          value: `全部员工`
        }
      ], // 店铺列表
      C_Remark: "", // 备注
      tip: false
    };
  },
  created() {
    this.getAllData();
    this.getOptions();
  },
  methods: {
    // 表格
    getAllData(sNo, wNo) {
      let Client = localStorage.getItem("ClientAddr");
      let shopNo = sNo;
      let workerNo = wNo;
      let searchStaff = axios.searchStaff(Client, shopNo, workerNo);
      searchStaff.then(res => {
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
    // 查询
    searchData() {
      let sNo = this.val;
      let wNo = this.num;
      this.getAllData(sNo, wNo);
      this.dialogFormVisible4 = false;
      this.viewSearch();
    },
    viewSearch() {
      if (this.options.length != 0) {
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].value == this.val) {
            this.view1 = this.options[i].label;
          } else if (!!!this.val) {
            this.view1 = "全部店铺";
            this.val = null;
          }
        }
        if (!!this.num) {
          this.view2 = this.num;
        } else {
          this.view2 = "全部员工";
        }
      }
    },
    // 添加
    // addOpen1() {
    //   this.$message({
    //     message: "添加成功",
    //     type: "success"
    //   });
    // },
    // addData() {
    //   let Client = localStorage.getItem("ClientAddr");
    //   let addStaff = axios.addStaff(Client);
    //   addStaff.then(res => {
    //     if (res.data.State == "成功") {
    //       this.addOpen1();
    //       this.getAllData();
    //     } else {
    //       this.$message.error(res.data.Reason);
    //     }
    //   });
    // },
    addPersonnel() {
      let inc = {
        Name: this.addName,
        Tel: this.addTel,
        workerAdd: this.addWorkerAdd,
        idNum: this.addIdNum,
        sex: this.addSex,
        loginPwd: this.addLoginPwd,
        fkshopNo: this.addFkshopNo,
        Remark: this.addRemark
      };
      // let idcardReg = /^[1-9][0-7]\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
      let idcardReg = /^\d*$/;
      if (
        this.addName == "" ||
        this.addIdNum == "" ||
        this.addSex == "" ||
        this.addLoginPwd == "" ||
        this.addFkshopNo == ""
      ) {
        this.$message({
          message: `信息未填写完整,带*为必填项`,
          type: "warning"
        });
        return;
      } else if (this.addTel != "" && !/^1[3456789]\d{9}$/.test(this.addTel)) {
        this.$message({
          message: `号码格式有误,请检查手机号`,
          type: "warning"
        });
        return;
      } else if (!idcardReg.test(this.addIdNum)) {
        this.$message({
          message: `身份证格式有误,请检查身份证号`,
          type: "warning"
        });
        return;
      }
      let Client = localStorage.getItem("ClientAddr");
      let AddPersonnel = axios.AddPersonnel(Client, inc);
      AddPersonnel.then(resp => {
        if (resp.data.State == "成功") {
          this.$message({
            message: `添加成功`,
            type: "success"
          });
          [
            this.addName,
            this.addTel,
            this.addWorkerAdd,
            this.addIdNum,
            this.addSex,
            this.addLoginPwd,
            this.addFkshopNo,
            this.addRemark
          ] = "";
          this.addStaff = false;
          this.getAllData();
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 详情
    getData(row) {
      this.No = row.No; // 员工编号
      this.Name = row.Name; // 员工姓名
      this.Tel = row.Tel; // 联系电话
      this.workerAdd = row.workerAdd; // 联系地址
      this.idNum = row.idNum; // 身份证号
      this.sex = row.sex; // 性别
      this.Shop = row.Shop; // 店铺
      this.Remark = row.Remark; // 备注
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
      this.C_No = row.No; // 员工编号
      this.C_Name = row.Name; // 员工姓名
      this.C_Tel = row.Tel; // 联系电话
      this.C_workerAdd = row.workerAdd; //联系地址
      this.C_idNum = row.idNum; // 身份证号
      this.C_sex = row.sex; // 性别
      this.C_loginPwd = row.loginPwd; // 登录密码
      let val = "";
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].label == row.Shop) {
          val = this.options[i].value;
          break;
        }
      }
      this.C_Shop = val; // 店铺
      this.C_Remark = row.Remark; // 备注
      this.dialogFormVisible2 = true;
    },
    cleanTip() {
      this.tip = false;
    },
    check() {
      if (!!this.C_loginPwd) {
        this.tip = false;
      } else {
        this.tip = true;
      }
    },
    upData() {
      let Client = localStorage.getItem("ClientAddr");
      let No = this.C_No; // 员工编号
      let Name = this.C_Name; // 员工姓名
      let Tel = this.C_Tel; // 联系电话
      let workerAdd = this.C_workerAdd; //联系地址
      let idNum = this.C_idNum; // 身份证号
      let sex = this.C_sex; // 性别
      let loginPwd = this.C_loginPwd; // 登录密码
      let Shop = this.C_Shop; // 店铺
      let Remark = this.C_Remark; // 备注
      if (!!Name && !!idNum && !!sex && !!loginPwd) {
        let changeStaff = axios.changeStaff(
          Client,
          Name,
          Tel,
          workerAdd,
          idNum,
          sex,
          loginPwd,
          Shop,
          Remark,
          No
        );
        changeStaff.then(res => {
          if (res.data.State == "成功") {
            this.changeOpen1();
            this.getAllData();
            this.dialogFormVisible2 = false;
          } else {
            this.$message.error(res.data.Reason);
          }
        });
      }else{
        this.$message({
          message: "修改失败,信息未填完整",
          type: "warning"
        });
        return;
      };
    },
    // 删除
    delShow(row) {
      this.delNo = row.No; // 员工编号
      this.delName = row.Name; // 员工姓名
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
      let delStaff = axios.delStaff(Client, this.delNo);
      delStaff.then(res => {
        if (res.data.State == "成功") {
          this.delopen();
          this.getAllData();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible3 = false;
    },
    //查询弹框
    inquiryShow() {
      this.dialogFormVisible4 = !this.dialogFormVisible4;
      this.val = "";
      this.num = "";
    }
  },

  beforeCreate: function() {
    that = this;
  },
  filters: {
    //查询过滤器
    shopNofilter: function(value) {
      let arrIcn = new Array();
      if (that.val == "全部员工") {
        return value;
      }
      if (!that.val && !that.num) {
        arrIcn = value;
      } else {
        for (let i = 0; i < value.length; i++) {
          if (
            (value[i].fkshopNo == that.val || !that.val) &&
            value[i].No.indexOf(that.num) != -1
          ) {
            arrIcn.push(value[i]);
          }
        }
      }
      return arrIcn;
    }
  }
};
</script>

<style scoped>
#Staff {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
dd {
  margin: 0px;
}
.block {
  margin-top: 10px;
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
.seachShop {
  padding: 10px 0;
  font-size: 14px;
}
.star {
  color: red;
  display: inline-block;
  margin-right: 3px;
}
</style>
