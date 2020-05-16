<template>
  <div class="fx" v-show="menu">
    <!-- 头部搜索框 -->
    <div class="header">
      <el-row>
        <el-col :span="18">
          <el-input placeholder="请输入电话或者名称搜索..." v-model="input_value"></el-input>
        </el-col>
        <el-col :span="6" align="left">
          <el-button icon="el-icon-search" @click="search()" type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 分销商列表 -->
    <div class="fx_list">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand" align="center">
            <template slot-scope="props">
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="编号">
                  <span>{{ props.row.pkNo }}</span>
                </el-form-item>
                <el-form-item label="座机">
                  <span>{{ props.row.tel }}</span>
                </el-form-item>
                <el-form-item label>
                  <el-button type="danger" @click="fx_change(props.row)">修改</el-button>
                  <!-- 修改分销商信息 -->
                  <el-dialog title="修改分销商信息" :visible.sync="show_changefx" width="99%">
                    <el-form :model="form">
                      <el-form-item label="分销名称">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                      <el-form-item label="编号">
                        <el-input v-model="form.pkNo" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="手机">
                        <el-input v-model="form.phone"></el-input>
                      </el-form-item>
                      <el-form-item label="座机">
                        <el-input v-model="form.tel"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="show_changefx = false">取 消</el-button>
                      <el-button type="primary" @click="sure_changefx">确 定</el-button>
                    </div>
                  </el-dialog>
                  <el-button type="primary" @click="go(props.row)">统计</el-button>
                  <br />
                  <el-button
                    type="primary"
                    @click="fuzhi(props.row)"
                    v-clipboard:copy="copemessage"
                    v-clipboard:success="onCopy"
                  >复制链接</el-button>
                  <el-button type="primary" @click="save_qrCode">保存二维码</el-button>
                  <!-- 二维码 -->
                  <div id="qrcode"></div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="电话" prop="phone"></el-table-column>
          <el-table-column label="订单数" prop="ReserveCount"></el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
    
<script>
import * as axios from "@/common/js/axiosServer.js";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      copemessage: "",
      input_value: "", // 头部输入搜索的内容
      menu: true, //组件的显示和隐藏
      show_changefx: false, //显示修改分销商信息弹窗
      form: {},
      tableData: [
        //分销商列表数据
      ]
    };
  },
  mounted() {
    // 获取所有的分销商信息列表
    let Client = localStorage.getItem("ClientAddr");
    let url = `Manager.ashx?Function=HttpQueryPartnerByNameAndTel`;
    let getfxs = axios.get_fxs(url, Client);
    getfxs.then(res => {
      if (res.data.State == "成功") {
        this.tableData = res.data.Body;
      } else {
        this.$message(res.data.Reason);
      }
    });
  },
  methods: {
    search() {
      // 分销商模糊搜索
      let Client = localStorage.getItem("ClientAddr");
      let url = `Manager.ashx?Function=HttpQueryPartnerByNameAndTel`;
      let name = this.input_value;
      let getfxs = axios.get_fxs(url, Client, name);
      if (name) {
        getfxs.then(res => {
          if (res.data.State == "成功") {
            this.tableData = res.data.Body;
          } else {
            this.$message(res.data.Reason);
          }
        });
      } else {
        this.$message("请输入名称或者电话...");
      }
    },
    go(msg) {
      //点击跳转统计界面
      this.menu = !this.menu;
      console.log(msg);
      localStorage.setItem("fxid", msg.pkNo);
      localStorage.setItem("fxname", msg.name);
      localStorage.setItem("fxtel", msg.phone);
      this.$router.push("/admin/tj"); //这个路由路径
    },
    // 复制链接
    fuzhi(row) {
      console.log(row.pkNo);
      this.copemessage =
        "http://" +
        window.location.host +
        `/WeChat/Reservation.aspx?partner=` +
        row.pkNo;
    },
    onCopy(e) {
      console.log(e.text);
    },
    // 二维码保存
    save_qrCode() {
      // this.$message("保存二维码");
      let qrcode = new QRCode("qrcode", {
        width: 140,
        height: 140,
        text: this.copemessage, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff"
      });
      if (this.copemessage) {
        this.$message({ message: "保存成功,请不要重复保存", type: "waring" });
      }
    },
    // 分销商信息修改按钮
    fx_change(row) {
      console.log(row);
      this.show_changefx = true;
      this.form = row;
      console.log(this.form);
    },
    // 点击确认修改分销商信息  确定修改
    sure_changefx() {
      let Client = localStorage.getItem("ClientAddr");
      let url = `Manager.ashx?Function=HttpChangePartner`;
      let changefxs = axios.change_fxs(url, Client, this.form);
      changefxs.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.$message({
            message: "信息修改成功",
            type: "success"
          });
        }
        this.show_changefx = false;
      });
    }
  }
};
</script>
<style scoped>
#qrcode {
  display: inline-block;
  width: 140px;
  height: 140px;
}
#qrcode img {
  display: inline-block;
  width: 132px;
  height: 132px;
  padding: 6px;
  background-color: #fff;
}
.el-form-item {
  margin-bottom: 0px !important;
}
.el-dialog {
  width: 99% !important;
}
.fx {
  width: 94%;
  margin: 0 auto;
  padding-top: 10px;
}
.fx_list {
  margin-top: 20px;
}
.fx_list .el-button {
  height: 30px;
  line-height: 5px;
}
.el-form {
  margin-left: 10px;
}
</style>